import { FaqItem } from '../types';

export const MOCK_FAQS: FaqItem[] = [
  {
    id: 'faq-01',
    category: 'general',
    question: 'What is CivicGuide — ActionRadar?',
    answer: 'CivicGuide is an independent citizen-assist platform. It helps you diagnose civic, consumer, tenancy, labour, and cyber grievances, identifies statutory legal provisions, crafts formal applications and demand notices, and tracks statutory deadlines through a progressive 8-stage case timeline.',
    actionTip: 'CivicGuide provides drafting assistance and strategic guidance; it does not represent citizens as legal counsel or file directly with authorities.'
  },
  {
    id: 'faq-02',
    category: 'general',
    question: 'Does CivicGuide officially submit my document to government portals?',
    answer: 'No. CivicGuide generates legally sound notices and applications and records your filing references, but you must physically dispatch (via Speed Post/Courier) or submit via official government portals (such as RTI Online, E-Daakhil, CPGRAMS, or National Cybercrime Portal).',
    actionTip: 'Always retain dispatch receipts or online acknowledgment numbers to record in your CivicGuide case tracker.'
  },
  {
    id: 'faq-03',
    category: 'rti',
    question: 'What happens if a Public Information Officer (PIO) does not respond within 30 days?',
    answer: 'Under Section 7(2) of the RTI Act, failure to respond within 30 days is treated as a "Deemed Refusal". You are immediately entitled to file a First Appeal under Section 19(1) before the designated First Appellate Authority without paying additional fees, and the officer may face penalties under Section 20.',
    statuteReference: 'RTI Act 2005, Section 19(1) & Section 20',
    actionTip: 'Use ActionRadar to generate the First Appeal petition as soon as the 30-day countdown reaches zero.'
  },
  {
    id: 'faq-04',
    category: 'consumer',
    question: 'Is sending a pre-litigation Legal Notice mandatory before going to the Consumer Forum?',
    answer: 'While technically optional, sending a formal 15-day pre-litigation legal notice is strongly advised. It establishes formal proof of deficiency, gives the company a final opportunity to settle out of court, and serves as primary evidence of unfair trade practice before the District Commission.',
    statuteReference: 'Consumer Protection Act, 2019 Section 35',
    actionTip: 'Always dispatch via Registered Speed Post with Acknowledgment Due (AD) and keep the postal receipt.'
  },
  {
    id: 'faq-05',
    category: 'tenant',
    question: 'How long can a landlord hold onto my security deposit after I vacate?',
    answer: 'Under the Model Tenancy Act principles and established civil jurisprudence, a landlord must refund the security deposit upon handover of vacant possession, or within a maximum of 30 days after providing verified third-party repair bills. Arbitrary deductions without bills are legally unenforceable.',
    statuteReference: 'Model Tenancy Act Framework & Section 70 Contract Act',
    actionTip: 'Always record a timestamped video of the clean apartment during key handover as indisputable evidence.'
  },
  {
    id: 'faq-06',
    category: 'workplace',
    question: 'Can an employer withhold my relieving letter if I resigned with proper notice?',
    answer: 'No. Withholding employment certificates or relieving letters after an employee has fulfilled contractual notice is unlawful and can be challenged before the Labour Commissioner as unfair restraint on livelihood.',
    statuteReference: 'Payment of Wages Act 1936 & Industrial Relations Code',
    actionTip: 'Serve a formal demand notice demanding both monetary settlement and relieving letter within 15 days.'
  },
  {
    id: 'faq-07',
    category: 'cyber',
    question: 'What is the RBI "Zero Liability" rule for online banking fraud?',
    answer: 'Under the RBI circular on Unauthorized Electronic Banking Transactions, if a customer notifies their bank within 3 working days of an unauthorized fraud, the customer has ZERO financial liability, and the bank must provide a shadow credit within 10 working days.',
    statuteReference: 'RBI Circular DBR.No.Leg.BC.78/09.07.005/2017-18',
    actionTip: 'Call National Cybercrime Helpline 1930 immediately and send a written notice to your bank nodal officer within 24 hours.'
  },
  {
    id: 'faq-08',
    category: 'govt_scheme',
    question: 'What can I do if a government welfare pension or DBT grant is suddenly halted?',
    answer: 'You can submit a formal Citizen Charter representation to the District Collector and file an online grievance on CPGRAMS (Central Public Grievance Redress and Monitoring System), which carries a 21-day statutory resolution mandate.',
    statuteReference: 'CPGRAMS Citizen Charter / Public Services Guarantee Act',
    actionTip: 'Attach your Aadhaar bank seeding verification receipt and beneficiary ID.'
  }
];
