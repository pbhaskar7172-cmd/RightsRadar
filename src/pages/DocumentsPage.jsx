import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAllDocuments } from '../hooks/useDocument';

export default function DocumentsPage() {
  const { documents, loading } = useAllDocuments();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | draft | review | edited | submitted | resolved

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      // 1. Status Filter
      if (statusFilter === 'draft') {
        if (!doc.status?.toLowerCase().includes('draft')) return false;
      } else if (statusFilter === 'review') {
        if (!doc.status?.toLowerCase().includes('review')) return false;
      } else if (statusFilter === 'edited') {
        if (!doc.status?.toLowerCase().includes('edit') && !doc.isRevisionApplied) return false;
      } else if (statusFilter === 'submitted') {
        if (!doc.status?.toLowerCase().includes('submit')) return false;
      } else if (statusFilter === 'resolved') {
        if (!doc.status?.toLowerCase().includes('resolve') && !doc.status?.toLowerCase().includes('close')) return false;
      }

      // 2. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = doc.title?.toLowerCase().includes(q);
        const matchesType = (doc.type || doc.documentType)?.toLowerCase().includes(q);
        const matchesRef = doc.refNumber?.toLowerCase().includes(q);
        const matchesSummary = doc.documentTypeSummary?.toLowerCase().includes(q);
        const matchesRecipient = doc.recipient?.company?.toLowerCase().includes(q);
        const matchesAuthority = doc.authority?.name?.toLowerCase().includes(q);
        const matchesCase = doc.caseId?.toLowerCase().includes(q);

        if (!matchesTitle && !matchesType && !matchesRef && !matchesSummary && !matchesRecipient && !matchesAuthority && !matchesCase) {
          return false;
        }
      }

      return true;
    });
  }, [documents, statusFilter, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
  };

  return (
    <div className="flex flex-col w-full relative min-h-[calc(100vh-80px)]">
      <div className="max-w-[1200px] w-full mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-stack-lg">
          <div>
            <h1 className="font-display-md text-display-md text-on-background font-bold">
              Legal Documents
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-[600px]">
              Access, search, edit, and export AI-drafted notices, statutory petitions, and demand letters.
            </p>
          </div>

          <Link
            to="/assistant"
            className="bg-primary text-on-primary px-6 py-3 rounded-xl text-label-md font-label-md hover:bg-primary-container transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0 font-medium"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Draft New Document
          </Link>
        </div>

        {/* Search Bar */}
        <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-surface-variant mb-stack-md flex items-center gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, template type, reference #, recipient, or matter ID..."
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
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-stack-md">
          {[
            { id: 'all', label: 'All Documents' },
            { id: 'draft', label: 'Draft Generated' },
            { id: 'review', label: 'Review Ready' },
            { id: 'edited', label: 'Edited' },
            { id: 'submitted', label: 'Submitted by User' },
            { id: 'resolved', label: 'Resolved' }
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

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {loading ? (
            <div className="col-span-full p-8 text-center bg-surface-container-lowest rounded-xl">
              <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-2"></div>
              <p className="text-body-md text-on-surface-variant">Loading legal drafts...</p>
            </div>
          ) : filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc) => (
              <div
                key={doc.id}
                className="bg-surface-container-lowest rounded-2xl p-stack-md shadow-sm hover:shadow-md transition-all duration-300 border border-surface-variant flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-caption text-caption font-semibold">
                      {doc.status}
                    </span>
                    <span className="text-caption text-on-surface-variant">
                      {doc.date}
                    </span>
                  </div>

                  <h3 className="font-title-lg text-title-lg text-on-surface font-semibold group-hover:text-primary transition-colors mb-1 line-clamp-1">
                    {doc.title}
                  </h3>
                  <p className="text-caption text-outline font-medium uppercase tracking-wider mb-3">
                    {doc.refNumber}
                  </p>

                  <p className="text-body-md font-body-md text-on-surface-variant line-clamp-2 mb-4 text-xs">
                    {doc.documentTypeSummary}
                  </p>

                  <div className="p-3 bg-surface-container-low rounded-lg space-y-1 mb-4 text-caption">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Claim Stakes:</span>
                      <span className="font-semibold text-primary">{doc.demandAmount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">Recipient:</span>
                      <span className="font-medium text-on-surface truncate max-w-[160px]">
                        {doc.recipient?.company}
                      </span>
                    </div>
                    {doc.caseId && (
                      <div className="flex justify-between pt-1 border-t border-surface-variant/40">
                        <span className="text-on-surface-variant">Linked Case:</span>
                        <span className="font-mono text-[11px] text-primary">
                          #{doc.caseId.replace('matter-', '').toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-surface-variant/40">
                  <Link
                    to={`/documents/${doc.id}`}
                    className="flex-1 py-2.5 bg-primary text-on-primary text-label-md font-label-md rounded-lg hover:bg-primary-container transition-colors text-center font-medium flex items-center justify-center gap-1.5 text-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit_document</span>
                    Open in Editor
                  </Link>

                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="w-10 h-10 rounded-lg border border-outline-variant/60 flex items-center justify-center hover:bg-surface-container transition-colors text-on-surface-variant"
                    title="Export PDF"
                  >
                    <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full bg-surface-container-lowest rounded-2xl p-8 border border-surface-variant text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant">
                <span className="material-symbols-outlined text-[24px]">description</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-on-surface font-semibold">
                No matching legal documents found
              </h3>
              <p className="text-body-md text-on-surface-variant text-sm max-w-sm">
                We couldn't find any documents matching your search query or filter criteria.
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
      </div>
    </div>
  );
}
