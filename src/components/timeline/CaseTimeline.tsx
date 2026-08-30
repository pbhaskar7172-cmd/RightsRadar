import React, { useState } from 'react';
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
  Award
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
      return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
    }
    if (current) {
      return <Clock className="w-5 h-5 text-civic-600 animate-pulse" />;
    }
    if (stepId === 'escalation') {
      return <AlertTriangle className="w-5 h-5 text-purple-400" />;
    }
    if (stepId === 'resolved') {
      return <Award className="w-5 h-5 text-slate-300" />;
    }
    return <Circle className="w-5 h-5 text-slate-300" />;
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm ${className}`}>
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-4 h-4 text-civic-600" />
            Case Progression Timeline
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            8-stage statutory lifecycle tracking and milestone verification
          </p>
        </div>

        {/* Quick Progression Controls */}
        <div className="flex items-center gap-2">
          {currentStatus === 'action_recommended' && onAdvanceStep && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onAdvanceStep('document_prepared')}
              rightIcon={<FileText className="w-3.5 h-3.5" />}
            >
              Draft Ready
            </Button>
          )}

          {currentStatus === 'document_prepared' && onOpenSubmissionModal && (
            <Button
              size="sm"
              variant="civic-glow"
              onClick={onOpenSubmissionModal}
              leftIcon={<Send className="w-3.5 h-3.5" />}
            >
              Record Dispatch
            </Button>
          )}

          {currentStatus === 'response_pending' && onOpenEscalationModal && (
            <Button
              size="sm"
              variant="outline"
              onClick={onOpenEscalationModal}
              leftIcon={<AlertTriangle className="w-3.5 h-3.5 text-purple-600" />}
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              Escalate Tier
            </Button>
          )}

          {currentStatus !== 'resolved' && onOpenResolveModal && (
            <Button
              size="sm"
              variant="secondary"
              onClick={onOpenResolveModal}
              leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            >
              Mark Resolved
            </Button>
          )}
        </div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-[19px] sm:before:left-[27px] before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
        {timeline.map((event, idx) => {
          const isCompleted = event.completed;
          const isCurrent = event.current;
          const isExpanded = expandedStep === event.stepId;

          return (
            <div
              key={event.stepId}
              className={`relative group transition-all duration-200 ${
                isCurrent ? 'opacity-100' : isCompleted ? 'opacity-95' : 'opacity-60'
              }`}
            >
              {/* Timeline Node Dot */}
              <div
                className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 rounded-full flex items-center justify-center bg-white border-2 transition-colors z-10 ${
                  isCompleted
                    ? 'border-emerald-500 text-emerald-600 shadow-xs'
                    : isCurrent
                    ? 'border-civic-600 text-civic-600 ring-4 ring-civic-100'
                    : 'border-slate-300 text-slate-300'
                }`}
              >
                {getStepIcon(event.stepId, isCompleted, isCurrent)}
              </div>

              {/* Event Content Box */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-civic-50/50 border-civic-200 shadow-sm'
                    : isCompleted
                    ? 'bg-white border-slate-200/80 hover:border-slate-300 shadow-xs'
                    : 'bg-slate-50/50 border-dashed border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">
                      {idx + 1}. {event.label}
                    </span>
                    {isCurrent && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-civic-700 bg-civic-100 px-2 py-0.5 rounded-full">
                        Active Stage
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        Completed
                      </span>
                    )}
                  </div>

                  <span className="text-xs text-slate-400 font-medium">
                    {event.timestamp}
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-slate-900 mt-1">
                  {event.title}
                </h4>

                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {event.description}
                </p>

                {/* Escalation Details Badge */}
                {event.escalationInfo && (
                  <div className="mt-3 p-3 bg-purple-50 rounded-lg border border-purple-200 text-xs text-purple-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-purple-800">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Escalated to: {event.escalationInfo.appellateTier}
                    </div>
                    <div><span className="font-medium">Designated Forum:</span> {event.escalationInfo.escalatedTo}</div>
                    <div><span className="font-medium">Grounds:</span> {event.escalationInfo.grounds}</div>
                  </div>
                )}

                {/* Notes if any */}
                {event.notes && (
                  <div className="mt-2 text-xs bg-slate-50 p-2 rounded border border-slate-200 text-slate-600">
                    <span className="font-semibold text-slate-700">Filing Note: </span>
                    {event.notes}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
