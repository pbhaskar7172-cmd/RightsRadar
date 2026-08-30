import React from 'react';
import { DeadlineItem, IssueTypeId } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Clock, Calendar, AlertTriangle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DeadlineCardProps {
  deadline: DeadlineItem;
  className?: string;
}

export const DeadlineCard: React.FC<DeadlineCardProps> = ({ deadline, className = '' }) => {
  const navigate = useNavigate();

  const isUrgent = deadline.daysRemaining <= 3;

  return (
    <div
      onClick={() => navigate(`/cases/${deadline.caseId}`)}
      className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-sm ${
        isUrgent
          ? 'bg-amber-50/60 border-amber-200 hover:border-amber-300'
          : 'bg-white border-slate-200/80 hover:border-slate-300'
      } ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <StatusBadge issueType={deadline.issueType} size="sm" />
          <StatusBadge deadlineStatus={deadline.status} size="sm" />
        </div>

        <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
          {deadline.title}
        </h4>

        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
          Case: {deadline.caseTitle}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-600 font-medium">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Due: {deadline.dueDate}</span>
        </div>

        <div className={`font-bold flex items-center gap-1 ${isUrgent ? 'text-amber-700' : 'text-slate-700'}`}>
          <Clock className="w-3.5 h-3.5" />
          <span>{deadline.daysRemaining} days left</span>
        </div>
      </div>
    </div>
  );
};
