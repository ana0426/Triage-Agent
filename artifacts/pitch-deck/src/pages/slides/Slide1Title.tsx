export default function Slide1Title() {
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
          HackerRank Orchestrate 2026
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginTop: "-4vh" }}>
        <div style={{ fontSize: "1vw", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#007AFF", marginBottom: "3vh" }}>
          AI Support Triage
        </div>
        <h1
          style={{
            fontSize: "8vw",
            fontWeight: 200,
            letterSpacing: "-0.04em",
            margin: 0,
            lineHeight: 1.05,
            textWrap: "balance",
          } as React.CSSProperties}
        >
          Triage<span style={{ color: "#007AFF" }}>Ops</span>
        </h1>
        <p
          style={{
            fontSize: "2vw",
            fontWeight: 300,
            color: "#666666",
            maxWidth: "55vw",
            marginTop: "4vh",
            lineHeight: 1.45,
            letterSpacing: "-0.01em",
          }}
        >
          Instant classification. Context-aware responses.
        </p>
        <p
          style={{
            fontSize: "2vw",
            fontWeight: 300,
            color: "#666666",
            maxWidth: "55vw",
            marginTop: "0.5vh",
            lineHeight: 1.45,
            letterSpacing: "-0.01em",
          }}
        >
          Automatic escalation. For HackerRank, Claude, and Visa.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
        <div style={{ fontSize: "1vw", fontWeight: 400, color: "#999999", letterSpacing: "0.02em" }}>
          HackerRank Orchestrate Hackathon / 2026
        </div>
      </div>
    </div>
  );
}
