import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCivicData } from '../context/CivicDataContext';
import { EvidenceItem } from '../types';
import { EvidenceCard } from '../components/cards/EvidenceCard';
import { EmptyState } from '../components/common/EmptyState';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { 
  Paperclip, 
  UploadCloud, 
  Search, 
  CheckCircle2, 
  Loader2, 
  FileText, 
  Sparkles
} from 'lucide-react';

export const EvidencePage: React.FC = () => {
  const { evidence, cases, addEvidence, deleteEvidence } = useCivicData();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewEvidence, setPreviewEvidence] = useState<EvidenceItem | null>(null);

  // Upload Simulation State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newFileName, setNewFileName] = useState('');
  const [newFileCategory, setNewFileCategory] = useState<'proof_of_payment' | 'written_notice' | 'agreement_contract' | 'email_chat' | 'id_proof' | 'other'>('written_notice');
  const [targetCaseId, setTargetCaseId] = useState<string>(cases[0]?.id || '');
  const [uploadNotes, setUploadNotes] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const filteredEvidence = evidence.filter((e: EvidenceItem) => {
    const matchesSearch = !searchQuery.trim() || 
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.notes && e.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCase = selectedCaseId === 'all' || e.caseId === selectedCaseId;
    const matchesCat = selectedCategory === 'all' || e.category === selectedCategory;

    return matchesSearch && matchesCase && matchesCat;
  });

  const handleSimulateUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim() || !targetCaseId) return;

    setIsUploading(true);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            addEvidence({
              caseId: targetCaseId,
              name: newFileName.trim(),
              size: `${(Math.random() * 3 + 0.8).toFixed(1)} MB`,
              fileType: newFileName.endsWith('.pdf') ? 'PDF Document' : 'Image (JPEG)',
              category: newFileCategory,
              notes: uploadNotes || 'Uploaded to evidence repository'
            });
            setIsUploading(false);
            setUploadProgress(0);
            setNewFileName('');
            setUploadNotes('');
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 200);
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setNewFileName(file.name);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-civic-950 text-civic-300 border border-civic-500/40 text-xs font-semibold uppercase tracking-wider mb-3 shadow-glow">
            <Paperclip className="w-3.5 h-3.5 text-civic-400" />
            <span>Citizen Evidence Locker</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Evidence & Document Vault ({evidence.length})
          </h1>
          <p className="text-sm text-slate-300 mt-1 leading-relaxed">
            Store and organize invoices, postal booking receipts, lease contracts, and screenshot trails.
          </p>
        </div>
      </div>

      {/* Upload Zone Card */}
      <div className="bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl p-6 sm:p-8 space-y-6 backdrop-blur-xl">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <UploadCloud className="w-5 h-5 text-civic-400" />
          <span>Upload New Supporting Evidence</span>
        </h2>

        <form onSubmit={handleSimulateUpload} className="space-y-5">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center relative cursor-pointer backdrop-blur-xl ${
              isDragging
                ? 'border-civic-500 bg-civic-950/40'
                : newFileName
                ? 'border-emerald-500/50 bg-emerald-950/20'
                : 'border-slate-800 bg-slate-950/50 hover:bg-slate-950/80 hover:border-slate-700'
            }`}
          >
            <input
              type="file"
              onChange={(e) => e.target.files?.[0] && setNewFileName(e.target.files[0].name)}
              className="absolute inset-0 opacity-0 cursor-pointer"
              aria-label="Upload evidence file"
            />

            {newFileName ? (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-500/40 shadow-glow-emerald">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white">{newFileName}</div>
                  <div className="text-xs text-emerald-400 font-semibold">File selected and ready to catalog</div>
                </div>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-2xl bg-civic-950 text-civic-400 flex items-center justify-center mb-3 border border-civic-500/40 shadow-glow">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div className="text-sm font-semibold text-white">
                  Drag and drop files here, or click to browse
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  Supports PDF, PNG, JPG, MP4, CSV (Up to 50MB)
                </div>
              </>
            )}
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Link to Case *
              </label>
              <select
                value={targetCaseId}
                onChange={(e) => setTargetCaseId(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-800 focus:border-civic-500 bg-slate-950 font-medium text-white outline-none"
              >
                {cases.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.title.slice(0, 35)}...
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Evidence Category *
              </label>
              <select
                value={newFileCategory}
                onChange={(e: any) => setNewFileCategory(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-800 focus:border-civic-500 bg-slate-950 font-medium text-white outline-none"
              >
                <option value="proof_of_payment">Proof of Payment / Invoice</option>
                <option value="written_notice">Postal Slip / Speed Post Receipt</option>
                <option value="agreement_contract">Agreement / Tenancy Deed</option>
                <option value="email_chat">Email / Chat Transcript</option>
                <option value="id_proof">Identity Document</option>
                <option value="other">Other Supporting Proof</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Notes / Reference
              </label>
              <input
                type="text"
                value={uploadNotes}
                onChange={(e) => setUploadNotes(e.target.value)}
                placeholder="e.g. Speed Post Tracking barcode ED..."
                className="w-full p-3 rounded-xl border border-slate-800 focus:border-civic-500 bg-slate-950 font-medium text-white outline-none"
              />
            </div>
          </div>

          {/* Progress Bar & Submit */}
          {isUploading ? (
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs font-semibold text-civic-400">
                <span className="flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Encrypting and verifying evidence locally...
                </span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <motion.div
                  className="bg-gradient-to-r from-civic-500 to-indigo-500 h-full rounded-full shadow-glow"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="pt-2 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={!newFileName.trim()}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-civic-600 via-blue-600 to-indigo-600 hover:from-civic-500 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm shadow-glow flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Save to Evidence Locker</span>
              </motion.button>
            </div>
          )}
        </form>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 p-4 sm:p-5 rounded-3xl border border-slate-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-xl">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search evidence files or notes..."
            className="w-full pl-9 pr-4 py-2.5 bg-slate-950 text-xs sm:text-sm text-white placeholder:text-slate-500 rounded-xl border border-slate-800 focus:border-civic-500 outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCaseId}
            onChange={(e) => setSelectedCaseId(e.target.value)}
            className="p-2.5 text-xs bg-slate-950 rounded-xl border border-slate-800 font-semibold text-slate-300 outline-none"
          >
            <option value="all">All Cases ({evidence.length})</option>
            {cases.map((c: any) => (
              <option key={c.id} value={c.id}>{c.title.slice(0, 25)}...</option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2.5 text-xs bg-slate-950 rounded-xl border border-slate-800 font-semibold text-slate-300 outline-none"
          >
            <option value="all">All Categories</option>
            <option value="proof_of_payment">Proof of Payment</option>
            <option value="written_notice">Postal / Notices</option>
            <option value="agreement_contract">Agreements</option>
            <option value="email_chat">Email / Chat</option>
            <option value="id_proof">Identity</option>
          </select>
        </div>
      </div>

      {/* Evidence Grid */}
      {filteredEvidence.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvidence.map((evi: EvidenceItem) => (
            <EvidenceCard
              key={evi.id}
              evidence={evi}
              onDelete={(eId: string) => deleteEvidence(eId)}
              onPreview={(item: EvidenceItem) => setPreviewEvidence(item)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Paperclip}
          title="No evidence found"
          description="Upload receipts, notice slips, or agreements to organize your case proof."
        />
      )}

      {/* Preview Modal */}
      <Modal
        isOpen={!!previewEvidence}
        onClose={() => setPreviewEvidence(null)}
        title={previewEvidence?.name}
        description={`Category: ${previewEvidence?.category} • Uploaded ${previewEvidence?.uploadDate}`}
        size="lg"
      >
        {previewEvidence && (
          <div className="space-y-6 text-center">
            {/* Simulated Document Preview Container */}
            <div className="p-10 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center min-h-[260px]">
              <FileText className="w-16 h-16 text-civic-400 mb-3" />
              <div className="font-bold text-white text-sm">{previewEvidence.name}</div>
              <div className="text-xs text-slate-400 mt-1">{previewEvidence.size} • Verified Citizen Record</div>
              {previewEvidence.notes && (
                <div className="mt-4 p-3.5 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300 max-w-md text-left">
                  <span className="font-bold block text-white mb-0.5">Annotation:</span>
                  {previewEvidence.notes}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-500">Stored locally in your browser storage</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPreviewEvidence(null)}
                className="border-slate-700 text-slate-300 hover:text-white"
              >
                Close Preview
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

