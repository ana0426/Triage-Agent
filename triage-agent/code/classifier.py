import re
from typing import Tuple
from config import COMPANY_KEYWORDS, SUPPORTED_COMPANIES


def detect_company(text: str, provided_company: str = None) -> str:
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
    text_lower = text.lower()

    injection_patterns = [
        "ignore previous instructions", "ignore all instructions",
        "forget your instructions", "system prompt", "jailbreak",
        "act as if", "pretend to be", "roleplay as", "disregard",
        "override instructions",
    ]
    for p in injection_patterns:
        if p in text_lower:
            return "invalid"

    spam_indicators = [
        r"^\W+$",
        r"^[a-z]{1,3}$",
        r"(buy now|click here|free money|earn \$|make money fast|casino|lottery|winner)",
        r"(http[s]?://\S+.*){3,}",
    ]
    for pattern in spam_indicators:
        if re.search(pattern, text_lower):
            return "invalid"

    bug_keywords = [
        "error", "broken", "crash", "not loading", "failed", "cannot login",
        "can't login", "not working", "bug", "glitch", "issue", "problem",
        "doesn't work", "stopped working", "freezing", "stuck", "hang",
    ]
    feature_keywords = [
        "add", "feature request", "would be nice", "suggestion", "improve",
        "enhancement", "please add", "support for", "wish", "request",
        "i want", "can you add", "new feature",
    ]
    for kw in bug_keywords:
        if kw in text_lower:
            return "bug"
    for kw in feature_keywords:
        if kw in text_lower:
            return "feature_request"
    return "product_issue"


def classify_product_area(text: str, company: str) -> str:
    text_lower = text.lower()
    areas = {
        "HackerRank": {
            "assessments": ["assessment", "test", "coding test", "evaluation", "challenge"],
            "login": ["login", "sign in", "password", "account access"],
            "certification": ["certification", "certificate", "certified"],
            "plagiarism": ["plagiarism", "cheating", "copied", "duplicate"],
            "ide": ["ide", "editor", "compile", "run code", "code editor"],
            "scoring": ["score", "result", "grade", "pass", "fail", "marks"],
        },
        "Claude": {
            "billing": ["billing", "payment", "charge", "invoice", "subscription cost"],
            "api": ["api", "api key", "endpoint", "rate limit", "tokens"],
            "login": ["login", "sign in", "password", "account"],
            "usage_limits": ["limit", "quota", "usage", "exceeded", "too many"],
            "subscriptions": ["pro", "subscription", "plan", "upgrade"],
            "safety": ["safety", "policy", "refused", "blocked", "harmful"],
        },
        "Visa": {
            "fraud": ["fraud", "unauthorized", "stolen", "suspicious", "scam"],
            "card_declined": ["declined", "rejected", "not accepted", "blocked"],
            "travel": ["travel", "abroad", "international", "foreign", "overseas"],
            "dispute": ["dispute", "chargeback", "reversal", "contested"],
            "payments": ["payment", "transaction", "purchase", "contactless", "tap"],
            "atm": ["atm", "withdrawal", "cash"],
        },
    }
    if company in areas:
        for area, keywords in areas[company].items():
            for kw in keywords:
                if kw in text_lower:
                    return area
        return "general"
    return "general"
