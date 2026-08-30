# RightsRadar

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Framework](https://img.shields.io/badge/Framework-Next.js%2014%20(App%20Router)-black)](https://nextjs.org/)
[![Database](https://img.shields.io/badge/Database-Supabase%20pgvector-emerald)](https://supabase.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com/)

> **Describe your problem once. RightsRadar tells you what to do, prepares the required document, tracks your case, and guides you until resolution.**

---

## 1. Problem

Over 6 million RTI applications and hundreds of thousands of consumer/tenancy grievances are initiated across India each year. Despite statutory protections, a huge percentage of citizens abandon their claims when opposite parties or public authorities delay responses. 

Current AI tools act merely as one-time document generators: they generate an initial letter and terminate engagement. Citizens are left stranded when statutory response windows pass, unaware of legal concepts like *deemed refusal*, and unable to navigate First Appeals or escalations.

---

## 2. Solution

RightsRadar is an end-to-end **AI-Powered Civic, Legal & Cyber Rights Case Manager** that bridges the gap between document drafting and case lifecycle resolution.
Problem Intake ──> Domain Classifier ──> Smart Question Engine ──> Grounded Drafting
│
ActionRadar Engine <── Case Lifecycle & Timeline <── Deterministic Filing ┘
│
└──> Automated Follow-up & Stage Escalation
1. **Conversational Intake**: Citizens enter their problem narrative via plain text or voice without legal jargon.
2. **Domain Classification**: Automatic categorization into dedicated domains with human-in-the-loop confirmation.
3. **Smart Questioning & Grounded Drafting**: Dynamically extracts missing parameters and generates citation-backed formal drafts.
4. **Actionable Case Tracker**: Manages the complete post-draft lifecycle—filing status, evidence management, and deterministic timeline countdowns.
5. **ActionRadar & Automated Escalation**: Proactively monitors response windows and auto-drafts First Appeals and legal notices upon statutory breaches.

---

## 3. Supported Domains

- **RTI (Right to Information)**: Filing applications, tracking 30-day PIO reply windows, and auto-drafting Section 19(1) First Appeals.
- **Consumer Rights**: Product/service defect notices, refund escalation, and E-Daakhil consumer commission drafts.
- **Tenant Rights**: Security deposit recovery, maintenance disputes, and statutory tenancy notices.
- **Workplace Rights**: Unpaid salary notices, gratuity claims, and workplace grievance documentation.
- **Government Schemes**: Scheme discovery, eligibility verification, and application guidance.
- **Cyber Fraud / Cyber Complaints**: Immediate safety triage, preservation of digital evidence checklists, incident summaries, and official 1930 / National Cyber Crime portal guidance.

---

## 4. Main Differentiator: ActionRadar

RightsRadar never leaves the user wondering *"What should I do next?"*. The **ActionRadar** engine converts passive case records into clear, actionable statuses:

- 🟢 **ON TRACK**: Case is progressing within standard statutory response windows.
- 🟡 **ACTION REQUIRED**: User action pending (e.g., dispatch proof or acknowledgement details needed).
- 🔴 **DEADLINE PASSED**: Official response window elapsed (e.g., 30-day RTI breach / deemed refusal).
- ⚡ **TAKE ACTION / ESCALATE**: Instant one-click generation for next-tier appeals and legal notices.

---

## 5. System Architecture

```mermaid
flowchart TD
    subgraph Client ["Frontend (Next.js 14 App Router)"]
        UI_Home["Intake & Voice/Text Entry (/)"]
        UI_Diag["Domain Diagnosis & Smart Qs (/diagnose)"]
        UI_Doc["Document Review & Citations (/document/[caseId])"]
        UI_Dash["Case Dashboard & ActionRadar (/dashboard)"]
        UI_Timeline["Case Timeline & Evidence (/case/[caseId])"]
    end

    subgraph API ["API Route Handlers (/app/api)"]
        API_Intake["/api/intake/classify"]
        API_Questions["/api/intake/smart-questions"]
        API_Draft["/api/documents/generate"]
        API_Cases["/api/cases"]
        API_Escalate["/api/cases/[caseId]/escalate"]
    end

    subgraph CoreServices ["Core Services (/lib)"]
        DomainRouter["Domain Pack Orchestrator (/lib/domains)"]
        RAGService["RAG Retrieval & Chunk Reranker (/lib/rag)"]
        Validator["Deterministic Citation Validator (/lib/rag/validator.js)"]
        DeadlineEngine["Deterministic Deadline Engine (/lib/engine/deadlines.js)"]
        ActionEngine["ActionRadar State Machine (/lib/engine/actionradar.js)"]
    end

    subgraph Infra ["External Infrastructure & Storage"]
        LLM["Anthropic Claude 3.5 Sonnet / OpenAI GPT-4o"]
        Embeddings["Domain Embeddings Engine"]
        Postgres["Supabase PostgreSQL (Cases, Timelines, Documents)"]
        PgVector["Supabase pgvector (Statutory Corpora & Schemes)"]
    end

    Client --> API
    API_Intake --> DomainRouter
    API_Questions --> DomainRouter
    API_Draft --> RAGService
    API_Draft --> Validator
    API_Cases --> DeadlineEngine
    API_Cases --> ActionEngine
    API_Escalate --> RAGService

    DomainRouter --> LLM
    RAGService --> Embeddings
    RAGService --> PgVector
    DeadlineEngine --> Postgres
    ActionEngine --> Postgres
6. Tech StackLayerTechnologySelection RationaleFullstack FrameworkNext.js 14 (App Router), React, Tailwind CSSUnified architecture, server components, and responsive mobile-first UI.Database & AuthSupabase (PostgreSQL + Supabase Auth)Managed relational database with connection pooling and session management.Vector StoreSupabase pgvectorCo-located vector storage alongside relational case records.LLM InferenceAnthropic Claude 3.5 Sonnet / OpenAI GPT-4oHigh-precision legal extraction, dynamic questioning, and document generation.EmbeddingsOpenAI text-embedding-3-small / Voyage AIDomain-tailored statutory corpus retrieval.Deadline EngineDeterministic Date Engine (JavaScript)Exact calendar date calculations eliminating LLM date hallucination.7. Database SchemaCode snippeterDiagram
    USERS ||--o{ CASES : owns
    CASES ||--o{ DOCUMENTS : contains
    CASES ||--o{ TIMELINE_EVENTS : logs
    CASES ||--o{ EVIDENCE : attaches
    DOMAIN_RULES ||--o{ CASES : governs
    LEGAL_CORPUS ||--o{ DOCUMENTS : references

    USERS {
        uuid id PK
        string email
        string full_name
        timestamp created_at
    }

    CASES {
        uuid id PK
        uuid user_id FK
        string domain
        string title
        text problem_statement
        string status
        timestamp filed_date
        timestamp deadline_date
        string authority_name
        string priority
        string action_state
    }

    DOCUMENTS {
        uuid id PK
        uuid case_id FK
        string document_type
        text content
        jsonb citations
        string version
    }

    TIMELINE_EVENTS {
        uuid id PK
        uuid case_id FK
        string event_type
        text description
        timestamp event_date
    }

    EVIDENCE {
        uuid id PK
        uuid case_id FK
        string file_name
        string file_url
        string evidence_type
    }

    DOMAIN_RULES {
        string domain PK
        jsonb required_fields
        int statutory_days
        jsonb escalation_rules
    }

    LEGAL_CORPUS {
        uuid id PK
        string domain
        string act_name
        string section
        text chunk_content
        vector embedding
    }
8. Installation & SetupBash# 1. Clone the repository
git clone [https://github.com/your-username/rightsradar.git](https://github.com/your-username/rightsradar.git)
cd rightsradar

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
9. Environment VariablesCreate .env.local with the following variables:Variable NameRequiredDescriptionDATABASE_URLYesSupabase PostgreSQL direct connection string.NEXT_PUBLIC_SUPABASE_URLYesSupabase project API URL.NEXT_PUBLIC_SUPABASE_ANON_KEYYesSupabase anonymous public client key.SUPABASE_SERVICE_ROLE_KEYYesSupabase service role key for backend orchestration.ANTHROPIC_API_KEYYesAPI key for Anthropic Claude 3.5 Sonnet inference.OPENAI_API_KEYOptionalAPI key for embeddings / OpenAI models.NEXT_PUBLIC_APP_URLOptionalBase URL for application (default: http://localhost:3000).10. Running LocallyBash# Ingest statutory corpus and domain rules into pgvector
npm run seed:corpus

# Seed demo test cases (including breached deadline demo)
npm run seed:demo

# Start local development server
npm run dev
Open http://localhost:3000 in your browser.11. API Documentation1. POST /api/intake/classifyClassifies problem narrative into domain and extracts key parameters.Request Body:JSON{
  "narrative": "I applied for road repair budget records 45 days ago to the municipal corporation but received no response.",
  "language": "en"
}
Response (200 OK):JSON{
  "success": true,
  "data": {
    "domain": "RTI",
    "confidence": 0.98,
    "detected_entities": {
      "authority": "Municipal Corporation",
      "relief_sought": "Road repair budget records",
      "days_elapsed": 45
    }
  }
}
2. POST /api/documents/generateGenerates citation-backed legal document for user review.Request Body:JSON{
  "domain": "RTI",
  "case_title": "Ward 12 Road Repair Expenditure",
  "parameters": {
    "public_authority": "Municipal Corporation",
    "information_requested": "Certified copy of road repair expenditure for Ward 12."
  }
}
3. POST /api/cases/[caseId]/escalateGenerates First Appeal or Legal Notice when statutory deadlines pass.12. Demo FlowIntake & Classification: Enter unstructured problem narrative $\rightarrow$ Receive real-time domain classification and smart clarifying questions.Review & Grounded Draft: Review generated legal document with verified citation badges.Mark as Filed: Submit filing date $\rightarrow$ Deterministic engine computes exact statutory deadlines.ActionRadar in Action: Open pre-seeded breached case (🔴 DEADLINE PASSED) and click ESCALATE NOW to auto-generate a First Appeal.13. LicenseDistributed under the MIT License. See LICENSE for details.
---

### 2. `.env.example`
*(Root directory me `.env.example` file banakar ye paste karo)*

```env
# Supabase Configuration
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-public-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-secret-key"

# AI Inference & Embeddings
ANTHROPIC_API_KEY="sk-ant-api03-your-anthropic-key"
OPENAI_API_KEY="sk-proj-your-openai-key"

# App Settings
NEXT_PUBLIC_APP_URL="http://localhost:3000"
3. .gitignore(Root directory me .gitignore file banakar ye paste karo)Code snippet# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Next.js build output
/.next/
/out/

# Production
/build

# Debug logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment files
.env*.local
.env
.env.production

# Vercel
.vercel

# OS metadata
.DS_Store
*.pem
4. LICENSE(Root directory me LICENSE file banakar ye paste karo)PlaintextMIT License

Copyright (c) 2026 RightsRadar Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
