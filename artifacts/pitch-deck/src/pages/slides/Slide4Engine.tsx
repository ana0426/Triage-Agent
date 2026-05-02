export default function Slide4Engine() {
  // Donut chart math
  // r=72, cx=cy=90, circumference = 2*π*72 ≈ 452.4
  const r = 72;
  const circ = 2 * Math.PI * r; // 452.4
  const autoReplyPct = 0.78;
  const escalatePct = 0.22;
  const autoLen = circ * autoReplyPct; // 352.9
  const escLen = circ * escalatePct;   // 99.5
  const gap = 2;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        fontFamily: "'Inter', sans-serif",
        color: "#1D1D1F",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        padding: "6vh 6vw",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontSize: "1.2vw", fontWeight: 400, letterSpacing: "-0.01em", color: "#666666" }}>triageops</div>
        <div style={{ fontSize: "1.2vw", fontWeight: 400, color: "#999999" }}>Core Intelligence</div>
      </div>

      <div style={{ display: "flex", flex: 1, gap: "5vw", marginTop: "6vh", alignItems: "center" }}>

        {/* Left: Feature list */}
        <div style={{ flex: "0 0 52%", display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#007AFF", fontSize: "1vw", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2vh" }}>
            Triage Engine
          </div>
          <h2 style={{ fontSize: "4vw", fontWeight: 200, letterSpacing: "-0.04em", margin: "0 0 4vh 0", lineHeight: 1.1 }}>
            Decisions grounded <span style={{ color: "#007AFF" }}>in data</span>
          </h2>
          <p style={{ fontSize: "1.4vw", fontWeight: 300, color: "#666666", margin: "0 0 4vh 0", letterSpacing: "-0.01em", lineHeight: 1.5 }}>
            Every decision is auditable, explainable, and grounded in your own corpus — not hallucinated from model weights.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "3.2vh" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
              <div style={{ color: "#007AFF", fontSize: "1.1vw", marginTop: "0.3vh", flexShrink: 0 }}>◉</div>
              <div>
                <div style={{ fontSize: "1.4vw", fontWeight: 600, letterSpacing: "-0.02em" }}>Company Detection</div>
                <div style={{ fontSize: "1.15vw", fontWeight: 400, color: "#86868B", marginTop: "0.5vh", lineHeight: 1.4 }}>Identifies HackerRank, Claude, or Visa from free text. Falls back to keyword heuristics.</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
              <div style={{ color: "#007AFF", fontSize: "1.1vw", marginTop: "0.3vh", flexShrink: 0 }}>◆</div>
              <div>
                <div style={{ fontSize: "1.4vw", fontWeight: 600, letterSpacing: "-0.02em" }}>Hybrid Retrieval (BM25 + TF-IDF)</div>
                <div style={{ fontSize: "1.15vw", fontWeight: 400, color: "#86868B", marginTop: "0.5vh", lineHeight: 1.4 }}>Lexical + statistical ranking over company-scoped corpus. Top-5 chunks per ticket.</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
              <div style={{ color: "#007AFF", fontSize: "1.1vw", marginTop: "0.3vh", flexShrink: 0 }}>▸</div>
              <div>
                <div style={{ fontSize: "1.4vw", fontWeight: 600, letterSpacing: "-0.02em" }}>Confidence-Based Escalation</div>
                <div style={{ fontSize: "1.15vw", fontWeight: 400, color: "#86868B", marginTop: "0.5vh", lineHeight: 1.4 }}>Score below threshold triggers human escalation. Tunable per company domain.</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
              <div style={{ color: "#007AFF", fontSize: "1.1vw", marginTop: "0.3vh", flexShrink: 0 }}>✦</div>
              <div>
                <div style={{ fontSize: "1.4vw", fontWeight: 600, letterSpacing: "-0.02em" }}>Prompt Injection Guard</div>
                <div style={{ fontSize: "1.15vw", fontWeight: 400, color: "#86868B", marginTop: "0.5vh", lineHeight: 1.4 }}>Pattern matching detects and rejects injection attempts before any LLM call is made.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Donut chart — decision distribution */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center', justifyContent: 'center" as string }}>
          <div style={{ fontSize: "1vw", fontWeight: 600, color: "#86868B", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "3vh", alignSelf: "flex-start" }}>
            Decision distribution
          </div>

          <div style={{ position: "relative", display: "inline-block" }}>
            <svg viewBox="0 0 180 180" style={{ width: "18vw", height: "18vw" }}>
              <g transform="rotate(-90, 90, 90)">
                {/* Background track */}
                <circle cx="90" cy="90" r={r} fill="none" stroke="#F0F0F0" strokeWidth="18" />
                {/* Auto-reply arc (78%) — blue */}
                <circle
                  cx="90" cy="90" r={r} fill="none"
                  stroke="#007AFF" strokeWidth="18"
                  strokeDasharray={`${autoLen - gap} ${circ - autoLen + gap}`}
                  strokeDashoffset="0"
                  strokeLinecap="butt"
                />
                {/* Escalated arc (22%) — dark */}
                <circle
                  cx="90" cy="90" r={r} fill="none"
                  stroke="#1D1D1F" strokeWidth="18"
                  strokeDasharray={`${escLen - gap} ${circ - escLen + gap}`}
                  strokeDashoffset={`${-(autoLen)}`}
                  strokeLinecap="butt"
                />
              </g>
              {/* Center label */}
              <text x="90" y="85" textAnchor="middle" fontSize="22" fontWeight="200" fill="#1D1D1F" letterSpacing="-1">78%</text>
              <text x="90" y="102" textAnchor="middle" fontSize="9" fontWeight="400" fill="#86868B" letterSpacing="0.5">auto-reply</text>
            </svg>
          </div>

          {/* Legend */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh", marginTop: "3vh", width: "16vw" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.8vw", height: "0.8vw", borderRadius: "50%", backgroundColor: "#007AFF", flexShrink: 0 }} />
              <div style={{ flex: 1, fontSize: "1.1vw", fontWeight: 400, color: "#1D1D1F" }}>Auto-reply</div>
              <div style={{ fontSize: "1.3vw", fontWeight: 600, color: "#1D1D1F" }}>78%</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
              <div style={{ width: "0.8vw", height: "0.8vw", borderRadius: "50%", backgroundColor: "#1D1D1F", flexShrink: 0 }} />
              <div style={{ flex: 1, fontSize: "1.1vw", fontWeight: 400, color: "#1D1D1F" }}>Escalated</div>
              <div style={{ fontSize: "1.3vw", fontWeight: 600, color: "#1D1D1F" }}>22%</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "1vw", paddingTop: "1vh", borderTop: "1px solid #F0F0F0" }}>
              <div style={{ width: "0.8vw", height: "0.8vw", borderRadius: "50%", backgroundColor: "#E0E0E0", flexShrink: 0 }} />
              <div style={{ flex: 1, fontSize: "1.1vw", fontWeight: 400, color: "#86868B" }}>Avg confidence</div>
              <div style={{ fontSize: "1.3vw", fontWeight: 600, color: "#007AFF" }}>0.42</div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute", bottom: "6vh", left: "6vw", right: "6vw",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}
      >
        <div style={{ fontSize: "1vw", fontWeight: 500, color: "#1D1D1F" }}>04</div>
        <div style={{ fontSize: "0.9vw", fontWeight: 400, color: "#86868B", letterSpacing: "0.02em" }}>HackerRank Orchestrate Hackathon / 2026</div>
        <div style={{ width: "1vw" }} />
      </div>
    </div>
  );
}
