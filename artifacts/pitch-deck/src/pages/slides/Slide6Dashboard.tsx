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

      <div style={{ display: "flex", flex: 1, gap: "4vw", marginTop: "6vh", alignItems: "center" }}>

        {/* Left: Features */}
        <div style={{ flex: "0 0 48%", display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#007AFF", fontSize: "1vw", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2vh" }}>
            Command Center
          </div>
          <h2 style={{ fontSize: "4vw", fontWeight: 200, letterSpacing: "-0.04em", margin: "0 0 3vh 0", lineHeight: 1.1 }}>
            Live monitoring <span style={{ color: "#007AFF" }}>built in</span>
          </h2>
          <p style={{ fontSize: "1.35vw", fontWeight: 300, color: "#666666", margin: "0 0 3.5vh 0", letterSpacing: "-0.01em", lineHeight: 1.5 }}>
            A React dashboard covering every stage — from ticket submission through final decision — with full audit trails.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "3vh" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
              <div style={{ color: "#007AFF", fontSize: "1.1vw", marginTop: "0.3vh", flexShrink: 0 }}>◉</div>
              <div>
                <div style={{ fontSize: "1.35vw", fontWeight: 600, letterSpacing: "-0.02em" }}>Command Center</div>
                <div style={{ fontSize: "1.15vw", fontWeight: 400, color: "#86868B", marginTop: "0.5vh", lineHeight: 1.4 }}>CSV upload with example presets, real-time risk distribution strip, live triage stats.</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
              <div style={{ color: "#007AFF", fontSize: "1.1vw", marginTop: "0.3vh", flexShrink: 0 }}>◆</div>
              <div>
                <div style={{ fontSize: "1.35vw", fontWeight: 600, letterSpacing: "-0.02em" }}>Triage Results</div>
                <div style={{ fontSize: "1.15vw", fontWeight: 400, color: "#86868B", marginTop: "0.5vh", lineHeight: 1.4 }}>Full AI responses, confidence scores, escalation badges, and retrieved chunks per ticket.</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
              <div style={{ color: "#007AFF", fontSize: "1.1vw", marginTop: "0.3vh", flexShrink: 0 }}>▸</div>
              <div>
                <div style={{ fontSize: "1.35vw", fontWeight: 600, letterSpacing: "-0.02em" }}>Knowledge Base</div>
                <div style={{ fontSize: "1.15vw", fontWeight: 400, color: "#86868B", marginTop: "0.5vh", lineHeight: 1.4 }}>22-document RAG corpus with full add, edit, and delete. Changes apply instantly.</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "1.5vw" }}>
              <div style={{ color: "#007AFF", fontSize: "1.1vw", marginTop: "0.3vh", flexShrink: 0 }}>◎</div>
              <div>
                <div style={{ fontSize: "1.35vw", fontWeight: 600, letterSpacing: "-0.02em" }}>System Logs</div>
                <div style={{ fontSize: "1.15vw", fontWeight: 400, color: "#86868B", marginTop: "0.5vh", lineHeight: 1.4 }}>Full decision traces with retrieved document citations, company, and confidence per ticket.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Dashboard wireframe */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          <svg viewBox="0 0 360 260" style={{ width: "100%", height: "auto", filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.12))" }}>
            {/* Window chrome */}
            <rect x="0" y="0" width="360" height="260" rx="10" fill="#0F172A" />
            {/* Title bar */}
            <rect x="0" y="0" width="360" height="30" rx="10" fill="#1E293B" />
            <rect x="0" y="20" width="360" height="10" fill="#1E293B" />
            {/* Traffic lights */}
            <circle cx="16" cy="15" r="5" fill="#EF4444" opacity="0.8" />
            <circle cx="30" cy="15" r="5" fill="#F59E0B" opacity="0.8" />
            <circle cx="44" cy="15" r="5" fill="#22C55E" opacity="0.8" />
            {/* Address bar */}
            <rect x="80" y="9" width="130" height="13" rx="6" fill="#334155" />
            <text x="145" y="19" textAnchor="middle" fontSize="6" fill="#64748B">triageops dashboard</text>

            {/* Left nav */}
            <rect x="0" y="30" width="72" height="230" fill="#1E293B" />
            <rect x="0" y="228" width="72" height="32" rx="0" fill="#1E293B" />
            {/* Nav brand */}
            <rect x="8" y="40" width="56" height="8" rx="4" fill="#3B82F6" />
            {/* Nav items */}
            <rect x="8" y="60" width="44" height="6" rx="3" fill="#475569" />
            <rect x="8" y="76" width="36" height="6" rx="3" fill="#334155" />
            <rect x="8" y="92" width="48" height="6" rx="3" fill="#334155" />
            <rect x="8" y="108" width="40" height="6" rx="3" fill="#334155" />
            {/* Nav indicators */}
            <rect x="0" y="58" width="3" height="10" rx="1" fill="#3B82F6" />

            {/* Main area */}
            <rect x="72" y="30" width="288" height="230" fill="#0F172A" />

            {/* Stats row */}
            <rect x="82" y="40" width="60" height="36" rx="5" fill="#1E293B" />
            <rect x="150" y="40" width="60" height="36" rx="5" fill="#1E293B" />
            <rect x="218" y="40" width="60" height="36" rx="5" fill="#1E293B" />
            <rect x="286" y="40" width="64" height="36" rx="5" fill="#1E293B" />
            {/* Stat values */}
            <text x="112" y="57" textAnchor="middle" fontSize="11" fontWeight="300" fill="#FFFFFF">20</text>
            <text x="112" y="69" textAnchor="middle" fontSize="6" fill="#64748B">tickets</text>
            <text x="180" y="57" textAnchor="middle" fontSize="11" fontWeight="300" fill="#22C55E">78%</text>
            <text x="180" y="69" textAnchor="middle" fontSize="6" fill="#64748B">auto-reply</text>
            <text x="248" y="57" textAnchor="middle" fontSize="11" fontWeight="300" fill="#EF4444">22%</text>
            <text x="248" y="69" textAnchor="middle" fontSize="6" fill="#64748B">escalated</text>
            <text x="318" y="57" textAnchor="middle" fontSize="11" fontWeight="300" fill="#3B82F6">0.42</text>
            <text x="318" y="69" textAnchor="middle" fontSize="6" fill="#64748B">avg conf.</text>

            {/* Risk bar */}
            <rect x="82" y="84" width="268" height="6" rx="3" fill="#1E293B" />
            <rect x="82" y="84" width="180" height="6" rx="3" fill="#22C55E" opacity="0.7" />
            <rect x="262" y="84" width="88" height="6" rx="3" fill="#EF4444" opacity="0.7" />
            <text x="82" y="97" fontSize="6" fill="#64748B">Low risk</text>
            <text x="344" y="97" textAnchor="end" fontSize="6" fill="#64748B">High risk</text>

            {/* Table header */}
            <rect x="82" y="104" width="268" height="14" rx="3" fill="#1E293B" />
            <text x="90" y="114" fontSize="6" fill="#64748B">STATUS</text>
            <text x="132" y="114" fontSize="6" fill="#64748B">COMPANY</text>
            <text x="182" y="114" fontSize="6" fill="#64748B">SUBJECT</text>
            <text x="294" y="114" fontSize="6" fill="#64748B">CONFIDENCE</text>

            {/* Table rows */}
            <rect x="82" y="122" width="268" height="13" rx="2" fill="rgba(255,255,255,0.02)" />
            <rect x="82" y="139" width="268" height="13" rx="2" fill="rgba(255,255,255,0.02)" />
            <rect x="82" y="156" width="268" height="13" rx="2" fill="rgba(255,255,255,0.02)" />
            <rect x="82" y="173" width="268" height="13" rx="2" fill="rgba(255,255,255,0.02)" />
            <rect x="82" y="190" width="268" height="13" rx="2" fill="rgba(255,255,255,0.02)" />

            {/* Status badges */}
            <rect x="84" y="125" width="28" height="7" rx="3" fill="#16A34A" opacity="0.8" />
            <rect x="84" y="142" width="28" height="7" rx="3" fill="#16A34A" opacity="0.8" />
            <rect x="84" y="159" width="28" height="7" rx="3" fill="#DC2626" opacity="0.8" />
            <rect x="84" y="176" width="28" height="7" rx="3" fill="#16A34A" opacity="0.8" />
            <rect x="84" y="193" width="28" height="7" rx="3" fill="#D97706" opacity="0.8" />
            <text x="98" y="131" textAnchor="middle" fontSize="5" fill="#FFFFFF">auto</text>
            <text x="98" y="148" textAnchor="middle" fontSize="5" fill="#FFFFFF">auto</text>
            <text x="98" y="165" textAnchor="middle" fontSize="5" fill="#FFFFFF">escalate</text>
            <text x="98" y="182" textAnchor="middle" fontSize="5" fill="#FFFFFF">auto</text>
            <text x="98" y="199" textAnchor="middle" fontSize="5" fill="#FFFFFF">review</text>

            {/* Company tags */}
            <rect x="132" y="125" width="32" height="7" rx="3" fill="#334155" />
            <rect x="132" y="142" width="24" height="7" rx="3" fill="#334155" />
            <rect x="132" y="159" width="28" height="7" rx="3" fill="#334155" />
            <rect x="132" y="176" width="32" height="7" rx="3" fill="#334155" />
            <rect x="132" y="193" width="20" height="7" rx="3" fill="#334155" />
            <text x="148" y="131" textAnchor="middle" fontSize="5" fill="#94A3B8">HackerRank</text>
            <text x="144" y="148" textAnchor="middle" fontSize="5" fill="#94A3B8">Claude</text>
            <text x="146" y="165" textAnchor="middle" fontSize="5" fill="#94A3B8">Visa</text>
            <text x="148" y="182" textAnchor="middle" fontSize="5" fill="#94A3B8">HackerRank</text>
            <text x="142" y="199" textAnchor="middle" fontSize="5" fill="#94A3B8">Claude</text>

            {/* Subject lines */}
            <rect x="175" y="126" width="80" height="5" rx="2" fill="#475569" />
            <rect x="175" y="143" width="65" height="5" rx="2" fill="#475569" />
            <rect x="175" y="160" width="90" height="5" rx="2" fill="#475569" />
            <rect x="175" y="177" width="72" height="5" rx="2" fill="#475569" />
            <rect x="175" y="194" width="58" height="5" rx="2" fill="#475569" />

            {/* Confidence bars */}
            <rect x="294" y="126" width="50" height="5" rx="2" fill="#1E293B" />
            <rect x="294" y="126" width="38" height="5" rx="2" fill="#22C55E" opacity="0.7" />
            <rect x="294" y="143" width="50" height="5" rx="2" fill="#1E293B" />
            <rect x="294" y="143" width="42" height="5" rx="2" fill="#22C55E" opacity="0.7" />
            <rect x="294" y="160" width="50" height="5" rx="2" fill="#1E293B" />
            <rect x="294" y="160" width="46" height="5" rx="2" fill="#EF4444" opacity="0.7" />
            <rect x="294" y="177" width="50" height="5" rx="2" fill="#1E293B" />
            <rect x="294" y="177" width="30" height="5" rx="2" fill="#22C55E" opacity="0.7" />
            <rect x="294" y="194" width="50" height="5" rx="2" fill="#1E293B" />
            <rect x="294" y="194" width="26" height="5" rx="2" fill="#D97706" opacity="0.7" />
          </svg>
        </div>
      </div>

      <div
        style={{
          position: "absolute", bottom: "6vh", left: "6vw", right: "6vw",
          display: "flex", justifyContent: "space-between", alignItems: "center",
        }}
      >
        <div style={{ fontSize: "1vw", fontWeight: 500, color: "#1D1D1F" }}>06</div>
        <div style={{ fontSize: "0.9vw", fontWeight: 400, color: "#86868B", letterSpacing: "0.02em" }}>HackerRank Orchestrate Hackathon / 2026</div>
        <div style={{ width: "1vw" }} />
      </div>
    </div>
  );
}
