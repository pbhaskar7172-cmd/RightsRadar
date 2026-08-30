import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCivicData } from '../context/CivicDataContext';
import { ISSUE_TYPE_LIST } from '../data/issueTypes';
import { CaseCard } from '../components/cards/CaseCard';
import { EmptyState } from '../components/common/EmptyState';
import { 
  FolderKanban, 
  Search, 
  PlusCircle, 
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { CaseItem } from '../types';

export const CasesPage: React.FC = () => {
  const navigate = useNavigate();
  const { cases } = useCivicData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredCases = cases.filter((c: CaseItem) => {
    const matchesSearch = !searchQuery.trim() || 
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.authorityInvolved.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && c.status !== 'resolved') ||
      c.status === statusFilter;

    const matchesCategory = categoryFilter === 'all' || c.issueType === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fadeIn text-slate-900">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="editorial-pill mb-3">
            <FolderKanban className="w-3.5 h-3.5 text-slate-900" />
            <span>Citizen Case Directory</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight mt-1">
            My Cases ({cases.length})
          </h1>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed font-medium">
            Track statutory timelines, prepared notices, evidence lockers, and escalation stages.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/start-case')}
          className="btn-black py-3 px-6 text-sm shrink-0"
        >
          <span>Start a New Case</span>
          <ArrowUpRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card space-y-4">
        {/* Search & Status Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, authority, or ID..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 rounded-2xl border border-slate-200 focus:border-slate-900 outline-none transition-all font-medium"
            />
          </div>

          {/* Status Quick Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                statusFilter === 'all' ? 'bg-slate-900 text-white shadow-pill' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({cases.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                statusFilter === 'active' ? 'bg-slate-900 text-white shadow-pill' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              Active ({cases.filter(c => c.status !== 'resolved').length})
            </button>
            <button
              onClick={() => setStatusFilter('response_pending')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                statusFilter === 'response_pending' ? 'bg-pastel-yellow text-slate-950 border border-amber-300' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              Pending ({cases.filter(c => c.status === 'response_pending').length})
            </button>
            <button
              onClick={() => setStatusFilter('resolved')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                statusFilter === 'resolved' ? 'bg-pastel-mint text-slate-950 border border-emerald-300' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              Resolved ({cases.filter(c => c.status === 'resolved').length})
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3 border-t border-slate-100 pb-1">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 shrink-0">
            Category:
          </span>
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1 rounded-full text-xs font-extrabold shrink-0 transition-colors cursor-pointer ${
              categoryFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            All Categories
          </button>
          {ISSUE_TYPE_LIST.map((type) => (
            <button
              key={type.id}
              onClick={() => setCategoryFilter(type.id)}
              className={`px-3 py-1 rounded-full text-xs font-extrabold shrink-0 transition-colors flex items-center gap-1.5 cursor-pointer ${
                categoryFilter === type.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: type.accentColor }} />
              <span>{type.shortName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cases Grid */}
      {filteredCases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((c: CaseItem) => (
            <CaseCard key={c.id} caseItem={c} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FolderKanban}
          title="No cases match your filters"
          description="Try clearing search keywords or switching category filters to see your cases."
          actionLabel="Clear Filters"
          onAction={() => { setSearchQuery(''); setStatusFilter('all'); setCategoryFilter('all'); }}
          secondaryActionLabel="Start a New Case"
          onSecondaryAction={() => navigate('/start-case')}
        />
      )}
    </div>
  );
};


