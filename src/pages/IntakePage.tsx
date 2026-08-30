import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Compass, 
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
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative mb-8"
        >
          {/* Outer Pulse Rings */}
          <div className="w-28 h-28 rounded-full border-4 border-civic-200 animate-ping absolute inset-0 opacity-20" />
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-civic-600 to-blue-600 flex items-center justify-center text-white shadow-xl shadow-civic-500/30 relative">
            <Compass className="w-12 h-12 animate-spin" style={{ animationDuration: '4s' }} />
          </div>
        </motion.div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
          Running Civic Diagnostics
        </h2>

        <motion.p
          key={processingStep}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-civic-700 bg-civic-50 border border-civic-200 px-4 py-2 rounded-xl mb-6 inline-block"
        >
          {processingMessages[processingStep]}
        </motion.p>

        <div className="w-64 bg-slate-200 h-2 rounded-full overflow-hidden mx-auto">
          <motion.div
            className="bg-civic-600 h-full rounded-full"
            initial={{ width: '15%' }}
            animate={{ width: `${((processingStep + 1) / processingMessages.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      {/* Step Header */}
      <div className="text-center sm:text-left">
        <div className="flex items-center justify-between gap-4 mb-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-civic-50 text-civic-700 border border-civic-200 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-civic-600" />
            Step 2: Interactive Intake ({issueConfig.shortName})
          </div>
          <span className="text-xs font-semibold text-slate-400">
            Question {currentStep + 1} of {questions.length}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Let's gather the specific details
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          These answers ensure your draft notices contain strict legal standing and statutory references.
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
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -12 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-elevated space-y-6"
      >
        <div>
          <span className="text-xs font-bold text-civic-600 uppercase tracking-wider">
            Question {currentStep + 1}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1 leading-snug">
            {currentQ.question}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
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
              className="w-full p-4 rounded-xl border border-slate-200 focus:border-civic-600 focus:ring-4 focus:ring-civic-100 text-slate-900 text-sm outline-none transition-all"
              autoFocus
            />
          )}

          {currentQ.type === 'textarea' && (
            <textarea
              rows={4}
              value={answers[currentQ.id] || ''}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder={currentQ.placeholder}
              className="w-full p-4 rounded-xl border border-slate-200 focus:border-civic-600 focus:ring-4 focus:ring-civic-100 text-slate-900 text-sm outline-none transition-all"
              autoFocus
            />
          )}

          {currentQ.type === 'radio' && currentQ.options && (
            <div className="space-y-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.id] === opt.value;
                return (
                  <div
                    key={opt.value}
                    onClick={() => handleAnswerChange(opt.value)}
                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-civic-50/70 border-civic-600 shadow-sm'
                        : 'bg-white border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-sm font-medium text-slate-800">{opt.label}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-civic-600 bg-civic-600' : 'border-slate-300 bg-white'
                    }`}>
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {currentQ.type === 'select' && currentQ.options && (
            <div className="space-y-2">
              <select
                value={answers[currentQ.id] || ''}
                onChange={(e) => handleAnswerChange(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-slate-200 focus:border-civic-600 focus:ring-4 focus:ring-civic-100 bg-white text-slate-900 text-sm outline-none transition-all cursor-pointer"
              >
                <option value="">-- Please select an option --</option>
                {currentQ.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {validationError && (
            <p className="text-xs font-semibold text-rose-600 flex items-center gap-1">
              {validationError}
            </p>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            Back
          </Button>

          <Button
            type="button"
            variant="civic-glow"
            size="lg"
            onClick={handleNext}
            rightIcon={currentStep === questions.length - 1 ? <Sparkles className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          >
            {currentStep === questions.length - 1 ? 'Analyze & Finish Intake' : 'Save & Continue'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
