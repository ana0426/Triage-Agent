const COMPANY_KEYWORDS: Record<string, string[]> = {
  HackerRank: ["hackerrank", "assessment", "coding test", "hiring", "plagiarism", "ide", "proctoring", "certification", "interview", "candidate", "recruiter", "test case", "submission"],
  Claude: ["claude", "anthropic", "claude.ai", "claude api", "usage limit", "subscription", "pro plan", "claude model", "context window"],
  Visa: ["visa", "card", "credit card", "debit card", "transaction", "payment", "atm", "merchant", "pin", "international", "travel", "declined", "blocked card", "contactless"],
};

export function detectCompany(text: string, provided?: string): string {
  if (provided?.trim()) {
    const norm = provided.trim();
    for (const company of Object.keys(COMPANY_KEYWORDS)) {
      if (company.toLowerCase() === norm.toLowerCase()) return company;
    }
  }
  const lower = text.toLowerCase();
  const scores: Record<string, number> = {};
  for (const [company, keywords] of Object.entries(COMPANY_KEYWORDS)) {
    scores[company] = keywords.filter((kw) => lower.includes(kw)).length;
  }
  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return best && best[1] > 0 ? best[0] : "Generic";
}

export function classifyRequestType(text: string): string {
  const lower = text.toLowerCase();
  const injectionPatterns = ["ignore previous instructions", "ignore all instructions", "forget your instructions", "system prompt", "jailbreak", "act as if", "pretend to be", "roleplay as"];
  if (injectionPatterns.some((p) => lower.includes(p))) return "invalid";

  const bugKeywords = ["error", "broken", "crash", "not loading", "failed", "cannot login", "can't login", "not working", "bug", "glitch", "issue", "problem", "doesn't work", "stopped working", "freezing", "stuck"];
  const featureKeywords = ["add", "feature request", "would be nice", "suggestion", "improve", "enhancement", "please add", "support for", "wish", "request", "can you add", "new feature"];

  if (bugKeywords.some((kw) => lower.includes(kw))) return "bug";
  if (featureKeywords.some((kw) => lower.includes(kw))) return "feature_request";
  return "product_issue";
}

export function classifyProductArea(text: string, company: string): string {
  const lower = text.toLowerCase();
  const areas: Record<string, Record<string, string[]>> = {
    HackerRank: {
      assessments: ["assessment", "test", "coding test", "evaluation", "challenge"],
      login: ["login", "sign in", "password", "account access"],
      certification: ["certification", "certificate", "certified"],
      plagiarism: ["plagiarism", "cheating", "copied", "duplicate"],
      ide: ["ide", "editor", "compile", "run code", "code editor"],
      scoring: ["score", "result", "grade", "pass", "fail", "marks"],
    },
    Claude: {
      billing: ["billing", "payment", "charge", "invoice", "subscription cost"],
      api: ["api", "api key", "endpoint", "rate limit", "tokens"],
      login: ["login", "sign in", "password", "account"],
      usage_limits: ["limit", "quota", "usage", "exceeded", "too many"],
      subscriptions: ["pro", "subscription", "plan", "upgrade"],
      safety: ["safety", "policy", "refused", "blocked", "harmful"],
    },
    Visa: {
      fraud: ["fraud", "unauthorized", "stolen", "suspicious", "scam"],
      card_declined: ["declined", "rejected", "not accepted", "blocked"],
      travel: ["travel", "abroad", "international", "foreign", "overseas"],
      dispute: ["dispute", "chargeback", "reversal", "contested"],
      payments: ["payment", "transaction", "purchase", "contactless", "tap"],
      atm: ["atm", "withdrawal", "cash"],
    },
  };

  if (company in areas) {
    for (const [area, keywords] of Object.entries(areas[company])) {
      if (keywords.some((kw) => lower.includes(kw))) return area;
    }
  }
  return "general";
}
