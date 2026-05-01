import os
from pathlib import Path

OPENAI_BASE_URL = os.getenv("AI_INTEGRATIONS_OPENAI_BASE_URL", "https://api.openai.com/v1")
OPENAI_API_KEY = os.getenv("AI_INTEGRATIONS_OPENAI_API_KEY", "")
LLM_MODEL = os.getenv("LLM_MODEL", "gpt-4o-mini")
MAX_TOKENS = 2048

CHUNK_SIZE = 500
CHUNK_OVERLAP = 50
TOP_K_RETRIEVAL = 5
CONFIDENCE_THRESHOLD = 0.25

SUPPORTED_COMPANIES = ["HackerRank", "Claude", "Visa", "Generic"]

REQUEST_TYPES = ["product_issue", "feature_request", "bug", "invalid"]

RISK_LEVELS = ["low", "medium", "high"]

ESCALATION_KEYWORDS = [
    "fraud", "fraudulent", "unauthorized", "stolen", "chargeback",
    "dispute", "legal", "lawyer", "sue", "lawsuit",
    "data leak", "hack", "hacked", "security breach", "identity theft",
    "locked account", "cannot access account", "account recovery",
    "suspicious login", "mfa", "two factor", "2fa reset",
    "privacy complaint", "gdpr", "double charged", "charged twice",
    "payment not received", "money stolen", "emergency", "stranded",
    "urgent", "critical", "immediately",
]

COMPANY_KEYWORDS = {
    "HackerRank": [
        "hackerrank", "assessment", "coding test", "hiring", "plagiarism",
        "ide", "proctoring", "certification", "interview", "candidate",
        "recruiter", "test case", "submission", "score", "proctortrack",
    ],
    "Claude": [
        "claude", "anthropic", "claude.ai", "claude api", "usage limit",
        "subscription", "pro plan", "claude model", "context window",
        "claude pro", "claude free",
    ],
    "Visa": [
        "visa", "card", "credit card", "debit card", "transaction",
        "payment", "atm", "merchant", "pin", "international", "travel",
        "declined", "blocked card", "contactless", "chargeback",
    ],
}

_AGENT_DIR = Path(__file__).parent.parent

DATA_DIR = _AGENT_DIR / "data"
OUTPUT_CSV = _AGENT_DIR / "support_tickets" / "output.csv"
INPUT_CSV = _AGENT_DIR / "support_tickets" / "support_tickets.csv"

LOG_FILE = Path.home() / "hackerrank_orchestrate" / "log.txt"
