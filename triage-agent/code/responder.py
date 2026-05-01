import json
from typing import List, Dict, Tuple
from openai import OpenAI
from config import OPENAI_BASE_URL, OPENAI_API_KEY, LLM_MODEL, MAX_TOKENS
from prompts import (
    TRIAGE_SYSTEM_PROMPT,
    TRIAGE_USER_PROMPT,
    ESCALATION_NOTE_TEMPLATE,
    SAFE_REPLY_NOTE
)


def build_context(retrieved_docs: List[Dict]) -> str:
    if not retrieved_docs:
        return "No relevant documentation found."
    parts = []
    for i, doc in enumerate(retrieved_docs, 1):
        parts.append(
            f"[Doc {i}] Source: {doc['source']} | Title: {doc['title']}\n{doc['text']}"
        )
    return "\n\n---\n\n".join(parts)


def generate_response(
    subject: str,
    issue: str,
    company: str,
    request_type: str,
    status: str,
    risk_level: str,
    retrieved_docs: List[Dict],
    escalation_reasons: List[str],
) -> Tuple[str, str, str]:
    context = build_context(retrieved_docs)

    escalation_note = ""
    if status == "escalated" and escalation_reasons:
        escalation_note = ESCALATION_NOTE_TEMPLATE.format(
            reasons="; ".join(escalation_reasons)
        )
    else:
        escalation_note = SAFE_REPLY_NOTE

    user_prompt = TRIAGE_USER_PROMPT.format(
        context=context,
        subject=subject,
        issue=issue,
        company=company,
        request_type=request_type,
        status=status,
        risk_level=risk_level,
        escalation_note=escalation_note
    )

    try:
        client = OpenAI(
            base_url=OPENAI_BASE_URL,
            api_key=OPENAI_API_KEY,
        )
        completion = client.chat.completions.create(
            model=LLM_MODEL,
            max_completion_tokens=MAX_TOKENS,
            messages=[
                {"role": "system", "content": TRIAGE_SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt},
            ],
        )
        content = completion.choices[0].message.content.strip()

        if content.startswith("```"):
            lines = content.split("\n")
            content = "\n".join(lines[1:-1] if lines[-1] == "```" else lines[1:])

        parsed = json.loads(content)
        return (
            parsed.get("response", "Your request has been received."),
            parsed.get("product_area", "general"),
            parsed.get("justification", "Based on retrieved documentation.")
        )
    except json.JSONDecodeError:
        response = content if content else "Your request has been received and is being reviewed."
        return response, "general", "Response generated from documentation."
    except Exception as e:
        if status == "escalated":
            return (
                "Your request requires specialist attention. A member of our support team will review your case and contact you shortly.",
                "general",
                f"LLM error - safe escalation fallback used. Error: {str(e)}"
            )
        return (
            "Thank you for contacting support. We have received your request and will respond as soon as possible.",
            "general",
            f"LLM error - generic reply used. Error: {str(e)}"
        )
