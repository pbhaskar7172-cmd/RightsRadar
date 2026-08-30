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
  Landmark,
  ShieldCheck,
  Sparkles
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
    sm: 'text-[11px] px-2.5 py-0.5 gap-1 font-semibold',
    md: 'text-xs px-3 py-1 gap-1.5 font-semibold',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold',
  }[size];

  // 1. Issue Type Badge
  if (issueType) {
    const config = ISSUE_TYPES[issueType];
    const getIcon = () => {
      switch (issueType) {
        case 'rti': return <FileSearch className="w-3.5 h-3.5 text-blue-400" />;
        case 'consumer': return <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />;
        case 'tenant': return <Home className="w-3.5 h-3.5 text-amber-400" />;
        case 'workplace': return <Briefcase className="w-3.5 h-3.5 text-purple-400" />;
        case 'govt_scheme': return <Landmark className="w-3.5 h-3.5 text-cyan-400" />;
        case 'cyber': return <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />;
        default: return <HelpCircle className="w-3.5 h-3.5" />;
      }
    };

    const domainStyleMap: Record<IssueTypeId, string> = {
      rti: 'bg-blue-950/80 text-blue-300 border-blue-500/40 shadow-glow',
      consumer: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 shadow-glow-emerald',
      tenant: 'bg-amber-950/80 text-amber-300 border-amber-500/40 shadow-glow-amber',
      workplace: 'bg-purple-950/80 text-purple-300 border-purple-500/40 shadow-glow-indigo',
      govt_scheme: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
      cyber: 'bg-rose-950/80 text-rose-300 border-rose-500/40 shadow-glow-rose',
    };

    return (
      <span className={`inline-flex items-center rounded-full border backdrop-blur-md ${domainStyleMap[issueType] || 'bg-slate-900 text-slate-300 border-slate-700'} ${sizeClasses} ${className}`}>
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
          <span className={`inline-flex items-center rounded-full bg-amber-950/90 text-amber-300 border border-amber-500/50 shadow-glow-amber ${sizeClasses} ${className}`}>
            {showIcon && <AlertTriangle className="w-3.5 h-3.5 text-amber-400 animate-pulse" />}
            <span>{customLabel || 'Due Soon'}</span>
          </span>
        );
      case 'overdue':
        return (
          <span className={`inline-flex items-center rounded-full bg-rose-950/90 text-rose-300 border border-rose-500/50 shadow-glow-rose ${sizeClasses} ${className}`}>
            {showIcon && <AlertCircle className="w-3.5 h-3.5 text-rose-400 animate-ping" />}
            <span>{customLabel || 'Overdue'}</span>
          </span>
        );
      case 'completed':
        return (
          <span className={`inline-flex items-center rounded-full bg-slate-900 text-slate-400 border border-slate-700 ${sizeClasses} ${className}`}>
            {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
            <span>{customLabel || 'Completed'}</span>
          </span>
        );
      default:
        return (
          <span className={`inline-flex items-center rounded-full bg-blue-950/80 text-blue-300 border border-blue-500/40 ${sizeClasses} ${className}`}>
            {showIcon && <Clock className="w-3.5 h-3.5 text-blue-400" />}
            <span>{customLabel || 'Upcoming'}</span>
          </span>
        );
    }
  }

  // 3. Priority Badge
  if (priority) {
    const priorityConfig = {
      low: { bg: 'bg-slate-900 text-slate-400 border-slate-800', label: 'Low Priority' },
      medium: { bg: 'bg-blue-950/80 text-blue-300 border-blue-500/30', label: 'Standard' },
      high: { bg: 'bg-amber-950/80 text-amber-300 border-amber-500/40 shadow-glow-amber', label: 'High Priority' },
      urgent: { bg: 'bg-rose-950/90 text-rose-300 border-rose-500/50 shadow-glow-rose', label: 'Urgent Action' },
    }[priority];

    return (
      <span className={`inline-flex items-center rounded-full border ${priorityConfig.bg} ${sizeClasses} ${className}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${priority === 'urgent' ? 'bg-rose-400 animate-ping' : 'bg-current'}`} />
        <span>{customLabel || priorityConfig.label}</span>
      </span>
    );
  }

  // 4. Case Status Badge
  const statusConfigMap: Record<CaseStatus, { bg: string; label: string; icon: React.ReactNode }> = {
    created: {
      bg: 'bg-slate-900 text-slate-400 border-slate-800',
      label: 'Drafting',
      icon: <FileText className="w-3.5 h-3.5 text-slate-400" />
    },
    info_collected: {
      bg: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40 shadow-glow-indigo',
      label: 'Intake Done',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
    },
    action_recommended: {
      bg: 'bg-civic-950/80 text-civic-300 border-civic-500/40 shadow-glow',
      label: 'Action Recommended',
      icon: <ArrowUpRight className="w-3.5 h-3.5 text-civic-400" />
    },
    document_prepared: {
      bg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40 shadow-glow-emerald',
      label: 'Notice Ready',
      icon: <FileText className="w-3.5 h-3.5 text-emerald-400" />
    },
    submission_recorded: {
      bg: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
      label: 'Dispatched',
      icon: <Send className="w-3.5 h-3.5 text-cyan-400" />
    },
    response_pending: {
      bg: 'bg-amber-950/80 text-amber-300 border-amber-500/40 shadow-glow-amber',
      label: 'Response Pending',
      icon: <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
    },
    escalation: {
      bg: 'bg-purple-950/80 text-purple-300 border-purple-500/40 shadow-glow-indigo',
      label: 'Escalated Tier',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-purple-400" />
    },
    resolved: {
      bg: 'bg-emerald-950 text-emerald-300 border-emerald-500 shadow-glow-emerald',
      label: 'Resolved 🎉',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
    }
  };

  const current = status ? statusConfigMap[status] : statusConfigMap.created;

  return (
    <span className={`inline-flex items-center rounded-full border backdrop-blur-md ${current.bg} ${sizeClasses} ${className}`}>
      {showIcon && current.icon}
      <span>{customLabel || current.label}</span>
    </span>
  );
};

