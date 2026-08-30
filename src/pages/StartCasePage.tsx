import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { ISSUE_TYPE_LIST, ISSUE_TYPES } from '../data/issueTypes';
import { IssueTypeId } from '../types';

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

    startNewDraft(selectedType, problemSummary.trim(), fileName);
    navigate(`/intake?type=${selectedType}`);
  };

  const getDomainIcon = (id: IssueTypeId) => {
    switch (id) {
      case 'rti': return <FileSearch className="w-5 h-5 text-blue-700" />;
      case 'consumer': return <ShoppingBag className="w-5 h-5 text-emerald-700" />;
      case 'tenant': return <Home className="w-5 h-5 text-amber-700" />;
      case 'workplace': return <Briefcase className="w-5 h-5 text-purple-700" />;
      case 'govt_scheme': return <Landmark className="w-5 h-5 text-cyan-700" />;
      case 'cyber': return <ShieldAlert className="w-5 h-5 text-rose-700" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn text-slate-900">
      {/* Page Heading */}
      <div className="text-center sm:text-left">
        <span className="editorial-pill mb-3">
          <Sparkles className="w-3.5 h-3.5 text-slate-900" />
          <span>Step 1: Statutory Problem Intake</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight mt-1">
          Tell us what happened
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed font-medium">
          Select your grievance category and describe the situation. We'll run a diagnostic assessment to recommend the most effective statutory legal action.
        </p>
      </div>

      <form onSubmit={handleContinue} className="space-y-8">
        {/* Step 1: Issue Type Category Selector */}
        <div className="space-y-3.5">
          <label className="block text-sm font-extrabold text-slate-900">
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
                  className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex items-start gap-3.5 relative ${
                    isSelected
                      ? 'bg-white border-slate-900 shadow-elevated'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 shadow-subtle'
                  }`}
                >
                  <div 
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border"
                    style={{ backgroundColor: `${type.accentColor}18`, borderColor: `${type.accentColor}40` }}
                  >
                    {getDomainIcon(type.id)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-extrabold text-slate-900 truncate">
                        {type.shortName}
                      </h3>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed font-medium">
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
          className="p-5 rounded-3xl bg-pastel-blue-light border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs shadow-subtle"
        >
          <div className="space-y-1">
            <span className="font-extrabold text-slate-500 uppercase tracking-wider text-[10px]">Primary Governing Statute:</span>
            <p className="text-slate-900 font-extrabold flex items-center gap-1.5 text-sm">
              <Scale className="w-4 h-4 text-blue-700" />
              <span>{activeConfig.primaryStatute}</span>
            </p>
          </div>
          <div className="sm:text-right space-y-1 shrink-0">
            <span className="font-extrabold text-slate-500 uppercase tracking-wider text-[10px]">Statutory Timeframe:</span>
            <p className="text-slate-900 font-extrabold flex sm:justify-end items-center gap-1.5 text-sm">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>{activeConfig.statutoryTimeframe}</span>
            </p>
          </div>
        </motion.div>

        {/* Step 2: Problem Description ("Tell us what happened") */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="problemDescription" className="block text-sm font-extrabold text-slate-900">
              2. Describe your situation & grievance
            </label>
            <span className="text-xs text-slate-500 font-medium">Provide dates, amounts, and involved authority</span>
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
            className={`w-full p-4 rounded-3xl border bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 transition-all font-medium ${
              errorMessage
                ? 'border-rose-500 focus:ring-rose-500/20'
                : 'border-slate-200 focus:border-slate-900 focus:ring-slate-900/10'
            }`}
          />

          {errorMessage && (
            <p className="text-xs font-extrabold text-rose-600 flex items-center gap-1 mt-1">
              ⚠️ {errorMessage}
            </p>
          )}

          {/* Quick Sample Prompts for Chosen Issue Type */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Or tap a common sample problem to auto-fill:</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {activeConfig.sampleProblems.map((sample: string, idx: number) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickSampleClick(sample)}
                  className="text-xs px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold transition-all text-left shadow-subtle cursor-pointer"
                >
                  "{sample}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3: Optional Evidence File Upload */}
        <div className="space-y-3">
          <label className="block text-sm font-extrabold text-slate-900">
            3. Upload supporting document / screenshot <span className="text-slate-500 font-normal">(Optional)</span>
          </label>

          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`p-6 sm:p-8 rounded-3xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center relative cursor-pointer ${
              isDragging
                ? 'border-slate-900 bg-slate-100'
                : fileName
                ? 'border-emerald-500 bg-pastel-mint-light'
                : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50'
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
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center border border-emerald-300">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-extrabold text-slate-900">{fileName}</div>
                  <div className="text-xs text-emerald-700 font-bold">Ready to attach</div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFileName('');
                  }}
                  className="p-1 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 ml-3 z-10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mb-3">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div className="text-sm font-extrabold text-slate-900">
                  Drag & drop your notice, invoice, or screenshot here
                </div>
                <div className="text-xs text-slate-500 mt-1 font-medium">
                  Supports PDF, PNG, JPEG, DOCX (Up to 25MB)
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom Navigation CTA */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>RightsTrack ensures confidential diagnostic assistance on your device.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-pill-outline flex-1 sm:flex-none"
            >
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-black py-3 px-6 text-sm flex-1 sm:flex-none"
            >
              <span>Continue to AI Intake</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  );
};


