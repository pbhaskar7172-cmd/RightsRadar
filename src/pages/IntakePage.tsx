import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Compass, 
  Check,
  ShieldCheck,
  Zap,
  Scale,
  Clock
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { ISSUE_TYPES } from '../data/issueTypes';
import { IssueTypeId, IntakeQuestion } from '../types';
import { Button } from '../components/common/Button';
import { ProgressIndicator } from '../components/common/ProgressIndicator';

export const IntakePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentDraft, updateDraft, createCaseFromDraft, startNewDraft } = useCivicData();

  const typeParam = (searchParams.get('type') as IssueTypeId) || currentDraft?.issueType || 'rti';
  const issueConfig = ISSUE_TYPES[typeParam];

  // Initialize draft if missing
  useEffect(() => {
    if (!currentDraft) {
      startNewDraft(typeParam, 'Citizen grievance inquiry');
    }
  }, [currentDraft, typeParam, startNewDraft]);

  const questions: IntakeQuestion[] = issueConfig.intakeQuestions;
  const [currentStep, setCurrentStep] = useState(currentDraft?.stepIndex || 0);
  const [answers, setAnswers] = useState<Record<string, string>>(currentDraft?.answers || {});
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [validationError, setValidationError] = useState('');

  const currentQ = questions[currentStep] || questions[0];

  const stepsList = questions.map((q: IntakeQuestion, idx: number) => ({
    id: q.id,
    label: `Q${idx + 1}`,
    sublabel: q.question.slice(0, 20)
  }));

  const handleAnswerChange = (val: string) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: val
    }));
    updateDraft({
      answers: {
        ...answers,
        [currentQ.id]: val
      }
    });
    if (validationError) setValidationError('');
  };

  const handleNext = () => {
    const currentVal = answers[currentQ.id];
    if (currentQ.required && (!currentVal || !currentVal.trim())) {
      setValidationError('Please answer this question to proceed.');
      return;
    }

    if (currentStep < questions.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      updateDraft({ stepIndex: nextStep, answers });
    } else {
      // Finished all questions -> Run AI diagnostic processing animation
      runDiagnosticSimulation();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      updateDraft({ stepIndex: prevStep });
      setValidationError('');
    } else {
      navigate('/start-case');
    }
  };

  const runDiagnosticSimulation = () => {
    setIsProcessing(true);

    const steps = [
      'Scanning statutory legal frameworks...',
      `Analyzing precedents under ${issueConfig.primaryStatute}...`,
      'Evaluating citizen remedies & jurisdiction...',
      'Synthesizing ActionRadar matrix...'
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < steps.length) {
        setProcessingStep(current);
      } else {
        clearInterval(interval);
        // Create case & document in context
        const { newCase } = createCaseFromDraft();
        setTimeout(() => {
          navigate(`/diagnosis?caseId=${newCase.id}`);
        }, 600);
      }
    }, 700);
  };

  if (isProcessing) {
    const processingMessages = [
      'Analyzing statutory provisions & citizen rights...',
      `Checking jurisdictional remedies under ${issueConfig.primaryStatute}...`,
      'Structuring required evidence and statutory timeframes...',
      'Generating your tailored ActionRadar blueprint...'
    ];

    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto text-slate-100">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mb-8"
        >
          {/* Outer Pulse Rings */}
          <div className="w-32 h-32 rounded-full border-4 border-civic-500/30 animate-ping absolute inset-0 opacity-40 shadow-glow" />
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-civic-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-civic-500/40 relative border-2 border-civic-400/40">
            <Compass className="w-14 h-14 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        </motion.div>

        <h2 className="text-xl sm:text-3xl font-extrabold text-white mb-2">
          Running RightsTrack Diagnostics
        </h2>

        <motion.p
          key={processingStep}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs sm:text-sm font-semibold text-civic-300 bg-slate-900 border border-civic-500/40 px-4 py-2.5 rounded-2xl mb-6 inline-block shadow-glow backdrop-blur-xl"
        >
          {processingMessages[processingStep]}
        </motion.p>

        <div className="w-72 bg-slate-950 h-2.5 rounded-full overflow-hidden mx-auto border border-slate-800 p-[1px]">
          <motion.div
            className="bg-gradient-to-r from-civic-500 via-blue-500 to-indigo-500 h-full rounded-full shadow-glow"
            initial={{ width: '15%' }}
            animate={{ width: `${((processingStep + 1) / processingMessages.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn text-slate-100">
      {/* Step Header */}
      <div className="text-center sm:text-left">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-civic-950 text-civic-300 border border-civic-500/40 text-xs font-semibold uppercase tracking-wider shadow-glow">
            <Sparkles className="w-3.5 h-3.5 text-civic-400" />
            <span>Step 2: Interactive Intake ({issueConfig.shortName})</span>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Question {currentStep + 1} of {questions.length}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
          Let's gather the specific legal details
        </h1>
        <p className="text-sm text-slate-300 mt-1 leading-relaxed">
          These answers ensure your draft notices contain strict legal standing and statutory citations under {issueConfig.primaryStatute}.
        </p>
      </div>

      {/* Progress Bar */}
      <ProgressIndicator
        steps={stepsList}
        currentStepIndex={currentStep}
        onStepClick={(idx: number) => setCurrentStep(idx)}
      />

      {/* Question Card */}
      <motion.div
        key={currentQ.id}
        initial={{ opacity: 0, x: 14 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -14 }}
        transition={{ duration: 0.25 }}
        className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 backdrop-blur-xl"
      >
        <div>
          <span className="text-xs font-bold text-civic-400 uppercase tracking-wider">
            Question {currentStep + 1} of {questions.length}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-white mt-1 leading-snug">
            {currentQ.question}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
            {currentQ.helpText}
          </p>
        </div>

        {/* Input Rendering based on Question Type */}
        <div className="space-y-4 pt-2">
          {currentQ.type === 'text' && (
            <input
              type="text"
              value={answers[currentQ.id] || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder={currentQ.placeholder}
              className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder:text-slate-500 focus:border-civic-500 focus:ring-2 focus:ring-civic-500/20 text-sm outline-none transition-all"
              autoFocus
            />
          )}

          {currentQ.type === 'textarea' && (
            <textarea
              rows={4}
              value={answers[currentQ.id] || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder={currentQ.placeholder}
              className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950 text-white placeholder:text-slate-500 focus:border-civic-500 focus:ring-2 focus:ring-civic-500/20 text-sm outline-none transition-all"
              autoFocus
            />
          )}

          {currentQ.type === 'radio' && currentQ.options && (
            <div className="space-y-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.id] === opt.value;
                return (
                  <motion.div
                    key={opt.value}
                    whileHover={{ scale: 1.01, x: 2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleAnswerChange(opt.value)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-civic-950/70 border-civic-500 shadow-glow text-white'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="text-sm font-semibold">{opt.label}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-civic-400 bg-civic-500 shadow-glow' : 'border-slate-700 bg-slate-900'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {currentQ.type === 'select' && currentQ.options && (
            <div className="space-y-2">
              <select
                value={answers[currentQ.id] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="w-full p-4 rounded-xl border border-slate-800 focus:border-civic-500 focus:ring-2 focus:ring-civic-500/20 bg-slate-950 text-white text-sm outline-none transition-all cursor-pointer"
              >
                <option value="" className="bg-slate-900 text-slate-400">-- Please select an option --</option>
                {currentQ.options.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {validationError && (
            <p className="text-xs font-semibold text-rose-400 flex items-center gap-1">
              ⚠️ {validationError}
            </p>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="border-slate-700 text-slate-300 hover:text-white"
          >
            Back
          </Button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleNext}
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-civic-600 via-blue-600 to-indigo-600 hover:from-civic-500 hover:to-indigo-500 text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{currentStep === questions.length - 1 ? 'Analyze & Finish Intake' : 'Save & Continue'}</span>
            {currentStep === questions.length - 1 ? <Sparkles className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

