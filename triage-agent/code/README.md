# AI Support Triage Agent — Code README

A terminal-based multi-domain support triage agent built for the **HackerRank Orchestrate** hackathon (May 2026).

## Architecture

```
code/
├── main.py          # Entry point — orchestrates the pipeline
├── config.py        # Paths, model settings, keyword lists
├── ingest.py        # Corpus loader: reads .md/.txt files from data/{company}/
├── retrieval.py     # Hybrid BM25 + TF-IDF retriever
├── classifier.py    # Company detection, request type, product area
├── risk_engine.py   # Risk level assessment and escalation rules
├── responder.py     # LLM response generator via OpenAI-compatible API
├── prompts.py       # System/user prompt templates
└── utils.py         # Text preprocessing, injection detection, log writers
```

### Pipeline (per ticket)

1. **Injection Check** — regex-based prompt-injection detection; invalid requests are replied to immediately.
2. **Company Detection** — keyword matching + LLM inference when `company` field is `None`.
3. **Request Classification** — classifies into `product_issue`, `feature_request`, `bug`, or `invalid`.
4. **RAG Retrieval** — hybrid BM25 + TF-IDF search over chunked corpus documents from `data/`.
5. **Risk Assessment** — keyword-based risk scoring + confidence thresholding.
6. **Escalation Decision** — high-risk or low-confidence tickets are escalated; others are replied to.
7. **LLM Response Generation** — GPT-4o-mini generates a grounded response + justification using retrieved docs.
8. **Output** — writes `support_tickets/output.csv` with the 5 required columns.

## Installation

```bash
pip install -r requirements.txt
```

Requirements: `openai`, `scikit-learn`, `rank-bm25`, `rich`

## Configuration

Copy the example environment file and set your keys:

```bash
cp .env.example .env
# Edit .env and set OPENAI_API_KEY (or AI_INTEGRATIONS_OPENAI_API_KEY for Replit)
```

## Running the Agent

```bash
# Process the evaluation tickets (default)
python code/main.py

# Process the sample tickets (with expected outputs for validation)
python code/main.py --sample

# Custom input file
python code/main.py --input /path/to/tickets.csv
```

Output is written to `support_tickets/output.csv`.

## Logs

| File | Purpose |
|------|---------|
| `$HOME/hackerrank_orchestrate/log.txt` | AGENTS.md §2 session/turn transcript log |
| `$HOME/hackerrank_orchestrate/triage_run.txt` | Per-ticket decision trace for debugging |

## Design Decisions

- **No live web calls**: The agent uses only the local `data/` corpus.
- **Hybrid retrieval**: BM25 handles exact keyword matching; TF-IDF handles semantic similarity. No GPU or external embedding service required.
- **Deterministic where possible**: Classification and retrieval are deterministic. LLM temperature is set to 0 for reproducibility.
- **Safe escalation**: When confidence is below threshold or keywords indicate fraud/legal/security risk, the ticket is always escalated rather than guessed.
- **Injection resistance**: Regex patterns catch common prompt injection attempts before they reach the LLM.

## Corpus Structure

```
data/
├── hackerrank/      # HackerRank Help Center articles (.md)
├── claude/          # Claude Help Center articles (.md)
└── visa/            # Visa consumer support articles (.md)
```

Each `.md` file is split on `## ` headings into individual corpus documents. The agent retrieves the top-5 most relevant chunks per ticket.
