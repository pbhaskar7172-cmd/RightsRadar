import { useNavigate } from 'react-router-dom';
import { documentService } from '../../services/documentService';
import CaseTimeline from './CaseTimeline';

export default function CaseCard({ caseItem, isSelected = false, onSelect }) {
  const navigate = useNavigate();

  const handleActionClick = async (e) => {
    e.stopPropagation();
    if (!caseItem.nextActionEnabled) return;

    if (
      caseItem.status === 'Draft Prepared' ||
      caseItem.nextActionButtonText?.toLowerCase().includes('draft') ||
      caseItem.nextActionButtonText?.toLowerCase().includes('review')
    ) {
      try {
        const docs = await documentService.getDocumentsByCaseId(caseItem.id);
        if (docs && docs.length > 0) {
          navigate(`/documents/${docs[0].id}`);
          return;
        }
      } catch {
        // Fallback to case detail
      }
    }
    navigate(`/cases/${caseItem.id}`);
  };

  const handleCardClick = () => {
    if (onSelect) {
      onSelect(caseItem.id);
    } else {
      navigate(`/cases/${caseItem.id}`);
    }
  };

  const isHighlighted = isSelected || caseItem.id === 'matter-904-b';

  return (
    <div
      onClick={handleCardClick}
      className={`group relative rounded-xl p-stack-md transition-all duration-300 overflow-hidden cursor-pointer ${
        isHighlighted
          ? 'bg-surface-container-low shadow-md ring-1 ring-primary/20'
          : caseItem.status === 'Resolved'
          ? 'bg-surface-container-lowest shadow-sm hover:shadow-md opacity-80 hover:opacity-100'
          : 'bg-surface-container-lowest shadow-sm hover:shadow-md'
      }`}
    >
      {/* Accent Indicator Strip */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 bg-primary transition-opacity duration-300 ${
          isHighlighted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      ></div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-stack-md">
        <div className="flex flex-col gap-stack-sm flex-1">
          <div className="flex items-center gap-unit">
            <span
              className={`material-symbols-outlined text-[20px] ${
                caseItem.status === 'Resolved' ? 'text-on-surface-variant' : 'text-primary'
              }`}
            >
              {caseItem.icon}
            </span>
            <span
              className={`font-label-md text-label-md uppercase tracking-wider ${
                caseItem.status === 'Resolved' ? 'text-on-surface-variant' : 'text-primary'
              }`}
            >
              {caseItem.category}
            </span>
          </div>

          <h3 className="font-title-lg text-title-lg text-on-background font-semibold">
            {caseItem.title}
          </h3>

          <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mt-unit">
            {caseItem.description}
          </p>

          <div className="flex flex-wrap gap-unit mt-stack-sm">
            {caseItem.id === 'matter-904-b' ? (
              <div className="bg-primary px-stack-sm py-unit rounded-full flex items-center gap-unit">
                <span className="w-2 h-2 rounded-full bg-on-primary animate-pulse"></span>
                <span className="font-caption text-caption text-on-primary font-medium">
                  Status: {caseItem.status}
                </span>
              </div>
            ) : caseItem.status === 'Resolved' ? (
              <div className="bg-[#10b981]/10 px-stack-sm py-unit rounded-full flex items-center gap-unit">
                <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                <span className="font-caption text-caption text-[#065f46] font-medium">
                  Status: {caseItem.status}
                </span>
              </div>
            ) : (
              <div className="bg-surface-variant px-stack-sm py-unit rounded-full flex items-center gap-unit">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: caseItem.statusColor }}
                ></span>
                <span className="font-caption text-caption text-on-surface-variant font-medium">
                  Status: {caseItem.status}
                </span>
              </div>
            )}
          </div>

          {/* Embedded Case Timeline Visual for active/selected state */}
          {isHighlighted && <CaseTimeline steps={caseItem.timelineSteps} />}
        </div>

        {/* Right Actions Column */}
        <div className="flex flex-col items-start md:items-end gap-stack-sm min-w-[200px]">
          {caseItem.status !== 'Resolved' && (
            <div
              className={`bg-primary/5 px-stack-sm py-stack-sm rounded-lg w-full ${
                !caseItem.nextActionEnabled ? 'opacity-60' : ''
              }`}
            >
              <span className="block font-caption text-caption text-on-surface-variant mb-unit">
                Next Action
              </span>
              <span
                className={`block font-label-md text-label-md font-semibold ${
                  caseItem.nextActionEnabled ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                {caseItem.nextAction}
              </span>
            </div>
          )}

          {caseItem.nextActionEnabled ? (
            <button
              onClick={handleActionClick}
              className={`w-full mt-unit font-label-md text-label-md px-stack-md py-stack-sm rounded-lg transition-colors flex justify-center items-center gap-unit ${
                caseItem.status === 'Resolved'
                  ? 'border border-outline text-on-background hover:bg-surface-container'
                  : 'bg-primary text-on-primary hover:bg-primary-container'
              }`}
            >
              <span>{caseItem.nextActionButtonText}</span>
              <span className="material-symbols-outlined text-[18px]">
                {caseItem.nextActionIcon}
              </span>
            </button>
          ) : (
            <button
              disabled
              className="w-full mt-unit bg-surface-variant text-on-surface-variant font-label-md text-label-md px-stack-md py-stack-sm rounded-lg flex justify-center items-center gap-unit cursor-not-allowed"
            >
              <span>{caseItem.nextActionButtonText}</span>
              <span className="material-symbols-outlined text-[18px]">
                {caseItem.nextActionIcon}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
