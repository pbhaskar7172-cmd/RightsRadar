import React from 'react';
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
    <div className={`p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-civic-300 shadow-subtle hover:shadow-elevated transition-all duration-200 flex flex-col justify-between group ${className}`}>
      <div>
        {/* Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <StatusBadge issueType={source.issueType} size="sm" />
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              {source.sourceType}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            {source.relevanceScore}% Legal Relevance
          </span>
        </div>

        {/* Title */}
        <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-civic-700 transition-colors leading-snug">
          {source.title}
        </h4>

        {/* Authority & Citation */}
        <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-semibold text-slate-700 flex items-center gap-1">
            <Scale className="w-3.5 h-3.5 text-civic-600" />
            {source.authority}
          </span>
          <span>•</span>
          <span className="font-mono text-slate-500">{source.citation}</span>
        </div>

        {/* Summary */}
        <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {source.summary}
        </p>

        {/* Key Takeaways */}
        {source.keyTakeaways && source.keyTakeaways.length > 0 && (
          <div className="mt-4 p-3.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block">
              Key Legal Takeaways:
            </span>
            <ul className="space-y-1">
              {source.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <Check className="w-3.5 h-3.5 text-civic-600 mt-0.5 shrink-0" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 italic">
          Verified Legal Source (Demo Reference)
        </span>

        <div className="flex items-center gap-2">
          {onViewDetails && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewDetails(source)}
            >
              Examine Source
            </Button>
          )}

          <a
            href={source.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-civic-700 hover:text-civic-800 p-2 rounded-lg hover:bg-civic-50 transition-colors"
          >
            <span>Official Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
