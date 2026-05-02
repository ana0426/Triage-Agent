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
        <h2
          style={{
            fontSize: "8vw",
            fontWeight: 200,
            letterSpacing: "-0.04em",
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          Triage<span style={{ color: "#007AFF" }}>Ops</span>
        </h2>
        <p
          style={{
            fontSize: "2vw",
            fontWeight: 300,
            color: "#666666",
            maxWidth: "52vw",
            marginTop: "4vh",
            lineHeight: 1.45,
            letterSpacing: "-0.01em",
          }}
        >
          AI support triage, purpose-built for enterprise products.
        </p>

        <div
          style={{
            display: "flex",
            gap: "6vw",
            marginTop: "7vh",
            fontSize: "1.3vw",
            fontWeight: 400,
            color: "#999999",
            letterSpacing: "-0.01em",
          }}
        >
          <div>HackerRank Orchestrate Hackathon</div>
          <div style={{ color: "#D0D0D0" }}>·</div>
          <div>2026</div>
          <div style={{ color: "#D0D0D0" }}>·</div>
          <div>pnpm monorepo</div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end" }}>
        <div style={{ fontSize: "1vw", fontWeight: 400, color: "#999999", letterSpacing: "0.02em" }}>
          HackerRank Orchestrate Hackathon / Confidential
        </div>
      </div>
    </div>
  );
}
