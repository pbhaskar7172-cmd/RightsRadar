import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { caseService } from '../../services/caseService';
import { documentService } from '../../services/documentService';
import { deadlineService } from '../../services/deadlineService';

export default function ActionRadarWidget({ onTakeAction, targetCaseId = 'matter-904-b' }) {
  const navigate = useNavigate();
  const [targetCase, setTargetCase] = useState(null);
  const [linkedDoc, setLinkedDoc] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (!targetCaseId) return;

    Promise.all([
      caseService.getCaseById(targetCaseId),
      documentService.getDocumentsByCaseId(targetCaseId)
    ]).then(([caseData, docs]) => {
      if (isMounted) {
        setTargetCase(caseData);
        setLinkedDoc(docs?.[0] || null);
      }
    }).catch(() => {});

    return () => {
      isMounted = false;
    };
  }, [targetCaseId]);

  const handleAction = async () => {
    if (onTakeAction) {
      onTakeAction();
      return;
    }
    if (linkedDoc) {
      navigate(`/documents/${linkedDoc.id}`);
      return;
    }
    if (targetCaseId) {
      navigate(`/cases/${targetCaseId}`);
      return;
    }
    navigate('/documents');
  };

  const parsedDeadline = deadlineService.parseDeadline(targetCase?.deadline || 'In 3 days');
  const isResolved = targetCase?.status === 'Resolved' || targetCase?.status === 'Concluded';

  return (
    <div className="sticky top-24 bg-surface/90 backdrop-blur-md rounded-xl p-stack-md shadow-lg border border-outline-variant/30 flex flex-col gap-stack-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-outline-variant/30 pb-stack-sm">
        <div className="flex items-center gap-unit">
          <span
            className="material-symbols-outlined text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            radar
          </span>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
            ActionRadar
          </h2>
        </div>
        <div className={`w-2 h-2 rounded-full ${isResolved ? 'bg-primary' : 'bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse'}`}></div>
      </div>

      {/* Action Card */}
      {isResolved ? (
        <div className="bg-primary/5 rounded-lg p-stack-sm border border-primary/20 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
          <div className="pl-unit space-y-2">
            <div className="flex items-center gap-1.5 text-primary">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="font-caption text-caption font-bold uppercase tracking-wider">
                Matter Concluded
              </span>
            </div>
            <h3 className="font-title-lg text-title-lg text-on-background font-semibold">
              {targetCase?.title || 'Resolved Dispute'}
            </h3>
            <p className="text-caption text-on-surface-variant">
              This matter has been successfully settled and closed. All generated notices and filings are archived in your library.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-error-container/20 rounded-lg p-stack-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#ef4444]"></div>
          <div className="pl-unit">
            <div className="flex items-center gap-unit mb-unit">
              <span className="bg-[#ef4444]/10 text-[#ef4444] font-caption text-caption px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                Priority: {targetCase?.priority || 'High'}
              </span>
              <span className="text-on-surface-variant font-caption text-caption flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                Deadline: {parsedDeadline.label}
              </span>
            </div>

            <h3 className="font-title-lg text-title-lg text-on-background mt-unit mb-stack-sm font-semibold">
              {targetCase?.nextAction || linkedDoc?.title || 'Review Next Action'}
            </h3>

            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md text-xs">
              {linkedDoc
                ? `The draft notice for "${targetCase?.title || 'this case'}" is ready. Review and dispatch before the statutory period expires.`
                : (targetCase?.description || 'Active statutory monitoring for this matter.')}
            </p>

            <button
              type="button"
              onClick={handleAction}
              className="w-full bg-[#ef4444] text-white font-label-md text-label-md px-stack-md py-stack-sm rounded-lg hover:bg-[#b91c1c] transition-colors shadow-sm flex items-center justify-center gap-unit group text-xs"
            >
              <span>{targetCase?.nextActionButtonText || 'Take Action Now'}</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </div>
        </div>
      )}

      {/* AI Insights Card */}
      <div className="mt-stack-sm">
        <h4 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mb-stack-sm text-xs font-semibold">
          AI Jurisdiction Insights
        </h4>
        <div className="bg-surface-container-lowest rounded-lg p-stack-sm border border-outline-variant/20 flex gap-stack-sm items-start">
          <span
            className="material-symbols-outlined text-primary text-[20px] mt-0.5 shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            lightbulb
          </span>
          <p className="font-caption text-caption text-on-surface leading-relaxed text-xs">
            {targetCase?.domain === 'Tenant & Housing Rights'
              ? 'In your jurisdiction, formal legal notices specifying statutory 14-day cure windows result in deposit refund in over 78% of reported landlord disputes without tribunal litigation.'
              : targetCase?.domain === 'Financial Fraud & Cybercrime'
              ? 'Reporting unauthorized transactions to the banking ombudsman with transaction timestamps invokes RBI zero-liability protection when filed within 72 hours.'
              : 'Serving a formal statutory notice establishes clear evidentiary timelines and prevents opposing parties from claiming lack of notice in subsequent commission hearings.'}
          </p>
        </div>
      </div>
    </div>
  );
}
