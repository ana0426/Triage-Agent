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
      {/* Decorative background — abstract triage flow graph */}
      <svg
        style={{ position: "absolute", right: "4vw", top: "14vh", opacity: 0.045, pointerEvents: "none" }}
        width="42vw"
        height="72vh"
        viewBox="0 0 420 540"
      >
        {/* Nodes */}
        <circle cx="210" cy="60" r="28" fill="none" stroke="#007AFF" strokeWidth="2.5" />
        <circle cx="210" cy="60" r="14" fill="#007AFF" />
        <circle cx="100" cy="200" r="22" fill="none" stroke="#1D1D1F" strokeWidth="2" />
        <circle cx="100" cy="200" r="10" fill="#1D1D1F" />
        <circle cx="320" cy="200" r="22" fill="none" stroke="#1D1D1F" strokeWidth="2" />
        <circle cx="320" cy="200" r="10" fill="#1D1D1F" />
        <circle cx="60" cy="360" r="16" fill="none" stroke="#86868B" strokeWidth="1.5" />
        <circle cx="60" cy="360" r="7" fill="#86868B" />
        <circle cx="180" cy="340" r="16" fill="none" stroke="#86868B" strokeWidth="1.5" />
        <circle cx="180" cy="340" r="7" fill="#86868B" />
        <circle cx="320" cy="360" r="16" fill="none" stroke="#86868B" strokeWidth="1.5" />
        <circle cx="320" cy="360" r="7" fill="#86868B" />
        <circle cx="390" cy="340" r="12" fill="none" stroke="#D0D0D0" strokeWidth="1" />
        <circle cx="130" cy="470" r="12" fill="none" stroke="#D0D0D0" strokeWidth="1" />
        <circle cx="270" cy="490" r="12" fill="none" stroke="#D0D0D0" strokeWidth="1" />
        {/* Connecting lines */}
        <line x1="210" y1="88" x2="100" y2="178" stroke="#1D1D1F" strokeWidth="1.5" />
        <line x1="210" y1="88" x2="320" y2="178" stroke="#1D1D1F" strokeWidth="1.5" />
        <line x1="100" y1="222" x2="60" y2="344" stroke="#86868B" strokeWidth="1" />
        <line x1="100" y1="222" x2="180" y2="324" stroke="#86868B" strokeWidth="1" />
        <line x1="320" y1="222" x2="320" y2="344" stroke="#86868B" strokeWidth="1" />
        <line x1="320" y1="222" x2="390" y2="328" stroke="#D0D0D0" strokeWidth="0.8" />
        <line x1="60" y1="376" x2="130" y2="458" stroke="#D0D0D0" strokeWidth="0.8" />
        <line x1="180" y1="356" x2="270" y2="478" stroke="#D0D0D0" strokeWidth="0.8" />
        <line x1="320" y1="376" x2="270" y2="478" stroke="#D0D0D0" strokeWidth="0.8" />
      </svg>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "1.2vw", fontWeight: 400, letterSpacing: "-0.01em", color: "#666666" }}>
          triageops
        </div>
        <div style={{ fontSize: "1.2vw", fontWeight: 400, color: "#999999" }}>
          HackerRank Orchestrate 2026
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginTop: "-4vh", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "1vw", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#007AFF", marginBottom: "3vh" }}>
          AI Support Triage
        </div>
        <h1
          style={{
            fontSize: "9vw",
            fontWeight: 200,
            letterSpacing: "-0.05em",
            margin: 0,
            lineHeight: 1.0,
          }}
        >
          Triage<span style={{ color: "#007AFF" }}>Ops</span>
        </h1>
        <p
          style={{
            fontSize: "1.8vw",
            fontWeight: 300,
            color: "#666666",
            maxWidth: "52vw",
            marginTop: "4.5vh",
            lineHeight: 1.5,
            letterSpacing: "-0.01em",
          }}
        >
          Instant classification. Context-aware responses. Automatic escalation.
        </p>
        <p
          style={{
            fontSize: "1.4vw",
            fontWeight: 400,
            color: "#999999",
            marginTop: "1.5vh",
            letterSpacing: "0.01em",
          }}
        >
          Purpose-built for HackerRank, Claude, and Visa support queues.
        </p>

        {/* Product stats strip */}
        <div
          style={{
            display: "flex",
            gap: "5vw",
            marginTop: "7vh",
            paddingTop: "4vh",
            borderTop: "1px solid #E8E8E8",
            width: "52vw",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 200, letterSpacing: "-0.03em", color: "#1D1D1F" }}>22</div>
            <div style={{ fontSize: "1vw", fontWeight: 400, color: "#86868B", marginTop: "0.5vh" }}>Corpus Docs</div>
          </div>
          <div style={{ width: "1px", background: "#E8E8E8" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 200, letterSpacing: "-0.03em", color: "#1D1D1F" }}>3</div>
            <div style={{ fontSize: "1vw", fontWeight: 400, color: "#86868B", marginTop: "0.5vh" }}>Company Domains</div>
          </div>
          <div style={{ width: "1px", background: "#E8E8E8" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 200, letterSpacing: "-0.03em", color: "#1D1D1F" }}>Top 5</div>
            <div style={{ fontSize: "1vw", fontWeight: 400, color: "#86868B", marginTop: "0.5vh" }}>Chunks Retrieved</div>
          </div>
          <div style={{ width: "1px", background: "#E8E8E8" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.2vw", fontWeight: 200, letterSpacing: "-0.03em", color: "#007AFF" }}>&lt;2s</div>
            <div style={{ fontSize: "1vw", fontWeight: 400, color: "#86868B", marginTop: "0.5vh" }}>Avg Response</div>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: "1vw", fontWeight: 400, color: "#999999", letterSpacing: "0.02em" }}>
          HackerRank Orchestrate Hackathon / 2026
        </div>
      </div>
    </div>
  );
}
