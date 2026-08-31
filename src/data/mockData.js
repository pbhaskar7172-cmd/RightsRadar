export const mockCases = [
  {
    id: "matter-882-a",
    matterNumber: "Matter #882-A",
    title: "Tenant / Landlord Dispute",
    category: "Property Law",
    icon: "real_estate_agent",
    description: "Regarding unfair deduction from security deposit upon vacating the premises at 42B Residency.",
    status: "Collecting Evidence",
    statusColor: "#f59e0b",
    statusBadgeBg: "bg-surface-variant",
    statusBadgeText: "text-on-surface-variant",
    nextAction: "Upload Lease Agreement",
    nextActionIcon: "upload_file",
    nextActionButtonText: "Upload",
    nextActionEnabled: true,
    progressPercent: 33,
    progressStage: "Gathering initial facts (33%)",
    activeStep: 0,
    timelineSteps: [
      { name: "Intake", status: "completed" },
      { name: "Review", status: "current" },
      { name: "Drafting", status: "pending" },
      { name: "Filing", status: "pending" }
    ],
    priority: "Medium",
    deadline: "In 4 days",
    parties: {
      claimant: "Ananya Sharma",
      respondent: "Oakridge Realty Management LLC"
    },
    claimedAmount: "$3,200",
    createdDate: "Oct 18, 2023",
    documents: [
      { name: "Security_Deposit_Receipt.pdf", size: "1.2 MB", date: "Oct 19, 2023" },
      { name: "Move_out_Inspection_Notes.pdf", size: "850 KB", date: "Oct 20, 2023" }
    ]
  },
  {
    id: "matter-904-b",
    matterNumber: "Matter #904-B",
    title: "Online Banking Fraud",
    category: "Financial Fraud",
    icon: "account_balance",
    description: "Unauthorized transaction of $2,450 reported on primary checking account. Bank dispute pending.",
    status: "Draft Prepared",
    statusColor: "#000919",
    statusBadgeBg: "bg-primary text-on-primary",
    statusBadgeText: "text-on-primary",
    nextAction: "Review Legal Notice",
    nextActionIcon: "gavel",
    nextActionButtonText: "Review Draft",
    nextActionEnabled: true,
    progressPercent: 65,
    progressStage: "Drafting formal complaint (65%)",
    activeStep: 2,
    timelineSteps: [
      { name: "Intake", status: "completed" },
      { name: "Review", status: "completed" },
      { name: "Drafting", status: "current" },
      { name: "Filing", status: "pending" }
    ],
    priority: "High",
    deadline: "Tomorrow",
    parties: {
      claimant: "Rahul Verma",
      respondent: "First National Apex Bank"
    },
    claimedAmount: "$2,450",
    createdDate: "Oct 22, 2023",
    documents: [
      { name: "Bank_Statement_Unauthorized_Txn.pdf", size: "2.4 MB", date: "Oct 22, 2023" },
      { name: "Fraud_Complaint_Draft_v1.pdf", size: "1.1 MB", date: "Oct 24, 2023" }
    ]
  },
  {
    id: "matter-741-c",
    matterNumber: "Matter #741-C",
    title: "Defective Product Refund",
    category: "Consumer Rights",
    icon: "shopping_bag",
    description: "Seeking full refund for defective high-end electronics purchased online. Seller refusing return policy.",
    status: "Tracking",
    statusColor: "#3b82f6",
    statusBadgeBg: "bg-surface-variant",
    statusBadgeText: "text-on-surface-variant",
    nextAction: "Await Merchant Response",
    nextActionIcon: "hourglass_empty",
    nextActionButtonText: "Pending",
    nextActionEnabled: false,
    progressPercent: 50,
    progressStage: "Awaiting merchant dispute response (50%)",
    activeStep: 1,
    timelineSteps: [
      { name: "Intake", status: "completed" },
      { name: "Review", status: "current" },
      { name: "Drafting", status: "pending" },
      { name: "Filing", status: "pending" }
    ],
    priority: "Medium",
    deadline: "In 6 days",
    parties: {
      claimant: "Priya Patel",
      respondent: "ElectroHub Global Direct"
    },
    claimedAmount: "$1,890",
    createdDate: "Oct 15, 2023",
    documents: [
      { name: "Purchase_Invoice_8940.pdf", size: "900 KB", date: "Oct 15, 2023" },
      { name: "Defect_Proof_Images.zip", size: "8.4 MB", date: "Oct 16, 2023" }
    ]
  },
  {
    id: "matter-612-d",
    matterNumber: "Matter #612-D",
    title: "Workplace Salary Issue",
    category: "Employment Law",
    icon: "work",
    description: "Resolution of unpaid overtime wages from previous employer.",
    status: "Resolved",
    statusColor: "#10b981",
    statusBadgeBg: "bg-[#10b981]/10 text-[#065f46]",
    statusBadgeText: "text-[#065f46]",
    nextAction: "View Settlement Agreement",
    nextActionIcon: "history",
    nextActionButtonText: "View History",
    nextActionEnabled: true,
    progressPercent: 100,
    progressStage: "Settlement executed and concluded (100%)",
    activeStep: 3,
    timelineSteps: [
      { name: "Intake", status: "completed" },
      { name: "Review", status: "completed" },
      { name: "Drafting", status: "completed" },
      { name: "Filing", status: "completed" }
    ],
    priority: "Low",
    deadline: "Concluded",
    parties: {
      claimant: "Vikram Sengupta",
      respondent: "Apex Tech Labs Inc."
    },
    claimedAmount: "$8,500",
    createdDate: "Sep 28, 2023",
    documents: [
      { name: "Final_Settlement_Letter.pdf", size: "1.8 MB", date: "Oct 12, 2023" },
      { name: "Wage_Claim_Proof.pdf", size: "3.1 MB", date: "Sep 29, 2023" }
    ]
  }
];

