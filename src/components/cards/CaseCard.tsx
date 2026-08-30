import React from 'react';
import { motion } from 'framer-motion';
import { CaseItem } from '../../types';
import { 
  Building2, 
  FileText, 
  Paperclip, 
  ArrowUpRight,
  Clock,
  Sparkles,
  ShieldCheck
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

  // Pastel accent themes matching the reference image cards
  const pastelStyles = {
    rti: {
      bg: 'bg-pastel-blue',
      border: 'border-blue-200/80',
      pill: 'bg-white/80 text-blue-900',
      illustration: '🔵'
    },
    consumer: {
      bg: 'bg-pastel-yellow',
      border: 'border-amber-200/80',
      pill: 'bg-white/80 text-amber-900',
      illustration: '🟡'
    },
    tenant: {
      bg: 'bg-pastel-coral',
      border: 'border-orange-200/80',
      pill: 'bg-white/80 text-orange-900',
      illustration: '🟠'
    },
    workplace: {
      bg: 'bg-pastel-purple',
      border: 'border-purple-200/80',
      pill: 'bg-white/80 text-purple-900',
      illustration: '🟣'
    },
    govt_scheme: {
      bg: 'bg-pastel-mint',
      border: 'border-emerald-200/80',
      pill: 'bg-white/80 text-emerald-900',
      illustration: '🟢'
    },
    cyber: {
      bg: 'bg-pastel-pink',
      border: 'border-rose-200/80',
      pill: 'bg-white/80 text-rose-900',
      illustration: '🔴'
    }
  }[caseItem.issueType] || {
    bg: 'bg-pastel-blue',
    border: 'border-blue-200/80',
    pill: 'bg-white/80 text-blue-900',
    illustration: '🔷'
  };

  return (
    <motion.div 
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => navigate(`/cases/${caseItem.id}`)}
      className={`bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer flex flex-col justify-between group ${className}`}
    >
      {/* Upper Content Section */}
      <div>
        {/* Top Header Row with Pill and Corner Arrow */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold ${pastelStyles.pill} border border-slate-200/60 shadow-subtle`}>
            {caseItem.deadlineDaysRemaining !== undefined && caseItem.status !== 'resolved' ? (
              <>
                <Clock className="w-3 h-3 text-slate-700" />
                <span>{caseItem.deadlineDaysRemaining} days window</span>
              </>
            ) : (
              <span>{caseItem.status.replace('_', ' ').toUpperCase()}</span>
            )}
          </span>

          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors shadow-subtle">
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:scale-110" />
          </div>
        </div>

        {/* Big Punchy Title */}
        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug tracking-tight group-hover:text-slate-800 line-clamp-2">
          {caseItem.title}
        </h3>

        {/* Summary */}
        <p className="text-xs sm:text-sm text-slate-500 mt-2 line-clamp-2 leading-relaxed font-medium">
          {caseItem.summary}
        </p>
      </div>

      {/* Lower Pastel Colored Container (Matching Image) */}
      <div className={`mt-6 rounded-2xl ${pastelStyles.bg} p-4 sm:p-5 flex flex-col justify-between gap-3 border ${pastelStyles.border} transition-transform`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-800 shrink-0" />
            <span className="text-xs font-bold text-slate-800 truncate max-w-[170px]">
              {caseItem.authorityInvolved}
            </span>
          </div>

          <span className="text-xs font-extrabold text-slate-900 bg-white/80 px-2.5 py-0.5 rounded-full border border-white/60">
            {progressPercent}%
          </span>
        </div>

        {/* Subtle Progress Strip */}
        <div className="w-full bg-black/10 h-1.5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-slate-900 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Footer Meta */}
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 pt-1">
          <span className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5" />
            <span>{caseItem.documentIds.length} doc{caseItem.documentIds.length !== 1 ? 's' : ''}</span>
          </span>

          <span className="flex items-center gap-1">
            <Paperclip className="w-3.5 h-3.5" />
            <span>{caseItem.evidenceIds.length} evidence</span>
          </span>

          <span className="text-[10px] text-slate-600 font-mono">
            #{caseItem.id.toUpperCase()}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

