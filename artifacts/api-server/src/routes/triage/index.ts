import { Router } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";
import fs from "fs";
import path from "path";
import os from "os";
import { getAllDocuments, addDocument, chunkDocuments } from "./corpus.js";
import { retrieve } from "./retrieval.js";
import { detectCompany, classifyRequestType, classifyProductArea } from "./classifier.js";
import { assessRisk, shouldEscalate } from "./risk-engine.js";

const router = Router();

// ─── File paths written by the Python agent ───────────────────────────────────
const WORKSPACE_ROOT = path.resolve(process.cwd(), "../..");
const OUTPUT_JSON = path.join(WORKSPACE_ROOT, "triage-agent/support_tickets/output_full.json");
const LOG_FILE = path.join(os.homedir(), "hackerrank_orchestrate/log.txt");
const TRIAGE_RUN_FILE = path.join(os.homedir(), "hackerrank_orchestrate/triage_run.txt");

// ─── Shared types ──────────────────────────────────────────────────────────────
interface TriageResult {
  id: string;
  subject: string;
  issue: string;
  company: string;
  status: "replied" | "escalated";
  product_area: string;
  request_type: "product_issue" | "feature_request" | "bug" | "invalid";
  response: string;
  justification: string;
  confidence: number;
  risk_level: "low" | "medium" | "high";
  retrieved_docs: string[];
  processed_at: string;
}

interface LogEntry {
  ticket_id: string;
  company: string;
  request_type: string;
  risk_level: string;
  status: string;
  confidence: number;
  retrieved_docs: string[];
  timestamp: string;
}

// ─── In-memory store (used only for web-triggered runs, not Python runs) ──────
const resultStore: TriageResult[] = [];
const logStore: LogEntry[] = [];
let inMemoryLogText = "";

// ─── File reader helpers ───────────────────────────────────────────────────────

