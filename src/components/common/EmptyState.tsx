import React, { ReactNode } from 'react';
import { Button } from './Button';
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
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-slate-900/80 rounded-3xl border border-dashed border-slate-800 backdrop-blur-xl ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-civic-950 flex items-center justify-center text-civic-400 mb-4 shadow-glow border border-civic-500/40">
        <Icon className="w-8 h-8 stroke-[1.75]" />
      </div>
      
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-sm text-slate-400 max-w-sm mt-1 mb-6 leading-relaxed">
        {description}
      </p>

      <div className="flex flex-wrap gap-3 items-center justify-center">
        {actionLabel && onAction && (
          <Button
            onClick={onAction}
            leftIcon={actionIcon}
            variant="civic-glow"
          >
            {actionLabel}
          </Button>
        )}

        {secondaryActionLabel && onSecondaryAction && (
          <Button
            onClick={onSecondaryAction}
            variant="outline"
            className="border-slate-700 text-slate-300 hover:text-white"
          >
            {secondaryActionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

