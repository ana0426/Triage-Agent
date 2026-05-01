"""
Utility helpers: text preprocessing, prompt-injection detection, and log writing.
Log file location follows AGENTS.md §2: $HOME/hackerrank_orchestrate/log.txt
"""
import re
import os
import datetime
from pathlib import Path
from config import LOG_FILE

_TRIAGE_LOG = LOG_FILE
_RUN_LOG = LOG_FILE.parent / "triage_run.txt"


def preprocess_text(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'[^\w\s@.\-\/]', ' ', text)
    return text


def contains_prompt_injection(text: str) -> bool:
    injection_patterns = [
        r"ignore (all |previous |prior )?(instructions|rules|context)",
        r"forget (all |your |previous )?(instructions|rules|context)",
        r"you are (now |a )?(different|new|another)",
        r"system prompt",
        r"jailbreak",
        r"act as if",
        r"pretend (you are|to be)",
        r"roleplay as",
        r"disregard",
        r"override",
        r"tell me your (prompt|instructions|rules)",
    ]
    text_lower = text.lower()
    for pattern in injection_patterns:
        if re.search(pattern, text_lower):
            return True
    return False


def _ensure_dirs():
    Path(_TRIAGE_LOG).parent.mkdir(parents=True, exist_ok=True)


def append_agents_log(content: str):
    """Append a raw block to the AGENTS.md-specified log file (§2)."""
    _ensure_dirs()
    with open(_TRIAGE_LOG, "a", encoding="utf-8", newline="\n") as f:
        f.write(content + "\n")


def write_session_start(input_file: str, num_tickets: int):
    """Write AGENTS.md §5.1 SESSION START entry."""
    _ensure_dirs()
    now = datetime.datetime.now().astimezone().isoformat()

    deadline = datetime.datetime(2026, 5, 2, 11, 0, 0,
                                 tzinfo=datetime.timezone(datetime.timedelta(hours=5, minutes=30)))
    remaining = deadline - datetime.datetime.now(datetime.timezone.utc).astimezone(deadline.tzinfo)
    total_s = int(remaining.total_seconds())
    if total_s < 0:
        time_left = "Challenge ended"
    else:
        days = total_s // 86400
        hours = (total_s % 86400) // 3600
        mins = (total_s % 3600) // 60
        time_left = f"{days}d {hours}h {mins}m"

    block = f"""
## [{now}] SESSION START

Agent: replit-agent
Repo Root: {Path(__file__).parent.parent.resolve()}
Branch: main
Worktree: main
Parent Agent: none
Language: py
Time Remaining: {time_left}
Input: {input_file}
Tickets: {num_tickets}
"""
    append_agents_log(block)


def write_turn_log(title: str, prompt_summary: str, response_summary: str, actions: list):
    """Write AGENTS.md §5.2 per-turn entry."""
    _ensure_dirs()
    now = datetime.datetime.now().astimezone().isoformat()
    actions_str = "\n".join(f"* {a}" for a in actions)
    block = f"""
## [{now}] {title[:80]}

User Prompt (verbatim, secrets redacted):
{prompt_summary}

Agent Response Summary:
{response_summary}

Actions:
{actions_str}

Context:
tool=replit-agent
branch=main
repo_root={Path(__file__).parent.parent.resolve()}
worktree=main
parent_agent=none
"""
    append_agents_log(block)


def write_log(ticket_id: str, entry: dict):
    """Append a per-ticket decision trace to the run log (human-readable)."""
    _ensure_dirs()
    timestamp = datetime.datetime.now().isoformat()
    with open(_RUN_LOG, "a", encoding="utf-8") as f:
        f.write("\n" + "=" * 60 + "\n")
        f.write(f"TICKET #{ticket_id}  [{timestamp}]\n")
        f.write(f"Company:       {entry.get('company', 'Unknown')}\n")
        f.write(f"Request Type:  {entry.get('request_type', 'unknown')}\n")
        f.write(f"Product Area:  {entry.get('product_area', 'unknown')}\n")
        f.write(f"Risk Level:    {entry.get('risk_level', 'unknown').upper()}\n")
        f.write(f"Confidence:    {entry.get('confidence', 0):.2f}\n")
        f.write(f"Decision:      {entry.get('status', 'unknown').upper()}\n")
        docs = entry.get("retrieved_docs", [])
        if docs:
            f.write("Retrieved Docs:\n")
            for doc in docs:
                f.write(f"  - {doc}\n")
        f.write(f"Justification: {entry.get('justification', '')}\n")
        f.write("=" * 60 + "\n")


def read_log() -> str:
    """Read the run log contents."""
    _ensure_dirs()
    if _RUN_LOG.exists():
        return _RUN_LOG.read_text(encoding="utf-8")
    return ""


def clear_log():
    """Clear and re-initialise the run log for a fresh pipeline run."""
    _ensure_dirs()
    with open(_RUN_LOG, "w", encoding="utf-8") as f:
        f.write(f"=== Triage Agent Run Log — {datetime.datetime.now().isoformat()} ===\n")
