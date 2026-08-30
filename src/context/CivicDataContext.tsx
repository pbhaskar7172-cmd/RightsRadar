import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  CaseItem, 
  DocumentItem, 
  EvidenceItem, 
  NotificationItem, 
  IntakeDraft, 
  IssueTypeId, 
  SubmissionDetails,
  CaseStatus,
  DeadlineStatus
} from '../types';
import { INITIAL_CASES, INITIAL_DOCUMENTS, INITIAL_EVIDENCE } from '../data/mockCases';
import { INITIAL_NOTIFICATIONS } from '../data/mockNotifications';
import { ISSUE_TYPES } from '../data/issueTypes';
import { DOCUMENT_TEMPLATES } from '../data/mockTemplates';

interface CivicDataContextType {
  cases: CaseItem[];
  documents: DocumentItem[];
  evidence: EvidenceItem[];
  notifications: NotificationItem[];
  currentDraft: IntakeDraft | null;
  unreadCount: number;
  
  // Draft Management
  startNewDraft: (issueType: IssueTypeId, problemSummary?: string, optionalFileName?: string) => IntakeDraft;
  updateDraft: (updates: Partial<IntakeDraft>) => void;
  clearDraft: () => void;
  createCaseFromDraft: (customApplicant?: { name?: string; address?: string; phone?: string; email?: string }) => { newCase: CaseItem; newDoc: DocumentItem };
  
  // Case Actions
  getCaseById: (id: string) => CaseItem | undefined;
  updateCase: (caseId: string, updates: Partial<CaseItem>) => void;
  deleteCase: (caseId: string) => void;
  advanceTimelineStep: (caseId: string, targetStep: CaseStatus, note?: string) => void;
  escalateCase: (caseId: string, escalationDetails: { appellateTier: string; grounds: string; escalatedTo: string; nextDeadlineDays: number }) => void;
  markCaseResolved: (caseId: string, resolutionNotes?: string) => void;
  
  // Document Actions
  getDocumentById: (id: string) => DocumentItem | undefined;
  getDocumentsByCaseId: (caseId: string) => DocumentItem[];
  saveDocument: (doc: Partial<DocumentItem> & { id: string }) => void;
  createDocumentForCase: (caseId: string, customTitle?: string) => DocumentItem;
  
  // Evidence Actions
  getEvidenceByCaseId: (caseId: string) => EvidenceItem[];
  addEvidence: (item: { caseId: string; name: string; size: string; fileType: string; category: any; notes?: string }) => EvidenceItem;
  deleteEvidence: (id: string) => void;
  
  // Submission Actions
  recordSubmission: (caseId: string, details: SubmissionDetails) => void;
  
  // Notifications
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Reset
  resetToDefaults: () => void;
}

const STORAGE_KEYS = {
  CASES: 'civicguide_cases_v1',
  DOCUMENTS: 'civicguide_docs_v1',
  EVIDENCE: 'civicguide_evidence_v1',
  NOTIFICATIONS: 'civicguide_notifs_v1',
  DRAFT: 'civicguide_draft_v1',
};

const CivicDataContext = createContext<CivicDataContextType | undefined>(undefined);

