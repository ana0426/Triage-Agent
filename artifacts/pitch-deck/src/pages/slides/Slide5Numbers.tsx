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
        <div style={{ fontSize: "1.2vw", fontWeight: 400, letterSpacing: "-0.01em", color: "#666666" }}>triageops</div>
        <div style={{ fontSize: "1.2vw", fontWeight: 400, color: "#999999" }}>Analytics</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", flex: 1, marginTop: "4vh" }}>
        <div style={{ color: "#007AFF", fontSize: "1vw", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2vh" }}>
          Performance Overview
        </div>
        <h2 style={{ fontSize: "4vw", fontWeight: 200, letterSpacing: "-0.04em", margin: "0 0 4vh 0", lineHeight: 1.1 }}>
          Built to <span style={{ color: "#007AFF" }}>handle volume</span>
        </h2>

        {/* Stat strip */}
        <div style={{ display: "flex", gap: "2vw", marginBottom: "3.5vh" }}>
          <div style={{ flex: 1, backgroundColor: "#F5F5F7", borderRadius: "1vw", padding: "2.5vh 2vw" }}>
            <div style={{ fontSize: "3.5vw", fontWeight: 200, letterSpacing: "-0.04em", lineHeight: 1, color: "#1D1D1F" }}>22</div>
            <div style={{ fontSize: "1.1vw", fontWeight: 500, color: "#86868B", marginTop: "1vh" }}>Corpus Documents</div>
            <div style={{ fontSize: "1vw", fontWeight: 400, color: "#007AFF", marginTop: "0.5vh" }}>HackerRank · Claude · Visa</div>
          </div>
          <div style={{ flex: 1, backgroundColor: "#F5F5F7", borderRadius: "1vw", padding: "2.5vh 2vw" }}>
            <div style={{ fontSize: "3.5vw", fontWeight: 200, letterSpacing: "-0.04em", lineHeight: 1, color: "#1D1D1F" }}>Top 5</div>
            <div style={{ fontSize: "1.1vw", fontWeight: 500, color: "#86868B", marginTop: "1vh" }}>Chunks per Ticket</div>
            <div style={{ fontSize: "1vw", fontWeight: 400, color: "#007AFF", marginTop: "0.5vh" }}>BM25 + TF-IDF hybrid</div>
          </div>
          <div style={{ flex: 1, backgroundColor: "#F5F5F7", borderRadius: "1vw", padding: "2.5vh 2vw" }}>
            <div style={{ fontSize: "3.5vw", fontWeight: 200, letterSpacing: "-0.04em", lineHeight: 1, color: "#1D1D1F" }}>&lt;2s</div>
            <div style={{ fontSize: "1.1vw", fontWeight: 500, color: "#86868B", marginTop: "1vh" }}>Avg Response Time</div>
            <div style={{ fontSize: "1vw", fontWeight: 400, color: "#007AFF", marginTop: "0.5vh" }}>End-to-end latency</div>
          </div>
          <div style={{ flex: 1, backgroundColor: "#000000", borderRadius: "1vw", padding: "2.5vh 2vw" }}>
            <div style={{ fontSize: "3.5vw", fontWeight: 200, letterSpacing: "-0.04em", lineHeight: 1, color: "#FFFFFF" }}>0.35</div>
            <div style={{ fontSize: "1.1vw", fontWeight: 500, color: "#999999", marginTop: "1vh" }}>Escalation Threshold</div>
            <div style={{ fontSize: "1vw", fontWeight: 400, color: "#007AFF", marginTop: "0.5vh" }}>Tunable per domain</div>
          </div>
        </div>

        {/* Analytics charts */}
        <div style={{ display: "flex", gap: "2vw", flex: 1 }}>

          {/* Decision distribution */}
          <div style={{ flex: 1, backgroundColor: "#F5F5F7", borderRadius: "1.2vw", padding: "2.5vh 2.5vw" }}>
            <div style={{ fontSize: "0.9vw", fontWeight: 600, color: "#86868B", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "2.5vh" }}>
              Decision Distribution
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2.2vh" }}>
              {/* Auto-reply */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8vh" }}>
                  <span style={{ fontSize: "1.2vw", fontWeight: 500, color: "#1D1D1F" }}>Auto-reply</span>
                  <span style={{ fontSize: "1.2vw", fontWeight: 600, color: "#007AFF" }}>78%</span>
                </div>
                <div style={{ height: "0.7vh", backgroundColor: "#E8E8E8", borderRadius: "0.5vh" }}>
                  <div style={{ width: "78%", height: "100%", backgroundColor: "#007AFF", borderRadius: "0.5vh" }} />
                </div>
              </div>
              {/* Escalated */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8vh" }}>
                  <span style={{ fontSize: "1.2vw", fontWeight: 500, color: "#1D1D1F" }}>Escalated to human</span>
                  <span style={{ fontSize: "1.2vw", fontWeight: 600, color: "#1D1D1F" }}>22%</span>
                </div>
                <div style={{ height: "0.7vh", backgroundColor: "#E8E8E8", borderRadius: "0.5vh" }}>
                  <div style={{ width: "22%", height: "100%", backgroundColor: "#1D1D1F", borderRadius: "0.5vh" }} />
                </div>
              </div>
              {/* Injections blocked */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8vh" }}>
                  <span style={{ fontSize: "1.2vw", fontWeight: 500, color: "#1D1D1F" }}>Injections blocked</span>
                  <span style={{ fontSize: "1.2vw", fontWeight: 600, color: "#EF4444" }}>100%</span>
                </div>
                <div style={{ height: "0.7vh", backgroundColor: "#E8E8E8", borderRadius: "0.5vh" }}>
                  <div style={{ width: "100%", height: "100%", backgroundColor: "#EF4444", borderRadius: "0.5vh", opacity: 0.7 }} />
                </div>
              </div>
            </div>
          </div>

          {/* Company coverage */}
          <div style={{ flex: 1, backgroundColor: "#F5F5F7", borderRadius: "1.2vw", padding: "2.5vh 2.5vw" }}>
            <div style={{ fontSize: "0.9vw", fontWeight: 600, color: "#86868B", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "2.5vh" }}>
              Company Coverage
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "2.2vh" }}>
              {/* HackerRank */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8vh" }}>
                  <span style={{ fontSize: "1.2vw", fontWeight: 500, color: "#1D1D1F" }}>HackerRank</span>
                  <span style={{ fontSize: "1.2vw", fontWeight: 600, color: "#007AFF" }}>9 docs</span>
                </div>
                <div style={{ height: "0.7vh", backgroundColor: "#E8E8E8", borderRadius: "0.5vh" }}>
                  <div style={{ width: "41%", height: "100%", backgroundColor: "#007AFF", borderRadius: "0.5vh" }} />
                </div>
              </div>
              {/* Claude */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8vh" }}>
                  <span style={{ fontSize: "1.2vw", fontWeight: 500, color: "#1D1D1F" }}>Claude</span>
                  <span style={{ fontSize: "1.2vw", fontWeight: 600, color: "#007AFF" }}>8 docs</span>
                </div>
                <div style={{ height: "0.7vh", backgroundColor: "#E8E8E8", borderRadius: "0.5vh" }}>
                  <div style={{ width: "36%", height: "100%", backgroundColor: "#007AFF", borderRadius: "0.5vh", opacity: 0.7 }} />
                </div>
              </div>
              {/* Visa */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.8vh" }}>
                  <span style={{ fontSize: "1.2vw", fontWeight: 500, color: "#1D1D1F" }}>Visa</span>
                  <span style={{ fontSize: "1.2vw", fontWeight: 600, color: "#007AFF" }}>5 docs</span>
                </div>
                <div style={{ height: "0.7vh", backgroundColor: "#E8E8E8", borderRadius: "0.5vh" }}>
                  <div style={{ width: "23%", height: "100%", backgroundColor: "#007AFF", borderRadius: "0.5vh", opacity: 0.45 }} />
                </div>
              </div>
            </div>
          </div>

          {/* Confidence score distribution */}
          <div style={{ flex: 1, backgroundColor: "#F5F5F7", borderRadius: "1.2vw", padding: "2.5vh 2.5vw" }}>
            <div style={{ fontSize: "0.9vw", fontWeight: 600, color: "#86868B", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "2.5vh" }}>
              Confidence Score Range
            </div>
            <svg viewBox="0 0 200 110" style={{ width: "100%", height: "auto" }}>
              {/* Axis */}
              <line x1="20" y1="90" x2="195" y2="90" stroke="#E0E0E0" strokeWidth="1" />
              {/* Bars — confidence score buckets */}
              <rect x="26" y="72" width="22" height="18" rx="2" fill="#E0E0E0" />
              <rect x="52" y="55" width="22" height="35" rx="2" fill="#BBBBBB" />
              <rect x="78" y="40" width="22" height="50" rx="2" fill="#007AFF" opacity="0.5" />
              <rect x="104" y="28" width="22" height="62" rx="2" fill="#007AFF" opacity="0.75" />
              <rect x="130" y="18" width="22" height="72" rx="2" fill="#007AFF" />
              <rect x="156" y="38" width="22" height="52" rx="2" fill="#007AFF" opacity="0.6" />
              {/* X labels */}
              <text x="37" y="103" textAnchor="middle" fontSize="8" fill="#BBBBBB">0.1</text>
              <text x="63" y="103" textAnchor="middle" fontSize="8" fill="#BBBBBB">0.2</text>
              <text x="89" y="103" textAnchor="middle" fontSize="8" fill="#BBBBBB">0.3</text>
              <text x="115" y="103" textAnchor="middle" fontSize="8" fill="#BBBBBB">0.4</text>
              <text x="141" y="103" textAnchor="middle" fontSize="8" fill="#007AFF">0.5</text>
              <text x="167" y="103" textAnchor="middle" fontSize="8" fill="#BBBBBB">0.6</text>
              {/* Threshold marker */}
              <line x1="104" y1="16" x2="104" y2="90" stroke="#EF4444" strokeWidth="1" strokeDasharray="3 2" opacity="0.6" />
              <text x="106" y="13" fontSize="7.5" fill="#EF4444" opacity="0.8">threshold</text>
            </svg>
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
