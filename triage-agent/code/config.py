import os

OPENAI_BASE_URL = os.getenv("AI_INTEGRATIONS_OPENAI_BASE_URL", "https://api.openai.com/v1")
OPENAI_API_KEY = os.getenv("AI_INTEGRATIONS_OPENAI_API_KEY", "")
LLM_MODEL = "gpt-5-mini"
MAX_TOKENS = 8192

CHUNK_SIZE = 500
CHUNK_OVERLAP = 50
TOP_K_RETRIEVAL = 5
CONFIDENCE_THRESHOLD = 0.30

SUPPORTED_COMPANIES = ["HackerRank", "Claude", "Visa", "Generic"]

REQUEST_TYPES = ["product_issue", "feature_request", "bug", "invalid"]

RISK_LEVELS = ["low", "medium", "high"]

ESCALATION_KEYWORDS = [
    "fraud", "fraudulent", "unauthorized", "stolen", "chargeback",
    "dispute", "refund dispute", "legal", "lawyer", "sue", "lawsuit",
    "data leak", "hack", "hacked", "security breach", "identity theft",
    "locked account", "cannot access account", "account recovery",
    "suspicious login", "mfa", "two factor", "2fa reset",
    "privacy complaint", "gdpr", "my money", "charge back",
    "double charged", "charged twice", "payment not received",
]

COMPANY_KEYWORDS = {
    "HackerRank": [
        "hackerrank", "assessment", "coding test", "hiring", "plagiarism",
        "ide", "proctoring", "certification", "interview", "candidate",
        "recruiter", "test case", "submission", "score"
    ],
    "Claude": [
        "claude", "anthropic", "claude.ai", "claude api", "usage limit",
        "subscription", "pro plan", "claude model", "context window"
    ],
    "Visa": [
        "visa", "card", "credit card", "debit card", "transaction",
        "payment", "atm", "merchant", "pin", "international", "travel",
        "declined", "blocked card", "contactless"
    ]
}

LOG_FILE = os.path.join(os.path.dirname(__file__), "..", "logs", "log.txt")
OUTPUT_CSV = os.path.join(os.path.dirname(__file__), "..", "support_issues", "output.csv")
