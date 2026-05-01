"""
Classifier: company detection, request-type, and product-area classification.
Uses keyword rules for speed; the LLM layer refines product_area and justification.
"""
import re
from typing import Tuple
from config import COMPANY_KEYWORDS, SUPPORTED_COMPANIES


def detect_company(text: str, provided_company: str = None) -> str:
    """Return the canonical company name or 'Generic' if unknown."""
    if provided_company and provided_company.strip():
        normalized = provided_company.strip()
        for company in SUPPORTED_COMPANIES:
            if company.lower() == normalized.lower():
                return company
    text_lower = text.lower()
    scores = {company: 0 for company in COMPANY_KEYWORDS}
    for company, keywords in COMPANY_KEYWORDS.items():
        for kw in keywords:
            if kw in text_lower:
                scores[company] += 1
    best_company = max(scores, key=lambda c: scores[c])
    if scores[best_company] > 0:
        return best_company
    return "Generic"


def classify_request_type(text: str) -> str:
    """
    Classify into: product_issue | feature_request | bug | invalid.

    Priority order:
      1. invalid  (injection / spam)
      2. bug      (clear malfunction keywords)
      3. feature_request  (explicit new-feature ask — must match tightly)
      4. product_issue    (default for anything substantive)
    """
    text_lower = text.lower()

    injection_patterns = [
        "ignore previous instructions", "ignore all instructions",
        "forget your instructions", "system prompt", "jailbreak",
        "act as if", "pretend to be", "roleplay as", "disregard",
        "override instructions", "tell me your prompt", "tell me your rules",
    ]
    for p in injection_patterns:
        if p in text_lower:
            return "invalid"

    spam_patterns = [
        r"^\W+$",
        r"^[a-z]{1,3}$",
        r"(buy now|click here|free money|earn \$|make money fast|casino|lottery|winner)",
        r"(http[s]?://\S+.*){3,}",
    ]
    for pattern in spam_patterns:
        if re.search(pattern, text_lower):
            return "invalid"

    bug_keywords = [
        "error", "broken", "crash", "not loading", "failed", "cannot login",
        "can't login", "not working", "bug", "glitch", "issue with", "problem with",
        "doesn't work", "stopped working", "freezing", "stuck", "hang",
        "won't load", "keeps failing", "fails to", "not initializ",
        "not launching", "not responding", "unresponsive",
    ]
    for kw in bug_keywords:
        if kw in text_lower:
            return "bug"

    feature_keywords = [
        r"\bfeature request\b",
        r"\bwould (love|like) to see\b",
        r"\bplease add\b",
        r"\bcan you add\b",
        r"\bnew feature\b",
        r"\bwish (you had|there was)\b",
        r"\badd (a |an |the )?dark mode\b",
        r"\badd (support for|the ability to)\b",
        r"\benhancement\b",
        r"\bsuggestion\b",
    ]
    for pattern in feature_keywords:
        if re.search(pattern, text_lower):
            return "feature_request"

    return "product_issue"


def classify_product_area(text: str, company: str) -> str:
    """Return the most relevant product area for the given company."""
    text_lower = text.lower()
    areas = {
        "HackerRank": {
            "assessments": ["assessment", "test", "coding test", "evaluation", "challenge",
                            "proctortrack", "proctor", "proctoring", "webcam", "screen share"],
            "scoring_and_results": ["score", "result", "grade", "pass", "fail", "marks",
                                    "percentage", "correct", "wrong answer"],
            "account_and_login": ["login", "sign in", "password", "account access",
                                  "locked out", "reset", "cannot access"],
            "certification": ["certification", "certificate", "certified"],
            "plagiarism": ["plagiarism", "cheating", "copied", "duplicate", "flag"],
            "ide": ["ide", "editor", "compile", "run code", "code editor", "compile"],
        },
        "Claude": {
            "api_and_billing": ["api", "api key", "endpoint", "rate limit", "tokens",
                                "429", "529", "overloaded", "billing", "invoice",
                                "charged", "charge", "subscription cost"],
            "subscription_and_billing": ["pro", "subscription", "plan", "upgrade",
                                         "cancel", "refund", "charged twice", "double charge"],
            "account_and_login": ["login", "sign in", "password", "account", "locked out",
                                  "cannot access", "recovery"],
            "usage_limits": ["limit", "quota", "usage", "exceeded", "too many",
                             "daily limit", "message limit"],
            "models_and_capabilities": ["model", "context", "window", "tokens", "haiku",
                                        "sonnet", "opus", "capability", "feature"],
            "data_and_privacy": ["privacy", "data", "training", "gdpr", "delete", "opt out"],
            "product_features": ["dark mode", "feature", "suggestion", "search",
                                 "conversation", "history", "browse", "internet"],
        },
        "Visa": {
            "fraud_and_disputes": ["fraud", "unauthorized", "stolen", "suspicious",
                                   "scam", "chargeback", "dispute", "reversal",
                                   "not authorized", "never visited", "didn't make"],
            "card_usage": ["declined", "rejected", "not accepted", "blocked", "not working",
                           "travel", "abroad", "international", "foreign", "overseas",
                           "stranded", "emergency", "atm", "withdrawal", "cash",
                           "contactless", "tap", "swallowed"],
            "payments_and_transactions": ["payment", "transaction", "purchase",
                                          "double charge", "charged twice",
                                          "wrong amount", "wrong currency", "conversion"],
            "account_and_settings": ["limit", "credit limit", "pin", "settings",
                                     "unblock", "activate"],
        },
    }
    if company in areas:
        for area, keywords in areas[company].items():
            for kw in keywords:
                if kw in text_lower:
                    return area
    return "general"
