# 🛡️ RightsRadar (Rightstrack)
> **Build With Bharat 2.0 Hackathon Project**  
> *AI-Powered Multilingual Grievance Redressal & Zero-Hallucination Statutory Tracking Platform*

[![Tech Stack](https://img.shields.io/badge/Tech-Next.js%20%7C%20Python%20%7C%20Supabase-blue)](https://github.com/shubham01r/rightstrack)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📌 Problem Statement
Citizens frequently face hurdles in filing and tracking civic, consumer, and RTI complaints. More importantly, **over 60% of cases stall** because citizens lack awareness of statutory expiry windows (such as the 30-day RTI response timeline), resulting in missed escalation deadlines and unresolved grievances due to lack of systematic follow-ups.

## 💡 Our Solution: RightsRadar
**RightsRadar** is an end-to-end automated platform that bridges the gap between citizens and legal statutory timelines. It allows users to file complaints via vernacular voice input, automatically drafts legally grounded petitions using RAG, and ensures absolute compliance tracking using deterministic state machines without AI hallucinations.

---

## 🚀 Key Features

* **🗣️ Multilingual Voice & Text Intake:** Direct speech-to-text integration using **Bhashini API** and **Whisper AI** to support regional Indian languages.
* **📚 Legal Grounding & RAG:** Uses **LangChain** and **Qdrant Vector DB** anchored on official Indian Bare Acts to structure accurate legal text.
* **⚙️ Deterministic Rule Engine:** Powered by a **Python State Machine** to track statutory countdowns (e.g., 30-day RTI clock) with **0% hallucination risk**.
* **⏰ ActionRadar Workflow & Timers:** Automated timers managed via **Celery & Redis** to trigger escalation alerts or draft First Appeals (e.g., RTI Section 19(1)).
* **📄 Sign-Ready Document Generation:** Instant PDF compilation via **WeasyPrint** for official submission.
* **🔔 Multi-Channel Notifications:** Alerts dispatched via **WhatsApp Business API** and **FCM**.

---

## 🛠️ Tech Stack

| Layer | Technologies Used |
| :--- | :--- |
| **Frontend** | Next.js 14, React, Tailwind CSS |
| **Backend & Workflows** | Node.js, Python State Machine, Celery, Redis |
| **AI & LLM Engine** | Llama 3 / OpenAI, LangChain, Qdrant Vector DB, Bhashini API, Whisper AI |
| **Database & Storage** | PostgreSQL, Supabase (Relational Case Logs & Timeline Data) |
| **Security & Auth** | Supabase Auth, JWT, AES-256 Encryption |

---

## 📐 System Architecture & Citizen Journey

1. **Intake:** Citizen inputs a grievance via multilingual voice or text.
2. **Drafting:** AI structures the complaint and grounds it in relevant acts.
3. **Filing:** Case is logged securely into the database via API gateways.
4. **Tracking (ActionRadar):** The deterministic engine starts the statutory deadline countdown timer.
5. **Resolution / Escalation:** If the authority fails to respond within the deadline, an auto-escalation or First Appeal is triggered.

---

## 📂 Repository Structure

```text
rightstrack/
├── client/              # Next.js 14 Frontend Dashboard & UI
├── server/              # Backend Core Logic, Node.js & Python Workers
├── engine/              # Deterministic State Machine & RAG Pipelines
├── database/            # Supabase Schema & Migration Scripts
└── README.md
