import React from 'react';
import { motion } from 'framer-motion';
import { NotificationItem } from '../../types';
import { 
  Clock, 
  FileText, 
  Send, 
  AlertTriangle, 
  Check, 
  ArrowRight, 
  ShieldAlert, 
  Bell 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NotificationItemCardProps {
  notification: NotificationItem;
  onMarkRead?: (id: string) => void;
  className?: string;
}

export const NotificationItemCard: React.FC<NotificationItemCardProps> = ({
  notification,
  onMarkRead,
  className = '',
}) => {
  const navigate = useNavigate();

  const getIcon = () => {
    switch (notification.type) {
      case 'deadline':
        return <Clock className="w-4 h-4 text-amber-400" />;
      case 'document':
        return <FileText className="w-4 h-4 text-civic-400" />;
      case 'submission':
        return <Send className="w-4 h-4 text-cyan-400" />;
      case 'escalation':
        return <AlertTriangle className="w-4 h-4 text-purple-400" />;
      default:
        return <Bell className="w-4 h-4 text-blue-400" />;
    }
  };

  const handleClick = () => {
    if (onMarkRead && !notification.read) {
      onMarkRead(notification.id);
    }
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={handleClick}
      className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start justify-between gap-3 group backdrop-blur-xl ${
        notification.read
          ? 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 opacity-75 hover:opacity-100'
          : 'bg-slate-900/90 border-civic-500/40 hover:border-civic-500 shadow-glow'
      } ${className}`}
    >
      <div className="flex items-start gap-3.5 min-w-0">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
          notification.read ? 'bg-slate-950 border-slate-800 text-slate-500' : 'bg-civic-950 border-civic-500/40 text-civic-400 shadow-glow'
        }`}>
          {getIcon()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className={`text-sm leading-snug truncate ${
              notification.read ? 'font-medium text-slate-300' : 'font-bold text-white'
            }`}>
              {notification.title}
            </h4>
            {!notification.read && (
              <span className="w-2 h-2 rounded-full bg-civic-400 shrink-0 shadow-glow animate-pulse" />
            )}
          </div>

          <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
            {notification.message}
          </p>

          <span className="text-[11px] text-slate-500 mt-2 block font-medium">
            {notification.timestamp}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0 self-center">
        <span className="text-xs font-semibold text-civic-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
          View
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </motion.div>
  );
};

