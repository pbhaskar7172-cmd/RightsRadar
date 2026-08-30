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
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
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
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-900 shadow-card">
        <h3 className="text-lg font-bold">No active case for submission</h3>
        <button className="btn-black mt-4" onClick={() => navigate('/cases')}>Go to My Cases</button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const details: SubmissionDetails = {
      submissionDate,
      filingMode,
      acknowledgmentRef: acknowledgmentRef.trim() || `RT-ACK-${Date.now().toString().slice(-6)}`,
      recipientAuthority,
      statutoryResponseDeadline: statutoryDeadline,
      dispatchProofNote: notes,
      recordedAt: new Date().toISOString(),
    };

    recordSubmission(activeCase.id, details);
    setIsRecorded(true);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn text-slate-900">
      {/* Top Banner */}
      <div className="text-center sm:text-left">
        <span className="editorial-pill mb-3">
          <Send className="w-3.5 h-3.5 text-slate-900" />
          <span>Step 5: Record Dispatch & Activate Countdown</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight mt-1">
          Record Your Submission
        </h1>
        <p className="text-sm text-slate-500 mt-1 leading-relaxed font-medium">
          Once you have dispatched or uploaded your document, enter the proof details below to start the statutory clock.
        </p>
      </div>

      {/* Mandatory Civic Disclaimer Box */}
      <div className="p-5 rounded-3xl bg-pastel-yellow-light border border-amber-200 text-xs text-slate-800 space-y-1.5 font-medium">
        <div className="font-extrabold flex items-center gap-2 text-slate-950 text-sm">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Important Statutory Filing Notice</span>
        </div>
        <p className="text-slate-700 leading-relaxed font-medium">
          RightsTrack records your submission details for tracking and statutory compliance purposes. This does <strong>not</strong> mean RightsTrack officially filed the document with the authority. Citizens retain sole responsibility for physical or digital filing.
        </p>
      </div>

      {isRecorded ? (
        /* Confirmation State */
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl border border-emerald-300 p-8 text-center space-y-6 shadow-card"
        >
          <div className="w-16 h-16 rounded-full bg-pastel-mint text-emerald-800 flex items-center justify-center mx-auto border border-emerald-300">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>

          <div>
            <h2 className="text-2xl font-black text-slate-950">
              Submission Recorded Successfully!
            </h2>
            <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed font-medium">
              Your case has transitioned to <strong className="text-amber-700">Response Pending</strong>. The statutory response clock is now actively monitoring your deadline until <strong className="text-emerald-700">{statutoryDeadline}</strong>.
            </p>
          </div>

          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 max-w-md mx-auto text-xs space-y-2.5 text-left font-medium">
            <div className="flex justify-between">
              <span className="text-slate-500">Case ID:</span>
              <span className="font-bold text-slate-900">#{activeCase.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Filing Mode:</span>
              <span className="font-bold text-slate-900 capitalize">{filingMode.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Tracking Reference:</span>
              <span className="font-mono font-bold text-slate-900">{acknowledgmentRef}</span>
            </div>
          </div>

          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/cases/${activeCase.id}`)}
              className="btn-black py-3 px-8 text-sm flex items-center justify-center gap-2 cursor-pointer mx-auto"
            >
              <span>View My Case Hub</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      ) : (
        /* Submission Form */
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-card p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Target Case</span>
              <h3 className="text-lg font-black text-slate-950">{activeCase.title}</h3>
            </div>
            <StatusBadge issueType={activeCase.issueType} size="sm" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Filing Date */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-700" />
                <span>Date of Dispatch / Filing *</span>
              </label>
              <input
                type="date"
                required
                value={submissionDate}
                onChange={(e) => setSubmissionDate(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-200 focus:border-slate-900 bg-slate-50 outline-none text-sm text-slate-900 font-medium"
              />
            </div>

            {/* Filing Mode */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-slate-700" />
                <span>Filing / Service Channel *</span>
              </label>
              <select
                value={filingMode}
                onChange={(e: any) => setFilingMode(e.target.value)}
                className="w-full p-3 rounded-2xl border border-slate-200 focus:border-slate-900 bg-slate-50 outline-none text-sm text-slate-900 font-medium"
              >
                <option value="speed_post">Registered Speed Post with AD</option>
                <option value="online_portal">Official Ministry / RTI Portal</option>
                <option value="registered_email">Registered Legal Email Notice</option>
                <option value="in_person">In-Person Hand Delivery (Receiving Stamp)</option>
              </select>
            </div>

            {/* Tracking / Ack Number */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Barcode className="w-3.5 h-3.5 text-slate-700" />
                <span>Speed Post Barcode / Portal Ack Ref *</span>
              </label>
              <input
                type="text"
                required
                value={acknowledgmentRef}
                onChange={(e) => setAcknowledgmentRef(e.target.value)}
                placeholder="e.g. ED984210985IN / RTI-2024-998"
                className="w-full p-3 rounded-2xl border border-slate-200 focus:border-slate-900 bg-slate-50 outline-none text-sm font-mono font-medium text-slate-900"
              />
            </div>

            {/* Recipient Authority */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-slate-700" />
                <span>Served Authority / Department</span>
              </label>
              <input
                type="text"
                value={recipientAuthority}
                onChange={(e) => setRecipientAuthority(e.target.value)}
                placeholder="e.g. PIO / Managing Director / Landlord"
                className="w-full p-3 rounded-2xl border border-slate-200 focus:border-slate-900 bg-slate-50 outline-none text-sm text-slate-900 font-medium"
              />
            </div>
          </div>

          {/* Statutory Response Target Date */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Statutory Response Deadline (Auto-Calculated)</span>
            </label>
            <input
              type="date"
              value={statutoryDeadline}
              onChange={(e) => setStatutoryDeadline(e.target.value)}
              className="w-full p-3 rounded-2xl border border-amber-300 bg-pastel-yellow-light text-sm font-bold text-slate-950 outline-none focus:border-slate-900"
            />
            <p className="text-[11px] text-slate-500 mt-1.5 font-medium">
              If the opposing entity fails to reply by this date, First Appeal or Tribunal Escalation will activate automatically.
            </p>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1.5">
              Filing Notes & Dispatch Details <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Dispatched at Post Office Counter 4. Postal receipt uploaded to Evidence Locker."
              className="w-full p-3 rounded-2xl border border-slate-200 focus:border-slate-900 bg-slate-50 outline-none text-xs text-slate-900 placeholder:text-slate-400 font-medium"
            />
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => navigate(`/cases/${activeCase.id}`)}
              className="btn-pill-outline text-xs"
            >
              Cancel
            </button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-black py-3 px-6 text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Record Submission & Start Clock</span>
            </motion.button>
          </div>
        </form>
      )}
    </div>
  );
};


