# BEFORE YOU CLICK: PARALLEL YOU ⚡️

> **"One message. Three futures. Choose yours."**  
> *An AI-powered cognitive decision simulator that lets you explore the branching consequences of high-stakes messages before pressing send.*

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React%2019-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini API](https://img.shields.io/badge/Google%20Gemini-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![Vite 8](https://img.shields.io/badge/Vite%208-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)

---

## 🔮 Overview

Most communication disasters happen not because people lack vocabulary or grammar skills, but because **adrenaline and emotional friction compress our decision-making horizon into fractions of a second**. A frustrated email to a professor, an impulsive Slack message to a manager on a Friday evening, or an aggressive counteroffer to a recruiter can permanently damage relationships and career leverage.

**BEFORE YOU CLICK: PARALLEL YOU** is a futuristic decision laboratory. It acts as an interpersonal time machine: you draft your raw, unvarnished thoughts, choose your recipient lens, and simulate three divergent causal timelines before committing to transmission.

---

## ⚡️ Key Signature Features

### 1. 🌌 The Signature Experience — Future Simulator
Simulates three distinct parallel futures for any message:
* **Branch Alpha // Send As-Is:** Reveals plausible recipient gut reactions, immediate friction points, and risk of blowback.
* **Branch Beta // Send Smarter:** Rewrites the message while preserving **100% of your authentic boundaries and intent**, removing aggressive or passive-aggressive triggers and increasing your leverage.
* **Branch Gamma // Pause & Reflect:** Computes an optimal tactical cooling-off window (e.g., *25 minutes*, *Next morning at 9:00 AM*) with cognitive de-escalation strategies and self-inquiry checkpoints.
* **Heuristic Risk Gauge:** Provides a calibrated 0–100 heuristic risk indicator, uncertainty and confidence notes, and one concrete next action.

### 2. 👁️ The Other Side — Recipient Perspective Switcher
Examines how your message is interpreted across different human cognitive states:
* **Recipient Roles:** Tailored dynamics for *Professor*, *Recruiter*, *Manager*, *Friend*, *Customer*, or *Custom Archetypes*.
* **Under Stress Lens:** How an overwhelmed recipient scans and defensively interprets your text on mobile between meetings.
* **Generous Lens:** How a calm, empathetic recipient reads your words.
* **Subtext Trap:** Unintended hidden meanings, cold ultimatums, or passive defiance inadvertently projected by text.
* **Power Dynamic & Hierarchy:** How institutional leverage differences amplify the perceived severity of unvarnished phrasing.

### 3. 🔁 Regret Replay — Phrase-by-Phrase Diff Analysis
* Side-by-side comparative split between your raw draft and the optimized revision.
* Phrase change breakdown table explaining the exact psychological shift and rationale behind each substitution.
* Instant one-click copy to clipboard.
* **Simulation Vault:** Save simulations to browser `localStorage` to revisit, compare, or clear at any time without external telemetry.

### 4. 📊 Parallel Matrix
A cross-dimensional evaluation table comparing all three trajectories across:
* Heuristic Risk Score & Classification
* Emotional Friction Level
* Personal Boundary & Leverage Preservation
* Time-to-Resolution Impact
* Strategic Next Action

### 5. ⚡️ Instant Demo Scenarios
One-click pre-loaded dilemmas to test the engine immediately:
* *Late Night Extension Request* (Professor)
* *Pushing Back on Urgent Weekend Scope Creep* (Manager)
* *Countering a Low Offer Letter* (Recruiter)
* *Splitting Unpaid Group Trip Expenses* (Friend)
* *De-escalating an Irate Customer Bug Report* (Customer)

---

## 🛡️ Security, Privacy & Heuristics

* **Untrusted Input Boundaries:** User messages are strictly treated as untrusted data encapsulated within `<user_message_to_analyze>` XML tags. The system instructions explicitly enforce prompt injection defenses.
* **Preserving Human Agency:** The application **never automatically dispatches messages**. It is an exploratory decision sandbox meant to empower human judgment.
* **Heuristic Disclaimer:** Risk scores are explicitly labeled as exploratory behavioral estimates, not deterministic or scientifically calibrated probabilities.
* **Confidentiality:** No user message drafts are stored on remote servers or third-party databases. Saved history resides strictly in the user's local browser storage.

---

## 🛠️ Tech Stack

* **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide React icons, Motion
* **Backend:** Node.js, Express, Vite middleware integration
* **AI Model:** Google Gemini (`gemini-3.8-flash` via `@google/genai` TypeScript SDK)
* **Resilience:** Dual-engine architecture with automatic local fallback simulation if an API key is missing or rate-limited.

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (version 18+ or 20+ recommended)
* npm, pnpm, or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/before-you-click-parallel-you.git
   cd before-you-click-parallel-you
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory (refer to `.env.example`):
   ```bash
   GEMINI_API_KEY="your-gemini-api-key-here"
   PORT=3000
   ```
   *(Note: If `GEMINI_API_KEY` is not provided, the application automatically runs in calibrated local fallback demonstration mode).*

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

---

## 📂 Project Structure

```text
├── server.ts                       # Express server with @google/genai proxy and Vite dev middleware
├── index.html                      # HTML entry with font preconnects & SEO tags
├── metadata.json                   # App capabilities and permissions
├── package.json                    # Dependencies & full-stack scripts
├── vite.config.ts                  # Vite + Tailwind v4 configuration
└── src/
    ├── App.tsx                     # Main application entry point & view switcher
    ├── main.tsx                    # React DOM client mounting
    ├── index.css                   # Tailwind CSS v4 base & custom glow theme
    ├── types/
    │   └── simulator.ts            # TypeScript interfaces for simulations, futures, & lenses
    ├── services/
    │   └── simulationService.ts    # API client with seamless fallback orchestration
    ├── data/
    │   ├── presetScenarios.ts      # Instant dilemma presets (Professor, Manager, Recruiter, etc.)
    │   └── fallbackSimulator.ts   # Dynamic offline heuristic simulation engine
    └── components/
        ├── Header.tsx              # App bar, vault trigger, reset, and modal triggers
        ├── MessageInputCard.tsx    # Message textarea, context selector, and preset pills
        ├── BranchingTimeline.tsx   # Visual branching graph and 3-path selector
        ├── OutcomeCard.tsx         # Deep-dive card for Send As-Is, Smarter, or Pause
        ├── RegretReplay.tsx        # Side-by-side diff comparison, copy, & vault save
        ├── TheOtherSide.tsx        # Multi-perspective recipient cognitive lenses
        ├── ComparisonMatrix.tsx    # 3-way trajectory comparison table
        ├── HistoryDrawer.tsx       # Local storage vault panel
        └── HeuristicModal.tsx      # Behavioral science and privacy methodology modal
```

---

## 📜 License

Apache-2.0 License. See source files for details.
