import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  Paperclip, 
  Bell, 
  HelpCircle, 
  PlusCircle, 
  Compass, 
  Scale, 
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useCivicData } from '../../context/CivicDataContext';
import { useAuth } from '../../context/AuthContext';
import { ISSUE_TYPE_LIST } from '../../data/issueTypes';

export const Sidebar: React.FC = () => {
  const { cases, documents, evidence, unreadCount, resetToDefaults } = useCivicData();
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'My Cases', path: '/cases', icon: FolderKanban, count: cases.length },
    { label: 'Documents', path: '/documents', icon: FileText, count: documents.length },
    { label: 'Evidence Locker', path: '/evidence', icon: Paperclip, count: evidence.length },
    { label: 'Legal Sources', path: '/sources', icon: Scale },
    { label: 'Notifications', path: '/notifications', icon: Bell, count: unreadCount > 0 ? unreadCount : undefined, highlight: unreadCount > 0 },
    { label: 'Help & Guides', path: '/help', icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-slate-950/95 text-slate-300 flex flex-col justify-between border-r border-slate-800/80 shrink-0 h-screen sticky top-0 overflow-y-auto backdrop-blur-2xl">
      {/* Brand Logo Header */}
      <div>
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-civic-600 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-pulse-slow" />
            </div>
            <div>
              <div className="font-extrabold text-white text-base tracking-tight flex items-center gap-1.5">
                CivicGuide
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-civic-500/20 text-civic-300 border border-civic-400/30 shadow-xs">
                  Radar
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">RightsTrack Engine</p>
            </div>
          </NavLink>
        </div>

        {/* Start Case CTA Button */}
        <div className="p-4">
          <NavLink
            to="/start-case"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-civic-600 via-blue-600 to-indigo-600 hover:from-civic-500 hover:to-indigo-500 text-white font-bold text-sm shadow-glow hover:shadow-glow-indigo transition-all active:scale-[0.98] group"
          >
            <PlusCircle className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            <span>Start a New Case</span>
          </NavLink>
        </div>

        {/* Main Navigation */}
        <nav className="px-3 py-2 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Main Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/60'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSidebarNav"
                    className="absolute inset-0 bg-gradient-to-r from-civic-600/30 via-indigo-600/20 to-transparent border-l-2 border-civic-400 rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}

                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-civic-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.count !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold transition-transform ${
                      item.highlight
                        ? 'bg-rose-500 text-white shadow-glow animate-pulse'
                        : isActive
                        ? 'bg-civic-500/30 text-civic-300 border border-civic-500/40'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Issue Domains Quick Filter */}
        <div className="px-3 py-4 mt-2 border-t border-slate-800/80">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>Statutory Domains</span>
            <span className="text-[10px] text-slate-500">6 Formats</span>
          </div>

          <div className="mt-2 space-y-0.5">
            {ISSUE_TYPE_LIST.map((type) => (
              <NavLink
                key={type.id}
                to={`/start-case?type=${type.id}`}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-slate-400 hover:text-slate-100 hover:bg-slate-900/60 transition-colors group"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0 group-hover:scale-125 transition-transform"
                  style={{ backgroundColor: type.accentColor }}
                />
                <span className="truncate">{type.shortName}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Footer User Info & Reset Option */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950">
        <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/90 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={user?.name || 'Citizen'}
              className="w-7 h-7 rounded-lg object-cover border border-civic-500/40 shrink-0"
            />
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{user?.name || 'Citizen'}</div>
              <div className="text-[10px] text-civic-400 truncate">{user?.roleTitle || 'Verified Citizen'}</div>
            </div>
          </div>

          <button
            onClick={() => {
              if (window.confirm('Reset all demo cases and evidence back to clean initial state?')) {
                resetToDefaults();
              }
            }}
            className="text-slate-500 hover:text-slate-200 p-1.5 hover:bg-slate-800 rounded-lg transition-colors shrink-0"
            title="Reset Demo Data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

