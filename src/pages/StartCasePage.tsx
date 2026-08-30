import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  UploadCloud, 
  FileText, 
  Sparkles, 
  Check, 
  X, 
  FileSearch,
  ShoppingBag,
  Home,
  Briefcase,
  Landmark,
  ShieldAlert,
  ShieldCheck,
  Clock,
  Scale,
  Zap
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { ISSUE_TYPE_LIST, ISSUE_TYPES } from '../data/issueTypes';
import { IssueTypeId } from '../types';
import { Button } from '../components/common/Button';

export const StartCasePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { startNewDraft, currentDraft } = useCivicData();

  const initialType = (searchParams.get('type') as IssueTypeId) || currentDraft?.issueType || 'rti';
  
  const [selectedType, setSelectedType] = useState<IssueTypeId>(initialType);
  const [problemSummary, setProblemSummary] = useState(currentDraft?.problemSummary || '');
  const [fileName, setFileName] = useState(currentDraft?.optionalFileName || '');
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const typeParam = searchParams.get('type') as IssueTypeId;
    if (typeParam && ISSUE_TYPES[typeParam]) {
      setSelectedType(typeParam);
    }
  }, [searchParams]);

  const activeConfig = ISSUE_TYPES[selectedType];

  const handleQuickSampleClick = (sampleText: string) => {
    setProblemSummary(sampleText);
    setErrorMessage('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemSummary.trim()) {
      setErrorMessage('Please describe the problem you are experiencing before proceeding.');
      return;
    }

    // Initialize the draft in context
    startNewDraft(selectedType, problemSummary.trim(), fileName);
    navigate(`/intake?type=${selectedType}`);
  };

  const getDomainIcon = (id: IssueTypeId) => {
    switch (id) {
      case 'rti': return <FileSearch className="w-6 h-6 text-blue-400" />;
      case 'consumer': return <ShoppingBag className="w-6 h-6 text-emerald-400" />;
      case 'tenant': return <Home className="w-6 h-6 text-amber-400" />;
      case 'workplace': return <Briefcase className="w-6 h-6 text-purple-400" />;
      case 'govt_scheme': return <Landmark className="w-6 h-6 text-cyan-400" />;
      case 'cyber': return <ShieldAlert className="w-6 h-6 text-rose-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn text-slate-100">
      {/* Page Heading */}
      <div className="text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-civic-950 text-civic-300 border border-civic-500/40 text-xs font-semibold uppercase tracking-wider mb-3 shadow-glow">
          <Sparkles className="w-3.5 h-3.5 text-civic-400 animate-pulse" />
          <span>Step 1: Statutory Problem Intake</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Tell us what happened
        </h1>
        <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Select your grievance category and describe the situation. We'll run a diagnostic assessment to recommend the most effective statutory legal action.
        </p>
      </div>

      <form onSubmit={handleContinue} className="space-y-8">
        {/* Step 1: Issue Type Category Selector */}
        <div className="space-y-3.5">
          <label className="block text-sm font-bold text-slate-200">
            1. Select Grievance Category
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {ISSUE_TYPE_LIST.map((type) => {
              const isSelected = selectedType === type.id;
              return (
                <motion.div
                  key={type.id}
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedType(type.id);
                    setErrorMessage('');
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 relative backdrop-blur-xl ${
                    isSelected
                      ? 'bg-slate-900 border-civic-500 shadow-glow ring-2 ring-civic-500/20'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 shadow-elevated'
                  }`}
                >
                  <div 
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{ backgroundColor: `${type.accentColor}18`, borderColor: `${type.accentColor}40` }}
                  >
                    {getDomainIcon(type.id)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white truncate">
                        {type.shortName}
                      </h3>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-civic-500 text-white flex items-center justify-center shadow-glow">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                      {type.tagline}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Category Callout */}
        <motion.div
          key={selectedType}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs backdrop-blur-xl shadow-elevated"
        >
          <div className="space-y-1">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Primary Governing Statute:</span>
            <p className="text-slate-100 font-semibold flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-civic-400" />
              <span>{activeConfig.primaryStatute}</span>
            </p>
          </div>
          <div className="sm:text-right space-y-1 shrink-0">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Statutory Timeframe:</span>
            <p className="text-amber-300 font-bold flex sm:justify-end items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeConfig.statutoryTimeframe}</span>
            </p>
          </div>
        </motion.div>

        {/* Step 2: Problem Description ("Tell us what happened") */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="problemDescription" className="block text-sm font-bold text-slate-200">
              2. Describe your situation & grievance
            </label>
            <span className="text-xs text-slate-500">Provide dates, amounts, and involved authority</span>
          </div>

          <textarea
            id="problemDescription"
            rows={5}
            value={problemSummary}
            onChange={(e) => {
              setProblemSummary(e.target.value);
              if (errorMessage) setErrorMessage('');
            }}
            placeholder={`Tell us what happened in plain words. For example: "I applied for a refund on 12 August, but the company rejected my warranty claim..."`}
            className={`w-full p-4 rounded-2xl border bg-slate-950/80 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 transition-all backdrop-blur-xl ${
              errorMessage
                ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
                : 'border-slate-800 focus:border-civic-500 focus:ring-civic-500/20'
            }`}
          />

          {errorMessage && (
            <p className="text-xs font-semibold text-rose-400 flex items-center gap-1 mt-1">
              ⚠️ {errorMessage}
            </p>
          )}

          {/* Quick Sample Prompts for Chosen Issue Type */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Or tap a common sample problem to auto-fill:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {activeConfig.sampleProblems.map((sample: string, idx: number) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickSampleClick(sample)}
                  className="text-xs px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-civic-500/50 transition-all text-left shadow-xs"
                >
                  "{sample}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3: Optional Evidence File Upload */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-200">
            3. Upload supporting document / screenshot <span className="text-slate-500 font-normal">(Optional)</span>
          </label>

          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center relative cursor-pointer backdrop-blur-xl ${
              isDragging
                ? 'border-civic-500 bg-civic-950/40'
                : fileName
                ? 'border-emerald-500/60 bg-emerald-950/20'
                : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900/80'
            }`}
          >
            <input
              type="file"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Upload supporting document"
            />

            {fileName ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-500/40 shadow-glow-emerald">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white">{fileName}</div>
                  <div className="text-xs text-emerald-400 font-medium">Ready to attach</div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFileName('');
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 ml-3 z-10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-civic-950 text-civic-400 flex items-center justify-center mb-3 border border-civic-500/40 shadow-glow">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div className="text-sm font-semibold text-white">
                  Drag & drop your notice, invoice, or screenshot here
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Supports PDF, PNG, JPEG, DOCX (Up to 25MB)
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom Navigation CTA */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>CivicGuide ensures confidential diagnostic assistance on your device.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
              className="flex-1 sm:flex-none border-slate-700 text-slate-300 hover:text-white"
            >
              Cancel
            </Button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-civic-600 via-blue-600 to-indigo-600 hover:from-civic-500 hover:to-indigo-500 text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2 cursor-pointer flex-1 sm:flex-none"
            >
              <span>Continue to AI Intake</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
};

