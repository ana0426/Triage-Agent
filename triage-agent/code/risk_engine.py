from typing import List, Tuple
from config import ESCALATION_KEYWORDS


FINANCIAL_PATTERNS = [
    "fraud", "fraudulent", "unauthorized charge", "unauthorized transaction",
    "stolen card", "chargeback", "charge dispute", "refund dispute",
    "double charged", "charged twice", "incorrect charge", "money stolen",
    "payment not received",
]

ACCOUNT_RECOVERY_PATTERNS = [
    "locked account", "locked out", "cannot access account", "can't access",
    "suspicious login", "mfa issue", "2fa reset", "two factor", "account hacked",
    "account compromised", "lost access", "account recovery",
]

LEGAL_SECURITY_PATTERNS = [
    "data leak", "data breach", "privacy complaint", "gdpr", "legal threat",
    "sue", "lawsuit", "lawyer", "attorney", "court", "hacked", "security breach",
    "identity theft", "stolen identity",
]

LOW_RISK_PATTERNS = [
    "how do i", "what is", "where can i", "when does", "is it possible",
    "how to", "can i", "do you have", "feature request", "suggestion",
]


def assess_risk(text: str, confidence: float) -> Tuple[str, List[str]]:
    text_lower = text.lower()
    reasons = []

    for pattern in FINANCIAL_PATTERNS:
        if pattern in text_lower:
            reasons.append(f"Financial risk detected: '{pattern}'")

    for pattern in ACCOUNT_RECOVERY_PATTERNS:
        if pattern in text_lower:
            reasons.append(f"Account recovery issue: '{pattern}'")

    for pattern in LEGAL_SECURITY_PATTERNS:
        if pattern in text_lower:
            reasons.append(f"Legal/security issue: '{pattern}'")

    word_count = len(text.split())
    has_and = " and " in text_lower
    has_also = " also " in text_lower
    potential_multi_issue = has_and and word_count > 15
    if potential_multi_issue and confidence < 0.5:
        reasons.append("Possible multi-issue ticket with low retrieval confidence")

    if confidence < 0.25 and not reasons:
        reasons.append(f"Low retrieval confidence ({confidence:.2f}) - documentation may be insufficient")
        return "medium", reasons

    if reasons:
        return "high", reasons

    for pattern in LOW_RISK_PATTERNS:
        if text_lower.startswith(pattern) or pattern in text_lower:
            return "low", []

    return "medium", []


def should_escalate(risk_level: str, confidence: float, reasons: List[str]) -> bool:
    if risk_level == "high":
        return True
    if confidence < 0.25 and risk_level != "low":
        return True
    return False
