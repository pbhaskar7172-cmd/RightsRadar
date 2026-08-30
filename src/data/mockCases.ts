import { CaseItem, DocumentItem, EvidenceItem } from '../types';

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-001',
    caseId: 'case-rti-101',
    title: 'RTI Application — Municipal Road Tender Records',
    docType: 'application_form',
    issueType: 'rti',
    status: 'submitted',
    authorityName: 'Public Information Officer, Municipal Corporation',
    authorityAddress: 'Municipal Corporation Headquarters, Civic Center, New Delhi',
    applicantName: 'Vikram Mehta',
    applicantAddress: 'B-14, Green Park Extension, New Delhi - 110016',
    applicantPhone: '+91 98110 54321',
    applicantEmail: 'vikram.m@email.com',
    statutorySubject: 'Application seeking information under Section 6(1) of RTI Act 2005 for Ward 42 Road Repair Contracts',
    referenceNumber: 'MCD/RTI/2024/09842',
    content: `To,\nThe Central Public Information Officer,\nMunicipal Corporation of Delhi (South Zone),\n\nDate: 12 August 2024\n\nSUBJECT: Application seeking information under Section 6(1) of the RTI Act, 2005.\n\nRespected Sir,\n\nPlease provide certified copies of the following:\n1. Sanctioned tender estimate & work completion certificates for road resurfacing in Ward 42 during FY 2023-24.\n2. Quality assurance laboratory test reports for bituminous mix used.\n3. Details of penalties levied on contractor M/s Roadways Infra.\n\nFee of ₹10/- attached via Postal Order #49F8921.\n\nYours faithfully,\nVikram Mehta`,
    createdAt: '2024-08-12T10:30:00Z',
    updatedAt: '2024-08-12T11:00:00Z',
    version: 1
  },
  {
    id: 'doc-002',
    caseId: 'case-cons-202',
    title: 'Legal Notice — Warranty Refusal on Defective Laptop',
    docType: 'formal_notice',
    issueType: 'consumer',
    status: 'ready',
    authorityName: 'Zenith Tech India Pvt. Ltd. & SmartRetail',
    authorityAddress: 'Level 4, Cyber City, Gurugram, Haryana - 122002',
    applicantName: 'Pooja Sharma',
    applicantAddress: 'Flat 804, Tower 3, Palm Residency, Gurugram',
    applicantPhone: '+91 98711 22334',
    applicantEmail: 'pooja.sharma@email.com',
    statutorySubject: 'Statutory Pre-Litigation Legal Notice under Section 35 of Consumer Protection Act, 2019 for Defective Motherboard & Warranty Refusal',
    referenceNumber: 'LN/CPA/2024/8812',
    content: `STATUTORY LEGAL NOTICE UNDER CONSUMER PROTECTION ACT, 2019\n\nTo,\nThe Managing Director,\nZenith Tech India Pvt. Ltd.\n\nDate: 22 August 2024\n\nSubject: Deficiency in service and unfair trade practice regarding Laptop Serial #ZT-9941.\n\nSir,\nMy client purchased Zenith UltraBook for ₹84,999 on 15 May 2024. Within 90 days, motherboard failed. Authorized service center acknowledged hardware failure but falsely claimed physical damage to avoid warranty replacement.\n\nYou are hereby called upon to refund ₹84,999 with 12% interest and ₹20,000 compensation within 15 days, failing which complaint will be filed before District Consumer Disputes Redressal Commission.\n\nYours sincerely,\nPooja Sharma`,
    createdAt: '2024-08-22T14:15:00Z',
    updatedAt: '2024-08-23T09:30:00Z',
    version: 2
  },
  {
    id: 'doc-003',
    caseId: 'case-ten-303',
    title: 'Demand Notice — Security Deposit Refund (₹1,20,000)',
    docType: 'formal_notice',
    issueType: 'tenant',
    status: 'draft',
    authorityName: 'Anil Singhania (Landlord)',
    authorityAddress: 'Villa 12, Lakeview Enclave, Bengaluru, Karnataka',
    applicantName: 'Arjun Nambiar',
    applicantAddress: 'B-302, Prestige Heights, Bengaluru - 560102',
    applicantPhone: '+91 99450 11223',
    applicantEmail: 'arjun.n@email.com',
    statutorySubject: 'Formal Demand Notice under Model Tenancy Principles for Withholding ₹1,20,000 Security Deposit',
    referenceNumber: 'DEMAND/TEN/2024/491',
    content: `FORMAL DEMAND NOTICE FOR SECURITY DEPOSIT REFUND\n\nTo,\nMr. Anil Singhania,\n\nDate: 26 August 2024\n\nSubject: Immediate return of ₹1,20,000 security deposit for Flat 204, Oakwood Apts.\n\nSir,\nI vacated Flat 204 on 31 July 2024 after completing the 11-month lease and 1-month notice. All electricity and maintenance dues were settled. Keys and peaceful possession were handed over.\n\nUnder law, security deposit cannot be withheld arbitrarily without verifiable third-party repair bills. Please transfer ₹1,20,000 within 15 days into SBI Account #3829104819 to avoid Rent Court proceedings.\n\nYours faithfully,\nArjun Nambiar`,
    createdAt: '2024-08-26T16:00:00Z',
    updatedAt: '2024-08-26T16:45:00Z',
    version: 1
  }
];

