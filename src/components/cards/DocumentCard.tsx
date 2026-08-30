import React from 'react';
import { DocumentItem } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { FileText, Eye, Edit3, CheckCircle, Clock } from 'lucide-react';
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
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            Ready to Serve
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200">
            Dispatched / Filed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            <Clock className="w-3 h-3 text-slate-400" />
            Drafting (v{document.version})
          </span>
        );
    }
  };

  return (
    <div className={`p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-civic-300 shadow-subtle hover:shadow-elevated transition-all duration-200 flex flex-col justify-between group ${className}`}>
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <StatusBadge issueType={document.issueType} size="sm" />
          {getStatusBadge()}
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-civic-50 text-civic-600 flex items-center justify-center shrink-0 border border-civic-100">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-civic-700 transition-colors line-clamp-1">
              {document.title}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5 font-mono">
              Ref: {document.referenceNumber || `#${document.id}`}
            </p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 line-clamp-3 font-mono leading-relaxed">
          {document.content.slice(0, 160)}...
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">
          Updated: {new Date(document.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
        </span>

        <Button
          size="sm"
          variant={document.status === 'ready' ? 'primary' : 'outline'}
          onClick={handleAction}
          rightIcon={<Edit3 className="w-3 h-3" />}
        >
          {document.status === 'ready' ? 'Review & Print' : 'Edit Draft'}
        </Button>
      </div>
    </div>
  );
};
