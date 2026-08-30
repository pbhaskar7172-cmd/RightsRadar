import React from 'react';
import { motion } from 'framer-motion';
import { TimelineEvent, CaseStatus } from '../../types';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  AlertTriangle, 
  Send, 
  FileText, 
  Scale, 
  Award,
  ArrowUpRight
} from 'lucide-react';

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
  const getStepIcon = (stepId: CaseStatus, completed: boolean, current?: boolean) => {
    if (completed) {
      return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
    }
    if (current) {
      return <Clock className="w-5 h-5 text-slate-900" />;
    }
    if (stepId === 'escalation') {
      return <AlertTriangle className="w-5 h-5 text-purple-600" />;
    }
    if (stepId === 'resolved') {
      return <Award className="w-5 h-5 text-slate-400" />;
    }
    return <Circle className="w-5 h-5 text-slate-300" />;
  };

  return (
    <div className={`bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card text-slate-900 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 mb-6 gap-4">
        <div>
          <h3 className="text-lg font-black text-slate-950 flex items-center gap-2">
            <Scale className="w-5 h-5 text-slate-800" />
            <span>Statutory Case Progression Timeline</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            8-stage statutory lifecycle tracking and milestone verification
          </p>
        </div>

        {/* Quick Progression Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {currentStatus === 'action_recommended' && onAdvanceStep && (
            <button
              onClick={() => onAdvanceStep('document_prepared')}
              className="btn-pill-outline text-xs flex items-center gap-1.5"
            >
              <span>Draft Ready</span>
              <FileText className="w-3.5 h-3.5" />
            </button>
          )}

          {currentStatus === 'document_prepared' && onOpenSubmissionModal && (
            <button
              onClick={onOpenSubmissionModal}
              className="btn-black py-2 px-4 text-xs flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Record Dispatch</span>
            </button>
          )}

          {currentStatus === 'response_pending' && onOpenEscalationModal && (
            <button
              onClick={onOpenEscalationModal}
              className="btn-pill-outline text-xs border-purple-300 text-purple-900 bg-pastel-purple-light hover:bg-purple-100 flex items-center gap-1.5"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-purple-700" />
              <span>Escalate Tier</span>
            </button>
          )}

          {currentStatus !== 'resolved' && onOpenResolveModal && (
            <button
              onClick={onOpenResolveModal}
              className="btn-pill-outline text-xs border-emerald-300 text-emerald-900 bg-pastel-mint-light hover:bg-emerald-100 flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
              <span>Mark Resolved</span>
            </button>
          )}
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-[19px] sm:before:left-[27px] before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {timeline.map((event, idx) => {
          const isCompleted = event.completed;
          const isCurrent = event.current;

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
                className={`absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full flex items-center justify-center bg-white border-2 transition-colors z-10 ${
                  isCompleted
                    ? 'border-emerald-500 text-emerald-600'
                    : isCurrent
                    ? 'border-slate-900 text-slate-950 ring-4 ring-slate-100'
                    : 'border-slate-300 text-slate-400'
                }`}
              >
                {getStepIcon(event.stepId, isCompleted, isCurrent)}
              </div>

              {/* Event Content Box */}
              <div
                className={`p-5 rounded-3xl border transition-all ${
                  isCurrent
                    ? 'bg-pastel-yellow-light border-slate-900 shadow-card'
                    : isCompleted
                    ? 'bg-slate-50 border-slate-200 shadow-subtle'
                    : 'bg-white border-dashed border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-900">
                      {idx + 1}. {event.label}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-950 bg-white border border-slate-300 px-2.5 py-0.5 rounded-full">
                        Active Stage
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-[10px] font-extrabold text-emerald-800 bg-pastel-mint px-2 py-0.5 rounded-full border border-emerald-300">
                        Completed
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-slate-400 font-semibold">
                    {event.timestamp}
                  </span>
                </div>

                <h4 className="text-sm font-extrabold text-slate-950 mt-1">
                  {event.title}
                </h4>

                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed font-medium">
                  {event.description}
                </p>

                {/* Escalation Details Badge */}
                {event.escalationInfo && (
                  <div className="mt-3 p-3.5 bg-pastel-purple-light rounded-2xl border border-purple-200 text-xs text-purple-950 space-y-1 font-medium">
                    <div className="font-bold flex items-center gap-1.5 text-purple-900">
                      <AlertTriangle className="w-3.5 h-3.5 text-purple-700" />
                      Escalated to: {event.escalationInfo.appellateTier}
                    </div>
                    <div><span className="font-bold text-slate-700">Designated Forum:</span> {event.escalationInfo.escalatedTo}</div>
                    <div><span className="font-bold text-slate-700">Grounds:</span> {event.escalationInfo.grounds}</div>
                  </div>
                )}

                {/* Notes if any */}
                {event.notes && (
                  <div className="mt-2 text-xs bg-white p-3 rounded-2xl border border-slate-200 text-slate-700 font-medium">
                    <span className="font-bold text-slate-900">Filing Note: </span>
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


