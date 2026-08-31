import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCases } from '../hooks/useCases';
import { useAllDocuments } from '../hooks/useDocument';
import { deadlineService } from '../services/deadlineService';

export default function ActionRadarPage() {
  const navigate = useNavigate();
  const { cases, loading: casesLoading } = useCases();
  const { documents, loading: docsLoading } = useAllDocuments();
  const [filter, setFilter] = useState('all');

  const radarItems = useMemo(() => {
    return deadlineService.generateRadarFeed(cases, documents);
  }, [cases, documents]);

  const filteredItems = useMemo(() => {
    if (filter === 'all') return radarItems;
    return radarItems.filter((item) => item.priority.toLowerCase() === filter);
  }, [radarItems, filter]);

  const handleAction = (item) => {
    if (item.actionType === 'open_document' && item.documentId) {
      navigate(`/documents/${item.documentId}`);
    } else if (item.caseId) {
      navigate(`/cases/${item.caseId}`);
    } else {
      navigate('/documents');
    }
  };

  return (
    <div className="flex flex-col w-full relative min-h-[calc(100vh-80px)]">
      <div className="max-w-[1200px] w-full mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-stack-lg">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="material-symbols-outlined text-primary text-[28px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                radar
              </span>
              <h1 className="font-display-md text-display-md text-on-background font-bold">
                ActionRadar
              </h1>
              <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse"></div>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[650px]">
              Active legal monitors scanning limitation windows, statutory response deadlines, and critical procedural next steps.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 bg-surface-container p-1 rounded-xl shrink-0">
            {['all', 'high', 'medium', 'low'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-4 py-1.5 rounded-lg text-label-md font-label-md capitalize transition-colors ${
                  filter === tab
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Action Items List */}
        {casesLoading || docsLoading ? (
          <div className="p-8 text-center bg-surface-container-lowest rounded-xl mb-stack-lg">
            <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-2"></div>
            <p className="text-body-md text-on-surface-variant">Scanning statutory deadlines and active radar...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter mb-stack-lg">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl p-stack-md shadow-sm border relative overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-md ${
                  item.priority === 'High'
                    ? 'bg-error-container/20 border-error/30'
                    : 'bg-surface-container-lowest border-surface-variant'
                }`}
              >
                {item.priority === 'High' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#ef4444]"></div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded font-caption text-caption font-bold uppercase tracking-wider ${item.badgeBg} ${item.badgeText}`}
                    >
                      Priority: {item.priority}
                    </span>
                    <span className="text-caption text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {item.deadline}
                    </span>
                  </div>

                  <h3 className="font-title-lg text-title-lg text-on-background font-semibold mb-2">
                    {item.title}
                  </h3>

                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 text-sm">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between">
                  <Link
                    to={`/cases/${item.caseId}`}
                    className="text-caption text-on-surface-variant hover:text-primary font-medium"
                  >
                    View Matter Details
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleAction(item)}
                    className={`px-4 py-2 rounded-lg font-label-md text-label-md transition-colors flex items-center gap-1 font-semibold text-xs ${
                      item.priority === 'High'
                        ? 'bg-[#ef4444] text-white hover:bg-[#b91c1c]'
                        : 'bg-primary text-on-primary hover:bg-primary-container'
                    }`}
                  >
                    <span>{item.actionLabel || item.ctaText || 'Take Action'}</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant text-center flex flex-col items-center justify-center space-y-3 mb-stack-lg">
            <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[24px]">task_alt</span>
            </div>
            <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">
              All Statutory Actions Up to Date
            </h3>
            <p className="text-body-md text-on-surface-variant text-sm max-w-sm">
              No pending urgent deadlines or filing notices require your immediate attention in this filter view.
            </p>
          </div>
        )}

        {/* Jurisdiction Statute Alert Bar */}
        <div className="bg-surface-container p-stack-md rounded-2xl border border-outline-variant/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">policy</span>
            </div>
            <div>
              <h4 className="font-label-md text-label-md text-on-surface font-semibold">
                Limitation Act Automatic Monitoring Active
              </h4>
              <p className="text-caption text-on-surface-variant">
                Nyaya AI continuously checks statutory timelines across consumer, tenant, and civil dispute acts.
              </p>
            </div>
          </div>
          <span className="text-caption text-primary font-semibold px-3 py-1 bg-surface-container-lowest rounded-full border border-surface-variant">
            {cases.length || 3} Matters Monitored
          </span>
        </div>
      </div>
    </div>
  );
}
