RightsRadarSpeak or type your grievance once — get structured legal documents instantly, and never miss a statutory deadline again.1. ProblemMillions of Right to Information (RTI) applications, consumer complaints, and civic grievances are filed across India each year. Despite clear statutory protections under the RTI Act (2005) and Consumer Protection Act (2019), over 60% of cases stall or fail because citizens lack awareness of strict statutory expiry windows (such as the 30-day RTI response timeline), resulting in missed escalation deadlines and unresolved grievances.Existing civic-tech tools operate solely as static document generators: they produce an initial form or letter and terminate engagement. The citizen is left unassisted when statutory deadlines pass, unaware of legal concepts like deemed refusal, and unable to navigate the procedural complexities of drafting First Appeals or regulatory escalations.2. SolutionRightsRadar is an end-to-end AI-powered civic platform that bridges the gap between document creation and statutory enforcement:Multilingual Voice/Text Intake ──> AI Domain Classification ──> Citation-Grounded Drafting
                                                                │
  Auto-Escalated First Appeal <── Deterministic Deadline Engine <──┘
Multilingual Intake: Citizens express their problem narrative via vernacular voice input (powered by Bhashini/Whisper) or text.Domain Classification: Automatic categorization into the relevant legal regime (RTI vs. Consumer Protection) with explicit user confirmation.Citation-Grounded Drafting: Generates formal, procedural legal documents containing verified statutory citations using RAG.ActionRadar Deadline Tracker: Automatically calculates and tracks mandatory statutory response windows (e.g., 30 calendar days for RTI PIO responses) using deterministic date arithmetic.Automated Escalation: When a public authority fails to respond within the legal timeframe, RightsRadar identifies the statutory breach (deemed refusal) and automatically pre-drafts a formal First Appeal (e.g., RTI Section 19(1)).3. Features🗣️ Multilingual Voice & Text Intake: Direct speech-to-text integration supporting regional Indian languages.📚 Legal Grounding & RAG: Uses LangChain and Qdrant Vector DB anchored on official Indian Bare Acts.⚙️ Deterministic Rule Engine: Powered by a Python State Machine to track statutory countdowns with 0% hallucination risk.⏰ ActionRadar Workflow & Timers: Automated timers managed via Celery & Redis to trigger escalation alerts.📄 Sign-Ready Document Generation: Instant PDF compilation via WeasyPrint for official submission.🔔 Multi-Channel Notifications: Alerts dispatched via WhatsApp Business API and FCM.4. ArchitectureCode snippetflowchart TD
    subgraph Client ["Frontend (Next.js App Router)"]
        UI_Intake["Intake Wizard (/intake)"]
        UI_Doc["Document & Citation Viewer (/document/[caseId])"]
        UI_Dash["Case Tracker Dashboard (/dashboard)"]
        UI_Esc["Escalation Appeal Center (/escalate/[caseId])"]
    end

    subgraph API ["Next.js Route Handlers (/app/api)"]
        API_Analyze["/api/analyze"]
        API_Cases["/api/cases"]
        API_CaseById["/api/cases/[caseId]"]
        API_Escalate["/api/cases/[caseId]/escalate"]
    end

    subgraph Services ["Core Modular Services (/lib)"]
        AIService["AI Classification & Extraction Service (/lib/ai)"]
        RAGService["RAG Retrieval & Reranker Service (/lib/rag)"]
        Validator["Deterministic Citation Validator (/lib/rag/validator.js)"]
        DocService["Legal Document Drafters (/lib/documents)"]
        CaseService["Case State Machine & Deadline Engine (/lib/cases)"]
    end

    subgraph External ["External Infrastructure & Models"]
        Bhashini["Bhashini API & Whisper AI"]
        LLM["Llama 3 / OpenAI / Claude"]
        SupabaseDB["Supabase Postgres (Cases & Logs)"]
        SupabaseVec["Supabase pgvector (Statutory Embeddings)"]
    end

    Client --> API
    API_Analyze --> AIService
    API_Cases --> DocService
    API_Cases --> CaseService
    API_Escalate --> DocService
    
    AIService --> LLM
    DocService --> LLM
    DocService --> Validator
    RAGService --> SupabaseVec
    CaseService --> SupabaseDB
