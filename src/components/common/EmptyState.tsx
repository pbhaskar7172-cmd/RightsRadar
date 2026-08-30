import React, { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  actionIcon?: ReactNode;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  actionIcon,
  secondaryActionLabel,
  onSecondaryAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-3xl border border-dashed border-slate-300 shadow-subtle ${className}`}>
      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 mb-4 border border-slate-200 shadow-subtle">
        <Icon className="w-8 h-8 stroke-[1.75]" />
      </div>
      
      <h3 className="text-lg font-black text-slate-950">{title}</h3>
      <p className="text-sm text-slate-500 max-w-sm mt-1 mb-6 leading-relaxed font-medium">
        {description}
      </p>

      <div className="flex flex-wrap gap-3 items-center justify-center">
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="btn-black text-xs flex items-center gap-1.5"
          >
            {actionIcon}
            <span>{actionLabel}</span>
          </button>
        )}

        {secondaryActionLabel && onSecondaryAction && (
          <button
            onClick={onSecondaryAction}
            className="btn-pill-outline text-xs"
          >
            {secondaryActionLabel}
          </button>
        )}
      </div>
    </div>
  );
};


