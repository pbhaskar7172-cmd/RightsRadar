# RightsRadar

### AI-Powered Civic, Legal & Cyber Rights Case Manager

> **Describe your problem once. Understand what applies, take the right action, prepare the required document, track your case, and know what to do next.**

RightsRadar is an AI-powered civic and legal assistance platform designed to help citizens navigate rights-related problems as **persistent cases rather than one-time questions**.

Instead of stopping at an AI-generated answer or document, RightsRadar connects **case understanding, evidence, grounded knowledge, document generation, deadlines, tracking, escalation, and next-best-action recommendations** into a single workflow.

---

## Product Vision

Most legal and civic assistance tools follow:

```text
Question → Answer
```

or:

```text
Problem → Document
```

RightsRadar is designed around a complete case lifecycle:

```text
┌────────────┐
│ UNDERSTAND │
└─────┬──────┘
      ↓
┌────────────┐
│    ACT     │
└─────┬──────┘
      ↓
┌────────────┐
│  DOCUMENT  │
└─────┬──────┘
      ↓
┌────────────┐
│   TRACK    │
└─────┬──────┘
      ↓
┌────────────┐
│ ESCALATE   │
└─────┬──────┘
      ↓
┌────────────┐
│  RESOLVE   │
└────────────┘
```

The central question RightsRadar attempts to answer throughout this lifecycle is:

> **"What should I do next?"**

---

# Why RightsRadar?

Citizens often know that something is wrong but do not know how to convert that problem into an actionable case.

A typical situation may involve:

- identifying the applicable domain,
- understanding the relevant procedure,
- determining the responsible authority,
- collecting appropriate evidence,
- preparing the correct document,
- knowing where and when to submit it,
- tracking the response,
- calculating deadlines,
- and determining when escalation becomes appropriate.

RightsRadar brings these steps together into a persistent case-management workflow.

---

# Core Differentiator — ActionRadar

## **What should I do next?**

ActionRadar is the decision-support layer of RightsRadar.

Instead of simply displaying case information, it evaluates the current case state and surfaces the most relevant next action.

Example states:

```text
🟢 ON TRACK
Case is progressing normally.

🟡 ACTION REQUIRED
The citizen needs to perform the next step.

🔴 DEADLINE PASSED
A relevant response or action window has expired.

⚡ TAKE ACTION
A specific next step is recommended.
```

The objective is to turn complex procedural workflows into a simple, actionable interface.

---

# Product Workflow

```text
                    CITIZEN PROBLEM
                          │
                          ▼
                ┌───────────────────┐
                │ Intelligent Intake│
                └─────────┬─────────┘
                          ▼
                ┌───────────────────┐
                │ Domain Detection  │
                └─────────┬─────────┘
                          ▼
                ┌───────────────────┐
                │ Case Intelligence │
                └─────────┬─────────┘
                          ▼
                ┌───────────────────┐
                │ Smart Questions   │
                └─────────┬─────────┘
                          ▼
                ┌───────────────────┐
                │ Evidence Analysis │
                └─────────┬─────────┘
                          ▼
                ┌───────────────────┐
                │ Grounded Retrieval│
                └─────────┬─────────┘
                          ▼
                ┌───────────────────┐
                │ Reasoning Engine  │
                └─────────┬─────────┘
                          ▼
                ┌───────────────────┐
                │   ActionRadar     │
                └─────────┬─────────┘
                          ▼
                ┌───────────────────┐
                │ Document Engine   │
                └─────────┬─────────┘
                          ▼
                ┌───────────────────┐
                │ Case Tracking     │
                └─────────┬─────────┘
                          ▼
                ┌───────────────────┐
                │ Deadline Engine   │
                └─────────┬─────────┘
                          ▼
                ┌───────────────────┐
                │ Escalation Logic  │
                └─────────┬─────────┘
                          ▼
                       RESOLVE
```

---

# Supported Domains

RightsRadar is designed around multiple civic, legal, and cyber-rights domains.

| Domain                             | Example Use Cases                                                |
| ---------------------------------- | ---------------------------------------------------------------- |
| **RTI / Right to Information**     | Information requests, delayed responses, first appeals           |
| **Consumer Rights**                | Defective products, refunds, service disputes, complaints        |
| **Tenant Rights**                  | Deposit disputes, tenancy conflicts, rental issues               |
| **Workplace Rights**               | Workplace grievances, salary-related disputes, employment issues |
| **Government Schemes**             | Scheme discovery, eligibility, application assistance            |
| **Cyber Fraud / Cyber Complaints** | Online fraud, phishing, payment fraud, cyber incidents           |