5. Tech StackLayerTechnologySelection RationaleFullstack FrameworkNext.js 14 (App Router, JavaScript)Single-deployment architecture; server components and API routes in one codebase.Styling & DesignTailwind CSSUtility-first styling with custom legal and civic color tokens.Database & Vector StoreSupabase Postgres & pgvectorManaged relational database co-located with vector embeddings for legal statutes.AI & LLM EngineLlama 3 / OpenAI / ClaudeHigh-accuracy instruction-following for structured legal drafting and entity extraction.Voice IntakeBhashini API & Whisper AINative vernacular speech-to-text processing for regional accessibility.Workflow & TimersPython State Machine, Celery & RedisDeterministic calculation of statutory countdowns without LLM date math.AuthenticationSupabase AuthSession-based anonymous and authenticated user state.Deployment & CIVercel & GitHub ActionsZero-config continuous deployment with automated build and lint checks.6. ScreenshotsCitizen Conversational Intake & Voice SupportFigure 1: Citizen inputs problem via multilingual voice or text.Citation-Grounded Legal Document DraftingFigure 2: Grounded legal draft displaying verified statutory citation badges.Real-Time Case Dashboard & ActionRadarFigure 3: Active case monitoring with deterministic statutory countdown timers.Automated Deemed Refusal Escalation DraftFigure 4: Automated First Appeal generation triggered upon deadline breach.7. InstallationBash# Clone the repository
git clone https://github.com/shubham01r/rightstrack.git
cd rightstrack

# Install project dependencies
npm install

# Configure environment variables
cp .env.example .env.local
8. Environment VariablesVariable NameRequiredDescriptionDATABASE_URLYesSupabase PostgreSQL direct connection string.NEXT_PUBLIC_SUPABASE_URLYesSupabase project API URL.NEXT_PUBLIC_SUPABASE_ANON_KEYYesSupabase anonymous client key.SUPABASE_SERVICE_ROLE_KEYYesSupabase service role secret key for backend tasks.OPENAI_API_KEY / ANTHROPIC_API_KEYYesLLM inference key.BHASHINI_API_KEYYesBhashini API key for vernacular speech processing.JWT_SECRETYesSecret used for session state signing.NEXT_PUBLIC_APP_URLOptionalBase URL for absolute link generation (default: http://localhost:3000).9. Running LocallyBash# Seed demo cases for hackathon testing
npm run seed

# Ingest statutory knowledge base into pgvector
npm run ingest

# Start local development server
npm run dev
Open http://localhost:3000 in your browser.10. API Documentation1. POST /api/analyzeClassifies a plain-text or voice-transcribed problem narrative and identifies legal entities.Request Body:JSON{
  "narrative": "I applied for municipal tender documents 45 days ago with no reply.",
  "language": "hi"
}
Response (200 OK):JSON{
  "success": true,
  "data": {
    "domain": "RTI",
    "confidence": 0.96,
    "rationale": "Involves public authority records under RTI Act 2005.",
    "entities": {
      "applicant_name": null,
      "opposite_party": "Municipal Authority",
      "relief_sought": "Certified copies of tender documents"
    }
  },
  "error": null
}
2. POST /api/casesCreates a tracked case record and triggers citation-grounded drafting.Request Body:JSON{
  "domain": "RTI",
  "narrative": "Seeking municipal road repair budget records.",
  "entities": { "applicant_name": "Shubham Kumar", "public_authority": "AIT Pune" }
}
3. GET /api/casesRetrieves all tracked cases for the active session.4. POST /api/cases/:caseId/escalateGenerates a First Appeal or Notice of Non-Compliance when statutory deadlines breach.11. AI/RAG & Anti-Hallucination ArchitectureCode snippetflowchart TD
    Step1["1. Multilingual Voice/Text Input"] --> Step2["2. AI Domain Classification"]
    Step2 --> Step3["3. Legal Entity Extraction"]
    Step3 --> Step4["4. Vector DB Statutory Retrieval"]
    Step4 --> Step5["5. Grounded Legal Drafting (LLM)"]
    Step5 --> Step6["6. Deterministic Citation Validation"]
    Step6 --> Step7["7. Statutory Countdown State Machine"]
    Step7 --> Step8["8. Dashboard & Escalation Trigger"]
Anti-Hallucination DesignLegal empowerment tools must uphold rigorous accuracy standards. RightsTrack enforces an anti-hallucination guarantee through a strict post-generation code validation layer rather than relying on prompt instructions alone. Any unverified citation is stripped or causes the draft to fail closed, ensuring no invented statutes or non-existent section numbers ever reach the citizen.12. Team FukrasTeam Lead & Fullstack Development: Shubham Kumar — Next.js App Router, responsive design, state management, citation UI.Backend & Database Architecture: Team Fukras Member — Supabase PostgreSQL, pgvector integration, deterministic date engine.AI & Legal Intelligence Pipeline: Team Fukras Member — LLM prompt pipelines, Bhashini STT integration, knowledge base ingestion.13. Live Demo & MediaLive Application: https://rightstrack.vercel.app (Deployment Link)GitHub Repository: https://github.com/shubham01r/rightstrack14. Future ScopeExtended Legal Domains: Support for consumer disputes, cyber fraud, and labor grievances.E-Filing Integration: Direct integration with RTI Online and e-Daakhil portals.Automated Alerts: WhatsApp and SMS notifications alerting citizens prior to statutory deadline expiration.
