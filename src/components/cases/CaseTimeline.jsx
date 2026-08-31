export default function CaseTimeline({ steps = [] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="mt-stack-md pt-stack-md border-t border-outline-variant/30 hidden md:block">
      <h4 className="font-label-md text-label-md text-on-surface-variant mb-stack-sm">
        Case Progress
      </h4>
      <div className="flex items-center w-full relative">
        {/* Background Track Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-surface-variant"></div>
        {/* Active Progress Line */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[60%] h-0.5 bg-primary"></div>

        <div className="flex justify-between w-full relative z-10">
          {steps.map((step, idx) => {
            if (step.status === 'completed') {
              return (
                <div key={idx} className="flex flex-col items-center gap-unit">
                  <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center shadow-[0_0_0_4px_rgba(255,248,243,1)]">
                    <span className="material-symbols-outlined text-[10px] text-on-primary">
                      check
                    </span>
                  </div>
                  <span className="font-caption text-caption text-on-surface-variant">
                    {step.name}
                  </span>
                </div>
              );
            }

            if (step.status === 'current') {
              return (
                <div key={idx} className="flex flex-col items-center gap-unit">
                  <div className="w-4 h-4 rounded-full bg-surface shadow-[0_0_0_2px_rgba(0,9,25,1)] flex items-center justify-center shadow-[0_0_0_4px_rgba(255,248,243,1)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  </div>
                  <span className="font-caption text-caption text-primary font-semibold">
                    {step.name}
                  </span>
                </div>
              );
            }

            return (
              <div key={idx} className="flex flex-col items-center gap-unit opacity-50">
                <div className="w-4 h-4 rounded-full bg-surface-variant shadow-[0_0_0_4px_rgba(255,248,243,1)]"></div>
                <span className="font-caption text-caption text-on-surface-variant">
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
