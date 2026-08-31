import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDocument } from '../hooks/useDocument';
import DocumentPreview from '../components/documents/DocumentPreview';
import AISuggestionPanel from '../components/documents/AISuggestionPanel';

export default function DocumentEditorPage() {
  const { id } = useParams();
  const {
    documentData,
    applyRevision,
    updateStatus,
    loading
  } = useDocument(id || 'legal-notice-draft-894');
  const [localOverrideRevision, setLocalOverrideRevision] = useState(null);

  const isRevisionApplied = localOverrideRevision !== null
    ? localOverrideRevision
    : !!documentData?.isRevisionApplied;

  const handleApplyRevision = async (customPrompt) => {
    setLocalOverrideRevision(true);
    await applyRevision(customPrompt || 'AI Suggestion Applied');
  };

  const handleDismissSuggestion = async () => {
    setLocalOverrideRevision(false);
  };

  const handleStatusUpdate = async (newStatus) => {
    await updateStatus(newStatus);
  };

  const caseId = documentData?.caseId;
  const linkedMatterLabel = caseId
    ? `Linked Matter #${caseId.replace('matter-', '').toUpperCase()}`
    : 'All Cases';
  const linkedMatterPath = caseId ? `/cases/${caseId}` : '/cases';

  return (
    <div className="flex flex-col w-full h-[calc(100vh-80px)] overflow-hidden bg-background">
      {/* Sub-header Breadcrumb Bar */}
      <div className="bg-surface-container-low/50 border-b border-surface-variant/30 px-margin-mobile md:px-margin-desktop py-2 flex items-center justify-between text-caption text-on-surface-variant shrink-0">
        <div className="flex items-center gap-2">
          <Link to="/documents" className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Documents Library
          </Link>
          <span>/</span>
          <span className="text-primary font-medium">
            {loading ? 'Loading...' : documentData?.title || 'Legal Notice Draft'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to={linkedMatterPath}
            className="hover:text-primary transition-colors flex items-center gap-1 font-medium"
          >
            <span className="material-symbols-outlined text-[14px]">link</span>
            {linkedMatterLabel}
          </Link>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 max-w-[1600px] w-full mx-auto p-margin-mobile md:p-margin-desktop gap-gutter overflow-hidden">
        {/* Left: Document Preview Canvas (8 cols) */}
        <DocumentPreview
          documentData={documentData}
          appliedRevision={isRevisionApplied}
        />

        {/* Right: AI Editing & Action Panel (4 cols) */}
        <AISuggestionPanel
          documentData={documentData}
          onApplyRevision={handleApplyRevision}
          onDismissSuggestion={handleDismissSuggestion}
          onUpdateStatus={handleStatusUpdate}
          isRevisionApplied={isRevisionApplied}
        />
      </div>
    </div>
  );
}
