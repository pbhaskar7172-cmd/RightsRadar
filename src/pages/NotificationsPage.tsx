import React, { useState } from 'react';
import { useCivicData } from '../context/CivicDataContext';
import { NotificationItemCard } from '../components/cards/NotificationItemCard';
import { EmptyState } from '../components/common/EmptyState';
import { 
  Bell, 
  CheckCheck
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
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn text-slate-900">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="editorial-pill mb-3">
            <Bell className="w-3.5 h-3.5 text-slate-900" />
            <span>Statutory Alerts & Case Feeds</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight mt-1">
            Notifications ({notifications.length})
          </h1>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed font-medium">
            Real-time deadline countdown alerts, document ready notices, and escalation reminders.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            className="btn-pill-outline text-xs flex items-center gap-1.5 shrink-0"
          >
            <CheckCheck className="w-4 h-4 text-slate-900" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-3 rounded-full border border-slate-200 shadow-card flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold shrink-0 transition-all cursor-pointer ${
            filter === 'all' ? 'bg-slate-900 text-white shadow-pill' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
          }`}
        >
          All ({notifications.length})
        </button>

        <button
          onClick={() => setFilter('unread')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold shrink-0 transition-all cursor-pointer ${
            filter === 'unread' ? 'bg-pastel-coral text-slate-950 border border-rose-300' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
          }`}
        >
          Unread ({unreadCount})
        </button>

        <button
          onClick={() => setFilter('deadline')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold shrink-0 transition-all cursor-pointer ${
            filter === 'deadline' ? 'bg-pastel-yellow text-slate-950 border border-amber-300' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
          }`}
        >
          Deadlines
        </button>

        <button
          onClick={() => setFilter('document')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold shrink-0 transition-all cursor-pointer ${
            filter === 'document' ? 'bg-pastel-blue text-slate-950 border border-blue-300' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
          }`}
        >
          Documents
        </button>

        <button
          onClick={() => setFilter('submission')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold shrink-0 transition-all cursor-pointer ${
            filter === 'submission' ? 'bg-pastel-mint text-slate-950 border border-emerald-300' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
          }`}
        >
          Submissions
        </button>

        <button
          onClick={() => setFilter('escalation')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold shrink-0 transition-all cursor-pointer ${
            filter === 'escalation' ? 'bg-pastel-purple text-slate-950 border border-purple-300' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
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


