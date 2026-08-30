import React from 'react';
import { motion } from 'framer-motion';
import { DocumentItem } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { FileText, Eye, Edit3, CheckCircle, Clock, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
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
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40 shadow-glow-emerald">
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            Ready to Serve
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
            Dispatched / Filed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
            <Clock className="w-3 h-3 text-slate-400" />
            Drafting (v{document.version})
          </span>
        );
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`p-5 rounded-2xl bg-slate-900/85 hover:bg-slate-850/90 border border-slate-800/90 hover:border-civic-500/50 shadow-elevated hover:shadow-glow transition-all duration-200 flex flex-col justify-between group backdrop-blur-xl ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <StatusBadge issueType={document.issueType} size="sm" />
          {getStatusBadge()}
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-civic-950 text-civic-400 flex items-center justify-center shrink-0 border border-civic-500/40 shadow-glow">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-civic-300 transition-colors line-clamp-1">
              {document.title}
            </h4>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              Ref: {document.referenceNumber || `#${document.id}`}
            </p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs text-slate-300 line-clamp-3 font-mono leading-relaxed">
          {document.content.slice(0, 160)}...
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[11px] text-slate-500">
          Updated: {new Date(document.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
        </span>

        <Button
          size="sm"
          variant={document.status === 'ready' ? 'primary' : 'outline'}
          onClick={handleAction}
          rightIcon={<Edit3 className="w-3 h-3" />}
          className={document.status === 'ready' ? 'bg-gradient-to-r from-emerald-600 to-teal-600 shadow-glow-emerald' : 'border-slate-700 text-slate-300 hover:text-white'}
        >
          {document.status === 'ready' ? 'Review & Print' : 'Edit Draft'}
        </Button>
      </div>
    </motion.div>
  );
};

