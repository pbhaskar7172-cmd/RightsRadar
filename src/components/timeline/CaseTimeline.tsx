import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TimelineEvent, CaseStatus } from '../../types';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  Send, 
  FileText, 
  Scale, 
  ChevronDown, 
  ChevronUp,
  Award,
  Sparkles
} from 'lucide-react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

interface CaseTimelineProps {
  timeline: TimelineEvent[];
  currentStatus: CaseStatus;
  caseId: string;
  onAdvanceStep?: (targetStep: CaseStatus, notes?: string) => void;
  onOpenSubmissionModal?: () => void;
  onOpenEscalationModal?: () => void;
  onOpenResolveModal?: () => void;
  className?: string;
}

export const CaseTimeline: React.FC<CaseTimelineProps> = ({
  timeline,
  currentStatus,
  caseId,
  onAdvanceStep,
  onOpenSubmissionModal,
  onOpenEscalationModal,
  onOpenResolveModal,
  className = '',
}) => {
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const getStepIcon = (stepId: CaseStatus, completed: boolean, current?: boolean) => {
    if (completed) {
      return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    }
    if (current) {
      return <Clock className="w-5 h-5 text-civic-400 animate-pulse" />;
    }
    if (stepId === 'escalation') {
      return <AlertTriangle className="w-5 h-5 text-purple-400" />;
    }
    if (stepId === 'resolved') {
      return <Award className="w-5 h-5 text-slate-500" />;
    }
    return <Circle className="w-5 h-5 text-slate-600" />;
  };

  return (
    <div className={`bg-slate-900/90 rounded-3xl border border-slate-800 p-5 sm:p-7 shadow-2xl backdrop-blur-xl text-slate-100 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-800 mb-6 gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Scale className="w-4 h-4 text-civic-400" />
            <span>Statutory Case Progression Timeline</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            8-stage statutory lifecycle tracking and milestone verification
          </p>
        </div>

        {/* Quick Progression Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {currentStatus === 'action_recommended' && onAdvanceStep && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAdvanceStep('document_prepared')}
              rightIcon={<FileText className="w-3.5 h-3.5" />}
              className="border-slate-700 text-slate-300 hover:text-white"
            >
              Draft Ready
            </Button>
          )}

          {currentStatus === 'document_prepared' && onOpenSubmissionModal && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenSubmissionModal}
              className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-civic-600 to-indigo-600 text-white font-bold text-xs shadow-glow flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Record Dispatch</span>
            </motion.button>
          )}

          {currentStatus === 'response_pending' && onOpenEscalationModal && (
            <Button
              size="sm"
              variant="outline"
              onClick={onOpenEscalationModal}
              leftIcon={<AlertTriangle className="w-3.5 h-3.5 text-purple-400" />}
              className="border-purple-500/40 text-purple-300 hover:bg-purple-950/50"
            >
              Escalate Tier
            </Button>
          )}

          {currentStatus !== 'resolved' && onOpenResolveModal && (
            <Button
              size="sm"
              variant="secondary"
              onClick={onOpenResolveModal}
              leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200"
            >
              Mark Resolved
            </Button>
          )}
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-[19px] sm:before:left-[27px] before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
        {timeline.map((event, idx) => {
          const isCompleted = event.completed;
          const isCurrent = event.current;
          const isExpanded = expandedStep === event.stepId;

          return (
            <motion.div
              key={event.stepId}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`relative group transition-all duration-200 ${
                isCurrent ? 'opacity-100' : isCompleted ? 'opacity-95' : 'opacity-50'
              }`}
            >
              {/* Timeline Node Dot */}
              <div
                className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center bg-slate-950 border-2 transition-colors z-10 ${
                  isCompleted
                    ? 'border-emerald-500 text-emerald-400 shadow-glow-emerald'
                    : isCurrent
                    ? 'border-civic-500 text-civic-400 shadow-glow ring-4 ring-civic-500/20'
                    : 'border-slate-800 text-slate-600'
                }`}
              >
                {getStepIcon(event.stepId, isCompleted, isCurrent)}
              </div>

              {/* Event Content Box */}
              <div
                className={`p-4 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-slate-950/90 border-civic-500/50 shadow-glow'
                    : isCompleted
                    ? 'bg-slate-950/70 border-slate-800 hover:border-slate-700 shadow-elevated'
                    : 'bg-slate-950/30 border-dashed border-slate-800/80'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-200">
                      {idx + 1}. {event.label}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-civic-300 bg-civic-950 border border-civic-500/40 px-2 py-0.5 rounded-full shadow-glow">
                        Active Stage
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                        Completed
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-slate-500 font-medium">
                    {event.timestamp}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mt-1">
                  {event.title}
                </h4>

                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  {event.description}
                </p>

                {/* Escalation Details Badge */}
                {event.escalationInfo && (
                  <div className="mt-3 p-3 bg-purple-950/60 rounded-xl border border-purple-500/40 text-xs text-purple-200 space-y-1 shadow-glow-indigo">
                    <div className="font-bold flex items-center gap-1.5 text-purple-300">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Escalated to: {event.escalationInfo.appellateTier}
                    </div>
                    <div><span className="font-medium text-slate-400">Designated Forum:</span> {event.escalationInfo.escalatedTo}</div>
                    <div><span className="font-medium text-slate-400">Grounds:</span> {event.escalationInfo.grounds}</div>
                  </div>
                )}

                {/* Notes if any */}
                {event.notes && (
                  <div className="mt-2 text-xs bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-slate-300">
                    <span className="font-semibold text-slate-200">Filing Note: </span>
                    {event.notes}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

