import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Bell, 
  PlusCircle, 
  Menu, 
  HelpCircle, 
  Compass, 
  FileText, 
  ShieldCheck,
  X
} from 'lucide-react';
import { useCivicData } from '../../context/CivicDataContext';
import { Button } from '../common/Button';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const { cases, unreadCount, markAllNotificationsRead, notifications } = useCivicData();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const navigate = useNavigate();

  const filteredCases = searchQuery.trim()
    ? cases.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.authorityInvolved.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-subtle">
      {/* Left side: Mobile Menu Button & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative w-full max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              placeholder="Search cases, RTI, consumer disputes, notices..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 rounded-xl border border-slate-200 focus:border-civic-500 focus:ring-2 focus:ring-civic-100 transition-all outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showSearchDropdown && searchQuery.trim() && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowSearchDropdown(false)} 
              />
              <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50 max-h-80 overflow-y-auto">
                <div className="p-3 bg-slate-50 border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  Search Results ({filteredCases.length})
                </div>

                {filteredCases.length > 0 ? (
                  <div className="p-2 space-y-1">
                    {filteredCases.map(c => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setShowSearchDropdown(false);
                          setSearchQuery('');
                          navigate(`/cases/${c.id}`);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-civic-50 text-xs text-slate-800 transition-colors flex items-start gap-2.5"
                      >
                        <FileText className="w-4 h-4 text-civic-600 shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <div className="font-bold text-slate-900 truncate">{c.title}</div>
                          <div className="text-[11px] text-slate-500 truncate">{c.authorityInvolved}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-slate-500">
                    No matching cases found for "{searchQuery}".
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right side: Action CTAs */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Help Link */}
        <NavLink
          to="/help"
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors hidden sm:flex items-center gap-1.5 text-xs font-medium"
        >
          <HelpCircle className="w-4 h-4 text-slate-500" />
          <span>Guides & FAQs</span>
        </NavLink>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifDropdown(prev => !prev)}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Quick Notification Overlay */}
          {showNotifDropdown && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowNotifDropdown(false)} 
              />
              <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden z-50">
                <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <div className="font-bold text-sm text-slate-900">Notifications</div>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] text-civic-600 hover:text-civic-800 font-semibold"
                      >
                        Mark all read
                      </button>
                    )}
                    <NavLink
                      to="/notifications"
                      onClick={() => setShowNotifDropdown(false)}
                      className="text-[11px] text-slate-500 hover:text-slate-800"
                    >
                      View all
                    </NavLink>
                  </div>
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.slice(0, 4).map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setShowNotifDropdown(false);
                        navigate(n.actionUrl);
                      }}
                      className={`p-3.5 text-xs hover:bg-slate-50 cursor-pointer transition-colors ${
                        !n.read ? 'bg-civic-50/30 font-medium' : ''
                      }`}
                    >
                      <div className="font-bold text-slate-900 line-clamp-1">{n.title}</div>
                      <div className="text-slate-600 text-[11px] mt-0.5 line-clamp-2">{n.message}</div>
                      <div className="text-[10px] text-slate-400 mt-1.5">{n.timestamp}</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Start Case Header Action */}
        <Button
          size="sm"
          variant="primary"
          onClick={() => navigate('/start-case')}
          leftIcon={<PlusCircle className="w-4 h-4" />}
          className="hidden sm:inline-flex"
        >
          New Case
        </Button>
      </div>
    </header>
  );
};
