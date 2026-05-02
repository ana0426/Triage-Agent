export default function Slide8Closing() {
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
      {/* Decorative element — subtle abstract arc */}
      <svg
        style={{ position: "absolute", right: 0, bottom: 0, opacity: 0.04, pointerEvents: "none" }}
        width="55vw"
        height="55vh"
        viewBox="0 0 500 400"
      >
        <circle cx="500" cy="400" r="300" fill="none" stroke="#007AFF" strokeWidth="40" />
        <circle cx="500" cy="400" r="220" fill="none" stroke="#007AFF" strokeWidth="30" />
        <circle cx="500" cy="400" r="140" fill="none" stroke="#007AFF" strokeWidth="20" />
      </svg>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start', position: 'relative', zIndex: 1" as string }}>
        <div style={{ fontSize: "1.2vw", fontWeight: 400, letterSpacing: "-0.01em", color: "#666666" }}>triageops</div>
        <div style={{ fontSize: "1.2vw", fontWeight: 400, color: "#999999" }}>HackerRank Orchestrate 2026</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginTop: "-4vh", position: "relative", zIndex: 1 }}>
        <h2
          style={{
            fontSize: "9vw",
            fontWeight: 200,
            letterSpacing: "-0.05em",
            margin: 0,
            lineHeight: 1.0,
          }}
        >
          Triage<span style={{ color: "#007AFF" }}>Ops</span>
        </h2>
        <p
          style={{
            fontSize: "1.9vw",
            fontWeight: 300,
            color: "#666666",
            maxWidth: "52vw",
            marginTop: "4vh",
            lineHeight: 1.5,
            letterSpacing: "-0.01em",
          }}
        >
          AI support triage, purpose-built for enterprise products.
        </p>

        {/* Key metric strip */}
        <div
          style={{
            display: "flex",
            gap: "0",
            marginTop: "7vh",
            border: "1px solid #EBEBEB",
            borderRadius: "1.5vw",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "2.5vh 3.5vw", textAlign: "center", borderRight: "1px solid #EBEBEB" }}>
            <div style={{ fontSize: "2.8vw", fontWeight: 200, letterSpacing: "-0.04em", color: "#007AFF" }}>78%</div>
            <div style={{ fontSize: "0.95vw", fontWeight: 400, color: "#86868B", marginTop: "0.5vh" }}>Auto-reply rate</div>
          </div>
          <div style={{ padding: "2.5vh 3.5vw", textAlign: "center", borderRight: "1px solid #EBEBEB" }}>
            <div style={{ fontSize: "2.8vw", fontWeight: 200, letterSpacing: "-0.04em", color: "#1D1D1F" }}>22</div>
            <div style={{ fontSize: "0.95vw", fontWeight: 400, color: "#86868B", marginTop: "0.5vh" }}>Corpus documents</div>
          </div>
          <div style={{ padding: "2.5vh 3.5vw", textAlign: "center", borderRight: "1px solid #EBEBEB" }}>
            <div style={{ fontSize: "2.8vw", fontWeight: 200, letterSpacing: "-0.04em", color: "#1D1D1F" }}>3</div>
            <div style={{ fontSize: "0.95vw", fontWeight: 400, color: "#86868B", marginTop: "0.5vh" }}>Company domains</div>
          </div>
          <div style={{ padding: "2.5vh 3.5vw", textAlign: "center" }}>
            <div style={{ fontSize: "2.8vw", fontWeight: 200, letterSpacing: "-0.04em", color: "#007AFF" }}>&lt;2s</div>
            <div style={{ fontSize: "0.95vw", fontWeight: 400, color: "#86868B", marginTop: "0.5vh" }}>Response latency</div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "4vw",
            marginTop: "5vh",
            fontSize: "1.2vw",
            fontWeight: 400,
            color: "#BBBBBB",
            letterSpacing: "0.01em",
          }}
        >
          <div>HackerRank Orchestrate Hackathon</div>
          <div style={{ color: "#E0E0E0" }}>·</div>
          <div>pnpm monorepo</div>
          <div style={{ color: "#E0E0E0" }}>·</div>
          <div>Python + React + Express</div>
          <div style={{ color: "#E0E0E0" }}>·</div>
          <div>GPT-4o-mini</div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "1vw", fontWeight: 400, color: "#999999", letterSpacing: "0.02em" }}>
          HackerRank Orchestrate Hackathon / Confidential
        </div>
      </div>
    </div>
  );
}
