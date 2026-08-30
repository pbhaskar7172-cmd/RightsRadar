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
  Compass
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
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800">No diagnostic assessment active</h2>
        <Button className="mt-4" onClick={() => navigate('/start-case')}>Start Case</Button>
      </div>
    );
  }

  const issueConfig = ISSUE_TYPES[currentCase.issueType];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Step 3: Civic Diagnostic Assessment Complete
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Diagnosis & Legal Standing
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Here is how your grievance stands under statutory legal provisions and established citizen charters.
        </p>
      </div>

      {/* Main Diagnostic Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl border border-slate-200/90 shadow-elevated p-6 sm:p-8 space-y-8"
      >
        {/* Header Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <StatusBadge issueType={currentCase.issueType} size="md" />
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Actionable Claim Confirmed
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {currentCase.title}
            </h2>
          </div>

          <div className="text-left sm:text-right shrink-0">
            <span className="text-xs text-slate-400 block font-medium">Involved Authority</span>
            <span className="text-sm font-bold text-slate-800 flex items-center gap-1 sm:justify-end mt-0.5">
              <Building2 className="w-4 h-4 text-civic-600" />
              {currentCase.authorityInvolved}
            </span>
          </div>
        </div>

        {/* 3 Key Diagnostic Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Issue Type & Jurisdiction */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-civic-600" />
              Issue Category
            </span>
            <h3 className="text-base font-bold text-slate-900">
              {issueConfig.name}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {issueConfig.description}
            </p>
          </div>

          {/* Governing Law */}
          <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              Statutory Basis
            </span>
            <h3 className="text-base font-bold text-blue-950">
              {currentCase.statutoryRule}
            </h3>
            <p className="text-xs text-blue-800/80 leading-relaxed">
              Clear statutory jurisdiction applies, granting you enforceable rights to remedy.
            </p>
          </div>

          {/* Statutory Timeframe */}
          <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              Mandatory Window
            </span>
            <h3 className="text-base font-bold text-amber-950">
              {currentCase.statutoryTimeframe}
            </h3>
            <p className="text-xs text-amber-800/80 leading-relaxed">
              Opposing authority is legally mandated to address your demand within this timeframe.
            </p>
          </div>
        </div>

        {/* Problem Breakdown & Important Information */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-civic-600" />
            Important Assessment Highlights
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span><strong>Documentary Standing:</strong> Your reported grievance shows clear violation of citizen rights/contractual covenants.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span><strong>Pre-Litigation Requirement:</strong> Serving a formal statutory notice before filing in court/tribunals is strongly recommended and gives you upper hand.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
              <span><strong>Appellate Recourse:</strong> In case of deemed refusal or non-compliance, second-tier appellate escalation is available.</span>
            </li>
          </ul>
        </div>

        {/* Next Step Teaser */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-civic-900 to-navy-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-civic-500/20 border border-civic-400/30 flex items-center justify-center text-civic-300 shrink-0">
              <Compass className="w-5 h-5 animate-pulse-slow" />
            </div>
            <div>
              <div className="text-xs uppercase font-bold text-civic-300 tracking-wider">Next Milestone</div>
              <div className="text-sm font-bold text-white">ActionRadar Strategy Ready</div>
            </div>
          </div>

          <Button
            size="lg"
            variant="civic-glow"
            onClick={() => navigate(`/action-radar?caseId=${currentCase.id}`)}
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            See My Recommended Action
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
