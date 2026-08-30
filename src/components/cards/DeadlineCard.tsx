import React from 'react';
import { motion } from 'framer-motion';
import { DeadlineItem } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Clock, Calendar, AlertTriangle, ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DeadlineCardProps {
  deadline: DeadlineItem;
  className?: string;
}

export const DeadlineCard: React.FC<DeadlineCardProps> = ({ deadline, className = '' }) => {
  const navigate = useNavigate();

  const isUrgent = deadline.daysRemaining <= 3;

  return (
    <motion.div
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/cases/${deadline.caseId}`)}
      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between backdrop-blur-xl shadow-elevated group ${
        isUrgent
          ? 'bg-amber-950/40 border-amber-500/40 hover:border-amber-400 hover:shadow-glow-amber'
          : 'bg-slate-900/80 border-slate-800 hover:border-civic-500/40 hover:shadow-glow'
      } ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <StatusBadge issueType={deadline.issueType} size="sm" />
          <StatusBadge deadlineStatus={deadline.status} size="sm" />
        </div>

        <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
          {deadline.title}
        </h4>

        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
          Case: {deadline.caseTitle}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-slate-400 font-medium">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>Due: {deadline.dueDate}</span>
        </div>

        <div className={`font-bold flex items-center gap-1.5 ${isUrgent ? 'text-amber-300' : 'text-slate-300'}`}>
          <Clock className={`w-3.5 h-3.5 ${isUrgent ? 'text-amber-400 animate-spin' : 'text-slate-400'}`} style={{ animationDuration: '6s' }} />
          <span>{deadline.daysRemaining} days left</span>
        </div>
      </div>
    </motion.div>
  );
};