export const mockDocuments = [
  {
    id: "legal-notice-draft-894",
    caseId: "matter-741-c",
    title: "Legal Notice Draft",
    type: "Formal Legal Notice",
    status: "Draft Generated",
    date: "October 24, 2023",
    refNumber: "Ref: NY-AI-2023-894",
    documentTypeSummary: "This document demands a refund due to a breach of contract based on the provided inputs.",
    sender: {
      name: "Apex Innovations Inc.",
      representative: "Nyaya AI Automated Drafting / Legal Department",
    },
    recipient: {
      company: "Global Tech Solutions Ltd.",
      address: "450 Innovation Drive, Suite 300\nSan Francisco, CA 94105"
    },
    subject: "Formal Notice Regarding Breach of Contract and Demand for Refund",
    contractDate: "January 15, 2023",
    missedMilestone: "Beta Release scheduled for August 1, 2023",
    demandAmount: "$150,000 USD",
    deadlineDays: "14 business days",
    deadlineDate: "November 7, 2023",
    isRevisionApplied: false,
    aiSuggestion: {
      title: "Nyaya AI Suggestion",
      text: "The demand for the refund is clear, but should we emphasize the deadline (November 7, 2023) more strongly and specify the payment method?"
    }
  },
  {
    id: "tenant-deposit-demand-882",
    caseId: "matter-882-a",
    title: "Security Deposit Demand Notice",
    type: "Dispute Notice",
    status: "Review Ready",
    date: "October 21, 2023",
    refNumber: "Ref: NY-AI-2023-882",
    documentTypeSummary: "Formal demand for refund of security deposit with itemized contestation.",
    sender: {
      name: "Ananya Sharma",
      representative: "Nyaya AI Automated Drafting",
    },
    recipient: {
      company: "Oakridge Realty Management LLC",
      address: "100 Skyline Blvd, Suite 120\nSeattle, WA 98101"
    },
    subject: "Demand for Full Return of Rental Security Deposit",
    contractDate: "August 1, 2022",
    missedMilestone: "Unjustified deduction of deposit after 30-day statutory window",
    demandAmount: "$3,200 USD",
    deadlineDays: "10 business days",
    deadlineDate: "November 2, 2023",
    isRevisionApplied: false,
    aiSuggestion: {
      title: "Nyaya AI Suggestion",
      text: "Include citations to Local Tenant Protection Code Section 14B regarding statutory penalties for bad-faith withholding."
    }
  },
  {
    id: "consumer-fraud-complaint-904",
    caseId: "matter-904-b",
    title: "Consumer Forum Banking Dispute",
    type: "Statutory Complaint",
    status: "Pending Submission",
    date: "October 23, 2023",
    refNumber: "Ref: NY-AI-2023-904",
    documentTypeSummary: "Formal complaint to the banking ombudsman regarding unauthorized digital debit.",
    sender: {
      name: "Rahul Verma",
      representative: "Nyaya AI Automated Drafting",
    },
    recipient: {
      company: "First National Apex Bank & Banking Ombudsman",
      address: "Ombudsman Regional Cell, Financial Towers\nNew York, NY 10005"
    },
    subject: "Formal Complaint against Unauthorized Electronic Transfer",
    contractDate: "October 19, 2023",
    missedMilestone: "Failure of two-factor authentication and refusal of provisional credit",
    demandAmount: "$2,450 USD",
    deadlineDays: "7 business days",
    deadlineDate: "October 31, 2023",
    isRevisionApplied: false,
    aiSuggestion: {
      title: "Nyaya AI Suggestion",
      text: "Attach the transaction audit timestamp log and police FIR registration number."
    }
  }
];

