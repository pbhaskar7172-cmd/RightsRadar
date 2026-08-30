import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  ShieldAlert
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { ISSUE_TYPE_LIST } from '../data/issueTypes';
import { CaseCard } from '../components/cards/CaseCard';
import { DeadlineCard } from '../components/cards/DeadlineCard';
import { NotificationItemCard } from '../components/cards/NotificationItemCard';
import { Button } from '../components/common/Button';
import { DeadlineItem, IssueTypeId } from '../types';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { cases, notifications, documents, evidence, startNewDraft } = useCivicData();

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
      case 'rti': return <FileSearch className="w-5 h-5 text-blue-600" />;
      case 'consumer': return <ShoppingBag className="w-5 h-5 text-emerald-600" />;
      case 'tenant': return <Home className="w-5 h-5 text-amber-600" />;
      case 'workplace': return <Briefcase className="w-5 h-5 text-purple-600" />;
      case 'govt_scheme': return <Landmark className="w-5 h-5 text-cyan-600" />;
      case 'cyber': return <ShieldAlert className="w-5 h-5 text-rose-600" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 p-6 sm:p-8 lg:p-10 text-white shadow-elevated relative overflow-hidden">
        {/* Background Radar Rings */}
        <div className="absolute right-[-20px] top-[-20px] w-96 h-96 rounded-full border border-civic-500/10 pointer-events-none hidden md:block">
          <div className="absolute inset-10 rounded-full border border-civic-500/15" />
          <div className="absolute inset-20 rounded-full border border-civic-500/20" />
          <div className="absolute inset-32 rounded-full border border-civic-500/25" />
          <div className="absolute inset-0 rounded-full radar-sweep-cone animate-radar-sweep origin-center opacity-40" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-civic-500/20 border border-civic-400/30 text-civic-200 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-civic-300 animate-spin" style={{ animationDuration: '12s' }} />
            Citizen Empowerment & ActionRadar
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Take confident action on your civic & legal problems.
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            Diagnose your issue under statutory laws, uncover your best legal recourse with <strong>ActionRadar</strong>, generate formal notices, and track deadlines.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              variant="civic-glow"
              onClick={() => navigate('/start-case')}
              leftIcon={<PlusCircle className="w-5 h-5" />}
            >
              Start a New Case
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => navigate('/help')}
              className="bg-navy-900/60 border-slate-700 text-slate-200 hover:text-white hover:bg-navy-800 hover:border-slate-600"
            >
              How It Works
            </Button>
          </div>
        </div>

        {/* Quick Metric Pills */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
          <div className="bg-navy-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-navy-800">
            <div className="text-2xl font-black text-white">{activeCases.length}</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Active Grievances</div>
          </div>
          <div className="bg-navy-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-navy-800">
            <div className="text-2xl font-black text-amber-400">{deadlines.length}</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Tracked Deadlines</div>
          </div>
          <div className="bg-navy-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-navy-800">
            <div className="text-2xl font-black text-civic-400">{documents.length}</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Prepared Drafts</div>
          </div>
          <div className="bg-navy-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-navy-800">
            <div className="text-2xl font-black text-emerald-400">{resolvedCases.length}</div>
            <div className="text-xs text-slate-400 font-medium mt-0.5">Resolved Cases</div>
          </div>
        </div>
      </div>

      {/* Quick Launch Issue Types */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">What issue do you need help with?</h2>
            <p className="text-xs text-slate-500 mt-0.5">Select a category for tailored diagnostic intake</p>
          </div>
          <button
            onClick={() => navigate('/start-case')}
            className="text-xs font-semibold text-civic-600 hover:text-civic-700 flex items-center gap-1"
          >
            <span>View all categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {ISSUE_TYPE_LIST.map((type) => (
            <motion.div
              key={type.id}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleQuickStart(type.id)}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-civic-400 p-4 shadow-subtle hover:shadow-elevated transition-all cursor-pointer flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-2.5 group-hover:bg-civic-50 transition-colors">
                {getDomainIcon(type.id)}
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-civic-700 transition-colors">
                {type.shortName}
              </h3>
              <span className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                {type.statutoryTimeframe.split(' ')[0]} {type.statutoryTimeframe.split(' ')[1]}
              </span>
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
              <FolderKanban className="w-5 h-5 text-civic-600" />
              <h2 className="text-lg font-bold text-slate-900">Active Cases</h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                {activeCases.length}
              </span>
            </div>
            <button
              onClick={() => navigate('/cases')}
              className="text-xs font-semibold text-civic-600 hover:text-civic-700 flex items-center gap-1"
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
            <div className="p-8 bg-white rounded-2xl border border-dashed border-slate-200 text-center">
              <FolderKanban className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <h3 className="text-sm font-bold text-slate-800">No active cases</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">Start your first civic or legal case to begin tracking.</p>
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
                <Clock className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">Upcoming Deadlines</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">Statutory Timeframes</span>
            </div>

            {deadlines.length > 0 ? (
              <div className="space-y-3">
                {deadlines.slice(0, 3).map(dl => (
                  <DeadlineCard key={dl.id} deadline={dl} />
                ))}
              </div>
            ) : (
              <div className="p-5 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                No pending statutory deadlines right now.
              </div>
            )}
          </div>

          {/* Recent Activity / Notifications */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Recent Activity</h3>
              <button
                onClick={() => navigate('/notifications')}
                className="text-xs text-civic-600 hover:text-civic-700 font-semibold"
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
