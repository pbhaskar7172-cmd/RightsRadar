import { mockCases } from '../data/mockData.js';

const STORAGE_KEY = 'nyaya_cases_vault';

// Initial seed cases formatted according to the complete Case Data Model
const initialSeedCases = mockCases.map((c) => ({
  id: c.id,
  matterNumber: c.matterNumber,
  title: c.title,
  description: c.description,
  domain: c.category,
  category: c.category,
  icon: c.icon,
  status: c.status,
  statusColor: c.statusColor,
  statusBadgeBg: c.statusBadgeBg,
  statusBadgeText: c.statusBadgeText,
  facts: {
    incidentDate: c.createdDate || 'October 2023',
    claimant: c.parties?.claimant || 'Citizen Claimant',
    respondent: c.parties?.respondent || 'Counterparty',
    claimAmount: c.claimedAmount || '$0',
    summary: c.description,
    details: {}
  },
  evidence: (c.documents || []).map((doc, idx) => ({
    id: `ev-${idx + 1}`,
    name: doc.name,
    type: 'pdf',
    size: doc.size,
    date: doc.date,
    verified: true
  })),
  documents: c.documents || [],
  authority: {
    name: c.category === 'Financial Fraud' ? 'Banking Ombudsman / Consumer Forum' : c.category === 'Property Law' ? 'Rent Authority / Small Claims' : 'Dispute Redressal Commission',
    jurisdiction: 'State Jurisdiction',
    applicableLaws: [
      c.category === 'Financial Fraud' ? 'RBI Customer Protection Circular & IT Act 2000' : c.category === 'Property Law' ? 'Tenancy & Housing Act' : 'Consumer Protection Act 2019'
    ]
  },
  deadlines: {
    statutoryDeadline: c.deadline,
    priority: c.priority || 'Medium'
  },
  priority: c.priority || 'Medium',
  deadline: c.deadline || 'In 7 days',
  timeline: (c.timelineSteps || []).map((step, idx) => ({
    id: `step-${idx + 1}`,
    name: step.name,
    status: step.status,
    timestamp: step.status === 'completed' ? 'Verified' : step.status === 'current' ? 'In Progress' : 'Pending'
  })),
  timelineSteps: c.timelineSteps || [
    { name: 'Intake', status: 'completed' },
    { name: 'Review', status: 'current' },
    { name: 'Drafting', status: 'pending' },
    { name: 'Filing', status: 'pending' }
  ],
  activeStep: c.activeStep ?? 1,
  nextAction: c.nextAction,
  nextActionIcon: c.nextActionIcon || 'arrow_forward',
  nextActionButtonText: c.nextActionButtonText || 'Proceed',
  nextActionEnabled: c.nextActionEnabled ?? true,
  progressPercent: c.progressPercent || 33,
  progressStage: c.progressStage || 'In Progress (33%)',
  createdAt: c.createdDate || 'Oct 2023',
  updatedAt: new Date().toISOString(),
  resolution: c.status === 'Resolved' ? {
    isResolved: true,
    resolutionDate: 'Oct 12, 2023',
    settlementAmount: c.claimedAmount,
    outcomeSummary: 'Settlement executed and concluded with full payment release.'
  } : null
}));

// Helper to retrieve cases from localStorage
function getStoredCases() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSeedCases));
      return initialSeedCases;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialSeedCases;
  } catch {
    return initialSeedCases;
  }
}

// Helper to save cases to localStorage
function saveStoredCases(cases) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
  } catch (err) {
    console.error('Failed to persist cases to localStorage:', err);
  }
}