export const mockRecentGuidance = [
  {
    id: "g-1",
    title: "Non-Disclosure Agreement Review",
    time: "2 days ago",
    meta: "4 documents analyzed",
    icon: "article",
    path: "/documents/legal-notice-draft-894"
  },
  {
    id: "g-2",
    title: "Contractor Liability Inquiry",
    time: "Last week",
    meta: "Concluded",
    icon: "forum",
    path: "/cases/matter-904-b"
  },
  {
    id: "g-3",
    title: "Commercial Lease Escalation Clause",
    time: "2 weeks ago",
    meta: "Advice generated",
    icon: "gavel",
    path: "/cases/matter-882-a"
  }
];

export const mockSuggestedPrompts = [
  "Draft a formal demand letter...",
  "Review this employment contract...",
  "What are my tenant rights if...",
  "File an unauthorized banking dispute...",
  "Respond to a cease and desist notice..."
];

export const mockActionRadarItems = [
  {
    id: "act-1",
    priority: "High",
    badgeColor: "#ef4444",
    badgeBg: "bg-[#ef4444]/10",
    badgeText: "text-[#ef4444]",
    deadline: "Tomorrow",
    title: "Send Prepared Complaint",
    description: "The draft for your Online Banking Fraud case is ready. Review and submit it to the Consumer Forum to initiate the formal process.",
    caseId: "matter-904-b",
    ctaText: "Take Action Now",
    actionType: "submit_draft"
  },
  {
    id: "act-2",
    priority: "Medium",
    badgeColor: "#f59e0b",
    badgeBg: "bg-[#f59e0b]/10",
    badgeText: "text-[#f59e0b]",
    deadline: "In 2 days",
    title: "Submit Move-out Checklist Evidence",
    description: "Your landlord dispute case requires proof of the original condition report signed at key handover.",
    caseId: "matter-882-a",
    ctaText: "Upload Evidence",
    actionType: "upload_file"
  },
  {
    id: "act-3",
    priority: "Low",
    badgeColor: "#3b82f6",
    badgeBg: "bg-[#3b82f6]/10",
    badgeText: "text-[#3b82f6]",
    deadline: "In 5 days",
    title: "Verify Settlement Deposit",
    description: "Confirm receipt of $8,500 settlement payment from Apex Tech Labs into your registered account.",
    caseId: "matter-612-d",
    ctaText: "Confirm Receipt",
    actionType: "confirm_settlement"
  }
];

export const mockUserProfile = {
  name: "Ananya Sharma",
  email: "ananya.sharma@example.com",
  phone: "+1 (555) 234-5678",
  jurisdiction: "California, United States",
  accountType: "Citizen Premium",
  memberSince: "August 2023",
  verifiedIdentity: true,
  mattersCount: 4,
  activeNoticesCount: 2
};
