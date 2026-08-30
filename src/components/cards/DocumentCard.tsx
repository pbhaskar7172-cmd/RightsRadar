import React from 'react';
import { motion } from 'framer-motion';
import { DocumentItem } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { FileText, Edit3, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DocumentCardProps {
  document: DocumentItem;
  onOpen?: () => void;
  className?: string;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({ document, onOpen, className = '' }) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onOpen) {
      onOpen();
    } else {
      navigate(`/document?docId=${document.id}&caseId=${document.caseId}`);
    }
  };

  const getStatusBadge = () => {
    switch (document.status) {
      case 'ready':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-pastel-mint text-slate-950 border border-emerald-300">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
            Ready to Serve
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-pastel-blue text-slate-950 border border-blue-300">
            Dispatched / Filed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold bg-slate-100 text-slate-700 border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            Drafting (v{document.version})
          </span>
        );
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`p-6 rounded-3xl bg-white border border-slate-200 shadow-card hover:shadow-elevated transition-all duration-200 flex flex-col justify-between group ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <StatusBadge issueType={document.issueType} size="sm" />
          {getStatusBadge()}
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-slate-950 line-clamp-1">
              {document.title}
            </h4>
            <p className="text-xs text-slate-400 mt-0.5 font-mono font-medium">
              Ref: {document.referenceNumber || `#${document.id}`}
            </p>
          </div>
        </div>

        <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 line-clamp-3 font-mono leading-relaxed">
          {document.content.slice(0, 160)}...
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 font-medium">
          Updated: {new Date(document.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
        </span>

        <button
          onClick={handleAction}
          className={document.status === 'ready' ? 'btn-black py-2 px-4 text-xs flex items-center gap-1.5' : 'btn-pill-outline text-xs flex items-center gap-1.5'}
        >
          <span>{document.status === 'ready' ? 'Review & Print' : 'Edit Draft'}</span>
          <Edit3 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
};