function readResultsFromFile(): TriageResult[] {
  try {
    if (fs.existsSync(OUTPUT_JSON)) {
      const raw = fs.readFileSync(OUTPUT_JSON, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed as TriageResult[];
    }
  } catch {
    // fall through to in-memory
  }
  return [];
}

function readLogFromFile(): string {
  try {
    if (fs.existsSync(LOG_FILE)) {
      return fs.readFileSync(LOG_FILE, "utf-8");
    }
  } catch {
    // fall through
  }
  if (fs.existsSync(TRIAGE_RUN_FILE)) {
    try {
      return fs.readFileSync(TRIAGE_RUN_FILE, "utf-8");
    } catch {
      // fall through
    }
  }
  return inMemoryLogText;
}

function getMergedResults(): TriageResult[] {
  const fileResults = readResultsFromFile();
  if (fileResults.length > 0) return fileResults;
  return resultStore;
}

// ─── Logging helpers ──────────────────────────────────────────────────────────

function appendLog(result: TriageResult, reasons: string[]) {
  const ts = new Date().toISOString();
  const entry =
    `\n${"=".repeat(60)}\nTICKET #${result.id}  [${ts}]\n` +
    `Company:       ${result.company}\n` +
    `Request Type:  ${result.request_type}\n` +
    `Risk Level:    ${result.risk_level.toUpperCase()}\n` +
    `Confidence:    ${result.confidence.toFixed(2)}\n` +
    `Retrieved Docs:\n${result.retrieved_docs.map((d) => `  - ${d}`).join("\n")}\n` +
    `Decision:      ${result.status.toUpperCase()}\n` +
    `Product Area:  ${result.product_area}\n` +
    `Justification: ${result.justification}\n` +
    `${"=".repeat(60)}\n`;
  inMemoryLogText += entry;
  logStore.push({
    ticket_id: result.id,
    company: result.company,
    request_type: result.request_type,
    risk_level: result.risk_level,
    status: result.status,
    confidence: result.confidence,
    retrieved_docs: result.retrieved_docs,
    timestamp: ts,
  });
}

// ─── LLM response generator ────────────────────────────────────────────────────

const PRODUCT_AREAS: Record<string, string[]> = {
  HackerRank: ["assessments", "scoring_and_results", "account_and_login", "certification", "plagiarism", "ide", "general"],
  Claude: ["api_and_billing", "subscription_and_billing", "account_and_login", "usage_limits", "models_and_capabilities", "data_and_privacy", "product_features", "safety", "general"],
  Visa: ["fraud_and_disputes", "card_usage", "payments_and_transactions", "account_and_settings", "general"],
  Generic: ["security", "general"],
};

async function generateLLMResponse(
  subject: string,
  issue: string,
  company: string,
  requestType: string,
  status: string,
  riskLevel: string,
  retrievedDocs: { chunk: { title: string; source: string; text: string }; score: number }[],
  escalationReasons: string[]
): Promise<{ response: string; product_area: string; justification: string }> {
  const context = retrievedDocs.length
    ? retrievedDocs.map((r, i) => `[Doc ${i + 1}] Source: ${r.chunk.source} | Title: ${r.chunk.title}\n${r.chunk.text}`).join("\n\n---\n\n")
    : "No relevant documentation found.";

  const areas = (PRODUCT_AREAS[company] ?? PRODUCT_AREAS["Generic"]).join(", ");

  const escalationNote =
    status === "escalated" && escalationReasons.length
      ? `ESCALATION REQUIRED: This ticket must be handled by a human specialist.\nReasons: ${escalationReasons.join("; ")}\nYour response should acknowledge the issue, assure the customer it will be reviewed, and avoid making promises.`
      : "This ticket can be answered using the retrieved documentation. Provide a helpful, accurate response grounded only in the documentation above.";

  const userPrompt =
    `RETRIEVED SUPPORT DOCUMENTATION:\n${context}\n\n` +
    `SUPPORT TICKET:\nSubject: ${subject}\nIssue: ${issue}\nCompany: ${company}\n` +
    `Request Type: ${requestType}\nStatus: ${status}\nRisk Level: ${riskLevel}\n\n` +
    `${escalationNote}\n\n` +
    `Generate a professional support response for this ticket. Return a JSON object with these exact fields:\n` +
    `{\n  "response": "The customer-facing response message",\n  "product_area": "One value from the list below",\n  "justification": "Brief internal justification"\n}\n\n` +
    `Rules:\n` +
    `- response: Professional, empathetic, 2-4 sentences. Only reference information from the documentation above.\n` +
    `- product_area: Choose EXACTLY ONE of these values (no other values allowed): ${areas}\n` +
    `- justification: 1-2 sentences explaining the decision.\n` +
    `Return ONLY valid JSON. No markdown fences.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_completion_tokens: 1024,
      messages: [
        {
          role: "system",
          content:
            "You are a professional customer support triage assistant. Use ONLY the retrieved support documentation. Never invent policies. Be concise and empathetic. Always respond with valid JSON only.",
        },
        { role: "user", content: userPrompt },
      ],
    });

    let content = completion.choices[0]?.message?.content?.trim() ?? "";
    if (content.startsWith("```")) {
      const lines = content.split("\n");
      content = lines.slice(1, lines[lines.length - 1] === "```" ? -1 : undefined).join("\n");
    }

    const parsed = JSON.parse(content);
    return {
      response: parsed.response ?? "Your request has been received.",
      product_area: parsed.product_area ?? "general",
      justification: parsed.justification ?? "Based on retrieved documentation.",
    };
  } catch {
    return {
      response: status === "escalated"
        ? "Your request requires specialist attention. A member of our support team will review your case and contact you shortly."
        : "Thank you for contacting support. We have received your request and will respond as soon as possible.",
      product_area: "general",
      justification: "Fallback used due to LLM error.",
    };
  }
}

// ─── Ticket processor (for web-triggered runs) ─────────────────────────────────

async function processTicket(ticket: {
  id: string;
  subject: string;
  issue: string;
  company?: string | null;
}): Promise<TriageResult> {
  const { id, subject, issue, company: providedCompany } = ticket;
  const fullText = `${subject} ${issue}`;

  const injectionPatterns = [
    "ignore previous instructions", "ignore all instructions",
    "forget your instructions", "system prompt", "jailbreak",
    "pretend to be", "roleplay as",
  ];
  const lower = fullText.toLowerCase();
  if (injectionPatterns.some((p) => lower.includes(p))) {
    const result: TriageResult = {
      id, subject, issue, company: "Generic",
      status: "replied", product_area: "security", request_type: "invalid",
      response: "Your message does not appear to be a valid support request. If you need assistance, please describe your issue clearly.",
      justification: "Prompt injection attempt detected. Request classified as invalid.",
      confidence: 1.0, risk_level: "low", retrieved_docs: [],
      processed_at: new Date().toISOString(),
    };
    appendLog(result, []);
    return result;
  }

  const requestType = classifyRequestType(fullText) as TriageResult["request_type"];
  if (requestType === "invalid") {
    const result: TriageResult = {
      id, subject, issue, company: detectCompany(fullText, providedCompany ?? undefined),
      status: "replied", product_area: "general", request_type: "invalid",
      response: "We were unable to identify a valid support request. Please resubmit with details about your issue.",
      justification: "Request classified as invalid based on content analysis.",
      confidence: 1.0, risk_level: "low", retrieved_docs: [],
      processed_at: new Date().toISOString(),
    };
    appendLog(result, []);
    return result;
  }

  const company = detectCompany(fullText, providedCompany ?? undefined);
  const docs = getAllDocuments();
  const chunks = chunkDocuments(docs);
  const { results: retrievedDocs, confidence } = retrieve(fullText, chunks, company, 5);

  const { riskLevel, reasons } = assessRisk(fullText, confidence);
  const escalate = shouldEscalate(riskLevel, confidence);
  const status: "replied" | "escalated" = escalate ? "escalated" : "replied";

  const { response, product_area, justification } = await generateLLMResponse(
    subject, issue, company, requestType, status, riskLevel, retrievedDocs, reasons
  );

  const finalProductArea =
    product_area && product_area !== "general"
      ? product_area
      : classifyProductArea(fullText, company);

  const result: TriageResult = {
    id, subject, issue, company, status,
    product_area: finalProductArea,
    request_type: requestType,
    response, justification,
    confidence: Math.round(confidence * 10000) / 10000,
    risk_level: riskLevel as "low" | "medium" | "high",
    retrieved_docs: retrievedDocs.map((r) => r.chunk.title),
    processed_at: new Date().toISOString(),
  };

  appendLog(result, reasons);
  return result;
}

