import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NarrativeCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalScenes = 7;
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalScenes);
    }, 4000);
    return () => clearInterval(timer);
  }, [totalScenes]);

  return (
    <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[3/4] bg-surface/80 backdrop-blur-xl rounded-[2rem] shadow-2xl shadow-primary/5 border border-white/50 p-8 flex flex-col overflow-hidden group">
      {/* Subtle decorative glow elements */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-tertiary-fixed-dim/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex-grow flex flex-col justify-center relative z-10 space-y-stack-sm min-h-[300px]" id="narrative-carousel">
        {/* Scene 1: Understand */}
        <div
          onClick={() => navigate('/assistant')}
          className={`narrative-scene flex flex-col gap-4 transition-all duration-500 ease-in-out absolute inset-0 justify-center px-4 cursor-pointer ${
            currentIndex === 0
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
          data-index="0"
        >
          <span className="text-caption font-caption text-primary tracking-wider uppercase font-semibold">
            01. Understand
          </span>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface-variant relative hover:border-primary/40 transition-colors">
            <p className="text-body-md font-body-md text-on-surface">
              "I don't know what I should do..."
            </p>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-primary rounded-full animate-ping opacity-75"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-primary rounded-full"></div>
          </div>
        </div>

        {/* Scene 2: Diagnose */}
        <div
          onClick={() => navigate('/assistant')}
          className={`narrative-scene flex flex-col gap-4 transition-all duration-500 ease-in-out absolute inset-0 justify-center px-4 cursor-pointer ${
            currentIndex === 1
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
          data-index="1"
        >
          <span className="text-caption font-caption text-primary tracking-wider uppercase font-semibold">
            02. Diagnose
          </span>
          <div className="flex flex-wrap gap-2">
            <span className="bg-primary-fixed text-on-primary-fixed px-4 py-2 rounded-lg text-label-md font-label-md hover:opacity-90">
              Consumer
            </span>
            <span className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg text-label-md font-label-md hover:opacity-90">
              Cyber
            </span>
            <span className="bg-surface-variant text-on-surface px-4 py-2 rounded-lg text-label-md font-label-md hover:opacity-90">
              Tenant
            </span>
          </div>
        </div>

        {/* Scene 3: Collect */}
        <div
          onClick={() => navigate('/cases/matter-882-a')}
          className={`narrative-scene flex flex-col gap-4 transition-all duration-500 ease-in-out absolute inset-0 justify-center px-4 cursor-pointer ${
            currentIndex === 2
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
          data-index="2"
        >
          <span className="text-caption font-caption text-primary tracking-wider uppercase font-semibold">
            03. Collect
          </span>
          <div className="bg-white p-4 rounded-xl border border-surface-variant space-y-3 hover:border-primary/40 transition-colors">
            <div className="h-8 bg-surface-container rounded w-full"></div>
            <div className="h-8 bg-surface-container rounded w-3/4"></div>
            <div className="h-24 bg-surface-container rounded w-full mt-2"></div>
          </div>
        </div>

        {/* Scene 4: Guide */}
        <div
          onClick={() => navigate('/assistant')}
          className={`narrative-scene flex flex-col gap-4 transition-all duration-500 ease-in-out absolute inset-0 justify-center px-4 cursor-pointer ${
            currentIndex === 3
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
          data-index="3"
        >
          <span className="text-caption font-caption text-primary tracking-wider uppercase font-semibold">
            04. Guide
          </span>
          <div className="bg-surface-container-low p-6 rounded-2xl border-l-4 border-primary hover:border-primary/60 transition-colors">
            <h4 className="text-title-lg font-title-lg text-on-surface mb-2">
              Relevant Rules
            </h4>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Based on your details, the following authorities may apply.
            </p>
          </div>
        </div>

        {/* Scene 5: Draft */}
        <div
          onClick={() => navigate('/documents/legal-notice-draft-894')}
          className={`narrative-scene flex flex-col gap-4 transition-all duration-500 ease-in-out absolute inset-0 justify-center px-4 cursor-pointer ${
            currentIndex === 4
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
          data-index="4"
        >
          <span className="text-caption font-caption text-primary tracking-wider uppercase font-semibold">
            05. Draft
          </span>
          <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4 hover:border-primary/40 border border-transparent transition-colors">
            <span className="material-symbols-outlined text-[32px] text-surface-tint">
              description
            </span>
            <div>
              <div className="text-label-md font-label-md text-on-surface font-semibold">
                Notice_Draft.pdf
              </div>
              <div className="text-caption font-caption text-on-surface-variant">
                Assembling document...
              </div>
            </div>
          </div>
        </div>

        {/* Scene 6: Track */}
        <div
          onClick={() => navigate('/cases/matter-904-b')}
          className={`narrative-scene flex flex-col gap-4 transition-all duration-500 ease-in-out absolute inset-0 justify-center px-4 cursor-pointer ${
            currentIndex === 5
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
          data-index="5"
        >
          <span className="text-caption font-caption text-primary tracking-wider uppercase font-semibold">
            06. Track
          </span>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <div className="h-2 bg-primary/20 rounded w-24"></div>
            </div>
            <div className="w-px h-6 bg-outline-variant ml-[5px]"></div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full border-2 border-outline"></div>
              <div className="h-2 bg-outline-variant rounded w-32"></div>
            </div>
          </div>
        </div>

        {/* Scene 7: ActionRadar */}
        <div
          onClick={() => navigate('/action-radar')}
          className={`narrative-scene flex flex-col gap-4 transition-all duration-500 ease-in-out absolute inset-0 justify-center px-4 cursor-pointer ${
            currentIndex === 6
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
          data-index="6"
        >
          <span className="text-caption font-caption text-primary tracking-wider uppercase font-semibold">
            07. ActionRadar
          </span>
          <div className="bg-error-container text-on-error-container p-4 rounded-xl flex items-start gap-3 hover:bg-error-container/80 transition-colors">
            <span className="material-symbols-outlined text-[#ba1a1a]">warning</span>
            <p className="text-label-md font-label-md mt-1">
              Something needs your attention.
            </p>
          </div>
        </div>
      </div>

      {/* Carousel Progress Indicators */}
      <div className="absolute bottom-8 left-8 right-8 flex gap-2 z-20">
        {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              currentIndex === idx ? 'bg-primary' : 'bg-outline-variant/30 hover:bg-outline-variant/60'
            }`}
            aria-label={`Jump to scene ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
