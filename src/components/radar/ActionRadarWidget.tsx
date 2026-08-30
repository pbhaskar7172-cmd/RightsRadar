import React from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  CheckCircle2, 
  FileText, 
  Clock, 
  BookOpen, 
  ArrowRight, 
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  Target,
  ArrowUpRight
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { IssueTypeId } from '../../types';
import { ISSUE_TYPES } from '../../data/issueTypes';
import { useNavigate } from 'react-router-dom';

export interface ActionRadarProps {
  caseId?: string;
  issueType: IssueTypeId;
  recommendedAction: string;
  actionRationale: string;
  statutoryRule: string;
  statutoryTimeframe: string;
  confidenceScore: number;
  requiredDocsList: { name: string; description: string; mandatory: boolean }[];
  deadlineDays: number;
  deadlineDate?: string;
  onPrepareDocument?: () => void;
  onViewSources?: () => void;
  className?: string;
}

export const ActionRadarWidget: React.FC<ActionRadarProps> = ({
  caseId,
  issueType,
  recommendedAction,
  actionRationale,
  statutoryRule,
  statutoryTimeframe,
  confidenceScore = 95,
  requiredDocsList = [],
  deadlineDays = 30,
  deadlineDate,
  onPrepareDocument,
  onViewSources,
  className = '',
}) => {
  const navigate = useNavigate();
  const config = ISSUE_TYPES[issueType];

  const handleDocClick = () => {
    if (onPrepareDocument) {
      onPrepareDocument();
    } else if (caseId) {
      navigate(`/document?caseId=${caseId}`);
    } else {
      navigate('/document');
    }
  };

  const handleSourcesClick = () => {
    if (onViewSources) {
      onViewSources();
    } else {
      navigate(`/sources?type=${issueType}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden text-slate-900 ${className}`}
    >
      {/* Radar Top Header Banner */}
      <div className="bg-slate-900 p-6 sm:p-8 text-white relative overflow-hidden">
        {/* Animated Radar Background Graphic */}
        <div className="absolute right-[-40px] top-[-40px] w-72 h-72 rounded-full border border-white/10 pointer-events-none hidden sm:block">
          <div className="absolute inset-8 rounded-full border border-white/10" />
          <div className="absolute inset-16 rounded-full border border-white/10" />
          <div className="absolute inset-24 rounded-full border border-white/10" />
          <div className="absolute inset-0 rounded-full radar-sweep-cone animate-radar-sweep origin-center opacity-40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full animate-ping" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-extrabold uppercase tracking-wider backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
              ActionRadar Diagnostics
            </span>
            <StatusBadge issueType={issueType} size="sm" />
            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-slate-900 bg-pastel-mint px-3 py-1 rounded-full border border-emerald-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              {confidenceScore}% Strategic Match
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
            Recommended Statutory Action Plan
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            Based on statutory provisions and your problem particulars, here is your legally mandated recourse.
          </p>
        </div>
      </div>

      {/* Main Radar Content */}
      <div className="p-6 sm:p-8 space-y-8">
        {/* Recommended Action Card */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
          className="p-6 rounded-3xl bg-pastel-blue-light border border-blue-200 relative"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Target className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-900">
                Primary Step to Take
              </span>
              <h3 className="text-xl font-black text-slate-950 mt-0.5 leading-snug">
                {recommendedAction}
              </h3>
              
              <div className="mt-3 text-sm text-slate-700 leading-relaxed">
                <p className="font-extrabold text-slate-900 mb-1">Why this action is recommended:</p>
                <p className="font-medium text-slate-700">{actionRationale}</p>
              </div>

              <div className="mt-4 inline-flex flex-wrap items-center gap-2 text-xs text-slate-700 bg-white border border-blue-200 px-3.5 py-1.5 rounded-full font-bold shadow-subtle">
                <span className="text-slate-500">Governing Statute:</span>
                <span className="text-slate-900 font-extrabold">{statutoryRule}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Two-Column Grid: Required Docs & Strict Deadline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Required Documents */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.3 }}
            className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-black text-slate-950 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-700" />
                  Required Documents Checklist
                </h4>
                <span className="text-xs text-slate-500 font-extrabold">
                  {requiredDocsList.filter(d => d.mandatory).length} Mandatory
                </span>
              </div>

              <ul className="space-y-2.5">
                {requiredDocsList.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-subtle">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${doc.mandatory ? 'text-slate-900' : 'text-slate-400'}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{doc.name}</span>
                        {doc.mandatory ? (
                          <span className="text-[10px] uppercase font-extrabold text-slate-900 bg-pastel-yellow px-2 py-0.5 rounded-full border border-amber-300">Required</span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-medium">Optional</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{doc.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-500 font-medium">
              <AlertCircle className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>You can attach evidence or upload documents at any stage.</span>
            </div>
          </motion.div>

          {/* Statutory Deadlines & Sources */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="space-y-4 flex flex-col justify-between"
          >
            {/* Deadline Block */}
            <div className="p-6 rounded-3xl bg-pastel-yellow-light border border-amber-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-700" />
                  Statutory Response Window
                </span>
                <span className="text-xs font-extrabold px-3 py-1 bg-white text-slate-950 rounded-full border border-amber-300 shadow-subtle">
                  {deadlineDays} Days
                </span>
              </div>

              <div className="mt-3">
                <p className="text-lg font-black text-slate-950">
                  {statutoryTimeframe}
                </p>
                <p className="text-xs text-slate-700 mt-1.5 leading-relaxed font-medium">
                  Upon dispatching your notice, the statutory countdown begins. If the opposing party fails to comply within this period, higher appellate remedies unlock automatically.
                </p>
              </div>

              {deadlineDate && (
                <div className="mt-3 pt-2.5 border-t border-amber-300/40 flex items-center justify-between text-xs text-slate-900 font-bold">
                  <span>Target Response Date:</span>
                  <span className="font-extrabold">{deadlineDate}</span>
                </div>
              )}
            </div>

            {/* Sources Quick Link Card */}
            <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200 flex items-center justify-between hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-subtle">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-extrabold text-slate-900">Verified Legal Sources & Precedents</h5>
                  <p className="text-[11px] text-slate-500 font-medium">Citizen charters, court precedents & gazettes</p>
                </div>
              </div>

              <button
                onClick={handleSourcesClick}
                className="btn-pill-outline text-xs"
              >
                <span>View Sources</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Primary CTA Action Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.3 }}
          className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="text-xs text-slate-500 text-center sm:text-left font-medium">
            <span className="font-extrabold text-slate-900">Next Step:</span> Generate and review your customized formal statutory document.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleSourcesClick}
              className="btn-pill-outline flex-1 sm:flex-none"
            >
              Explore Sources
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDocClick}
              className="btn-black py-3 px-6 text-sm flex items-center justify-center gap-2 flex-1 sm:flex-none"
            >
              <span>Prepare Document</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};


