export default function Slide3Pipeline() {
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
        justifyContent: "space-between",
        padding: "6vh 6vw",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontSize: "1.2vw", fontWeight: 400, letterSpacing: "-0.01em", color: "#666666" }}>triageops</div>
        <div style={{ fontSize: "1.2vw", fontWeight: 400, color: "#999999" }}>The Pipeline</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", marginTop: "-2vh" }}>
        <div style={{ color: "#007AFF", fontSize: "1vw", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2.5vh" }}>
          How It Works
        </div>
        <h2 style={{ fontSize: "4vw", fontWeight: 200, letterSpacing: "-0.04em", margin: "0 0 5vh 0", lineHeight: 1.1 }}>
          Four stages to <span style={{ color: "#007AFF" }}>resolution</span>
        </h2>

        {/* Pipeline cards with arrow connectors */}
        <div style={{ display: "flex", alignItems: "center", width: "100%" }}>

          {/* Card 1 */}
          <div style={{ flex: 1, backgroundColor: "#F5F5F7", borderRadius: "1.2vw", padding: "3vh 2vw" }}>
            <div style={{ fontSize: "0.85vw", fontWeight: 700, color: "#007AFF", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5vh" }}>01 — Ingest</div>
            <div style={{ fontSize: "1.7vw", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "1.5vh" }}>Parse</div>
            <div style={{ fontSize: "1.2vw", fontWeight: 400, color: "#86868B", lineHeight: 1.45, letterSpacing: "-0.01em", marginBottom: "2.5vh" }}>
              CSV batch or single-ticket API. Subject, body, and company extracted from free text.
            </div>
            <div style={{ borderTop: "1px solid #E0E0E0", paddingTop: "1.5vh", display: "flex", flexDirection: "column", gap: "0.8vh" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "1vw", fontWeight: 400, color: "#86868B" }}>Input formats</span>
                <span style={{ fontSize: "1vw", fontWeight: 600, color: "#1D1D1F" }}>CSV, JSON</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "1vw", fontWeight: 400, color: "#86868B" }}>Batch size</span>
                <span style={{ fontSize: "1vw", fontWeight: 600, color: "#1D1D1F" }}>Unlimited</span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div style={{ flexShrink: 0, padding: "0 0.8vw", display: "flex", alignItems: "center" }}>
            <svg viewBox="0 0 32 16" style={{ width: "2.5vw", height: "1.2vw" }}>
              <line x1="0" y1="8" x2="24" y2="8" stroke="#CCCCCC" strokeWidth="1.5" />
              <path d="M20 3 L30 8 L20 13" fill="none" stroke="#CCCCCC" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Card 2 */}
          <div style={{ flex: 1, backgroundColor: "#F5F5F7", borderRadius: "1.2vw", padding: "3vh 2vw" }}>
            <div style={{ fontSize: "0.85vw", fontWeight: 700, color: "#007AFF", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5vh" }}>02 — Classify</div>
            <div style={{ fontSize: "1.7vw", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "1.5vh" }}>Analyze</div>
            <div style={{ fontSize: "1.2vw", fontWeight: 400, color: "#86868B", lineHeight: 1.45, letterSpacing: "-0.01em", marginBottom: "2.5vh" }}>
              Company detection, request type, product area, urgency level, and injection screening.
            </div>
            <div style={{ borderTop: "1px solid #E0E0E0", paddingTop: "1.5vh", display: "flex", flexDirection: "column", gap: "0.8vh" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "1vw", fontWeight: 400, color: "#86868B" }}>Companies</span>
                <span style={{ fontSize: "1vw", fontWeight: 600, color: "#1D1D1F" }}>3 domains</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "1vw", fontWeight: 400, color: "#86868B" }}>Injection guard</span>
                <span style={{ fontSize: "1vw", fontWeight: 600, color: "#007AFF" }}>Active</span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div style={{ flexShrink: 0, padding: "0 0.8vw", display: "flex", alignItems: "center" }}>
            <svg viewBox="0 0 32 16" style={{ width: "2.5vw", height: "1.2vw" }}>
              <line x1="0" y1="8" x2="24" y2="8" stroke="#CCCCCC" strokeWidth="1.5" />
              <path d="M20 3 L30 8 L20 13" fill="none" stroke="#CCCCCC" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Card 3 */}
          <div style={{ flex: 1, backgroundColor: "#F5F5F7", borderRadius: "1.2vw", padding: "3vh 2vw" }}>
            <div style={{ fontSize: "0.85vw", fontWeight: 700, color: "#007AFF", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5vh" }}>03 — Retrieve</div>
            <div style={{ fontSize: "1.7vw", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "1.5vh" }}>Fetch</div>
            <div style={{ fontSize: "1.2vw", fontWeight: 400, color: "#86868B", lineHeight: 1.45, letterSpacing: "-0.01em", marginBottom: "2.5vh" }}>
              Hybrid BM25 + TF-IDF over 22 corpus documents. Top-5 chunks ranked by relevance.
            </div>
            <div style={{ borderTop: "1px solid #E0E0E0", paddingTop: "1.5vh", display: "flex", flexDirection: "column", gap: "0.8vh" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "1vw", fontWeight: 400, color: "#86868B" }}>Documents</span>
                <span style={{ fontSize: "1vw", fontWeight: 600, color: "#1D1D1F" }}>22 corpus</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "1vw", fontWeight: 400, color: "#86868B" }}>Returned</span>
                <span style={{ fontSize: "1vw", fontWeight: 600, color: "#1D1D1F" }}>Top 5 chunks</span>
              </div>
            </div>
          </div>

          {/* Arrow */}
          <div style={{ flexShrink: 0, padding: "0 0.8vw", display: "flex", alignItems: "center" }}>
            <svg viewBox="0 0 32 16" style={{ width: "2.5vw", height: "1.2vw" }}>
              <line x1="0" y1="8" x2="24" y2="8" stroke="#CCCCCC" strokeWidth="1.5" />
              <path d="M20 3 L30 8 L20 13" fill="none" stroke="#CCCCCC" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Card 4 — dark */}
          <div style={{ flex: 1, backgroundColor: "#000000", borderRadius: "1.2vw", padding: "3vh 2vw" }}>
            <div style={{ fontSize: "0.85vw", fontWeight: 700, color: "#007AFF", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "1.5vh" }}>04 — Respond</div>
            <div style={{ fontSize: "1.7vw", fontWeight: 600, letterSpacing: "-0.02em", color: "#FFFFFF", marginBottom: "1.5vh" }}>Decide</div>
            <div style={{ fontSize: "1.2vw", fontWeight: 400, color: "#999999", lineHeight: 1.45, letterSpacing: "-0.01em", marginBottom: "2.5vh" }}>
              GPT-4o-mini generates a grounded reply, or escalates to a human based on confidence threshold.
            </div>
            <div style={{ borderTop: "1px solid #333333", paddingTop: "1.5vh", display: "flex", flexDirection: "column", gap: "0.8vh" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "1vw", fontWeight: 400, color: "#666666" }}>Model</span>
                <span style={{ fontSize: "1vw", fontWeight: 600, color: "#FFFFFF" }}>GPT-4o-mini</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "1vw", fontWeight: 400, color: "#666666" }}>Threshold</span>
                <span style={{ fontSize: "1vw", fontWeight: 600, color: "#007AFF" }}>Score-driven</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ fontSize: "1vw", fontWeight: 400, color: "#999999", letterSpacing: "0.02em" }}>
          HackerRank Orchestrate Hackathon / 2026
        </div>
        <div style={{ fontSize: "1vw", fontWeight: 400, color: "#999999" }}>03</div>
      </div>
    </div>
  );
}
