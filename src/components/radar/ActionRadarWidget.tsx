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
  Sparkles,
  Zap
} from 'lucide-react';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';
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
      className={`bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden backdrop-blur-xl ${className}`}
    >
      {/* Radar Top Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950/80 to-slate-950 p-6 sm:p-8 text-white relative overflow-hidden border-b border-slate-800">
        {/* Animated Radar Background Graphic */}
        <div className="absolute right-[-40px] top-[-40px] w-72 h-72 rounded-full border border-civic-400/20 pointer-events-none hidden sm:block">
          <div className="absolute inset-8 rounded-full border border-civic-400/20" />
          <div className="absolute inset-16 rounded-full border border-civic-400/20" />
          <div className="absolute inset-24 rounded-full border border-civic-400/20" />
          <div className="absolute inset-0 rounded-full radar-sweep-cone animate-radar-sweep origin-center" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-civic-400 rounded-full animate-ping shadow-glow" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-civic-950/80 border border-civic-400/40 text-civic-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-glow">
              <Compass className="w-3.5 h-3.5 text-civic-400 animate-spin" style={{ animationDuration: '10s' }} />
              ActionRadar Diagnostics
            </span>
            <StatusBadge issueType={issueType} size="sm" />
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-full shadow-glow-emerald">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {confidenceScore}% Strategic Match
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Recommended Statutory Action Plan
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
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
          className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-civic-500/40 shadow-glow relative"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-civic-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-glow">
              <Target className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider text-civic-400">
                Primary Step to Take
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5 leading-snug">
                {recommendedAction}
              </h3>
              
              <div className="mt-3 text-sm text-slate-300 leading-relaxed">
                <p className="font-semibold text-slate-200 mb-1">Why this action is recommended:</p>
                <p className="text-slate-300">{actionRationale}</p>
              </div>

              <div className="mt-4 inline-flex flex-wrap items-center gap-2 text-xs text-slate-400 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-lg">
                <span className="font-semibold text-slate-300">Governing Statute:</span>
                <span className="text-civic-400 font-medium">{statutoryRule}</span>
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
            className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-civic-400" />
                  Required Documents Checklist
                </h4>
                <span className="text-xs text-slate-400 font-medium">
                  {requiredDocsList.filter(d => d.mandatory).length} Mandatory
                </span>
              </div>

              <ul className="space-y-2.5">
                {requiredDocsList.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80 shadow-subtle">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${doc.mandatory ? 'text-civic-400' : 'text-slate-500'}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{doc.name}</span>
                        {doc.mandatory ? (
                          <span className="text-[10px] uppercase font-bold text-amber-300 bg-amber-950/80 px-1.5 py-0.5 rounded border border-amber-500/40">Required</span>
                        ) : (
                          <span className="text-[10px] text-slate-400">Optional</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{doc.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2 text-xs text-slate-400">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0" />
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
            <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/30 shadow-glow-amber">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  Statutory Response Window
                </span>
                <span className="text-xs font-bold px-2 py-0.5 bg-amber-950 text-amber-300 rounded-full border border-amber-500/40">
                  {deadlineDays} Days
                </span>
              </div>

              <div className="mt-3">
                <p className="text-base font-bold text-amber-200">
                  {statutoryTimeframe}
                </p>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Upon dispatching your notice, the statutory countdown begins. If the opposing party fails to comply within this period, higher appellate remedies unlock automatically.
                </p>
              </div>

              {deadlineDate && (
                <div className="mt-3 pt-2.5 border-t border-amber-500/20 flex items-center justify-between text-xs text-amber-300">
                  <span>Target Response Date:</span>
                  <span className="font-bold">{deadlineDate}</span>
                </div>
              )}
            </div>

            {/* Sources Quick Link Card */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between hover:bg-slate-900 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 shadow-xs">
                  <BookOpen className="w-4 h-4 text-civic-400" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-white">Verified Legal Sources & Precedents</h5>
                  <p className="text-[11px] text-slate-400">Citizen charters, court precedents & gazettes</p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleSourcesClick}
                rightIcon={<ExternalLink className="w-3 h-3" />}
                className="text-xs text-civic-400 hover:text-civic-300 hover:bg-slate-800"
              >
                View Sources
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Primary CTA Action Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.3 }}
          className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="text-xs text-slate-400 text-center sm:text-left">
            <span className="font-semibold text-slate-200">Next Step:</span> Generate and review your customized formal statutory document.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="md"
              onClick={handleSourcesClick}
              className="flex-1 sm:flex-none border-slate-700 text-slate-300 hover:text-white"
            >
              Explore Sources
            </Button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDocClick}
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-civic-600 via-blue-600 to-indigo-600 hover:from-civic-500 hover:to-indigo-500 text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2 cursor-pointer flex-1 sm:flex-none"
            >
              <span>Prepare Document</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

