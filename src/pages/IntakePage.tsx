import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Compass, 
  Check,
  ShieldCheck,
  Zap,
  Scale,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { ISSUE_TYPES } from '../data/issueTypes';
import { IssueTypeId, IntakeQuestion } from '../types';
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
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto text-slate-900">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mb-8"
        >
          <div className="w-28 h-28 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-elevated relative">
            <Compass className="w-12 h-12 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        </motion.div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mb-2">
          Synthesizing Legal Matrix
        </h2>

        <motion.p
          key={processingStep}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs sm:text-sm font-extrabold text-slate-800 bg-white border border-slate-200 px-5 py-2.5 rounded-full mb-6 inline-block shadow-subtle"
        >
          {processingMessages[processingStep]}
        </motion.p>

        <div className="w-72 bg-slate-200 h-2.5 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="bg-slate-900 h-full rounded-full"
            initial={{ width: '15%' }}
            animate={{ width: `${((processingStep + 1) / processingMessages.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn text-slate-900">
      {/* Step Header */}
      <div className="text-center sm:text-left">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="editorial-pill">
            <Sparkles className="w-3.5 h-3.5 text-slate-900" />
            <span>Step 2: Interactive Intake ({issueConfig.shortName})</span>
          </span>
          <span className="text-xs font-extrabold text-slate-500">
            Question {currentStep + 1} of {questions.length}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight mt-2">
          Let's gather the specific legal details
        </h1>
        <p className="text-sm text-slate-500 mt-1 leading-relaxed font-medium">
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
        className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-card space-y-6"
      >
        <div>
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
            Question {currentStep + 1} of {questions.length}
          </span>
          <h2 className="text-xl font-extrabold text-slate-950 mt-1 leading-snug">
            {currentQ.question}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed font-medium">
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
              className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-slate-900 text-sm outline-none transition-all font-medium"
              autoFocus
            />
          )}

          {currentQ.type === 'textarea' && (
            <textarea
              rows={4}
              value={answers[currentQ.id] || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder={currentQ.placeholder}
              className="w-full p-4 rounded-2xl border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-slate-900 text-sm outline-none transition-all font-medium"
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
                        ? 'bg-slate-900 border-slate-900 text-white shadow-pill'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <span className="text-sm font-bold">{opt.label}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? 'border-white bg-white text-slate-900' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-slate-900" />}
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
                className="w-full p-4 rounded-2xl border border-slate-200 focus:border-slate-900 bg-slate-50 text-slate-900 text-sm outline-none transition-all cursor-pointer font-medium"
              >
                <option value="" className="text-slate-400">-- Please select an option --</option>
                {currentQ.options.map((opt) => (
                  <option key={opt.value} value={opt.value} className="text-slate-900">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {validationError && (
            <p className="text-xs font-extrabold text-rose-600 flex items-center gap-1">
              ⚠️ {validationError}
            </p>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="btn-pill-outline flex items-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={handleNext}
            className="btn-black py-3 px-6 text-sm flex items-center gap-2"
          >
            <span>{currentStep === questions.length - 1 ? 'Analyze & Finish Intake' : 'Save & Continue'}</span>
            {currentStep === questions.length - 1 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};


