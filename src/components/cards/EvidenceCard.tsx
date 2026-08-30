import React from 'react';
import { motion } from 'framer-motion';
import { EvidenceItem } from '../../types';
import { 
  FileText, 
  Image as ImageIcon, 
  Film, 
  Trash2, 
  Eye, 
  Paperclip,
  CheckCircle2
} from 'lucide-react';

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
    if (type.includes('PDF') || type.includes('Document')) return <FileText className="w-5 h-5 text-rose-600" />;
    if (type.includes('Image') || type.includes('JPEG') || type.includes('PNG')) return <ImageIcon className="w-5 h-5 text-blue-600" />;
    if (type.includes('Video')) return <Film className="w-5 h-5 text-purple-600" />;
    return <Paperclip className="w-5 h-5 text-slate-700" />;
  };

  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`p-6 rounded-3xl bg-white border border-slate-200 shadow-card hover:shadow-elevated flex flex-col justify-between group transition-all duration-200 ${className}`}
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
              {getFileIcon(evidence.fileType)}
            </div>

            <div className="min-w-0">
              <h4 className="text-sm font-extrabold text-slate-950 truncate" title={evidence.name}>
                {evidence.name}
              </h4>
              <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5 font-medium">
                <span>{evidence.size}</span>
                <span>•</span>
                <span>{evidence.fileType}</span>
              </div>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-slate-950 bg-pastel-mint px-2.5 py-0.5 rounded-full border border-emerald-300 shrink-0">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            Verified
          </span>
        </div>

        {/* Category tag */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {getCategoryLabel(evidence.category)}
          </span>
          <span className="text-[11px] text-slate-400 font-medium">
            Uploaded {evidence.uploadDate}
          </span>
        </div>

        {evidence.notes && (
          <p className="mt-3 text-xs text-slate-700 bg-slate-50 p-3 rounded-2xl border border-slate-200/80 leading-relaxed font-medium">
            {evidence.notes}
          </p>
        )}
      </div>

      {/* Action footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => onPreview && onPreview(evidence)}
          className="btn-pill-outline text-xs flex items-center gap-1"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Inspect</span>
        </button>

        {onDelete && (
          <button
            onClick={() => onDelete(evidence.id)}
            className="text-xs text-slate-400 hover:text-rose-600 p-1.5 rounded-full hover:bg-rose-50 transition-colors flex items-center gap-1 font-extrabold cursor-pointer"
            title="Delete evidence"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};