export const INITIAL_EVIDENCE: EvidenceItem[] = [
  {
    id: 'evi-001',
    caseId: 'case-rti-101',
    name: 'Postal_Receipt_RTI_SpeedPost.pdf',
    size: '1.4 MB',
    fileType: 'PDF Document',
    category: 'written_notice',
    uploadDate: '2024-08-12',
    status: 'verified',
    notes: 'Registered Speed Post acknowledgment receipt with barcode #ED984210985IN'
  },
  {
    id: 'evi-002',
    caseId: 'case-cons-202',
    name: 'Tax_Invoice_Zenith_Laptop.pdf',
    size: '840 KB',
    fileType: 'PDF Document',
    category: 'proof_of_payment',
    uploadDate: '2024-08-20',
    status: 'verified',
    notes: 'Official tax invoice showing ₹84,999 paid via Credit Card with 2-year warranty clause'
  },
  {
    id: 'evi-003',
    caseId: 'case-cons-202',
    name: 'Service_Center_JobSheet_Refusal.jpg',
    size: '2.1 MB',
    fileType: 'Image (JPEG)',
    category: 'email_chat',
    uploadDate: '2024-08-21',
    status: 'verified',
    notes: 'Job sheet certifying motherboard failure with handwritten warranty rejection stamp'
  },
  {
    id: 'evi-004',
    caseId: 'case-ten-303',
    name: 'Signed_Rental_Agreement_2023.pdf',
    size: '3.2 MB',
    fileType: 'PDF Document',
    category: 'agreement_contract',
    uploadDate: '2024-08-25',
    status: 'verified',
    notes: 'Notarized 11-month agreement detailing ₹1,20,000 security deposit refund clause'
  },
  {
    id: 'evi-005',
    caseId: 'case-ten-303',
    name: 'Move_Out_Handover_Video_Proof.mp4',
    size: '14.8 MB',
    fileType: 'Video Clip',
    category: 'other',
    uploadDate: '2024-08-25',
    status: 'verified',
    notes: 'Timestamped inspection video recorded during key handover showing clean condition'
  }
];