The architecture uses domain-specific knowledge, rules, questions, evidence requirements, authorities, templates, deadlines, and escalation workflows.

---

# Key Features

### Intelligent Problem Intake

Citizens can describe their problem using natural language without requiring legal terminology.

### AI-Powered Domain Classification

The system identifies the likely rights domain and allows the user to confirm the classification.

### Structured Case Intelligence

Unstructured narratives are transformed into structured case information that can be used throughout the case lifecycle.

### Adaptive Smart Questions

Instead of forcing users through a fixed questionnaire, RightsRadar identifies missing information and asks context-dependent questions.

### Evidence Intelligence

Documents, images, screenshots, receipts, communications, and other evidence can be analyzed and associated with the case.

### Grounded AI

Relevant source material is retrieved before generating important recommendations or documents.

### Citation & Claim Traceability

Important generated claims can be connected to supporting source material and case evidence.

### AI Hallucination Firewall

Generated citations and claims can be validated against retrieved source material before being surfaced to the user.

### Explainable Recommendations

The system is designed to explain **why** an action is recommended rather than presenting an unexplained answer.

### Document Intelligence

Case information, evidence, and retrieved sources can be used to generate structured legal and civic documents.

### Deterministic Deadline Engine

Critical deadline calculations are handled through explicit procedural rules rather than relying on an LLM for date arithmetic.

### Case Timeline

Every important case event can be represented chronologically.

### Risk & Escalation

The system evaluates case state, deadlines, missing information, and procedural triggers to identify when further action may be required.

### Persistent Case Management

The interaction does not end when a document is generated. The case remains trackable until resolution.

---

# AI/ML Architecture

The AI/ML layer is the intelligence core of RightsRadar.

It is designed as a multi-stage pipeline rather than a single LLM call.

```text
                     USER INPUT
                         │
                         ▼
              ┌─────────────────────┐
              │ Problem Understanding│
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │ Domain Classification│
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │ Case Representation │
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │ Smart Question Engine│
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │ Evidence Intelligence│
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │ Retrieval / RAG      │
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │ Grounding & Validation│
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │ Reasoning Engine     │
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │ Risk / Decision      │
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │ Document Intelligence│
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │ Case State Update    │
              └──────────┬──────────┘
                         ▼
              ┌─────────────────────┐
              │     ActionRadar      │
              └─────────────────────┘
```

---

# 1. Case Intelligence Engine

The Case Intelligence Engine converts an unstructured citizen narrative into a structured representation.

### Example Input

```text
"I bought a laptop online for ₹45,000.
It arrived damaged and the seller refuses
to provide a refund."
```

### Structured Case

```json
{
  "domain": "consumer",
  "issue": "defective_product",
  "amount": 45000,
  "party": "seller",
  "event": "product_received_damaged",
  "prior_action": "seller_contacted",
  "desired_remedy": "refund"
}
```

This structured representation can subsequently drive:

- question generation,
- evidence requirements,
- source retrieval,
- document generation,
- risk assessment,
- deadline calculations,
- and next-action recommendations.

---

# 2. Adaptive Smart Question Engine

A fixed questionnaire asks every user the same questions.

RightsRadar instead aims to determine:

```text
Known Information
        +
Missing Information
        +
Domain Requirements
        +
Evidence Requirements
        +
Current Case State
        ↓
Next Required Question
```

Example:

```text
Known
✓ Seller
✓ Purchase date
✓ Order number

Missing
✗ Invoice
✗ Payment proof
✗ Defect description
✗ Previous response

            ↓

Ask only what is required.
```

This reduces unnecessary user interaction while improving case completeness.

---

# 3. Evidence Intelligence

Evidence is treated as structured information rather than simply an uploaded file.

Potential evidence includes:

- PDFs,
- invoices,
- receipts,
- screenshots,
- emails,
- letters,
- notices,
- transaction records,
- photographs,
- chat conversations,
- and other supporting documents.

The intended processing flow is:

```text
Evidence
   ↓
Document / Image Understanding
   ↓
Information Extraction
   ↓
Entity & Event Detection
   ↓
Evidence Classification
   ↓
Relevance Analysis
   ↓
Claim Association
   ↓
Case Evidence Graph
```

---

# 4. Evidence Graph

