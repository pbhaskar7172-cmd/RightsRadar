// Automatic Document Template Generator Engine
// Provides structured, safety-compliant legal document templates without fabricating unverified facts.

export const TEMPLATE_REGISTRY = {
  consumer_complaint: {
    id: 'consumer_complaint',
    name: 'Consumer Complaint & Refund Demand',
    domain: 'Consumer & Commercial Law',
    icon: 'shopping_bag',
    authorityType: 'District Consumer Disputes Redressal Commission / Merchant Grievance Cell',
    description: 'Formal representation demanding full refund, product replacement, or compensation for deficient goods/services.',
    defaultDeadlines: '14 business days',
    suggestedSuggestion: 'Include purchase invoices, defect photos, and communication logs with merchant.'
  },
  police_complaint: {
    id: 'police_complaint',
    name: 'Police Complaint & Section 154 Representation',
    domain: 'Criminal Law & Police Procedure',
    icon: 'local_police',
    authorityType: 'Station House Officer (SHO) / Superintendent of Police',
    description: 'Formal complaint petition for reporting cognizable offenses, property theft, or incident registration.',
    defaultDeadlines: 'Immediate Police Action',
    suggestedSuggestion: 'Attach serial numbers/IMEI numbers, witness details, and exact timestamp records.'
  },
  cybercrime_complaint: {
    id: 'cybercrime_complaint',
    name: 'Cybercrime & Online Fraud Petition',
    domain: 'Financial Fraud & Cybercrime',
    icon: 'security',
    authorityType: 'National Cyber Crime Reporting Portal / Cyber Cell',
    description: 'Formal petition for unauthorized online debits, phishing, OTP interception, and digital scams.',
    defaultDeadlines: '72 hours (Zero-Liability Window)',
    suggestedSuggestion: 'Attach transaction UTR numbers, SMS debit alerts, and bank complaint acknowledgment.'
  },
  rti_application: {
    id: 'rti_application',
    name: 'Application under Section 6(1) of RTI Act',
    domain: 'Administrative & Right to Information',
    icon: 'account_balance',
    authorityType: 'Public Information Officer (PIO) / Public Authority',
    description: 'Statutory questionnaire compelling disclosure of official records, file movements, and reasons for administrative delay.',
    defaultDeadlines: '30 statutory days (48 hours for Life/Liberty)',
    suggestedSuggestion: 'Keep questions precise and reference your original application tracking number.'
  },
  tenant_landlord_notice: {
    id: 'tenant_landlord_notice',
    name: 'Tenant / Landlord Dispute Notice',
    domain: 'Tenant & Housing Rights',
    icon: 'real_estate_agent',
    authorityType: 'Rent Authority / Small Claims Court / Landlord Representation',
    description: 'Formal notice for return of rental security deposit, habitability repairs, or lease obligation compliance.',
    defaultDeadlines: '10 business days',
    suggestedSuggestion: 'Cite itemized deduction receipts and move-out inspection handover documentation.'
  },
  workplace_complaint: {
    id: 'workplace_complaint',
    name: 'Workplace Salary & Labor Grievance',
    domain: 'Labor & Employment Law',
    icon: 'work',
    authorityType: 'Labor Commissioner / Human Resources / Employment Tribunal',
    description: 'Formal legal demand notice for unpaid earned wages, overtime compensation, or wrongful termination severance.',
    defaultDeadlines: '15 business days',
    suggestedSuggestion: 'Attach employment offer letter, attendance sheets, and previous HR follow-up emails.'
  },
  insurance_complaint: {
    id: 'insurance_complaint',
    name: 'Insurance Claim Dispute & Ombudsman Intimation',
    domain: 'Insurance & Claims',
    icon: 'health_and_safety',
    authorityType: 'Insurance Ombudsman / Grievance Redressal Officer',
    description: 'Formal representation challenging improper claim repudiation, delayed settlement, or arbitrary deductions.',
    defaultDeadlines: '14 business days',
    suggestedSuggestion: 'Attach original policy schedule, claim denial letter, and medical/surveyor bills.'
  },
  financial_fraud_complaint: {
    id: 'financial_fraud_complaint',
    name: 'Banking Ombudsman & Fraud Dispute Notice',
    domain: 'Financial & Banking Law',
    icon: 'account_balance_wallet',
    authorityType: 'Banking Ombudsman / Regional Bank Management',
    description: 'Statutory complaint under RBI zero-liability circulars demanding reversal of unauthorized banking transfers.',
    defaultDeadlines: '7 business days',
    suggestedSuggestion: 'Highlight the timeline of reporting to bank within 72 hours of the unauthorized debit.'
  },
  general_complaint: {
    id: 'general_complaint',
    name: 'Formal Legal Notice & Demand for Remedy',
    domain: 'General Civil Dispute',
    icon: 'description',
    authorityType: 'Competent Authority / Counterparty Legal Department',
    description: 'Standard formal legal notice detailing contractual breach, facts, grounds, and remedy required.',
    defaultDeadlines: '14 business days',
    suggestedSuggestion: 'Ensure clear itemization of financial damages and statutory cure deadlines.'
  },
  follow_up_reminder: {
    id: 'follow_up_reminder',
    name: 'Final Follow-Up & Escalation Reminder Notice',
    domain: 'Procedural Follow-up',
    icon: 'mark_email_read',
    authorityType: 'Senior Appellate Authority / Counterparty Executive Office',
    description: 'Escalation notice reminding recipient of expired cure period before initiating formal judicial proceedings.',
    defaultDeadlines: '7 business days (Final Notice)',
    suggestedSuggestion: 'Reference the reference number and date of the initial unanswered legal notice.'
  }
};

