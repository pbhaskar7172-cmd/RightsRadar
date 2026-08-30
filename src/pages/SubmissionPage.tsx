import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Send, 
  Clock, 
  ArrowRight, 
  Calendar, 
  Barcode, 
  Building2,
  AlertTriangle
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';
import { SubmissionDetails } from '../types';

export const SubmissionPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cases, recordSubmission } = useCivicData();

  const caseIdParam = searchParams.get('caseId');
  const activeCase = cases.find(c => c.id === caseIdParam) || cases[0];

  const todayStr = new Date().toISOString().split('T')[0];

  // Default target statutory deadline (+30 days or +15 days)
  const defaultDeadlineObj = new Date();
  defaultDeadlineObj.setDate(defaultDeadlineObj.getDate() + (activeCase?.deadlineDaysRemaining || 30));
  const defaultDeadlineStr = defaultDeadlineObj.toISOString().split('T')[0];

  const [submissionDate, setSubmissionDate] = useState(todayStr);
  const [filingMode, setFilingMode] = useState<'speed_post' | 'online_portal' | 'in_person' | 'registered_email'>('speed_post');
  const [acknowledgmentRef, setAcknowledgmentRef] = useState(`ED${Math.floor(100000000 + Math.random() * 900000000)}IN`);
  const [recipientAuthority, setRecipientAuthority] = useState(activeCase?.authorityInvolved || 'Competent Authority');
  const [statutoryDeadline, setStatutoryDeadline] = useState(defaultDeadlineStr);
  const [notes, setNotes] = useState('');
  const [isRecorded, setIsRecorded] = useState(false);

  if (!activeCase) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800">No active case for submission</h3>
        <Button className="mt-4" onClick={() => navigate('/cases')}>Go to My Cases</Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const details: SubmissionDetails = {
      submissionDate,
      filingMode,
      acknowledgmentRef: acknowledgmentRef.trim() || `CG-ACK-${Date.now().toString().slice(-6)}`,
      recipientAuthority,
      statutoryResponseDeadline: statutoryDeadline,
      dispatchProofNote: notes,
      recordedAt: new Date().toISOString(),
    };

    recordSubmission(activeCase.id, details);
    setIsRecorded(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 text-xs font-semibold uppercase tracking-wider mb-2">
          <Send className="w-3.5 h-3.5 text-cyan-600" />
          Step 5: Record Dispatch & Activate Countdown
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Record Your Submission
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Once you have dispatched or uploaded your document, enter the proof details below to start the statutory clock.
        </p>
      </div>

      {/* Mandatory Civic Disclaimer Box */}
      <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 space-y-1.5 shadow-xs">
        <div className="font-bold flex items-center gap-2 text-amber-800 text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
          Important Statutory Filing Notice
        </div>
        <p className="text-amber-900 leading-relaxed font-medium">
          CivicGuide has recorded your submission details for tracking and drafting purposes. This does <strong>not</strong> mean CivicGuide officially filed the document with the authority or government portal. Citizens retain sole responsibility for physical or digital filing.
        </p>
      </div>

      {isRecorded ? (
        /* Confirmation State */
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl border border-emerald-200 p-8 text-center space-y-6 shadow-elevated"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md shadow-emerald-500/20">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Submission Recorded Successfully!
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
              Your case has transitioned to <strong>Response Pending</strong>. The statutory response clock is now actively monitoring your deadline until <strong>{statutoryDeadline}</strong>.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 max-w-md mx-auto text-xs space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-slate-500">Case ID:</span>
              <span className="font-bold text-slate-800">#{activeCase.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Filing Mode:</span>
              <span className="font-bold text-slate-800 capitalize">{filingMode.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Tracking Reference:</span>
              <span className="font-mono font-bold text-civic-700">{acknowledgmentRef}</span>
            </div>
          </div>

          <div className="pt-2">
            <Button
              size="lg"
              variant="civic-glow"
              onClick={() => navigate(`/cases/${activeCase.id}`)}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View My Case Hub
            </Button>
          </div>
        </motion.div>
      ) : (
        /* Submission Form */
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/90 shadow-elevated p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-semibold text-slate-400">Target Case</span>
              <h3 className="text-base font-bold text-slate-900">{activeCase.title}</h3>
            </div>
            <StatusBadge issueType={activeCase.issueType} size="sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Filing Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-civic-600" />
                Date of Dispatch / Filing *
              </label>
              <input
                type="date"
                required
                value={submissionDate}
                onChange={(e) => setSubmissionDate(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 focus:border-civic-600 focus:ring-4 focus:ring-civic-100 outline-none text-sm text-slate-800 font-medium"
              />
            </div>

            {/* Filing Mode */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-civic-600" />
                Filing / Service Channel *
              </label>
              <select
                value={filingMode}
                onChange={(e: any) => setFilingMode(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 focus:border-civic-600 focus:ring-4 focus:ring-civic-100 outline-none text-sm text-slate-800 font-medium bg-white"
              >
                <option value="speed_post">Registered Speed Post with AD</option>
                <option value="online_portal">Official Ministry / RTI Portal</option>
                <option value="registered_email">Registered Legal Email Notice</option>
                <option value="in_person">In-Person Hand Delivery (Receiving Stamp)</option>
              </select>
            </div>

            {/* Tracking / Ack Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Barcode className="w-3.5 h-3.5 text-civic-600" />
                Speed Post Barcode / Portal Ack Ref *
              </label>
              <input
                type="text"
                required
                value={acknowledgmentRef}
                onChange={(e) => setAcknowledgmentRef(e.target.value)}
                placeholder="e.g. ED984210985IN / RTI-2024-998"
                className="w-full p-3 rounded-xl border border-slate-200 focus:border-civic-600 focus:ring-4 focus:ring-civic-100 outline-none text-sm font-mono font-medium text-slate-800"
              />
            </div>

            {/* Recipient Authority */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-civic-600" />
                Served Authority / Department
              </label>
              <input
                type="text"
                value={recipientAuthority}
                onChange={(e) => setRecipientAuthority(e.target.value)}
                placeholder="e.g. PIO / Managing Director / Landlord"
                className="w-full p-3 rounded-xl border border-slate-200 focus:border-civic-600 focus:ring-4 focus:ring-civic-100 outline-none text-sm text-slate-800 font-medium"
              />
            </div>
          </div>

          {/* Statutory Response Target Date */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              Statutory Response Deadline (Auto-Calculated)
            </label>
            <input
              type="date"
              value={statutoryDeadline}
              onChange={(e) => setStatutoryDeadline(e.target.value)}
              className="w-full p-3 rounded-xl border border-amber-200 bg-amber-50/40 text-sm font-bold text-amber-900 outline-none focus:ring-4 focus:ring-amber-100"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              If the opposing entity fails to reply by this date, First Appeal or Tribunal Escalation will activate automatically.
            </p>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Filing Notes & Dispatch Details <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Dispatched at Post Office Counter 4. Postal receipt uploaded to Evidence Locker."
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-civic-600 focus:ring-4 focus:ring-civic-100 outline-none text-xs text-slate-800"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(`/cases/${activeCase.id}`)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="civic-glow"
              size="lg"
              leftIcon={<Send className="w-4 h-4" />}
            >
              Record Submission & Start Clock
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