RightsRadar models relationships between different parts of a case.

```text
                         CASE
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
          CLAIMS        EVENTS        EVIDENCE
             │             │             │
             │             │             │
             └─────────────┼─────────────┘
                           │
                           ▼
                        SOURCES
```

For example:

```text
Claim
"Seller was notified about the defect."

            ▲
            │ supported by
            │
Evidence
Customer support email

            ▲
            │ records
            │
Event
Complaint submitted
```

This allows the system to reason about whether important claims have supporting evidence.

---

# 5. Retrieval-Augmented Generation

RightsRadar uses a retrieval-first approach for domain knowledge.

```text
Case Context
     ↓
Query Construction
     ↓
Semantic Retrieval
     ↓
Relevant Source Chunks
     ↓
Reranking / Filtering
     ↓
Grounded Context
     ↓
LLM Reasoning
     ↓
Generated Output
```

The knowledge layer can contain domain-specific:

- legislation,
- regulations,
- official policies,
- government documentation,
- procedural rules,
- scheme information,
- and authoritative guidance.

---

# 6. Source & Claim Traceability

A core design principle is:

> **Important AI-generated claims should be traceable to their supporting sources.**

Conceptually:

```text
Generated Claim
      │
      ▼
Supporting Source
      │
      ▼
Source Document
      │
      ▼
Relevant Section / Passage
```

This provides the foundation for transparent AI-assisted civic guidance.

---

# 7. AI Hallucination Firewall

Legal and civic applications require stronger safeguards than ordinary conversational AI.

RightsRadar therefore separates:

```text
Generation
    ↓
Validation
    ↓
User-facing Output
```

A generated citation can be checked against the retrieved source set.

```text
AI Generated Citation
        ↓
Citation Extraction
        ↓
Source Verification
        ↓
┌───────────────────┐
│ Verified          │
│                   │
│ → Allow           │
└───────────────────┘

OR

┌───────────────────┐
│ Unverified        │
│                   │
│ → Flag / Reject   │
└───────────────────┘
```

The objective is to reduce:

- fabricated citations,
- unsupported legal claims,
- incorrect procedural statements,
- and ungrounded recommendations.

---

# 8. Confidence & Explainability

RightsRadar is designed around explainable decision support.

Instead of:

```text
"Do this."
```

the system should be able to communicate:

```text
Recommended Action
        ↓
Why this action?
        ↓
Relevant Case Facts
        ↓
Supporting Evidence
        ↓
Relevant Sources
        ↓
Confidence
```

This makes AI assistance easier to inspect and challenge.

---

# 9. Case Digital Twin

The **Case Digital Twin** represents the current state of a user's case in structured form.

```text
CASE
│
├── Domain
├── Problem
├── Parties
├── Authority
├── Claims
├── Evidence
├── Documents
├── Events
├── Sources
├── Deadlines
├── Current State
├── Risk
└── Next Best Action
```

As the user provides additional information or records new events, the case representation can evolve.

This allows the AI layer to reason about the **case as a continuously changing state**, rather than treating every interaction as an isolated conversation.

---

# 10. Risk & Next-Best-Action Engine

The decision layer considers signals such as:

```text
Case State
+
Deadline Status
+
Missing Information
+
Evidence State
+
Procedural Trigger
+
Authority Response
+
Previous User Actions
```

These signals can be used to determine:

```text
Current State
      ↓
Risk / Urgency
      ↓
Candidate Actions
      ↓
Rule Validation
      ↓
Source Validation
      ↓
Next Best Action
      ↓
ActionRadar
```

---

# 11. Deterministic Deadline Engine

Critical procedural dates should not depend on an LLM.

The deadline engine uses explicit rules:

```text
Filing / Event Date
        +
Applicable Rule
        +
Configured Time Period
        ↓
Calculated Deadline
        ↓
Current Date
        ↓
Deadline State
```

Possible states include:

```text
UPCOMING
   ↓
DUE SOON
   ↓
DUE
   ↓
OVERDUE
   ↓
ESCALATION ELIGIBLE
```

The AI layer can explain the result, while the underlying date calculation remains deterministic.

---

# 12. Document Intelligence

Documents are generated from the structured case rather than from an isolated prompt.

```text
Structured Case
      +
Claims
      +
Evidence
      +
Retrieved Sources
      +
Procedural Context
      ↓
Document Generation
      ↓
Validation
      ↓
User Review
      ↓
Export / Filing
```

