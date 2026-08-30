import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCivicData } from '../context/CivicDataContext';
import { ISSUE_TYPE_LIST } from '../data/issueTypes';
import { CaseCard } from '../components/cards/CaseCard';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { 
  FolderKanban, 
  Search, 
  PlusCircle, 
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
    <div className="space-y-8 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-civic-50 text-civic-700 border border-civic-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <FolderKanban className="w-3.5 h-3.5 text-civic-600" />
            Citizen Case Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Cases ({cases.length})
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track statutory timelines, prepared notices, evidence lockers, and escalation stages.
          </p>
        </div>

        <Button
          size="md"
          variant="civic-glow"
          onClick={() => navigate('/start-case')}
          leftIcon={<PlusCircle className="w-4 h-4" />}
        >
          Start a New Case
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-subtle space-y-4">
        {/* Search & Status Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by case title, authority, or ID..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 focus:bg-white text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 rounded-xl border border-slate-200 focus:border-civic-600 focus:ring-2 focus:ring-civic-100 outline-none transition-all"
            />
          </div>

          {/* Status Quick Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === 'all' ? 'bg-navy-900 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({cases.length})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === 'active' ? 'bg-civic-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Active ({cases.filter(c => c.status !== 'resolved').length})
            </button>
            <button
              onClick={() => setStatusFilter('response_pending')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === 'response_pending' ? 'bg-amber-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Response Pending ({cases.filter(c => c.status === 'response_pending').length})
            </button>
            <button
              onClick={() => setStatusFilter('resolved')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                statusFilter === 'resolved' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Resolved ({cases.filter(c => c.status === 'resolved').length})
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-slate-100 pb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
            Category:
          </span>
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 transition-colors ${
              categoryFilter === 'all' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Categories
          </button>
          {ISSUE_TYPE_LIST.map((type) => (
            <button
              key={type.id}
              onClick={() => setCategoryFilter(type.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium shrink-0 transition-colors flex items-center gap-1.5 ${
                categoryFilter === type.id ? 'bg-civic-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: type.accentColor }} />
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
