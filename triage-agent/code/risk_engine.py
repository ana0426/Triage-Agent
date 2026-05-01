"""
Risk engine: assess ticket risk level and determine whether to escalate.
"""
from typing import List, Tuple
from config import ESCALATION_KEYWORDS


FINANCIAL_PATTERNS = [
    "fraud", "fraudulent", "unauthorized charge", "unauthorized transaction",
    "stolen card", "chargeback", "charge dispute", "refund dispute",
    "double charged", "charged twice", "incorrect charge", "money stolen",
    "payment not received", "suspicious charge", "suspicious transaction",
    "never visited", "never made this", "didn't make this", "did not make",
    "i did not authorize", "not authoriz", "i want this reversed",
    "charge i do not recogni", "charge i don't recogni",
    "unknown charge", "unrecognized charge", "$",  # any dollar amount is financial
    "stranded", "emergency cash", "no working card",
]

ACCOUNT_RECOVERY_PATTERNS = [
    "locked account", "locked out", "cannot access account", "can't access",
    "suspicious login", "mfa issue", "2fa reset", "two factor", "account hacked",
    "account compromised", "lost access", "account recovery",
    "password reset email", "reset email not arri", "not receiving",
]

LEGAL_SECURITY_PATTERNS = [
    "data leak", "data breach", "privacy complaint", "gdpr", "legal threat",
    "sue", "lawsuit", "lawyer", "attorney", "court", "hacked", "security breach",
    "identity theft", "stolen identity", "malware", "keylogger", "virus",
    "write a virus", "write malware", "write a keylogger",
]

LOW_RISK_PATTERNS = [
    "how do i", "what is", "where can i", "when does", "is it possible",
    "how to", "can i", "do you have", "feature request", "suggestion",
    "would like to see", "would love to see",
]

HARMFUL_REQUEST_PATTERNS = [
    r"write (a |an )?(malware|keylogger|virus|ransomware|trojan|backdoor|spyware)",
    r"help me (hack|steal|phish|scam)",
    r"(create|build|make) (a |an )?(weapon|bomb|exploit|rootkit)",
]


def assess_risk(text: str, confidence: float) -> Tuple[str, List[str]]:
    import re
    text_lower = text.lower()
    reasons = []

    for pattern in HARMFUL_REQUEST_PATTERNS:
        if re.search(pattern, text_lower):
            reasons.append(f"Potentially harmful/malicious request detected")
            return "high", reasons

    for pattern in FINANCIAL_PATTERNS:
        if pattern.startswith("$") or len(pattern) <= 3:
            import re as _re
            if _re.search(r'\$\s*\d', text_lower):
                reasons.append("Financial amount mentioned — potential billing or fraud issue")
                break
        elif pattern in text_lower:
            reasons.append(f"Financial risk indicator: '{pattern}'")

    for pattern in ACCOUNT_RECOVERY_PATTERNS:
        if pattern in text_lower:
            reasons.append(f"Account security issue: '{pattern}'")

    for pattern in LEGAL_SECURITY_PATTERNS:
        if pattern in text_lower:
            reasons.append(f"Legal/security issue: '{pattern}'")

    if confidence < 0.25 and not reasons:
        reasons.append(f"Low retrieval confidence ({confidence:.2f})")
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
    if confidence < CONFIDENCE_THRESHOLD and risk_level != "low":
        return True
    return False


try:
    from config import CONFIDENCE_THRESHOLD
except ImportError:
    CONFIDENCE_THRESHOLD = 0.25