Potential document types include:

- RTI applications,
- complaints,
- notices,
- appeals,
- grievances,
- follow-up communications,
- cyber incident reports,
- and domain-specific forms.

---

# Domain Pack Architecture

RightsRadar is designed to support domain-specific intelligence through reusable **Domain Packs**.

Each domain pack can contain:

```text
DOMAIN PACK
│
├── Knowledge Sources
├── Domain Rules
├── Required Information
├── Smart Questions
├── Evidence Requirements
├── Authorities
├── Document Templates
├── Deadline Rules
└── Escalation Rules
```

This allows new domains to reuse the same core infrastructure.

```text
                    CORE ENGINE
                        │
       ┌────────────────┼────────────────┐
       │                │                │
       ▼                ▼                ▼
      RTI           CONSUMER          CYBER
       │                │                │
       └────────────────┼────────────────┘
                        │
                        ▼
                 ActionRadar
```

---

# System Architecture

```text
                         ┌─────────────────┐
                         │     CITIZEN     │
                         └────────┬────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │      WEB APPLICATION    │
                    │   React / TypeScript    │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │      APPLICATION API    │
                    └────────────┬────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
      ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
      │ Case         │   │ Evidence     │   │ Document     │
      │ Intelligence │   │ Intelligence │   │ Intelligence │
      └──────┬───────┘   └──────┬───────┘   └──────┬───────┘
             │                  │                  │
             └──────────────────┼──────────────────┘
                                ▼
                     ┌────────────────────┐
                     │    DOMAIN ENGINE   │
                     └──────────┬─────────┘
                                │
              ┌─────────────────┼─────────────────┐
              ▼                 ▼                 ▼
        ┌──────────┐      ┌──────────┐      ┌──────────┐
        │   RAG    │      │  RULES   │      │ DEADLINE │
        │  ENGINE  │      │  ENGINE  │      │  ENGINE  │
        └────┬─────┘      └────┬─────┘      └────┬─────┘
             │                 │                 │
             └─────────────────┼─────────────────┘
                               ▼
                    ┌─────────────────────┐
                    │   CASE STATE ENGINE │
                    └──────────┬──────────┘
                               ▼
                    ┌─────────────────────┐
                    │     ACTIONRADAR     │
                    │   NEXT BEST ACTION  │
                    └─────────────────────┘
```

---

# Data Model

The case-centric data model is organized around:

```text
USER
 │
 └── CASE
      │
      ├── CLAIMS
      ├── EVIDENCE
      ├── DOCUMENTS
      ├── EVENTS
      ├── DEADLINES
      ├── ACTIONS
      └── SOURCES
```

### Case

Stores the core state of a citizen's problem.

### Claims

Represents important assertions made within the case.

### Evidence

Stores supporting material associated with the case.

### Documents

Stores generated or reviewed documents.

### Events

Maintains chronological case history.

### Deadlines

Stores important procedural dates and their states.

### Actions

Represents completed, pending, and recommended actions.

### Sources

Stores references used to ground AI-generated information.

---

# Product Walkthrough

## 01 — Start a Case

Citizens begin by describing their problem in natural language.

### Screenshot

01 — Start a Case
Citizens begin by describing their problem in natural language.

