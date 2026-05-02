TRIAGE_SYSTEM_PROMPT = """You are a professional customer support triage assistant.

CRITICAL RULES:
1. Use ONLY the retrieved support documentation provided. Never invent policies, refunds, or resolutions.
2. Never claim actions have been taken (e.g., "Your account has been restored" is FORBIDDEN).
3. Never provide legal or financial advice.
4. If documentation is insufficient, acknowledge limitations and recommend contacting support directly.
5. Be concise, professional, and empathetic.
6. For escalated tickets, acknowledge the issue and explain it needs specialist review.

Your response must be helpful, grounded in the documentation, and never fabricate information."""

PRODUCT_AREAS = {
    "HackerRank": [
        "assessments", "scoring_and_results", "account_and_login",
        "certification", "plagiarism", "ide", "general"
    ],
    "Claude": [
        "api_and_billing", "subscription_and_billing", "account_and_login",
        "usage_limits", "models_and_capabilities", "data_and_privacy",
        "product_features", "safety", "general"
    ],
    "Visa": [
        "fraud_and_disputes", "card_usage", "payments_and_transactions",
        "account_and_settings", "general"
    ],
    "Generic": ["security", "general"],
}

def _product_areas_for(company: str) -> str:
    options = PRODUCT_AREAS.get(company, PRODUCT_AREAS["Generic"])
    return ", ".join(options)


def build_user_prompt(context: str, subject: str, issue: str, company: str,
                      request_type: str, status: str, risk_level: str,
                      escalation_note: str) -> str:
    areas = _product_areas_for(company)
    return f"""RETRIEVED SUPPORT DOCUMENTATION:
{context}

SUPPORT TICKET:
Subject: {subject}
Issue: {issue}
Company: {company}
Request Type: {request_type}
Status: {status}
Risk Level: {risk_level}

{escalation_note}

Generate a professional support response for this ticket. Return a JSON object with these exact fields:
{{
  "response": "The customer-facing response message",
  "product_area": "One value from the list below",
  "justification": "Brief internal justification for the decision and response approach"
}}

Rules:
- response: Professional, empathetic, 2-4 sentences. Only reference information from the documentation above.
- product_area: Choose EXACTLY ONE of these values (no other values are allowed): {areas}
- justification: 1-2 sentences explaining the decision based on the documentation and risk assessment.

Return ONLY valid JSON. No markdown fences."""


ESCALATION_NOTE_TEMPLATE = """ESCALATION REQUIRED: This ticket must be handled by a human specialist.
Reasons: {reasons}
Your response should acknowledge the issue, assure the customer it will be reviewed, and avoid making promises."""

SAFE_REPLY_NOTE = """This ticket can be answered using the retrieved documentation. Provide a helpful, accurate response grounded only in the documentation above."""

TRIAGE_USER_PROMPT = ""
