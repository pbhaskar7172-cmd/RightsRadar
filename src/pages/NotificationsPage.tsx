import React, { useState } from 'react';
import { useCivicData } from '../context/CivicDataContext';
import { NotificationItemCard } from '../components/cards/NotificationItemCard';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { 
  Bell, 
  CheckCheck, 
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
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-civic-50 text-civic-700 border border-civic-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <Bell className="w-3.5 h-3.5 text-civic-600" />
            Statutory Alerts & Case Feeds
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Notifications ({notifications.length})
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Real-time deadline countdown alerts, document ready notices, and escalation reminders.
          </p>
        </div>

        {unreadCount > 0 && (
          <Button
            size="sm"
            variant="outline"
            onClick={markAllNotificationsRead}
            leftIcon={<CheckCheck className="w-4 h-4 text-civic-600" />}
          >
            Mark All as Read
          </Button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-subtle flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
            filter === 'all' ? 'bg-navy-900 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All ({notifications.length})
        </button>

        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
            filter === 'unread' ? 'bg-rose-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Unread ({unreadCount})
        </button>

        <button
          onClick={() => setFilter('deadline')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
            filter === 'deadline' ? 'bg-amber-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Deadlines
        </button>

        <button
          onClick={() => setFilter('document')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
            filter === 'document' ? 'bg-civic-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Documents
        </button>

        <button
          onClick={() => setFilter('submission')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
            filter === 'submission' ? 'bg-cyan-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Submissions
        </button>

        <button
          onClick={() => setFilter('escalation')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
            filter === 'escalation' ? 'bg-purple-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
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