export const caseService = {
  // 1. Get All Cases
  getAllCases: async () => {
    const cases = getStoredCases();
    return Promise.resolve([...cases]);
  },

  getCases: async () => {
    const cases = getStoredCases();
    return Promise.resolve([...cases]);
  },

  // 2. Open / Get Case By ID
  getCaseById: async (id) => {
    const cases = getStoredCases();
    const found = cases.find((c) => c.id === id);
    return Promise.resolve(found || cases[0]);
  },

  // 3. Create Case
  createCase: async (caseInput) => {
    const cases = getStoredCases();
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const newId = caseInput.id || `matter-${randomSuffix}-${String.fromCharCode(65 + (cases.length % 26)).toLowerCase()}`;
    const matterNumber = caseInput.matterNumber || `Matter #${randomSuffix}-${String.fromCharCode(65 + (cases.length % 26))}`;

    const newCase = {
      id: newId,
      matterNumber,
      title: caseInput.title || 'Legal Dispute Assessment',
      description: caseInput.description || 'Dispute matter generated via Nyaya AI Assistant.',
      domain: caseInput.domain || caseInput.category || 'General Civil Dispute',
      category: caseInput.domain || caseInput.category || 'General Civil Dispute',
      icon: caseInput.icon || getDomainIcon(caseInput.domain || caseInput.category),
      status: caseInput.status || 'Collecting Evidence',
      statusColor: caseInput.statusColor || '#f59e0b',
      statusBadgeBg: caseInput.statusBadgeBg || 'bg-surface-variant',
      statusBadgeText: caseInput.statusBadgeText || 'text-on-surface-variant',
      facts: {
        incidentDate: caseInput.facts?.incidentDate || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        claimant: caseInput.facts?.claimant || 'Ananya Sharma',
        respondent: caseInput.facts?.respondent || 'Counterparty Corporation',
        claimAmount: caseInput.facts?.claimAmount || '$1,500',
        summary: caseInput.facts?.summary || caseInput.description || '',
        details: caseInput.facts?.details || {}
      },
      evidence: caseInput.evidence || [],
      documents: caseInput.documents || [
        {
          name: `${(caseInput.title || 'Dispute').replace(/\s+/g, '_')}_Intake_Summary.pdf`,
          size: '640 KB',
          date: 'Just now'
        }
      ],
      authority: {
        name: caseInput.authority?.name || 'Statutory Dispute Redressal Commission',
        jurisdiction: caseInput.authority?.jurisdiction || 'State District Jurisdiction',
        applicableLaws: caseInput.authority?.applicableLaws || ['Consumer Protection Act 2019', 'Applicable Civil Codes']
      },
      deadlines: {
        statutoryDeadline: caseInput.deadlines?.statutoryDeadline || 'In 14 days',
        priority: caseInput.priority || caseInput.deadlines?.priority || 'High'
      },
      priority: caseInput.priority || 'High',
      deadline: caseInput.deadline || 'In 14 days',
      timeline: [
        { id: 'step-1', name: 'Intake', status: 'completed', timestamp: 'Completed' },
        { id: 'step-2', name: 'Review', status: 'current', timestamp: 'In Progress' },
        { id: 'step-3', name: 'Drafting', status: 'pending', timestamp: 'Pending' },
        { id: 'step-4', name: 'Filing', status: 'pending', timestamp: 'Pending' }
      ],
      timelineSteps: [
        { name: 'Intake', status: 'completed' },
        { name: 'Review', status: 'current' },
        { name: 'Drafting', status: 'pending' },
        { name: 'Filing', status: 'pending' }
      ],
      activeStep: 1,
      nextAction: caseInput.nextAction || 'Upload Evidence & Contracts',
      nextActionIcon: caseInput.nextActionIcon || 'upload_file',
      nextActionButtonText: caseInput.nextActionButtonText || 'Upload',
      nextActionEnabled: true,
      progressPercent: 35,
      progressStage: 'Intake verified, gathering evidence (35%)',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      updatedAt: new Date().toISOString(),
      resolution: null
    };

    const updatedCases = [newCase, ...cases];
    saveStoredCases(updatedCases);
    return Promise.resolve(newCase);
  },

  // 4. Update Case
  updateCase: async (id, updates) => {
    const cases = getStoredCases();
    const index = cases.findIndex((c) => c.id === id);
    if (index === -1) return Promise.reject(new Error('Case not found'));

    const updated = {
      ...cases[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    cases[index] = updated;
    saveStoredCases(cases);
    return Promise.resolve(updated);
  },

  // 5. Add Evidence
  addEvidence: async (caseId, evidenceItem) => {
    const cases = getStoredCases();
    const index = cases.findIndex((c) => c.id === caseId);
    if (index === -1) return Promise.reject(new Error('Case not found'));

    const target = cases[index];
    const newEvidence = {
      id: `ev-${Date.now()}`,
      name: evidenceItem.name || 'Uploaded_Evidence.pdf',
      type: evidenceItem.type || 'document',
      size: evidenceItem.size || '1.2 MB',
      date: 'Just now',
      verified: true,
      ...evidenceItem
    };

    target.evidence = [...(target.evidence || []), newEvidence];
    target.documents = [
      ...(target.documents || []),
      { name: newEvidence.name, size: newEvidence.size, date: newEvidence.date }
    ];
    target.updatedAt = new Date().toISOString();

    cases[index] = target;
    saveStoredCases(cases);
    return Promise.resolve(target);
  },

  // 6. Add Document
  addDocument: async (caseId, documentItem) => {
    const cases = getStoredCases();
    const index = cases.findIndex((c) => c.id === caseId);
    if (index === -1) return Promise.reject(new Error('Case not found'));

    const target = cases[index];
    const newDoc = {
      name: documentItem.name || 'Legal_Notice_Draft.pdf',
      size: documentItem.size || '950 KB',
      date: 'Just now',
      ...documentItem
    };
    target.documents = [...(target.documents || []), newDoc];
    target.updatedAt = new Date().toISOString();

    cases[index] = target;
    saveStoredCases(cases);
    return Promise.resolve(target);
  },

  // 7. Update Status
  updateStatus: async (caseId, newStatus) => {
    const cases = getStoredCases();
    const index = cases.findIndex((c) => c.id === caseId);
    if (index === -1) return Promise.reject(new Error('Case not found'));

    const target = cases[index];
    target.status = newStatus;
    target.updatedAt = new Date().toISOString();

    if (newStatus === 'Draft Prepared') {
      target.statusColor = '#000919';
      target.statusBadgeBg = 'bg-primary text-on-primary';
      target.progressPercent = 65;
      target.activeStep = 2;
      target.timelineSteps = [
        { name: 'Intake', status: 'completed' },
        { name: 'Review', status: 'completed' },
        { name: 'Drafting', status: 'current' },
        { name: 'Filing', status: 'pending' }
      ];
    } else if (newStatus === 'Submitted to Authority' || newStatus === 'Tracking') {
      target.statusColor = '#3b82f6';
      target.statusBadgeBg = 'bg-surface-variant';
      target.progressPercent = 80;
      target.activeStep = 3;
      target.timelineSteps = [
        { name: 'Intake', status: 'completed' },
        { name: 'Review', status: 'completed' },
        { name: 'Drafting', status: 'completed' },
        { name: 'Filing', status: 'current' }
      ];
    } else if (newStatus === 'Resolved') {
      target.statusColor = '#10b981';
      target.statusBadgeBg = 'bg-[#10b981]/10 text-[#065f46]';
      target.progressPercent = 100;
      target.activeStep = 4;
      target.timelineSteps = [
        { name: 'Intake', status: 'completed' },
        { name: 'Review', status: 'completed' },
        { name: 'Drafting', status: 'completed' },
        { name: 'Filing', status: 'completed' }
      ];
    }

    cases[index] = target;
    saveStoredCases(cases);
    return Promise.resolve(target);
  },

  // 8. Add Timeline Event
  addTimelineEvent: async (caseId, event) => {
    const cases = getStoredCases();
    const index = cases.findIndex((c) => c.id === caseId);
    if (index === -1) return Promise.reject(new Error('Case not found'));

    const target = cases[index];
    const newEvent = {
      id: `ev-time-${Date.now()}`,
      name: event.name || 'Status Update',
      status: event.status || 'completed',
      timestamp: event.timestamp || 'Just now',
      description: event.description || ''
    };
    target.timeline = [...(target.timeline || []), newEvent];
    target.updatedAt = new Date().toISOString();

    cases[index] = target;
    saveStoredCases(cases);
    return Promise.resolve(target);
  },

  // 9. Set Next Action
  setNextAction: async (caseId, nextAction, actionIcon = 'arrow_forward', buttonText = 'Take Action') => {
    const cases = getStoredCases();
    const index = cases.findIndex((c) => c.id === caseId);
    if (index === -1) return Promise.reject(new Error('Case not found'));

    const target = cases[index];
    target.nextAction = nextAction;
    target.nextActionIcon = actionIcon;
    target.nextActionButtonText = buttonText;
    target.nextActionEnabled = true;
    target.updatedAt = new Date().toISOString();

    cases[index] = target;
    saveStoredCases(cases);
    return Promise.resolve(target);
  },

  // 10. Mark Submitted
  markSubmitted: async (caseId, submissionDetails = {}) => {
    const cases = getStoredCases();
    const index = cases.findIndex((c) => c.id === caseId);
    if (index === -1) return Promise.reject(new Error('Case not found'));

    const target = cases[index];
    target.status = 'Tracking';
    target.statusColor = '#3b82f6';
    target.statusBadgeBg = 'bg-surface-variant';
    target.progressPercent = 80;
    target.progressStage = 'Filed with Authority, awaiting response (80%)';
    target.activeStep = 3;
    target.timelineSteps = [
      { name: 'Intake', status: 'completed' },
      { name: 'Review', status: 'completed' },
      { name: 'Drafting', status: 'completed' },
      { name: 'Filing', status: 'current' }
    ];
    target.nextAction = 'Await Official Response / Compliance Window';
    target.nextActionIcon = 'hourglass_empty';
    target.nextActionButtonText = 'Pending Response';
    target.nextActionEnabled = false;
    target.submissionDetails = {
      submittedAt: new Date().toISOString(),
      authority: target.authority?.name || 'Consumer Dispute Commission',
      filingReference: `FIL-NYA-${Math.floor(100000 + Math.random() * 900000)}`,
      ...submissionDetails
    };
    target.updatedAt = new Date().toISOString();

    cases[index] = target;
    saveStoredCases(cases);
    return Promise.resolve(target);
  },

  // 11. Mark Resolved
  markResolved: async (caseId, resolutionDetails = {}) => {
    const cases = getStoredCases();
    const index = cases.findIndex((c) => c.id === caseId);
    if (index === -1) return Promise.reject(new Error('Case not found'));

    const target = cases[index];
    target.status = 'Resolved';
    target.statusColor = '#10b981';
    target.statusBadgeBg = 'bg-[#10b981]/10 text-[#065f46]';
    target.progressPercent = 100;
    target.progressStage = 'Settlement executed and concluded (100%)';
    target.activeStep = 4;
    target.timelineSteps = [
      { name: 'Intake', status: 'completed' },
      { name: 'Review', status: 'completed' },
      { name: 'Drafting', status: 'completed' },
      { name: 'Filing', status: 'completed' }
    ];
    target.nextAction = 'View Final Resolution Summary';
    target.nextActionIcon = 'history';
    target.nextActionButtonText = 'View History';
    target.nextActionEnabled = true;
    target.resolution = {
      isResolved: true,
      resolutionDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      settlementAmount: target.facts?.claimAmount || '$0',
      outcomeSummary: 'Formal resolution reached with counterparty compliance.',
      ...resolutionDetails
    };
    target.updatedAt = new Date().toISOString();

    cases[index] = target;
    saveStoredCases(cases);
    return Promise.resolve(target);
  }
};

function getDomainIcon(domain = '') {
  const d = domain.toLowerCase();
  if (d.includes('property') || d.includes('tenant') || d.includes('rent')) return 'real_estate_agent';
  if (d.includes('fraud') || d.includes('bank') || d.includes('cyber')) return 'account_balance';
  if (d.includes('consumer') || d.includes('product') || d.includes('refund')) return 'shopping_bag';
  if (d.includes('work') || d.includes('employment') || d.includes('salary')) return 'work';
  if (d.includes('police') || d.includes('crime') || d.includes('theft')) return 'local_police';
  if (d.includes('rti') || d.includes('government') || d.includes('public')) return 'policy';
  return 'gavel';
}
