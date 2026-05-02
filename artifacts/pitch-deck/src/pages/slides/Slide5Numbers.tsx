export default function Slide5Numbers() {
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
        <div style={{ fontSize: "1.2vw", fontWeight: 400, letterSpacing: "-0.01em", color: "#666666" }}>
          triageops
        </div>
        <div style={{ fontSize: "1.2vw", fontWeight: 400, color: "#999999" }}>
          By the Numbers
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", marginTop: "-2vh" }}>
        <div style={{ color: "#007AFF", fontSize: "1vw", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2.5vh" }}>
          At a Glance
        </div>
        <h2 style={{ fontSize: "4.5vw", fontWeight: 200, letterSpacing: "-0.04em", margin: "0 0 6vh 0", lineHeight: 1.1 }}>
          Built to <span style={{ color: "#007AFF" }}>handle volume</span>
        </h2>

        <div style={{ display: "flex", gap: "3vw", width: "100%", height: "38vh" }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor: "#F5F5F7", borderRadius: "1.5vw", padding: "3.5vw" }}>
            <div style={{ fontSize: "1.5vw", fontWeight: 500, color: "#666666", marginBottom: "1.5vh" }}>Corpus Documents</div>
            <div style={{ fontSize: "6vw", fontWeight: 200, letterSpacing: "-0.04em", color: "#000000", lineHeight: 1 }}>22</div>
            <div style={{ fontSize: "1.3vw", fontWeight: 400, color: "#007AFF", marginTop: "1.5vh" }}>HackerRank · Claude · Visa</div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor: "#F5F5F7", borderRadius: "1.5vw", padding: "3.5vw" }}>
            <div style={{ fontSize: "1.5vw", fontWeight: 500, color: "#666666", marginBottom: "1.5vh" }}>Retrieval Depth</div>
            <div style={{ fontSize: "6vw", fontWeight: 200, letterSpacing: "-0.04em", color: "#000000", lineHeight: 1 }}>Top 5</div>
            <div style={{ fontSize: "1.3vw", fontWeight: 400, color: "#007AFF", marginTop: "1.5vh" }}>Ranked chunks per ticket</div>
          </div>

          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor: "#000000", borderRadius: "1.5vw", padding: "3.5vw" }}>
            <div style={{ fontSize: "1.5vw", fontWeight: 500, color: "#999999", marginBottom: "1.5vh" }}>Escalation Decision</div>
            <div style={{ fontSize: "6vw", fontWeight: 200, letterSpacing: "-0.04em", color: "#FFFFFF", lineHeight: 1 }}>Auto</div>
            <div style={{ fontSize: "1.3vw", fontWeight: 400, color: "rgba(255,255,255,0.7)", marginTop: "1.5vh" }}>Risk-score driven, no manual rules</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ fontSize: "1vw", fontWeight: 400, color: "#999999", letterSpacing: "0.02em" }}>
          HackerRank Orchestrate Hackathon / 2026
        </div>
        <div style={{ fontSize: "1vw", fontWeight: 400, color: "#999999" }}>05</div>
      </div>
    </div>
  );
}
