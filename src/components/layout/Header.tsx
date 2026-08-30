import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Bell, 
  PlusCircle, 
  Menu, 
  HelpCircle, 
  Compass, 
  FileText, 
  ShieldCheck,
  X,
  LogOut,
  User,
  ChevronDown,
  Sparkles,
  Zap
} from 'lucide-react';
import { useCivicData } from '../../context/CivicDataContext';
import { useAuth, DEMO_ACCOUNTS } from '../../context/AuthContext';
import { Button } from '../common/Button';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const { cases, unreadCount, markAllNotificationsRead, notifications } = useCivicData();
  const { user, logout, loginAsDemo } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const filteredCases = searchQuery.trim()
    ? cases.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.authorityInvolved.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between sticky top-0 z-30 shadow-elevated">
      {/* Left side: Mobile Menu Button & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
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
              className="w-full pl-9 pr-8 py-2 bg-slate-950/70 hover:bg-slate-950 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 rounded-xl border border-slate-800 focus:border-civic-500 focus:ring-2 focus:ring-civic-500/20 transition-all outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          <AnimatePresence>
            {showSearchDropdown && searchQuery.trim() && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowSearchDropdown(false)} 
                />
                <motion.div 
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  className="absolute left-0 right-0 top-full mt-2 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/80 overflow-hidden z-50 max-h-80 overflow-y-auto backdrop-blur-xl"
                >
                  <div className="p-3 bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Search Results</span>
                    <span className="text-civic-400 font-semibold">{filteredCases.length} found</span>
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
                          className="w-full text-left p-2.5 rounded-xl hover:bg-slate-800 text-xs text-slate-200 transition-colors flex items-start gap-2.5 group"
                        >
                          <FileText className="w-4 h-4 text-civic-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-white group-hover:text-civic-300 transition-colors truncate">{c.title}</div>
                            <div className="text-[11px] text-slate-400 truncate">{c.authorityInvolved}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center text-xs text-slate-400">
                      No matching cases found for "{searchQuery}".
                    </div>
                  )}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right side: Action CTAs & Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Help Link */}
        <NavLink
          to="/help"
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:flex items-center gap-1.5 text-xs font-medium"
        >
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span>Guides & FAQs</span>
        </NavLink>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifDropdown(prev => !prev)}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 relative transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-glow animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Quick Notification Overlay */}
          <AnimatePresence>
            {showNotifDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowNotifDropdown(false)} 
                />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.96 }}
                  className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-slate-900/95 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden z-50 backdrop-blur-xl"
                >
                  <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                    <div className="font-bold text-sm text-white flex items-center gap-2">
                      <span>Notifications</span>
                      {unreadCount > 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllNotificationsRead}
                          className="text-[11px] text-civic-400 hover:text-civic-300 font-semibold"
                        >
                          Mark all read
                        </button>
                      )}
                      <NavLink
                        to="/notifications"
                        onClick={() => setShowNotifDropdown(false)}
                        className="text-[11px] text-slate-400 hover:text-slate-200"
                      >
                        View all
                      </NavLink>
                    </div>
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
                    {notifications.slice(0, 4).map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          setShowNotifDropdown(false);
                          navigate(n.actionUrl);
                        }}
                        className={`p-3.5 text-xs hover:bg-slate-800/80 cursor-pointer transition-colors ${
                          !n.read ? 'bg-civic-950/40 font-medium' : ''
                        }`}
                      >
                        <div className="font-bold text-slate-100 line-clamp-1">{n.title}</div>
                        <div className="text-slate-400 text-[11px] mt-0.5 line-clamp-2">{n.message}</div>
                        <div className="text-[10px] text-slate-500 mt-1.5">{n.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Start Case Header Action */}
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate('/start-case')}
            leftIcon={<PlusCircle className="w-4 h-4" />}
            className="hidden sm:inline-flex bg-gradient-to-r from-civic-600 to-indigo-600 hover:from-civic-500 hover:to-indigo-500 shadow-glow"
          >
            New Case
          </Button>
        </motion.div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(prev => !prev)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-800 transition-all border border-transparent hover:border-slate-700"
          >
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={user?.name || 'Citizen'}
              className="w-8 h-8 rounded-lg object-cover border border-civic-500/40"
            />
            <div className="hidden md:block text-left">
              <div className="text-xs font-bold text-white leading-none truncate max-w-[100px]">{user?.name || 'Citizen'}</div>
              <div className="text-[10px] text-civic-400 capitalize font-medium mt-0.5">{user?.role?.replace('_', ' ') || 'Citizen'}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
          </button>

          {/* Profile Dropdown Menu */}
          <AnimatePresence>
            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-72 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-3 z-50 backdrop-blur-xl"
                >
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 mb-2">
                    <div className="font-bold text-white text-sm">{user?.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{user?.email}</div>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-civic-950 text-civic-300 border border-civic-500/30 text-[10px] font-semibold">
                      <ShieldCheck className="w-3 h-3 text-civic-400" />
                      <span>{user?.roleTitle}</span>
                    </div>
                  </div>

                  <div className="text-[11px] font-semibold text-slate-400 px-2 py-1 uppercase tracking-wider">
                    Switch Demo Persona
                  </div>

                  <div className="space-y-1 my-1">
                    {DEMO_ACCOUNTS.map(demo => (
                      <button
                        key={demo.id}
                        onClick={() => {
                          loginAsDemo(demo.id);
                          setShowUserMenu(false);
                        }}
                        className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                          user?.id === demo.id ? 'bg-civic-600/30 text-white border border-civic-500/40' : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="font-medium">{demo.name}</span>
                        <span className="text-[10px] text-slate-400 capitalize">{demo.role.replace('_', ' ')}</span>
                      </button>
                    ))}
                  </div>

                  <div className="border-t border-slate-800 pt-2 mt-2">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        logout();
                        navigate('/login');
                      }}
                      className="w-full flex items-center gap-2 p-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-colors font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