![Start a Case](https://github.com/pbhaskar7172-cmd/RightsRadar/blob/front1/Screenshot%202026-09-01%20183735.png?raw=true)

## 05 — Document Generation

The case information is transformed into a structured document for user review.

![Document Generation](https://github.com/pbhaskar7172-cmd/RightsRadar/blob/front1/Screenshot%202026-09-01%20190049.png)

## 06 — Case Dashboard

The user can monitor active cases and their current status.

![DashBoard](https://github.com/pbhaskar7172-cmd/RightsRadar/blob/front1/Screenshot%202026-09-01%20190111.png)


## 07 — Case Timeline

Important case events are displayed chronologically.

![CaseTimeline](https://github.com/pbhaskar7172-cmd/RightsRadar/blob/front1/Screenshot%202026-09-01%20190129.png)

## 08 — Evidence Management

Users can review and manage evidence associated with a case.

![Evidence](https://github.com/pbhaskar7172-cmd/RightsRadar/blob/front1/Screenshot%202026-09-01%20190145.png)

# Example Case Journey

## Consumer Rights

### Problem

> "I bought a phone online. It arrived defective and the seller is refusing to refund me."

### RightsRadar Workflow

```text
Natural Language Problem
          ↓
Consumer Domain Detected
          ↓
Relevant Information Extracted
          ↓
Missing Information Identified
          ↓
Smart Questions
          ↓
Evidence Collected
          ↓
Relevant Sources Retrieved
          ↓
Recommended Action
          ↓
Complaint / Notice Generated
          ↓
User Reviews Document
          ↓
Case Marked as Filed
          ↓
Case Tracking
          ↓
Deadline Monitoring
          ↓
ActionRadar
          ↓
Follow-up / Escalation
```

---

# Example Cyber Fraud Journey

For cyber incidents, RightsRadar is designed around a safety-first workflow.

```text
Cyber Incident
      ↓
Incident Classification
      ↓
Immediate Safety Guidance
      ↓
Evidence Preservation
      ↓
Incident Information
      ↓
Structured Case
      ↓
Official Reporting Guidance
      ↓
Case Tracking
      ↓
Follow-up
```

RightsRadar should not claim that a complaint has been filed unless an actual external filing integration has completed the operation.

---

# Technology Stack

## Frontend

| Technology        | Purpose                       |
| ----------------- | ----------------------------- |
| **React**         | User interface                |
| **TypeScript**    | Type-safe development         |
| **Vite**          | Development and build tooling |
| **React Router**  | Client-side routing           |
| **Tailwind CSS**  | Styling                       |
| **Framer Motion** | UI animation                  |
| **Lucide React**  | Icon system                   |

## AI / ML

| Component                 | Purpose                                                           |
| ------------------------- | ----------------------------------------------------------------- |
| **LLM**                   | Natural-language understanding, reasoning and document generation |
| **Embeddings**            | Semantic representation of domain knowledge                       |
| **RAG**                   | Retrieval of relevant source material                             |
| **Reranking**             | Improving relevance of retrieved content                          |
| **Structured Extraction** | Converting narratives into case data                              |
| **Citation Validation**   | Verifying generated references                                    |
| **Rule Engine**           | Deterministic procedural logic                                    |
| **Deadline Engine**       | Deterministic date calculation                                    |

## Data & Infrastructure

The production architecture is designed to support:

- relational case data,
- vector search,
- document/object storage,
- authentication,
- AI inference,
- source ingestion,
- and background processing.

---

# Repository Structure

The frontend application is organized around pages, reusable components, shared state, and domain data.

```text
RightsRadar/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── cards/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── radar/
│   │   └── timeline/
│   │
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── CivicDataContext.tsx
│   │
│   ├── data/
│   │   ├── issueTypes.ts
│   │   ├── mockCases.ts
│   │   ├── mockFaqs.ts
│   │   ├── mockNotifications.ts
│   │   ├── mockSources.ts
│   │   └── mockTemplates.ts
│   │
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── StartCasePage.tsx
│   │   ├── IntakePage.tsx
│   │   ├── DiagnosisPage.tsx
│   │   ├── ActionRadarPage.tsx
│   │   ├── SourcesPage.tsx
│   │   ├── DocumentPage.tsx
│   │   ├── SubmissionPage.tsx
│   │   ├── CasesPage.tsx
│   │   ├── CaseDetailPage.tsx
│   │   ├── DocumentsPage.tsx
│   │   ├── EvidencePage.tsx
│   │   ├── NotificationsPage.tsx
│   │   └── HelpPage.tsx
│   │
│   ├── types/
│   └── index.css
│
├── docs/
│   └── screenshots/
│
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

> The AI/ML services can be maintained as a dedicated intelligence layer alongside the application layer as the backend integration is finalized.

---

# Getting Started

## Prerequisites

Make sure the following are installed:

- Node.js
- npm

Check your installation:

```bash
node --version
npm --version
```

---

## Clone the Repository

```bash
git clone https://github.com/shubham01r/RightsRadar.git
cd RightsRadar
```

---

## Install Dependencies

```bash
npm install
```

---

## Start Development Server

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

Typically:

```text
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

---

## Preview Production Build

```bash
npm run preview
```

---

# AI/ML Development

The AI/ML layer is being integrated into the same RightsRadar system and is responsible for the intelligence capabilities described above.

The architecture separates:

```text
Application Layer
        │
        ▼
AI / ML Intelligence Layer
        │
        ├── Case Intelligence
        ├── Smart Questions
        ├── Evidence Intelligence
        ├── Retrieval
        ├── Grounding
        ├── Reasoning
        ├── Risk
        ├── Document Intelligence
        └── Next-Best Action
```

This separation allows the interface and case-management system to evolve independently from the underlying intelligence services.

---

# Security & Privacy

RightsRadar may process potentially sensitive information such as:

- personal information,
- financial information,
- legal disputes,
- employment information,
- communications,
- documents,
- evidence,
- and cyber-incident information.

A production deployment should therefore enforce:

### Authentication

Users must be authenticated before accessing private cases.

### Authorization

Users should only access cases they are permitted to access.

### Data Protection

Sensitive information should be encrypted in transit and protected at rest.

### Secret Management

API keys and credentials must never be committed to source control.

### Evidence Access Control

Uploaded evidence should be protected using strict access policies.

### Data Minimization

Only information necessary for the case should be collected and retained.

---

# Responsible AI

RightsRadar is designed as a **decision-support and civic assistance system**, not as a replacement for qualified legal professionals or official authorities.

The system should clearly distinguish between:

```text
AI Recommendation
        ≠
Official Decision
```

and:

```text
Document Generated
        ≠
Document Filed
```

and:

```text
Recommended Escalation
        ≠
Official Escalation
```

Where uncertainty exists, the system should communicate it rather than presenting an unsupported answer with artificial confidence.

For high-risk situations, users should be directed toward appropriate official channels or qualified professionals.

---

# Development Roadmap

## Phase 1 — Product Foundation

- [x] Core RightsRadar interface
- [x] Case lifecycle experience
- [x] Case dashboard
- [x] ActionRadar interface
- [x] Evidence workflow
- [x] Document workflow
- [x] Timeline and case tracking

## Phase 2 — AI Intelligence

- [x] Problem understanding
- [x] Domain classification
- [x] Structured case extraction
- [x] Adaptive question architecture
- [x] RAG architecture
- [x] Source grounding
- [x] Citation validation

## Phase 3 — Advanced Intelligence

- [ ] Multimodal evidence intelligence
- [ ] Evidence graph
- [ ] Claim-to-evidence mapping
- [ ] Case digital twin
- [ ] Advanced risk scoring
- [ ] Next-best-action optimization
- [ ] Counterfactual case reasoning

## Phase 4 — Production Infrastructure

- [ ] Production backend integration
- [ ] Persistent cloud storage
- [ ] Production authentication
- [ ] Notification infrastructure
- [ ] Background processing
- [ ] External filing integrations

## Phase 5 — Scale

- [ ] Multilingual support
- [ ] Additional domain packs
- [ ] Government service integrations
- [ ] Official e-filing integrations
- [ ] Mobile application
- [ ] Advanced analytics

---

# Demo Strategy

The strongest product demonstration follows a complete case rather than showing isolated screens.

```text
1. Citizen describes a problem
              ↓
2. AI understands the problem
              ↓
3. Domain is identified
              ↓
4. Smart questions complete the case
              ↓
5. Evidence is analyzed
              ↓
6. Relevant sources are retrieved
              ↓
7. Next action is recommended
              ↓
8. Document is generated
              ↓
9. User reviews and records filing
              ↓
10. Case enters tracking
              ↓
11. Deadline approaches
              ↓
12. Deadline passes
              ↓
13. ActionRadar changes state
              ↓
14. Escalation becomes available
              ↓
15. Next-stage action is prepared
```

This demonstrates the core value of RightsRadar:

> **The system does not stop when the document is generated.**

---

# Project Status

RightsRadar is under active development.

The current repository contains the application layer and user-facing case-management experience, while the AI/ML intelligence layer is being integrated into the same system.

The architecture is intentionally designed so that:

```text
Frontend
    +
AI / ML
    +
Knowledge
    +
Rules
    +
Case State
    +
Evidence
    ↓
One Unified RightsRadar Platform
```

---

# Contributing

Contributions, suggestions, and improvements are welcome.

Recommended workflow:

```text
Create Branch
     ↓
Implement Change
     ↓
Test Locally
     ↓
Update Documentation
     ↓
Open Pull Request
```

Suggested branch naming:

```text
feature/<feature-name>
fix/<issue-name>
refactor/<area>
docs/<change>
```

---

# License

This project is licensed under the **MIT License**.

See [`LICENSE`](LICENSE) for details.

---

# Final Thought

> ## Knowing your rights is only the first step.
>
> **RightsRadar helps you exercise them.**

**Understand → Act → Document → Track → Escalate → Resolve**

---

