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
  ArrowUpRight
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { ISSUE_TYPES } from '../data/issueTypes';
import { StatusBadge } from '../components/common/StatusBadge';

export const DiagnosisPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cases } = useCivicData();

  const caseId = searchParams.get('caseId');
  const currentCase = cases.find(c => c.id === caseId) || cases[0];

  if (!currentCase) {
    return (
      <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 text-slate-900 shadow-card">
        <h2 className="text-lg font-bold">No diagnostic assessment active</h2>
        <button className="btn-black mt-4" onClick={() => navigate('/start-case')}>Start Case</button>
      </div>
    );
  }

  const issueConfig = ISSUE_TYPES[currentCase.issueType];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn text-slate-900">
      {/* Top Banner */}
      <div className="text-center sm:text-left">
        <span className="editorial-pill mb-3">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Step 3: Civic Diagnostic Assessment Complete</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight mt-1">
          Diagnosis & Legal Standing
        </h1>
        <p className="text-sm text-slate-500 mt-1 leading-relaxed font-medium">
          Here is how your grievance stands under statutory legal provisions and established citizen charters.
        </p>
      </div>

      {/* Main Diagnostic Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-8"
      >
        {/* Header Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <StatusBadge issueType={currentCase.issueType} size="md" />
              <span className="text-xs font-extrabold text-slate-900 bg-pastel-mint px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                Actionable Claim Confirmed
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-950 leading-snug">
              {currentCase.title}
            </h2>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider">Involved Authority</span>
            <span className="text-sm font-extrabold text-slate-900 flex items-center gap-1 sm:justify-end mt-0.5">
              <Building2 className="w-4 h-4 text-slate-700" />
              {currentCase.authorityInvolved}
            </span>
          </div>
        </div>

        {/* 3 Key Diagnostic Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Issue Type & Jurisdiction */}
          <div className="p-5 rounded-2xl bg-pastel-purple-light border border-purple-200 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-purple-700" />
              Issue Category
            </span>
            <h3 className="text-base font-black text-slate-950">
              {issueConfig.name}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {issueConfig.description}
            </p>
          </div>

          {/* Governing Law */}
          <div className="p-5 rounded-2xl bg-pastel-blue-light border border-blue-200 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-700" />
              Statutory Basis
            </span>
            <h3 className="text-base font-black text-slate-950">
              {currentCase.statutoryRule}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Clear statutory jurisdiction applies, granting you enforceable rights to remedy.
            </p>
          </div>

          {/* Statutory Timeframe */}
          <div className="p-5 rounded-2xl bg-pastel-yellow-light border border-amber-200 space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-700" />
              Mandatory Window
            </span>
            <h3 className="text-base font-black text-slate-950">
              {currentCase.statutoryTimeframe}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Opposing authority is legally mandated to address your demand within this timeframe.
            </p>
          </div>
        </div>

        {/* Problem Breakdown & Important Information */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
          <h3 className="text-sm font-extrabold text-slate-950 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-slate-700" />
            <span>Important Legal Assessment Highlights</span>
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span><strong>Documentary Standing:</strong> Your reported grievance shows actionable violation under {issueConfig.primaryStatute}.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span><strong>Pre-Litigation Requirement:</strong> Serving a formal statutory notice before filing in court/tribunals establishes undisputed evidence.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span><strong>Appellate Recourse:</strong> In case of deemed refusal or non-compliance, second-tier appellate escalation is available.</span>
            </li>
          </ul>
        </div>

        {/* Next Step Teaser */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-elevated">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0">
              <Compass className="w-5 h-5 animate-pulse-slow" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Next Milestone</div>
              <div className="text-sm font-black text-white">ActionRadar Strategy Blueprint Ready</div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/action-radar?caseId=${currentCase.id}`)}
            className="py-3 px-6 rounded-full bg-white text-slate-950 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer w-full sm:w-auto shadow-sm"
          >
            <span>See My Recommended Action</span>
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};


