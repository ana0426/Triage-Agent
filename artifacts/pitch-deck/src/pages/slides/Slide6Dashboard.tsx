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
        <div style={{ fontSize: "1.2vw", fontWeight: 400, letterSpacing: "-0.01em", color: "#666666" }}>triageops</div>
        <div style={{ fontSize: "1.2vw", fontWeight: 400, color: "#999999" }}>Web Dashboard</div>
      </div>

      <div style={{ display: "flex", flex: 1, gap: "4vw", marginTop: "5vh", alignItems: "center" }}>

        {/* Left: Features */}
        <div style={{ flex: "0 0 40%", display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#007AFF", fontSize: "1vw", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2vh" }}>
            Command Center
          </div>
          <h2 style={{ fontSize: "3.8vw", fontWeight: 200, letterSpacing: "-0.04em", margin: "0 0 2.5vh 0", lineHeight: 1.1 }}>
            Live monitoring <span style={{ color: "#007AFF" }}>built in</span>
          </h2>
          <p style={{ fontSize: "1.3vw", fontWeight: 300, color: "#666666", margin: "0 0 3vh 0", letterSpacing: "-0.01em", lineHeight: 1.5 }}>
            React dashboard covering every stage — from ticket submission through final AI decision — with full audit trails and real-time updates.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5vh" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw", padding: "2vh 1.5vw", backgroundColor: "#F5F5F7", borderRadius: "0.8vw" }}>
              <div style={{ color: "#007AFF", fontSize: "1.1vw", marginTop: "0.2vh", flexShrink: 0 }}>◉</div>
              <div>
                <div style={{ fontSize: "1.3vw", fontWeight: 600, letterSpacing: "-0.02em" }}>Command Center</div>
                <div style={{ fontSize: "1.1vw", fontWeight: 400, color: "#86868B", marginTop: "0.4vh", lineHeight: 1.4 }}>CSV upload, example presets, risk distribution strip, live session stats.</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw', padding: '2vh 1.5vw" as string }}>
              <div style={{ color: "#007AFF", fontSize: "1.1vw", marginTop: "0.2vh", flexShrink: 0 }}>◆</div>
              <div>
                <div style={{ fontSize: "1.3vw", fontWeight: 600, letterSpacing: "-0.02em" }}>Triage Results</div>
                <div style={{ fontSize: "1.1vw", fontWeight: 400, color: "#86868B", marginTop: "0.4vh", lineHeight: 1.4 }}>AI responses, confidence scores, escalation badges, retrieved citations.</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
              <div style={{ color: "#007AFF", fontSize: "1.1vw", marginTop: "0.2vh", flexShrink: 0 }}>▸</div>
              <div>
                <div style={{ fontSize: "1.3vw", fontWeight: 600, letterSpacing: "-0.02em" }}>Knowledge Base</div>
                <div style={{ fontSize: "1.1vw", fontWeight: 400, color: "#86868B", marginTop: "0.4vh", lineHeight: 1.4 }}>22-document RAG corpus — add, edit, delete. Live CRUD reflected instantly.</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
              <div style={{ color: "#007AFF", fontSize: "1.1vw", marginTop: "0.2vh", flexShrink: 0 }}>◎</div>
              <div>
                <div style={{ fontSize: "1.3vw", fontWeight: 600, letterSpacing: "-0.02em" }}>System Logs</div>
                <div style={{ fontSize: "1.1vw", fontWeight: 400, color: "#86868B", marginTop: "0.4vh", lineHeight: 1.4 }}>Full decision traces, source document citations, per-ticket audit log.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Large detailed dashboard wireframe */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <svg viewBox="0 0 520 380" style={{ width: "100%", height: "auto", filter: "drop-shadow(0 16px 48px rgba(0,0,0,0.18))" }}>
            {/* Window frame */}
            <rect x="0" y="0" width="520" height="380" rx="12" fill="#0F172A" />

            {/* Title bar */}
            <rect x="0" y="0" width="520" height="36" rx="12" fill="#1E293B" />
            <rect x="0" y="26" width="520" height="10" fill="#1E293B" />

            {/* Traffic lights */}
            <circle cx="18" cy="18" r="5.5" fill="#EF4444" opacity="0.85" />
            <circle cx="34" cy="18" r="5.5" fill="#F59E0B" opacity="0.85" />
            <circle cx="50" cy="18" r="5.5" fill="#22C55E" opacity="0.85" />

            {/* URL bar */}
            <rect x="110" y="10" width="180" height="17" rx="8" fill="#334155" />
            <text x="200" y="21" textAnchor="middle" fontSize="7.5" fill="#64748B">triageops / command-center</text>

            {/* Live badge */}
            <rect x="458" y="12" width="40" height="13" rx="6" fill="#14532D" />
            <circle cx="465" cy="18.5" r="3" fill="#22C55E" />
            <text x="480" y="22" textAnchor="middle" fontSize="6.5" fill="#22C55E">LIVE</text>

            {/* Sidebar */}
            <rect x="0" y="36" width="86" height="344" fill="#1E293B" />
            {/* Sidebar top */}
            <rect x="8" y="48" width="70" height="14" rx="5" fill="#3B82F6" />
            <text x="43" y="58" textAnchor="middle" fontSize="7.5" fill="#FFFFFF" fontWeight="600">TriageOps</text>

            {/* Nav items */}
            <rect x="0" y="76" width="3" height="16" rx="1" fill="#3B82F6" />
            <rect x="12" y="78" width="10" height="10" rx="2" fill="#3B82F6" opacity="0.5" />
            <text x="27" y="85" fontSize="7" fill="#3B82F6" fontWeight="500">Dashboard</text>
            <rect x="12" y="100" width="10" height="10" rx="2" fill="#334155" />
            <text x="27" y="107" fontSize="7" fill="#475569">Results</text>
            <rect x="12" y="122" width="10" height="10" rx="2" fill="#334155" />
            <text x="27" y="129" fontSize="7" fill="#475569">Knowledge</text>
            <rect x="12" y="144" width="10" height="10" rx="2" fill="#334155" />
            <text x="27" y="151" fontSize="7" fill="#475569">Logs</text>

            {/* Divider */}
            <line x1="12" y1="168" x2="74" y2="168" stroke="#334155" strokeWidth="0.5" />
            <text x="43" y="180" textAnchor="middle" fontSize="6" fill="#334155">v1.0.0</text>

            {/* Main content area */}
            <rect x="86" y="36" width="434" height="344" fill="#0F172A" />

            {/* Page heading */}
            <text x="100" y="57" fontSize="13" fontWeight="200" fill="#94A3B8">Command</text>
            <text x="168" y="57" fontSize="13" fontWeight="600" fill="#3B82F6"> Center</text>

            {/* Stat cards */}
            <rect x="100" y="64" width="92" height="46" rx="7" fill="#1E293B" />
            <rect x="200" y="64" width="92" height="46" rx="7" fill="#1E293B" />
            <rect x="300" y="64" width="92" height="46" rx="7" fill="#1E293B" />
            <rect x="400" y="64" width="108" height="46" rx="7" fill="#1E293B" />

            {/* Card values */}
            <text x="146" y="84" textAnchor="middle" fontSize="15" fontWeight="200" fill="#FFFFFF">20</text>
            <text x="146" y="103" textAnchor="middle" fontSize="6.5" fill="#64748B">Total Tickets</text>

            <text x="246" y="84" textAnchor="middle" fontSize="15" fontWeight="200" fill="#22C55E">16</text>
            <text x="246" y="103" textAnchor="middle" fontSize="6.5" fill="#64748B">Auto-replied</text>

            <text x="346" y="84" textAnchor="middle" fontSize="15" fontWeight="200" fill="#EF4444">4</text>
            <text x="346" y="103" textAnchor="middle" fontSize="6.5" fill="#64748B">Escalated</text>

            <text x="454" y="84" textAnchor="middle" fontSize="15" fontWeight="200" fill="#3B82F6">0.42</text>
            <text x="454" y="103" textAnchor="middle" fontSize="6.5" fill="#64748B">Avg Confidence</text>

            {/* Section: Risk distribution */}
            <text x="100" y="125" fontSize="7.5" fill="#475569" letterSpacing="0.8">RISK DISTRIBUTION</text>
            <rect x="100" y="130" width="408" height="10" rx="5" fill="#1E293B" />
            {/* Low: green 60% */}
            <rect x="100" y="130" width="245" height="10" rx="5" fill="#22C55E" opacity="0.7" />
            {/* Medium: yellow 20% */}
            <rect x="345" y="130" width="82" height="10" fill="#F59E0B" opacity="0.7" />
            {/* High: red 20% */}
            <rect x="427" y="130" width="81" height="10" rx="5" fill="#EF4444" opacity="0.7" />
            <text x="100" y="148" fontSize="6" fill="#64748B">Low risk (60%)</text>
            <text x="386" y="148" textAnchor="middle" fontSize="6" fill="#64748B">Med (20%)</text>
            <text x="508" y="148" textAnchor="end" fontSize="6" fill="#64748B">High (20%)</text>

            {/* Company breakdown mini bars */}
            <text x="100" y="163" fontSize="7.5" fill="#475569" letterSpacing="0.8">COMPANY BREAKDOWN</text>
            <rect x="100" y="167" width="120" height="7" rx="3" fill="#1E3A5F" />
            <text x="226" y="174" fontSize="6.5" fill="#60A5FA">HackerRank 40%</text>
            <rect x="100" y="178" width="95" height="7" rx="3" fill="#1E2D4D" />
            <text x="201" y="185" fontSize="6.5" fill="#93C5FD">Claude 35%</text>
            <rect x="100" y="189" width="68" height="7" rx="3" fill="#1A1A3E" />
            <text x="174" y="196" fontSize="6.5" fill="#C4B5FD">Visa 25%</text>

            {/* Table header */}
            <rect x="100" y="205" width="408" height="16" rx="4" fill="#1E293B" />
            <text x="108" y="215" fontSize="6.5" fill="#475569" letterSpacing="0.5">STATUS</text>
            <text x="172" y="215" fontSize="6.5" fill="#475569" letterSpacing="0.5">COMPANY</text>
            <text x="240" y="215" fontSize="6.5" fill="#475569" letterSpacing="0.5">SUBJECT</text>
            <text x="390" y="215" fontSize="6.5" fill="#475569" letterSpacing="0.5">SCORE</text>
            <text x="440" y="215" fontSize="6.5" fill="#475569" letterSpacing="0.5">TIME</text>
            <text x="490" y="215" fontSize="6.5" fill="#475569" letterSpacing="0.5">ACT</text>

            {/* Row 1 */}
            <rect x="100" y="224" width="408" height="15" rx="2" fill="rgba(34,197,94,0.05)" />
            <rect x="104" y="227" width="40" height="8" rx="4" fill="#16A34A" opacity="0.85" />
            <text x="124" y="233" textAnchor="middle" fontSize="5.5" fill="#FFFFFF">auto</text>
            <rect x="168" y="227" width="46" height="8" rx="4" fill="#1E3A5F" />
            <text x="191" y="233" textAnchor="middle" fontSize="5.5" fill="#60A5FA">HackerRank</text>
            <rect x="236" y="229" width="130" height="5" rx="2" fill="#334155" />
            <rect x="386" y="227" width="40" height="8" rx="2" fill="#1E293B" />
            <rect x="386" y="227" width="28" height="8" rx="2" fill="#22C55E" opacity="0.6" />
            <text x="406" y="233" textAnchor="middle" fontSize="5.5" fill="#FFFFFF">0.67</text>
            <text x="440" y="233" fontSize="5.5" fill="#475569">0.8s</text>
            <rect x="486" y="227" width="18" height="8" rx="3" fill="#334155" />
            <text x="495" y="233" textAnchor="middle" fontSize="5" fill="#94A3B8">...</text>

            {/* Row 2 */}
            <rect x="100" y="241" width="408" height="15" rx="2" fill="rgba(255,255,255,0.01)" />
            <rect x="104" y="244" width="40" height="8" rx="4" fill="#16A34A" opacity="0.85" />
            <text x="124" y="250" textAnchor="middle" fontSize="5.5" fill="#FFFFFF">auto</text>
            <rect x="168" y="244" width="32" height="8" rx="4" fill="#1E2D4D" />
            <text x="184" y="250" textAnchor="middle" fontSize="5.5" fill="#93C5FD">Claude</text>
            <rect x="236" y="246" width="108" height="5" rx="2" fill="#334155" />
            <rect x="386" y="244" width="40" height="8" rx="2" fill="#1E293B" />
            <rect x="386" y="244" width="31" height="8" rx="2" fill="#22C55E" opacity="0.6" />
            <text x="406" y="250" textAnchor="middle" fontSize="5.5" fill="#FFFFFF">0.71</text>
            <text x="440" y="250" fontSize="5.5" fill="#475569">1.1s</text>
            <rect x="486" y="244" width="18" height="8" rx="3" fill="#334155" />
            <text x="495" y="250" textAnchor="middle" fontSize="5" fill="#94A3B8">...</text>

            {/* Row 3 — escalated */}
            <rect x="100" y="258" width="408" height="15" rx="2" fill="rgba(239,68,68,0.05)" />
            <rect x="104" y="261" width="40" height="8" rx="4" fill="#DC2626" opacity="0.85" />
            <text x="124" y="267" textAnchor="middle" fontSize="5.5" fill="#FFFFFF">escalate</text>
            <rect x="168" y="261" width="24" height="8" rx="4" fill="#1A1A3E" />
            <text x="180" y="267" textAnchor="middle" fontSize="5.5" fill="#C4B5FD">Visa</text>
            <rect x="236" y="263" width="142" height="5" rx="2" fill="#334155" />
            <rect x="386" y="261" width="40" height="8" rx="2" fill="#1E293B" />
            <rect x="386" y="261" width="9" height="8" rx="2" fill="#EF4444" opacity="0.7" />
            <text x="406" y="267" textAnchor="middle" fontSize="5.5" fill="#FFFFFF">0.21</text>
            <text x="440" y="267" fontSize="5.5" fill="#475569">1.4s</text>
            <rect x="486" y="261" width="18" height="8" rx="3" fill="#334155" />
            <text x="495" y="267" textAnchor="middle" fontSize="5" fill="#94A3B8">...</text>

            {/* Row 4 */}
            <rect x="100" y="275" width="408" height="15" rx="2" fill="rgba(255,255,255,0.01)" />
            <rect x="104" y="278" width="40" height="8" rx="4" fill="#16A34A" opacity="0.85" />
            <text x="124" y="284" textAnchor="middle" fontSize="5.5" fill="#FFFFFF">auto</text>
            <rect x="168" y="278" width="46" height="8" rx="4" fill="#1E3A5F" />
            <text x="191" y="284" textAnchor="middle" fontSize="5.5" fill="#60A5FA">HackerRank</text>
            <rect x="236" y="280" width="95" height="5" rx="2" fill="#334155" />
            <rect x="386" y="278" width="40" height="8" rx="2" fill="#1E293B" />
            <rect x="386" y="278" width="23" height="8" rx="2" fill="#22C55E" opacity="0.6" />
            <text x="406" y="284" textAnchor="middle" fontSize="5.5" fill="#FFFFFF">0.55</text>
            <text x="440" y="284" fontSize="5.5" fill="#475569">0.9s</text>
            <rect x="486" y="278" width="18" height="8" rx="3" fill="#334155" />
            <text x="495" y="284" textAnchor="middle" fontSize="5" fill="#94A3B8">...</text>

            {/* Footer action area */}
            <rect x="100" y="300" width="408" height="40" rx="7" fill="#1E293B" />
            <rect x="108" y="309" width="90" height="22" rx="6" fill="#3B82F6" />
            <text x="153" y="322.5" textAnchor="middle" fontSize="8" fill="#FFFFFF" fontWeight="500">Run Triage</text>
            <rect x="206" y="309" width="80" height="22" rx="6" fill="#334155" />
            <text x="246" y="322.5" textAnchor="middle" fontSize="8" fill="#94A3B8">Upload CSV</text>
            <rect x="296" y="309" width="80" height="22" rx="6" fill="#334155" />
            <text x="336" y="322.5" textAnchor="middle" fontSize="8" fill="#94A3B8">Clear All</text>
            {/* Live indicator */}
            <rect x="424" y="313" width="76" height="14" rx="7" fill="#14532D" />
            <circle cx="433" cy="320" r="3.5" fill="#22C55E" />
            <text x="455" y="324" textAnchor="middle" fontSize="6.5" fill="#22C55E">Processing live</text>
          </svg>
        </div>
      </div>

      <div
        style={{
          position: "absolute", bottom: "6vh", left: "6vw", right: "6vw",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}
      >
        <div style={{ fontSize: "1vw", fontWeight: 500, color: "#1D1D1F" }}>07</div>
        <div style={{ fontSize: "0.9vw", fontWeight: 400, color: "#86868B", letterSpacing: "0.02em" }}>HackerRank Orchestrate Hackathon / 2026</div>
        <div style={{ width: "1vw" }} />
      </div>
    </div>
  );
}
