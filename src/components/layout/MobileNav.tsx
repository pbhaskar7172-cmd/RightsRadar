import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  FolderKanban, 
  PlusCircle, 
  FileText, 
  Paperclip, 
  Bell, 
  HelpCircle, 
  Scale, 
  X,
  ShieldCheck,
  Radar
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
    { label: 'Dashboard', path: '/', icon: Compass },
    { label: 'Cases', path: '/cases', icon: FolderKanban, count: cases.length },
    { label: 'Start Case', path: '/start-case', icon: PlusCircle, isPrimary: true },
    { label: 'Radar', path: '/action-radar', icon: Radar },
    { label: 'Alerts', path: '/notifications', icon: Bell, count: unreadCount > 0 ? unreadCount : undefined },
  ];

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/80 z-40 py-2 px-3 flex items-center justify-around shadow-elevated">
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
                <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-black border-2 border-white active:scale-95 transition-transform">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-slate-900 mt-1">Start</span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl relative transition-all ${
                isActive ? 'text-slate-900 font-extrabold bg-slate-100' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {tab.count !== undefined && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 bg-slate-900 text-white rounded-full text-[9px] font-bold flex items-center justify-center shadow-sm">
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
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-4/5 max-w-xs bg-white text-slate-800 h-full flex flex-col justify-between p-5 z-10 shadow-elevated border-r border-slate-200"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
                      人
                    </div>
                    <div>
                      <span className="font-extrabold text-slate-900 text-sm">RightsTrack</span>
                      <span className="text-[9px] block text-slate-500 font-semibold">Citizen Radar</span>
                    </div>
                  </div>

                  <button
                    onClick={onCloseDrawer}
                    className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* User Card */}
                {user && (
                  <div className="my-4 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-300"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 text-xs truncate">{user.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{user.roleTitle}</div>
                    </div>
                  </div>
                )}

                {/* Navigation links */}
                <nav className="mt-2 space-y-1">
                  <NavLink
                    to="/"
                    onClick={onCloseDrawer}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                  >
                    <Compass className="w-4 h-4 text-slate-700" />
                    <span>Dashboard</span>
                  </NavLink>

                  <NavLink
                    to="/cases"
                    onClick={onCloseDrawer}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                  >
                    <FolderKanban className="w-4 h-4 text-slate-700" />
                    <span>My Cases ({cases.length})</span>
                  </NavLink>

                  <NavLink
                    to="/action-radar"
                    onClick={onCloseDrawer}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                  >
                    <Radar className="w-4 h-4 text-slate-700" />
                    <span>Action Radar</span>
                  </NavLink>

                  <NavLink
                    to="/documents"
                    onClick={onCloseDrawer}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                  >
                    <FileText className="w-4 h-4 text-slate-700" />
                    <span>Document Library</span>
                  </NavLink>

                  <NavLink
                    to="/evidence"
                    onClick={onCloseDrawer}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                  >
                    <Paperclip className="w-4 h-4 text-slate-700" />
                    <span>Evidence Locker</span>
                  </NavLink>

                  <NavLink
                    to="/sources"
                    onClick={onCloseDrawer}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                  >
                    <Scale className="w-4 h-4 text-slate-700" />
                    <span>Legal Sources & Charters</span>
                  </NavLink>

                  <NavLink
                    to="/notifications"
                    onClick={onCloseDrawer}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                  >
                    <Bell className="w-4 h-4 text-slate-700" />
                    <span>Notifications {unreadCount > 0 && `(${unreadCount})`}</span>
                  </NavLink>

                  <NavLink
                    to="/help"
                    onClick={onCloseDrawer}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-semibold hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                  >
                    <HelpCircle className="w-4 h-4 text-slate-700" />
                    <span>Help & Civic Guides</span>
                  </NavLink>
                </nav>

                {/* Domains */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 px-3">
                    Statutory Domains
                  </div>
                  <div className="space-y-1">
                    {ISSUE_TYPE_LIST.map(t => (
                      <NavLink
                        key={t.id}
                        to={`/start-case?type=${t.id}`}
                        onClick={onCloseDrawer}
                        className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 rounded-xl"
                      >
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.accentColor }} />
                        <span>{t.name}</span>
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span>100% Client-Side Privacy</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};


