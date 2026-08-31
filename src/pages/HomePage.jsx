import { Link } from 'react-router-dom';
import ThreeBackground from '../animations/ThreeBackground';
import NarrativeCarousel from '../components/home/NarrativeCarousel';

export default function HomePage() {
  const scrollToAbout = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full relative min-h-[90vh]">
      {/* Full Bleed 3D Scene Background */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
        <ThreeBackground className="absolute inset-0 w-full h-full" />
        {/* Gradient Scrim for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent pointer-events-none"></div>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop w-full relative z-10 flex-grow flex items-center pt-stack-lg pb-stack-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center w-full">
          {/* Typography & CTAs */}
          <div className="col-span-1 lg:col-span-6 flex flex-col gap-stack-md">
            <div className="inline-flex items-center gap-2">
              <span className="text-caption font-caption text-primary uppercase tracking-widest bg-surface-container/50 px-3 py-1 rounded-full backdrop-blur-sm shadow-sm border border-outline-variant/20 font-medium">
                Independent Legal AI
              </span>
            </div>

            <h1 className="text-display-lg font-display-lg text-on-surface tracking-tight leading-tight">
              Tell us what happened. <br />
              <span className="text-surface-tint">
                We'll help you figure out what to do next.
              </span>
            </h1>

            <p className="text-body-lg font-body-lg text-on-surface-variant max-w-lg">
              From everyday disputes to serious incidents, Nyaya AI helps you understand your situation, identify what may apply, prepare documents and take the next step.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <Link
                to="/assistant"
                className="bg-primary text-on-primary px-8 py-4 rounded-xl text-label-md font-label-md shadow-lg shadow-primary/20 hover:-translate-y-1 hover:shadow-xl hover:bg-primary-container transition-all duration-300 flex items-center gap-2 font-medium"
              >
                Start with Nyaya AI
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>

              <button
                onClick={scrollToAbout}
                className="bg-transparent text-primary px-8 py-4 rounded-xl text-label-md font-label-md border border-outline-variant hover:bg-surface-container transition-all duration-300 flex items-center gap-2 font-medium"
              >
                See how it works
              </button>
            </div>

            <div className="flex items-center gap-2 pt-8 text-caption font-caption text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
              Grounded in official and verified sources.
            </div>
          </div>

          {/* Narrative Overlay Panel */}
          <div className="col-span-1 lg:col-span-5 lg:col-start-8 relative mt-8 lg:mt-0">
            <NarrativeCarousel />
          </div>
        </div>
      </div>

      {/* How it works info section for anchors */}
      <section id="about" className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-stack-lg border-t border-surface-variant/40 w-full">
        <div className="text-center max-w-2xl mx-auto mb-stack-lg">
          <span className="text-caption font-caption text-primary uppercase tracking-widest bg-surface-container/50 px-3 py-1 rounded-full border border-outline-variant/20">
            Judicial Clarity
          </span>
          <h2 className="text-display-md font-display-md text-primary mt-4 mb-2">
            How Nyaya AI Empowers You
          </h2>
          <p className="text-body-md font-body-md text-on-surface-variant">
            A seamless pathway from uncertainty to prepared legal documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <Link
            to="/assistant"
            className="bg-surface-container-lowest/90 backdrop-blur-md p-stack-md rounded-2xl border border-surface-variant/60 shadow-sm hover:shadow-md hover:border-primary/40 transition-all block group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">chat</span>
            </div>
            <h3 className="font-title-lg text-title-lg text-on-surface mb-2 font-semibold group-hover:text-primary transition-colors">
              1. Describe Plainly
            </h3>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Explain in your own words. Nyaya extracts relevant facts without complex legal jargon.
            </p>
          </Link>

          <Link
            to="/documents"
            className="bg-surface-container-lowest/90 backdrop-blur-md p-stack-md rounded-2xl border border-surface-variant/60 shadow-sm hover:shadow-md hover:border-primary/40 transition-all block group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">auto_fix_high</span>
            </div>
            <h3 className="font-title-lg text-title-lg text-on-surface mb-2 font-semibold group-hover:text-primary transition-colors">
              2. AI Diagnosis & Drafting
            </h3>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Generate formal demand notices, complaint petitions, and dispute letters formatted to statutory standards.
            </p>
          </Link>

          <Link
            to="/action-radar"
            className="bg-surface-container-lowest/90 backdrop-blur-md p-stack-md rounded-2xl border border-surface-variant/60 shadow-sm hover:shadow-md hover:border-primary/40 transition-all block group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[24px]">radar</span>
            </div>
            <h3 className="font-title-lg text-title-lg text-on-surface mb-2 font-semibold group-hover:text-primary transition-colors">
              3. ActionRadar Tracking
            </h3>
            <p className="text-body-md font-body-md text-on-surface-variant">
              Never miss a limitation period or filing deadline with real-time statutory urgency tracking.
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
