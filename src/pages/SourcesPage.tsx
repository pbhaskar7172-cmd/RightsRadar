import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_SOURCES } from '../data/mockSources';
import { ISSUE_TYPE_LIST } from '../data/issueTypes';
import { SourceItem, IssueTypeId } from '../types';
import { SourceCard } from '../components/cards/SourceCard';
import { Modal } from '../components/common/Modal';
import { 
  Scale, 
  Search, 
  BookOpen, 
  ExternalLink, 
  AlertCircle,
  Check
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';

export const SourcesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTypeParam = searchParams.get('type') as IssueTypeId | null;

  const [selectedType, setSelectedType] = useState<string>(activeTypeParam || 'all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<SourceItem | null>(null);

  const filteredSources = MOCK_SOURCES.filter((s: SourceItem) => {
    const matchesType = selectedType === 'all' || s.issueType === selectedType;
    const matchesSearch = !searchQuery.trim() || 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.authority.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.citation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    if (type === 'all') {
      searchParams.delete('type');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ type });
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-civic-50 text-civic-700 border border-civic-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <Scale className="w-3.5 h-3.5 text-civic-600" />
            Legal & Civic Knowledge Repository
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Statutory Sources & Citizen Charters
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Verified statutory acts, procedural rules, citizen delivery mandates, and judicial precedents.
          </p>
        </div>

        {/* Demo Disclaimer Note */}
        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 max-w-sm flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>Sources are provided for educational & drafting guidance. Demo repository.</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => handleTypeChange('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedType === 'all'
                ? 'bg-navy-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Sources ({MOCK_SOURCES.length})
          </button>

          {ISSUE_TYPE_LIST.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTypeChange(type.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                selectedType === type.id
                  ? 'bg-civic-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: type.accentColor }} />
              <span>{type.shortName}</span>
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search acts, sections, rules..."
            className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 focus:bg-white rounded-xl border border-slate-200 focus:border-civic-600 focus:ring-2 focus:ring-civic-100 outline-none transition-all"
          />
        </div>
      </div>

      {/* Sources Grid */}
      {filteredSources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSources.map((s: SourceItem) => (
            <SourceCard
              key={s.id}
              source={s}
              onViewDetails={(src: SourceItem) => setSelectedSource(src)}
            />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-800">No sources found</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">Try clearing your search query or selecting a different category.</p>
          <Button size="sm" onClick={() => { setSearchQuery(''); setSelectedType('all'); }}>Clear Filters</Button>
        </div>
      )}

      {/* Detail Modal */}
      <Modal
        isOpen={!!selectedSource}
        onClose={() => setSelectedSource(null)}
        title={
          selectedSource && (
            <div className="flex items-center gap-2">
              <StatusBadge issueType={selectedSource.issueType} size="sm" />
              <span>{selectedSource.title}</span>
            </div>
          )
        }
        description={selectedSource?.citation}
        size="lg"
      >
        {selectedSource && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-slate-800 block mb-1">Authoritative Summary:</span>
              {selectedSource.summary}
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Key Enforceable Rights:
              </h4>
              <ul className="space-y-2">
                {selectedSource.keyTakeaways.map((t: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-200">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Issued by: <strong>{selectedSource.authority}</strong>
              </div>

              <a
                href={selectedSource.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-civic-600 hover:bg-civic-700 text-white text-xs font-semibold transition-colors"
              >
                <span>Visit Official Gazetted Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
