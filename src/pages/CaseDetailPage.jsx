import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCaseDetail } from '../hooks/useCases';
import { documentService } from '../services/documentService';
import CaseTimeline from '../components/cases/CaseTimeline';

export default function CaseDetailPage() {
  const { id } = useParams();
  const {
    caseItem,
    loading,
    addEvidence,
    markSubmitted,
    markResolved
  } = useCaseDetail(id || 'matter-882-a');
  const navigate = useNavigate();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [actionSuccess, setActionSuccess] = useState(null);

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      for (const file of files) {
        await addEvidence({
          name: file.name,
          size: `${(file.size / 1024).toFixed(0)} KB`,
          type: file.type || 'document'
        });
      }
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    }
  };

  const handleMarkSubmitted = async () => {
    await markSubmitted({
      submittedBy: caseItem.facts?.claimant || 'Claimant',
      filingReference: `FIL-NYA-${Math.floor(100000 + Math.random() * 900000)}`
    });
    setActionSuccess('Case successfully marked as Submitted to Authority!');
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const handleMarkResolved = async () => {
    await markResolved({
      outcomeSummary: 'Formal resolution reached with counterparty compliance.'
    });
    setActionSuccess('Case marked as Concluded & Resolved!');
    setTimeout(() => setActionSuccess(null), 3500);
  };

  const claimantName = caseItem?.facts?.claimant || caseItem?.parties?.claimant || 'Ananya Sharma';
  const respondentName = caseItem?.facts?.respondent || caseItem?.parties?.respondent || 'Counterparty';
  const claimAmount = caseItem?.facts?.claimAmount || caseItem?.claimedAmount || '$3,200';

  const handleOpenNotice = async () => {
    try {
      const existingDocs = await documentService.getDocumentsByCaseId(caseItem.id);
      if (existingDocs && existingDocs.length > 0) {
        navigate(`/documents/${existingDocs[0].id}`);
        return;
      }
      // Create a document linked to this case if none exists yet
      const created = await documentService.createDocument({
        caseId: caseItem.id,
        title: `${caseItem.title} - Notice Draft`,
        type: caseItem.category === 'Financial Fraud' ? 'Statutory Banking Complaint' : 'Formal Legal Demand Notice',
        sender: {
          name: claimantName,
          representative: 'Nyaya AI Automated Drafting / Legal Department'
        },
        recipient: {
          company: respondentName,
          address: 'Official Registered Address'
        },
        demandAmount: claimAmount,
        subject: `Formal Notice Regarding ${caseItem.title}`,
        documentTypeSummary: caseItem.description
      });
      navigate(`/documents/${created.id}`);
    } catch {
      navigate('/documents');
    }
  };

  const handleDocumentPreview = async (doc) => {
    if (doc.documentId) {
      navigate(`/documents/${doc.documentId}`);
      return;
    }
    const existingDocs = await documentService.getDocumentsByCaseId(caseItem.id);
    if (existingDocs && existingDocs.length > 0) {
      navigate(`/documents/${existingDocs[0].id}`);
      return;
    }
    handleOpenNotice();
  };

  if (loading || !caseItem) {
    return (
      <div className="max-w-[1200px] mx-auto px-margin-desktop py-stack-lg text-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-2"></div>
        <p className="text-body-md text-on-surface-variant">Loading case details...</p>
      </div>
    );
  }

  const allDocuments = caseItem.documents || [];

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-80px)] bg-background">
      <div className="max-w-[1200px] w-full mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg relative z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 mb-stack-md text-caption text-on-surface-variant">
          <Link to="/cases" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Back to All Cases
          </Link>
          <span>/</span>
          <span className="text-primary font-medium">{caseItem.matterNumber}</span>
        </div>

        {/* Action Success Toast */}
        {actionSuccess && (
          <div className="mb-4 p-3 bg-primary text-on-primary rounded-xl flex items-center gap-2 text-caption font-semibold shadow-md animate-fade-in">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            {actionSuccess}
          </div>
        )}

        {/* Case Header Card */}
        <div className="bg-surface-container-lowest rounded-2xl p-stack-md shadow-sm border border-surface-variant mb-stack-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary text-[22px]">
                  {caseItem.icon || 'gavel'}
                </span>
                <span className="text-label-md font-label-md uppercase tracking-wider text-primary font-semibold">
                  {caseItem.domain || caseItem.category}
                </span>
                <span className="text-caption px-2.5 py-0.5 rounded-full bg-surface-variant text-on-surface-variant font-medium">
                  {caseItem.matterNumber}
                </span>
              </div>
              <h1 className="font-display-md text-display-md text-on-background font-bold">
                {caseItem.title}
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-3xl">
                {caseItem.description}
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: caseItem.statusColor || '#f59e0b' }}></span>
                <span className="font-label-md text-label-md font-semibold text-on-surface">
                  {caseItem.status}
                </span>
              </div>
              <span className="text-caption text-on-surface-variant">
                Created: {caseItem.createdAt || caseItem.createdDate}
              </span>
            </div>
          </div>

          {/* Embedded Progress Stepper */}
          <div className="mt-6 pt-4 border-t border-surface-variant/40">
            <CaseTimeline steps={caseItem.timelineSteps || []} />
          </div>
        </div>

        {/* Grid: Parties, Evidence & Action Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Left Details (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-stack-md">
            {/* Case Details Card */}
            <div className="bg-surface-container-lowest rounded-xl p-stack-md shadow-sm border border-surface-variant">
              <h3 className="font-title-lg text-title-lg text-on-surface font-semibold mb-4">
                Matter Overview
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-surface-container-low p-4 rounded-lg">
                  <span className="text-caption text-on-surface-variant block mb-1 uppercase tracking-wider">Claimant</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">{claimantName}</span>
                </div>
                <div className="bg-surface-container-low p-4 rounded-lg">
                  <span className="text-caption text-on-surface-variant block mb-1 uppercase tracking-wider">Respondent / Opposing Party</span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">{respondentName}</span>
                </div>
                <div className="bg-surface-container-low p-4 rounded-lg">
                  <span className="text-caption text-on-surface-variant block mb-1 uppercase tracking-wider">Claimed Stakes</span>
                  <span className="font-label-md text-label-md text-primary font-semibold">{claimAmount}</span>
                </div>
                <div className="bg-surface-container-low p-4 rounded-lg">
                  <span className="text-caption text-on-surface-variant block mb-1 uppercase tracking-wider">Statutory Deadline</span>
                  <span className="font-label-md text-label-md text-[#ef4444] font-semibold">{caseItem.deadline}</span>
                </div>
              </div>

              {/* Authority and Jurisdiction info */}
              {caseItem.authority && (
                <div className="mt-4 p-3 bg-surface-container-low rounded-lg border border-surface-variant/40">
                  <span className="text-caption text-on-surface-variant uppercase tracking-wider block mb-1 font-semibold">
                    Competent Authority
                  </span>
                  <p className="font-label-md text-label-md text-primary font-bold">{caseItem.authority.name}</p>
                  <p className="text-caption text-on-surface-variant mt-0.5">
                    {caseItem.authority.applicableLaws?.join(' • ')}
                  </p>
                </div>
              )}
            </div>

            {/* Document / Evidence Vault */}
            <div className="bg-surface-container-lowest rounded-xl p-stack-md shadow-sm border border-surface-variant">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">folder</span>
                  Evidence & Legal Documents ({allDocuments.length})
                </h3>

                <label className="bg-primary text-on-primary px-4 py-2 rounded-lg text-caption font-label-md hover:bg-primary-container transition-colors flex items-center gap-1.5 cursor-pointer">
                  <input type="file" multiple className="hidden" onChange={handleFileUpload} />
                  <span className="material-symbols-outlined text-[16px]">upload</span>
                  Add Evidence
                </label>
              </div>

              {uploadSuccess && (
                <div className="mb-4 p-3 bg-primary/10 text-primary text-caption rounded-lg flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  Evidence securely encrypted and persisted to case vault!
                </div>
              )}

              <div className="space-y-2">
                {allDocuments.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-surface-tint">description</span>
                      <div>
                        <p className="font-label-md text-label-md text-on-surface font-medium">{doc.name}</p>
                        <p className="text-caption text-on-surface-variant">{doc.size} • {doc.date}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDocumentPreview(doc)}
                      className="text-primary hover:underline text-caption font-semibold flex items-center gap-1"
                    >
                      Preview
                      <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Action & Status Management (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-stack-md">
            {/* Action Box */}
            <div className="bg-surface-container-lowest rounded-xl p-stack-md shadow-sm border border-surface-variant">
              <h4 className="font-label-md text-label-md text-primary font-semibold uppercase tracking-wider mb-2">
                Next AI Recommended Step
              </h4>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/15 mb-4">
                <span className="text-caption text-on-surface-variant block mb-1">Recommended Action</span>
                <p className="font-label-md text-label-md text-primary font-bold">{caseItem.nextAction}</p>
              </div>

              <button
                type="button"
                onClick={handleOpenNotice}
                className="w-full py-3 bg-primary text-on-primary font-label-md text-label-md rounded-xl hover:bg-primary-container transition-colors flex items-center justify-center gap-2 shadow-sm font-medium"
              >
                <span>Draft / Review Notice</span>
                <span className="material-symbols-outlined text-[18px]">gavel</span>
              </button>
            </div>

            {/* Case Lifecycle Control Actions */}
            <div className="bg-surface-container-lowest rounded-xl p-stack-md shadow-sm border border-surface-variant space-y-2">
              <h4 className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider mb-3">
                Case Management Actions
              </h4>

              {caseItem.status !== 'Submitted to Authority' && caseItem.status !== 'Resolved' && (
                <button
                  onClick={handleMarkSubmitted}
                  className="w-full py-2.5 px-4 bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md rounded-lg transition-colors flex items-center justify-between text-xs font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-primary">send</span>
                    Mark as Submitted to Authority
                  </span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              )}

              {caseItem.status !== 'Resolved' && (
                <button
                  onClick={handleMarkResolved}
                  className="w-full py-2.5 px-4 bg-surface-container-low hover:bg-surface-container text-[#065f46] font-label-md text-label-md rounded-lg transition-colors flex items-center justify-between text-xs font-semibold"
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#10b981]">task_alt</span>
                    Mark Case as Resolved
                  </span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              )}
            </div>

            {/* Quick AI Consultation */}
            <div className="bg-surface-container rounded-xl p-stack-md shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
                <h4 className="font-label-md text-label-md text-primary font-semibold">Consult Nyaya AI on this Matter</h4>
              </div>
              <p className="text-caption text-on-surface-variant mb-3">
                Ask specific questions about procedural strategy, jurisdiction limits, or precedent outcomes for this case.
              </p>
              <Link
                to="/assistant"
                className="block text-center py-2 bg-surface-container-lowest hover:bg-surface-container-high text-primary border border-outline-variant/40 rounded-lg text-caption font-semibold transition-colors"
              >
                Open in AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
