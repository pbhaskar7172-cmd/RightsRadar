import { SourceItem } from '../types';

export const MOCK_SOURCES: SourceItem[] = [
  // RTI
  {
    id: 'src-rti-01',
    issueType: 'rti',
    title: 'Right to Information Act, 2005 — Section 6(1) & 7(1)',
    sourceType: 'Statutory Act',
    authority: 'Government of India / Department of Personnel & Training',
    citation: 'RTI Act 2005, Act No. 22 of 2005',
    sectionCode: 'Sec. 6(1) & 7(1)',
    summary: 'Establishes statutory obligation on Central/State Public Information Officers to provide requested records within 30 days of application receipt.',
    keyTakeaways: [
      'Statutory 30-day mandate for public records delivery.',
      'Information concerning life and liberty must be provided within 48 hours.',
      'Applicant is not required to give reasons for seeking information.',
      'Nominal statutory fee applies with exemption for BPL citizens.'
    ],
    officialUrl: 'https://rtionline.gov.in',
    relevanceScore: 98
  },
  {
    id: 'src-rti-02',
    issueType: 'rti',
    title: 'First Appeal Procedure under Section 19(1) of RTI Act',
    sourceType: 'Appellate Rule',
    authority: 'Central Information Commission (CIC)',
    citation: 'RTI Act 2005, Section 19(1)',
    sectionCode: 'Sec. 19(1)',
    summary: 'Governs appeals against deemed refusal (no reply in 30 days) or rejection by the PIO, adjudicated by the First Appellate Authority (FAA).',
    keyTakeaways: [
      'First appeal must be preferred within 30 days from expiry of response window.',
      'Appellate authority must dispose appeal within 30 to 45 days.',
      'FAA is senior in rank to the Public Information Officer.'
    ],
    officialUrl: 'https://cic.gov.in',
    relevanceScore: 94
  },

  // Consumer
  {
    id: 'src-cons-01',
    issueType: 'consumer',
    title: 'Consumer Protection Act, 2019 — Section 35 (District Commission Jurisdiction)',
    sourceType: 'Statutory Act',
    authority: 'Ministry of Consumer Affairs, Food & Public Distribution',
    citation: 'CPA 2019, Act No. 35 of 2019',
    sectionCode: 'Sec. 35 & Sec. 2(11)',
    summary: 'Grants power to District Consumer Disputes Redressal Commissions for claims up to ₹50 Lakhs against defective goods, deficient service, or unfair trade practices.',
    keyTakeaways: [
      'Pecuniary jurisdiction for District Commission up to ₹50 Lakhs.',
      'Jurisdiction lies where consumer resides or works, not solely where seller is located.',
      'Provision for pre-litigation statutory notice seeking refund with interest and damages.'
    ],
    officialUrl: 'https://edaakhil.nic.in',
    relevanceScore: 96
  },
  {
    id: 'src-cons-02',
    issueType: 'consumer',
    title: 'Consumer Protection (E-Commerce) Rules, 2020',
    sourceType: 'Citizen Charter',
    authority: 'Central Consumer Protection Authority (CCPA)',
    citation: 'G.S.R. 458(E), Dept of Consumer Affairs',
    sectionCode: 'Rule 4 & 5',
    summary: 'Requires e-commerce platforms and marketplace sellers to appoint nodal grievance officers and process refund/return requests within 48 hours acknowledgment.',
    keyTakeaways: [
      'Grievance acknowledgment mandatory within 48 hours.',
      'Redressal mandatory within 1 month of receipt.',
      'Explicit prohibition on misleading reviews and arbitrary cancellation charges.'
    ],
    officialUrl: 'https://consumerhelpline.gov.in',
    relevanceScore: 92
  },

  // Tenant
  {
    id: 'src-ten-01',
    issueType: 'tenant',
    title: 'Model Tenancy Act & State Rent Authority Regulations',
    sourceType: 'Statutory Act',
    authority: 'Ministry of Housing and Urban Affairs',
    citation: 'Model Tenancy Framework / Section 11 & 13',
    sectionCode: 'Sec. 11 (Security Deposit Cap)',
    summary: 'Caps residential security deposits at maximum 2 months rent and mandates return within 30 days of vacation after deducting agreed repair costs with inspection log.',
    keyTakeaways: [
      'Security deposit must be refunded on date of vacant possession.',
      'Landlord cannot withhold deposit without itemized repair invoices.',
      'Unlawful utility disconnection incurs heavy daily penalty on landlord.'
    ],
    officialUrl: 'https://mohua.gov.in',
    relevanceScore: 95
  },
  {
    id: 'src-ten-02',
    issueType: 'tenant',
    title: 'Transfer of Property Act, 1882 — Section 106 & 108',
    sourceType: 'Statutory Act',
    authority: 'Law Commission of India',
    citation: 'Transfer of Property Act 1882, Act No. 4 of 1882',
    sectionCode: 'Sec. 106 & 108',
    summary: 'Mandates 15 days written notice for monthly lease termination and codifies lessor covenants to maintain quiet enjoyment and tenant covenants to protect premises.',
    keyTakeaways: [
      'Forceful eviction without court decree is strictly illegal.',
      'Written 15-day demand notice is mandatory condition precedent before civil suit.',
      'Bank transaction history valid evidence of tenancy relationship.'
    ],
    officialUrl: 'https://indiacode.nic.in',
    relevanceScore: 90
  },

  // Workplace
  {
    id: 'src-work-01',
    issueType: 'workplace',
    title: 'Payment of Wages Act, 1936 — Section 5 & 15',
    sourceType: 'Statutory Act',
    authority: 'Ministry of Labour and Employment',
    citation: 'Payment of Wages Act 1936, Act No. 4 of 1936',
    sectionCode: 'Sec. 5 & 15',
    summary: 'Directs payment of all accrued wages before the 7th or 10th day of following month, and empowers Labour Authority to award compensation up to 10x deducted wages.',
    keyTakeaways: [
      'Wages on termination must be paid within 2 working days.',
      'Unauthorized deductions strictly illegal.',
      'Direct jurisdiction of Assistant Labour Commissioner (ALC).'
    ],
    officialUrl: 'https://labour.gov.in',
    relevanceScore: 97
  },
  {
    id: 'src-work-02',
    issueType: 'workplace',
    title: 'Payment of Gratuity Act, 1972 — Section 7(3A)',
    sourceType: 'Statutory Act',
    authority: 'Chief Labour Commissioner (Central)',
    citation: 'Payment of Gratuity Act 1972',
    sectionCode: 'Sec. 7(3A)',
    summary: 'Mandates employer to disburse statutory gratuity within 30 days of employee exit, failing which simple interest at 10% p.a. is payable by law.',
    keyTakeaways: [
      'Applicable on completing 4 years and 240 days continuous service.',
      'Mandatory 10% compound interest penalty on delayed disbursement.',
      'Form I claim application to controlling authority.'
    ],
    officialUrl: 'https://samadhan.labour.gov.in',
    relevanceScore: 91
  },

  // Govt Scheme
  {
    id: 'src-sch-01',
    issueType: 'govt_scheme',
    title: 'CPGRAMS Central Citizen Grievance Redressal Mechanism',
    sourceType: 'Citizen Charter',
    authority: 'Department of Administrative Reforms and Public Grievances (DARPG)',
    citation: 'DARPG Office Memorandum No. 1/2021',
    sectionCode: 'DARPG Charter',
    summary: 'Directs every administrative ministry and state nodal officer to redress citizen welfare grievances within a maximum timeframe of 21 working days.',
    keyTakeaways: [
      'Strict 21-day timeline for public grievance resolution.',
      'Option to file Appeal if resolution note is vague or unsatisfactory.',
      'Direct monitoring by Secretary-level nodal officers.'
    ],
    officialUrl: 'https://pgportal.gov.in',
    relevanceScore: 95
  },
  {
    id: 'src-sch-02',
    issueType: 'govt_scheme',
    title: 'National Social Assistance Programme (NSAP) Operating Guidelines',
    sourceType: 'Government Portal',
    authority: 'Ministry of Rural Development',
    citation: 'NSAP DBT Master Directives 2022',
    sectionCode: 'DBT Directives',
    summary: 'Specifies uninterrupted Direct Benefit Transfer (DBT) mandates and procedures for restoring stalled pension disbursements through Aadhaar bank bridge correction.',
    keyTakeaways: [
      'Pensions cannot be arbitrarily stopped without recorded show-cause notice.',
      'District Collector designated appellate authority for blocked accounts.',
      'Back-pay arrears payable upon re-verification.'
    ],
    officialUrl: 'https://nsap.nic.in',
    relevanceScore: 89
  },

  // Cyber
  {
    id: 'src-cyb-01',
    issueType: 'cyber',
    title: 'RBI Circular on Customer Protection — Limiting Liability in Unauthorized Electronic Banking Transactions',
    sourceType: 'Statutory Act',
    authority: 'Reserve Bank of India (RBI)',
    citation: 'RBI/2017-18/15 DBR.No.Leg.BC.78/09.07.005/2017-18',
    sectionCode: 'RBI Zero Liability Directives',
    summary: 'Mandates zero liability for customers who notify the bank of unauthorized electronic fraud within 3 working days of transaction.',
    keyTakeaways: [
      'ZERO liability if notified within 3 working days.',
      'Bank must shadow credit the disputed amount within 10 working days.',
      'Burden of proof is on the bank to prove customer negligence.',
      'Overall complaint resolution capped at 90 days.'
    ],
    officialUrl: 'https://rbi.org.in',
    relevanceScore: 99
  },
  {
    id: 'src-cyb-02',
    issueType: 'cyber',
    title: 'Information Technology Act, 2000 — Section 43A & 66D',
    sourceType: 'Statutory Act',
    authority: 'Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs',
    citation: 'IT Act 2000, Act No. 21 of 2000',
    sectionCode: 'Sec. 43A & 66D',
    summary: 'Defines criminal punishment for cheating by personation using computer resource (up to 3 years imprisonment) and statutory damages for data negligence.',
    keyTakeaways: [
      'National Cybercrime Helpline 1930 coordinates real-time banking lien freezes.',
      'Formal acknowledgment receipt valid for statutory police FIR.',
      'Nodal officers in all scheduled banks connected to CFCFRMS portal.'
    ],
    officialUrl: 'https://cybercrime.gov.in',
    relevanceScore: 95
  }
];
