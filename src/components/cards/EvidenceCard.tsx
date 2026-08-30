import React from 'react';
import { motion } from 'framer-motion';
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
    if (type.includes('PDF') || type.includes('Document')) return <FileText className="w-5 h-5 text-rose-400" />;
    if (type.includes('Image') || type.includes('JPEG') || type.includes('PNG')) return <ImageIcon className="w-5 h-5 text-blue-400" />;
    if (type.includes('Video')) return <Film className="w-5 h-5 text-purple-400" />;
    return <Paperclip className="w-5 h-5 text-slate-400" />;
  };

  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`p-4 rounded-2xl bg-slate-900/85 hover:bg-slate-850/90 border border-slate-800/90 hover:border-civic-500/50 shadow-elevated hover:shadow-glow flex flex-col justify-between group transition-all duration-200 backdrop-blur-xl ${className}`}
    >
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0">
              {getFileIcon(evidence.fileType)}
            </div>

            <div className="min-w-0">
              <h4 className="text-sm font-bold text-white truncate group-hover:text-civic-300 transition-colors" title={evidence.name}>
                {evidence.name}
              </h4>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5 font-medium">
                <span>{evidence.size}</span>
                <span>•</span>
                <span>{evidence.fileType}</span>
              </div>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40 shrink-0 shadow-glow-emerald">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Verified
          </span>
        </div>

        {/* Category tag */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 border border-slate-800">
            {getCategoryLabel(evidence.category)}
          </span>
          <span className="text-[11px] text-slate-500">
            Uploaded {evidence.uploadDate}
          </span>
        </div>

        {evidence.notes && (
          <p className="mt-2.5 text-xs text-slate-300 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 leading-relaxed">
            {evidence.notes}
          </p>
        )}
      </div>

      {/* Action footer */}
      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => onPreview && onPreview(evidence)}
          leftIcon={<Eye className="w-3.5 h-3.5" />}
          className="text-xs text-slate-300 hover:text-white hover:bg-slate-800"
        >
          Inspect
        </Button>

        {onDelete && (
          <button
            onClick={() => onDelete(evidence.id)}
            className="text-xs text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-colors flex items-center gap-1"
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

