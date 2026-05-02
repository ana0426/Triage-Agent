export default function Slide6Dashboard() {
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
        <div style={{ fontSize: "1.2vw", fontWeight: 400, letterSpacing: "-0.01em", color: "#666666" }}>
          triageops
        </div>
        <div style={{ fontSize: "1.2vw", fontWeight: 400, color: "#999999" }}>
          Web Dashboard
        </div>
      </div>

      <div style={{ marginLeft: "28vw", marginTop: "10vh", marginBottom: "4vh" }}>
        <div style={{ color: "#007AFF", fontSize: "1vw", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2vh" }}>
          Command Center
        </div>
        <h2 style={{ fontSize: "4.5vw", fontWeight: 200, letterSpacing: "-0.04em", margin: 0, lineHeight: 1.1 }}>
          Live monitoring <span style={{ color: "#007AFF" }}>built in</span>
        </h2>
        <p style={{ fontSize: "1.6vw", fontWeight: 300, color: "#666666", marginTop: "1.5vh", letterSpacing: "-0.01em" }}>
          Four views covering every stage of the triage process.
        </p>
      </div>

      <div style={{ marginLeft: "28vw", display: "flex", flexDirection: "column", gap: "4vh" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ color: "#007AFF", fontSize: "1.2vw", width: "3vw" }}>◉</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "2vw" }}>
            <span style={{ fontSize: "1.6vw", fontWeight: 600, letterSpacing: "-0.02em" }}>Command Center</span>
            <span style={{ fontSize: "1.4vw", fontWeight: 400, color: "#86868B", letterSpacing: "-0.01em" }}>Batch CSV submission, risk distribution strip, live stats.</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ color: "#007AFF", fontSize: "1.2vw", width: "3vw" }}>◆</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "2vw" }}>
            <span style={{ fontSize: "1.6vw", fontWeight: 600, letterSpacing: "-0.02em" }}>Triage Results</span>
            <span style={{ fontSize: "1.4vw", fontWeight: 400, color: "#86868B", letterSpacing: "-0.01em" }}>AI responses, confidence scores, escalation status per ticket.</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ color: "#007AFF", fontSize: "1.2vw", width: "3vw" }}>▸</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "2vw" }}>
            <span style={{ fontSize: "1.6vw", fontWeight: 600, letterSpacing: "-0.02em" }}>Knowledge Base</span>
            <span style={{ fontSize: "1.4vw", fontWeight: 400, color: "#86868B", letterSpacing: "-0.01em" }}>22-document RAG corpus with full add, edit, and delete controls.</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ color: "#007AFF", fontSize: "1.2vw", width: "3vw" }}>◎</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "2vw" }}>
            <span style={{ fontSize: "1.6vw", fontWeight: 600, letterSpacing: "-0.02em" }}>System Logs</span>
            <span style={{ fontSize: "1.4vw", fontWeight: 400, color: "#86868B", letterSpacing: "-0.01em" }}>Decision traces with retrieved document citations per ticket.</span>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute", bottom: "6vh", left: "6vw", right: "6vw",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}
      >
        <div style={{ fontSize: "1vw", fontWeight: 500, color: "#1D1D1F" }}>06</div>
        <div style={{ fontSize: "0.9vw", fontWeight: 400, color: "#86868B", letterSpacing: "0.02em" }}>
          HackerRank Orchestrate Hackathon / 2026
        </div>
        <div style={{ width: "1vw" }} />
      </div>
    </div>
  );
}
