import { IssueTypeId } from '../types';

export interface TemplateDraftData {
  title: string;
  docType: 'formal_notice' | 'application_form' | 'grievance_petition' | 'statutory_appeal';
  subject: string;
  defaultAuthority: string;
  generateContent: (data: {
    applicantName: string;
    applicantAddress?: string;
    applicantPhone?: string;
    applicantEmail?: string;
    authorityName: string;
    authorityAddress?: string;
    incidentDate?: string;
    problemSummary: string;
    answers?: Record<string, string>;
    dateStr?: string;
  }) => string;
}

export const DOCUMENT_TEMPLATES: Record<IssueTypeId, TemplateDraftData> = {
  rti: {
    title: 'Formal RTI Application under Section 6(1)',
    docType: 'application_form',
    subject: 'Application for seeking information under Section 6(1) of the Right to Information Act, 2005',
    defaultAuthority: 'The Public Information Officer (PIO)',
    generateContent: (d) => {
      const today = d.dateStr || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
      const records = d.answers?.information_details || d.problemSummary;
      const timePeriod = d.answers?.time_period || 'Past 12 Months';
      const authority = d.authorityName || 'Public Information Officer';
      
      return `To,
The Central / State Public Information Officer (CPIO / SPIO),
${authority},
${d.authorityAddress || 'Office of the Competent Authority, New Delhi / State Secretariat'}

Date: ${today}

SUBJECT: Application seeking information under Section 6(1) of the Right to Information Act, 2005.

Respected Sir / Madam,

1. PARTICULARS OF THE APPLICANT:
   Name: ${d.applicantName || 'Citizen Applicant'}
   Address: ${d.applicantAddress || '123, Sector 4, Civic Enclave, City - 110001'}
   Contact: ${d.applicantPhone || '+91 98765 43210'} | Email: ${d.applicantEmail || 'citizen.applicant@email.com'}
   Citizenship: Citizen of India

2. PARTICULARS OF INFORMATION SOUGHT:
   Please provide certified copies of the following official records and documents pertaining to the time period [${timePeriod}]:

   a) ${records.split('\n').join('\n   b) ')}
   
   c) Certified copies of all official file notings, inspection reports, inter-departmental correspondences, and sanction orders related to the above matter.
   
   d) Names and designations of the nodal officials responsible for processing and approving the aforementioned files.

3. STATUTORY TIMEFRAME & FEE DETAILS:
   - As per Section 7(1) of the RTI Act, 2005, the requested information is required to be provided within 30 days of receipt of this application.
   - Statutory application fee of ₹10/- has been remitted via Postal Order / Court Fee Stamp / Online Portal.
   - In case any additional document copy charges are applicable as per RTI Rules, please notify the applicant with the breakdown.

4. DEEMED REFUSAL & TRANSFER NOTICE:
   - If the subject matter or records pertain to another Public Authority, please transfer this application under Section 6(3) of the RTI Act within 5 days with intimation to the undersigned.

Yours faithfully,

(Signature of Applicant)
${d.applicantName || 'Citizen Applicant'}`;
    }
  },

  consumer: {
    title: 'Statutory Pre-Litigation Legal Notice under CPA 2019',
    docType: 'formal_notice',
    subject: 'Legal Notice for Deficiency of Service, Defective Product & Unfair Trade Practice under Section 35 of Consumer Protection Act, 2019',
    defaultAuthority: 'The Grievance Redressal Officer / Legal Counsel',
    generateContent: (d) => {
      const today = d.dateStr || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
      const company = d.authorityName || 'Vendor / Manufacturer Pvt. Ltd.';
      const tx = d.answers?.transaction_details || 'Invoice referenced in complaint';
      const deficiency = d.answers?.deficiency_description || d.problemSummary;

      return `WITHOUT PREJUDICE / REGISTERED SPEED POST & EMAIL

Date: ${today}

TO:
The Managing Director / Legal Cell,
${company},
${d.authorityAddress || 'Corporate Headquarters & Registered Office'}

FROM:
${d.applicantName || 'Aggrieved Consumer'},
${d.applicantAddress || '45-B, Heritage Colony, City - 110001'}
Contact: ${d.applicantPhone || '+91 98765 43210'} | Email: ${d.applicantEmail || 'consumer@email.com'}

SUBJECT: STATUTORY PRE-LITIGATION LEGAL NOTICE under Consumer Protection Act, 2019 for Defective Goods, Deficiency in Service, and Unfair Trade Practice.

Sir / Madam,

Under instructions from and on behalf of the Consumer named above, this formal statutory notice is served upon you as follows:

1. TRANSACTION & CONTRACTUAL RELATIONSHIP:
   The Consumer purchased / subscribed to your goods/services under ${tx}, against valid monetary consideration. The product/service was sold with explicit warranties of merchantability and merchantable fitness.

2. ACTS OF DEFICIENCY & BREACH OF WARRANTY:
   ${deficiency}
   Despite multiple formal representations and customer support tickets, your company has failed and neglected to rectify the defect, deliver adequate replacement, or process the legitimate refund.

3. STATUTORY VIOLATIONS:
   Your acts and omissions constitute a gross "Deficiency in Service" under Section 2(11) and "Unfair Trade Practice" under Section 2(47) of the Consumer Protection Act, 2019, causing severe financial loss and mental harassment to the Consumer.

4. DEMAND & 15-DAY NOTICE PERIOD:
   You are hereby called upon to comply with the following within FIFTEEN (15) DAYS of receipt of this notice:
   a) Remit full refund of the invoice amount along with interest @ 12% p.a. from date of transaction.
   b) Disburse compensation of ₹25,000/- towards mental harassment and inconvenience caused.
   c) Reimburse ₹5,000/- towards expenses incurred for issuing this legal notice.

TAKE NOTE that if you fail to comply within the stipulated 15 days, my client will initiate formal complaint proceedings before the Hon'ble District Consumer Disputes Redressal Commission (DCDRC) under Section 35 of CPA 2019, seeking heavy exemplary punitive damages and litigation costs entirely at your risk.

Yours sincerely,

(Signature)
${d.applicantName || 'Aggrieved Consumer'}`;
    }
  },

  tenant: {
    title: 'Formal Demand Notice for Immediate Refund of Security Deposit',
    docType: 'formal_notice',
    subject: 'Statutory Demand Notice for Unlawful Withholding of Security Deposit & Peaceful Tenancy Clearance',
    defaultAuthority: 'Landlord / Property Owner',
    generateContent: (d) => {
      const today = d.dateStr || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
      const landlord = d.authorityName || 'Property Owner';
      const property = d.answers?.premises_address || 'Rented Premises Address';
      const deposit = d.answers?.deposit_amount || 'Security Deposit Amount';

      return `FORMAL STATUTORY DEMAND NOTICE — REGISTERED SPEED POST & EMAIL

Date: ${today}

TO:
${landlord},
Address: ${d.authorityAddress || 'Owner Residence / Registered Lease Address'}

FROM:
${d.applicantName || 'Tenant (Outgoing)'},
Current Address: ${d.applicantAddress || 'Civic Enclave, City - 110001'}
Contact: ${d.applicantPhone || '+91 98765 43210'}

SUBJECT: Formal Demand Notice for immediate refund of refundable security deposit for premises: [${property}].

Sir / Madam,

1. TENANCY BACKGROUND:
   I was a bona fide tenant occupying the residential/commercial premises located at [${property}] under our executed lease agreement. All monthly rentals and utility bills up to the handover date have been paid without default.

2. VACATION & VACANT POSSESSION HANDOVER:
   Peaceful, vacant possession of the premises was handed over on the agreed date along with all keys. A joint visual walkthrough was conducted, and no structural damage attributable to tenant negligence was recorded.

3. UNLAWFUL WITHHOLDING OF SECURITY DEPOSIT:
   You are holding a refundable security deposit of [${deposit}]. Despite repeated reminders and provision of bank details for electronic transfer, you have arbitrarily failed to return the amount. Under tenancy law and Model Tenancy regulations, a landlord cannot withhold security deposits without providing verified, itemized third-party repair bills within 30 days.

4. 15-DAY FINAL DEMAND:
   You are hereby given formal notice to credit the full security deposit of [${deposit}] into my designated bank account within FIFTEEN (15) DAYS of this notice.

   Bank Details:
   A/c Holder: ${d.applicantName || 'Tenant'}
   Bank: State Bank of India | IFSC: SBIN0001234
   A/c No.: XXXXXXXX4819

In event of default, I shall proceed with filing a recovery application before the Rent Authority / Civil Court under the applicable Rent Control Act and Section 70 of the Indian Contract Act, claiming 18% p.a. penal interest and litigation damages.

Yours sincerely,

(Signature)
${d.applicantName || 'Tenant'}`;
    }
  },

  workplace: {
    title: 'Statutory Demand Notice for Unpaid Salary, F&F Settlement & Relieving Documents',
    docType: 'formal_notice',
    subject: 'Demand Notice under Payment of Wages Act, 1936 and Industrial Disputes Act for Full and Final Settlement and Relieving Certificate',
    defaultAuthority: 'Board of Directors / Head of Human Resources',
    generateContent: (d) => {
      const today = d.dateStr || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
      const employer = d.authorityName || 'Company Name Pvt. Ltd.';
      const tenure = d.answers?.job_title_tenure || 'Designation and Tenure';
      const dues = d.answers?.dues_claimed || d.problemSummary;

      return `WITHOUT PREJUDICE — FORMAL LABOUR & EMPLOYMENT DEMAND NOTICE

Date: ${today}

TO:
The Board of Directors / Chief Human Resources Officer,
${employer},
${d.authorityAddress || 'Registered Corporate Office, Bengaluru / Mumbai / Delhi'}

FROM:
${d.applicantName || 'Ex-Employee'},
${d.applicantAddress || 'City - 110001'}
Contact: ${d.applicantPhone || '+91 98765 43210'} | Email: ${d.applicantEmail || 'employee@email.com'}

SUBJECT: Formal Demand Notice for disbursal of unpaid statutory compensation, Full & Final (F&F) Settlement, and issuance of Relieving & Experience Certificates.

Dear Sir / Madam,

1. EMPLOYMENT PARTICULARS:
   I was employed with your esteemed organization as [${tenure}]. My separation was duly formalized following standard resignation / notice protocols.

2. OUTSTANDING STATUTORY DUES:
   As on date, your company has unlawfully withheld the following legitimate dues:
   ${dues}

3. STATUTORY OBLIGATION & WITHHOLDING OF RELIEVING CERTIFICATE:
   Under Section 5(2) of the Payment of Wages Act, 1936, where the employment of any person is terminated, wages earned by him must be paid before the expiry of the second working day. Furthermore, withholding experience and relieving letters after clearance is illegal and maliciously hampers my future livelihood and career.

4. 15-DAY NOTICE TO SETTLE:
   You are hereby called upon to:
   a) Transfer the total pending sum of overdue dues directly to my salary bank account within 15 days.
   b) Dispatch the original Relieving Letter, No Objection Certificate, and Experience Certificate via registered email and courier.

Failure to settle these statutory dues within 15 days will compel me to approach the Office of the Assistant Labour Commissioner (ALC), the Labour Court, and the Registrar of Companies (ROC) for statutory recovery with 18% penal interest.

Yours faithfully,

(Signature)
${d.applicantName || 'Ex-Employee'}`;
    }
  },

  govt_scheme: {
    title: 'Citizen Charter Grievance Petition & Representation',
    docType: 'grievance_petition',
    subject: 'Urgent Representation regarding delayed welfare benefit disbursement / scheme delivery under Public Services Guarantee Charter',
    defaultAuthority: 'District Magistrate / Head of Department',
    generateContent: (d) => {
      const today = d.dateStr || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
      const scheme = d.answers?.scheme_name || 'Welfare Scheme';
      const appId = d.answers?.application_number || 'Beneficiary ID #12345';
      const office = d.authorityName || 'District Social Welfare Officer';
      const grievance = d.answers?.grievance_nature || d.problemSummary;

      return `CITIZEN GRIEVANCE REPRESENTATION UNDER PUBLIC SERVICES GUARANTEE ACT

Date: ${today}

TO:
The District Collector / District Magistrate & Head of Department,
Office of ${office},
${d.authorityAddress || 'District Administrative Complex, State Government'}

FROM:
${d.applicantName || 'Beneficiary Citizen'},
Address: ${d.applicantAddress || 'Village/Ward 12, District - 110001'}
Aadhaar / Beneficiary Ref: ${appId}
Phone: ${d.applicantPhone || '+91 98765 43210'}

SUBJECT: Formal Representation regarding non-disbursal of legitimate welfare benefit under [${scheme}] — Application Ref: ${appId}.

Respected Sir / Madam,

1. BENEFICIARY ENTITLEMENT:
   I am an eligible, verified citizen beneficiary enrolled under [${scheme}], bearing registration reference: [${appId}]. All requisite biometric verification, bank DBT seeding, and eligibility documents were submitted and approved.

2. GRIEVANCE & SERVICE DELIVERY INTERRUPTION:
   ${grievance}
   The non-disbursal violates the statutory citizen delivery charter and causes acute distress to the beneficiary household.

3. STATUTORY CITIZEN CHARTER MANDATE:
   Under the Public Services Guarantee Act and Central DBT Guidelines, welfare benefits must be credited seamlessly into the Aadhaar-linked beneficiary account. In cases of technical rejections, the department is duty-bound to rectify the bank bridge within 15 days.

4. PRAYER / RELIEF SOUGHT:
   I earnestly request your immediate intervention to:
   a) Cause an immediate inquiry into the blocked disbursement of Scheme [${scheme}].
   b) Disburse the accumulated arrears to the beneficiary bank account without further delay.
   c) Issue a written status report regarding the corrective measures taken.

Attached: Copy of Application Receipt, Aadhaar KYC proof, and Bank Passbook statement.

Yours sincerely,

(Signature / Thumb Impression)
${d.applicantName || 'Beneficiary Citizen'}`;
    }
  },

  cyber: {
    title: 'Formal Cyber Crime Complaint & RBI Zero-Liability Bank Notice',
    docType: 'formal_notice',
    subject: 'Statutory Complaint regarding Cyber Fraud / Unauthorized Financial Debits and Request for Immediate Lien Freeze & Shadow Credit under RBI Directives',
    defaultAuthority: 'Station House Officer, Cyber Crime Police Station & Bank Nodal Officer',
    generateContent: (d) => {
      const today = d.dateStr || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
      const bankDetails = d.answers?.bank_account_details || 'Bank Account Details';
      const loss = d.answers?.fraud_amount || '₹75,000/-';
      const fraudVector = d.answers?.fraud_type || 'Unauthorized Electronic Debit';

      return `URGENT — CYBER CRIME COMPLAINT & RBI ZERO-LIABILITY NOTICE

Date: ${today}

TO:
1. The Station House Officer (SHO), Cyber Crime Police Station,
2. The Principal Nodal Officer / Fraud Monitoring Cell,
   ${d.authorityName || 'HDFC Bank Ltd. / State Bank of India'},
   ${d.authorityAddress || 'Zonal Grievance Center'}

FROM:
${d.applicantName || 'Victim of Cyber Fraud'},
Address: ${d.applicantAddress || '42, Park Avenue, City - 110001'}
Contact: ${d.applicantPhone || '+91 98765 43210'} | Email: ${d.applicantEmail || 'victim@email.com'}

SUBJECT: Formal Complaint for Cyber Fraud (${fraudVector}) of ${loss} and invocation of RBI Circular on Limiting Customer Liability in Unauthorized Electronic Banking Transactions.

Respected Sir / Madam,

1. INCIDENT BRIEF & FINANCIAL TRAIL:
   On [${d.incidentDate || today}], unauthorized electronic transactions were executed from my bank account without my informed consent or authorization:
   - Account / Originating Details: ${bankDetails}
   - Total Unauthorized Debit: ${loss}
   - NCRP / 1930 Helpline Ticket Reference: ACK-${Date.now().toString().slice(-6)}

2. INVOCATION OF RBI ZERO LIABILITY CIRCULAR (DBR.No.Leg.BC.78/09.07.005/2017-18):
   As per RBI Master Directives:
   - The customer has notified the bank within 3 working days of the unauthorized transaction.
   - Under Clause 6 of the Circular, the customer is entitled to ZERO LIABILITY for third-party breaches.
   - Under Clause 9, the bank is statutorily mandated to provide a SHADOW CREDIT of the disputed amount within 10 working days of notification.

3. STATUTORY PRAYER:
   a) To the Cyber Police: Register an FIR under Section 66D of the IT Act, 2000 and Section 318(4) of Bharatiya Nyaya Sanhita (BNS), and issue a Section 91 CrPC notice to beneficiary banks to freeze the destination accounts.
   b) To the Bank Nodal Officer: Mark immediate lien on the beneficiary account, liaise with CFCFRMS / NPCI, and credit the shadow amount into my account as per RBI regulations.

Annexures:
1. Certified Bank Statement showing fraudulent debit.
2. Screenshots of transaction SMS and fraudulent URLs.
3. Copy of Government ID proof.

Yours faithfully,

(Signature)
${d.applicantName || 'Victim of Cyber Fraud'}`;
    }
  }
};
