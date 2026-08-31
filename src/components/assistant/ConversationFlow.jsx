import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { caseService } from '../../services/caseService';
import { documentService } from '../../services/documentService';

export default function ConversationFlow({
  userPrompt,
  analysisResult,
  guidanceResult,
  onCollectSubmit,
  onReset,
  aiState
}) {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [savedCaseId, setSavedCaseId] = useState(null);
  const [creatingCase, setCreatingCase] = useState(false);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleConfirmAndProceed = () => {
    setConfirmed(true);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    onCollectSubmit?.(answers);
  };

  const handleCreateAndSaveCase = async () => {
    setCreatingCase(true);
    try {
      const newCase = await caseService.createCase({
        title: analysisResult.diagnosis?.primaryIssue || 'Legal Dispute Matter',
        description: userPrompt,
        domain: analysisResult.category || 'Civil Dispute',
        category: analysisResult.category || 'Civil Dispute',
        priority: analysisResult.extractedDetails?.urgency || 'High',
        deadline: analysisResult.diagnosis?.statutoryLimitation || 'In 14 days',
        facts: {
          summary: userPrompt,
          claimant: analysisResult.extractedDetails?.claimant || 'Citizen Claimant',
          respondent: answers.counterparty || analysisResult.extractedDetails?.respondent || 'Counterparty',
          claimAmount: answers.monetary_loss || answers.txn_amount || answers.deposit_amt || analysisResult.extractedDetails?.estimatedAmount || '$1,500',
          details: answers
        },
        authority: {
          name: analysisResult.category === 'Financial Fraud & Cybercrime'
            ? 'Banking Ombudsman & Cyber Crime Cell'
            : analysisResult.category === 'Tenant & Housing Rights'
            ? 'Rent Authority & Small Claims Court'
            : 'District Consumer Disputes Redressal Commission',
          applicableLaws: analysisResult.diagnosis?.applicableLaws || []
        },
        nextAction: `Issue Formal Notice (${guidanceResult?.draftDocument?.title || 'Demand Notice'})`,
        nextActionIcon: 'gavel',
        nextActionButtonText: 'Review Draft'
      });

      // Synchronously create and link document to this case
      await documentService.createDocument({
        caseId: newCase.id,
        title: guidanceResult?.draftDocument?.title || analysisResult.documentSuggestion?.title || `${analysisResult.categoryTag || 'Legal'} Notice Draft`,
        type: guidanceResult?.draftDocument?.type || analysisResult.documentSuggestion?.type || 'Formal Legal Notice',
        recipient: {
          company: answers.counterparty || analysisResult.extractedDetails?.respondent || 'Counterparty Organization',
          address: 'Official Registered Address'
        },
        demandAmount: answers.monetary_loss || answers.txn_amount || answers.deposit_amt || analysisResult.extractedDetails?.estimatedAmount || '$1,500 USD',
        subject: `Formal Notice Regarding ${analysisResult.diagnosis?.primaryIssue || 'Dispute'}`,
        documentTypeSummary: analysisResult.summary || 'Generated dispute demand representation.'
      });

      setSavedCaseId(newCase.id);
      setCreatingCase(false);
      navigate(`/cases/${newCase.id}`);
    } catch {
      setCreatingCase(false);
    }
  };

  const handleOpenInEditor = async () => {
    try {
      if (savedCaseId) {
        const docs = await documentService.getDocumentsByCaseId(savedCaseId);
        if (docs && docs.length > 0) {
          navigate(`/documents/${docs[0].id}`);
          return;
        }
      }
      const newDoc = await documentService.createDocument({
        title: guidanceResult?.draftDocument?.title || analysisResult.documentSuggestion?.title || 'Formal Legal Notice Draft',
        type: guidanceResult?.draftDocument?.type || analysisResult.documentSuggestion?.type || 'Formal Legal Notice',
        recipient: {
          company: answers.counterparty || analysisResult.extractedDetails?.respondent || 'Counterparty Organization',
          address: 'Official Registered Address'
        },
        demandAmount: answers.monetary_loss || answers.txn_amount || answers.deposit_amt || analysisResult.extractedDetails?.estimatedAmount || '$1,500 USD',
        subject: `Formal Notice Regarding ${analysisResult.diagnosis?.primaryIssue || 'Dispute'}`,
        documentTypeSummary: analysisResult.summary || 'Generated dispute demand representation.'
      });
      navigate(`/documents/${newDoc.id}`);
    } catch {
      navigate('/documents');
    }
  };

  if (!analysisResult) return null;

  return (
    <div className="flex flex-col gap-stack-md w-full animate-fade-in">
      {/* 1. USER INPUT & UNDERSTANDING CARD */}
      <div className="bg-surface-container-lowest/90 backdrop-blur-xl rounded-2xl p-stack-md shadow-md border border-surface-variant">
        <div className="flex items-center justify-between pb-3 border-b border-surface-variant/40 mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">person</span>
            <span className="text-caption font-semibold uppercase tracking-wider text-on-surface-variant">
              Your Stated Scenario
            </span>
          </div>
          <button
            onClick={onReset}
            className="text-caption text-primary hover:underline font-semibold flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">refresh</span>
            New Query
          </button>
        </div>
        <p className="text-body-md text-on-surface italic bg-surface-container-low p-3 rounded-xl">
          "{userPrompt}"
        </p>
      </div>

      {/* 2. DIAGNOSIS & CONFIRMATION */}
      <div className="bg-surface-container-lowest/90 backdrop-blur-xl rounded-2xl p-stack-md shadow-md border border-surface-variant">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-primary text-on-primary text-caption font-semibold">
                {analysisResult.categoryTag}
              </span>
              <span className="text-caption text-on-surface-variant font-medium">
                {analysisResult.confidence}% AI Confidence Match
              </span>
            </div>
            <h3 className="font-title-lg text-title-lg text-on-surface font-bold">
              Legal Diagnosis: {analysisResult.diagnosis?.primaryIssue}
            </h3>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {analysisResult.tags?.map((t, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-surface-container text-on-surface text-caption font-medium rounded-lg border border-outline-variant/30"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Applicable Statutes */}
        <div className="bg-[#F5F5F0] rounded-xl p-4 border-l-4 border-primary mb-4 space-y-2">
          <h4 className="font-label-md text-label-md text-primary font-semibold flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">gavel</span>
            Governing Legal Statutes & Authorities
          </h4>
          <ul className="list-disc list-inside text-body-md text-on-surface text-sm space-y-1">
            {analysisResult.diagnosis?.applicableLaws?.map((law, idx) => (
              <li key={idx}>{law}</li>
            ))}
          </ul>
          <p className="text-caption text-on-surface-variant pt-1">
            <strong>Limitation / Timelines:</strong> {analysisResult.diagnosis?.statutoryLimitation}
          </p>
        </div>

        {/* DOCUMENT RECOMMENDED */}
        {analysisResult.documentSuggestion && (
          <div className="bg-primary/5 rounded-xl p-4 border border-primary/20 mb-4">
            <div className="flex items-center gap-1.5 text-primary mb-1">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="font-label-md text-caption uppercase tracking-wider font-bold">
                Document Recommended
              </span>
            </div>
            <h4 className="font-title-lg text-title-lg text-on-surface font-bold">
              {analysisResult.documentSuggestion.title}
            </h4>
            <p className="text-body-md text-on-surface-variant mt-1 text-sm">
              <strong>Why this document may help:</strong> {analysisResult.documentSuggestion.description}
            </p>
          </div>
        )}

        {/* Fact Confirmation Stepper */}
        {!confirmed ? (
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-surface-container-low p-4 rounded-xl border border-surface-variant/60">
            <div>
              <p className="font-label-md text-label-md text-on-surface font-semibold">
                Is this accurate based on your situation?
              </p>
              <p className="text-caption text-on-surface-variant">
                Claimed party: {analysisResult.extractedDetails?.claimant} • Opposing: {analysisResult.extractedDetails?.respondent} • Est. Stakes: {analysisResult.extractedDetails?.estimatedAmount}
              </p>
            </div>
            <button
              onClick={handleConfirmAndProceed}
              className="px-6 py-2.5 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm font-semibold shrink-0 flex items-center gap-1.5"
            >
              <span>Confirm & Structure Strategy</span>
              <span className="material-symbols-outlined text-[16px]">check</span>
            </button>
          </div>
        ) : (
          <div className="p-3 bg-primary/5 rounded-xl flex items-center gap-2 text-caption text-primary font-semibold">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            Factual diagnosis confirmed. Proceeding to missing legal details.
          </div>
        )}
      </div>

      {/* 3. COLLECT MISSING INFORMATION (Only shown after confirmation) */}
      {confirmed && !guidanceResult && (
        <div className="bg-surface-container-lowest/90 backdrop-blur-xl rounded-2xl p-stack-md shadow-md border border-surface-variant animate-fade-in">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-[22px]">contact_support</span>
            <h3 className="font-title-lg text-title-lg text-on-surface font-bold">
              Provide Key Details for Formal Notice
            </h3>
          </div>
          <p className="text-body-md text-on-surface-variant mb-6 text-sm">
            To generate an enforceable demand or petition, provide as much of the following information as available.
          </p>

          <form onSubmit={handleFinalSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {analysisResult.missingInformationQuestions?.map((q) => (
                <div key={q.id} className="space-y-1">
                  <label className="block text-caption font-caption text-on-surface font-medium">
                    {q.question}
                  </label>
                  <input
                    type="text"
                    value={answers[q.id] || ''}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                    placeholder={q.placeholder}
                    className="w-full bg-surface-container-low border border-surface-variant rounded-lg px-3.5 py-2.5 text-body-md text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm"
                  />
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <button
                type="submit"
                disabled={aiState === 'generating' || aiState === 'analyzing'}
                className="px-8 py-3.5 bg-primary text-on-primary rounded-xl font-label-md text-label-md hover:bg-primary-container transition-all shadow-md font-semibold flex items-center gap-2"
              >
                {aiState === 'generating' ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-on-primary border-t-transparent animate-spin"></div>
                    Generating Legal Draft & Roadmap...
                  </>
                ) : (
                  <>
                    <span>Generate Legal Notice & Action Roadmap</span>
                    <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. GUIDE & DOCUMENT SUGGESTION & NEXT ACTION */}
      {guidanceResult && (
        <div className="bg-surface-container-lowest/90 backdrop-blur-xl rounded-2xl p-stack-md shadow-lg border border-surface-variant animate-fade-in space-y-6">
          {/* Strategy Roadmap */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-[24px]">map</span>
              <h3 className="font-title-lg text-title-lg text-primary font-bold">
                Actionable Strategy & Recommended Next Steps
              </h3>
            </div>
            <p className="text-body-md text-on-surface mb-4 leading-relaxed">
              {guidanceResult.strategyOverview}
            </p>

            <div className="space-y-2">
              {guidanceResult.recommendedSteps?.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low">
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary text-caption font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-body-md text-on-surface text-sm font-medium">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Generated Document Card */}
          <div className="bg-surface-container rounded-xl p-5 border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">description</span>
              </div>
              <div>
                <span className="text-caption uppercase tracking-wider text-primary font-bold">
                  Generated Draft Ready
                </span>
                <h4 className="font-title-lg text-title-lg text-on-surface font-bold">
                  {guidanceResult.draftDocument?.title}
                </h4>
                <p className="text-caption text-on-surface-variant mt-0.5">
                  Recipient: {guidanceResult.draftDocument?.recipient} • Claim Amount: {guidanceResult.draftDocument?.claimAmount}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 shrink-0">
              <button
                onClick={handleCreateAndSaveCase}
                disabled={creatingCase}
                className="px-5 py-3 bg-primary text-on-primary rounded-xl font-label-md text-label-md hover:bg-primary-container transition-all shadow-md font-semibold flex items-center justify-center gap-2 group"
              >
                {creatingCase ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-on-primary border-t-transparent animate-spin"></div>
                    Saving Matter...
                  </>
                ) : (
                  <>
                    <span>Save to My Cases</span>
                    <span className="material-symbols-outlined text-[18px]">folder_open</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleOpenInEditor}
                className="px-5 py-3 bg-surface-container-high hover:bg-surface-variant text-on-surface rounded-xl font-label-md text-label-md transition-all font-semibold flex items-center justify-center gap-2"
              >
                <span>Open in Editor</span>
                <span className="material-symbols-outlined text-[18px]">edit_document</span>
              </button>
            </div>
          </div>

          {savedCaseId && (
            <div className="p-3 bg-primary/10 text-primary text-caption rounded-lg flex items-center justify-between">
              <span>✓ Case created in your workspace!</span>
              <button
                onClick={() => navigate(`/cases/${savedCaseId}`)}
                className="underline font-semibold"
              >
                View Case #{savedCaseId}
              </button>
            </div>
          )}

          {/* Quick Actions Footer */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-surface-variant/40">
            <button
              onClick={() => navigate('/action-radar')}
              className="text-caption font-semibold text-[#ef4444] hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">radar</span>
              Track Limitation Deadlines in ActionRadar
            </button>

            <button
              onClick={onReset}
              className="text-caption font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
              Analyze Another Situation
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