export const CivicDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<CaseItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CASES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_CASES;
  });

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_DOCUMENTS;
  });

  const [evidence, setEvidence] = useState<EvidenceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EVIDENCE);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_EVIDENCE;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_NOTIFICATIONS;
  });

  const [currentDraft, setCurrentDraft] = useState<IntakeDraft | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DRAFT);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return null;
  });

  // Sync with LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases));
  }, [cases]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EVIDENCE, JSON.stringify(evidence));
  }, [evidence]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    if (currentDraft) {
      localStorage.setItem(STORAGE_KEYS.DRAFT, JSON.stringify(currentDraft));
    } else {
      localStorage.removeItem(STORAGE_KEYS.DRAFT);
    }
  }, [currentDraft]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Draft handlers
  const startNewDraft = (issueType: IssueTypeId, problemSummary = '', optionalFileName = '') => {
    const draft: IntakeDraft = {
      issueType,
      problemSummary,
      optionalFileName,
      answers: {},
      stepIndex: 0
    };
    setCurrentDraft(draft);
    return draft;
  };

  const updateDraft = (updates: Partial<IntakeDraft>) => {
    setCurrentDraft(prev => {
      if (!prev) return null;
      return {
        ...prev,
        ...updates,
        answers: {
          ...prev.answers,
          ...(updates.answers || {})
        }
      };
    });
  };

  const clearDraft = () => {
    setCurrentDraft(null);
  };

  const createCaseFromDraft = (customApplicant?: { name?: string; address?: string; phone?: string; email?: string }) => {
    const draft = currentDraft || {
      issueType: 'rti' as IssueTypeId,
      problemSummary: 'Citizen inquiry regarding public project delays and budget allocation.',
      answers: {},
      stepIndex: 0
    };

    const typeConfig = ISSUE_TYPES[draft.issueType];
    const template = DOCUMENT_TEMPLATES[draft.issueType];
    const caseId = `case-${draft.issueType}-${Date.now().toString().slice(-4)}`;
    const docId = `doc-${Date.now().toString().slice(-4)}`;

    const applicantName = customApplicant?.name || 'Citizen Applicant';
    const applicantAddress = customApplicant?.address || '12-A, Civic Enclave, City - 110001';
    const applicantPhone = customApplicant?.phone || '+91 98765 43210';
    const applicantEmail = customApplicant?.email || 'citizen@email.com';

    // Authority derivation from answers
    const authorityInvolved = 
      draft.answers['authority_name'] || 
      draft.answers['company_name'] || 
      draft.answers['landlord_name'] || 
      draft.answers['employer_name'] || 
      draft.answers['department_office'] || 
      'Competent Public Authority / Nodal Officer';

    // Desired outcome derivation
    const desiredOutcome = 
      draft.answers['remedy_sought'] || 
      draft.answers['dues_claimed'] || 
      draft.answers['dispute_nature'] || 
      'Complete statutory resolution and compliance under law';

    // Build timeline
    const nowStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const timeline = [
      {
        stepId: 'created' as CaseStatus,
        label: 'Case Created',
        title: 'Case Initiated by Citizen',
        description: `Case drafted for ${typeConfig.name} issue.`,
        timestamp: nowStr,
        completed: true
      },
      {
        stepId: 'info_collected' as CaseStatus,
        label: 'Information Collected',
        title: 'AI Intake Diagnostic Processed',
        description: 'Captured domain particulars, involved authority, and citizen objectives.',
        timestamp: nowStr,
        completed: true
      },
      {
        stepId: 'action_recommended' as CaseStatus,
        label: 'Action Recommended',
        title: 'ActionRadar Diagnostics Completed',
        description: `Recommended statutory remedy: ${template.title}`,
        timestamp: nowStr,
        completed: true,
        current: true
      },
      {
        stepId: 'document_prepared' as CaseStatus,
        label: 'Document Prepared',
        title: 'Legal Draft Generated',
        description: 'Structured formal document ready for review and customization.',
        timestamp: 'Next Step',
        completed: false
      },
      {
        stepId: 'submission_recorded' as CaseStatus,
        label: 'Submission Recorded',
        title: 'Dispatch & Acknowledgment',
        description: 'Record Speed Post tracking or online portal confirmation.',
        timestamp: 'Pending Dispatch',
        completed: false
      },
      {
        stepId: 'response_pending' as CaseStatus,
        label: 'Response Pending',
        title: 'Statutory Response Window',
        description: `Statutory period: ${typeConfig.statutoryTimeframe}`,
        timestamp: 'Pending',
        completed: false
      },
      {
        stepId: 'escalation' as CaseStatus,
        label: 'Escalation',
        title: 'First Appeal / Tribunal Tier',
        description: 'Higher forum escalation available if deadline expires without resolution.',
        timestamp: 'Available if needed',
        completed: false
      },
      {
        stepId: 'resolved' as CaseStatus,
        label: 'Resolved',
        title: 'Resolution Finalized',
        description: 'Mark closed once relief or certified records are delivered.',
        timestamp: 'Pending',
        completed: false
      }
    ];

    // Determine deadlines based on domain
    const deadlineDaysMap: Record<IssueTypeId, number> = {
      rti: 30,
      consumer: 15,
      tenant: 15,
      workplace: 15,
      govt_scheme: 21,
      cyber: 7
    };
    const days = deadlineDaysMap[draft.issueType] || 30;
    const deadlineDateObj = new Date();
    deadlineDateObj.setDate(deadlineDateObj.getDate() + days);
    const deadlineDate = deadlineDateObj.toISOString().split('T')[0];

    // Required docs list
    const docsListMap: Record<IssueTypeId, { name: string; description: string; mandatory: boolean }[]> = {
      rti: [
        { name: 'Identity Proof (Aadhaar / Voter ID)', description: 'Proof of Indian citizenship', mandatory: true },
        { name: 'Application Fee Receipt (₹10)', description: 'Postal Order or digital payment receipt', mandatory: true },
        { name: 'Prior Application Reference (if appeal)', description: 'First RTI acknowledgment', mandatory: false }
      ],
      consumer: [
        { name: 'Tax Invoice / Cash Receipt', description: 'Proof of purchase and monetary value', mandatory: true },
        { name: 'Warranty Card / Terms Sheet', description: 'Contractual terms of warranty', mandatory: true },
        { name: 'Customer Support Communication', description: 'Emails, chat transcripts or ticket IDs', mandatory: false }
      ],
      tenant: [
        { name: 'Signed Lease Agreement', description: 'Notarized or registered tenancy deed', mandatory: true },
        { name: 'Security Deposit Bank Transfer Proof', description: 'Original bank payment record', mandatory: true },
        { name: 'Move-out Inspection Handover Log', description: 'Video or signed key handover slip', mandatory: false }
      ],
      workplace: [
        { name: 'Appointment Letter / Contract', description: 'Proof of employment and salary terms', mandatory: true },
        { name: 'Last 3 Months Salary Slips', description: 'Proof of earnings and deductions', mandatory: true },
        { name: 'Resignation Acceptance & Clearance', description: 'Written notice and HR email signoff', mandatory: true }
      ],
      govt_scheme: [
        { name: 'Beneficiary Registration Card', description: 'Official scheme enrollment number', mandatory: true },
        { name: 'Aadhaar Card with DBT Seeding', description: 'Verified identity and bank linkage', mandatory: true },
        { name: 'Bank Account Passbook Copy', description: 'Proof of bank details for fund credit', mandatory: true }
      ],
      cyber: [
        { name: 'Bank Statement of Fraudulent Debit', description: 'Certified bank transaction statement', mandatory: true },
        { name: 'NCRP / 1930 Helpline Ticket', description: 'National Cybercrime Portal ref', mandatory: true },
        { name: 'Screenshots of Scam Chats / Links', description: 'Phishing SMS and message evidence', mandatory: true }
      ]
    };

    const newCase: CaseItem = {
      id: caseId,
      title: `${typeConfig.shortName}: ${draft.problemSummary.slice(0, 50)}${draft.problemSummary.length > 50 ? '...' : ''}`,
      issueType: draft.issueType,
      status: 'action_recommended',
      priority: draft.issueType === 'cyber' || draft.issueType === 'workplace' ? 'high' : 'medium',
      summary: draft.problemSummary,
      authorityInvolved,
      desiredOutcome,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      recommendedAction: `Serve ${template.title}`,
      actionRationale: `Based on your diagnostic inputs, serving a statutory notice establishes indisputable legal proof under ${typeConfig.primaryStatute} and activates the mandatory statutory timeline.`,
      statutoryRule: typeConfig.primaryStatute,
      statutoryTimeframe: typeConfig.statutoryTimeframe,
      confidenceScore: 95,
      requiredDocsList: docsListMap[draft.issueType] || [],
      deadlineDate,
      deadlineDaysRemaining: days,
      deadlineStatus: 'upcoming',
      timeline,
      documentIds: [docId],
      evidenceIds: [],
      sourceIds: []
    };

    // Generate initial document
    const generatedContent = template.generateContent({
      applicantName,
      applicantAddress,
      applicantPhone,
      applicantEmail,
      authorityName: authorityInvolved,
      problemSummary: draft.problemSummary,
      answers: draft.answers,
    });

    const newDoc: DocumentItem = {
      id: docId,
      caseId: caseId,
      title: template.title,
      docType: template.docType,
      issueType: draft.issueType,
      status: 'draft',
      content: generatedContent,
      authorityName: authorityInvolved,
      applicantName,
      applicantAddress,
      applicantPhone,
      applicantEmail,
      statutorySubject: template.subject,
      referenceNumber: `CG/${draft.issueType.toUpperCase()}/${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1
    };

    // If optional file was uploaded in start case, register it as evidence
    if (draft.optionalFileName) {
      const eviId = `evi-${Date.now().toString().slice(-4)}`;
      const newEvi: EvidenceItem = {
        id: eviId,
        caseId: caseId,
        name: draft.optionalFileName,
        size: '1.8 MB',
        fileType: 'Document Attachment',
        category: 'written_notice',
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'verified',
        notes: 'Attached during initial case intake'
      };
      setEvidence(prev => [newEvi, ...prev]);
      newCase.evidenceIds = [eviId];
    }

    setCases(prev => [newCase, ...prev]);
    setDocuments(prev => [newDoc, ...prev]);

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now().toString().slice(-4)}`,
      caseId: caseId,
      title: `ActionRadar Diagnostics for ${newCase.title}`,
      message: `Action plan finalized. Document "${newDoc.title}" is generated and ready for your review.`,
      type: 'case',
      read: false,
      timestamp: 'Just now',
      actionUrl: `/cases/${caseId}`
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Clear active draft
    clearDraft();

    return { newCase, newDoc };
  };

  const getCaseById = (id: string) => cases.find(c => c.id === id);

  const updateCase = (caseId: string, updates: Partial<CaseItem>) => {
    setCases(prev => prev.map(c => c.id === caseId ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c));
  };

  const deleteCase = (caseId: string) => {
    setCases(prev => prev.filter(c => c.id !== caseId));
    setDocuments(prev => prev.filter(d => d.caseId !== caseId));
    setEvidence(prev => prev.filter(e => e.caseId !== caseId));
  };

  const advanceTimelineStep = (caseId: string, targetStep: CaseStatus, note?: string) => {
    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      const nowStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      
      const stepOrder: CaseStatus[] = [
        'created',
        'info_collected',
        'action_recommended',
        'document_prepared',
        'submission_recorded',
        'response_pending',
        'escalation',
        'resolved'
      ];

      const targetIdx = stepOrder.indexOf(targetStep);
      const updatedTimeline = c.timeline.map((event, idx) => {
        if (idx < targetIdx) {
          return { ...event, completed: true, current: false };
        } else if (idx === targetIdx) {
          return { ...event, completed: targetStep === 'resolved', current: targetStep !== 'resolved', timestamp: nowStr, notes: note || event.notes };
        } else {
          return { ...event, completed: false, current: false };
        }
      });

      return {
        ...c,
        status: targetStep,
        timeline: updatedTimeline,
        updatedAt: new Date().toISOString()
      };
    }));
  };

  const escalateCase = (caseId: string, escalationDetails: { appellateTier: string; grounds: string; escalatedTo: string; nextDeadlineDays: number }) => {
    setCases(prev => prev.map(c => {
      if (c.id !== caseId) return c;
      const nowStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      const nextDeadlineObj = new Date();
      nextDeadlineObj.setDate(nextDeadlineObj.getDate() + escalationDetails.nextDeadlineDays);

      const updatedTimeline = c.timeline.map(t => {
        if (t.stepId === 'escalation') {
          return {
            ...t,
            completed: true,
            current: true,
            timestamp: nowStr,
            title: `Escalated to ${escalationDetails.appellateTier}`,
            description: `Grounds: ${escalationDetails.grounds}. Escalated authority: ${escalationDetails.escalatedTo}.`,
            escalationInfo: escalationDetails
          };
        }
        return t;
      });

      return {
        ...c,
        status: 'escalation',
        priority: 'urgent',
        deadlineDate: nextDeadlineObj.toISOString().split('T')[0],
        deadlineDaysRemaining: escalationDetails.nextDeadlineDays,
        deadlineStatus: 'upcoming',
        timeline: updatedTimeline,
        updatedAt: new Date().toISOString()
      };
    }));

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now().toString().slice(-4)}`,
      caseId,
      title: `Escalation Triggered for Case #${caseId}`,
      message: `Case escalated to ${escalationDetails.appellateTier}. Response countdown set to ${escalationDetails.nextDeadlineDays} days.`,
      type: 'escalation',
      read: false,
      timestamp: 'Just now',
      actionUrl: `/cases/${caseId}`
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markCaseResolved = (caseId: string, resolutionNotes = 'Case successfully resolved with full remedy / certified disclosure delivered.') => {
    advanceTimelineStep(caseId, 'resolved', resolutionNotes);
    
    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now().toString().slice(-4)}`,
      caseId,
      title: `Case #${caseId} Marked Resolved 🎉`,
      message: `Resolution recorded: ${resolutionNotes}`,
      type: 'case',
      read: false,
      timestamp: 'Just now',
      actionUrl: `/cases/${caseId}`
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Document actions
  const getDocumentById = (id: string) => documents.find(d => d.id === id);

  const getDocumentsByCaseId = (caseId: string) => documents.filter(d => d.caseId === caseId);

  const saveDocument = (doc: Partial<DocumentItem> & { id: string }) => {
    setDocuments(prev => prev.map(d => {
      if (d.id === doc.id) {
        return {
          ...d,
          ...doc,
          updatedAt: new Date().toISOString(),
          version: d.version + 1
        };
      }
      return d;
    }));

    // If status changed to ready, also check if case should advance to document_prepared
    if (doc.status === 'ready' && doc.caseId) {
      advanceTimelineStep(doc.caseId, 'document_prepared');
    }
  };

  const createDocumentForCase = (caseId: string, customTitle?: string) => {
    const parentCase = cases.find(c => c.id === caseId);
    const template = parentCase ? DOCUMENT_TEMPLATES[parentCase.issueType] : DOCUMENT_TEMPLATES.rti;
    const docId = `doc-${Date.now().toString().slice(-4)}`;

    const newDoc: DocumentItem = {
      id: docId,
      caseId,
      title: customTitle || `${template.title} (Revision)`,
      docType: template.docType,
      issueType: parentCase ? parentCase.issueType : 'rti',
      status: 'draft',
      content: template.generateContent({
        applicantName: 'Citizen Applicant',
        authorityName: parentCase?.authorityInvolved || 'Competent Authority',
        problemSummary: parentCase?.summary || 'Grievance matter',
      }),
      authorityName: parentCase?.authorityInvolved || 'Competent Authority',
      applicantName: 'Citizen Applicant',
      statutorySubject: template.subject,
      referenceNumber: `CG/${docId.toUpperCase()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1
    };

    setDocuments(prev => [newDoc, ...prev]);
    if (parentCase) {
      updateCase(caseId, {
        documentIds: [...parentCase.documentIds, docId]
      });
    }

    return newDoc;
  };

  // Evidence Actions
  const getEvidenceByCaseId = (caseId: string) => evidence.filter(e => e.caseId === caseId);

  const addEvidence = (item: { caseId: string; name: string; size: string; fileType: string; category: any; notes?: string }) => {
    const newEvi: EvidenceItem = {
      id: `evi-${Date.now().toString().slice(-4)}`,
      caseId: item.caseId,
      name: item.name,
      size: item.size,
      fileType: item.fileType,
      category: item.category,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'verified',
      notes: item.notes || 'Uploaded by citizen'
    };

    setEvidence(prev => [newEvi, ...prev]);
    
    // Attach to case
    const targetCase = cases.find(c => c.id === item.caseId);
    if (targetCase) {
      updateCase(item.caseId, {
        evidenceIds: [...targetCase.evidenceIds, newEvi.id]
      });
    }

    return newEvi;
  };

  const deleteEvidence = (id: string) => {
    setEvidence(prev => prev.filter(e => e.id !== id));
    setCases(prev => prev.map(c => ({
      ...c,
      evidenceIds: c.evidenceIds.filter(eId => eId !== id)
    })));
  };

  // Submission actions
  const recordSubmission = (caseId: string, details: SubmissionDetails) => {
    const targetCase = cases.find(c => c.id === caseId);
    if (!targetCase) return;

    // Calculate days remaining
    const dueDate = new Date(details.statutoryResponseDeadline);
    const today = new Date();
    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    let deadlineStatus: DeadlineStatus = 'upcoming';
    if (diffDays <= 3) deadlineStatus = 'due_soon';
    if (diffDays === 0) deadlineStatus = 'overdue';

    // Update documents to 'submitted'
    setDocuments(prev => prev.map(d => d.caseId === caseId ? { ...d, status: 'submitted' } : d));

    // Update case
    updateCase(caseId, {
      submissionDetails: details,
      deadlineDate: details.statutoryResponseDeadline,
      deadlineDaysRemaining: diffDays,
      deadlineStatus,
      status: 'response_pending'
    });

    // Advance timeline to response_pending
    advanceTimelineStep(
      caseId, 
      'response_pending', 
      `Submission recorded via ${details.filingMode.replace('_', ' ').toUpperCase()} (Ref #${details.acknowledgmentRef}). Response deadline: ${details.statutoryResponseDeadline}.`
    );

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now().toString().slice(-4)}`,
      caseId,
      title: `Submission Recorded for ${targetCase.title}`,
      message: `Filing reference #${details.acknowledgmentRef} recorded. 30-day response countdown is active until ${details.statutoryResponseDeadline}.`,
      type: 'submission',
      read: false,
      timestamp: 'Just now',
      actionUrl: `/cases/${caseId}`
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Notification actions
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setCases(INITIAL_CASES);
    setDocuments(INITIAL_DOCUMENTS);
    setEvidence(INITIAL_EVIDENCE);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCurrentDraft(null);
    localStorage.removeItem(STORAGE_KEYS.CASES);
    localStorage.removeItem(STORAGE_KEYS.DOCUMENTS);
    localStorage.removeItem(STORAGE_KEYS.EVIDENCE);
    localStorage.removeItem(STORAGE_KEYS.NOTIFICATIONS);
    localStorage.removeItem(STORAGE_KEYS.DRAFT);
  };

  return (
    <CivicDataContext.Provider value={{
      cases,
      documents,
      evidence,
      notifications,
      currentDraft,
      unreadCount,
      startNewDraft,
      updateDraft,
      clearDraft,
      createCaseFromDraft,
      getCaseById,
      updateCase,
      deleteCase,
      advanceTimelineStep,
      escalateCase,
      markCaseResolved,
      getDocumentById,
      getDocumentsByCaseId,
      saveDocument,
      createDocumentForCase,
      getEvidenceByCaseId,
      addEvidence,
      deleteEvidence,
      recordSubmission,
      markNotificationRead,
      markAllNotificationsRead,
      resetToDefaults,
    }}>
      {children}
    </CivicDataContext.Provider>
  );
};

export const useCivicData = () => {
  const context = useContext(CivicDataContext);
  if (!context) {
    throw new Error('useCivicData must be used within a CivicDataProvider');
  }
  return context;
};
