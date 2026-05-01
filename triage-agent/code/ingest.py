"""
Corpus ingestion: loads .md / .txt support documents from data/{company}/ directories.
Falls back to the built-in default corpus when the data directory does not exist.
"""
import re
from pathlib import Path
from typing import List, Dict

from config import CHUNK_SIZE, CHUNK_OVERLAP, DATA_DIR

_COMPANY_DIR_MAP = {
    "HackerRank": "hackerrank",
    "Claude": "claude",
    "Visa": "visa",
}


def _load_file(path: Path, source: str) -> List[Dict]:
    """Parse a single markdown/text file into documents split on H2 headings."""
    text = path.read_text(encoding="utf-8")
    doc_id_base = path.stem.replace(" ", "_").lower()
    docs = []

    sections = re.split(r"(?m)^## ", text)
    for i, section in enumerate(sections):
        section = section.strip()
        if not section:
            continue
        lines = section.splitlines()
        title = lines[0].strip("# ").strip()
        content = "\n".join(lines[1:]).strip()
        if not content:
            content = title

        docs.append({
            "id": f"{source.lower()}_{doc_id_base}_{i:03d}",
            "source": source,
            "title": title,
            "content": content,
            "file": str(path),
        })

    if not docs:
        docs.append({
            "id": f"{source.lower()}_{doc_id_base}_000",
            "source": source,
            "title": path.stem.replace("_", " ").title(),
            "content": text.strip(),
            "file": str(path),
        })

    return docs


def load_corpus() -> List[Dict]:
    """Load all corpus documents from data/{company}/ subdirectories."""
    corpus: List[Dict] = []

    for company, dirname in _COMPANY_DIR_MAP.items():
        company_dir = Path(DATA_DIR) / dirname
        if not company_dir.exists():
            continue
        for fpath in sorted(company_dir.iterdir()):
            if fpath.suffix.lower() in (".md", ".txt"):
                try:
                    corpus.extend(_load_file(fpath, company))
                except Exception as exc:
                    print(f"[ingest] Warning: could not read {fpath}: {exc}")

    if not corpus:
        corpus = _get_default_corpus()

    return corpus


def chunk_documents(corpus: List[Dict]) -> List[Dict]:
    """Split documents into overlapping word-level chunks for retrieval."""
    chunks = []
    for doc in corpus:
        text = doc["content"]
        words = text.split()
        if len(words) <= CHUNK_SIZE:
            chunks.append({
                "chunk_id": f"{doc['id']}_0",
                "doc_id": doc["id"],
                "source": doc["source"],
                "title": doc["title"],
                "text": text,
            })
        else:
            i = 0
            chunk_idx = 0
            while i < len(words):
                chunk_words = words[i: i + CHUNK_SIZE]
                chunks.append({
                    "chunk_id": f"{doc['id']}_{chunk_idx}",
                    "doc_id": doc["id"],
                    "source": doc["source"],
                    "title": doc["title"],
                    "text": " ".join(chunk_words),
                })
                i += CHUNK_SIZE - CHUNK_OVERLAP
                chunk_idx += 1
    return chunks


def _get_default_corpus() -> List[Dict]:
    """Minimal fallback corpus used when data/ directories are absent."""
    return [
        {"id": "hr_001", "source": "HackerRank", "title": "Assessment Not Loading",
         "content": "If your HackerRank assessment is not loading, clear browser cache, use Chrome, disable extensions, and check your internet connection. Contact your recruiter for a time extension if within an active test window. HackerRank support cannot grant extensions on behalf of recruiters."},
        {"id": "hr_002", "source": "HackerRank", "title": "Login Issues",
         "content": "If you cannot log in to HackerRank, use the Forgot Password link. If your account is locked, contact HackerRank support. SSO users should contact their company admin."},
        {"id": "hr_003", "source": "HackerRank", "title": "Plagiarism Detection",
         "content": "HackerRank uses automated plagiarism detection. Manual reviews are requested by the recruiter, not HackerRank support. Contact the hiring company directly."},
        {"id": "hr_004", "source": "HackerRank", "title": "Test Scoring",
         "content": "Scores are calculated based on test cases passed. Scores are final unless a technical issue is reported within 24 hours. HackerRank support cannot modify scores."},
        {"id": "claude_001", "source": "Claude", "title": "API Access",
         "content": "Claude API access requires an Anthropic account and API key from console.anthropic.com. Rate limits depend on tier. Contact sales for enterprise access."},
        {"id": "claude_002", "source": "Claude", "title": "Claude Pro",
         "content": "Claude Pro is $20/month with higher usage limits and priority access. Cancel anytime at claude.ai/settings/billing. Refunds are not guaranteed."},
        {"id": "claude_003", "source": "Claude", "title": "Rate Limiting",
         "content": "Claude has usage limits by tier. A 429 error means rate limit exceeded. Implement exponential backoff. Upgrading your tier increases limits."},
        {"id": "visa_001", "source": "Visa", "title": "Card Declined",
         "content": "Contact your issuing bank if your Visa card is declined. Visa does not manage individual card accounts. Common causes: insufficient funds, wrong PIN, expired card."},
        {"id": "visa_002", "source": "Visa", "title": "Unauthorized Transactions",
         "content": "Report unauthorized Visa transactions to your bank immediately. Visa's Zero Liability Policy protects you. Never share your card number or PIN."},
        {"id": "visa_003", "source": "Visa", "title": "Dispute a Transaction",
         "content": "To dispute a Visa transaction, contact your issuing bank. File within 120 days. Resolution takes 30 to 90 days. Your bank may issue provisional credit."},
    ]
