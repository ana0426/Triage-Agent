# AGENTS.md — HackerRank Orchestrate (May 2026)

This file is the canonical instruction file for all AI coding agents working in this repo.

## Log File

All session and per-turn logs are written to:

| Platform       | Path                                             |
| -------------- | ------------------------------------------------ |
| macOS / Linux  | `$HOME/hackerrank_orchestrate/log.txt`           |
| Windows        | `%USERPROFILE%\hackerrank_orchestrate\log.txt`   |

The run-log (per-ticket decision trace) is written to:
`$HOME/hackerrank_orchestrate/triage_run.txt`

## Repository Layout

```
.
├── AGENTS.md
├── README.md
├── .env.example
├── requirements.txt
├── code/
│   ├── main.py          # Entry point
│   ├── config.py
│   ├── ingest.py
│   ├── retrieval.py
│   ├── classifier.py
│   ├── risk_engine.py
│   ├── responder.py
│   ├── prompts.py
│   ├── utils.py
│   └── README.md
├── support_tickets/
│   ├── sample_support_tickets.csv   # inputs + expected outputs (dev)
│   ├── support_tickets.csv          # inputs only (evaluation)
│   └── output.csv                   # agent predictions (generated)
└── data/
    ├── hackerrank/
    ├── claude/
    └── visa/
```

## Entry Point Contract

```bash
python code/main.py                          # uses support_tickets/support_tickets.csv
python code/main.py --input /path/to/in.csv  # custom input
python code/main.py --sample                 # uses sample_support_tickets.csv
```

## Output Schema

Output is written to `support_tickets/output.csv` with columns:

| Column          | Allowed Values                                          |
| --------------- | ------------------------------------------------------- |
| `id`            | ticket id (from input)                                  |
| `status`        | `replied`, `escalated`                                  |
| `product_area`  | support category / domain area                          |
| `response`      | user-facing answer grounded in corpus                   |
| `justification` | concise routing/answering decision explanation          |
| `request_type`  | `product_issue`, `feature_request`, `bug`, `invalid`    |

## Secrets

Read from environment variables only. Never hardcode.
Required: `OPENAI_API_KEY` (or `AI_INTEGRATIONS_OPENAI_API_KEY` for Replit).
