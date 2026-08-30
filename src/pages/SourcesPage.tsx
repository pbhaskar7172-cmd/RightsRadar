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
    <div className="space-y-8 animate-fadeIn text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="editorial-pill mb-3">
            <Scale className="w-3.5 h-3.5 text-slate-900" />
            <span>Legal & Civic Knowledge Repository</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight mt-1">
            Statutory Sources & Citizen Charters
          </h1>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed font-medium">
            Verified statutory acts, procedural rules, citizen delivery mandates, and judicial precedents.
          </p>
        </div>

        {/* Demo Disclaimer Note */}
        <div className="p-4 bg-pastel-yellow-light rounded-3xl border border-amber-200 text-xs text-slate-800 max-w-sm flex items-start gap-2.5 font-medium">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>Sources are verified provisions for drafting legal notices and citizen claims.</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => handleTypeChange('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
              selectedType === 'all'
                ? 'bg-slate-900 text-white shadow-pill'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            All Sources ({MOCK_SOURCES.length})
          </button>

          {ISSUE_TYPE_LIST.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTypeChange(type.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                selectedType === type.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
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
            className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 text-slate-900 placeholder:text-slate-400 rounded-2xl border border-slate-200 focus:border-slate-900 outline-none transition-all font-medium"
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
        <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-300">
          <BookOpen className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <h3 className="text-base font-bold text-slate-900">No sources found</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4 font-medium">Try clearing your search query or selecting a different category.</p>
          <button onClick={() => { setSearchQuery(''); setSelectedType('all'); }} className="btn-black text-xs">Clear Filters</button>
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
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
              <span className="font-extrabold text-slate-900 block mb-1">Authoritative Summary:</span>
              {selectedSource.summary}
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Key Enforceable Rights:
              </h4>
              <ul className="space-y-2">
                {selectedSource.keyTakeaways.map((t: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-800 bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 font-medium">
                    <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs text-slate-500 font-medium">
                Issued by: <strong className="text-slate-900">{selectedSource.authority}</strong>
              </div>

              <a
                href={selectedSource.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-black py-2 px-4 text-xs flex items-center gap-1.5"
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


