import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCivicData } from '../context/CivicDataContext';
import { DocumentCard } from '../components/cards/DocumentCard';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { FileText, Search, Plus, Sparkles } from 'lucide-react';
import { ISSUE_TYPE_LIST } from '../data/issueTypes';
import { DocumentItem } from '../types';

export const DocumentsPage: React.FC = () => {
  const navigate = useNavigate();
  const { documents } = useCivicData();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredDocs = documents.filter((d: DocumentItem) => {
    const matchesSearch = !searchQuery.trim() || 
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.authorityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (d.referenceNumber && d.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || d.issueType === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-civic-950 text-civic-300 border border-civic-500/40 text-xs font-semibold uppercase tracking-wider mb-3 shadow-glow">
            <FileText className="w-3.5 h-3.5 text-civic-400" />
            <span>Citizen Document Repository</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Document Library ({documents.length})
          </h1>
          <p className="text-sm text-slate-300 mt-1 leading-relaxed">
            Access, edit, print, or export formal statutory notices, RTI applications, and petitions.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/start-case')}
          className="py-3 px-5 rounded-xl bg-gradient-to-r from-civic-600 via-blue-600 to-indigo-600 hover:from-civic-500 hover:to-indigo-500 text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Draft New Notice</span>
        </motion.button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 p-4 sm:p-5 rounded-3xl border border-slate-800 shadow-2xl space-y-4 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents, references, content..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-950 text-xs sm:text-sm text-white placeholder:text-slate-500 rounded-xl border border-slate-800 focus:border-civic-500 focus:ring-2 focus:ring-civic-500/20 outline-none transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === 'all' ? 'bg-slate-800 text-white shadow-glow border border-slate-700' : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80'
              }`}
            >
              All ({documents.length})
            </button>
            <button
              onClick={() => setStatusFilter('draft')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === 'draft' ? 'bg-slate-700 text-white shadow-xs' : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80'
              }`}
            >
              Drafts ({documents.filter(d => d.status === 'draft').length})
            </button>
            <button
              onClick={() => setStatusFilter('ready')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === 'ready' ? 'bg-emerald-600 text-white shadow-glow-emerald' : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80'
              }`}
            >
              Ready to Serve ({documents.filter(d => d.status === 'ready').length})
            </button>
            <button
              onClick={() => setStatusFilter('submitted')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === 'submitted' ? 'bg-cyan-600 text-white shadow-glow' : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80'
              }`}
            >
              Dispatched ({documents.filter(d => d.status === 'submitted').length})
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-3 border-t border-slate-800/80 pb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
            Category:
          </span>
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
              categoryFilter === 'all' ? 'bg-slate-800 text-white border border-slate-700' : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80'
            }`}
          >
            All Categories
          </button>
          {ISSUE_TYPE_LIST.map(type => (
            <button
              key={type.id}
              onClick={() => setCategoryFilter(type.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 transition-colors flex items-center gap-1.5 ${
                categoryFilter === type.id ? 'bg-civic-950 text-civic-300 border border-civic-500/50 shadow-glow' : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800/80'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: type.accentColor }} />
              <span>{type.shortName}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      {filteredDocs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc: DocumentItem) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FileText}
          title="No documents found"
          description="Try modifying search keywords or create a new case notice."
          actionLabel="Clear Filters"
          onAction={() => { setSearchQuery(''); setStatusFilter('all'); setCategoryFilter('all'); }}
          secondaryActionLabel="Start Case"
          onSecondaryAction={() => navigate('/start-case')}
        />
      )}
    </div>
  );
};

