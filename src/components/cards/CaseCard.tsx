import React from 'react';
import { CaseItem } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Clock, 
  ArrowRight, 
  Building2, 
  FileText, 
  Paperclip,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CaseCardProps {
  caseItem: CaseItem;
  className?: string;
}

export const CaseCard: React.FC<CaseCardProps> = ({ caseItem, className = '' }) => {
  const navigate = useNavigate();

  const completedSteps = caseItem.timeline.filter(t => t.completed).length;
  const progressPercent = Math.round((completedSteps / caseItem.timeline.length) * 100);

  return (
    <div 
      onClick={() => navigate(`/cases/${caseItem.id}`)}
      className={`bg-white rounded-2xl border border-slate-200/90 hover:border-civic-300 p-5 sm:p-6 shadow-subtle hover:shadow-elevated transition-all duration-200 cursor-pointer flex flex-col justify-between group ${className}`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <StatusBadge issueType={caseItem.issueType} size="sm" />
            <span className="text-[11px] font-mono text-slate-400 font-medium">
              #{caseItem.id.toUpperCase()}
            </span>
          </div>

          <StatusBadge status={caseItem.status} size="sm" />
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-civic-700 transition-colors leading-snug line-clamp-2">
          {caseItem.title}
        </h3>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {caseItem.summary}
        </p>

        {/* Authority involved */}
        <div className="mt-3.5 flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{caseItem.authorityInvolved}</span>
        </div>
      </div>

      {/* Footer Info & Progress */}
      <div className="mt-5 pt-4 border-t border-slate-100 space-y-3">
        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1 font-medium">
            <span>Progress ({completedSteps}/8 Steps)</span>
            <span className="text-slate-700 font-semibold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${
                caseItem.status === 'resolved' ? 'bg-emerald-500' : 'bg-civic-600'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Statutory deadline & action count */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px]">
              <FileText className="w-3 h-3 text-slate-400" />
              {caseItem.documentIds.length} docs
            </span>
            <span className="flex items-center gap-1 text-[11px]">
              <Paperclip className="w-3 h-3 text-slate-400" />
              {caseItem.evidenceIds.length} evidence
            </span>
          </div>

          {caseItem.deadlineDaysRemaining !== undefined && caseItem.status !== 'resolved' ? (
            <div className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              <Clock className="w-3 h-3" />
              <span>{caseItem.deadlineDaysRemaining}d left</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-xs text-civic-600 font-medium group-hover:translate-x-0.5 transition-transform">
              <span>View Case</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
