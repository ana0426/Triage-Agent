export default function Slide2Problem() {
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
        <div style={{ fontSize: "1.2vw", fontWeight: 400, color: "#999999" }}>The Challenge</div>
      </div>

      {/* Two-column layout */}
      <div style={{ display: "flex", flex: 1, gap: "4vw", marginTop: "6vh", alignItems: "center" }}>

        {/* Left: Problem list */}
        <div style={{ flex: "0 0 50%", display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#007AFF", fontSize: "1vw", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2vh" }}>
            The Problem
          </div>
          <h2 style={{ fontSize: "4vw", fontWeight: 200, letterSpacing: "-0.04em", margin: "0 0 4vh 0", lineHeight: 1.1 }}>
            Support at <span style={{ color: "#007AFF" }}>scale</span>
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "3.8vh" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
              <div style={{ color: "#007AFF", fontSize: "1.1vw", marginTop: "0.3vh", flexShrink: 0 }}>◉</div>
              <div>
                <div style={{ fontSize: "1.5vw", fontWeight: 600, letterSpacing: "-0.02em" }}>Manual Routing</div>
                <div style={{ fontSize: "1.25vw", fontWeight: 400, color: "#86868B", marginTop: "0.6vh", lineHeight: 1.4 }}>Every ticket touched by hand. Slow, error-prone, expensive at volume.</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
              <div style={{ color: "#007AFF", fontSize: "1.1vw", marginTop: "0.3vh", flexShrink: 0 }}>◆</div>
              <div>
                <div style={{ fontSize: "1.5vw", fontWeight: 600, letterSpacing: "-0.02em" }}>No Grounded Context</div>
                <div style={{ fontSize: "1.25vw", fontWeight: 400, color: "#86868B", marginTop: "0.6vh", lineHeight: 1.4 }}>Agents respond from memory, not documentation. Inconsistent and unreliable.</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
              <div style={{ color: "#007AFF", fontSize: "1.1vw", marginTop: "0.3vh", flexShrink: 0 }}>▸</div>
              <div>
                <div style={{ fontSize: "1.5vw", fontWeight: 600, letterSpacing: "-0.02em" }}>Missed Escalations</div>
                <div style={{ fontSize: "1.25vw", fontWeight: 400, color: "#86868B", marginTop: "0.6vh", lineHeight: 1.4 }}>High-risk tickets fall through cracks without consistent scoring rules.</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
              <div style={{ color: "#007AFF", fontSize: "1.1vw", marginTop: "0.3vh", flexShrink: 0 }}>◎</div>
              <div>
                <div style={{ fontSize: "1.5vw", fontWeight: 600, letterSpacing: "-0.02em" }}>Three Products, One Queue</div>
                <div style={{ fontSize: "1.25vw", fontWeight: 400, color: "#86868B", marginTop: "0.6vh", lineHeight: 1.4 }}>HackerRank, Claude, and Visa tickets handled identically despite different SLAs.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: SVG bar chart — ticket volume growth */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: "1vw", fontWeight: 600, color: "#86868B", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "2.5vh", alignSelf: "flex-start" }}>
            Support ticket volume growth
          </div>

          <svg viewBox="0 0 300 210" style={{ width: "100%", height: "auto" }}>
            {/* Grid lines */}
            <line x1="50" y1="20" x2="50" y2="170" stroke="#F0F0F0" strokeWidth="1" />
            <line x1="50" y1="170" x2="290" y2="170" stroke="#E0E0E0" strokeWidth="1" />
            <line x1="50" y1="128" x2="290" y2="128" stroke="#F5F5F5" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50" y1="86" x2="290" y2="86" stroke="#F5F5F5" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50" y1="44" x2="290" y2="44" stroke="#F5F5F5" strokeWidth="1" strokeDasharray="4 4" />

            {/* Y-axis labels */}
            <text x="44" y="174" textAnchor="end" fontSize="9" fill="#BBBBBB">0</text>
            <text x="44" y="132" textAnchor="end" fontSize="9" fill="#BBBBBB">1k</text>
            <text x="44" y="90" textAnchor="end" fontSize="9" fill="#BBBBBB">2k</text>
            <text x="44" y="48" textAnchor="end" fontSize="9" fill="#BBBBBB">3k</text>

            {/* Bar 2022 */}
            <rect x="60" y="150" width="36" height="20" rx="3" fill="#E8E8E8" />
            <text x="78" y="187" textAnchor="middle" fontSize="9" fill="#BBBBBB">2022</text>

            {/* Bar 2023 */}
            <rect x="110" y="128" width="36" height="42" rx="3" fill="#D0D0D0" />
            <text x="128" y="187" textAnchor="middle" fontSize="9" fill="#BBBBBB">2023</text>

            {/* Bar 2024 */}
            <rect x="160" y="95" width="36" height="75" rx="3" fill="#ABABAB" />
            <text x="178" y="187" textAnchor="middle" fontSize="9" fill="#BBBBBB">2024</text>

            {/* Bar 2025 */}
            <rect x="210" y="58" width="36" height="112" rx="3" fill="#707070" />
            <text x="228" y="187" textAnchor="middle" fontSize="9" fill="#BBBBBB">2025</text>

            {/* Bar 2026 — blue, highlighted */}
            <rect x="260" y="24" width="36" height="146" rx="3" fill="#007AFF" />
            <text x="278" y="187" textAnchor="middle" fontSize="9" fill="#007AFF" fontWeight="600">2026</text>
            <text x="278" y="20" textAnchor="middle" fontSize="10" fill="#007AFF" fontWeight="700">3.4k</text>

            {/* Trend arrow */}
            <path d="M68 148 L118 126 L168 93 L218 56 L268 22" fill="none" stroke="#007AFF" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.4" />
          </svg>

          <div style={{ fontSize: "1.1vw", fontWeight: 400, color: "#007AFF", marginTop: "1.5vh" }}>
            3x year-over-year growth since 2022
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute", bottom: "6vh", left: "6vw", right: "6vw",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}
      >
        <div style={{ fontSize: "1vw", fontWeight: 500, color: "#1D1D1F" }}>02</div>
        <div style={{ fontSize: "0.9vw", fontWeight: 400, color: "#86868B", letterSpacing: "0.02em" }}>HackerRank Orchestrate Hackathon / 2026</div>
        <div style={{ width: "1vw" }} />
      </div>
    </div>
  );
}
