<div align="center">

# 🩺 CareFlow

### Intelligent Healthcare Workflow & Hospital Management Platform

**"Healthcare, connected."**

*One patient. One journey. Zero disconnected systems.*

[![Made with Next.js](https://img.shields.io/badge/Frontend-Next.js-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/Markup-HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/Styling-CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JSON](https://img.shields.io/badge/Data-JSON-000000?logo=json&logoColor=white)](https://www.json.org/)
[![C](https://img.shields.io/badge/Utilities-C-A8B9CC?logo=c&logoColor=black)](https://en.wikipedia.org/wiki/C_(programming_language))
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Google Gemini](https://img.shields.io/badge/AI-Google_Gemini-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Hackathon%20Prototype-orange)]()

[Live Demo](#) · [Report Bug](#) · [Request Feature](#) · [Documentation](#)

</div>

---

## 💡 The Problem

Hospitals don't run on one system — they run on **six or seven**, none of which talk to each other.

A single patient's journey might touch a separate booking app, a paper-based front desk, an email inbox for lab results, a WhatsApp thread for prescriptions, and a spreadsheet for billing. Every handoff between departments is a place where information gets lost, delayed, or duplicated — and where patient care suffers.

**CareFlow fixes this by treating the patient journey as one continuous, connected system** — not six disconnected apps stitched together with hope.

```
  Patient  →  Appointment  →  Consultation  →  Lab Test  →  Report
     ↓                                                          ↓
  Notified  ←  Payment  ←  Billing  ←  Pharmacy  ←  Prescription
```

---

## ✨ Why CareFlow Wins

| | |
|---|---|
| 🔗 **Truly Connected** | Six role-based portals sharing one live data layer — not six separate apps |
| 🤖 **Meaningful AI** | AI assists doctors by summarizing lab reports — augmenting, never replacing, clinical judgment |
| 🔐 **Security-First** | RBAC, audit logging, and permission boundaries built in from day one, not bolted on |
| 🎨 **Product-Grade UX** | Skeleton states, command palette, dark mode — feels like a SaaS launch, not a CRUD demo |
| 📊 **Full Visibility** | Admins see the entire hospital's pulse in real time — patients, revenue, inventory, trends |

---

## 📑 Table of Contents

- [Core Workflow](#-core-healthcare-workflow)
- [Portals & Features](#-portals--features)
- [AI-Powered Assistance](#-ai-powered-healthcare-assistance)
- [System Architecture](#️-system-architecture)
- [Tech Stack](#️-technology-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Security](#-security--privacy)
- [Roadmap](#-future-roadmap)
- [Disclaimer](#️-healthcare-disclaimer)

---

## 🔄 Core Healthcare Workflow

```
   PATIENT
      │
      ▼
 Book Appointment
      │
      ▼
    DOCTOR
      │
      ▼
  Consultation
      │
 ┌────┴────┐
 ▼         ▼
EMR    Lab Request
            │
            ▼
           LAB
            │
            ▼
    Report Uploaded
            │
            ▼
     Doctor Review
            │
            ▼
      Prescription
            │
            ▼
       PHARMACY
            │
            ▼
   Medicine Dispensed
            │
            ▼
        BILLING
            │
            ▼
        PAYMENT
            │
            ▼
       FOLLOW-UP
```

Every arrow above is a **real, tracked handoff** — not a manual re-entry point.

---

## 🚪 Portals & Features

### 👤 Patient Portal
Search & filter doctors by specialization • Book online or in-person appointments • View medical history, lab reports & prescriptions • Track bills and payment status • Real-time notifications across the entire care journey

### 🩺 Doctor Portal
Daily schedule dashboard • Access authorized patient records • Maintain electronic medical records (EMR) • Record diagnoses & consultation notes • Create prescriptions • Request and review lab tests

### 🧑‍💼 Receptionist Portal
Patient registration & appointment scheduling • **Smart Queue** management with live wait-time estimates

```
CURRENT TOKEN  #24

#25  Rahul    Waiting
#26  Ananya   Waiting
#27  Kiran    Priority
#28  Meera    Waiting

Estimated wait: 24 min
```

### 🧪 Laboratory Portal
```
Test Requested → Sample Collected → Testing → Report Ready → Patient + Doctor Notified
```
Full diagnostic lifecycle tracking, from request to result — with automatic notifications at every stage.

### 💊 Pharmacy Portal
```
Doctor Prescribes → Pharmacy Receives → Dispensed → Inventory Auto-Updates → Patient Notified
```
Live stock levels, expiry tracking, and low-stock alerts baked into the dispensing flow.

### 💳 Billing & Payments
Consolidated invoices spanning consultation, lab, and pharmacy charges:

```
Consultation        ₹500
Laboratory           ₹300
Pharmacy             ₹450
─────────────────────────
Total              ₹1,250
```

### 📊 Admin Dashboard
A single pane of glass over hospital operations — patient volume, active doctors, revenue, department performance, lab throughput, and pharmacy inventory, all in interactive analytics.

---

## 🤖 AI-Powered Healthcare Assistance

CareFlow uses AI where it genuinely reduces clinician workload — not as a gimmick.

**AI Medical Report Assistant**, powered by the **Google Gemini API** (`gemini-3.6-flash`), summarizes uploaded lab reports and flags values that need attention, so doctors can triage faster:

```
AI REPORT ASSISTANT — CBC Report
12 values analyzed · 3 flagged for attention

Hemoglobin    11.8 g/dL
WBC          8,200 cells/µL
Platelets    210,000 cells/µL

[ View Original Report ]
```

> ⚠️ **AI output is informational only and must be reviewed by a qualified healthcare professional before any clinical decision.** CareFlow's AI assists diagnosis workflows — it never replaces a clinician.

---

## 🧠 Connected Patient Timeline

Every event in a patient's care — across every department — lives on one timeline, so no clinician has to hunt through five systems to understand what happened:

```
Aug 13
 ├── Doctor Consultation
 ├── Diagnosis Recorded
 ├── CBC Test Requested
 ├── Sample Collected
 ├── Lab Report Uploaded
 ├── Prescription Created
 └── Pharmacy Fulfillment
```

---

## 🏗️ System Architecture

```
                    ┌───────────────────────┐
                    │      CareFlow UI       │
                    │ Next.js · React · TS   │
                    │      Tailwind CSS      │
                    └───────────┬───────────┘
                                │
                                ▼
                    ┌───────────────────────┐
                    │       API Layer        │
                    │      Node.js           │
                    └───────────┬───────────┘
                                │
              ┌─────────────────┼─────────────────┐
              ▼                 ▼                 ▼
      ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
      │  PostgreSQL   │  │ Auth & RBAC   │  │ Gemini AI    │
      │  (Audit/Data) │  │  JWT · TLS 1.3│  │  Services    │
      └──────────────┘  └──────────────┘  └──────────────┘
              │
              ▼
      ┌─────────────────────────────────┐
      │      Healthcare Workflows        │
      │ Appointments · EMR · Lab · Pharmacy │
      │  Billing · Notifications · Analytics │
      └─────────────────────────────────┘
```

### Core Data Model

```
User ── Patient
     └─ Doctor ── Department

Patient ── Appointments, Medical Records, Prescriptions,
           Lab Tests, Lab Reports, Bills, Notifications

Doctor  ── Appointments, Medical Records,
           Prescriptions, Lab Requests

Prescription ── Pharmacy
Bill         ── Payment
```

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React, Next.js, TypeScript, Tailwind CSS, Motion (animations) |
| **Backend** | Node.js, Express |
| **Build Tooling** | Vite, Esbuild |
| **Database** | PostgreSQL (audit logs & user data) |
| **Auth & Security** | JWT, RBAC, TLS 1.3, immutable audit logging, HIPAA-aligned controls |
| **AI** | Google Gemini API (`gemini-3.6-flash`) for AI-powered lab report analysis |
| **Package Management** | npm / Bun |
| **Deployment** | AI Studio / cloud deployment |

**Language breakdown**

```
TypeScript ████████████████████░░░░  62%
JavaScript ███████░░░░░░░░░░░░░░░░░  18%
HTML       ████░░░░░░░░░░░░░░░░░░░░  10%
CSS        ███░░░░░░░░░░░░░░░░░░░░░   7%
JSON       █░░░░░░░░░░░░░░░░░░░░░░░   2%
C          █░░░░░░░░░░░░░░░░░░░░░░░   1%
```
*(Approximate — swap in real numbers from GitHub's "Languages" panel once the repo is public.)*

<details>
<summary><strong>🤔 Why C in a healthcare web app?</strong></summary>

<br>

Not every hospital system runs in a browser. The `C` slice covers small, low-level utilities — think performance-critical helpers or hardware-adjacent integrations (e.g. lab device interfaces) — that don't belong in the main TypeScript codebase but still ship with the project.
</details>

*(Full badge set is at the top of this file — badges render on GitHub even if this preview pane doesn't load external images.)*

---

## 🚀 Getting Started

### ⚡ Prerequisites
- **Node.js** v16 or higher

### 1. Clone the repository
```bash
git clone https://github.com/bot150/Care-Flow.git
cd Care-Flow/careflow
```

### 2. Install dependencies
```bash
npm install
```
*(If using Bun — indicated by `bun.lock` — you can instead run `bun install`)*

### 3. Configure environment variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Then add your Gemini API key:
```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
APP_URL="YOUR_APP_URL"
```
> `APP_URL` may be auto-injected in hosted environments like AI Studio. Never commit real API keys or secrets to GitHub.

### 4. Run the development server
```bash
npm run dev
```
This starts the Vite dev server + Express backend, typically on **http://localhost:3000**.

### 🧪 Demo Accounts
| Role | Email |
|---|---|
| Patient | `patient@careflow.demo` |
| Doctor | `doctor@careflow.demo` |
| Receptionist | `reception@careflow.demo` |
| Laboratory | `lab@careflow.demo` |
| Pharmacist | `pharmacy@careflow.demo` |
| Admin | `admin@careflow.demo` |

*Demo passwords are shared separately from the public repo, never committed.*

---

## 📁 Project Structure

```
careflow/
├── dist/              # Build output
├── public/
├── src/
│   ├── components/    # React UI components
│   ├── context/       # React Context API for state management
│   ├── data/          # Mock data for demonstrations
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Main application component
│   ├── index.css      # Global styles
│   └── main.tsx        # Application entry point
├── .env.example
├── index.html
├── package.json
├── server.ts          # Express backend logic
└── vite.config.ts     # Vite build configuration
```

---

## 🔗 API Endpoints

**`GET /api/health`**
Checks application health status.
```json
{ "status": "ok", "app": "CareFlow" }
```

**`POST /api/ai/analyze-report`**
Analyzes a lab report using the Gemini AI model.

Request body:
```json
{
  "reportName": "string",
  "reportText": "string",
  "testCategory": "string"
}
```
Response: structured JSON with `summary`, `flaggedItems`, `observations`, and `recommendedFollowUp`.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

Please follow the project's coding standards and include tests where applicable.

---

## ⚖️ License

Licensed under the MIT License — see [LICENSE.md](LICENSE.md) for details.

---

## 🔒 Security & Privacy

Healthcare data demands more than a login form. CareFlow builds security into the architecture itself:

- **Role-Based Access Control (RBAC)** enforced at the API layer, not just the UI
- Protected routes and permission checks on every request
- Password hashing, input validation, and secure environment variables
- Audit logging for sensitive record access
- Controlled, need-to-know medical-record access

```
Patient        → cannot modify diagnosis
Receptionist   → cannot modify prescriptions
Pharmacist     → cannot modify medical records
Doctor         → can access authorized patient records
Admin          → platform administration only
```

---

## 🏆 Hackathon Focus

CareFlow isn't another hospital CRUD app. It's built to be judged on:

- ✅ Core healthcare functionality across every department
- ✅ Clean, scalable architecture
- ✅ Real authentication & security, not a demo login
- ✅ Relational database design that mirrors real hospital operations
- ✅ AI integration that's meaningful, not decorative
- ✅ Deployment-ready documentation

**The goal:** a connected healthcare operating platform, where every department contributes to the same patient journey — not six apps that happen to share a repo.

---

## 🔮 Future Roadmap

- 📹 Telemedicine / video consultations
- 🧠 Advanced AI clinical decision support
- 📄 OCR-based medical report extraction
- 🎙️ Voice-to-text consultation notes
- 💊 Smart medicine reminder scheduler
- 📱 Progressive Web App / mobile experience
- 🛏️ Bed management
- 🚑 Ambulance tracking
- 📊 Predictive hospital analytics
- 🔗 Wearable health-device integration
- 🔐 Advanced encryption & compliance (HIPAA-style controls)

---

## ⚠️ Healthcare Disclaimer

CareFlow is a **hackathon/prototype** healthcare software project. It is **not** intended to provide medical diagnosis, treatment recommendations, or replace qualified healthcare professionals. All patient data used in demos is synthetic/test data only.

---

## 🔗 Important Links

- **Live App (AI Studio):** [https://ai.studio/apps/0b265b0e-0cc9-4dce-b5e6-83a829125e7b](https://ai.studio/apps/0b265b0e-0cc9-4dce-b5e6-83a829125e7b)
- **Repository:** [https://github.com/bot150/Care-Flow](https://github.com/bot150/Care-Flow)
- **Issues / Inquiries:** Open an issue on the GitHub repo

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/bot150/Care-Flow?style=social)]()
[![GitHub forks](https://img.shields.io/github/forks/bot150/Care-Flow?style=social)]()

</div>

---

<div align="center">

### ⭐ CareFlow

**Healthcare, connected.**

*From the first appointment to the final follow-up — one patient, one connected journey.*

If this project resonates with you, consider giving it a ⭐ on GitHub!

</div>
