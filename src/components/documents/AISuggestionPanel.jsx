import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AISuggestionPanel({
  documentData,
  onApplyRevision,
  onDismissSuggestion,
  onUpdateStatus,
  isRevisionApplied = false
}) {
  const [promptInput, setPromptInput] = useState('');
  const [submittedStatus, setSubmittedStatus] = useState(null);

  const doc = documentData || {
    type: "Formal Legal Notice",
    status: "Draft Generated",
    documentTypeSummary: "This document demands a refund due to a breach of contract based on the provided inputs.",
    aiSuggestion: {
      title: "Nyaya AI Suggestion",
      text: "The demand for the refund is clear, but should we emphasize the deadline (November 7, 2023) more strongly and specify the payment method?"
    }
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleMarkSubmittedByUser = () => {
    onUpdateStatus?.('Submitted by User');
    setSubmittedStatus('Document marked as filed & served by User.');
  };

  const handleManualPromptSubmit = (e) => {
    e?.preventDefault();
    if (!promptInput.trim()) return;
    onApplyRevision?.(promptInput);
    setPromptInput('');
  };

  return (
    <div className="lg:col-span-4 flex flex-col gap-stack-md overflow-y-auto">
      {/* Document Context Card */}
      <div className="bg-surface-container rounded-xl p-stack-md shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent blur-2xl rounded-full -mr-16 -mt-16 pointer-events-none"></div>
        <div className="flex items-start justify-between mb-stack-sm">
          <div>
            <p className="font-caption text-caption text-on-surface-variant uppercase tracking-wider mb-1">
              Document Type
            </p>
            <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">
              {doc.type}
            </h3>
          </div>
          <div className="px-3 py-1 bg-primary/10 text-primary font-label-md text-caption rounded-full flex items-center gap-1 font-medium">
            <span className="material-symbols-outlined text-[14px]">edit_document</span>
            {doc.status || 'Draft Generated'}
          </div>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2">
          {doc.documentTypeSummary}
        </p>
      </div>

      {/* AI Suggestions Card */}
      <div className="bg-[#F5F5F0] rounded-xl p-stack-md border-l-4 border-primary shadow-md relative group">
        <div className="flex items-center gap-unit mb-stack-sm">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[16px]">
              psychology
            </span>
          </div>
          <span className="font-label-md text-label-md text-primary font-semibold">
            {doc.aiSuggestion?.title || "Nyaya AI Suggestion"}
          </span>
        </div>

        <p className="font-body-md text-body-md text-on-surface mb-stack-md">
          {isRevisionApplied
            ? "✓ Revision applied: Strengthened November 7, 2023 deadline and specified wire transfer method."
            : doc.aiSuggestion?.text}
        </p>

        <div className="flex gap-unit">
          {!isRevisionApplied ? (
            <>
              <button
                type="button"
                onClick={() => onApplyRevision?.()}
                className="flex-1 py-2 px-4 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary-container transition-colors flex items-center justify-center gap-2 font-medium"
              >
                <span className="material-symbols-outlined text-[18px]">auto_fix_high</span>
                Apply Revision
              </button>
              <button
                type="button"
                onClick={() => onDismissSuggestion?.()}
                className="py-2 px-4 bg-transparent border border-outline text-on-surface font-label-md text-label-md rounded-lg hover:bg-surface-variant transition-colors"
              >
                Dismiss
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => onDismissSuggestion?.()}
              className="flex-1 py-2 px-4 bg-surface-variant text-on-surface-variant font-label-md text-label-md rounded-lg hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">undo</span>
              Revert Revision
            </button>
          )}
        </div>
      </div>

      {/* Manual Prompt Input */}
      <div className="bg-surface-container rounded-xl p-stack-md shadow-sm">
        <label className="block font-label-md text-label-md text-on-surface mb-2 font-medium" htmlFor="ai-prompt">
          Ask AI to Revise
        </label>
        <div className="relative">
          <textarea
            id="ai-prompt"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleManualPromptSubmit();
              }
            }}
            className="w-full bg-[#FDFCF8] border border-[#e0e0db] rounded-lg p-3 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all resize-none placeholder-on-surface-variant/50"
            placeholder="E.g., Make the tone more aggressive, or add a section about confidentiality..."
            rows={3}
          />
          <button
            type="button"
            onClick={handleManualPromptSubmit}
            className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container transition-colors shadow-sm"
            title="Send Revision Request"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
          </button>
        </div>
      </div>

      <div className="flex-1"></div>

      {/* Notification Toast with Case Route Link */}
      {submittedStatus && (
        <div className="p-3 bg-primary text-on-primary text-caption rounded-lg flex flex-col gap-1.5 shadow-md animate-fade-in">
          <div className="flex items-center gap-2 font-semibold">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            {submittedStatus}
          </div>
          <Link
            to={doc.caseId ? `/cases/${doc.caseId}` : '/cases'}
            className="text-primary-fixed underline hover:text-white text-[12px] font-medium"
          >
            {doc.caseId
              ? `View updated case timeline in Matter #${doc.caseId.replace('matter-', '').toUpperCase()} →`
              : 'View updated case timeline →'}
          </Link>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-unit">
        <button
          type="button"
          onClick={handleDownloadPDF}
          className="w-full py-4 px-6 bg-surface-container-high text-on-surface font-label-md text-label-md rounded-xl hover:bg-surface-variant transition-colors flex items-center justify-between group font-medium"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform">
              picture_as_pdf
            </span>
            Download PDF
          </div>
          <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
            arrow_forward
          </span>
        </button>

        <button
          type="button"
          onClick={handleMarkSubmittedByUser}
          className="w-full py-4 px-6 bg-primary text-on-primary font-label-md text-label-md rounded-xl hover:bg-primary-container transition-colors flex items-center justify-between shadow-md relative overflow-hidden group font-medium"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <div className="flex items-center gap-3 relative z-10">
            <span className="material-symbols-outlined">mark_email_read</span>
            Mark as Submitted by User
          </div>
          <span className="material-symbols-outlined text-[20px] relative z-10">
            arrow_forward
          </span>
        </button>
      </div>

      {/* Trust Footer */}
      <div className="mt-4 flex items-center gap-2 justify-center text-center px-4">
        <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
          info
        </span>
        <p className="font-caption text-caption text-on-surface-variant">
          AI-assisted information. Always verify before taking action.
        </p>
      </div>
    </div>
  );
}
