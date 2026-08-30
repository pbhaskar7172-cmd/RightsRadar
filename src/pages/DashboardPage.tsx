import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight,
  Clock, 
  FolderKanban, 
  FileSearch,
  ShoppingBag,
  Home,
  Briefcase,
  Landmark,
  ShieldAlert,
  FileText,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { useAuth } from '../context/AuthContext';
import { ISSUE_TYPE_LIST } from '../data/issueTypes';
import { CaseCard } from '../components/cards/CaseCard';
import { DeadlineCard } from '../components/cards/DeadlineCard';
import { NotificationItemCard } from '../components/cards/NotificationItemCard';
import { DeadlineItem, IssueTypeId } from '../types';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { cases, notifications, documents, startNewDraft } = useCivicData();
  const { user } = useAuth();

  const activeCases = cases.filter(c => c.status !== 'resolved');
  const resolvedCases = cases.filter(c => c.status === 'resolved');

  // Extract upcoming deadlines
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

  // Pastel card styling for the 3 featured showcase blocks
  const FEATURED_BLOCKS = [
    {
      id: 'rti' as IssueTypeId,
      badge: '30-Day Limit',
      title: 'RTI Transparency Desk',
      desc: 'Demand official records, tender audits, and grievance histories under the Right to Information Act 2005.',
      bg: 'bg-pastel-blue',
      border: 'border-blue-200/80',
      icon: FileSearch,
      stat: 'Sec 7(1) Mandate'
    },
    {
      id: 'consumer' as IssueTypeId,
      badge: '45-Day Resolution',
      title: 'Consumer Protection Vault',
      desc: 'Issue statutory legal notices to e-commerce, banking, and airlines under Consumer Protection Act 2019.',
      bg: 'bg-pastel-yellow',
      border: 'border-amber-200/80',
      icon: ShoppingBag,
      stat: 'NCDRC Ready'
    },
    {
      id: 'tenant' as IssueTypeId,
      badge: 'Immediate Action',
      title: 'Tenancy & Deposit Guard',
      desc: 'Enforce security deposit refunds and unlawful eviction defenses under Model Tenancy Law.',
      bg: 'bg-pastel-purple',
      border: 'border-purple-200/80',
      icon: Home,
      stat: 'Statutory Shield'
    }
  ];

  return (
    <div className="space-y-12 animate-fadeIn">
      
      {/* Top Editorial Hero Layout: Left Headline + Right 3 Pastel Showcase Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Headline Column (Matching Image Left side) */}
        <motion.div 
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-4 flex flex-col justify-between py-2"
        >
          <div>
            <span className="editorial-pill mb-4 text-slate-800">
              <Sparkles className="w-3.5 h-3.5 text-slate-900" />
              <span>Statutory Civic Defense System</span>
            </span>

            <h1 className="text-4xl sm:text-5xl font-black text-slate-950 tracking-tight leading-[1.08] mt-3">
              Grow Bold.<br />
              Move Free.<br />
              Claim Rights.
            </h1>

            <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
              A civic intelligence platform where citizens enforce statutory timelines, generate valid legal notices, and hold public & private authorities accountable.
            </p>
          </div>

          {/* Quick Action Input & Black Button */}
          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/start-case')}
                className="w-full btn-black py-3.5 text-sm font-extrabold flex items-center justify-between"
              >
                <span>Launch New Case</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold text-slate-500 pt-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Client-Side Privacy</span>
              </span>
              <span>•</span>
              <span>Zero Sign-up Lock</span>
            </div>
          </div>
        </motion.div>

        {/* Right 3 Pastel Interactive Cards (Matching Image 3 Vertical Cards) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURED_BLOCKS.map((block, idx) => {
            const Icon = block.icon;
            return (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => handleQuickStart(block.id)}
                className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="editorial-pill text-slate-800 font-extrabold">
                      {block.badge}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 group-hover:bg-slate-900 group-hover:text-white transition-colors shadow-subtle">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:scale-110" />
                    </div>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 leading-snug tracking-tight group-hover:text-slate-800">
                    {block.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 mt-2.5 line-clamp-3 leading-relaxed font-medium">
                    {block.desc}
                  </p>
                </div>

                {/* Bottom Pastel Container */}
                <div className={`mt-6 rounded-2xl ${block.bg} p-5 flex flex-col items-center justify-center min-h-[140px] border ${block.border} transition-transform group-hover:scale-[1.02]`}>
                  <Icon className="w-10 h-10 text-slate-900 mb-2" />
                  <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider bg-white/80 px-3 py-1 rounded-full border border-white/60 shadow-subtle">
                    {block.stat}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* 4 Clean Metric Stat Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-subtle">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Active Cases</span>
            <FolderKanban className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-slate-950 mt-2">{activeCases.length}</div>
          <div className="text-[11px] font-bold text-blue-700 mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>Statutory Tracking</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-subtle">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Action Deadlines</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-slate-950 mt-2">{deadlines.length}</div>
          <div className="text-[11px] font-bold text-amber-700 mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Response Pending</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-subtle">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Legal Notices</span>
            <FileText className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-3xl font-black text-slate-950 mt-2">{documents.length}</div>
          <div className="text-[11px] font-bold text-purple-700 mt-1 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-purple-600" />
            <span>Generated & Dispatched</span>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-subtle">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>Success Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-950 mt-2">96.4%</div>
          <div className="text-[11px] font-bold text-emerald-700 mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>Statutory Compliance</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Cases & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 8 Cols: Active Grievance Cases */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-950 tracking-tight">
                Active Grievance Cases
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-xs font-extrabold border border-slate-200">
                {activeCases.length}
              </span>
            </div>
            <button
              onClick={() => navigate('/cases')}
              className="text-xs font-bold text-slate-900 hover:underline flex items-center gap-1"
            >
              <span>See all cases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {activeCases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {activeCases.slice(0, 4).map(c => (
                <CaseCard key={c.id} caseItem={c} />
              ))}
            </div>
          ) : (
            <div className="p-10 bg-white rounded-3xl border border-slate-200 text-center shadow-subtle">
              <FolderKanban className="w-10 h-10 text-slate-400 mx-auto mb-2" />
              <h3 className="text-base font-bold text-slate-900">No active cases yet</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4 font-medium">Start your first civic or legal case to begin tracking.</p>
              <button
                onClick={() => navigate('/start-case')}
                className="btn-black"
              >
                Start Case
              </button>
            </div>
          )}
        </div>

        {/* Right 4 Cols: Deadlines & Statutory Alerts */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Statutory Deadlines */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <h3 className="text-base font-extrabold text-slate-950">Statutory Radar</h3>
              </div>
              <span className="text-xs text-slate-500 font-bold">Countdowns</span>
            </div>

            {deadlines.length > 0 ? (
              <div className="space-y-3">
                {deadlines.slice(0, 3).map(dl => (
                  <DeadlineCard key={dl.id} deadline={dl} />
                ))}
              </div>
            ) : (
              <div className="p-6 bg-white rounded-3xl border border-slate-200 text-center text-xs text-slate-500 font-medium shadow-subtle">
                No active countdowns right now.
              </div>
            )}
          </div>

          {/* Activity Alerts */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-950">Recent Activity</h3>
              <button
                onClick={() => navigate('/notifications')}
                className="text-xs text-slate-900 font-bold hover:underline"
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