export const INITIAL_CASES: CaseItem[] = [
  {
    id: 'case-rti-101',
    title: 'Ward 42 Road Construction & Tender Inspection',
    issueType: 'rti',
    status: 'response_pending',
    priority: 'medium',
    summary: 'Seeking certified copies of contractor work completion certificates and quality inspection test reports for delayed road resurfacing in Ward 42.',
    authorityInvolved: 'Public Information Officer, Municipal Corporation',
    desiredOutcome: 'Obtain certified tender documents and file notings to demand accountability for substandard road quality.',
    createdAt: '2024-08-10T10:00:00Z',
    updatedAt: '2024-08-14T12:00:00Z',
    incidentDate: '2024-07-15',
    recommendedAction: 'Serve Section 6(1) Statutory RTI Application with certified copies demand',
    actionRationale: 'Direct public records request under RTI Act 2005 triggers strict 30-day statutory clock and mandatory penalty on defaulting officers under Section 20.',
    statutoryRule: 'Section 6(1) & 7(1), Right to Information Act, 2005',
    statutoryTimeframe: '30 Days Statutory Window',
    confidenceScore: 98,
    requiredDocsList: [
      { name: 'Identity Proof (Aadhaar / Voter ID)', description: 'Proof of Indian citizenship', mandatory: true },
      { name: 'Specific Tender / Work Reference List', description: 'Itemized details of information sought', mandatory: true },
      { name: 'Statutory Fee Proof (₹10 IPO / Online Ref)', description: 'Application fee receipt', mandatory: true }
    ],
    deadlineDate: '2024-09-12',
    deadlineDaysRemaining: 13,
    deadlineStatus: 'upcoming',
    submissionDetails: {
      submissionDate: '2024-08-12',
      filingMode: 'speed_post',
      acknowledgmentRef: 'ED984210985IN',
      recipientAuthority: 'PIO, Municipal Corporation South Zone',
      officialPortalUrl: 'https://rtionline.delhi.gov.in',
      statutoryResponseDeadline: '2024-09-12',
      dispatchProofNote: 'Delivered to PIO Central Dispatch on 13 Aug 2024',
      recordedAt: '2024-08-14T12:00:00Z'
    },
    timeline: [
      {
        stepId: 'created',
        label: 'Case Created',
        title: 'Case Initiated by Citizen',
        description: 'Case drafted and problem details summarized for RTI inquiry.',
        timestamp: '10 Aug 2024, 10:00 AM',
        completed: true
      },
      {
        stepId: 'info_collected',
        label: 'Information Collected',
        title: 'Intake Completed',
        description: 'Captured public authority details, specific questions, and time range.',
        timestamp: '10 Aug 2024, 10:18 AM',
        completed: true
      },
      {
        stepId: 'action_recommended',
        label: 'Action Recommended',
        title: 'ActionRadar Diagnostics Completed',
        description: 'Evaluated Section 6(1) filing against Municipal Corporation with 98% confidence.',
        timestamp: '10 Aug 2024, 10:20 AM',
        completed: true
      },
      {
        stepId: 'document_prepared',
        label: 'Document Prepared',
        title: 'RTI Application Drafted & Finalized',
        description: 'Generated formal Section 6(1) application with 3 specific records questions.',
        timestamp: '11 Aug 2024, 04:30 PM',
        completed: true
      },
      {
        stepId: 'submission_recorded',
        label: 'Submission Recorded',
        title: 'Dispatched via Speed Post',
        description: 'Application dispatched with ₹10 Postal Order. Tracking Ref #ED984210985IN.',
        timestamp: '12 Aug 2024, 02:00 PM',
        completed: true
      },
      {
        stepId: 'response_pending',
        label: 'Response Pending',
        title: 'Statutory 30-Day Clock Active',
        description: 'Awaiting certified records or reply from Public Information Officer by 12 Sept 2024.',
        timestamp: '13 Aug 2024, 11:30 AM',
        completed: false,
        current: true
      },
      {
        stepId: 'escalation',
        label: 'Escalation',
        title: 'First Appeal Tier (FAA)',
        description: 'If no reply by 12 Sept 2024, file Section 19(1) First Appeal before Additional Commissioner.',
        timestamp: 'Scheduled for 13 Sept 2024',
        completed: false,
        escalationInfo: {
          appellateTier: 'First Appellate Authority (FAA)',
          grounds: 'Deemed Refusal under Section 7(2) of RTI Act 2005',
          escalatedTo: 'Additional Commissioner (Appeals), Municipal Corporation',
          nextDeadlineDays: 30
        }
      },
      {
        stepId: 'resolved',
        label: 'Resolved',
        title: 'Information Received / Concluded',
        description: 'Case marked resolved once certified files are provided or order passed.',
        timestamp: 'Pending Resolution',
        completed: false
      }
    ],
    documentIds: ['doc-001'],
    evidenceIds: ['evi-001'],
    sourceIds: ['src-rti-01', 'src-rti-02']
  },

  {
    id: 'case-cons-202',
    title: 'Defective Laptop Warranty Denial — Zenith Tech',
    issueType: 'consumer',
    status: 'document_prepared',
    priority: 'high',
    summary: 'Manufacturer refused to replace defective motherboard within 90-day warranty, falsely claiming user physical damage.',
    authorityInvolved: 'Zenith Tech India Pvt. Ltd.',
    desiredOutcome: 'Full invoice refund of ₹84,999 with compensation for mental harassment and loss of work.',
    createdAt: '2024-08-18T15:30:00Z',
    updatedAt: '2024-08-23T11:00:00Z',
    incidentDate: '2024-08-05',
    recommendedAction: 'Issue Statutory 15-Day Pre-Litigation Legal Notice under Section 35 CPA 2019',
    actionRationale: 'A formal advocate-style demand notice triggers legal compliance review at the manufacturer level and establishes clean documentary evidence before District Commission filing.',
    statutoryRule: 'Section 35 & Section 2(11), Consumer Protection Act, 2019',
    statutoryTimeframe: '15 Days Legal Notice Window',
    confidenceScore: 96,
    requiredDocsList: [
      { name: 'Original Purchase Tax Invoice', description: 'Proof of transaction value and date', mandatory: true },
      { name: 'Service Center Job Sheet / Rejection Slip', description: 'Technician diagnostics report', mandatory: true },
      { name: 'Email Correspondence Trail', description: 'Written proof of unresolved complaint', mandatory: false }
    ],
    deadlineDate: '2024-09-08',
    deadlineDaysRemaining: 9,
    deadlineStatus: 'due_soon',
    timeline: [
      {
        stepId: 'created',
        label: 'Case Created',
        title: 'Case Initiated',
        description: 'Consumer dispute registered regarding motherboard warranty refusal.',
        timestamp: '18 Aug 2024, 03:30 PM',
        completed: true
      },
      {
        stepId: 'info_collected',
        label: 'Information Collected',
        title: 'Invoice & Service Details Captured',
        description: 'Recorded invoice #ZT-88392, payment amount ₹84,999, and service center denial.',
        timestamp: '18 Aug 2024, 03:45 PM',
        completed: true
      },
      {
        stepId: 'action_recommended',
        label: 'Action Recommended',
        title: 'ActionRadar Diagnostic Generated',
        description: 'Recommended statutory 15-day pre-litigation legal notice under CPA 2019.',
        timestamp: '18 Aug 2024, 03:47 PM',
        completed: true
      },
      {
        stepId: 'document_prepared',
        label: 'Document Prepared',
        title: 'Legal Notice Ready for Review',
        description: 'Document #doc-002 drafted with full statutory citations and ready to serve.',
        timestamp: '22 Aug 2024, 02:15 PM',
        completed: true,
        current: true
      },
      {
        stepId: 'submission_recorded',
        label: 'Submission Recorded',
        title: 'Notice Dispatch Recording',
        description: 'Dispatch notice via Speed Post and registered legal email.',
        timestamp: 'Pending Dispatch',
        completed: false
      },
      {
        stepId: 'response_pending',
        label: 'Response Pending',
        title: '15-Day Cure Period',
        description: 'Awaiting settlement or written reply from Zenith Tech.',
        timestamp: 'Pending',
        completed: false
      },
      {
        stepId: 'escalation',
        label: 'Escalation',
        title: 'District Consumer Commission (DCDRC)',
        description: 'E-Daakhil filing under Section 35 for refund + ₹50,000 compensation.',
        timestamp: 'Available if notice ignored',
        completed: false
      },
      {
        stepId: 'resolved',
        label: 'Resolved',
        title: 'Refund Disbursed / Commission Order',
        description: 'Case concluded upon receipt of settlement.',
        timestamp: 'Pending',
        completed: false
      }
    ],
    documentIds: ['doc-002'],
    evidenceIds: ['evi-002', 'evi-003'],
    sourceIds: ['src-cons-01', 'src-cons-02']
  },

  {
    id: 'case-ten-303',
    title: 'Withheld Security Deposit Recovery (₹1,20,000)',
    issueType: 'tenant',
    status: 'action_recommended',
    priority: 'high',
    summary: 'Landlord refusing to refund ₹1,20,000 security deposit after peaceful vacate on 31 July 2024 without any repair estimates or justification.',
    authorityInvolved: 'Anil Singhania (Landlord)',
    desiredOutcome: 'Immediate refund of ₹1,20,000 security deposit with interest and waiver of fraudulent repair claims.',
    createdAt: '2024-08-25T09:00:00Z',
    updatedAt: '2024-08-26T16:00:00Z',
    incidentDate: '2024-07-31',
    recommendedAction: 'Serve Formal Statutory Demand Notice with Move-Out Handover Log',
    actionRationale: 'Under Model Tenancy principles and Section 106/108 of Transfer of Property Act, landlords must provide itemized repair bills within 30 days or refund in full. A demand notice puts the landlord under immediate legal liability.',
    statutoryRule: 'Model Tenancy Framework & Section 70, Indian Contract Act',
    statutoryTimeframe: '15 Days Demand Window',
    confidenceScore: 94,
    requiredDocsList: [
      { name: 'Executed Lease / Rent Agreement', description: 'Proof of deposit amount and termination clauses', mandatory: true },
      { name: 'Bank Transfer Receipts of Deposit', description: 'Financial proof of money transfer', mandatory: true },
      { name: 'Move-Out Handover / Video Inspection', description: 'Visual proof of undamaged condition', mandatory: true }
    ],
    deadlineDate: '2024-09-10',
    deadlineDaysRemaining: 11,
    deadlineStatus: 'upcoming',
    timeline: [
      {
        stepId: 'created',
        label: 'Case Created',
        title: 'Case Initiated',
        description: 'Tenancy dispute recorded for deposit withholding.',
        timestamp: '25 Aug 2024, 09:00 AM',
        completed: true
      },
      {
        stepId: 'info_collected',
        label: 'Information Collected',
        title: 'Lease & Handover Details Recorded',
        description: 'Recorded flat address, deposit amount ₹1,20,000, and key handover date.',
        timestamp: '25 Aug 2024, 09:20 AM',
        completed: true
      },
      {
        stepId: 'action_recommended',
        label: 'Action Recommended',
        title: 'ActionRadar Diagnostics Completed',
        description: '15-Day statutory demand notice recommended.',
        timestamp: '25 Aug 2024, 09:22 AM',
        completed: true,
        current: true
      },
      {
        stepId: 'document_prepared',
        label: 'Document Prepared',
        title: 'Drafting Demand Notice',
        description: 'Prepare formal notice citing Model Tenancy Act provisions.',
        timestamp: 'Next Step',
        completed: false
      },
      {
        stepId: 'submission_recorded',
        label: 'Submission Recorded',
        title: 'Serve Demand Notice',
        description: 'Dispatch notice by Registered Speed Post and WhatsApp/Email.',
        timestamp: 'Pending',
        completed: false
      },
      {
        stepId: 'response_pending',
        label: 'Response Pending',
        title: '15-Day Demand Clock',
        description: 'Awaiting deposit remittance.',
        timestamp: 'Pending',
        completed: false
      },
      {
        stepId: 'escalation',
        label: 'Escalation',
        title: 'Rent Authority / Small Causes Court',
        description: 'File petition for deposit recovery with 18% penal interest.',
        timestamp: 'Available if ignored',
        completed: false
      },
      {
        stepId: 'resolved',
        label: 'Resolved',
        title: 'Deposit Recovered',
        description: 'Case marked resolved upon full bank credit.',
        timestamp: 'Pending',
        completed: false
      }
    ],
    documentIds: ['doc-003'],
    evidenceIds: ['evi-004', 'evi-005'],
    sourceIds: ['src-ten-01', 'src-ten-02']
  }
];
