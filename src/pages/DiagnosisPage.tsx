import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Scale, 
  FileText, 
  Clock, 
  Building2,
  Compass,
  Sparkles,
  Zap
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { ISSUE_TYPES } from '../data/issueTypes';
import { StatusBadge } from '../components/common/StatusBadge';
import { Button } from '../components/common/Button';

export const DiagnosisPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cases } = useCivicData();

  const caseId = searchParams.get('caseId');
  const currentCase = cases.find(c => c.id === caseId) || cases[0];

  if (!currentCase) {
    return (
      <div className="p-8 text-center bg-slate-900 rounded-2xl border border-slate-800 text-white">
        <h2 className="text-lg font-bold">No diagnostic assessment active</h2>
        <Button className="mt-4" onClick={() => navigate('/start-case')}>Start Case</Button>
      </div>
    );
  }

  const issueConfig = ISSUE_TYPES[currentCase.issueType];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn text-slate-100">
      {/* Top Banner */}
      <div className="text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-semibold uppercase tracking-wider mb-3 shadow-glow-emerald">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Step 3: Civic Diagnostic Assessment Complete</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          Diagnosis & Legal Standing
        </h1>
        <p className="text-sm text-slate-300 mt-1 leading-relaxed">
          Here is how your grievance stands under statutory legal provisions and established citizen charters.
        </p>
      </div>

      {/* Main Diagnostic Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-8 backdrop-blur-xl"
      >
        {/* Header Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <StatusBadge issueType={currentCase.issueType} size="md" />
              <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/40 flex items-center gap-1 shadow-glow-emerald">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Actionable Claim Confirmed
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              {currentCase.title}
            </h2>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="text-xs text-slate-400 block font-medium">Involved Authority</span>
            <span className="text-sm font-bold text-slate-100 flex items-center gap-1 sm:justify-end mt-0.5">
              <Building2 className="w-4 h-4 text-civic-400" />
              {currentCase.authorityInvolved}
            </span>
          </div>
        </div>

        {/* 3 Key Diagnostic Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Issue Type & Jurisdiction */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-civic-400" />
              Issue Category
            </span>
            <h3 className="text-base font-bold text-white">
              {issueConfig.name}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {issueConfig.description}
            </p>
          </div>

          {/* Governing Law */}
          <div className="p-5 rounded-2xl bg-blue-950/40 border border-blue-500/30 space-y-2 shadow-glow">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              Statutory Basis
            </span>
            <h3 className="text-base font-bold text-white">
              {currentCase.statutoryRule}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Clear statutory jurisdiction applies, granting you enforceable rights to remedy.
            </p>
          </div>

          {/* Statutory Timeframe */}
          <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/30 space-y-2 shadow-glow-amber">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Mandatory Window
            </span>
            <h3 className="text-base font-bold text-amber-300">
              {currentCase.statutoryTimeframe}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Opposing authority is legally mandated to address your demand within this timeframe.
            </p>
          </div>
        </div>

        {/* Problem Breakdown & Important Information */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-civic-400" />
            <span>Important Legal Assessment Highlights</span>
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <span><strong>Documentary Standing:</strong> Your reported grievance shows actionable violation under {issueConfig.primaryStatute}.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <span><strong>Pre-Litigation Requirement:</strong> Serving a formal statutory notice before filing in court/tribunals establishes undisputed evidence.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <span><strong>Appellate Recourse:</strong> In case of deemed refusal or non-compliance, second-tier appellate escalation is available.</span>
            </li>
          </ul>
        </div>

        {/* Next Step Teaser */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border border-indigo-500/30 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-elevated">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-civic-500/20 border border-civic-400/30 flex items-center justify-center text-civic-300 shrink-0 shadow-glow">
              <Compass className="w-5 h-5 animate-pulse-slow" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-civic-400 tracking-wider">Next Milestone</div>
              <div className="text-sm font-bold text-white">ActionRadar Strategy Blueprint Ready</div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/action-radar?caseId=${currentCase.id}`)}
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-civic-600 via-blue-600 to-indigo-600 hover:from-civic-500 hover:to-indigo-500 text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto"
          >
            <span>See My Recommended Action</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

