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
    sm: 'text-[11px] px-2.5 py-0.5 gap-1 font-bold',
    md: 'text-xs px-3 py-1 gap-1.5 font-bold',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-extrabold',
  }[size];

  // 1. Issue Type Badge
  if (issueType) {
    const config = ISSUE_TYPES[issueType];
    const getIcon = () => {
      switch (issueType) {
        case 'rti': return <FileSearch className="w-3.5 h-3.5 text-blue-700" />;
        case 'consumer': return <ShoppingBag className="w-3.5 h-3.5 text-emerald-700" />;
        case 'tenant': return <Home className="w-3.5 h-3.5 text-amber-700" />;
        case 'workplace': return <Briefcase className="w-3.5 h-3.5 text-purple-700" />;
        case 'govt_scheme': return <Landmark className="w-3.5 h-3.5 text-cyan-700" />;
        case 'cyber': return <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />;
        default: return <HelpCircle className="w-3.5 h-3.5" />;
      }
    };

    const domainStyleMap: Record<IssueTypeId, string> = {
      rti: 'bg-pastel-blue text-slate-900 border-blue-200/80',
      consumer: 'bg-pastel-yellow text-slate-900 border-amber-200/80',
      tenant: 'bg-pastel-coral text-slate-900 border-orange-200/80',
      workplace: 'bg-pastel-purple text-slate-900 border-purple-200/80',
      govt_scheme: 'bg-pastel-mint text-slate-900 border-emerald-200/80',
      cyber: 'bg-pastel-pink text-slate-900 border-rose-200/80',
    };

    return (
      <span className={`inline-flex items-center rounded-full border shadow-subtle ${domainStyleMap[issueType] || 'bg-slate-100 text-slate-800 border-slate-200'} ${sizeClasses} ${className}`}>
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
          <span className={`inline-flex items-center rounded-full bg-pastel-yellow text-slate-900 border border-amber-300 shadow-subtle ${sizeClasses} ${className}`}>
            {showIcon && <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />}
            <span>{customLabel || 'Due Soon'}</span>
          </span>
        );
      case 'overdue':
        return (
          <span className={`inline-flex items-center rounded-full bg-pastel-coral text-slate-900 border border-rose-300 shadow-subtle ${sizeClasses} ${className}`}>
            {showIcon && <AlertCircle className="w-3.5 h-3.5 text-rose-700" />}
            <span>{customLabel || 'Overdue'}</span>
          </span>
        );
      case 'completed':
        return (
          <span className={`inline-flex items-center rounded-full bg-pastel-mint text-slate-900 border border-emerald-300 shadow-subtle ${sizeClasses} ${className}`}>
            {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />}
            <span>{customLabel || 'Completed'}</span>
          </span>
        );
      default:
        return (
          <span className={`inline-flex items-center rounded-full bg-pastel-blue text-slate-900 border border-blue-300 shadow-subtle ${sizeClasses} ${className}`}>
            {showIcon && <Clock className="w-3.5 h-3.5 text-blue-700" />}
            <span>{customLabel || 'Upcoming'}</span>
          </span>
        );
    }
  }

  // 3. Priority Badge
  if (priority) {
    const priorityConfig = {
      low: { bg: 'bg-slate-100 text-slate-700 border-slate-200', label: 'Low Priority' },
      medium: { bg: 'bg-pastel-blue text-slate-900 border-blue-200', label: 'Standard' },
      high: { bg: 'bg-pastel-yellow text-slate-900 border-amber-300', label: 'High Priority' },
      urgent: { bg: 'bg-pastel-coral text-slate-900 border-rose-300', label: 'Urgent Action' },
    }[priority];

    return (
      <span className={`inline-flex items-center rounded-full border shadow-subtle ${priorityConfig.bg} ${sizeClasses} ${className}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${priority === 'urgent' ? 'bg-rose-600 animate-ping' : 'bg-slate-800'}`} />
        <span>{customLabel || priorityConfig.label}</span>
      </span>
    );
  }

  // 4. Case Status Badge
  const statusConfigMap: Record<CaseStatus, { bg: string; label: string; icon: React.ReactNode }> = {
    created: {
      bg: 'bg-slate-100 text-slate-800 border-slate-200',
      label: 'Drafting',
      icon: <FileText className="w-3.5 h-3.5 text-slate-600" />
    },
    info_collected: {
      bg: 'bg-pastel-purple text-slate-900 border-purple-200',
      label: 'Intake Done',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-purple-700" />
    },
    action_recommended: {
      bg: 'bg-pastel-blue text-slate-900 border-blue-200',
      label: 'Action Recommended',
      icon: <ArrowUpRight className="w-3.5 h-3.5 text-blue-700" />
    },
    document_prepared: {
      bg: 'bg-pastel-mint text-slate-900 border-emerald-200',
      label: 'Notice Ready',
      icon: <FileText className="w-3.5 h-3.5 text-emerald-700" />
    },
    submission_recorded: {
      bg: 'bg-pastel-blue text-slate-900 border-blue-200',
      label: 'Dispatched',
      icon: <Send className="w-3.5 h-3.5 text-blue-700" />
    },
    response_pending: {
      bg: 'bg-pastel-yellow text-slate-900 border-amber-300',
      label: 'Response Pending',
      icon: <Clock className="w-3.5 h-3.5 text-amber-700" />
    },
    escalation: {
      bg: 'bg-pastel-coral text-slate-900 border-rose-300',
      label: 'Escalated Tier',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-700" />
    },
    resolved: {
      bg: 'bg-pastel-mint text-slate-900 border-emerald-300',
      label: 'Resolved 🎉',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
    }
  };

  const current = status ? statusConfigMap[status] : statusConfigMap.created;

  return (
    <span className={`inline-flex items-center rounded-full border shadow-subtle ${current.bg} ${sizeClasses} ${className}`}>
      {showIcon && current.icon}
      <span>{customLabel || current.label}</span>
    </span>
  );
};


