# AI Support Triage Agent

A terminal-based AI support triage system that processes support tickets using a RAG (Retrieval-Augmented Generation) pipeline.

## Supported Domains

- **HackerRank** — assessments, IDE, login, scoring, certification, proctoring
- **Claude** — API access, billing, usage limits, subscriptions, safety
- **Visa** — fraud, card declines, travel, disputes, chargebacks, payments

## Architecture

```
CSV Input
   ↓
Preprocessing & Prompt Injection Detection
   ↓
Company Detection (keyword-based)
   ↓
Request Type Classification (bug/feature_request/product_issue/invalid)
   ↓
Risk & Escalation Engine (deterministic rules)
   ↓
Hybrid RAG Retrieval (TF-IDF + BM25)
   ↓
LLM Response Generation (grounded, OpenAI)
   ↓
Validation & Output
   ↓
output.csv + log.txt
```

## Setup

```bash
pip install -r requirements.txt
```

Set environment variables (already configured in Replit):
- `AI_INTEGRATIONS_OPENAI_BASE_URL`
- `AI_INTEGRATIONS_OPENAI_API_KEY`

## Usage

```bash
# Process a CSV file
cd code
python main.py --input ../support_issues/support_tickets.csv

# Process JSON input
python main.py --json-input '[{"id":"1","subject":"Card declined","issue":"My Visa card was declined abroad","company":"Visa"}]'
```

## Input CSV Format

```csv
id,subject,issue,company
1,Card blocked,My Visa card stopped working while traveling,Visa
2,Assessment not loading,IDE shows blank screen,HackerRank
```

## Output CSV Format

```csv
id,subject,issue,company,status,product_area,request_type,response,justification,confidence,risk_level,processed_at
```

## Escalation Rules (Always Escalate)

- Fraud / unauthorized transactions
- Account recovery / locked accounts
- Legal threats / data breaches
- Low retrieval confidence (< 0.25)
- Multi-issue tickets with low confidence

## Safety Rules

- Responses grounded ONLY in the support corpus
- Never invents refunds, policies, or account actions
- Prompt injection detection and classification as invalid
- Hallucination guard: falls back to generic safe response if confidence is too low
