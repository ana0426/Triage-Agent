# AI Support Triage Agent + Dashboard

> Built for the **HackerRank Orchestrate Hackathon** — May 1–2, 2026

An end-to-end AI-powered customer support triage system. A Python agent reads incoming support tickets, classifies and risk-scores them, retrieves relevant documentation via RAG, and generates grounded LLM responses — all surfaced in a real-time React dashboard.

---

## Overview

The system handles support tickets across three companies — **HackerRank**, **Claude (Anthropic)**, and **Visa** — and decides for each ticket whether to:

- **Reply** with a grounded, documentation-backed response, or
- **Escalate** to a human specialist based on risk signals

All decisions are logged in AGENTS.md-compliant format and written to a CSV for evaluator scoring.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Python Triage Agent                   │
│                                                         │
│  support_tickets.csv                                    │
│         │                                               │
│         ▼                                               │
│  ┌─────────────┐   ┌──────────────┐   ┌─────────────┐  │
│  │  Classifier │──▶│ RAG Retrieval│──▶│  Responder  │  │
│  │  (company,  │   │ (BM25+TF-IDF │   │  (GPT-4o-   │  │
│  │  type, area)│   │  hybrid)     │   │   mini LLM) │  │
│  └─────────────┘   └──────────────┘   └─────────────┘  │
│         │                                    │          │
│         ▼                                    ▼          │
│  ┌─────────────┐                    ┌──────────────┐    │
│  │ Risk Engine │                    │  output.csv  │    │
│  │ (escalation │                    │ output_full  │    │
│  │  decision)  │                    │    .json     │    │
│  └─────────────┘                    └──────────────┘    │
└─────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│              Express API Server (TypeScript)             │
│   Reads output files + serves /api/triage/* endpoints   │
└─────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│            React + Vite Dashboard (TypeScript)           │
│   Command Center │ Triage Results │ Logs │ Knowledge Base│
└─────────────────────────────────────────────────────────┘
```

---

## Repository Structure

```
.
├── triage-agent/                  # Python triage agent
│   ├── code/
│   │   ├── main.py                # Entry point — runs the full pipeline
│   │   ├── config.py              # Paths, model config, constants
│   │   ├── ingest.py              # Corpus loader (reads .md files)
│   │   ├── retrieval.py           # Hybrid BM25 + TF-IDF retriever
│   │   ├── classifier.py          # Company, request type, product area
│   │   ├── risk_engine.py         # Risk scoring + escalation decision
│   │   ├── responder.py           # LLM response generator (OpenAI)
│   │   ├── prompts.py             # System/user prompt templates
│   │   └── utils.py               # AGENTS.md logging helpers
│   ├── data/
│   │   ├── hackerrank/            # 4 markdown corpus files
│   │   ├── claude/                # 4 markdown corpus files
│   │   └── visa/                  # 3 markdown corpus files
│   ├── support_tickets/
│   │   ├── support_tickets.csv    # 20-ticket evaluation input
│   │   ├── sample_support_tickets.csv  # 10-ticket sample for testing
│   │   ├── output.csv             # Evaluator output (6-column schema)
│   │   └── output_full.json       # Rich output for dashboard
│   ├── requirements.txt
│   └── AGENTS.md                  # Agent contract specification
│
├── artifacts/
│   ├── api-server/                # Express API (TypeScript)
│   │   └── src/routes/triage/    # /api/triage/* endpoints
│   └── triage-dashboard/          # React + Vite frontend
│       └── src/pages/
│           ├── dashboard.tsx      # Command Center + stats
│           ├── results.tsx        # Triage Results table
│           ├── logs.tsx           # System Logs viewer
│           └── corpus.tsx         # Knowledge Base browser
│
└── lib/                           # Shared TypeScript libraries
```

---

## Quickstart

### Prerequisites

- Python 3.10+
- Node.js 18+ and pnpm
- OpenAI-compatible API key (set via environment)

### 1. Clone & install

```bash
git clone <repo-url>
cd <repo>

# Python agent
pip install -r triage-agent/requirements.txt

# Node/dashboard
pnpm install
```

### 2. Set environment variables

```bash
# Required for the Python agent
export AI_INTEGRATIONS_OPENAI_BASE_URL="https://..."
export AI_INTEGRATIONS_OPENAI_API_KEY="your-key"
```

Or copy `triage-agent/.env.example` to `triage-agent/.env` and fill it in.

### 3. Run the triage agent

```bash
# Run on the 20-ticket evaluation set (writes output.csv)
cd triage-agent
python code/main.py

# Run on the 10-ticket sample set
python code/main.py --sample

# Run on a custom CSV
python code/main.py --input /path/to/tickets.csv
```

**Output locations:**

| File | Description |
|------|-------------|
| `triage-agent/support_tickets/output.csv` | Evaluator CSV (6 columns) |
| `triage-agent/support_tickets/output_full.json` | Rich JSON for dashboard |
| `$HOME/hackerrank_orchestrate/log.txt` | AGENTS.md session + turn log |
| `$HOME/hackerrank_orchestrate/triage_run.txt` | Per-ticket decision trace |

### 4. Start the dashboard

```bash
# Start API server
pnpm --filter @workspace/api-server run dev

# Start React dashboard
pnpm --filter @workspace/triage-dashboard run dev
```

Then open the preview at the root path. The dashboard auto-reads from the agent's output files.

---

## Agent Pipeline

Each ticket goes through these stages in order:

### 1. Prompt Injection Guard
Detects and blocks malicious inputs before any classification.

### 2. Company Detection
Identifies the company (HackerRank, Claude, Visa, or Generic) from the ticket text and any provided `company` field.

### 3. Request Type Classification
```
invalid → prompt injection or spam
bug     → clear technical malfunction ("not loading", "error", "crash")
feature_request → explicit new-feature ask
product_issue   → default for substantive issues
```

### 4. RAG Retrieval
Hybrid BM25 + TF-IDF retrieval over 11 markdown corpus files. Returns the top-5 most relevant chunks, scored by combined cosine + BM25 similarity. Confidence is the max score of the top result.

### 5. Risk Assessment
Scans for financial indicators, account recovery patterns, legal/security keywords, and harmful requests. Returns `low`, `medium`, or `high`.

### 6. Escalation Decision
Tickets with `high` risk or confidence below 0.25 are escalated to a human specialist. All others are replied to automatically.

### 7. LLM Response Generation
Sends retrieved documentation + ticket context to GPT-4o-mini. The model returns a structured JSON with:
- `response` — customer-facing message (grounded in docs only)
- `product_area` — specific product area from a constrained list
- `justification` — internal rationale

---

## Output Schema

The evaluator CSV (`output.csv`) has exactly these 6 columns:

| Column | Values |
|--------|--------|
| `id` | Ticket ID (matches input) |
| `status` | `replied` or `escalated` |
| `product_area` | Specific area (e.g. `fraud_and_disputes`, `api_and_billing`) |
| `response` | Customer-facing response text |
| `justification` | Internal reasoning |
| `request_type` | `product_issue`, `bug`, `feature_request`, or `invalid` |

---

## Knowledge Base Corpus

| Company | Documents |
|---------|-----------|
| HackerRank | Assessment Issues, Account & Login, Scoring & Results, Proctoring |
| Claude | API Access & Billing, Subscription & Plans, Models & Capabilities, Account & Privacy |
| Visa | Card Issues, Fraud & Disputes, Payments & Transactions |

Corpus files live in `triage-agent/data/<company>/` as markdown. The agent loads and chunks all files at startup.

---

## Dashboard Pages

| Page | Description |
|------|-------------|
| **Command Center** | Live stats (total / replied / escalated / avg confidence) + risk distribution donut chart + batch CSV input |
| **Triage Results** | Filterable table of all processed tickets with expandable rows showing the full response, justification, and sources |
| **System Logs** | Structured trace (one row per ticket) + raw terminal output from the agent log file |
| **Knowledge Base** | Browse all corpus documents — click any card to read the full content |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Agent language | Python 3.10+ |
| RAG retrieval | BM25 (`rank-bm25`) + TF-IDF (`scikit-learn`) |
| LLM | GPT-4o-mini via OpenAI-compatible API |
| API server | Express + TypeScript (pnpm monorepo) |
| Dashboard | React 18, Vite, Tailwind CSS, shadcn/ui |
| State / data fetching | TanStack Query with OpenAPI-generated hooks |

---

## Logging Contract (AGENTS.md)

Logs are written to `$HOME/hackerrank_orchestrate/log.txt` in AGENTS.md §5 format:

```
## [<ISO timestamp>] SESSION START

Agent: replit-agent
Repo Root: /path/to/triage-agent
Branch: main
Input: support_tickets/support_tickets.csv
Tickets: 20

## [<ISO timestamp>] Triage pipeline run complete

User Prompt (verbatim, secrets redacted): ...
Agent Response Summary: ...
Actions:
* read support_tickets.csv
* loaded corpus from data/
* ran RAG retrieval + LLM response generation
* wrote support_tickets/output.csv (20 rows)
```

---

## Escalation Examples (Eval Set)

| # | Subject | Decision | Reason |
|---|---------|----------|--------|
| 2 | Suspicious charge on my Visa | ESCALATED | Financial fraud indicator detected |
| 9 | Request for Claude to write malware | ESCALATED | Harmful/malicious request detected |
| 11 | Double charged by merchant | ESCALATED | Duplicate billing — financial risk |
| 20 | Emergency cash abroad | ESCALATED | Stranded with no working card — high risk |

---

## License

MIT
