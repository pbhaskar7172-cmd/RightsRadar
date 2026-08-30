import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  Building2, 
  FileText, 
  Paperclip, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  Target,
  Sparkles
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { ISSUE_TYPES } from '../data/issueTypes';
import { StatusBadge } from '../components/common/StatusBadge';
import { Button } from '../components/common/Button';
import { CaseTimeline } from '../components/timeline/CaseTimeline';
import { DocumentCard } from '../components/cards/DocumentCard';
import { EvidenceCard } from '../components/cards/EvidenceCard';
import { Modal } from '../components/common/Modal';
import { CaseStatus, DocumentItem, EvidenceItem } from '../types';

export const CaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    getCaseById, 
    getDocumentsByCaseId, 
    getEvidenceByCaseId, 
    advanceTimelineStep,
    escalateCase,
    markCaseResolved,
    addEvidence,
    deleteEvidence,
    createDocumentForCase
  } = useCivicData();

  const currentCase = id ? getCaseById(id) : undefined;
  const caseDocs = id ? getDocumentsByCaseId(id) : [];
  const caseEvidence = id ? getEvidenceByCaseId(id) : [];

  const [activeTab, setActiveTab] = useState<'timeline' | 'documents' | 'evidence' | 'escalation'>('timeline');

  // Modals state
  const [isEscalationModalOpen, setIsEscalationModalOpen] = useState(false);
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  // Escalation Form
  const [escalationTier, setEscalationTier] = useState('First Appellate Authority (FAA)');
  const [escalationGrounds, setEscalationGrounds] = useState('Deemed Refusal / Non-response within statutory 30 days');
  const [escalatedTo, setEscalatedTo] = useState('Additional Commissioner / Nodal Ombudsman');
  const [escalationDays, setEscalationDays] = useState(30);

  // Resolution Form
  const [resolutionNotes, setResolutionNotes] = useState('Certified records received / full refund credited to account.');

  // Evidence upload form
  const [evidenceName, setEvidenceName] = useState('');
  const [evidenceCategory, setEvidenceCategory] = useState<'proof_of_payment' | 'written_notice' | 'agreement_contract' | 'email_chat' | 'id_proof' | 'other'>('written_notice');
  const [evidenceNotes, setEvidenceNotes] = useState('');

  if (!currentCase) {
    return (
      <div className="p-12 text-center bg-slate-900 rounded-3xl border border-slate-800 text-white">
        <h3 className="text-lg font-bold">Case not found</h3>
        <p className="text-xs text-slate-400 mt-1 mb-4">The requested case identifier does not exist.</p>
        <Button onClick={() => navigate('/cases')}>Return to Cases</Button>
      </div>
    );
  }

  const issueConfig = ISSUE_TYPES[currentCase.issueType];

  const handleEscalateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    escalateCase(currentCase.id, {
      appellateTier: escalationTier,
      grounds: escalationGrounds,
      escalatedTo,
      nextDeadlineDays: escalationDays
    });
    setIsEscalationModalOpen(false);
  };

  const handleResolveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    markCaseResolved(currentCase.id, resolutionNotes);
    setIsResolveModalOpen(false);
  };

  const handleUploadEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evidenceName.trim()) return;

    addEvidence({
      caseId: currentCase.id,
      name: evidenceName.trim(),
      size: '2.4 MB',
      fileType: 'Document (PDF/Image)',
      category: evidenceCategory,
      notes: evidenceNotes
    });

    setEvidenceName('');
    setEvidenceNotes('');
    setIsUploadModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/cases')}
            className="text-xs font-semibold text-slate-400 hover:text-civic-400 flex items-center gap-1 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to My Cases</span>
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <StatusBadge issueType={currentCase.issueType} size="sm" />
            <StatusBadge status={currentCase.status} size="sm" />
            <span className="text-xs font-mono text-slate-400 font-medium">#{currentCase.id}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
            {currentCase.title}
          </h1>
        </div>

        {/* Primary Case Hub CTAs */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            onClick={() => navigate(`/action-radar?caseId=${currentCase.id}`)}
            leftIcon={<Target className="w-4 h-4 text-civic-400" />}
            className="border-slate-700 text-slate-300 hover:text-white"
          >
            ActionRadar Plan
          </Button>

          {currentCase.status !== 'resolved' && (
            <>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEscalationModalOpen(true)}
                leftIcon={<AlertTriangle className="w-4 h-4 text-purple-400" />}
                className="border-purple-500/40 text-purple-300 hover:bg-purple-950/40"
              >
                Escalate Tier
              </Button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsResolveModalOpen(true)}
                className="py-2 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-glow-emerald flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark Resolved</span>
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Case Overview Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-elevated backdrop-blur-xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Opposing Party</span>
          <div className="text-sm font-bold text-white mt-1 truncate flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-civic-400 shrink-0" />
            {currentCase.authorityInvolved}
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-elevated backdrop-blur-xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Governing Law</span>
          <div className="text-sm font-bold text-white mt-1 truncate flex items-center gap-1.5">
            <Scale className="w-4 h-4 text-emerald-400 shrink-0" />
            {currentCase.statutoryRule.split('(')[0]}
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-elevated backdrop-blur-xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Response Deadline</span>
          <div className="text-sm font-bold text-white mt-1 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-amber-300">
              <Clock className="w-4 h-4 text-amber-400" />
              {currentCase.deadlineDate || 'Pending Submission'}
            </span>
            {currentCase.deadlineDaysRemaining !== undefined && (
              <span className="text-xs font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/40">
                {currentCase.deadlineDaysRemaining}d left
              </span>
            )}
          </div>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-elevated backdrop-blur-xl">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Artifacts Linked</span>
          <div className="text-sm font-bold text-white mt-1 flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-slate-300">
              <FileText className="w-3.5 h-3.5 text-civic-400" />
              {caseDocs.length} Docs
            </span>
            <span className="flex items-center gap-1 text-xs text-slate-300">
              <Paperclip className="w-3.5 h-3.5 text-emerald-400" />
              {caseEvidence.length} Evidence
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-800">
        <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto pb-px">
          <button
            onClick={() => setActiveTab('timeline')}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'timeline'
                ? 'border-civic-500 text-civic-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Timeline Progression (8 Stages)</span>
          </button>

          <button
            onClick={() => setActiveTab('documents')}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'documents'
                ? 'border-civic-500 text-civic-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Documents ({caseDocs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('evidence')}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'evidence'
                ? 'border-civic-500 text-civic-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Paperclip className="w-4 h-4" />
            <span>Evidence Locker ({caseEvidence.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('escalation')}
            className={`pb-3 text-xs sm:text-sm font-bold transition-all border-b-2 flex items-center gap-2 shrink-0 ${
              activeTab === 'escalation'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4 text-purple-400" />
            <span>Appellate Escalation</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Interactive Timeline */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <CaseTimeline
            timeline={currentCase.timeline}
            currentStatus={currentCase.status}
            caseId={currentCase.id}
            onAdvanceStep={(target: CaseStatus) => advanceTimelineStep(currentCase.id, target)}
            onOpenSubmissionModal={() => navigate(`/submission?caseId=${currentCase.id}`)}
            onOpenEscalationModal={() => setIsEscalationModalOpen(true)}
            onOpenResolveModal={() => setIsResolveModalOpen(true)}
          />
        </div>
      )}

      {/* Tab 2: Documents */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Case Documents & Notices</h3>
              <p className="text-xs text-slate-400 mt-0.5">Statutory legal drafts and formal demand letters generated for this case</p>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                const newDoc = createDocumentForCase(currentCase.id);
                navigate(`/document?docId=${newDoc.id}&caseId=${currentCase.id}`);
              }}
              leftIcon={<Plus className="w-4 h-4" />}
              className="border-slate-700 text-slate-300 hover:text-white"
            >
              Draft New Notice
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseDocs.map((doc: DocumentItem) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Evidence Locker */}
      {activeTab === 'evidence' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Evidence & Attachments Locker</h3>
              <p className="text-xs text-slate-400 mt-0.5">Invoices, postal speed post receipts, emails, and photos</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsUploadModalOpen(true)}
              className="py-2 px-4 rounded-xl bg-gradient-to-r from-civic-600 to-indigo-600 text-white font-bold text-xs shadow-glow flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Evidence</span>
            </motion.button>
          </div>

          {caseEvidence.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {caseEvidence.map((evi: EvidenceItem) => (
                <EvidenceCard
                  key={evi.id}
                  evidence={evi}
                  onDelete={(eId: string) => deleteEvidence(eId)}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-900/60 rounded-3xl border border-dashed border-slate-800">
              <Paperclip className="w-10 h-10 text-slate-500 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-white">No evidence attached yet</h4>
              <p className="text-xs text-slate-400 mt-1 mb-4">Attach invoices, receipts, and correspondence to strengthen your case.</p>
              <Button size="sm" onClick={() => setIsUploadModalOpen(true)}>Upload Evidence File</Button>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Escalation Guidance */}
      {activeTab === 'escalation' && (
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 space-y-6 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950 text-purple-300 flex items-center justify-center border border-purple-500/40 shadow-glow-indigo">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Appellate Escalation Matrix</h3>
              <p className="text-xs text-slate-400">How to proceed if the opposing authority ignores the statutory notice</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-3 shadow-glow-indigo">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                Tier 2: Appellate Authority
              </span>
              <h4 className="text-base font-bold text-white">
                First Appeal under Section 19(1) / District Forum
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                When the 30-day statutory response window elapses without written compliance, you have the right to file a First Appeal before the First Appellate Authority (FAA) or initiate formal proceedings on the E-Daakhil consumer portal.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsEscalationModalOpen(true)}
                className="py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-glow-indigo cursor-pointer"
              >
                Trigger Tier 2 Escalation
              </motion.button>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Tier 3: Statutory Commission
              </span>
              <h4 className="text-base font-bold text-white">
                State / Central Information Commission or High Court
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                If the First Appellate Authority does not resolve the grievance within 45 days, Second Appeal lies directly with the Central Information Commission (CIC) with powers to levy monetary penalties up to ₹25,000 on defaulting officers.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal 1: Escalation */}
      <Modal
        isOpen={isEscalationModalOpen}
        onClose={() => setIsEscalationModalOpen(false)}
        title="Trigger Statutory Escalation"
        description="Advance this case to the designated higher appellate forum"
      >
        <form onSubmit={handleEscalateSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-300 mb-1">Appellate Tier *</label>
            <input
              type="text"
              required
              value={escalationTier}
              onChange={(e) => setEscalationTier(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-medium focus:border-civic-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Grounds for Escalation *</label>
            <textarea
              rows={3}
              required
              value={escalationGrounds}
              onChange={(e) => setEscalationGrounds(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-medium focus:border-civic-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Escalated Authority / Forum *</label>
            <input
              type="text"
              required
              value={escalatedTo}
              onChange={(e) => setEscalatedTo(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-medium focus:border-civic-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Appellate Decision Window (Days)</label>
            <input
              type="number"
              value={escalationDays}
              onChange={(e) => setEscalationDays(Number(e.target.value))}
              className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-medium focus:border-civic-500 outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsEscalationModalOpen(false)} className="border-slate-700 text-slate-300 hover:text-white">Cancel</Button>
            <Button type="submit" variant="civic-glow" size="sm">Confirm Escalation</Button>
          </div>
        </form>
      </Modal>

      {/* Modal 2: Mark Resolved */}
      <Modal
        isOpen={isResolveModalOpen}
        onClose={() => setIsResolveModalOpen(false)}
        title="Mark Case as Resolved 🎉"
        description="Record the resolution outcome for your citizen records"
      >
        <form onSubmit={handleResolveSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-300 mb-1">Resolution Summary & Outcome *</label>
            <textarea
              rows={4}
              required
              value={resolutionNotes}
              onChange={(e) => setResolutionNotes(e.target.value)}
              placeholder="e.g. Received certified copies / compensation credited in full."
              className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-medium focus:border-civic-500 outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsResolveModalOpen(false)} className="border-slate-700 text-slate-300 hover:text-white">Cancel</Button>
            <Button type="submit" variant="primary" size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white">Save & Mark Resolved</Button>
          </div>
        </form>
      </Modal>

      {/* Modal 3: Upload Evidence */}
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Upload Supporting Evidence"
        description="Attach receipts, contracts, screenshots or correspondence"
      >
        <form onSubmit={handleUploadEvidence} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-300 mb-1">Document / Evidence Name *</label>
            <input
              type="text"
              required
              value={evidenceName}
              onChange={(e) => setEvidenceName(e.target.value)}
              placeholder="e.g., SpeedPost_Receipt_ED9842.pdf"
              className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-medium focus:border-civic-500 outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Category *</label>
            <select
              value={evidenceCategory}
              onChange={(e: any) => setEvidenceCategory(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-medium focus:border-civic-500 outline-none cursor-pointer"
            >
              <option value="proof_of_payment">Proof of Payment / Invoice</option>
              <option value="written_notice">Written Notice / Postal Slip</option>
              <option value="agreement_contract">Agreement / Lease Contract</option>
              <option value="email_chat">Email / Chat Transcript</option>
              <option value="id_proof">Identity Document</option>
              <option value="other">Other Supporting Proof</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1">Notes / Description</label>
            <textarea
              rows={2}
              value={evidenceNotes}
              onChange={(e) => setEvidenceNotes(e.target.value)}
              placeholder="e.g. Shows barcode and post office booking stamp."
              className="w-full p-3 rounded-xl border border-slate-800 bg-slate-950 text-white focus:border-civic-500 outline-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsUploadModalOpen(false)} className="border-slate-700 text-slate-300 hover:text-white">Cancel</Button>
            <Button type="submit" variant="civic-glow" size="sm">Save to Locker</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

