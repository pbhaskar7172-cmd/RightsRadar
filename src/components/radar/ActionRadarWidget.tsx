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
  Target
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
      className={`bg-white rounded-3xl border border-slate-200/90 shadow-elevated overflow-hidden ${className}`}
    >
      {/* Radar Top Header Banner */}
      <div className="bg-gradient-to-r from-navy-900 via-slate-900 to-navy-950 p-6 sm:p-8 text-white relative overflow-hidden">
        {/* Animated Radar Background Graphic */}
        <div className="absolute right-[-40px] top-[-40px] w-72 h-72 rounded-full border border-civic-400/20 pointer-events-none hidden sm:block">
          <div className="absolute inset-8 rounded-full border border-civic-400/20" />
          <div className="absolute inset-16 rounded-full border border-civic-400/20" />
          <div className="absolute inset-24 rounded-full border border-civic-400/20" />
          <div className="absolute inset-0 rounded-full radar-sweep-cone animate-radar-sweep origin-center" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-civic-400 rounded-full animate-ping" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-civic-500/20 border border-civic-400/40 text-civic-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-civic-300 animate-spin" style={{ animationDuration: '10s' }} />
              ActionRadar Diagnostics
            </span>
            <StatusBadge issueType={issueType} size="sm" />
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-0.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              {confidenceScore}% Strategic Match
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-tight">
            Recommended Action Plan
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Based on statutory provisions and your problem particulars, here is the most effective legal and civic recourse.
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
          className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-civic-50/70 via-white to-blue-50/40 border border-civic-100 shadow-sm relative"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-civic-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-civic-500/20">
              <Target className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider text-civic-700">
                Primary Step to Take
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5 leading-snug">
                {recommendedAction}
              </h3>
              
              <div className="mt-3 text-sm text-slate-600 leading-relaxed">
                <p className="font-medium text-slate-700 mb-1">Why this action is recommended:</p>
                <p className="text-slate-600">{actionRationale}</p>
              </div>

              <div className="mt-4 inline-flex flex-wrap items-center gap-2 text-xs text-slate-500 bg-white/80 border border-slate-200/80 px-3 py-1.5 rounded-lg">
                <span className="font-semibold text-slate-700">Governing Statute:</span>
                <span className="text-civic-700 font-medium">{statutoryRule}</span>
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
            className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-civic-600" />
                  Required Documents Checklist
                </h4>
                <span className="text-xs text-slate-400 font-medium">
                  {requiredDocsList.filter(d => d.mandatory).length} Mandatory
                </span>
              </div>

              <ul className="space-y-2.5">
                {requiredDocsList.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/60 shadow-subtle">
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${doc.mandatory ? 'text-civic-600' : 'text-slate-400'}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800">{doc.name}</span>
                        {doc.mandatory ? (
                          <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">Required</span>
                        ) : (
                          <span className="text-[10px] text-slate-400">Optional</span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{doc.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-2 text-xs text-slate-500">
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
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  Statutory Response Window
                </span>
                <span className="text-xs font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full border border-amber-300">
                  {deadlineDays} Days
                </span>
              </div>

              <div className="mt-3">
                <p className="text-base font-bold text-slate-900">
                  {statutoryTimeframe}
                </p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Upon dispatching your notice, the statutory countdown begins. If the opposing party or authority fails to comply within this period, higher appellate remedies unlock automatically.
                </p>
              </div>

              {deadlineDate && (
                <div className="mt-3 pt-2.5 border-t border-amber-200/60 flex items-center justify-between text-xs text-amber-900">
                  <span>Target Response Date:</span>
                  <span className="font-bold">{deadlineDate}</span>
                </div>
              )}
            </div>

            {/* Sources Quick Link Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between hover:bg-slate-100/80 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-xs">
                  <BookOpen className="w-4 h-4 text-civic-600" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Verified Legal Sources & Precedents</h5>
                  <p className="text-[11px] text-slate-500">Citizen charters, court precedents & statutory gazettes</p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleSourcesClick}
                rightIcon={<ExternalLink className="w-3 h-3" />}
                className="text-xs text-civic-700 hover:text-civic-800"
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
          className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="text-xs text-slate-500 text-center sm:text-left">
            <span className="font-semibold text-slate-700">Next Step:</span> Generate and review your customized formal document.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="md"
              onClick={handleSourcesClick}
              className="flex-1 sm:flex-none"
            >
              Explore Sources
            </Button>
            <Button
              variant="civic-glow"
              size="lg"
              onClick={handleDocClick}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="flex-1 sm:flex-none"
            >
              Prepare Document
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
