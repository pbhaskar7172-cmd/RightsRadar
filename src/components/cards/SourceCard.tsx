import React from 'react';
import { motion } from 'framer-motion';
import { SourceItem } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { ExternalLink, ShieldCheck, Scale, Check } from 'lucide-react';

interface SourceCardProps {
  source: SourceItem;
  onViewDetails?: (source: SourceItem) => void;
  className?: string;
}

export const SourceCard: React.FC<SourceCardProps> = ({
  source,
  onViewDetails,
  className = '',
}) => {
  return (
    <motion.div 
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`p-6 rounded-3xl bg-white border border-slate-200 shadow-card hover:shadow-elevated transition-all duration-200 flex flex-col justify-between group ${className}`}
    >
      <div>
        {/* Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <StatusBadge issueType={source.issueType} size="sm" />
            <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {source.sourceType}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-extrabold text-slate-900 bg-pastel-mint px-2.5 py-0.5 rounded-full border border-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            {source.relevanceScore}% Legal Relevance
          </span>
        </div>

        {/* Title */}
        <h4 className="text-lg font-black text-slate-950 leading-snug">
          {source.title}
        </h4>

        {/* Authority & Citation */}
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="font-bold text-slate-800 flex items-center gap-1">
            <Scale className="w-3.5 h-3.5 text-slate-700" />
            {source.authority}
          </span>
          <span>•</span>
          <span className="font-mono text-slate-500 font-bold">{source.citation}</span>
        </div>

        {/* Summary */}
        <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
          {source.summary}
        </p>

        {/* Key Takeaways */}
        {source.keyTakeaways && source.keyTakeaways.length > 0 && (
          <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Key Legal Takeaways:
            </span>
            <ul className="space-y-1">
              {source.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                  <Check className="w-3.5 h-3.5 text-slate-900 mt-0.5 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 italic font-medium">
          Verified Legal Source
        </span>

        <div className="flex items-center gap-2">
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(source)}
              className="btn-pill-outline text-xs"
            >
              Examine Source
            </button>
          )}

          <a
            href={source.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <span>Official Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};


