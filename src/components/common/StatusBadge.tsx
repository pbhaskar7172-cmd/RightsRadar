import React from 'react';
import { CaseStatus, DeadlineStatus, IssueTypeId, PriorityLevel } from '../../types';
import { ISSUE_TYPES } from '../../data/issueTypes';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Send, 
  ShieldAlert, 
  AlertTriangle,
  ArrowUpRight,
  HelpCircle,
  FileSearch,
  ShoppingBag,
  Home,
  Briefcase,
  Landmark
} from 'lucide-react';

interface StatusBadgeProps {
  status?: CaseStatus;
  deadlineStatus?: DeadlineStatus;
  priority?: PriorityLevel;
  issueType?: IssueTypeId;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  customLabel?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  deadlineStatus,
  priority,
  issueType,
  size = 'md',
  showIcon = true,
  customLabel,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold',
  }[size];

  // 1. Issue Type Badge
  if (issueType) {
    const config = ISSUE_TYPES[issueType];
    const getIcon = () => {
      switch (issueType) {
        case 'rti': return <FileSearch className="w-3.5 h-3.5 text-blue-600" />;
        case 'consumer': return <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />;
        case 'tenant': return <Home className="w-3.5 h-3.5 text-amber-600" />;
        case 'workplace': return <Briefcase className="w-3.5 h-3.5 text-purple-600" />;
        case 'govt_scheme': return <Landmark className="w-3.5 h-3.5 text-cyan-600" />;
        case 'cyber': return <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />;
        default: return <HelpCircle className="w-3.5 h-3.5" />;
      }
    };

    return (
      <span className={`inline-flex items-center rounded-full border ${config.badgeBg} ${sizeClasses} ${className}`}>
        {showIcon && getIcon()}
        <span>{customLabel || config.shortName}</span>
      </span>
    );
  }

  // 2. Deadline Status Badge
  if (deadlineStatus) {
    switch (deadlineStatus) {
      case 'due_soon':
        return (
          <span className={`inline-flex items-center rounded-full bg-amber-50 text-amber-700 border border-amber-200 ${sizeClasses} ${className}`}>
            {showIcon && <AlertTriangle className="w-3.5 h-3.5 text-amber-600 animate-pulse" />}
            <span>{customLabel || 'Due Soon'}</span>
          </span>
        );
      case 'overdue':
        return (
          <span className={`inline-flex items-center rounded-full bg-rose-50 text-rose-700 border border-rose-200 ${sizeClasses} ${className}`}>
            {showIcon && <AlertCircle className="w-3.5 h-3.5 text-rose-600" />}
            <span>{customLabel || 'Overdue'}</span>
          </span>
        );
      case 'completed':
        return (
          <span className={`inline-flex items-center rounded-full bg-slate-100 text-slate-700 border border-slate-200 ${sizeClasses} ${className}`}>
            {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />}
            <span>{customLabel || 'Completed'}</span>
          </span>
        );
      default:
        return (
          <span className={`inline-flex items-center rounded-full bg-blue-50 text-blue-700 border border-blue-200 ${sizeClasses} ${className}`}>
            {showIcon && <Clock className="w-3.5 h-3.5 text-blue-600" />}
            <span>{customLabel || 'Upcoming'}</span>
          </span>
        );
    }
  }

  // 3. Priority Badge
  if (priority) {
    const priorityConfig = {
      low: { bg: 'bg-slate-100 text-slate-700 border-slate-200', label: 'Low Priority' },
      medium: { bg: 'bg-blue-50 text-blue-700 border-blue-200', label: 'Standard Priority' },
      high: { bg: 'bg-amber-50 text-amber-700 border-amber-200', label: 'High Priority' },
      urgent: { bg: 'bg-rose-50 text-rose-700 border-rose-200', label: 'Urgent' },
    }[priority];

    return (
      <span className={`inline-flex items-center rounded-full border ${priorityConfig.bg} ${sizeClasses} ${className}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${priority === 'urgent' ? 'bg-rose-500 animate-ping' : 'bg-current'}`} />
        <span>{customLabel || priorityConfig.label}</span>
      </span>
    );
  }

  // 4. Case Status Badge
  const statusConfigMap: Record<CaseStatus, { bg: string; label: string; icon: React.ReactNode }> = {
    created: {
      bg: 'bg-slate-100 text-slate-700 border-slate-200',
      label: 'Drafting',
      icon: <FileText className="w-3.5 h-3.5 text-slate-500" />
    },
    info_collected: {
      bg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      label: 'Intake Completed',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
    },
    action_recommended: {
      bg: 'bg-civic-50 text-civic-700 border-civic-200',
      label: 'Action Recommended',
      icon: <ArrowUpRight className="w-3.5 h-3.5 text-civic-600" />
    },
    document_prepared: {
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      label: 'Document Ready',
      icon: <FileText className="w-3.5 h-3.5 text-emerald-600" />
    },
    submission_recorded: {
      bg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      label: 'Submitted',
      icon: <Send className="w-3.5 h-3.5 text-cyan-600" />
    },
    response_pending: {
      bg: 'bg-amber-50 text-amber-700 border-amber-200',
      label: 'Response Pending',
      icon: <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
    },
    escalation: {
      bg: 'bg-purple-50 text-purple-700 border-purple-200',
      label: 'Escalated Tier',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-purple-600" />
    },
    resolved: {
      bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      label: 'Resolved',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
    }
  };

  const current = status ? statusConfigMap[status] : statusConfigMap.created;

  return (
    <span className={`inline-flex items-center rounded-full border ${current.bg} ${sizeClasses} ${className}`}>
      {showIcon && current.icon}
      <span>{customLabel || current.label}</span>
    </span>
  );
};
