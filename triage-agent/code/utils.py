import re
import os
import json
import datetime
from pathlib import Path
from config import LOG_FILE


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
    ]
    text_lower = text.lower()
    for pattern in injection_patterns:
        if re.search(pattern, text_lower):
            return True
    return False


def ensure_dirs():
    Path(LOG_FILE).parent.mkdir(parents=True, exist_ok=True)


def write_log(ticket_id: str, entry: dict):
    ensure_dirs()
    timestamp = datetime.datetime.now().isoformat()
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write("\n" + "=" * 60 + "\n")
        f.write(f"TICKET #{ticket_id}  [{timestamp}]\n")
        f.write(f"Company:       {entry.get('company', 'Unknown')}\n")
        f.write(f"Request Type:  {entry.get('request_type', 'unknown')}\n")
        f.write(f"Risk Level:    {entry.get('risk_level', 'unknown').upper()}\n")
        f.write(f"Confidence:    {entry.get('confidence', 0):.2f}\n")
        f.write(f"Retrieved Docs:\n")
        for doc in entry.get('retrieved_docs', []):
            f.write(f"  - {doc}\n")
        f.write(f"Decision:      {entry.get('status', 'unknown').upper()}\n")
        f.write(f"Product Area:  {entry.get('product_area', 'unknown')}\n")
        f.write(f"Justification: {entry.get('justification', '')}\n")
        f.write("=" * 60 + "\n")


def read_log() -> str:
    ensure_dirs()
    if not os.path.exists(LOG_FILE):
        return ""
    with open(LOG_FILE, "r", encoding="utf-8") as f:
        return f.read()


def clear_log():
    ensure_dirs()
    with open(LOG_FILE, "w", encoding="utf-8") as f:
        f.write(f"=== Triage Agent Log - {datetime.datetime.now().isoformat()} ===\n")
