import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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
  Shield
} from 'lucide-react';
import { useCivicData } from '../../context/CivicDataContext';
import { ISSUE_TYPE_LIST } from '../../data/issueTypes';

export const Sidebar: React.FC = () => {
  const { cases, documents, evidence, unreadCount, resetToDefaults } = useCivicData();
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
    <aside className="w-64 bg-navy-900 text-slate-300 flex flex-col justify-between border-r border-navy-800 shrink-0 h-screen sticky top-0 overflow-y-auto">
      {/* Brand Logo Header */}
      <div>
        <div className="p-5 border-b border-navy-800/80 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-civic-600 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-civic-500/30 group-hover:scale-105 transition-transform">
              <Compass className="w-6 h-6 animate-pulse-slow" />
            </div>
            <div>
              <div className="font-extrabold text-white text-base tracking-tight flex items-center gap-1.5">
                CivicGuide
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-civic-500/30 text-civic-300 border border-civic-400/30">
                  Radar
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">ActionRadar Platform</p>
            </div>
          </NavLink>
        </div>

        {/* Start Case CTA Button */}
        <div className="p-4">
          <NavLink
            to="/start-case"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-civic-600 to-blue-600 hover:from-civic-500 hover:to-blue-500 text-white font-semibold text-sm shadow-md hover:shadow-glow transition-all active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Start a New Case</span>
          </NavLink>
        </div>

        {/* Main Navigation */}
        <nav className="px-3 py-2 space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Main Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-civic-600/20 text-white border border-civic-500/40 font-semibold shadow-xs'
                    : 'text-slate-300 hover:text-white hover:bg-navy-800/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-civic-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>

                {item.count !== undefined && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                      item.highlight
                        ? 'bg-rose-500 text-white animate-pulse'
                        : isActive
                        ? 'bg-civic-500/30 text-civic-200'
                        : 'bg-navy-800 text-slate-400'
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
        <div className="px-3 py-4 mt-2 border-t border-navy-800/80">
          <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
            <span>Issue Domains</span>
            <span className="text-[10px] text-slate-400">6 Types</span>
          </div>

          <div className="mt-2 space-y-0.5">
            {ISSUE_TYPE_LIST.map((type) => (
              <NavLink
                key={type.id}
                to={`/start-case?type=${type.id}`}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-navy-800/60 transition-colors"
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: type.accentColor }}
                />
                <span className="truncate">{type.shortName}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Info & Reset Option */}
      <div className="p-4 border-t border-navy-800/80 bg-navy-950/40">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-civic-400" />
            <span>Citizen Assist MVP</span>
          </div>
          
          <button
            onClick={() => {
              if (window.confirm('Reset all cases and documents back to initial demo data?')) {
                resetToDefaults();
              }
            }}
            className="text-slate-400 hover:text-slate-200 p-1 hover:bg-navy-800 rounded transition-colors"
            title="Reset Demo Data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 mt-1">
          Independent civic drafting assistant
        </p>
      </div>
    </aside>
  );
};
