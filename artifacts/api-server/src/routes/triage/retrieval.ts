import type { Chunk } from "./corpus.js";

function tokenize(text: string): string[] {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
}

function tfIdf(query: string[], chunks: Chunk[]): number[] {
  const N = chunks.length;
  const chunkTokenSets = chunks.map((c) => tokenize(c.text));

  const scores = chunks.map((_, i) => {
    const tokens = chunkTokenSets[i];
    const tokenCount = tokens.length || 1;
    const termCounts = new Map<string, number>();
    for (const t of tokens) termCounts.set(t, (termCounts.get(t) ?? 0) + 1);

    let score = 0;
    for (const q of query) {
      const tf = (termCounts.get(q) ?? 0) / tokenCount;
      const df = chunkTokenSets.filter((ts) => ts.includes(q)).length;
      const idf = Math.log((N + 1) / (df + 1)) + 1;
      score += tf * idf;
    }
    return score;
  });

  return scores;
}

function bm25(query: string[], chunks: Chunk[], k1 = 1.5, b = 0.75): number[] {
  const chunkTokens = chunks.map((c) => tokenize(c.text));
  const avgLen = chunkTokens.reduce((s, t) => s + t.length, 0) / (chunkTokens.length || 1);
  const N = chunks.length;

  return chunks.map((_, i) => {
    const tokens = chunkTokens[i];
    const len = tokens.length;
    const termCounts = new Map<string, number>();
    for (const t of tokens) termCounts.set(t, (termCounts.get(t) ?? 0) + 1);

    let score = 0;
    for (const q of query) {
      const tf = termCounts.get(q) ?? 0;
      const df = chunkTokens.filter((ts) => ts.includes(q)).length;
      const idf = Math.log((N - df + 0.5) / (df + 0.5) + 1);
      const numerator = tf * (k1 + 1);
      const denominator = tf + k1 * (1 - b + b * (len / avgLen));
      score += idf * (numerator / denominator);
    }
    return score;
  });
}

function normalize(scores: number[]): number[] {
  const max = Math.max(...scores, 1e-8);
  return scores.map((s) => s / max);
}

export interface RetrievalResult {
  chunk: Chunk;
  score: number;
}

export function retrieve(
  query: string,
  chunks: Chunk[],
  company: string,
  topK = 5
): { results: RetrievalResult[]; confidence: number } {
  if (chunks.length === 0) return { results: [], confidence: 0 };

  let candidates = chunks;
  if (company && company !== "Generic") {
    const companyFiltered = chunks.filter(
      (c) => c.source.toLowerCase() === company.toLowerCase()
    );
    if (companyFiltered.length > 0) candidates = companyFiltered;
  }

  const queryTokens = tokenize(query);
  const tfidfScores = normalize(tfIdf(queryTokens, candidates));
  const bm25Scores = normalize(bm25(queryTokens, candidates));
  const hybrid = candidates.map((c, i) => ({
    chunk: c,
    score: 0.5 * tfidfScores[i] + 0.5 * bm25Scores[i],
  }));

  hybrid.sort((a, b) => b.score - a.score);
  const top = hybrid.slice(0, topK);
  const confidence = top.length > 0 ? top.reduce((s, r) => s + r.score, 0) / top.length : 0;

  return { results: top, confidence };
}
