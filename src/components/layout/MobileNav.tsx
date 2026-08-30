import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderKanban, 
  PlusCircle, 
  FileText, 
  Paperclip, 
  Bell, 
  HelpCircle, 
  Scale, 
  X,
  Compass,
  ShieldCheck
} from 'lucide-react';
import { useCivicData } from '../../context/CivicDataContext';
import { useAuth } from '../../context/AuthContext';
import { ISSUE_TYPE_LIST } from '../../data/issueTypes';

interface MobileNavProps {
  isDrawerOpen: boolean;
  onCloseDrawer: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isDrawerOpen, onCloseDrawer }) => {
  const { cases, unreadCount } = useCivicData();
  const { user } = useAuth();
  const location = useLocation();

  const primaryTabs = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Cases', path: '/cases', icon: FolderKanban, count: cases.length },
    { label: 'Start Case', path: '/start-case', icon: PlusCircle, isPrimary: true },
    { label: 'Documents', path: '/documents', icon: FileText },
    { label: 'Alerts', path: '/notifications', icon: Bell, count: unreadCount > 0 ? unreadCount : undefined },
  ];

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/80 z-40 py-2 px-3 flex items-center justify-around shadow-2xl">
        {primaryTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;

          if (tab.isPrimary) {
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className="flex flex-col items-center justify-center -mt-6"
              >
                <div className="w-13 h-13 p-3 rounded-2xl bg-gradient-to-tr from-civic-600 via-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-glow border-2 border-slate-900 active:scale-95 transition-transform">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-civic-400 mt-1">Start</span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl relative transition-all ${
                isActive ? 'text-civic-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {tab.count !== undefined && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center shadow-glow animate-pulse">
                    {tab.count}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1">{tab.label}</span>
            </NavLink>
          );
        })}
      </div>

      {/* Side Slide-out Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseDrawer}
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-4/5 max-w-xs bg-slate-900 text-slate-300 h-full flex flex-col justify-between p-5 z-10 shadow-2xl border-r border-slate-800"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-civic-600 to-indigo-600 flex items-center justify-center text-white shadow-glow">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-extrabold text-white text-sm">CivicGuide</span>
                      <span className="text-[9px] block text-civic-400 font-medium">RightsTrack MVP</span>
                    </div>
                  </div>

                  <button
                    onClick={onCloseDrawer}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* User Card */}
                {user && (
                  <div className="my-4 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-xl object-cover border border-civic-500/40"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-white text-xs truncate">{user.name}</div>
                      <div className="text-[10px] text-civic-400 truncate">{user.roleTitle}</div>
                    </div>
                  </div>
                )}

                {/* Navigation links */}
                <nav className="mt-2 space-y-1">
                  <NavLink
                    to="/"
                    onClick={onCloseDrawer}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <LayoutDashboard className="w-4 h-4 text-civic-400" />
                    <span>Dashboard</span>
                  </NavLink>

                  <NavLink
                    to="/cases"
                    onClick={onCloseDrawer}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <FolderKanban className="w-4 h-4 text-indigo-400" />
                    <span>My Cases ({cases.length})</span>
                  </NavLink>

                  <NavLink
                    to="/documents"
                    onClick={onCloseDrawer}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <FileText className="w-4 h-4 text-emerald-400" />
                    <span>Document Library</span>
                  </NavLink>

                  <NavLink
                    to="/evidence"
                    onClick={onCloseDrawer}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <Paperclip className="w-4 h-4 text-amber-400" />
                    <span>Evidence Locker</span>
                  </NavLink>

                  <NavLink
                    to="/sources"
                    onClick={onCloseDrawer}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <Scale className="w-4 h-4 text-purple-400" />
                    <span>Legal Sources & Charters</span>
                  </NavLink>

                  <NavLink
                    to="/notifications"
                    onClick={onCloseDrawer}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <Bell className="w-4 h-4 text-rose-400" />
                    <span>Notifications {unreadCount > 0 && `(${unreadCount})`}</span>
                  </NavLink>

                  <NavLink
                    to="/help"
                    onClick={onCloseDrawer}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-slate-800 text-slate-300 hover:text-white"
                  >
                    <HelpCircle className="w-4 h-4 text-cyan-400" />
                    <span>Help & Civic Guides</span>
                  </NavLink>
                </nav>

                {/* Domains */}
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 px-3">
                    Statutory Domains
                  </div>
                  <div className="space-y-1">
                    {ISSUE_TYPE_LIST.map(t => (
                      <NavLink
                        key={t.id}
                        to={`/start-case?type=${t.id}`}
                        onClick={onCloseDrawer}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 hover:text-white rounded-lg"
                      >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.accentColor }} />
                        <span>{t.name}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span>100% Client-Side Privacy</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