// ─── Routes ───────────────────────────────────────────────────────────────────

router.post("/triage/process", async (req, res) => {
  const { tickets } = req.body as { tickets: { id: string; subject: string; issue: string; company?: string | null }[] };

  if (!tickets || !Array.isArray(tickets) || tickets.length === 0) {
    res.status(400).json({ error: "tickets array is required" });
    return;
  }

  try {
    inMemoryLogText = `=== Triage Agent Log - ${new Date().toISOString()} ===\n`;
    logStore.length = 0;
    resultStore.length = 0;

    const results: TriageResult[] = [];
    for (const ticket of tickets) {
      const result = await processTicket(ticket);
      results.push(result);
      resultStore.push(result);
    }

    res.json({ success: true, processed: results.length, results });
  } catch (err) {
    req.log.error({ err }, "Triage processing error");
    res.status(500).json({ error: "Processing failed", message: String(err) });
  }
});

router.get("/triage/results", (_req, res) => {
  const results = getMergedResults();
  res.json({ results, total: results.length });
});

router.get("/triage/logs", (_req, res) => {
  const logText = readLogFromFile();
  // Derive structured entries from the JSON sidecar when available
  let entries: LogEntry[] = logStore.length > 0 ? logStore : [];
  if (entries.length === 0) {
    const fileResults = readResultsFromFile();
    if (fileResults.length > 0) {
      entries = fileResults.map((r) => ({
        ticket_id: String(r.id),
        company: r.company,
        request_type: r.request_type,
        risk_level: r.risk_level,
        status: r.status,
        confidence: r.confidence,
        retrieved_docs: r.retrieved_docs ?? [],
        timestamp: r.processed_at ?? new Date().toISOString(),
      }));
    }
  }
  res.json({ log: logText, entries });
});

router.get("/triage/stats", (_req, res) => {
  const results = getMergedResults();
  const total = results.length;
  const escalated = results.filter((r) => r.status === "escalated").length;
  const replied = total - escalated;

  const by_company: Record<string, number> = {};
  const by_request_type: Record<string, number> = {};
  const by_risk_level: Record<string, number> = {};

  for (const r of results) {
    by_company[r.company] = (by_company[r.company] ?? 0) + 1;
    by_request_type[r.request_type] = (by_request_type[r.request_type] ?? 0) + 1;
    by_risk_level[r.risk_level] = (by_risk_level[r.risk_level] ?? 0) + 1;
  }

  const avg_confidence = total > 0 ? results.reduce((s, r) => s + r.confidence, 0) / total : 0;

  res.json({ total, escalated, replied, by_company, by_request_type, by_risk_level, avg_confidence });
});

router.post("/triage/corpus", (req, res) => {
  const { source, title, content, url } = req.body as { source: string; title: string; content: string; url?: string };
  if (!source || !title || !content) {
    res.status(400).json({ error: "source, title, and content are required" });
    return;
  }
  const id = addDocument(source, title, content, url);
  res.json({ success: true, id });
});

router.get("/triage/corpus", (_req, res) => {
  const docs = getAllDocuments();
  res.json({
    documents: docs.map((d) => ({
      id: d.id,
      source: d.source,
      title: d.title,
      content: d.content,
      url: d.url ?? null,
    })),
    total: docs.length,
  });
});

export default router;
