import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  Compass
} from 'lucide-react';
import { useCivicData } from '../../context/CivicDataContext';
import { ISSUE_TYPE_LIST } from '../../data/issueTypes';

interface MobileNavProps {
  isDrawerOpen: boolean;
  onCloseDrawer: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isDrawerOpen, onCloseDrawer }) => {
  const { cases, unreadCount } = useCivicData();
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
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 py-1.5 px-2 flex items-center justify-around shadow-lg">
        {primaryTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;

          if (tab.isPrimary) {
            return (
              <NavLink
                key={tab.path}
                to={tab.path}
                className="flex flex-col items-center justify-center -mt-5"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-civic-600 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-civic-500/40 active:scale-95 transition-transform border-2 border-white">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-civic-700 mt-0.5">Start</span>
              </NavLink>
            );
          }

          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl relative transition-colors ${
                isActive ? 'text-civic-600 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {tab.count !== undefined && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
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
      {isDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={onCloseDrawer}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="relative w-4/5 max-w-xs bg-navy-900 text-slate-300 h-full flex flex-col justify-between p-5 z-10 shadow-2xl">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-navy-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-civic-600 flex items-center justify-center text-white">
                    <Compass className="w-5 h-5" />
                  </div>
                  <span className="font-extrabold text-white">CivicGuide</span>
                </div>

                <button
                  onClick={onCloseDrawer}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation links */}
              <nav className="mt-4 space-y-1">
                <NavLink
                  to="/"
                  onClick={onCloseDrawer}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-navy-800 text-slate-300 hover:text-white"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </NavLink>

                <NavLink
                  to="/cases"
                  onClick={onCloseDrawer}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-navy-800 text-slate-300 hover:text-white"
                >
                  <FolderKanban className="w-4 h-4" />
                  <span>My Cases ({cases.length})</span>
                </NavLink>

                <NavLink
                  to="/documents"
                  onClick={onCloseDrawer}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-navy-800 text-slate-300 hover:text-white"
                >
                  <FileText className="w-4 h-4" />
                  <span>Document Library</span>
                </NavLink>

                <NavLink
                  to="/evidence"
                  onClick={onCloseDrawer}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-navy-800 text-slate-300 hover:text-white"
                >
                  <Paperclip className="w-4 h-4" />
                  <span>Evidence Locker</span>
                </NavLink>

                <NavLink
                  to="/sources"
                  onClick={onCloseDrawer}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-navy-800 text-slate-300 hover:text-white"
                >
                  <Scale className="w-4 h-4" />
                  <span>Legal Sources & Charters</span>
                </NavLink>

                <NavLink
                  to="/notifications"
                  onClick={onCloseDrawer}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-navy-800 text-slate-300 hover:text-white"
                >
                  <Bell className="w-4 h-4" />
                  <span>Notifications {unreadCount > 0 && `(${unreadCount})`}</span>
                </NavLink>

                <NavLink
                  to="/help"
                  onClick={onCloseDrawer}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm hover:bg-navy-800 text-slate-300 hover:text-white"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Help & Civic Guides</span>
                </NavLink>
              </nav>

              {/* Domains */}
              <div className="mt-6 pt-4 border-t border-navy-800">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 px-3">
                  Supported Issue Types
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

            <div className="text-[11px] text-slate-500 pt-4 border-t border-navy-800">
              CivicGuide — ActionRadar MVP
            </div>
          </div>
        </div>
      )}
    </>
  );
};
