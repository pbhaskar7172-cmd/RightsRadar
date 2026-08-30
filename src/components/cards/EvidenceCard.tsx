import React from 'react';
import { EvidenceItem } from '../../types';
import { 
  FileText, 
  Image as ImageIcon, 
  Film, 
  FileCheck, 
  Trash2, 
  Eye, 
  Download, 
  Paperclip,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../common/Button';

interface EvidenceCardProps {
  evidence: EvidenceItem;
  onDelete?: (id: string) => void;
  onPreview?: (evidence: EvidenceItem) => void;
  className?: string;
}

export const EvidenceCard: React.FC<EvidenceCardProps> = ({
  evidence,
  onDelete,
  onPreview,
  className = '',
}) => {
  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'proof_of_payment': return 'Proof of Payment';
      case 'written_notice': return 'Written Notice';
      case 'agreement_contract': return 'Agreement / Contract';
      case 'email_chat': return 'Email / Chat Record';
      case 'id_proof': return 'Identity Document';
      default: return 'Supporting Proof';
    }
  };

  const getFileIcon = (type: string) => {
    if (type.includes('PDF') || type.includes('Document')) return <FileText className="w-5 h-5 text-red-500" />;
    if (type.includes('Image') || type.includes('JPEG') || type.includes('PNG')) return <ImageIcon className="w-5 h-5 text-blue-500" />;
    if (type.includes('Video')) return <Film className="w-5 h-5 text-purple-500" />;
    return <Paperclip className="w-5 h-5 text-slate-500" />;
  };

  return (
    <div className={`p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-subtle flex flex-col justify-between group transition-all duration-200 ${className}`}>
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
              {getFileIcon(evidence.fileType)}
            </div>

            <div className="min-w-0">
              <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-civic-700 transition-colors" title={evidence.name}>
                {evidence.name}
              </h4>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5 font-medium">
                <span>{evidence.size}</span>
                <span>•</span>
                <span>{evidence.fileType}</span>
              </div>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Verified
          </span>
        </div>

        {/* Category tag */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200/70">
            {getCategoryLabel(evidence.category)}
          </span>
          <span className="text-[11px] text-slate-400">
            Uploaded {evidence.uploadDate}
          </span>
        </div>

        {evidence.notes && (
          <p className="mt-2.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
            {evidence.notes}
          </p>
        )}
      </div>

      {/* Action footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onPreview && onPreview(evidence)}
          leftIcon={<Eye className="w-3.5 h-3.5" />}
          className="text-xs text-slate-600 hover:text-slate-900"
        >
          Inspect
        </Button>

        {onDelete && (
          <button
            onClick={() => onDelete(evidence.id)}
            className="text-xs text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors flex items-center gap-1"
            title="Delete evidence"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        )}
      </div>
    </div>
  );
};
