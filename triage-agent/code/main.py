#!/usr/bin/env python3
"""
AI Support Triage Agent — HackerRank Orchestrate (May 2026)

Entry point: reads support_tickets/support_tickets.csv, runs the RAG-based
triage pipeline, and writes predictions to support_tickets/output.csv.

Usage:
    python main.py                          # uses default support_tickets.csv
    python main.py --input /path/to/in.csv  # custom input file
    python main.py --sample                 # run on sample_support_tickets.csv

Logs:
    $HOME/hackerrank_orchestrate/log.txt    # AGENTS.md §2 transcript log
    $HOME/hackerrank_orchestrate/triage_run.txt  # per-ticket decision trace
"""
import sys
import json
import datetime
import argparse
import csv
import os
from pathlib import Path
from typing import List, Dict

try:
    from rich.console import Console
    from rich.panel import Panel
    from rich.table import Table
    HAS_RICH = True
except ImportError:
    HAS_RICH = False

sys.path.insert(0, os.path.dirname(__file__))

from config import (
    TOP_K_RETRIEVAL, CONFIDENCE_THRESHOLD, OUTPUT_CSV, INPUT_CSV, DATA_DIR
)
from ingest import load_corpus, chunk_documents
from retrieval import HybridRetriever
from classifier import detect_company, classify_request_type, classify_product_area
from risk_engine import assess_risk, should_escalate
from responder import generate_response
from utils import (
    preprocess_text, contains_prompt_injection,
    write_log, clear_log,
    write_session_start, write_turn_log,
)

console = Console() if HAS_RICH else None


def _print(msg: str, style: str = ""):
    if HAS_RICH and console:
        console.print(msg, style=style or None)
    else:
        print(msg)


def print_ticket_header(ticket_num: int, total: int, subject: str):
    if HAS_RICH:
        console.print(Panel(
            f"[bold cyan]TICKET {ticket_num}/{total}[/bold cyan]  [white]{subject}[/white]",
            border_style="cyan",
        ))
    else:
        print(f"\n{'='*60}\nPROCESSING TICKET {ticket_num}/{total}: {subject}\n{'='*60}")


def print_result(result: dict):
    status_color = "red" if result["status"] == "escalated" else "green"
    risk_color = "red" if result["risk_level"] == "high" else (
        "yellow" if result["risk_level"] == "medium" else "green"
    )
    if HAS_RICH:
        t = Table(show_header=False, box=None, padding=(0, 1))
        t.add_column("Key", style="bold")
        t.add_column("Value")
        t.add_row("Company:", result["company"])
        t.add_row("Request Type:", result["request_type"])
        t.add_row("Product Area:", result["product_area"])
        t.add_row("Risk:", f"[{risk_color}]{result['risk_level'].upper()}[/{risk_color}]")
        t.add_row("Confidence:", f"{result['confidence']:.2f}")
        t.add_row("Decision:", f"[{status_color}]{result['status'].upper()}[/{status_color}]")
        console.print(t)
        preview = result["response"][:180] + "…" if len(result["response"]) > 180 else result["response"]
        console.print(f"[italic]{preview}[/italic]\n")
    else:
        print(f"  Company:    {result['company']}")
        print(f"  Type:       {result['request_type']}")
        print(f"  Area:       {result['product_area']}")
        print(f"  Risk:       {result['risk_level'].upper()}")
        print(f"  Confidence: {result['confidence']:.2f}")
        print(f"  Decision:   {result['status'].upper()}")
        print(f"  Response:   {result['response'][:120]}…")


def process_ticket(ticket: dict, retriever: HybridRetriever) -> dict:
    ticket_id = str(ticket.get("id", "unknown"))
    subject = ticket.get("subject", "")
    issue = ticket.get("issue", "")
    provided_company = ticket.get("company") or None

    full_text = f"{subject} {issue}"
    processed_text = preprocess_text(full_text)

    if contains_prompt_injection(full_text):
        return {
            "id": ticket_id,
            "subject": subject,
            "issue": issue,
            "company": "Generic",
            "status": "replied",
            "product_area": "security",
            "request_type": "invalid",
            "response": "Your message does not appear to be a valid support request. If you need assistance, please describe your issue clearly.",
            "justification": "Prompt injection attempt detected. Request classified as invalid.",
            "confidence": 1.0,
            "risk_level": "low",
            "retrieved_docs": [],
            "processed_at": datetime.datetime.now().isoformat(),
        }

    company = detect_company(processed_text, provided_company)
    request_type = classify_request_type(processed_text)

    if request_type == "invalid":
        return {
            "id": ticket_id,
            "subject": subject,
            "issue": issue,
            "company": company,
            "status": "replied",
            "product_area": "general",
            "request_type": "invalid",
            "response": "We were unable to identify a valid support request in your message. Please resubmit with details about your issue.",
            "justification": "Request classified as invalid based on content analysis.",
            "confidence": 1.0,
            "risk_level": "low",
            "retrieved_docs": [],
            "processed_at": datetime.datetime.now().isoformat(),
        }

    retrieved_docs, confidence = retriever.retrieve(
        processed_text, company=company, top_k=TOP_K_RETRIEVAL
    )

    risk_level, escalation_reasons = assess_risk(processed_text, confidence)
    escalate = should_escalate(risk_level, confidence, escalation_reasons)
    status = "escalated" if escalate else "replied"

    product_area = classify_product_area(processed_text, company)

    response_text, product_area_from_llm, justification = generate_response(
        subject=subject,
        issue=issue,
        company=company,
        request_type=request_type,
        status=status,
        risk_level=risk_level,
        retrieved_docs=retrieved_docs,
        escalation_reasons=escalation_reasons,
    )

    if product_area_from_llm and product_area_from_llm != "general":
        product_area = product_area_from_llm

    result = {
        "id": ticket_id,
        "subject": subject,
        "issue": issue,
        "company": company,
        "status": status,
        "product_area": product_area,
        "request_type": request_type,
        "response": response_text,
        "justification": justification,
        "confidence": round(confidence, 4),
        "risk_level": risk_level,
        "retrieved_docs": [d["title"] for d in retrieved_docs],
        "processed_at": datetime.datetime.now().isoformat(),
    }

    write_log(ticket_id, result)
    return result


