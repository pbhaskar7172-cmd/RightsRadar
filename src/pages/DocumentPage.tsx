import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Save, 
  RotateCw, 
  CheckCircle2, 
  Copy, 
  Printer, 
  Send, 
  ArrowLeft, 
  Scale, 
  Sparkles, 
  Check 
} from 'lucide-react';
import { useCivicData } from '../context/CivicDataContext';
import { DOCUMENT_TEMPLATES } from '../data/mockTemplates';
import { Button } from '../components/common/Button';
import { StatusBadge } from '../components/common/StatusBadge';

export const DocumentPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cases, documents, saveDocument } = useCivicData();

  const caseIdParam = searchParams.get('caseId');
  const docIdParam = searchParams.get('docId');

  const activeCase = cases.find(c => c.id === caseIdParam) || cases[0];
  const activeDoc = 
    documents.find(d => d.id === docIdParam) || 
    documents.find(d => d.caseId === activeCase?.id) || 
    documents[0];

  const [content, setContent] = useState(activeDoc?.content || '');
  const [docTitle, setDocTitle] = useState(activeDoc?.title || '');
  const [applicantName, setApplicantName] = useState(activeDoc?.applicantName || 'Citizen Applicant');
  const [authorityName, setAuthorityName] = useState(activeDoc?.authorityName || activeCase?.authorityInvolved || 'Competent Authority');
  const [isSavedToast, setIsSavedToast] = useState(false);
  const [isCopiedToast, setIsCopiedToast] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  useEffect(() => {
    if (activeDoc) {
      setContent(activeDoc.content);
      setDocTitle(activeDoc.title);
      setApplicantName(activeDoc.applicantName);
      setAuthorityName(activeDoc.authorityName);
    }
  }, [activeDoc]);

  if (!activeDoc || !activeCase) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800">No document found</h3>
        <p className="text-xs text-slate-500 mt-1 mb-4">Please select a case to generate formal documents.</p>
        <Button onClick={() => navigate('/cases')}>Go to My Cases</Button>
      </div>
    );
  }

  const handleSave = () => {
    saveDocument({
      id: activeDoc.id,
      title: docTitle,
      content,
      applicantName,
      authorityName,
    });
    setIsSavedToast(true);
    setTimeout(() => setIsSavedToast(false), 2500);
  };

  const handleMarkAsReady = () => {
    saveDocument({
      id: activeDoc.id,
      title: docTitle,
      content,
      applicantName,
      authorityName,
      status: 'ready',
    });
    setIsSavedToast(true);
    setTimeout(() => {
      navigate(`/submission?caseId=${activeCase.id}&docId=${activeDoc.id}`);
    }, 600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setIsCopiedToast(true);
    setTimeout(() => setIsCopiedToast(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    const template = DOCUMENT_TEMPLATES[activeDoc.issueType] || DOCUMENT_TEMPLATES.rti;
    
    setTimeout(() => {
      const regenerated = template.generateContent({
        applicantName,
        authorityName,
        problemSummary: activeCase.summary,
      });
      setContent(regenerated);
      setIsRegenerating(false);
      setIsSavedToast(true);
      setTimeout(() => setIsSavedToast(false), 2500);
    }, 700);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <button
              onClick={() => navigate(`/cases/${activeCase.id}`)}
              className="text-xs text-slate-500 hover:text-civic-600 font-semibold flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Case</span>
            </button>
            <span className="text-slate-300">•</span>
            <StatusBadge issueType={activeDoc.issueType} size="sm" />
            <span className="text-xs text-slate-400 font-mono">v{activeDoc.version}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Document Review & Formal Drafting
          </h1>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCopy}
            leftIcon={isCopiedToast ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          >
            {isCopiedToast ? 'Copied!' : 'Copy Text'}
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handlePrint}
            leftIcon={<Printer className="w-3.5 h-3.5" />}
          >
            Print / PDF
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleRegenerate}
            isLoading={isRegenerating}
            leftIcon={<RotateCw className="w-3.5 h-3.5" />}
          >
            Regenerate
          </Button>

          <Button
            size="sm"
            variant="secondary"
            onClick={handleSave}
            leftIcon={<Save className="w-3.5 h-3.5" />}
          >
            Save Draft
          </Button>

          <Button
            size="sm"
            variant="civic-glow"
            onClick={handleMarkAsReady}
            rightIcon={<Send className="w-3.5 h-3.5" />}
          >
            Mark Ready & Dispatch
          </Button>
        </div>
      </div>

      {/* Toast Banner */}
      {isSavedToast && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center justify-between shadow-xs no-print"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Document changes successfully saved to your local case repository.</span>
          </div>
        </motion.div>
      )}

      {/* Editor & Metadata Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left 3 Cols: Realistic Formal Document Paper */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-elevated p-6 sm:p-10 relative">
            {/* Watermark / Legal Header Stamp */}
            <div className="flex items-start justify-between pb-6 border-b border-slate-200 mb-6">
              <div>
                <input
                  type="text"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="text-lg sm:text-xl font-bold text-slate-900 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-civic-600 outline-none w-full pb-0.5"
                  title="Click to edit document title"
                />
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Reference: {activeDoc.referenceNumber || `#${activeDoc.id}`}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[11px] uppercase font-bold text-civic-700 bg-civic-50 px-2.5 py-1 rounded-md border border-civic-200">
                  Statutory Draft Notice
                </span>
                <span className="block text-[10px] text-slate-400 mt-1">
                  Citizen Legal Notice Format
                </span>
              </div>
            </div>

            {/* Editable Draft Content Textarea */}
            <div className="relative font-mono text-xs sm:text-sm text-slate-800 leading-relaxed">
              <textarea
                rows={22}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 bg-slate-50/50 hover:bg-slate-50 focus:bg-white rounded-2xl border border-slate-200 focus:border-civic-600 focus:ring-4 focus:ring-civic-100 outline-none transition-all resize-y font-mono"
                style={{ minHeight: '480px' }}
              />
            </div>

            {/* Non-Governmental Disclaimer Stamp */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>CivicGuide Draft — Ready to sign and serve via Registered Speed Post / Official Portal</span>
              <span>Confidential Citizen Record</span>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Metadata & Instructions Sidebar */}
        <div className="space-y-6 no-print">
          {/* Metadata Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-subtle space-y-4">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-civic-600" />
              Notice Particulars
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-500 font-medium mb-1">Applicant Name</label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-civic-600 outline-none font-medium text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Opposing Entity / Officer</label>
                <input
                  type="text"
                  value={authorityName}
                  onChange={(e) => setAuthorityName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:border-civic-600 outline-none font-medium text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Statutory Filing Advice */}
          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              Serving Instructions
            </h4>
            <ul className="space-y-2 text-xs text-blue-900/90 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="font-bold">1.</span>
                <span>Print or export this notice, sign physically, and attach photocopies of supporting invoices/IDs.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">2.</span>
                <span>Send via <strong>Registered Speed Post with AD</strong> or upload to the official ministry/company portal.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">3.</span>
                <span>Keep the postal receipt barcode to record your statutory submission timestamp.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
