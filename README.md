# RightsRadar

> **AI-Powered Civic, Legal & Cyber Rights Case Manager**[cite: 1]  
> *“Describe your problem once. RightsRadar tells you what to do, prepares the required document, tracks your case, and guides you until resolution.”*[cite: 1]

---

## 📌 Overview

Citizens frequently struggle to understand and exercise their civic and legal rights due to complex legal terminology, scattered government portals, and complicated procedures[cite: 1]. Existing AI tools often stop at generic advice or document drafting, leaving citizens without tracking, deadline visibility, or escalation pathways[cite: 1].

**RightsRadar** bridges this gap by managing the **entire lifecycle of a case**. It takes natural-language problem descriptions, identifies the domain, generates legally grounded documents, calculates deterministic deadlines, and actively guides the user through follow-ups and escalations via **ActionRadar**.

---

## 🚀 Key Features

* **Natural Language Intake:** Accepts problem descriptions via Text, Voice, or Image inputs.
* **Domain Pack Architecture:** Modular system supporting domain-specific rules, legal corpora, and workflow triggers.
* **RAG-Grounded Document Generation:** Prepares reviewable applications, complaints, notices, and appeals linked directly to verified legal sources.
* **Deterministic Deadline Engine:** Uses rigid procedural logic (not AI guesses) to compute exact deadlines, follow-up windows, and escalation triggers.
* **ActionRadar:** An intelligent case tracker showing real-time action states:
  * 🟢 **ON TRACK** — Case is progressing normally within standard response windows.
  * 🟡 **ACTION REQUIRED** — Pending user input, filing confirmation, or follow-up.
  * 🔴 **DEADLINE PASSED** — Authority response/action window has lapsed.
  * ⚡ **TAKE ACTION** — Instant access to pre-drafted escalation/appeal actions.

---

## ⚖️ Supported Domains

| Domain | Scope & Capabilities |
| :--- | :--- |
| **RTI / Right to Information** | RTI drafting, statutory response tracking, and First/Second Appeal guidance. |
| **Consumer Rights** | Defective product/service disputes, refund notices, and official consumer forum complaint drafting. |
| **Tenant Rights** | Security deposit disputes, unlawful eviction guidance, and tenancy agreement issues. |
| **Workplace Rights** | Unpaid salary notices, workplace grievance filing, and statutory labor dispute support. |
| **Government Schemes** | Eligibility discovery, required document checklists, and application workflow guidance. |
| **Cyber Fraud / Complaints** | Incident intake, immediate containment checklist, evidence summary generation, and official reporting guidance. |

---

## 🔄 Core User Journey

Understand ➔ Diagnose ➔ Collect ➔ Guide ➔ Draft ➔ File ➔ Track ➔ Act ➔ Escalate ➔ Resolve

1. **Understand:** User inputs the problem in everyday language.
2. **Diagnose:** AI classifies the issue into a domain and seeks user confirmation.
3. **Collect:** Dynamic smart questionnaire gathers only missing, essential information.
4. **Guide:** Grounded engine recommends the exact legal or civic step.
5. **Draft:** Structured, reviewable document (complaint/notice/RTI) is generated.
6. **File:** User manually marks the case as submitted.
7. **Track:** Unified dashboard manages timeline, evidence, and deadlines.
8. **Act:** ActionRadar alerts user when follow-up action is required.
9. **Escalate:** Automated triggers draft the next-stage appeal/escalation if deadlines pass.
10. **Resolve:** Case remains monitored until marked resolved by the citizen.

---

## 🏗️ System Architecture

[Citizen Input (Text/Voice/Image)]
│
▼
[AI Intake Engine]
│
▼
[Domain Classifier] ───► [Domain Packs (Rules, Templates, Corpus)]
│
├──────► [RAG Retrieval Engine] ───► [Grounding Verification]
│
├──────► [Document Engine]     ───► [Reviewable Drafts]
│
└──────► [Deadline Engine]     ───► [Deterministic Rules]
│
▼
[Case Management Hub]
│
┌───────────────┴───────────────┐
▼                               ▼
[ActionRadar Engine]           [User Dashboard & Timeline]

---

## 💻 Tech Stack

* **Frontend:** Next.js / React, Tailwind CSS, Lucide Icons
* **Backend:** Node.js / Next.js Serverless API routes
* **Database & Auth:** PostgreSQL / Supabase
* **AI & Retrieval:** LLM (NLU & Document Generation), Embeddings + Vector Store (RAG over legal/civic corpora), Deterministic Rules Engine

---

## 🗄️ Database Schema Overview

* **`USERS`**: User profile, authentication, contact preferences.
* **`CASES`**: `id`, `user_id`, `domain`, `problem_text`, `status`, `filed_date`, `deadline_date`, `authority`, `priority`.
* **`DOCUMENTS`**: `id`, `case_id`, `type`, `content`, `version`, `source_references`.
* **`TIMELINE_EVENTS`**: `id`, `case_id`, `event_type` (diagnosis, draft, filed, escalation, resolved), `timestamp`.
* **`EVIDENCE`**: `id`, `case_id`, `file_url`, `description`, `uploaded_at`.
* **`DOMAIN_RULES`**: Domain-specific statutory deadlines, escalation criteria, and question trees.
* **`LEGAL_CORPUS`**: Grounded reference material, acts, guidelines, and authority directories.

---

## 🚦 Getting Started

### Prerequisites
* Node.js (v18+)
* PostgreSQL / Supabase Account
* LLM API Key (OpenAI / Gemini / Anthropic)

### Installation
```bash
# 1. Clone repository
git clone [https://github.com/your-repo/rightsradar.git](https://github.com/your-repo/rightsradar.git)
cd rightsradar

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
