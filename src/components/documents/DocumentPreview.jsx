import React, { useState } from 'react';

export default function DocumentPreview({ documentData, appliedRevision = false }) {
  const [zoomLevel, setZoomLevel] = useState(100);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 150));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 70));
  };

  const doc = documentData || {
    title: "Legal Notice Draft",
    date: "October 24, 2023",
    refNumber: "Ref: NY-AI-2023-894",
    recipient: {
      company: "Global Tech Solutions Ltd.",
      address: "450 Innovation Drive, Suite 300\nSan Francisco, CA 94105"
    },
    subject: "Subject: Formal Notice Regarding Breach of Contract and Demand for Refund",
    contractDate: "January 15, 2023",
    missedMilestone: "Beta Release scheduled for August 1, 2023",
    demandAmount: "$150,000 USD",
    deadlineDays: "14 business days",
    deadlineDate: "November 7, 2023"
  };

  return (
    <div className="lg:col-span-8 flex flex-col bg-surface-container-lowest rounded-xl shadow-lg relative overflow-hidden transition-all duration-300">
      {/* Document Header Controls */}
      <div className="flex items-center justify-between p-stack-md bg-surface-container/50 border-b border-surface-variant/40">
        <div className="flex items-center gap-stack-sm">
          <span className="material-symbols-outlined text-primary text-[24px]">
            description
          </span>
          <h2 className="font-title-lg text-title-lg text-on-surface font-semibold">
            {doc.title}
          </h2>
        </div>

        <div className="flex items-center gap-unit">
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors"
            title="Zoom Out"
          >
            <span className="material-symbols-outlined text-[20px]">zoom_out</span>
          </button>
          <span className="font-label-md text-label-md text-on-surface-variant w-12 text-center">
            {zoomLevel}%
          </span>
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant text-on-surface-variant transition-colors"
            title="Zoom In"
          >
            <span className="material-symbols-outlined text-[20px]">zoom_in</span>
          </button>
        </div>
      </div>

      {/* Document Content (Scrollable Canvas) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-stack-lg bg-[#FDFCF8] relative">
        <div
          id="printable-document"
          style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center', transition: 'transform 0.2s ease' }}
          className="max-w-[800px] mx-auto bg-white shadow-sm p-[32px] sm:p-[48px] md:p-[96px] min-h-[1056px] relative text-[#2B2B2B]"
        >
          {/* Faint Watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
            <span className="font-display-lg text-[120px] tracking-widest uppercase rotate-[-45deg] select-none text-primary">
              DRAFT
            </span>
          </div>

          {/* Letterhead */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-stack-lg border-b border-surface-variant pb-stack-md">
            <div>
              {doc.authority?.name && (
                <div className="text-left">
                  <p className="font-label-md text-caption uppercase tracking-wider text-primary font-bold">
                    Competent Redressal Forum / Authority
                  </p>
                  <p className="font-body-md text-sm font-semibold text-on-surface">
                    {doc.authority.name}
                  </p>
                  {doc.authority.jurisdiction && (
                    <p className="text-caption text-on-surface-variant">
                      Jurisdiction: {doc.authority.jurisdiction}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="text-left sm:text-right">
              <p className="font-label-md text-label-md text-on-surface-variant tracking-wider uppercase mb-1 font-bold">
                {doc.documentType || 'Notice of Claim'}
              </p>
              <p className="font-body-md text-caption text-on-surface-variant">
                Date: {doc.date}
              </p>
              <p className="font-body-md text-caption text-on-surface-variant font-mono">
                {doc.refNumber}
              </p>
            </div>
          </div>

          {/* Addressee */}
          <div className="mb-stack-md font-body-md text-body-md leading-relaxed text-on-surface">
            <p>
              <strong>To:</strong>
              <br />
              {doc.recipient?.company || 'Counterparty Legal Dept.'}
              <br />
              {doc.recipient?.address ? (
                doc.recipient.address.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))
              ) : (
                <>Official Registered Address<br /></>
              )}
            </p>
          </div>

          {/* Subject */}
          <div className="mb-stack-md">
            <p className="font-label-md text-label-md uppercase tracking-wider text-primary border-l-2 border-primary pl-4">
              <strong>Subject: {doc.subject?.replace(/^Subject:\s*/, '') || 'Formal Legal Notice and Demand for Remedy'}</strong>
            </p>
          </div>

          {/* Body */}
          <div className="space-y-6 font-body-md text-body-md leading-[1.8] text-on-surface">
            <p>Dear Sir/Madam,</p>
            <p>
              This formal legal representation is submitted on behalf of <strong>{doc.sender?.name || 'Claimant'}</strong>, regarding the matter set forth below.
            </p>
            <p>
              <strong>1. Factual Summary:</strong> {doc.factsSummary || doc.missedMilestone || 'The factual sequence demonstrates non-compliance with applicable statutory and contractual terms.'}
            </p>

            {/* Structured Grounds */}
            {doc.grounds && doc.grounds.length > 0 && (
              <div>
                <p className="font-semibold mb-2"><strong>2. Grounds & Legal Basis:</strong></p>
                <ol className="list-decimal pl-6 space-y-1 text-sm">
                  {doc.grounds.map((ground, idx) => (
                    <li key={idx}>{ground}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* AI Highlighted Demand Clause / Prayer */}
            <div className="relative group p-3 rounded-lg bg-surface-container-low border border-outline-variant/30">
              <div className="flex items-center gap-1.5 mb-1 text-primary">
                <span className="material-symbols-outlined text-[16px]">gavel</span>
                <span className="font-label-md text-caption uppercase tracking-wider font-bold">
                  3. Specific Relief Claimed / Demand
                </span>
              </div>
              <p className="relative font-medium text-on-surface">
                {appliedRevision ? (
                  <span className="bg-primary/10 px-1 py-0.5 rounded border-b border-primary">
                    {doc.prayer || `We hereby demand immediate compliance and refund of ${doc.demandAmount || '$1,500 USD'}`} payable no later than <strong>{doc.deadlineDate || 'within 14 business days'} ({doc.deadlineDays || '14 business days'} from receipt)</strong>.
                  </span>
                ) : (
                  doc.prayer || `We hereby demand an immediate full resolution and payment of ${doc.demandAmount || '$1,500 USD'} within ${doc.deadlineDays || '14 business days'} of this notice.`
                )}
              </p>
            </div>

            <p>
              Failure to provide compliance within the statutory timeline will compel the undersigned to initiate formal legal remedies before the competent judicial/statutory authority at your sole risk and costs.
            </p>

            {/* Attachments list */}
            {doc.attachments && doc.attachments.length > 0 && (
              <div className="pt-2">
                <p className="font-semibold text-xs text-on-surface-variant uppercase tracking-wider mb-1">
                  List of Annexures / Attached Documents:
                </p>
                <ul className="list-disc pl-5 text-xs text-on-surface-variant space-y-0.5">
                  {doc.attachments.map((att, idx) => (
                    <li key={idx}>{att}</li>
                  ))}
                </ul>
              </div>
            )}

            <p>We anticipate your prompt response.</p>
          </div>

          {/* Signature */}
          <div className="mt-stack-lg pt-stack-lg border-t border-surface-variant/40 flex justify-between items-end">
            <div>
              <p className="font-body-md text-caption text-on-surface">Sincerely / Complainant,</p>
              <div className="h-10 mt-2 w-44 border-b border-dashed border-surface-variant mb-1"></div>
              <p className="font-label-md text-label-md font-bold text-on-surface">
                {doc.signature?.name || doc.sender?.name || 'Citizen Claimant'}
              </p>
              <p className="font-body-md text-caption text-on-surface-variant">
                {doc.signature?.role || 'Aggrieved Party / Complainant'}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-on-surface-variant bg-surface-container-low px-2 py-1 rounded">
                Drafted via Nyaya AI Template Engine
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
