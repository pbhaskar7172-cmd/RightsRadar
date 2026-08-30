import React from 'react';
import { motion } from 'framer-motion';
import { CaseItem } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Clock, 
  ArrowRight, 
  Building2, 
  FileText, 
  Paperclip, 
  CheckCircle2,
  Calendar,
  Sparkles
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
    <motion.div 
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => navigate(`/cases/${caseItem.id}`)}
      className={`bg-slate-900/85 hover:bg-slate-850/90 rounded-2xl border border-slate-800/90 hover:border-civic-500/50 p-5 sm:p-6 shadow-elevated hover:shadow-glow transition-all duration-200 cursor-pointer flex flex-col justify-between group backdrop-blur-xl ${className}`}
    >
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <StatusBadge issueType={caseItem.issueType} size="sm" />
            <span className="text-[10px] font-mono text-slate-500 font-semibold px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800">
              #{caseItem.id.toUpperCase()}
            </span>
          </div>

          <StatusBadge status={caseItem.status} size="sm" />
        </div>

        {/* Title */}
        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-civic-300 transition-colors leading-snug line-clamp-2">
          {caseItem.title}
        </h3>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-2 leading-relaxed">
          {caseItem.summary}
        </p>

        {/* Authority involved */}
        <div className="mt-3.5 flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <Building2 className="w-3.5 h-3.5 text-civic-400 shrink-0" />
          <span className="truncate">{caseItem.authorityInvolved}</span>
        </div>
      </div>

      {/* Footer Info & Progress */}
      <div className="mt-5 pt-4 border-t border-slate-800 space-y-3">
        {/* Progress bar */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 font-medium">
            <span className="flex items-center gap-1">
              <span>Timeline Progress</span>
              <span className="text-[10px] text-slate-500 font-normal">({completedSteps}/8 Steps)</span>
            </span>
            <span className="text-white font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800/80 p-[1px]">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                caseItem.status === 'resolved' 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-glow-emerald' 
                  : 'bg-gradient-to-r from-civic-500 via-blue-500 to-indigo-500 shadow-glow'
              }`}
            />
          </div>
        </div>

        {/* Statutory deadline & action count */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>{caseItem.documentIds.length} doc{caseItem.documentIds.length !== 1 ? 's' : ''}</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] text-slate-400">
              <Paperclip className="w-3.5 h-3.5 text-slate-500" />
              <span>{caseItem.evidenceIds.length} evidence</span>
            </span>
          </div>

          {caseItem.deadlineDaysRemaining !== undefined && caseItem.status !== 'resolved' ? (
            <div className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded-lg border border-amber-500/40 shadow-glow-amber">
              <Clock className="w-3 h-3 text-amber-400" />
              <span>{caseItem.deadlineDaysRemaining}d left</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-xs text-civic-400 font-semibold group-hover:translate-x-1 transition-transform">
              <span>View Case</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
