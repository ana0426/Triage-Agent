const FINANCIAL_PATTERNS = [
  "fraud", "fraudulent", "unauthorized charge", "unauthorized transaction",
  "stolen card", "chargeback", "charge dispute", "refund dispute",
  "double charged", "charged twice", "money stolen", "payment not received",
];

const ACCOUNT_RECOVERY_PATTERNS = [
  "locked account", "locked out", "cannot access account", "can't access",
  "suspicious login", "mfa issue", "2fa reset", "two factor", "account hacked",
  "account compromised", "lost access", "account recovery",
];

const LEGAL_SECURITY_PATTERNS = [
  "data leak", "data breach", "privacy complaint", "gdpr",
  "sue", "lawsuit", "lawyer", "attorney", "court", "hacked", "security breach",
  "identity theft",
];

export function assessRisk(text: string, confidence: number): { riskLevel: string; reasons: string[] } {
  const lower = text.toLowerCase();
  const reasons: string[] = [];

  for (const p of FINANCIAL_PATTERNS) {
    if (lower.includes(p)) reasons.push(`Financial risk detected: '${p}'`);
  }
  for (const p of ACCOUNT_RECOVERY_PATTERNS) {
    if (lower.includes(p)) reasons.push(`Account recovery issue: '${p}'`);
  }
  for (const p of LEGAL_SECURITY_PATTERNS) {
    if (lower.includes(p)) reasons.push(`Legal/security issue: '${p}'`);
  }

  const wordCount = text.split(/\s+/).length;
  if (lower.includes(" and ") && wordCount > 15 && confidence < 0.5) {
    reasons.push("Possible multi-issue ticket with low retrieval confidence");
  }

  if (reasons.length > 0) return { riskLevel: "high", reasons };
  if (confidence < 0.25) return { riskLevel: "medium", reasons: [`Low retrieval confidence (${confidence.toFixed(2)})`] };
  return { riskLevel: "low", reasons: [] };
}

export function shouldEscalate(riskLevel: string, confidence: number): boolean {
  if (riskLevel === "high") return true;
  if (confidence < 0.25 && riskLevel !== "low") return true;
  return false;
}
