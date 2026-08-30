export type IssueTypeId = 
  | 'rti' 
  | 'consumer' 
  | 'tenant' 
  | 'workplace' 
  | 'govt_scheme' 
  | 'cyber';

export type CaseStatus = 
  | 'created'
  | 'info_collected'
  | 'action_recommended'
  | 'document_prepared'
  | 'submission_recorded'
  | 'response_pending'
  | 'escalation'
  | 'resolved';

export type DeadlineStatus = 'upcoming' | 'due_soon' | 'overdue' | 'completed';

export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';

export interface IssueTypeConfig {
  id: IssueTypeId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  iconName: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  statutoryTimeframe: string;
  primaryStatute: string;
  sampleProblems: string[];
  intakeQuestions: IntakeQuestion[];
}

export interface IntakeQuestion {
  id: string;
  question: string;
  helpText: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'radio' | 'currency';
  options?: { label: string; value: string; hint?: string }[];
  placeholder?: string;
  required?: boolean;
}

export interface TimelineEvent {
  stepId: CaseStatus;
  label: string;
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
  current?: boolean;
  notes?: string;
  escalationInfo?: {
    appellateTier: string;
    grounds: string;
    escalatedTo: string;
    nextDeadlineDays: number;
  };
}

export interface SubmissionDetails {
  submissionDate: string;
  filingMode: 'online_portal' | 'speed_post' | 'in_person' | 'registered_email';
  acknowledgmentRef: string;
  recipientAuthority: string;
  officialPortalUrl?: string;
  statutoryResponseDeadline: string;
  dispatchProofNote?: string;
  recordedAt: string;
}

export interface CaseItem {
  id: string;
  title: string;
  issueType: IssueTypeId;
  status: CaseStatus;
  priority: PriorityLevel;
  summary: string;
  authorityInvolved: string;
  desiredOutcome: string;
  createdAt: string;
  updatedAt: string;
  incidentDate?: string;
  recommendedAction: string;
  actionRationale: string;
  statutoryRule: string;
  statutoryTimeframe: string;
  confidenceScore: number;
  requiredDocsList: { name: string; description: string; mandatory: boolean }[];
  deadlineDate?: string;
  deadlineDaysRemaining?: number;
  deadlineStatus?: DeadlineStatus;
  submissionDetails?: SubmissionDetails;
  timeline: TimelineEvent[];
  documentIds: string[];
  evidenceIds: string[];
  sourceIds: string[];
}

export interface DocumentItem {
  id: string;
  caseId: string;
  title: string;
  docType: 'formal_notice' | 'application_form' | 'grievance_petition' | 'statutory_appeal' | 'first_appeal';
  issueType: IssueTypeId;
  status: 'draft' | 'ready' | 'submitted';
  content: string;
  authorityName: string;
  authorityAddress?: string;
  applicantName: string;
  applicantAddress?: string;
  applicantPhone?: string;
  applicantEmail?: string;
  statutorySubject: string;
  referenceNumber?: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface EvidenceItem {
  id: string;
  caseId: string;
  name: string;
  size: string;
  fileType: string;
  category: 'proof_of_payment' | 'written_notice' | 'agreement_contract' | 'email_chat' | 'id_proof' | 'other';
  uploadDate: string;
  notes?: string;
  status: 'uploaded' | 'verified';
  previewUrl?: string;
}

export interface SourceItem {
  id: string;
  issueType: IssueTypeId;
  title: string;
  sourceType: 'Statutory Act' | 'Citizen Charter' | 'Appellate Rule' | 'Government Portal' | 'Legal Precedent';
  authority: string;
  citation: string;
  summary: string;
  keyTakeaways: string[];
  officialUrl: string;
  relevanceScore: number;
  sectionCode?: string;
}

export interface DeadlineItem {
  id: string;
  caseId: string;
  caseTitle: string;
  issueType: IssueTypeId;
  title: string;
  statutoryPeriod: string;
  dueDate: string;
  daysRemaining: number;
  status: DeadlineStatus;
  relatedAction: string;
  escalationTarget?: string;
}

export interface NotificationItem {
  id: string;
  caseId?: string;
  title: string;
  message: string;
  type: 'deadline' | 'document' | 'submission' | 'case' | 'escalation';
  read: boolean;
  timestamp: string;
  actionUrl: string;
}

export interface IntakeDraft {
  issueType: IssueTypeId;
  problemSummary: string;
  answers: Record<string, string>;
  incidentDate?: string;
  authorityName?: string;
  desiredOutcome?: string;
  optionalFileName?: string;
  stepIndex: number;
}

export interface FaqItem {
  id: string;
  category: IssueTypeId | 'general';
  question: string;
  answer: string;
  statuteReference?: string;
  actionTip?: string;
}
