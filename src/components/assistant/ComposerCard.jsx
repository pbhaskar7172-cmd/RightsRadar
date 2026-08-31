import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpeechRecognition } from '../../hooks/useSpeechRecognition';

const demoScenarios = [
  { label: 'Consumer Dispute', prompt: 'I bought a high-end laptop online for $1,890 that was delivered defective. The merchant is refusing to accept the return or issue a refund within the 30-day window.' },
  { label: 'Cyber Fraud', prompt: 'I noticed an unauthorized electronic debit of $2,450 from my primary bank account. I reported it immediately, but the bank has refused to provide provisional credit.' },
  { label: 'Tenant Dispute', prompt: 'My landlord hasn\'t returned my $3,200 security deposit despite 30 days having passed since I moved out and returned the keys in good condition.' },
  { label: 'Workplace Issue', prompt: 'My previous employer has withheld 2 months of unpaid overtime wages totaling $8,500 following my resignation.' },
  { label: 'Police Complaint', prompt: 'My vehicle was stolen yesterday outside the station. The local police station refused to register a formal FIR and only gave a diary entry.' },
  { label: 'Government / RTI', prompt: 'My passport renewal application has been pending for over 90 days past the statutory timeline with no status or explanation from the department.' },
  { label: 'Insurance Claim', prompt: 'My health insurance claim of $4,500 was arbitrarily repudiated citing pre-existing conditions despite valid medical certificates.' }
];

export default function ComposerCard({ onSubmitPrompt, onListeningChange }) {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const {
    isSupported,
    isListening,
    interimTranscript,
    error: speechError,
    state: speechState,
    startListening,
    stopListening
  } = useSpeechRecognition({
    onTranscriptChange: (newTranscript) => {
      setPrompt(newTranscript);
    }
  });

  useEffect(() => {
    onListeningChange?.(speechState);
  }, [speechState, onListeningChange]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!prompt.trim()) return;
    if (isListening) {
      stopListening();
    }
    if (onSubmitPrompt) {
      onSubmitPrompt(prompt);
    } else {
      navigate('/cases/matter-882-a');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handlePromptClick = (text) => {
    setPrompt(text);
  };

  const toggleRecording = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <div className="mb-stack-md relative">
        <h1 className="text-display-lg font-display-lg text-primary tracking-tight mb-unit">
          What's going on?
        </h1>
        <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">
          Tell me what happened. You don't need to know the legal terms. I'll translate your situation into actionable legal strategy.
        </p>
      </div>

      {/* Composer Card */}
      <div className="relative w-full bg-surface-container-lowest/80 backdrop-blur-xl rounded-xl shadow-xl border border-surface-variant p-stack-sm flex flex-col gap-stack-sm transition-all duration-300 hover:shadow-2xl hover:bg-surface-container-lowest group">
        {/* Animated Concepts (Mock Thinking State) */}
        <div className="absolute -top-4 -right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 pointer-events-none">
          <span className="px-3 py-1 bg-tertiary-container/10 text-on-tertiary-container text-caption font-caption rounded-full backdrop-blur-md border border-tertiary-container/20 shadow-sm animate-pulse">
            Consumer Rights
          </span>
          <span
            className="px-3 py-1 bg-primary-container/10 text-on-primary-container text-caption font-caption rounded-full backdrop-blur-md border border-primary-container/20 shadow-sm animate-pulse"
            style={{ animationDelay: '200ms' }}
          >
            Dispute Resolution
          </span>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-40 bg-transparent resize-none outline-none text-body-lg font-body-lg text-on-surface placeholder:text-outline-variant p-unit"
          placeholder="Describe your problem in your own words... (e.g. 'My landlord hasn't fixed the heating for 3 weeks despite promises.')"
        />

        {/* Composer Actions & Progress */}
        <div className="flex items-center justify-between border-t border-surface-variant/50 pt-stack-sm px-unit">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleRecording}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors group/btn ${
                isListening
                  ? 'bg-[#ef4444] text-white shadow-md animate-pulse'
                  : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
              }`}
              title={
                !isSupported
                  ? "Speech recognition unavailable in this browser"
                  : isListening
                  ? "Listening to your voice... (Click to stop)"
                  : "Dictate with Voice"
              }
            >
              <span className="material-symbols-outlined text-[20px] group-hover/btn:scale-110 transition-transform">
                {isListening ? 'mic' : 'mic_none'}
              </span>
            </button>

            <label className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors group/btn relative cursor-pointer" title="Attach Document or Receipt">
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setPrompt((prev) => `${prev} [Attached: ${e.target.files[0].name}]`);
                  }
                }}
              />
              <span className="material-symbols-outlined text-[20px] group-hover/btn:scale-110 transition-transform">
                attach_file
              </span>
            </label>

            {/* Context / Voice Indicator */}
            <div className="hidden sm:flex items-center gap-2 ml-2 px-3 py-1.5 bg-surface-container rounded-lg border border-outline-variant/30">
              <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-[#ef4444] animate-ping' : 'bg-tertiary'}`}></div>
              <span className="text-caption font-caption text-on-surface-variant">
                {isListening
                  ? interimTranscript ? `"${interimTranscript.slice(0, 30)}..."` : "Listening actively..."
                  : "Speech or text input ready"}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!prompt.trim()}
            className="w-12 h-12 rounded-full bg-primary disabled:opacity-40 flex items-center justify-center text-on-primary shadow-md hover:bg-primary-container hover:shadow-lg transition-all group/send"
            title="Analyze & Start Strategy"
          >
            <span className="material-symbols-outlined text-[20px] group-hover/send:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>

        {/* Speech Error Notice */}
        {speechError && (
          <div className="mx-unit mb-2 p-2.5 bg-error-container/20 text-on-surface border border-error/30 rounded-lg text-caption flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ef4444] text-[18px]">info</span>
            <span>{speechError}</span>
          </div>
        )}
      </div>

      {/* Suggested Demo Scenarios */}
      <div className="mt-stack-md">
        <span className="text-caption font-caption text-on-surface-variant uppercase tracking-wider block mb-2 font-medium">
          Try a scenario:
        </span>
        <div className="flex flex-wrap gap-unit">
          {demoScenarios.map((scenario, idx) => (
            <button
              key={idx}
              onClick={() => handlePromptClick(scenario.prompt)}
              className="px-3.5 py-1.5 bg-surface-container-low text-on-surface-variant text-label-md font-label-md rounded-full border border-surface-variant hover:border-primary/40 hover:text-primary transition-colors text-left text-xs font-medium"
            >
              {scenario.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
