import json
import os
import re
from pathlib import Path
from typing import List, Dict
from config import CHUNK_SIZE, CHUNK_OVERLAP

CORPUS_FILE = os.path.join(os.path.dirname(__file__), "..", "data", "corpus.json")


def get_default_corpus() -> List[Dict]:
    return [
        # HackerRank corpus
        {
            "id": "hr_001",
            "source": "HackerRank",
            "title": "Assessment Not Loading",
            "content": "If your HackerRank assessment is not loading, try clearing browser cache, using a different browser (Chrome recommended), or disabling browser extensions. Ensure you have a stable internet connection. If the issue persists, contact your recruiter for a time extension."
        },
        {
            "id": "hr_002",
            "source": "HackerRank",
            "title": "Login Issues",
            "content": "If you cannot log in to HackerRank, reset your password via the 'Forgot Password' link. Ensure you're using the correct email. If you see 'Account Locked', contact HackerRank support with your registered email. SSO users should contact their company admin."
        },
        {
            "id": "hr_003",
            "source": "HackerRank",
            "title": "Plagiarism Detection",
            "content": "HackerRank uses automated plagiarism detection. If you believe a plagiarism flag is incorrect, your recruiter or hiring team can request a manual review. HackerRank support does not override recruiter decisions. Contact the hiring company directly."
        },
        {
            "id": "hr_004",
            "source": "HackerRank",
            "title": "Test Scoring and Results",
            "content": "Test scores are calculated based on correct test cases, time complexity, and submission time. Scores are final unless a technical issue is reported within 24 hours. Recruiters control score visibility. HackerRank support cannot modify scores."
        },
        {
            "id": "hr_005",
            "source": "HackerRank",
            "title": "IDE Issues",
            "content": "HackerRank's online IDE supports multiple languages. If your code is not compiling, verify the language version selected. IDE timeout issues may occur due to infinite loops or heavy computation. Use the 'Run Code' button to test before 'Submit'."
        },
        {
            "id": "hr_006",
            "source": "HackerRank",
            "title": "Proctoring and Recording",
            "content": "HackerRank ProctorTrack records your session via webcam during proctored assessments. Ensure camera permissions are enabled. If proctoring fails to start, use a supported browser (Chrome or Firefox). Contact your recruiter if proctoring blocks your assessment."
        },
        {
            "id": "hr_007",
            "source": "HackerRank",
            "title": "Certification Programs",
            "content": "HackerRank certifications are available for various skills. You can retake certification tests after a waiting period. Certificates are issued automatically upon passing. For certificate verification, share your HackerRank profile URL with employers."
        },

        # Claude corpus
        {
            "id": "claude_001",
            "source": "Claude",
            "title": "Claude API Access",
            "content": "Claude API access requires an Anthropic account and API key. API keys are available at console.anthropic.com. Rate limits depend on your usage tier. For enterprise access or higher rate limits, contact Anthropic sales."
        },
        {
            "id": "claude_002",
            "source": "Claude",
            "title": "Claude Pro Subscription",
            "content": "Claude Pro provides higher usage limits and priority access. Subscribe at claude.ai/upgrade. Pro billing is monthly and can be cancelled anytime. Refunds for unused subscription periods are not guaranteed and depend on Anthropic's billing policy."
        },
        {
            "id": "claude_003",
            "source": "Claude",
            "title": "Usage Limits and Rate Limiting",
            "content": "Claude has usage limits based on your subscription tier. Free users have limited daily messages. Pro users have higher limits but may still hit caps during peak times. If you exceed limits, you'll need to wait or upgrade your plan."
        },
        {
            "id": "claude_004",
            "source": "Claude",
            "title": "Login and Account Access",
            "content": "To log in to Claude, visit claude.ai and use your registered email. If you cannot log in, use 'Forgot Password' to reset. Google or Apple sign-in users should use the same provider they registered with. Account lockouts require contacting Anthropic support."
        },
        {
            "id": "claude_005",
            "source": "Claude",
            "title": "Data Privacy and Safety",
            "content": "Anthropic takes privacy seriously. By default, conversations may be used to improve Claude. You can opt out of data training in settings. For GDPR data deletion requests, contact privacy@anthropic.com. Claude is designed with safety guidelines that prevent harmful outputs."
        },
        {
            "id": "claude_006",
            "source": "Claude",
            "title": "Claude API Billing",
            "content": "API usage is billed per token (input + output). View usage and invoices at console.anthropic.com/billing. For billing disputes or unexpected charges, contact Anthropic support with your account email and the specific charge details."
        },
        {
            "id": "claude_007",
            "source": "Claude",
            "title": "Context Window and Model Capabilities",
            "content": "Claude models have varying context windows. Claude 3.5 Sonnet supports 200K tokens. Longer contexts cost more tokens. If your conversation is truncated, it means the context window was exceeded. Start a new conversation for fresh context."
        },

        # Visa corpus
        {
            "id": "visa_001",
            "source": "Visa",
            "title": "Card Declined",
            "content": "If your Visa card is declined, check with your issuing bank as Visa does not directly manage card accounts. Common causes include insufficient funds, incorrect PIN, expired card, or merchant restrictions. Contact your card-issuing bank's customer service number on the back of your card."
        },
        {
            "id": "visa_002",
            "source": "Visa",
            "title": "Card Blocked While Traveling",
            "content": "Visa cards may be blocked for international transactions as a fraud prevention measure. Notify your issuing bank before traveling. Use Visa's global customer assistance at 1-800-847-2911. Your bank can unblock international usage. Always keep your bank's contact number handy when traveling."
        },
        {
            "id": "visa_003",
            "source": "Visa",
            "title": "Dispute a Transaction",
            "content": "To dispute a Visa transaction, contact your issuing bank directly. Visa's dispute resolution process (Visa Resolve Online) is managed by banks. Gather your receipt and transaction details. File the dispute within 120 days of the transaction. Your bank will investigate and may provide provisional credit."
        },
        {
            "id": "visa_004",
            "source": "Visa",
            "title": "Fraud and Unauthorized Transactions",
            "content": "Report unauthorized Visa transactions to your issuing bank immediately. Visa's Zero Liability Policy protects you from unauthorized charges on Visa cards (subject to your bank's terms). Call your bank's fraud hotline. Do not share your card number or PIN with anyone."
        },
        {
            "id": "visa_005",
            "source": "Visa",
            "title": "Contactless Payments",
            "content": "Visa contactless payments use NFC technology. Tap your card or device on the payment terminal. Limits apply to contactless transactions (varies by country and bank). If contactless is not working, insert the chip or swipe. Contact your bank to enable/disable contactless."
        },
        {
            "id": "visa_006",
            "source": "Visa",
            "title": "Chargeback Process",
            "content": "A chargeback reverses a transaction and is initiated through your bank. Valid chargeback reasons include: item not received, item not as described, unauthorized transaction, merchant didn't process a return. Contact your issuing bank with evidence. Chargebacks can take 30-90 days to resolve."
        },
        {
            "id": "visa_007",
            "source": "Visa",
            "title": "Online and International Payments",
            "content": "For online purchases, Visa Secure (3D Secure) adds extra verification. International transactions may have foreign transaction fees set by your bank. Currency conversion uses Visa's exchange rate. For issues with specific merchants, contact your bank or the merchant directly."
        },
        {
            "id": "visa_008",
            "source": "Visa",
            "title": "ATM Withdrawals",
            "content": "Visa cards work at ATMs worldwide through the Visa/Plus network. For ATM issues abroad, contact your bank. Daily withdrawal limits are set by your bank. If an ATM takes your card, contact your bank immediately. ATM fees are set by the ATM operator, not Visa."
        },
    ]


def load_corpus() -> List[Dict]:
    if os.path.exists(CORPUS_FILE):
        with open(CORPUS_FILE, "r") as f:
            data = json.load(f)
            if data:
                return data
    corpus = get_default_corpus()
    save_corpus(corpus)
    return corpus


def save_corpus(corpus: List[Dict]):
    Path(CORPUS_FILE).parent.mkdir(parents=True, exist_ok=True)
    with open(CORPUS_FILE, "w") as f:
        json.dump(corpus, f, indent=2)


def add_document(source: str, title: str, content: str, url: str = None) -> str:
    corpus = load_corpus()
    doc_id = f"custom_{len(corpus):04d}"
    corpus.append({
        "id": doc_id,
        "source": source,
        "title": title,
        "content": content,
        "url": url
    })
    save_corpus(corpus)
    return doc_id


def chunk_documents(corpus: List[Dict]) -> List[Dict]:
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
                chunk_words = words[i:i + CHUNK_SIZE]
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