def write_output_csv(results: List[dict]):
    """Write output in the exact schema required by the evaluator."""
    out_path = Path(OUTPUT_CSV)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    fieldnames = ["id", "status", "product_area", "response", "justification", "request_type"]
    with open(out_path, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for result in results:
            writer.writerow({k: result.get(k, "") for k in fieldnames})
    _print(f"\n[bold green]Output written:[/bold green] {out_path}" if HAS_RICH else f"\nOutput: {out_path}")

    # Write rich JSON sidecar for the dashboard (all fields)
    json_path = out_path.parent / "output_full.json"
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, default=str)


def run_pipeline(tickets: List[dict]) -> List[dict]:
    clear_log()

    corpus = load_corpus()
    chunks = chunk_documents(corpus)
    retriever = HybridRetriever(chunks)

    if HAS_RICH:
        console.print(Panel(
            f"[bold green]AI Support Triage Agent[/bold green]\n"
            f"Corpus: {len(corpus)} docs | {len(chunks)} chunks | "
            f"Data dir: {DATA_DIR}\n"
            f"Tickets to process: {len(tickets)}",
            title="Starting",
            border_style="green",
        ))
    else:
        print(f"\nLoaded {len(corpus)} docs ({len(chunks)} chunks). Processing {len(tickets)} tickets…")

    results = []
    for i, ticket in enumerate(tickets, 1):
        print_ticket_header(i, len(tickets), ticket.get("subject", "Unknown"))
        result = process_ticket(ticket, retriever)
        results.append(result)
        print_result(result)

    write_output_csv(results)

    escalated = sum(1 for r in results if r["status"] == "escalated")
    replied = len(results) - escalated
    if HAS_RICH:
        console.print(Panel(
            f"[green]Replied:[/green] {replied}   [red]Escalated:[/red] {escalated}   Total: {len(results)}",
            title="[bold green]Complete[/bold green]",
            border_style="green",
        ))
    else:
        print(f"\nDone — Replied: {replied} | Escalated: {escalated} | Total: {len(results)}")

    return results


def load_tickets_from_csv(csv_path: str) -> List[dict]:
    tickets = []
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            tickets.append({
                "id": row.get("id", str(i + 1)),
                "subject": row.get("subject", ""),
                "issue": row.get("issue", ""),
                "company": row.get("company", "") or None,
            })
    return tickets


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="AI Support Triage Agent — HackerRank Orchestrate May 2026"
    )
    parser.add_argument(
        "--input", "-i",
        default=str(INPUT_CSV),
        help="Path to input CSV (default: support_tickets/support_tickets.csv)",
    )
    parser.add_argument(
        "--sample", "-s",
        action="store_true",
        help="Run on sample_support_tickets.csv instead",
    )
    parser.add_argument(
        "--json-input", "-j",
        help="JSON string containing a list of ticket dicts",
    )
    args = parser.parse_args()

    if args.sample:
        args.input = str(Path(INPUT_CSV).parent / "sample_support_tickets.csv")

    if args.json_input:
        tickets = json.loads(args.json_input)
    else:
        if not os.path.exists(args.input):
            print(f"Error: Input file not found: {args.input}", file=sys.stderr)
            sys.exit(1)
        tickets = load_tickets_from_csv(args.input)

    if not tickets:
        print("No tickets to process.", file=sys.stderr)
        sys.exit(0)

    write_session_start(args.input, len(tickets))

    results = run_pipeline(tickets)

    write_turn_log(
        title="Triage pipeline run complete",
        prompt_summary=f"Run pipeline on {args.input} ({len(tickets)} tickets)",
        response_summary=(
            f"Processed {len(tickets)} tickets. "
            f"Replied: {sum(1 for r in results if r['status']=='replied')}. "
            f"Escalated: {sum(1 for r in results if r['status']=='escalated')}. "
            f"Output written to support_tickets/output.csv."
        ),
        actions=[
            f"read {args.input}",
            f"loaded corpus from {DATA_DIR}",
            "ran RAG retrieval + LLM response generation",
            f"wrote support_tickets/output.csv ({len(results)} rows)",
        ],
    )
