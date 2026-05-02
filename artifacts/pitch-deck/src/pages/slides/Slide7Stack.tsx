export default function Slide7Stack() {
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
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontSize: "1.2vw", fontWeight: 400, letterSpacing: "-0.01em", color: "#666666" }}>triageops</div>
        <div style={{ fontSize: "1.2vw", fontWeight: 400, color: "#999999" }}>Technology</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", marginTop: "-2vh" }}>
        <div style={{ color: "#007AFF", fontSize: "1vw", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2.5vh" }}>
          Architecture
        </div>
        <h2 style={{ fontSize: "4vw", fontWeight: 200, letterSpacing: "-0.04em", margin: "0 0 5vh 0", lineHeight: 1.1 }}>
          Solid <span style={{ color: "#007AFF" }}>foundations</span>
        </h2>

        {/* Architecture layers */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh" }}>

          {/* Layer 1: Presentation */}
          <div style={{ backgroundColor: "#F5F5F7", borderRadius: "1.2vw", padding: "2.5vh 2.5vw" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "3vw" }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{ fontSize: "0.85vw", fontWeight: 600, color: "#007AFF", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5vh" }}>Presentation Layer</div>
                <div style={{ fontSize: "1.5vw", fontWeight: 600, letterSpacing: "-0.02em" }}>Web Dashboard</div>
              </div>
              <div style={{ flex: 1, height: "1px", background: "#E0E0E0" }} />
              <div style={{ display: "flex", gap: "1.5vw" }}>
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E0E0E0", borderRadius: "0.6vw", padding: "1vh 1.5vw", fontSize: "1.1vw", fontWeight: 500, color: "#1D1D1F" }}>React 18</div>
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E0E0E0", borderRadius: "0.6vw", padding: "1vh 1.5vw", fontSize: "1.1vw", fontWeight: 500, color: "#1D1D1F" }}>Vite 6</div>
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E0E0E0", borderRadius: "0.6vw", padding: "1vh 1.5vw", fontSize: "1.1vw", fontWeight: 500, color: "#1D1D1F" }}>Tailwind CSS</div>
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E0E0E0", borderRadius: "0.6vw", padding: "1vh 1.5vw", fontSize: "1.1vw", fontWeight: 500, color: "#1D1D1F" }}>React Query</div>
              </div>
            </div>
          </div>

          {/* Connector */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "2vh" }}>
            <svg viewBox="0 0 20 24" style={{ width: "1.5vw", height: "2.5vh" }}>
              <line x1="10" y1="0" x2="10" y2="16" stroke="#CCCCCC" strokeWidth="1.5" />
              <path d="M5 12 L10 20 L15 12" fill="none" stroke="#CCCCCC" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Layer 2: API */}
          <div style={{ backgroundColor: "#F5F5F7", borderRadius: "1.2vw", padding: "2.5vh 2.5vw" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "3vw" }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{ fontSize: "0.85vw", fontWeight: 600, color: "#007AFF", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5vh" }}>API Layer</div>
                <div style={{ fontSize: "1.5vw", fontWeight: 600, letterSpacing: "-0.02em" }}>Backend Server</div>
              </div>
              <div style={{ flex: 1, height: "1px", background: "#E0E0E0" }} />
              <div style={{ display: "flex", gap: "1.5vw" }}>
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E0E0E0", borderRadius: "0.6vw", padding: "1vh 1.5vw", fontSize: "1.1vw", fontWeight: 500, color: "#1D1D1F" }}>Express 5</div>
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E0E0E0", borderRadius: "0.6vw", padding: "1vh 1.5vw", fontSize: "1.1vw", fontWeight: 500, color: "#1D1D1F" }}>TypeScript</div>
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E0E0E0", borderRadius: "0.6vw", padding: "1vh 1.5vw", fontSize: "1.1vw", fontWeight: 500, color: "#1D1D1F" }}>OpenAPI</div>
                <div style={{ backgroundColor: "#FFFFFF", border: "1px solid #E0E0E0", borderRadius: "0.6vw", padding: "1vh 1.5vw", fontSize: "1.1vw", fontWeight: 500, color: "#1D1D1F" }}>Pino Logs</div>
              </div>
            </div>
          </div>

          {/* Connector */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "2vh" }}>
            <svg viewBox="0 0 20 24" style={{ width: "1.5vw", height: "2.5vh" }}>
              <line x1="10" y1="0" x2="10" y2="16" stroke="#CCCCCC" strokeWidth="1.5" />
              <path d="M5 12 L10 20 L15 12" fill="none" stroke="#CCCCCC" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Layer 3: Intelligence — dark */}
          <div style={{ backgroundColor: "#000000", borderRadius: "1.2vw", padding: "2.5vh 2.5vw" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "3vw" }}>
              <div style={{ flexShrink: 0 }}>
                <div style={{ fontSize: "0.85vw", fontWeight: 600, color: "#007AFF", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.5vh" }}>Intelligence Layer</div>
                <div style={{ fontSize: "1.5vw", fontWeight: 600, letterSpacing: "-0.02em", color: "#FFFFFF" }}>Triage Agent</div>
              </div>
              <div style={{ flex: 1, height: "1px", background: "#333333" }} />
              <div style={{ display: "flex", gap: "1.5vw" }}>
                <div style={{ backgroundColor: "#1A1A1A", border: "1px solid #333333", borderRadius: "0.6vw", padding: "1vh 1.5vw", fontSize: "1.1vw", fontWeight: 500, color: "#FFFFFF" }}>Python</div>
                <div style={{ backgroundColor: "#1A1A1A", border: "1px solid #333333", borderRadius: "0.6vw", padding: "1vh 1.5vw", fontSize: "1.1vw", fontWeight: 500, color: "#FFFFFF" }}>BM25 + TF-IDF</div>
                <div style={{ backgroundColor: "#1A1A1A", border: "1px solid #333333", borderRadius: "0.6vw", padding: "1vh 1.5vw", fontSize: "1.1vw", fontWeight: 500, color: "#007AFF" }}>GPT-4o-mini</div>
                <div style={{ backgroundColor: "#1A1A1A", border: "1px solid #333333", borderRadius: "0.6vw", padding: "1vh 1.5vw", fontSize: "1.1vw", fontWeight: 500, color: "#FFFFFF" }}>RAG Corpus</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ fontSize: "1vw", fontWeight: 400, color: "#999999", letterSpacing: "0.02em" }}>
          HackerRank Orchestrate Hackathon / 2026
        </div>
        <div style={{ fontSize: "1vw", fontWeight: 400, color: "#999999" }}>07</div>
      </div>
    </div>
  );
}
