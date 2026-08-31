import { useState, useMemo } from 'react';
import { useCases } from '../hooks/useCases';
import CaseCard from '../components/cases/CaseCard';
import ActionRadarWidget from '../components/cases/ActionRadarWidget';

export default function CasesPage() {
  const { cases, loading } = useCases();
  const [selectedCaseId, setSelectedCaseId] = useState('matter-904-b');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | active | submitted | resolved | high_priority
  const [domainFilter, setDomainFilter] = useState('all');

  // Extract unique domains for dropdown
  const availableDomains = useMemo(() => {
    const domains = new Set();
    cases.forEach((c) => {
      if (c.domain || c.category) domains.add(c.domain || c.category);
    });
    return Array.from(domains);
  }, [cases]);

  // Combined real-time filtering
  const filteredCases = useMemo(() => {
    return cases.filter((item) => {
      // 1. Status Filter
      if (statusFilter === 'active') {
        if (item.status === 'Resolved' || item.status === 'Submitted to Authority') return false;
      } else if (statusFilter === 'submitted') {
        if (item.status !== 'Submitted to Authority') return false;
      } else if (statusFilter === 'resolved') {
        if (item.status !== 'Resolved') return false;
      } else if (statusFilter === 'high_priority') {
        if (item.priority !== 'High') return false;
      }

      // 2. Domain Filter
      if (domainFilter !== 'all') {
        const itemDomain = item.domain || item.category;
        if (itemDomain !== domainFilter) return false;
      }

      // 3. Text Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title?.toLowerCase().includes(q);
        const matchesDesc = item.description?.toLowerCase().includes(q);
        const matchesMatter = item.matterNumber?.toLowerCase().includes(q) || item.id?.toLowerCase().includes(q);
        const matchesDomain = (item.domain || item.category)?.toLowerCase().includes(q);
        const matchesAuthority = item.authority?.name?.toLowerCase().includes(q);
        const matchesStatus = item.status?.toLowerCase().includes(q);
        const matchesParties = (item.parties?.claimant || item.facts?.claimant)?.toLowerCase().includes(q) ||
          (item.parties?.respondent || item.facts?.respondent)?.toLowerCase().includes(q);

        if (!matchesTitle && !matchesDesc && !matchesMatter && !matchesDomain && !matchesAuthority && !matchesStatus && !matchesParties) {
          return false;
        }
      }

      return true;
    });
  }, [cases, statusFilter, domainFilter, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setDomainFilter('all');
  };

  return (
    <div className="flex flex-col w-full relative">
      <div className="max-w-[1200px] w-full mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-stack-sm mb-stack-lg">
          <h1 className="font-display-md text-display-md text-on-background font-bold">
            Your Active Cases
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[600px]">
            Manage your ongoing legal matters, search case records, and track AI-recommended next steps.
          </p>
        </div>

        {/* Search Bar & Filter Controls Bar */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-variant mb-stack-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by case title, matter #, domain, authority, or parties..."
              className="w-full bg-surface-container-low border border-surface-variant/60 rounded-xl pl-10 pr-9 py-2.5 text-body-md text-on-surface placeholder:text-outline-variant/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 text-sm"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Domain Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="bg-surface-container-low border border-surface-variant/60 rounded-xl px-3 py-2.5 text-xs font-medium text-on-surface focus:outline-none focus:border-primary"
            >
              <option value="all">All Domains</option>
              {availableDomains.map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-stack-md">
          {[
            { id: 'all', label: 'All Matters' },
            { id: 'active', label: 'Active / In Progress' },
            { id: 'submitted', label: 'Submitted to Authority' },
            { id: 'resolved', label: 'Resolved & Concluded' },
            { id: 'high_priority', label: 'High Priority' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setStatusFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-caption font-semibold transition-all ${
                statusFilter === tab.id
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface-variant'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Main Content Area: Cases List (8 Columns) */}
          <div className="lg:col-span-8 flex flex-col gap-stack-md">
            {loading ? (
              <div className="p-8 text-center bg-surface-container-lowest rounded-xl">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-2"></div>
                <p className="text-body-md text-on-surface-variant">Loading matters...</p>
              </div>
            ) : filteredCases.length > 0 ? (
              filteredCases.map((caseItem) => (
                <CaseCard
                  key={caseItem.id}
                  caseItem={caseItem}
                  isSelected={selectedCaseId === caseItem.id}
                  onSelect={(id) => setSelectedCaseId(id)}
                />
              ))
            ) : (
              <div className="bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[24px]">folder_off</span>
                </div>
                <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">
                  No matching matters found
                </h3>
                <p className="text-body-md text-on-surface-variant text-sm max-w-sm">
                  We couldn't find any legal matters matching your search query or filter selection.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-primary text-on-primary rounded-xl text-caption font-semibold hover:bg-primary-container transition-colors"
                >
                  Reset Search & Filters
                </button>
              </div>
            )}
          </div>

          {/* Sidebar: ActionRadar Panel (4 Columns) */}
          <div className="lg:col-span-4 relative mt-8 lg:mt-0">
            <ActionRadarWidget targetCaseId={selectedCaseId || 'matter-904-b'} />
          </div>
        </div>
      </div>
    </div>
  );
}
