import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
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
  ChevronDown,
  FolderKanban,
  Radar,
  Paperclip,
  BookOpen,
  ArrowUpRight
} from 'lucide-react';
import { useCivicData } from '../../context/CivicDataContext';
import { useAuth, DEMO_ACCOUNTS } from '../../context/AuthContext';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

const TOP_NAV_LINKS = [
  { to: '/', label: 'Dashboard', icon: Compass },
  { to: '/cases', label: 'My Cases', icon: FolderKanban },
  { to: '/action-radar', label: 'Action Radar', icon: Radar },
  { to: '/documents', label: 'Documents', icon: FileText },
  { to: '/evidence', label: 'Evidence', icon: Paperclip },
  { to: '/sources', label: 'Sources', icon: BookOpen },
  { to: '/help', label: 'Help', icon: HelpCircle },
];

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const { cases, unreadCount, markAllNotificationsRead, notifications } = useCivicData();
  const { user, logout, loginAsDemo } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const filteredCases = searchQuery.trim()
    ? cases.filter(c => 
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.authorityInvolved.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 px-4 sm:px-6 lg:px-8 shadow-subtle transition-colors">
      <div className="max-w-7xl mx-auto h-18 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo & Wordmark */}
        <div className="flex items-center gap-6">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <NavLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-extrabold text-lg shadow-sm group-hover:scale-105 transition-transform">
              人
            </div>
            <div className="hidden sm:block">
              <span className="text-base font-extrabold text-slate-900 tracking-tight block leading-tight">
                RightsTrack
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                Citizen Radar
              </span>
            </div>
          </NavLink>
        </div>

        {/* Center: Top Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {TOP_NAV_LINKS.map(link => {
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`relative px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isActive 
                    ? 'text-slate-950 bg-slate-100/90 shadow-pill' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="topNavPill"
                    className="absolute inset-0 bg-slate-100 rounded-full -z-10 border border-slate-200/60"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Right: Actions, Notifications & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Quick Search Trigger */}
          <button
            onClick={() => setShowSearchModal(true)}
            className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Search Cases"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifDropdown(prev => !prev)}
              className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 relative transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-slate-900 text-white rounded-full text-[9px] font-extrabold flex items-center justify-center shadow-sm">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Menu */}
            <AnimatePresence>
              {showNotifDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifDropdown(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.96 }}
                    className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-3xl shadow-elevated border border-slate-200/90 overflow-hidden z-50 p-1"
                  >
                    <div className="p-4 bg-slate-50 rounded-t-[22px] border-b border-slate-200/70 flex items-center justify-between">
                      <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <span>Statutory Alerts</span>
                        {unreadCount > 0 && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-white font-bold">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllNotificationsRead}
                            className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
                          >
                            Mark read
                          </button>
                        )}
                        <NavLink
                          to="/notifications"
                          onClick={() => setShowNotifDropdown(false)}
                          className="text-xs text-slate-600 hover:text-slate-900 font-medium"
                        >
                          View all
                        </NavLink>
                      </div>
                    </div>

                    <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 p-1">
                      {notifications.slice(0, 4).map(n => (
                        <div
                          key={n.id}
                          onClick={() => {
                            setShowNotifDropdown(false);
                            navigate(n.actionUrl);
                          }}
                          className={`p-3 text-xs hover:bg-slate-50 rounded-2xl cursor-pointer transition-colors ${
                            !n.read ? 'bg-blue-50/50 font-medium' : ''
                          }`}
                        >
                          <div className="font-bold text-slate-900 line-clamp-1">{n.title}</div>
                          <div className="text-slate-500 text-[11px] mt-0.5 line-clamp-2">{n.message}</div>
                          <div className="text-[10px] text-slate-400 mt-1">{n.timestamp}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Solid Black CTA Button: Start Case */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/start-case')}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-black cursor-pointer"
          >
            <span>Start Case</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.button>

          {/* User Profile Avatar Pill */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(prev => !prev)}
              className="flex items-center gap-2 p-1 pl-1 pr-2.5 rounded-full hover:bg-slate-100 transition-all border border-slate-200/80 bg-white"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                alt={user?.name || 'Citizen'}
                className="w-7 h-7 rounded-full object-cover border border-slate-200"
              />
              <span className="text-xs font-bold text-slate-900 hidden md:inline truncate max-w-[80px]">
                {user?.name?.split(' ')[0] || 'User'}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
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
                    className="absolute right-0 top-full mt-2 w-72 bg-white rounded-3xl shadow-elevated border border-slate-200/90 p-3 z-50"
                  >
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 mb-2">
                      <div className="font-extrabold text-slate-900 text-sm">{user?.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{user?.email}</div>
                      <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{user?.roleTitle}</span>
                      </div>
                    </div>

                    <div className="text-[11px] font-bold text-slate-400 px-2 py-1 uppercase tracking-wider">
                      Switch Persona Profile
                    </div>

                    <div className="space-y-1 my-1">
                      {DEMO_ACCOUNTS.map(demo => (
                        <button
                          key={demo.id}
                          onClick={() => {
                            loginAsDemo(demo.id);
                            setShowUserMenu(false);
                          }}
                          className={`w-full text-left p-2 rounded-2xl text-xs flex items-center justify-between transition-all ${
                            user?.id === demo.id ? 'bg-slate-100 font-bold text-slate-900 border border-slate-200' : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>{demo.name}</span>
                          <span className="text-[10px] text-slate-400 capitalize">{demo.role.replace('_', ' ')}</span>
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-slate-100 pt-2 mt-2">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          logout();
                          navigate('/login');
                        }}
                        className="w-full flex items-center gap-2 p-2 rounded-xl text-xs text-rose-600 hover:bg-rose-50 transition-colors font-bold"
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
      </div>

      {/* Global Search Modal */}
      <AnimatePresence>
        {showSearchModal && (
          <>
            <div 
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4"
              onClick={() => setShowSearchModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-full max-w-xl rounded-3xl shadow-elevated border border-slate-200/90 overflow-hidden"
              >
                <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                  <Search className="w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search cases, RTI, consumer disputes, notices..."
                    className="w-full text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                  />
                  <button 
                    onClick={() => setShowSearchModal(false)}
                    className="p-1 rounded-full text-slate-400 hover:bg-slate-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3 max-h-80 overflow-y-auto">
                  {searchQuery.trim() ? (
                    filteredCases.length > 0 ? (
                      <div className="space-y-1">
                        {filteredCases.map(c => (
                          <button
                            key={c.id}
                            onClick={() => {
                              setShowSearchModal(false);
                              setSearchQuery('');
                              navigate(`/cases/${c.id}`);
                            }}
                            className="w-full text-left p-3 rounded-2xl hover:bg-slate-50 text-xs text-slate-700 transition-colors flex items-start gap-3"
                          >
                            <FileText className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
                            <div className="min-w-0 flex-1">
                              <div className="font-bold text-slate-900 truncate">{c.title}</div>
                              <div className="text-[11px] text-slate-500 truncate">{c.authorityInvolved}</div>
                            </div>
                            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 text-center text-xs text-slate-400">
                        No cases found for "{searchQuery}".
                      </div>
                    )
                  ) : (
                    <div className="p-6 text-center text-xs text-slate-400">
                      Type to search across active and pending cases...
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};