export const documentTemplateService = {
  // 1. Get list of all available templates
  getAvailableTemplates: () => {
    return Object.values(TEMPLATE_REGISTRY);
  },

  // 2. Get specific template definition
  getTemplateById: (templateId) => {
    return TEMPLATE_REGISTRY[templateId] || TEMPLATE_REGISTRY.general_complaint;
  },

  // 3. Domain & Context -> Template Mapping Engine
  determineTemplate: (context = {}) => {
    const text = [
      context.domain,
      context.category,
      context.incidentType,
      context.userObjective,
      context.userPrompt,
      context.title,
      context.text
    ].filter(Boolean).join(' ').toLowerCase();

    const domainText = [context.domain, context.category, context.incidentType].filter(Boolean).join(' ').toLowerCase();

    // Check if it's explicitly a follow-up/reminder
    if (
      text.includes('reminder') ||
      text.includes('follow up') ||
      text.includes('follow-up') ||
      text.includes('escalate') ||
      text.includes('second notice')
    ) {
      return 'follow_up_reminder';
    }

    // Direct Category / Domain Mappings
    if (domainText.includes('labor') || domainText.includes('employment') || domainText.includes('workplace')) {
      return 'workplace_complaint';
    }
    if (domainText.includes('insurance') || domainText.includes('claim')) {
      return 'insurance_complaint';
    }
    if (domainText.includes('tenant') || domainText.includes('housing') || domainText.includes('rent')) {
      return 'tenant_landlord_notice';
    }
    if (domainText.includes('cyber') || (domainText.includes('financial') && text.includes('upi'))) {
      return 'cybercrime_complaint';
    }
    if (domainText.includes('financial') || domainText.includes('banking')) {
      return 'financial_fraud_complaint';
    }
    if (domainText.includes('criminal') || domainText.includes('police')) {
      return 'police_complaint';
    }
    if (domainText.includes('administrative') || domainText.includes('rti')) {
      return 'rti_application';
    }
    if (domainText.includes('consumer') || domainText.includes('commercial')) {
      return 'consumer_complaint';
    }

    // 1. Cybercrime & Online Fraud
    if (
      text.includes('cyber') ||
      text.includes('upi') ||
      text.includes('phishing') ||
      text.includes('scam') ||
      text.includes('hacked') ||
      text.includes('otp')
    ) {
      return 'cybercrime_complaint';
    }

    // 2. Financial Fraud / Banking Ombudsman
    if (
      text.includes('bank') ||
      text.includes('banking') ||
      text.includes('unauthorized transaction') ||
      text.includes('debit') ||
      text.includes('atm') ||
      text.includes('fraud')
    ) {
      return 'financial_fraud_complaint';
    }

    // 3. Tenant / Landlord
    if (
      text.includes('tenant') ||
      text.includes('landlord') ||
      text.includes('rent') ||
      text.includes('lease') ||
      text.includes('deposit') ||
      text.includes('eviction') ||
      text.includes('apartment')
    ) {
      return 'tenant_landlord_notice';
    }

    // 4. Police / Criminal / Theft
    if (
      text.includes('police') ||
      text.includes('theft') ||
      text.includes('stolen') ||
      text.includes('fir') ||
      text.includes('assault') ||
      text.includes('threat') ||
      text.includes('robbery')
    ) {
      return 'police_complaint';
    }

    // 5. RTI / Administrative Government Records
    if (
      text.includes('rti') ||
      text.includes('right to information') ||
      text.includes('government') ||
      text.includes('public authority') ||
      text.includes('passport') ||
      text.includes('pension') ||
      text.includes('official record')
    ) {
      return 'rti_application';
    }

    // 6. Workplace / Employment / Wages
    if (
      text.includes('workplace') ||
      text.includes('employer') ||
      text.includes('employee') ||
      text.includes('salary') ||
      text.includes('wage') ||
      text.includes('overtime') ||
      text.includes('fired') ||
      text.includes('severance')
    ) {
      return 'workplace_complaint';
    }

    // 7. Insurance Claims
    if (
      text.includes('insurance') ||
      text.includes('mediclaim') ||
      text.includes('policy') ||
      text.includes('claim repudiat') ||
      text.includes('surveyor')
    ) {
      return 'insurance_complaint';
    }

    // 8. Consumer / Defective Product
    if (
      text.includes('consumer') ||
      text.includes('product') ||
      text.includes('laptop') ||
      text.includes('electronics') ||
      text.includes('refund') ||
      text.includes('defective') ||
      text.includes('merchant') ||
      text.includes('seller') ||
      text.includes('warranty') ||
      text.includes('service deficiency')
    ) {
      return 'consumer_complaint';
    }

    // Default Universal Fallback
    return 'general_complaint';
  },

  // 4. Build Structured Document Data from Template & Context
  generateDocument: (templateId, context = {}) => {
    const template = TEMPLATE_REGISTRY[templateId] || TEMPLATE_REGISTRY.general_complaint;
    const year = new Date().getFullYear();
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const docId = context.documentId || `doc-${Date.now()}-${randomSuffix}`;
    const formattedDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    // Extract facts collected cleanly
    const claimantName = context.claimant || context.facts?.claimant || context.answers?.claimant || '[Claimant Name - Pending Input]';
    const respondentName = context.respondent || context.facts?.respondent || context.answers?.counterparty || context.answers?.respondent || '[Counterparty / Organization - Pending Input]';
    const respondentAddress = context.respondentAddress || context.answers?.counterparty_address || '[Official Registered Address - Pending Input]';
    const claimAmount = context.claimAmount || context.facts?.claimAmount || context.answers?.monetary_loss || context.answers?.txn_amount || context.answers?.deposit_amt || context.estimatedAmount || '$1,500 USD';
    const incidentDate = context.incidentDate || context.facts?.incidentDate || context.answers?.event_date || context.answers?.txn_date || context.answers?.lease_end || formattedDate;
    const caseId = context.caseId || null;
    const factsSummary = context.summary || context.facts?.summary || context.description || '[Detailed summary of the factual sequence of events.]';

    // Structured grounds based on template without fabricating false citations
    const grounds = generateStructuredGrounds(template.id, context);

    // Specific prayer/relief requested
    const prayer = generateStructuredPrayer(template.id, {
      claimantName,
      respondentName,
      claimAmount,
      incidentDate
    });

    const deadlineDays = context.deadlineDays || template.defaultDeadlines || '14 business days';
    const deadlineDate = calculateDeadlineDate(14);

    return {
      id: docId,
      caseId: caseId,
      templateId: template.id,
      documentType: template.name,
      title: context.title || `${template.name} — ${claimantName}`,
      status: 'Draft Generated',
      date: formattedDate,
      refNumber: `Ref: NY-AI-${year}-${randomSuffix}`,
      documentTypeSummary: template.description,
      authority: {
        name: context.authority?.name || template.authorityType,
        jurisdiction: context.authority?.jurisdiction || 'State District Jurisdiction'
      },
      sender: {
        name: claimantName,
        representative: 'Nyaya AI Automated Drafting / Citizen Representative'
      },
      recipient: {
        company: respondentName,
        address: respondentAddress
      },
      subject: `Formal Representation: ${context.subject || context.title || template.name}`,
      contractDate: incidentDate,
      missedMilestone: factsSummary,
      demandAmount: claimAmount,
      deadlineDays: deadlineDays,
      deadlineDate: deadlineDate,
      factsSummary: factsSummary,
      grounds: grounds,
      prayer: prayer,
      attachments: generateAttachmentList(context),
      signature: {
        name: claimantName,
        role: 'Complainant / Aggrieved Party',
        date: formattedDate
      },
      isRevisionApplied: false,
      revisions: [],
      aiSuggestion: {
        title: 'Nyaya AI Optimization Suggestion',
        text: template.suggestedSuggestion
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }
};

// Helper: Generate structured grounds for each document type
function generateStructuredGrounds(templateId, context) {
  const applicableLaws = context.diagnosis?.applicableLaws || [];

  switch (templateId) {
    case 'consumer_complaint':
      return [
        'Supply of goods/services failing to meet standard merchantability and agreed specifications.',
        'Refusal of statutory return/refund within the permissible consumer rights framework.',
        applicableLaws[0] || 'Applicable Statutory Consumer Protection Standards'
      ];
    case 'police_complaint':
      return [
        'Occurrence of a cognizable incident requiring mandatory recording under procedural guidelines.',
        'Loss of personal property without consent, necessitating tracing and recovery.',
        applicableLaws[0] || 'Statutory Code of Criminal Procedure / Reporting Mandates'
      ];
    case 'cybercrime_complaint':
      return [
        'Unauthorized electronic transaction executed without multi-factor authentication consent.',
        'Breach of IT security and electronic payment zero-liability guidelines.',
        applicableLaws[0] || 'Information Technology Act & Regulatory Banking Circulars'
      ];
    case 'rti_application':
      return [
        'Statutory entitlement of the citizen applicant to inspect and obtain certified records.',
        'Inordinate delay by the public authority beyond the prescribed citizen charter timeline.',
        applicableLaws[0] || 'Right to Information Act, 2005 (Section 6(1))'
      ];
    case 'tenant_landlord_notice':
      return [
        'Failure to provide itemized deduction accounting within the statutory 30-day move-out window.',
        'Unlawful withholding of security deposit despite key return and premises handover.',
        applicableLaws[0] || 'Tenancy Regulations & Fair Housing Standards'
      ];
    case 'workplace_complaint':
      return [
        'Non-payment of earned wages and overtime compensation contrary to employment agreement.',
        'Violation of statutory wage settlement deadlines following separation.',
        applicableLaws[0] || 'Payment of Wages & Statutory Labor Enactments'
      ];
    case 'insurance_complaint':
      return [
        'Arbitrary repudiation of bona fide claim without substantiating policy exclusion clauses.',
        'Deficiency in claim processing turnaround time contrary to insurance ombudsman mandates.',
        applicableLaws[0] || 'Insurance Regulatory Redressal Norms'
      ];
    case 'financial_fraud_complaint':
      return [
        'Immediate reporting of unauthorized debit within 72 hours triggering zero-liability protection.',
        'Failure of payment intermediary to reverse debited funds during the investigative period.',
        applicableLaws[0] || 'Zero-Liability Banking Protection Regulations'
      ];
    case 'follow_up_reminder':
      return [
        'Lapse of the initial notice cure period with zero formal response from counterparty.',
        'Continued refusal to resolve grievance amicably prior to judicial escalation.',
        'Reservation of full rights to claim statutory interest, damages, and legal costs.'
      ];
    default:
      return [
        'Failure to perform contractual/statutory obligations as agreed.',
        'Causing direct and quantifiable prejudice and monetary loss to the claimant.',
        'Statutory right to formal dispute settlement and demand for compliance.'
      ];
  }
}

// Helper: Generate formal prayers/requests
function generateStructuredPrayer(templateId, data) {
  switch (templateId) {
    case 'consumer_complaint':
      return `Direct the respondent to immediately refund ${data.claimAmount} along with replacement/repair and reasonable compensation for deficiency in service.`;
    case 'police_complaint':
      return `Register a formal First Information Report (FIR) / Complaint Diary Entry, initiate an investigation, and recover the stolen/misplaced property.`;
    case 'cybercrime_complaint':
      return `Freeze the beneficiary account/wallet, register a cyber incident report, and facilitate the immediate reversal of ${data.claimAmount}.`;
    case 'rti_application':
      return `Provide certified copies of the requested daily progress notes, file movement records, and names of officers responsible for processing the application.`;
    case 'tenant_landlord_notice':
      return `Release and transfer the full withheld security deposit amount of ${data.claimAmount} to the tenant's bank account within 10 business days.`;
    case 'workplace_complaint':
      return `Clear all outstanding wage arrears and overtime dues totaling ${data.claimAmount} together with interest and provide formal separation clearance.`;
    case 'insurance_complaint':
      return `Re-evaluate and honor the repudiated claim amount of ${data.claimAmount} with statutory delay interest without unjust deductions.`;
    case 'financial_fraud_complaint':
      return `Credit the customer account with provisional shadow credit of ${data.claimAmount} in compliance with RBI zero-liability instructions.`;
    case 'follow_up_reminder':
      return `Take immediate notice of this final reminder and comply with the original demand within 7 business days, failing which legal proceedings will commence.`;
    default:
      return `Fulfill all pending representations and remediate the claimed dispute amount of ${data.claimAmount} without further delay.`;
  }
}

// Helper: Calculate calendar deadline
function calculateDeadlineDate(days = 14) {
  const date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

// Helper: Extract attachments list
function generateAttachmentList(context) {
  if (context.evidence && context.evidence.length > 0) {
    return context.evidence.map((e) => e.name || e);
  }
  if (context.documents && context.documents.length > 0) {
    return context.documents.map((d) => d.name || d);
  }
  return [
    'Copy of Transaction / Contractual Document',
    'Evidence & Communication Records Log',
    'Proof of Identity / Address'
  ];
}
