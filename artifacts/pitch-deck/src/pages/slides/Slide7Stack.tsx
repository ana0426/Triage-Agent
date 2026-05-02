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
        <div style={{ fontSize: "1.2vw", fontWeight: 400, letterSpacing: "-0.01em", color: "#666666" }}>
          triageops
        </div>
        <div style={{ fontSize: "1.2vw", fontWeight: 400, color: "#999999" }}>
          Technology
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", marginTop: "-2vh" }}>
        <div style={{ color: "#007AFF", fontSize: "1vw", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2.5vh" }}>
          Tech Stack
        </div>
        <h2 style={{ fontSize: "4.5vw", fontWeight: 200, letterSpacing: "-0.04em", margin: "0 0 6vh 0", lineHeight: 1.1 }}>
          Solid <span style={{ color: "#007AFF" }}>foundations</span>
        </h2>

        <div style={{ display: "flex", gap: "3vw", width: "100%" }}>
          <div style={{ flex: 1, backgroundColor: "#F5F5F7", borderRadius: "1.5vw", padding: "3.5vh 2.5vw" }}>
            <div style={{ fontSize: "1vw", fontWeight: 600, color: "#007AFF", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "2.5vh" }}>Agent</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.8vh" }}>
              <div style={{ fontSize: "1.5vw", fontWeight: 600, letterSpacing: "-0.02em" }}>Python</div>
              <div style={{ fontSize: "1.5vw", fontWeight: 600, letterSpacing: "-0.02em" }}>BM25 + TF-IDF</div>
              <div style={{ fontSize: "1.5vw", fontWeight: 600, letterSpacing: "-0.02em" }}>GPT-4o-mini</div>
            </div>
          </div>

          <div style={{ flex: 1, backgroundColor: "#F5F5F7", borderRadius: "1.5vw", padding: "3.5vh 2.5vw" }}>
            <div style={{ fontSize: "1vw", fontWeight: 600, color: "#007AFF", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "2.5vh" }}>API Server</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.8vh" }}>
              <div style={{ fontSize: "1.5vw", fontWeight: 600, letterSpacing: "-0.02em" }}>Express 5</div>
              <div style={{ fontSize: "1.5vw", fontWeight: 600, letterSpacing: "-0.02em" }}>TypeScript</div>
              <div style={{ fontSize: "1.5vw", fontWeight: 600, letterSpacing: "-0.02em" }}>OpenAPI + Codegen</div>
            </div>
          </div>

          <div style={{ flex: 1, backgroundColor: "#000000", borderRadius: "1.5vw", padding: "3.5vh 2.5vw" }}>
            <div style={{ fontSize: "1vw", fontWeight: 600, color: "#007AFF", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "2.5vh" }}>Dashboard</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.8vh" }}>
              <div style={{ fontSize: "1.5vw", fontWeight: 600, letterSpacing: "-0.02em", color: "#FFFFFF" }}>React + Vite</div>
              <div style={{ fontSize: "1.5vw", fontWeight: 600, letterSpacing: "-0.02em", color: "#FFFFFF" }}>Tailwind CSS</div>
              <div style={{ fontSize: "1.5vw", fontWeight: 600, letterSpacing: "-0.02em", color: "#FFFFFF" }}>React Query</div>
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
