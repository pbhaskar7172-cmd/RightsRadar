import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusCircle, 
  Clock, 
  FolderKanban, 
  Compass, 
  ArrowRight, 
  FileSearch,
  ShoppingBag,
  Home,
  Briefcase,
  Landmark,
  ShieldAlert,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  FileText,
  AlertTriangle,
  Zap,
  Target
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { useAuth } from '../context/AuthContext';
import { ISSUE_TYPE_LIST } from '../data/issueTypes';
import { CaseCard } from '../components/cards/CaseCard';
import { DeadlineCard } from '../components/cards/DeadlineCard';
import { NotificationItemCard } from '../components/cards/NotificationItemCard';
import { Button } from '../components/common/Button';
import { DeadlineItem, IssueTypeId } from '../types';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { cases, notifications, documents, evidence, startNewDraft } = useCivicData();
  const { user } = useAuth();
  const [activeDomainHover, setActiveDomainHover] = useState<string | null>(null);

  const activeCases = cases.filter(c => c.status !== 'resolved');
  const resolvedCases = cases.filter(c => c.status === 'resolved');

  // Extract upcoming deadlines from active cases
  const deadlines: DeadlineItem[] = activeCases
    .filter(c => c.deadlineDaysRemaining !== undefined)
    .map(c => ({
      id: `dl-${c.id}`,
      caseId: c.id,
      caseTitle: c.title,
      issueType: c.issueType,
      title: c.recommendedAction,
      statutoryPeriod: c.statutoryTimeframe,
      dueDate: c.deadlineDate || 'Pending',
      daysRemaining: c.deadlineDaysRemaining || 0,
      status: c.deadlineStatus || 'upcoming',
      relatedAction: c.recommendedAction
    }))
    .sort((a, b) => a.daysRemaining - b.daysRemaining);

  const handleQuickStart = (typeId: IssueTypeId) => {
    startNewDraft(typeId);
    navigate(`/start-case?type=${typeId}`);
  };

  const getDomainIcon = (id: IssueTypeId) => {
    switch (id) {
      case 'rti': return <FileSearch className="w-6 h-6 text-blue-400" />;
      case 'consumer': return <ShoppingBag className="w-6 h-6 text-emerald-400" />;
      case 'tenant': return <Home className="w-6 h-6 text-amber-400" />;
      case 'workplace': return <Briefcase className="w-6 h-6 text-purple-400" />;
      case 'govt_scheme': return <Landmark className="w-6 h-6 text-cyan-400" />;
      case 'cyber': return <ShieldAlert className="w-6 h-6 text-rose-400" />;
    }
  };

  const getTimeGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900 p-6 sm:p-8 lg:p-10 text-white shadow-2xl border border-slate-800 relative overflow-hidden"
      >
        {/* Background Radar Visualizer Animation */}
        <div className="absolute right-[-30px] top-[-30px] w-[26rem] h-[26rem] rounded-full border border-civic-500/20 pointer-events-none hidden md:block">
          <div className="absolute inset-12 rounded-full border border-indigo-500/25" />
          <div className="absolute inset-24 rounded-full border border-purple-500/30" />
          <div className="absolute inset-36 rounded-full border border-emerald-500/35" />
          <div className="absolute inset-0 rounded-full radar-sweep-cone animate-radar-sweep origin-center opacity-60" />
          
          {/* Pulsing Radar Targets */}
          <div className="absolute top-16 left-28 w-3 h-3 rounded-full bg-rose-500 animate-ping shadow-glow" />
          <div className="absolute top-16 left-28 w-3 h-3 rounded-full bg-rose-500 shadow-glow" />
          <div className="absolute bottom-24 right-20 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-glow" />
          <div className="absolute top-36 right-16 w-2.5 h-2.5 rounded-full bg-amber-400 shadow-glow" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-civic-500/20 to-indigo-500/20 border border-civic-400/30 text-civic-300 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-civic-300 animate-spin" style={{ animationDuration: '10s' }} />
            <span>Civic Action & Statutory Rights Radar</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {getTimeGreeting()},{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
              {user?.name || 'Citizen'}
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            Diagnose grievances under Indian statutory rules, activate the <strong>ActionRadar</strong> legal timeline, generate enforceable notices, and track 30-day compliance.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/start-case')}
              className="py-3 px-5 rounded-xl bg-gradient-to-r from-civic-600 via-blue-600 to-indigo-600 hover:from-civic-500 hover:to-indigo-500 text-white font-bold text-sm shadow-glow flex items-center gap-2 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Start a New Case</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/help')}
              className="py-3 px-5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 backdrop-blur-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>How RightsTrack Works</span>
            </motion.button>
          </div>
        </div>

        {/* 4 Animated Metric Cards */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
          <motion.div 
            whileHover={{ y: -3 }}
            className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Active Cases</span>
              <FolderKanban className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1.5">{activeCases.length}</div>
            <div className="text-[11px] text-civic-400 font-medium mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span>In Progress</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Deadlines</span>
              <Clock className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1.5">{deadlines.length}</div>
            <div className="text-[11px] text-amber-300/80 font-medium mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>Statutory Tracking</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Legal Drafts</span>
              <FileText className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-indigo-300 mt-1.5">{documents.length}</div>
            <div className="text-[11px] text-indigo-400 font-medium mt-0.5 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-indigo-400" />
              <span>Generated Notices</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ y: -3 }}
            className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 backdrop-blur-md group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Success Rate</span>
              <TrendingUp className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1.5">96.4%</div>
            <div className="text-[11px] text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Statutory Compliance</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Quick Launch Issue Types */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>What issue do you need help with?</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-civic-950 text-civic-300 border border-civic-500/30">
                6 Statutory Domains
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Select a category for tailored diagnostic intake and statutory draft generation</p>
          </div>
          <button
            onClick={() => navigate('/start-case')}
            className="text-xs font-semibold text-civic-400 hover:text-civic-300 flex items-center gap-1 transition-colors"
          >
            <span>View all categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {ISSUE_TYPE_LIST.map((type) => (
            <motion.div
              key={type.id}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setActiveDomainHover(type.id)}
              onHoverEnd={() => setActiveDomainHover(null)}
              onClick={() => handleQuickStart(type.id)}
              className="p-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800 hover:border-civic-500/50 shadow-elevated transition-all cursor-pointer flex flex-col items-center text-center group relative overflow-hidden backdrop-blur-xl"
            >
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-inner"
                style={{ backgroundColor: `${type.accentColor}18`, border: `1px solid ${type.accentColor}40` }}
              >
                {getDomainIcon(type.id)}
              </div>

              <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-civic-300 transition-colors">
                {type.shortName}
              </h3>

              <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                <Clock className="w-3 h-3 text-slate-500" />
                <span>{type.statutoryTimeframe}</span>
              </div>

              <div className="absolute top-0 right-0 w-8 h-8 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-civic-600/30 text-civic-300">
                <ArrowRight className="w-3 h-3 -rotate-45" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Grid: Active Cases & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Active Cases */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FolderKanban className="w-5 h-5 text-civic-400" />
              <h2 className="text-lg font-bold text-white">Active Grievance Cases</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-bold border border-slate-700">
                {activeCases.length}
              </span>
            </div>
            <button
              onClick={() => navigate('/cases')}
              className="text-xs font-semibold text-civic-400 hover:text-civic-300 flex items-center gap-1 transition-colors"
            >
              <span>See all cases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {activeCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeCases.slice(0, 4).map(c => (
                <CaseCard key={c.id} caseItem={c} />
              ))}
            </div>
          ) : (
            <div className="p-8 bg-slate-900/60 rounded-3xl border border-dashed border-slate-800 text-center backdrop-blur-xl">
              <FolderKanban className="w-10 h-10 text-slate-600 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-white">No active cases</h3>
              <p className="text-xs text-slate-400 mt-1 mb-4">Start your first civic or legal case to begin tracking.</p>
              <Button size="sm" onClick={() => navigate('/start-case')}>Start Case</Button>
            </div>
          )}
        </div>

        {/* Right 1 Col: Deadlines & Notifications */}
        <div className="space-y-6">
          {/* Deadlines Block */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">Statutory Deadlines</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">Compliance Countdown</span>
            </div>

            {deadlines.length > 0 ? (
              <div className="space-y-3">
                {deadlines.slice(0, 3).map(dl => (
                  <DeadlineCard key={dl.id} deadline={dl} />
                ))}
              </div>
            ) : (
              <div className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 text-center text-xs text-slate-400 backdrop-blur-xl">
                No pending statutory deadlines right now.
              </div>
            )}
          </div>

          {/* Recent Activity / Notifications */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Recent Activity</h3>
              <button
                onClick={() => navigate('/notifications')}
                className="text-xs text-civic-400 hover:text-civic-300 font-semibold"
              >
                View all
              </button>
            </div>

            <div className="space-y-2.5">
              {notifications.slice(0, 3).map(n => (
                <NotificationItemCard key={n.id} notification={n} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

