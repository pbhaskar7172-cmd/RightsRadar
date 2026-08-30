import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCivicData } from '../context/CivicDataContext';
import { DocumentCard } from '../components/cards/DocumentCard';
import { EmptyState } from '../components/common/EmptyState';
import { FileText, Search, Plus, ArrowUpRight } from 'lucide-react';
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
    <div className="space-y-8 animate-fadeIn text-slate-900">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="editorial-pill mb-3">
            <FileText className="w-3.5 h-3.5 text-slate-900" />
            <span>Citizen Document Repository</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight mt-1">
            Document Library ({documents.length})
          </h1>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed font-medium">
            Access, edit, print, or export formal statutory notices, RTI applications, and petitions.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/start-case')}
          className="btn-black py-3 px-6 text-sm shrink-0"
        >
          <span>Draft New Notice</span>
          <ArrowUpRight className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-card space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents, references..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 rounded-2xl border border-slate-200 focus:border-slate-900 outline-none transition-all font-medium"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                statusFilter === 'all' ? 'bg-slate-900 text-white shadow-pill' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({documents.length})
            </button>
            <button
              onClick={() => setStatusFilter('draft')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                statusFilter === 'draft' ? 'bg-slate-900 text-white shadow-pill' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              Drafts ({documents.filter(d => d.status === 'draft').length})
            </button>
            <button
              onClick={() => setStatusFilter('ready')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                statusFilter === 'ready' ? 'bg-pastel-mint text-slate-950 border border-emerald-300' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              Ready ({documents.filter(d => d.status === 'ready').length})
            </button>
            <button
              onClick={() => setStatusFilter('submitted')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                statusFilter === 'submitted' ? 'bg-pastel-blue text-slate-950 border border-blue-300' : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              Dispatched ({documents.filter(d => d.status === 'submitted').length})
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
          {ISSUE_TYPE_LIST.map(type => (
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


