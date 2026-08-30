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
  ShieldCheck
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
      case 'rti': return <FileSearch className="w-5 h-5 text-blue-600" />;
      case 'consumer': return <ShoppingBag className="w-5 h-5 text-emerald-600" />;
      case 'tenant': return <Home className="w-5 h-5 text-amber-600" />;
      case 'workplace': return <Briefcase className="w-5 h-5 text-purple-600" />;
      case 'govt_scheme': return <Landmark className="w-5 h-5 text-cyan-600" />;
      case 'cyber': return <ShieldAlert className="w-5 h-5 text-rose-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Page Heading */}
      <div className="text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-civic-50 text-civic-700 border border-civic-200 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-civic-600" />
          Step 1: Problem Intake
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Tell us what happened
        </h1>
        <p className="text-sm text-slate-500 mt-1 max-w-2xl">
          Select your issue domain and describe the situation. We'll run a diagnostic assessment to recommend the most effective statutory legal action.
        </p>
      </div>

      <form onSubmit={handleContinue} className="space-y-8">
        {/* Step 1: Issue Type Category Selector */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-800">
            1. Select Issue Category
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {ISSUE_TYPE_LIST.map((type) => {
              const isSelected = selectedType === type.id;
              return (
                <div
                  key={type.id}
                  onClick={() => {
                    setSelectedType(type.id);
                    setErrorMessage('');
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 relative ${
                    isSelected
                      ? 'bg-civic-50/50 border-civic-600 shadow-md ring-2 ring-civic-100'
                      : 'bg-white border-slate-200/80 hover:border-slate-300 shadow-subtle'
                  }`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${
                    isSelected ? 'bg-white border-civic-200 shadow-xs' : 'bg-slate-50 border-slate-100'
                  }`}>
                    {getDomainIcon(type.id)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 truncate">
                        {type.shortName}
                      </h3>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-civic-600 text-white flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 leading-relaxed">
                      {type.tagline}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dynamic Category Callout */}
        <motion.div
          key={selectedType}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
        >
          <div className="space-y-1">
            <span className="font-bold text-slate-800">Primary Governing Law:</span>
            <p className="text-slate-600">{activeConfig.primaryStatute}</p>
          </div>
          <div className="sm:text-right space-y-1 shrink-0">
            <span className="font-bold text-slate-800">Statutory Window:</span>
            <p className="text-civic-700 font-semibold">{activeConfig.statutoryTimeframe}</p>
          </div>
        </motion.div>

        {/* Step 2: Problem Description ("Tell us what happened") */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="problemDescription" className="block text-sm font-bold text-slate-800">
              2. Describe your situation & grievance
            </label>
            <span className="text-xs text-slate-400">Be as descriptive as possible</span>
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
            className={`w-full p-4 rounded-2xl border bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-4 transition-all ${
              errorMessage
                ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-100'
                : 'border-slate-200 focus:border-civic-600 focus:ring-civic-100'
            }`}
          />

          {errorMessage && (
            <p className="text-xs font-semibold text-rose-600 flex items-center gap-1 mt-1">
              {errorMessage}
            </p>
          )}

          {/* Quick Sample Prompts for Chosen Issue Type */}
          <div className="space-y-1.5 pt-1">
            <span className="text-xs font-medium text-slate-500">
              Or tap a common sample problem to auto-fill:
            </span>
            <div className="flex flex-wrap gap-2">
              {activeConfig.sampleProblems.map((sample: string, idx: number) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickSampleClick(sample)}
                  className="text-xs px-3 py-1.5 rounded-xl bg-white hover:bg-civic-50 text-slate-700 hover:text-civic-700 border border-slate-200 hover:border-civic-300 transition-all text-left shadow-xs"
                >
                  "{sample}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Step 3: Optional Evidence File Upload */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-slate-800">
            3. Upload supporting document / screenshot <span className="text-slate-400 font-normal">(Optional)</span>
          </label>

          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center relative cursor-pointer ${
              isDragging
                ? 'border-civic-500 bg-civic-50/50'
                : fileName
                ? 'border-emerald-300 bg-emerald-50/30'
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
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
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-slate-800">{fileName}</div>
                  <div className="text-xs text-emerald-700 font-medium">Ready to attach</div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFileName('');
                  }}
                  className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 ml-3 z-10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-civic-50 text-civic-600 flex items-center justify-center mb-3">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div className="text-sm font-semibold text-slate-800">
                  Drag & drop your notice, invoice, or screenshot here
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Supports PDF, PNG, JPEG, DOCX (Up to 25MB)
                </div>
              </>
            )}
          </div>
        </div>

        {/* Bottom Navigation CTA */}
        <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>CivicGuide ensures confidential diagnostic assistance on your device.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
              className="flex-1 sm:flex-none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="civic-glow"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="flex-1 sm:flex-none"
            >
              Continue to AI Intake
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
