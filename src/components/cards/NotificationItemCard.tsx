import React from 'react';
import { motion } from 'framer-motion';
import { NotificationItem } from '../../types';
import { 
  Clock, 
  FileText, 
  Send, 
  AlertTriangle, 
  ArrowRight, 
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
        return <Clock className="w-4 h-4 text-amber-600" />;
      case 'document':
        return <FileText className="w-4 h-4 text-blue-600" />;
      case 'submission':
        return <Send className="w-4 h-4 text-cyan-600" />;
      case 'escalation':
        return <AlertTriangle className="w-4 h-4 text-purple-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-700" />;
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
      className={`p-4 rounded-3xl border transition-all duration-200 cursor-pointer flex items-start justify-between gap-3 group ${
        notification.read
          ? 'bg-white/80 border-slate-200 text-slate-700 opacity-80 hover:opacity-100 shadow-subtle'
          : 'bg-white border-slate-900 shadow-card text-slate-900'
      } ${className}`}
    >
      <div className="flex items-start gap-3.5 min-w-0">
        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 border ${
          notification.read ? 'bg-slate-100 border-slate-200 text-slate-500' : 'bg-slate-100 border-slate-300 text-slate-900'
        }`}>
          {getIcon()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className={`text-sm leading-snug truncate ${
              notification.read ? 'font-semibold text-slate-700' : 'font-extrabold text-slate-950'
            }`}>
              {notification.title}
            </h4>
            {!notification.read && (
              <span className="w-2 h-2 rounded-full bg-slate-900 shrink-0" />
            )}
          </div>

          <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2 font-medium">
            {notification.message}
          </p>

          <span className="text-[11px] text-slate-400 mt-2 block font-semibold">
            {notification.timestamp}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0 self-center">
        <span className="text-xs font-extrabold text-slate-900 group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
          View
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </motion.div>
  );
};


