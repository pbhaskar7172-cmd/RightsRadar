// AI Legal Assistant Service
// Implements the complete multi-step reasoning flow:
// USER INPUT -> UNDERSTAND -> DIAGNOSE -> CONFIRM -> COLLECT MISSING INFORMATION -> GUIDE -> DOCUMENT SUGGESTION -> NEXT ACTION

import { documentTemplateService } from './documentTemplateService.js';

export const aiService = {
  // Analyze initial input and produce understanding, diagnosis, and confirmation
  analyzeScenario: async (userInput) => {
    // Simulate realistic AI latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    const text = userInput.toLowerCase();

    // 1. Cyber / Banking Fraud Detection
    if (
      text.includes('bank') ||
      text.includes('fraud') ||
      text.includes('unauthorized') ||
      text.includes('transaction') ||
      text.includes('upi') ||
      text.includes('scam') ||
      text.includes('hacked') ||
      text.includes('phishing') ||
      text.includes('otp')
    ) {
      return {
        category: 'Financial Fraud & Cybercrime',
        categoryTag: 'Cyber / Banking',
        tags: ['Cyber Crime', 'Banking Ombudsman', 'RBI Mandate', 'Unauthorized Debit'],
        confidence: 96,
        summary: 'Unauthorized financial debit or online banking fraud without authorization or proper authentication.',
        diagnosis: {
          primaryIssue: 'Zero-Liability Banking Dispute & Electronic Fund Transfer Non-Compliance',
          applicableLaws: [
            'RBI Circular on Customer Protection in Electronic Banking Transactions (Zero/Limited Liability)',
            'Information Technology Act, 2000 (Section 66C & 66D)',
            'Consumer Protection Act, 2019 (Deficiency in Banking Services)'
          ],
          statutoryLimitation: 'Report within 3 days for zero liability; maximum 30 days for ombudsman escalation.'
        },
        extractedDetails: {
          incidentType: 'Unauthorized Banking Transaction',
          claimant: 'Account Holder',
          respondent: 'Bank & Payment Intermediary',
          urgency: 'High',
          estimatedAmount: extractAmount(userInput) || '$2,450'
        },
        missingInformationQuestions: [
          { id: 'txn_date', question: 'When did the unauthorized transaction take place?', placeholder: 'e.g. October 22, 2023' },
          { id: 'txn_amount', question: 'What was the exact amount debited?', placeholder: 'e.g. $2,450 or ₹50,000' },
          { id: 'bank_reported', question: 'Did you report it to your bank within 72 hours?', placeholder: 'e.g. Yes, reported via email on same day' },
          { id: 'police_complaint', question: 'Have you filed a complaint with the National Cyber Crime portal or local police?', placeholder: 'e.g. Not yet, or Cyber Crime ref #12345' }
        ],
        documentSuggestion: {
          id: 'consumer-fraud-complaint-904',
          title: 'Consumer Forum Banking Dispute & Ombudsman Complaint',
          type: 'Statutory Banking Complaint',
          description: 'Formal representation seeking immediate credit reversal under RBI zero-liability rules.'
        },
        nextAction: {
          title: 'Draft Ombudsman Dispute Notice',
          ctaText: 'Open in Document Editor',
          route: '/documents/consumer-fraud-complaint-904'
        }
      };
    }

    // 2. Tenant / Landlord Dispute
    if (
      text.includes('landlord') ||
      text.includes('tenant') ||
      text.includes('rent') ||
      text.includes('lease') ||
      text.includes('security deposit') ||
      text.includes('deposit') ||
      text.includes('eviction') ||
      text.includes('heating') ||
      text.includes('apartment')
    ) {
      return {
        category: 'Tenant & Housing Rights',
        categoryTag: 'Property Law',
        tags: ['Tenant Rights', 'Security Deposit', 'Habitability', 'Lease Dispute'],
        confidence: 94,
        summary: 'Dispute regarding tenancy obligations, security deposit deduction, or habitability conditions.',
        diagnosis: {
          primaryIssue: 'Unjustified Security Deposit Withholding / Breach of Tenancy Agreement',
          applicableLaws: [
            'Model Tenancy Act / State Rent Control Legislation',
            'Statutory 30-Day Deposit Return & Itemized Deduction Requirements',
            'Implied Warranty of Habitability'
          ],
          statutoryLimitation: 'Demand notice within 14 days; civil small claims limitation is 3 years.'
        },
        extractedDetails: {
          incidentType: 'Security Deposit & Lease Dispute',
          claimant: 'Tenant',
          respondent: 'Landlord / Property Management Agency',
          urgency: 'Medium',
          estimatedAmount: extractAmount(userInput) || '$3,200'
        },
        missingInformationQuestions: [
          { id: 'lease_end', question: 'When did your tenancy end and when were the keys handed over?', placeholder: 'e.g. October 1, 2023' },
          { id: 'deposit_amt', question: 'What was the initial deposit amount paid?', placeholder: 'e.g. $3,200' },
          { id: 'inspection_rep', question: 'Did the landlord provide a formal itemized deduction receipt within 30 days?', placeholder: 'e.g. No itemized list was provided' },
          { id: 'notice_period', question: 'Did you provide written move-out notice in accordance with the lease?', placeholder: 'e.g. Yes, 30 days prior notice via email' }
        ],
        documentSuggestion: {
          id: 'tenant-deposit-demand-882',
          title: 'Formal Security Deposit Recovery Notice',
          type: 'Dispute Notice',
          description: 'Demands full refund of security deposit with citations to statutory penalties for bad-faith withholding.'
        },
        nextAction: {
          title: 'Review Deposit Demand Draft',
          ctaText: 'Open in Document Editor',
          route: '/documents/tenant-deposit-demand-882'
        }
      };
    }

    // 3. Workplace / Employment Issue
    if (
      text.includes('employer') ||
      text.includes('employee') ||
      text.includes('salary') ||
      text.includes('wage') ||
      text.includes('overtime') ||
      text.includes('fired') ||
      text.includes('severance') ||
      text.includes('harassment') ||
      text.includes('workplace') ||
      text.includes('job')
    ) {
      return {
        category: 'Labor & Employment Law',
        categoryTag: 'Employment Law',
        tags: ['Wage Theft', 'Severance Claim', 'Employment Contract', 'Labor Tribunal'],
        confidence: 93,
        summary: 'Non-payment of earned wages, overtime compensation, or wrongful contractual termination.',
        diagnosis: {
          primaryIssue: 'Violation of Statutory Wage Payment & Employment Terms',
          applicableLaws: [
            'Payment of Wages Act / Fair Labor Standards Act',
            'State Industrial Disputes & Shops and Establishments Act',
            'Contractual Breach of Notice Period & Severance'
          ],
          statutoryLimitation: 'Wage claims should be filed within 12 months before the Labor Commissioner.'
        },
        extractedDetails: {
          incidentType: 'Unpaid Wages & Overtime Dispute',
          claimant: 'Employee',
          respondent: 'Employer / Company',
          urgency: 'Medium',
          estimatedAmount: extractAmount(userInput) || '$8,500'
        },
        missingInformationQuestions: [
          { id: 'last_worked', question: 'What was your last working date with the employer?', placeholder: 'e.g. September 28, 2023' },
          { id: 'unpaid_months', question: 'Which months or overtime hours remain unpaid?', placeholder: 'e.g. August & September salary + 40 hrs overtime' },
          { id: 'contract_copy', question: 'Do you have a signed appointment letter or employment agreement?', placeholder: 'e.g. Yes, offer letter dated Jan 2022' },
          { id: 'hr_emails', question: 'Have you sent written follow-ups to HR/Management?', placeholder: 'e.g. 3 emails sent with no response' }
        ],
        documentSuggestion: {
          id: 'workplace-salary-demand',
          title: 'Formal Legal Demand Notice for Unpaid Wages',
          type: 'Employment Demand Notice',
          description: 'Formal demand under statutory labor laws for immediate clearance of pending compensation and damages.'
        },
        nextAction: {
          title: 'Generate Wage Demand Notice',
          ctaText: 'Open in Document Editor',
          route: '/documents/legal-notice-draft-894'
        }
      };
    }

    // 4. Police / Criminal / Stolen Property Complaint
    if (
      text.includes('police') ||
      text.includes('stolen') ||
      text.includes('theft') ||
      text.includes('fir') ||
      text.includes('assault') ||
      text.includes('threat') ||
      text.includes('robbery') ||
      text.includes('lost')
    ) {
      return {
        category: 'Criminal Law & Police Procedure',
        categoryTag: 'Police Complaint',
        tags: ['FIR Registration', 'Cognizable Offense', 'Property Recovery', 'CrPC Section 154'],
        confidence: 95,
        summary: 'Incident involving theft, loss of valuable property, or offense requiring formal police reporting.',
        diagnosis: {
          primaryIssue: 'Mandatory Registration of First Information Report (FIR) / Police Petition',
          applicableLaws: [
            'Code of Criminal Procedure (CrPC Section 154 / BNSS)',
            'Indian Penal Code / Relevant Penal Statutes for Theft & Criminal Breach of Trust',
            'Supreme Court Guidelines (Lalita Kumari Mandate on FIR Registration)'
          ],
          statutoryLimitation: 'Report immediately to avoid evidential delay and facilitate tracking.'
        },
        extractedDetails: {
          incidentType: 'Theft / Criminal Incident',
          claimant: 'Complainant / Victim',
          respondent: 'Unknown Perpetrator / Accused',
          urgency: 'High',
          estimatedAmount: extractAmount(userInput) || 'Asset Value Under Valuation'
        },
        missingInformationQuestions: [
          { id: 'incident_time', question: 'Exact date, time, and location of the incident?', placeholder: 'e.g. Yesterday at 6:30 PM outside Central Station' },
          { id: 'item_identifiers', question: 'Serial numbers, IMEI, vehicle registration or distinctive marks?', placeholder: 'e.g. Model, serial number, invoice' },
          { id: 'witnesses', question: 'Were there any CCTV cameras or witnesses present?', placeholder: 'e.g. CCTV at shop front facing location' },
          { id: 'station_visited', question: 'Have you visited the local police station or submitted an online report?', placeholder: 'e.g. Police refused FIR, gave diary entry only' }
        ],
        documentSuggestion: {
          id: 'police-fir-petition',
          title: 'Formal Police Complaint & Section 154(3) Petition',
          type: 'Criminal Complaint Petition',
          description: 'Formal written representation to the Station House Officer (SHO) and Superintendent of Police.'
        },
        nextAction: {
          title: 'Draft Police Complaint Petition',
          ctaText: 'Open in Document Editor',
          route: '/documents/legal-notice-draft-894'
        }
      };
    }

    // 5. Government / RTI / Civic Inaction
    if (
      text.includes('rti') ||
      text.includes('government') ||
      text.includes('municipality') ||
      text.includes('passport') ||
      text.includes('pension') ||
      text.includes('officer') ||
      text.includes('public authority') ||
      text.includes('bribe') ||
      text.includes('delay') ||
      text.includes('certificate')
    ) {
      return {
        category: 'Administrative & Right to Information',
        categoryTag: 'Government / RTI',
        tags: ['RTI Act 2005', 'Public Grievance', 'Administrative Inaction', 'CPIO Request'],
        confidence: 91,
        summary: 'Inordinate delay or failure by a public authority in delivering statutory citizen services or records.',
        diagnosis: {
          primaryIssue: 'Statutory Right to Information & Public Grievance Redressal',
          applicableLaws: [
            'Right to Information Act, 2005 (Section 6(1))',
            'Citizen Charter Mandated Timelines',
            'Administrative Law & Writ Jurisdiction for Inaction'
          ],
          statutoryLimitation: 'RTI mandate requires response within 30 days (48 hours for life/liberty).'
        },
        extractedDetails: {
          incidentType: 'Public Authority Grievance / RTI Request',
          claimant: 'Citizen Applicant',
          respondent: 'Public Information Officer (PIO) & Department',
          urgency: 'Medium',
          estimatedAmount: 'Statutory Public Duty'
        },
        missingInformationQuestions: [
          { id: 'dept_name', question: 'Which specific department or public authority is responsible?', placeholder: 'e.g. Regional Passport Office / Municipal Corporation' },
          { id: 'application_ref', question: 'What is your original application or acknowledgment tracking number?', placeholder: 'e.g. File #RPO-982173' },
          { id: 'delay_duration', question: 'How long has the application been pending past the statutory deadline?', placeholder: 'e.g. Pending for 90 days with no status' },
          { id: 'specific_records', question: 'What specific file notes or daily progress records do you seek?', placeholder: 'e.g. Daily progress report and names of dealing assistants' }
        ],
        documentSuggestion: {
          id: 'rti-application-draft',
          title: 'Formal Application under Section 6(1) of RTI Act',
          type: 'RTI Statutory Petition',
          description: 'Precise questionnaire compelling disclosure of official file notes, reasons for delay, and responsible officers.'
        },
        nextAction: {
          title: 'Draft RTI Application',
          ctaText: 'Open in Document Editor',
          route: '/documents/legal-notice-draft-894'
        }
      };
    }

    // 6. Insurance Claim Dispute / Repudiation
    if (
      text.includes('insurance') ||
      text.includes('policy') ||
      text.includes('claim') ||
      text.includes('repudiated') ||
      text.includes('mediclaim') ||
      text.includes('tpa') ||
      text.includes('insurer')
    ) {
      return {
        category: 'Insurance & Claims',
        categoryTag: 'Insurance Dispute',
        tags: ['Insurance Ombudsman', 'Claim Repudiation', 'Policy Violation', 'Deficiency of Service'],
        confidence: 94,
        summary: 'Dispute regarding arbitrary rejection, deduction, or delay in settlement of an insurance claim.',
        diagnosis: {
          primaryIssue: 'Unjustified Repudiation of Legitimate Insurance Claim',
          applicableLaws: [
            'Insurance Regulatory and Development Authority of India (IRDAI) Policyholder Regulations',
            'Insurance Ombudsman Rules, 2017',
            'Consumer Protection Act, 2019 (Deficiency in Insurance Service)'
          ],
          statutoryLimitation: 'Ombudsman escalation within 1 year of insurer rejection/no response after 30 days.'
        },
        extractedDetails: {
          incidentType: 'Insurance Claim Repudiation',
          claimant: 'Policyholder / Insured',
          respondent: 'Insurance Company & TPA',
          urgency: 'High',
          estimatedAmount: extractAmount(userInput) || '$4,500'
        },
        missingInformationQuestions: [
          { id: 'policy_num', question: 'What is your Insurance Policy number and Claim ID?', placeholder: 'e.g. Policy #POL-99218 / Claim #CLM-4019' },
          { id: 'repudiation_date', question: 'When did the insurer repudiate or reject the claim?', placeholder: 'e.g. October 10, 2023' },
          { id: 'rejection_reason', question: 'What reason did the insurer state for rejection?', placeholder: 'e.g. Alleged pre-existing disease / Non-disclosure clause' },
          { id: 'claim_amount', question: 'What was the exact claim amount denied?', placeholder: 'e.g. $4,500' }
        ],
        documentSuggestion: {
          id: 'insurance-complaint-draft',
          title: 'Insurance Claim Dispute & Ombudsman Intimation',
          type: 'Insurance Ombudsman Representation',
          description: 'Formal representation refuting arbitrary repudiation grounds with policy citations and medical records.'
        },
        nextAction: {
          title: 'Draft Insurance Dispute Notice',
          ctaText: 'Open in Document Editor',
          route: '/documents/insurance-complaint-draft'
        }
      };
    }

    // 6. Generic / Consumer / Contract Breach (Universal Fallback)
    return {
      category: 'Consumer & Commercial Law',
      categoryTag: 'Consumer Rights',
      tags: ['Breach of Contract', 'Deficiency in Service', 'Demand Notice', 'Statutory Claim'],
      confidence: 89,
      summary: `Dispute regarding contractual commitments, product/service deficiency, or unfulfilled representations: "${userInput.slice(0, 100)}..."`,
      diagnosis: {
        primaryIssue: 'Breach of Agreement & Unfair Trade Practice',
        applicableLaws: [
          'Consumer Protection Act, 2019',
          'Contract Law & Statutory Damages for Breach',
          'Uniform Commercial Obligations'
        ],
        statutoryLimitation: '2-year limitation period from cause of action.'
      },
      extractedDetails: {
        incidentType: 'Commercial / Service Dispute',
        claimant: 'Aggrieved Party',
        respondent: 'Service Provider / Counterparty',
        urgency: 'Medium',
        estimatedAmount: extractAmount(userInput) || '$150,000'
      },
      missingInformationQuestions: [
        { id: 'event_date', question: 'When did the initial agreement or transaction take place?', placeholder: 'e.g. January 15, 2023' },
        { id: 'counterparty', question: 'What is the full name and address of the counterparty or company?', placeholder: 'e.g. Global Tech Solutions Ltd., San Francisco, CA' },
        { id: 'monetary_loss', question: 'What is the exact financial loss or refund amount claimed?', placeholder: 'e.g. $150,000 USD' },
        { id: 'proof_docs', question: 'What evidence (receipts, contracts, emails, WhatsApp logs) do you have?', placeholder: 'e.g. Signed contract and payment confirmation' }
      ],
      documentSuggestion: {
        id: 'legal-notice-draft-894',
        title: 'Formal Legal Notice & Demand of Refund',
        type: 'Formal Legal Notice',
        description: 'Comprehensive legal notice demanding immediate refund or compliance within 14 business days.'
      },
      nextAction: {
        title: 'Review Generated Legal Notice',
        ctaText: 'Open in Document Editor',
        route: '/documents/legal-notice-draft-894'
      }
    };
  },

  // Synthesize answers to missing questions into a full legal guidance strategy
  generateGuidanceAndDocument: async (analysisResult, answers) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const templateId = documentTemplateService.determineTemplate({
      domain: analysisResult.category,
      category: analysisResult.category,
      incidentType: analysisResult.extractedDetails?.incidentType,
      userPrompt: analysisResult.summary,
      answers: answers
    });

    const templateDef = documentTemplateService.getTemplateById(templateId);

    const generatedDoc = documentTemplateService.generateDocument(templateId, {
      summary: analysisResult.summary,
      claimant: analysisResult.extractedDetails?.claimant,
      respondent: answers.counterparty || analysisResult.extractedDetails?.respondent,
      respondentAddress: answers.counterparty_address,
      claimAmount: answers.monetary_loss || answers.txn_amount || answers.deposit_amt || analysisResult.extractedDetails?.estimatedAmount,
      incidentDate: answers.txn_date || answers.lease_end || answers.event_date || answers.incident_time,
      diagnosis: analysisResult.diagnosis,
      answers: answers
    });

    return {
      templateId: templateId,
      templateName: templateDef.name,
      templateIcon: templateDef.icon,
      templateDescription: templateDef.description,
      strategyOverview: `Based on your provided details (${Object.values(answers).filter(Boolean).join(', ')}), Nyaya AI has structured the formal representation using the ${templateDef.name} under ${analysisResult.diagnosis?.applicableLaws?.[0] || 'applicable statutory standards'}.`,
      recommendedSteps: [
        `Issue the prepared ${templateDef.name} giving a statutory cure period.`,
        'Preserve all digital communication records, payment receipts, and delivery logs.',
        'If no compliance is received within the cure window, file the petition before the appropriate statutory authority.'
      ],
      draftDocument: generatedDoc
    };
  }
};

// Helper: extract monetary amounts ($100, ₹50,000, 2000 USD, etc.)
function extractAmount(text) {
  const match = text.match(/(\$|₹|rs\.?|usd|inr)?\s*(\d{1,3}(,\d{3})*(\.\d{2})?|\d+)\s*(usd|inr|dollars|rupees)?/i);
  if (match) {
    const raw = match[0].trim();
    if (raw.length > 1 && (raw.includes('$') || raw.includes('₹') || raw.toLowerCase().includes('usd') || raw.toLowerCase().includes('rs'))) {
      return raw.toUpperCase();
    }
    return `$${raw}`;
  }
  return null;
}
