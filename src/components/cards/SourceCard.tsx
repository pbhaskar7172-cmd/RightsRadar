import React from 'react';
import { motion } from 'framer-motion';
import { SourceItem } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { BookOpen, ExternalLink, ShieldCheck, Scale, Check } from 'lucide-react';
import { Button } from '../common/Button';

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
      className={`p-5 sm:p-6 rounded-2xl bg-slate-900/85 hover:bg-slate-850/90 border border-slate-800/90 hover:border-civic-500/50 shadow-elevated hover:shadow-glow transition-all duration-200 flex flex-col justify-between group backdrop-blur-xl ${className}`}
    >
      <div>
        {/* Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <StatusBadge issueType={source.issueType} size="sm" />
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-800">
              {source.sourceType}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/40 shadow-glow-emerald">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            {source.relevanceScore}% Legal Relevance
          </span>
        </div>

        {/* Title */}
        <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-civic-300 transition-colors leading-snug">
          {source.title}
        </h4>

        {/* Authority & Citation */}
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span className="font-semibold text-slate-200 flex items-center gap-1">
            <Scale className="w-3.5 h-3.5 text-civic-400" />
            {source.authority}
          </span>
          <span>•</span>
          <span className="font-mono text-slate-400">{source.citation}</span>
        </div>

        {/* Summary */}
        <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
          {source.summary}
        </p>

        {/* Key Takeaways */}
        {source.keyTakeaways && source.keyTakeaways.length > 0 && (
          <div className="mt-4 p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Key Legal Takeaways:
            </span>
            <ul className="space-y-1">
              {source.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 text-civic-400 mt-0.5 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 italic">
          Verified Legal Source
        </span>

        <div className="flex items-center gap-2">
          {onViewDetails && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewDetails(source)}
              className="border-slate-700 text-slate-300 hover:text-white"
            >
              Examine Source
            </Button>
          )}

          <a
            href={source.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-civic-400 hover:text-civic-300 p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <span>Official Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

