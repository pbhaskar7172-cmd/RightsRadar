import { IssueTypeConfig, IssueTypeId } from '../types';

export const ISSUE_TYPES: Record<IssueTypeId, IssueTypeConfig> = {
  rti: {
    id: 'rti',
    name: 'Right to Information (RTI)',
    shortName: 'RTI',
    tagline: 'Demand transparency, official records, or inspection of government files',
    description: 'Statutory inquiries to public authorities, state/central ministries, public sector entities, or civic bodies.',
    iconName: 'FileSearch',
    accentColor: '#2563EB',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    badgeText: 'text-blue-700',
    statutoryTimeframe: '30 Days statutory response window (48h for life/liberty)',
    primaryStatute: 'Right to Information Act, 2005 (Section 6(1) & 19(1))',
    sampleProblems: [
      'Municipal corporation delayed road repair tender documents',
      'Pending pension sanction records not disclosed by department',
      'Inspection of public project funds and utilization certificates'
    ],
    intakeQuestions: [
      {
        id: 'authority_name',
        question: 'Which Public Authority or Department holds the information?',
        helpText: 'Specify ministry, department, municipality, or public body (e.g. Municipal Corporation, Dept of Higher Education).',
        type: 'text',
        placeholder: 'e.g., Department of Urban Development / Municipal Corporation of Delhi',
        required: true,
      },
      {
        id: 'information_details',
        question: 'What specific records, files, or information do you require?',
        helpText: 'Be precise and concise. Avoid asking opinions, hypothetical questions, or explanations — ask for tangible documents, memos, or data.',
        type: 'textarea',
        placeholder: 'e.g., 1. Certified copies of the approval order for Project X.\n2. Date-wise movement of application #1294.',
        required: true,
      },
      {
        id: 'time_period',
        question: 'What is the relevant time period or date range for these records?',
        helpText: 'Helps the Public Information Officer (PIO) locate the records faster.',
        type: 'text',
        placeholder: 'e.g., Financial Year 2024–2025 or January 2024 to Present',
        required: true,
      },
      {
        id: 'previous_application',
        question: 'Have you already filed an application for this request earlier?',
        helpText: 'If 30 days have passed without reply or with unsatisfactory refusal, this qualifies for a First Appeal.',
        type: 'radio',
        options: [
          { label: 'No, this is my first RTI application (Section 6(1))', value: 'fresh' },
          { label: 'Yes, filed earlier but no reply within 30 days (Deemed Refusal)', value: 'no_reply' },
          { label: 'Yes, but received incomplete/misleading information (First Appeal)', value: 'rejected' },
        ],
        required: true,
      },
      {
        id: 'delivery_mode',
        question: 'Preferred mode for receiving certified copies?',
        helpText: 'Physical inspection, certified hard copies by Speed Post, or digital PDF.',
        type: 'select',
        options: [
          { label: 'Certified Hard Copy by Registered / Speed Post', value: 'speed_post' },
          { label: 'Soft Copy via Official RTI Portal / Email', value: 'electronic' },
          { label: 'Personal Inspection of Records / Files', value: 'inspection' },
        ],
        required: true,
      }
    ]
  },

  consumer: {
    id: 'consumer',
    name: 'Consumer Dispute & Fair Trade',
    shortName: 'Consumer',
    tagline: 'Defective products, service deficiency, misleading ads, or unfair trade',
    description: 'Redressal against e-commerce sellers, manufacturers, warranty service centers, airlines, or banking service defects.',
    iconName: 'ShoppingBag',
    accentColor: '#059669',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    badgeText: 'text-emerald-700',
    statutoryTimeframe: '15–30 Days pre-litigation legal notice window',
    primaryStatute: 'Consumer Protection Act, 2019 (Section 35 & 38)',
    sampleProblems: [
      'E-commerce company refused refund on a broken electronic appliance',
      'Car dealership refuses to honour warranty on manufacturing defect',
      'Flight airline cancelled booking without refund or compensation'
    ],
    intakeQuestions: [
      {
        id: 'company_name',
        question: 'Which seller, brand, or service provider is involved?',
        helpText: 'Provide full registered legal name or trademark of the company.',
        type: 'text',
        placeholder: 'e.g., NovaTech Electronics Pvt. Ltd. / QuickCart E-Commerce',
        required: true,
      },
      {
        id: 'transaction_details',
        question: 'What was the transaction amount, invoice number, and date of purchase?',
        helpText: 'Crucial for establishing jurisdiction (District, State, or National Commission).',
        type: 'text',
        placeholder: 'e.g., Invoice #INV-883492, ₹42,500 on 14 October 2024',
        required: true,
      },
      {
        id: 'deficiency_description',
        question: 'What defect or deficiency occurred?',
        helpText: 'Explain what was promised vs. what was delivered, and how customer support responded.',
        type: 'textarea',
        placeholder: 'e.g., The smart television stopped functioning within 20 days. Support technician certified panel failure but company refused replacement under warranty.',
        required: true,
      },
      {
        id: 'remedy_sought',
        question: 'What relief or compensation are you claiming?',
        helpText: 'Standard remedies include replacement, full refund with interest, and damages for mental harassment.',
        type: 'radio',
        options: [
          { label: 'Full Refund with statutory interest (12% p.a.) + compensation', value: 'refund_interest' },
          { label: 'Immediate free replacement of product / correction of defect', value: 'replacement' },
          { label: 'Compensation for financial loss & litigation costs', value: 'damages' },
        ],
        required: true,
      },
      {
        id: 'written_complaint_sent',
        question: 'Have you already sent formal email complaints with reference tickets?',
        helpText: 'Proof of prior written complaints strengthens the pre-litigation legal notice.',
        type: 'select',
        options: [
          { label: 'Yes, have ticket numbers and unanswered email trail', value: 'written_trail' },
          { label: 'Only verbal / customer care phone calls so far', value: 'verbal_only' },
          { label: 'Company sent a formal written rejection letter', value: 'formal_refusal' },
        ],
        required: true,
      }
    ]
  },

  tenant: {
    id: 'tenant',
    name: 'Tenancy & Housing Rights',
    shortName: 'Tenant',
    tagline: 'Security deposit withholding, unlawful eviction, repair refusal, or harassment',
    description: 'Disputes with landlords, property managers, society RWA, or rental agencies under Model Tenancy laws.',
    iconName: 'Home',
    accentColor: '#D97706',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
    badgeText: 'text-amber-700',
    statutoryTimeframe: '15 Days statutory demand notice before Rent Court filing',
    primaryStatute: 'Model Tenancy Act / State Rent Control & Transfer of Property Act',
    sampleProblems: [
      'Landlord refused to refund ₹1,20,000 security deposit after peaceful vacate',
      'Unlawful notice to vacate premises within 3 days without contractual breach',
      'Failure to repair major plumbing/structural damage affecting habitability'
    ],
    intakeQuestions: [
      {
        id: 'landlord_name',
        question: 'Landlord / Property Management entity name and address?',
        helpText: 'The legal party listed in your registered or notarized lease agreement.',
        type: 'text',
        placeholder: 'e.g., Rajesh Sharma (Owner) / Horizon Realty Management',
        required: true,
      },
      {
        id: 'premises_address',
        question: 'Rented property address & monthly rent?',
        helpText: 'Full postal address of the rented residence or commercial premise.',
        type: 'text',
        placeholder: 'e.g., Flat 402, Sunshine Heights, Sector 45, Gurugram. Rent: ₹32,000/month',
        required: true,
      },
      {
        id: 'deposit_amount',
        question: 'Security deposit amount held and date of handover?',
        helpText: 'Include total deposit paid and the date you handed over peaceful possession/keys.',
        type: 'text',
        placeholder: 'e.g., ₹96,000 security deposit. Keys handed over on 30 Nov 2024 with video proof.',
        required: true,
      },
      {
        id: 'dispute_nature',
        question: 'What is the primary ground of dispute?',
        helpText: 'Select the primary grievance to generate the tailored demand notice.',
        type: 'radio',
        options: [
          { label: 'Unjustified deduction / refusal to refund security deposit', value: 'deposit_refusal' },
          { label: 'Threat of forceful eviction / disconnection of essential utilities', value: 'unlawful_eviction' },
          { label: 'Refusal to carry out essential structural maintenance & repairs', value: 'maintenance_failure' },
          { label: 'Illegal arbitrary rent escalation exceeding lease terms', value: 'rent_hike' },
        ],
        required: true,
      },
      {
        id: 'lease_agreement_status',
        question: 'Do you possess a signed lease agreement & move-out inspection log?',
        helpText: 'Critical evidence for immediate recovery in Rent Authority/Civil Court.',
        type: 'select',
        options: [
          { label: 'Registered / Stamp Paper Lease + Bank payment receipts + Move-out video', value: 'complete_docs' },
          { label: 'Lease agreement present but no formal move-out inspection document', value: 'agreement_only' },
          { label: 'Oral tenancy with bank transaction statements as proof of rent', value: 'oral_tenancy' },
        ],
        required: true,
      }
    ]
  },

  workplace: {
    id: 'workplace',
    name: 'Workplace & Employment Rights',
    shortName: 'Workplace',
    tagline: 'Unpaid salary, wrongful termination, gratuity withholding, or contract breach',
    description: 'Statutory claims for employees, consultants, and gig workers under Industrial & Labour codes.',
    iconName: 'Briefcase',
    accentColor: '#7C3AED',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    badgeText: 'text-purple-700',
    statutoryTimeframe: '15–30 Days pre-action labour commissioner demand',
    primaryStatute: 'Payment of Wages Act, 1936 & Industrial Disputes Act / Payment of Gratuity Act',
    sampleProblems: [
      'Employer withheld 3 months salary and full & final settlement after resignation',
      'Sudden verbal termination without notice pay or statutory severance',
      'Delay in issuing relieving letter and experience certificate'
    ],
    intakeQuestions: [
      {
        id: 'employer_name',
        question: 'Company / Employer Name and Office Location?',
        helpText: 'Registered business name, CIN if known, and HR/Director name.',
        type: 'text',
        placeholder: 'e.g., Apex Infotech Solutions Ltd., Koramangala, Bengaluru',
        required: true,
      },
      {
        id: 'job_title_tenure',
        question: 'Your designation, monthly compensation, and tenure of service?',
        helpText: 'Mention start date, last working day (LWD), and gross monthly salary.',
        type: 'text',
        placeholder: 'e.g., Senior Operations Associate, ₹65,000/mo, Worked from March 2022 to October 2024',
        required: true,
      },
      {
        id: 'dues_claimed',
        question: 'What total amount is overdue (Salary, Gratuity, Notice Pay, Bonus)?',
        helpText: 'List itemized breakdown of unpaid compensation.',
        type: 'textarea',
        placeholder: 'e.g., 1. Pending salary for Sept & Oct 2024: ₹1,30,000\n2. Gratuity (2.5 years completed): ₹45,000\n3. Leave encashment: ₹18,000. Total: ₹1,93,000',
        required: true,
      },
      {
        id: 'relieving_letter_status',
        question: 'Has the company withheld relieving or experience documents?',
        helpText: 'Withholding employment records is actionable under civil law and labour codes.',
        type: 'radio',
        options: [
          { label: 'Yes, both monetary dues and relieving letter are withheld', value: 'money_and_letters' },
          { label: 'Relieving letter issued, but monetary settlement unpaid', value: 'money_only' },
          { label: 'Wrongful termination with immediate lockout from systems', value: 'lockout' },
        ],
        required: true,
      },
      {
        id: 'resignation_notice_served',
        question: 'Did you serve your contractual notice period or buyout?',
        helpText: 'Confirms compliance with employment contract terms.',
        type: 'select',
        options: [
          { label: 'Yes, served full contractual notice period with written HR sign-off', value: 'full_notice' },
          { label: 'Resignation accepted with waiver of remaining notice period', value: 'waived' },
          { label: 'Terminated summarily without cause by employer', value: 'terminated_by_employer' },
        ],
        required: true,
      }
    ]
  },

  govt_scheme: {
    id: 'govt_scheme',
    name: 'Government Scheme & Welfare Access',
    shortName: 'Govt Scheme',
    tagline: 'Delayed subsidies, pension stoppage, ration entitlements, or housing grant denial',
    description: 'Enforce statutory welfare entitlements, direct benefit transfers (DBT), or public scheme delivery.',
    iconName: 'Landmark',
    accentColor: '#0891B2',
    badgeBg: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    badgeText: 'text-cyan-700',
    statutoryTimeframe: '21 Days grievance resolution under Citizen Charter',
    primaryStatute: 'Public Services Guarantee Act / National Food Security Act / PM-Kisan Guidelines',
    sampleProblems: [
      'Old Age Pension disbursement abruptly stopped without official notification',
      'PM Awas Yojana subsidy approved but instalment not credited to beneficiary bank account',
      'Ration card application pending beyond statutory 30-day delivery mandate'
    ],
    intakeQuestions: [
      {
        id: 'scheme_name',
        question: 'Which Government Scheme or Welfare Benefit is involved?',
        helpText: 'Specify central or state scheme name (e.g. PM-Kisan, Old Age Pension, PMAY).',
        type: 'text',
        placeholder: 'e.g., National Social Assistance Programme (NSAP) - Old Age Pension',
        required: true,
      },
      {
        id: 'application_number',
        question: 'Beneficiary ID, Application Reference Number, or Ration/Aadhaar Card No?',
        helpText: 'Official tracking identifier assigned during original enrollment.',
        type: 'text',
        placeholder: 'e.g., Beneficiary ID #PEN-2023-88319 / App Ref #GOV-99412',
        required: true,
      },
      {
        id: 'grievance_nature',
        question: 'What is the specific issue with the scheme benefit?',
        helpText: 'Describe how the service delivery was interrupted or delayed.',
        type: 'textarea',
        placeholder: 'e.g., Monthly pension of ₹2,500 has not been disbursed for 5 consecutive months despite active bank KYC verification.',
        required: true,
      },
      {
        id: 'department_office',
        question: 'Which local office or officer did you submit the application to?',
        helpText: 'e.g. District Social Welfare Officer, Block Development Office (BDO), Tehsildar.',
        type: 'text',
        placeholder: 'e.g., District Social Welfare Officer, Collectorate Campus, Bareilly',
        required: true,
      },
      {
        id: 'escalation_tier',
        question: 'Have you registered a grievance on CPGRAMS or the State CM Helpline?',
        helpText: 'Helps determine whether to file a Departmental Representation or Vigilance Appeal.',
        type: 'select',
        options: [
          { label: 'Not yet filed on grievance portals; need formal representation', value: 'first_time' },
          { label: 'Filed on CPGRAMS/State portal, but closed without resolution', value: 'cpgrams_closed' },
          { label: 'Local office claims records are missing or pending district sign-off', value: 'missing_file' },
        ],
        required: true,
      }
    ]
  },

  cyber: {
    id: 'cyber',
    name: 'Cyber Crime & Financial Fraud',
    shortName: 'Cyber',
    tagline: 'Online financial scam, phishing, unauthorized transaction, or identity impersonation',
    description: 'Immediate evidence freezing, bank alert mandates, and Cyber Cell statutory reporting.',
    iconName: 'ShieldAlert',
    accentColor: '#E11D48',
    badgeBg: 'bg-rose-50 text-rose-700 border-rose-200',
    badgeText: 'text-rose-700',
    statutoryTimeframe: 'Immediate (Golden Hour 24–48h) + 7 Days RBI Zero Liability Notice',
    primaryStatute: 'Information Technology Act, 2000 (Section 43A, 66D) & RBI Cyber Fraud Circular (2017)',
    sampleProblems: [
      'Unauthorized debit of ₹78,000 via fraudulent UPI link / SIM swap',
      'Telegram job scam with money transferred to fraudulent merchant mule accounts',
      'Impersonation of bank manager to extract OTP and transfer funds'
    ],
    intakeQuestions: [
      {
        id: 'fraud_type',
        question: 'What category of cyber fraud occurred?',
        helpText: 'Select the vector used by the fraudster.',
        type: 'radio',
        options: [
          { label: 'Unauthorized UPI / NetBanking transaction (Phishing / Remote access)', value: 'unauthorized_banking' },
          { label: 'Fake investment / Telegram task / Job portal scam', value: 'investment_scam' },
          { label: 'Online marketplace / Delivery fraud / Impersonation', value: 'marketplace_fraud' },
          { label: 'Identity theft, blackmail, or morphed image harassment', value: 'identity_blackmail' },
        ],
        required: true,
      },
      {
        id: 'fraud_amount',
        question: 'Total financial loss & exact timestamp of fraudulent transactions?',
        helpText: 'Time of occurrence is critical for triggering the National Cybercrime Portal (1930) lien freeze.',
        type: 'text',
        placeholder: 'e.g., ₹85,000 across 2 transactions on 28 Aug 2024 at 14:22 hrs and 14:28 hrs',
        required: true,
      },
      {
        id: 'bank_account_details',
        question: 'Your Bank, Account/Card Number (Last 4 digits), and Beneficiary UPI/Account?',
        helpText: 'Provide your originating bank and the fraudster\'s recipient details (VPA, UPI ID, Phone, Account).',
        type: 'textarea',
        placeholder: 'e.g., Debited from HDFC Bank A/c ...4819. Sent to fraudster UPI: pay-refund921@upi (Transaction ID: 4291882190).',
        required: true,
      },
      {
        id: 'bank_reported_status',
        question: 'Did you notify your bank within 3 days (RBI Zero Liability rule)?',
        helpText: 'Under RBI rules, reporting within 3 days places zero financial liability on the customer.',
        type: 'select',
        options: [
          { label: 'Reported to bank customer care within 24 hours (Ticket generated)', value: 'reported_within_24h' },
          { label: 'Reported to bank within 2–3 days', value: 'reported_within_3d' },
          { label: 'Have not yet formally notified bank nodal officer in writing', value: 'not_reported_yet' },
        ],
        required: true,
      },
      {
        id: 'evidence_collected',
        question: 'Do you have transaction SMS, bank statement, and scam chat screenshots?',
        helpText: 'Will be structured into an annexure for the Cyber Crime Police Station complaint.',
        type: 'select',
        options: [
          { label: 'Yes, full screenshot trail, call recordings, and official bank statement ready', value: 'full_evidence' },
          { label: 'Bank statement and SMS screenshots only', value: 'partial_evidence' },
        ],
        required: true,
      }
    ]
  }
};

export const ISSUE_TYPE_LIST = Object.values(ISSUE_TYPES);
