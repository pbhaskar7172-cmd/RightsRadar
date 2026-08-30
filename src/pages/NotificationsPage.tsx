import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCivicData } from '../context/CivicDataContext';
import { NotificationItemCard } from '../components/cards/NotificationItemCard';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { 
  Bell, 
  CheckCheck, 
  Sparkles
} from 'lucide-react';
import { NotificationItem } from '../types';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, unreadCount } = useCivicData();
  const [filter, setFilter] = useState<'all' | 'unread' | 'deadline' | 'document' | 'submission' | 'escalation'>('all');

  const filteredNotifs = notifications.filter((n: NotificationItem) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'all') return true;
    return n.type === filter;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn text-slate-100">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-civic-950 text-civic-300 border border-civic-500/40 text-xs font-semibold uppercase tracking-wider mb-3 shadow-glow">
            <Bell className="w-3.5 h-3.5 text-civic-400" />
            <span>Statutory Alerts & Case Feeds</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Notifications ({notifications.length})
          </h1>
          <p className="text-sm text-slate-300 mt-1 leading-relaxed">
            Real-time deadline countdown alerts, document ready notices, and escalation reminders.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            size="sm"
            variant="outline"
            onClick={markAllNotificationsRead}
            leftIcon={<CheckCheck className="w-4 h-4 text-civic-400" />}
            className="border-slate-700 text-slate-300 hover:text-white"
          >
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="bg-slate-900/90 p-3 rounded-2xl border border-slate-800 shadow-2xl flex items-center gap-2 overflow-x-auto backdrop-blur-xl">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
            filter === 'all' ? 'bg-slate-800 text-white border border-slate-700 shadow-glow' : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80'
          }`}
        >
          All ({notifications.length})
        </button>

        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
            filter === 'unread' ? 'bg-rose-600 text-white shadow-glow-rose' : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80'
          }`}
        >
          Unread ({unreadCount})
        </button>

        <button
          onClick={() => setFilter('deadline')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
            filter === 'deadline' ? 'bg-amber-600 text-white shadow-glow-amber' : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80'
          }`}
        >
          Deadlines
        </button>

        <button
          onClick={() => setFilter('document')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
            filter === 'document' ? 'bg-civic-600 text-white shadow-glow' : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80'
          }`}
        >
          Documents
        </button>

        <button
          onClick={() => setFilter('submission')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
            filter === 'submission' ? 'bg-cyan-600 text-white shadow-glow' : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80'
          }`}
        >
          Submissions
        </button>

        <button
          onClick={() => setFilter('escalation')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
            filter === 'escalation' ? 'bg-purple-600 text-white shadow-glow-indigo' : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80'
          }`}
        >
          Escalations
        </button>
      </div>

      {/* Notifications Feed List */}
      {filteredNotifs.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifs.map((n: NotificationItem) => (
            <NotificationItemCard
              key={n.id}
              notification={n}
              onMarkRead={(id: string) => markNotificationRead(id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bell}
          title="No notifications in this filter"
          description="You're completely caught up! New statutory deadline reminders and case updates will appear here."
          actionLabel="View All Alerts"
          onAction={() => setFilter('all')}
        />
      )}
    </div>
  );
};

