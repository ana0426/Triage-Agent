#!/usr/bin/env python3
"""
AI Support Triage Agent
Terminal-based agent for processing support tickets through a RAG pipeline.
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
    from rich.progress import Progress, SpinnerColumn, TextColumn
    from rich import print as rprint
    HAS_RICH = True
except ImportError:
    HAS_RICH = False

sys.path.insert(0, os.path.dirname(__file__))

from config import (
    TOP_K_RETRIEVAL, CONFIDENCE_THRESHOLD, OUTPUT_CSV
)
from ingest import load_corpus, chunk_documents
from retrieval import HybridRetriever
from classifier import detect_company, classify_request_type, classify_product_area
from risk_engine import assess_risk, should_escalate
from responder import generate_response
from utils import preprocess_text, contains_prompt_injection, write_log, clear_log


console = Console() if HAS_RICH else None


def print_ticket_header(ticket_num: int, total: int, subject: str):
    if HAS_RICH:
        console.print(Panel(
            f"[bold cyan]PROCESSING TICKET #{ticket_num}/{total}[/bold cyan]\n"
            f"[white]{subject}[/white]",
            border_style="cyan"
        ))
    else:
        print(f"\n{'='*60}")
        print(f"PROCESSING TICKET #{ticket_num}/{total}")
        print(f"Subject: {subject}")
        print('='*60)


def print_result(result: dict):
    status_color = "red" if result["status"] == "escalated" else "green"
    risk_color = "red" if result["risk_level"] == "high" else ("yellow" if result["risk_level"] == "medium" else "green")

    if HAS_RICH:
        table = Table(show_header=False, box=None, padding=(0, 1))
        table.add_column("Key", style="bold")
        table.add_column("Value")
        table.add_row("Company:", result["company"])
        table.add_row("Request Type:", result["request_type"])
        table.add_row("Product Area:", result["product_area"])
        table.add_row("Risk Level:", f"[{risk_color}]{result['risk_level'].upper()}[/{risk_color}]")
        table.add_row("Confidence:", f"{result['confidence']:.2f}")
        table.add_row("Decision:", f"[{status_color}]{result['status'].upper()}[/{status_color}]")
        table.add_row("Top Docs:", ", ".join(result["retrieved_docs"][:3]))
        console.print(table)
        console.print(f"\n[italic]{result['response'][:200]}...[/italic]\n" if len(result['response']) > 200 else f"\n[italic]{result['response']}[/italic]\n")
    else:
        print(f"Company:      {result['company']}")
        print(f"Request Type: {result['request_type']}")
        print(f"Product Area: {result['product_area']}")
        print(f"Risk Level:   {result['risk_level'].upper()}")
        print(f"Confidence:   {result['confidence']:.2f}")
        print(f"Decision:     {result['status'].upper()}")
        print(f"Top Docs:     {', '.join(result['retrieved_docs'][:3])}")
        print(f"Response:     {result['response'][:150]}...")


def process_ticket(
    ticket: dict,
    retriever: HybridRetriever,
) -> dict:
    ticket_id = str(ticket.get("id", "unknown"))
    subject = ticket.get("subject", "")
    issue = ticket.get("issue", "")
    provided_company = ticket.get("company")

    full_text = f"{subject} {issue}"
    processed_text = preprocess_text(full_text)

    is_injection = contains_prompt_injection(full_text)
    if is_injection:
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
        processed_text,
        company=company,
        top_k=TOP_K_RETRIEVAL
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
    Path(OUTPUT_CSV).parent.mkdir(parents=True, exist_ok=True)
    fieldnames = ["id", "subject", "issue", "company", "status", "product_area",
                  "request_type", "response", "justification", "confidence",
                  "risk_level", "processed_at"]
    with open(OUTPUT_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        for result in results:
            row = {k: result.get(k, "") for k in fieldnames}
            row["retrieved_docs"] = ""
            writer.writerow(row)


def run_pipeline(tickets: List[dict]) -> List[dict]:
    clear_log()

    corpus = load_corpus()
    chunks = chunk_documents(corpus)
    retriever = HybridRetriever(chunks)

    if HAS_RICH:
        console.print(Panel(
            f"[bold green]AI Support Triage Agent[/bold green]\n"
            f"Corpus: {len(corpus)} documents | {len(chunks)} chunks\n"
            f"Tickets to process: {len(tickets)}",
            title="Starting",
            border_style="green"
        ))

    results = []
    total = len(tickets)

    for i, ticket in enumerate(tickets, 1):
        print_ticket_header(i, total, ticket.get("subject", "Unknown"))
        result = process_ticket(ticket, retriever)
        results.append(result)
        print_result(result)

    write_output_csv(results)

    if HAS_RICH:
        escalated = sum(1 for r in results if r["status"] == "escalated")
        replied = len(results) - escalated
        console.print(Panel(
            f"[green]Replied:[/green] {replied}  [red]Escalated:[/red] {escalated}  Total: {len(results)}\n"
            f"Output: {OUTPUT_CSV}",
            title="[bold green]Processing Complete[/bold green]",
            border_style="green"
        ))

    return results


def load_tickets_from_csv(csv_path: str) -> List[dict]:
    tickets = []
    with open(csv_path, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            ticket = {
                "id": row.get("id", str(i + 1)),
                "subject": row.get("subject", ""),
                "issue": row.get("issue", ""),
                "company": row.get("company", ""),
            }
            tickets.append(ticket)
    return tickets


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="AI Support Triage Agent")
    parser.add_argument(
        "--input", "-i",
        default=os.path.join(os.path.dirname(__file__), "..", "support_issues", "support_tickets.csv"),
        help="Input CSV file path"
    )
    parser.add_argument(
        "--json-input", "-j",
        help="JSON input (list of tickets)"
    )
    args = parser.parse_args()

    if args.json_input:
        tickets = json.loads(args.json_input)
    else:
        if not os.path.exists(args.input):
            print(f"Error: Input file not found: {args.input}")
            sys.exit(1)
        tickets = load_tickets_from_csv(args.input)

    if not tickets:
        print("No tickets to process.")
        sys.exit(0)

    results = run_pipeline(tickets)
    print(json.dumps(results, indent=2))
