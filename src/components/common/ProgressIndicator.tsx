import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: string;
  label: string;
  sublabel?: string;
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStepIndex: number;
  onStepClick?: (index: number) => void;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  steps,
  currentStepIndex,
  onStepClick,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Step Bar */}
      <div className="hidden sm:flex items-center justify-between relative">
        <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 -z-0" />
        <div 
          className="absolute top-4 left-6 h-0.5 bg-civic-600 -z-0 transition-all duration-300"
          style={{
            width: `${(currentStepIndex / Math.max(1, steps.length - 1)) * 92}%`
          }}
        />
        
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const isClickable = onStepClick && idx <= currentStepIndex;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => isClickable && onStepClick(idx)}
              disabled={!isClickable}
              className={`flex flex-col items-center group relative z-10 focus:outline-none ${!isClickable ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 border-2 ${
                  isCompleted
                    ? 'bg-civic-600 border-civic-600 text-white shadow-sm'
                    : isCurrent
                    ? 'bg-white border-civic-600 text-civic-600 shadow-md ring-4 ring-civic-100 font-bold'
                    : 'bg-white border-slate-300 text-slate-400 group-hover:border-slate-400'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : idx + 1}
              </div>
              
              <span
                className={`mt-2 text-xs font-medium max-w-[100px] text-center leading-tight transition-colors ${
                  isCurrent ? 'text-civic-700 font-semibold' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile Step Bar */}
      <div className="sm:hidden flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold text-slate-800">
            Step {currentStepIndex + 1} of {steps.length}: {steps[currentStepIndex]?.label}
          </span>
          <span>{Math.round(((currentStepIndex + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-civic-600 h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
