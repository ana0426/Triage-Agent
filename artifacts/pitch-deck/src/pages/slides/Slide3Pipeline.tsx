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
        <div style={{ fontSize: "1.2vw", fontWeight: 400, letterSpacing: "-0.01em", color: "#666666" }}>
          triageops
        </div>
        <div style={{ fontSize: "1.2vw", fontWeight: 400, color: "#999999" }}>
          The Pipeline
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", marginTop: "-2vh" }}>
        <div style={{ color: "#007AFF", fontSize: "1vw", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2.5vh" }}>
          How It Works
        </div>
        <h2 style={{ fontSize: "4.5vw", fontWeight: 200, letterSpacing: "-0.04em", margin: "0 0 6vh 0", lineHeight: 1.1 }}>
          Four stages to <span style={{ color: "#007AFF" }}>resolution</span>
        </h2>

        <div style={{ display: "flex", gap: "2vw", width: "100%" }}>
          <div style={{ flex: 1, backgroundColor: "#F5F5F7", borderRadius: "1.2vw", padding: "3.5vh 2.5vw" }}>
            <div style={{ fontSize: "1vw", fontWeight: 600, color: "#007AFF", letterSpacing: "0.08em", marginBottom: "1.5vh" }}>01</div>
            <div style={{ fontSize: "1.8vw", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "1.2vh" }}>Ingest</div>
            <div style={{ fontSize: "1.4vw", fontWeight: 400, color: "#86868B", lineHeight: 1.45, letterSpacing: "-0.01em" }}>
              CSV batch or single-ticket submission. Subject, issue, and company parsed from free text.
            </div>
          </div>

          <div style={{ flex: 1, backgroundColor: "#F5F5F7", borderRadius: "1.2vw", padding: "3.5vh 2.5vw" }}>
            <div style={{ fontSize: "1vw", fontWeight: 600, color: "#007AFF", letterSpacing: "0.08em", marginBottom: "1.5vh" }}>02</div>
            <div style={{ fontSize: "1.8vw", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "1.2vh" }}>Classify</div>
            <div style={{ fontSize: "1.4vw", fontWeight: 400, color: "#86868B", lineHeight: 1.45, letterSpacing: "-0.01em" }}>
              Company detection, request type, product area, and prompt injection screening.
            </div>
          </div>

          <div style={{ flex: 1, backgroundColor: "#F5F5F7", borderRadius: "1.2vw", padding: "3.5vh 2.5vw" }}>
            <div style={{ fontSize: "1vw", fontWeight: 600, color: "#007AFF", letterSpacing: "0.08em", marginBottom: "1.5vh" }}>03</div>
            <div style={{ fontSize: "1.8vw", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "1.2vh" }}>Retrieve</div>
            <div style={{ fontSize: "1.4vw", fontWeight: 400, color: "#86868B", lineHeight: 1.45, letterSpacing: "-0.01em" }}>
              Hybrid BM25 + TF-IDF over 22 corpus documents. Top-5 chunks ranked by confidence score.
            </div>
          </div>

          <div style={{ flex: 1, backgroundColor: "#000000", borderRadius: "1.2vw", padding: "3.5vh 2.5vw" }}>
            <div style={{ fontSize: "1vw", fontWeight: 600, color: "#007AFF", letterSpacing: "0.08em", marginBottom: "1.5vh" }}>04</div>
            <div style={{ fontSize: "1.8vw", fontWeight: 600, letterSpacing: "-0.02em", color: "#FFFFFF", marginBottom: "1.2vh" }}>Respond</div>
            <div style={{ fontSize: "1.4vw", fontWeight: 400, color: "#999999", lineHeight: 1.45, letterSpacing: "-0.01em" }}>
              GPT-4o-mini generates a grounded reply — or escalates to a human based on risk level.
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
