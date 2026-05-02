export default function Slide2Hero() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#0A0F1E",
        fontFamily: "'Inter', sans-serif",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Subtle grid background */}
      <svg style={{ position: "absolute", inset: 0, opacity: 0.035, pointerEvents: "none" }} width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#FFFFFF" strokeWidth="0.8"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Blue glow accent top-right */}
      <div style={{
        position: "absolute",
        top: "-15vh",
        right: "-8vw",
        width: "50vw",
        height: "55vh",
        background: "radial-gradient(ellipse at center, rgba(0,122,255,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Blue glow accent bottom-left */}
      <div style={{
        position: "absolute",
        bottom: "-10vh",
        left: "-5vw",
        width: "40vw",
        height: "45vh",
        background: "radial-gradient(ellipse at center, rgba(0,122,255,0.10) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Header bar */}
      <div style={{
        padding: "5vh 6vw 0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        position: "relative",
        zIndex: 2,
      }}>
        <div style={{ fontSize: "1.2vw", fontWeight: 400, color: "rgba(255,255,255,0.4)" }}>triageops</div>
        <div style={{ fontSize: "1.2vw", fontWeight: 400, color: "rgba(255,255,255,0.3)" }}>HackerRank Orchestrate 2026</div>
      </div>

      {/* Two-column layout */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        padding: "0 6vw",
        gap: "5vw",
        position: "relative",
        zIndex: 2,
      }}>

        {/* Left: Hero text */}
        <div style={{ flex: "0 0 42%", display: "flex", flexDirection: "column" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.8vw",
            marginBottom: "3vh",
          }}>
            <div style={{ width: "0.5vw", height: "0.5vw", borderRadius: "50%", backgroundColor: "#22C55E" }} />
            <div style={{ fontSize: "1vw", fontWeight: 500, color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Live System
            </div>
          </div>

          <h2 style={{
            fontSize: "5.5vw",
            fontWeight: 200,
            letterSpacing: "-0.05em",
            margin: "0 0 3vh 0",
            lineHeight: 1.0,
            color: "#FFFFFF",
          }}>
            Triage<span style={{ color: "#007AFF" }}>Ops</span>
          </h2>

          <p style={{
            fontSize: "1.5vw",
            fontWeight: 300,
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.6,
            letterSpacing: "-0.01em",
            marginBottom: "4.5vh",
            maxWidth: "36vw",
          }}>
            Processes support tickets for HackerRank, Claude, and Visa — classifying, retrieving context, generating grounded responses, and escalating automatically.
          </p>

          {/* Stat pills */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5vh" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1.5vw" }}>
              <div style={{ width: "2.5vw", height: "2.5vw", borderRadius: "0.6vw", backgroundColor: "rgba(0,122,255,0.15)", border: "1px solid rgba(0,122,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg viewBox="0 0 20 20" style={{ width: "1.2vw", height: "1.2vw" }} fill="none">
                  <rect x="3" y="3" width="14" height="14" rx="2" stroke="#007AFF" strokeWidth="1.5"/>
                  <line x1="7" y1="8" x2="13" y2="8" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="7" y1="11" x2="11" y2="11" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "1.3vw", fontWeight: 600, color: "#FFFFFF" }}>Batch CSV Processing</div>
                <div style={{ fontSize: "1.1vw", fontWeight: 400, color: "rgba(255,255,255,0.4)" }}>Upload hundreds of tickets at once</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.5vw" }}>
              <div style={{ width: "2.5vw", height: "2.5vw", borderRadius: "0.6vw", backgroundColor: "rgba(0,122,255,0.15)", border: "1px solid rgba(0,122,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg viewBox="0 0 20 20" style={{ width: "1.2vw", height: "1.2vw" }} fill="none">
                  <circle cx="10" cy="10" r="7" stroke="#007AFF" strokeWidth="1.5"/>
                  <path d="M10 6.5 L10 10 L13 12" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "1.3vw", fontWeight: 600, color: "#FFFFFF" }}>Sub-2s Response Time</div>
                <div style={{ fontSize: "1.1vw", fontWeight: 400, color: "rgba(255,255,255,0.4)" }}>End-to-end triage latency</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1.5vw" }}>
              <div style={{ width: "2.5vw", height: "2.5vw", borderRadius: "0.6vw", backgroundColor: "rgba(0,122,255,0.15)", border: "1px solid rgba(0,122,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg viewBox="0 0 20 20" style={{ width: "1.2vw", height: "1.2vw" }} fill="none">
                  <path d="M4 14 L8 10 L11 13 L16 7" stroke="#007AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: "1.3vw", fontWeight: 600, color: "#FFFFFF" }}>78% Auto-Reply Rate</div>
                <div style={{ fontSize: "1.1vw", fontWeight: 400, color: "rgba(255,255,255,0.4)" }}>Only 22% escalated to humans</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Dashboard mock */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <svg viewBox="0 0 480 330" style={{ width: "100%", height: "auto", filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.7))" }}>
            {/* Window frame */}
            <rect x="0" y="0" width="480" height="330" rx="12" fill="#0F172A" />
            {/* Chrome bar */}
            <rect x="0" y="0" width="480" height="34" rx="12" fill="#1E293B" />
            <rect x="0" y="24" width="480" height="10" fill="#1E293B" />
            {/* Traffic lights */}
            <circle cx="18" cy="17" r="5.5" fill="#EF4444" opacity="0.85" />
            <circle cx="34" cy="17" r="5.5" fill="#F59E0B" opacity="0.85" />
            <circle cx="50" cy="17" r="5.5" fill="#22C55E" opacity="0.85" />
            {/* URL bar */}
            <rect x="100" y="9" width="160" height="16" rx="8" fill="#334155" />
            <text x="180" y="20" textAnchor="middle" fontSize="7" fill="#64748B">triageops / dashboard</text>

            {/* Sidebar */}
            <rect x="0" y="34" width="82" height="296" fill="#1E293B" />
            {/* Sidebar brand */}
            <rect x="10" y="48" width="62" height="10" rx="5" fill="#3B82F6" />
            <text x="41" y="56.5" textAnchor="middle" fontSize="6.5" fill="#FFFFFF" fontWeight="600">TriageOps</text>
            {/* Nav items */}
            <rect x="0" y="72" width="3" height="14" rx="1" fill="#3B82F6" />
            <rect x="10" y="73" width="8" height="8" rx="2" fill="#3B82F6" opacity="0.7" />
            <rect x="22" y="75" width="48" height="5" rx="2" fill="#3B82F6" opacity="0.5" />
            <rect x="10" y="93" width="8" height="8" rx="2" fill="#334155" />
            <rect x="22" y="95" width="36" height="5" rx="2" fill="#334155" />
            <rect x="10" y="113" width="8" height="8" rx="2" fill="#334155" />
            <rect x="22" y="115" width="42" height="5" rx="2" fill="#334155" />
            <rect x="10" y="133" width="8" height="8" rx="2" fill="#334155" />
            <rect x="22" y="135" width="38" height="5" rx="2" fill="#334155" />

            {/* Main content */}
            <rect x="82" y="34" width="398" height="296" fill="#0F172A" />

            {/* Page title */}
            <text x="96" y="56" fontSize="12" fontWeight="300" fill="#FFFFFF" letterSpacing="-0.5">Command</text>
            <text x="144" y="56" fontSize="12" fontWeight="600" fill="#3B82F6" letterSpacing="-0.5"> Center</text>

            {/* Stat cards row */}
            <rect x="96" y="64" width="84" height="40" rx="6" fill="#1E293B" />
            <rect x="188" y="64" width="84" height="40" rx="6" fill="#1E293B" />
            <rect x="280" y="64" width="84" height="40" rx="6" fill="#1E293B" />
            <rect x="372" y="64" width="96" height="40" rx="6" fill="#1E293B" />
            {/* Stat values */}
            <text x="138" y="80" textAnchor="middle" fontSize="13" fontWeight="200" fill="#FFFFFF">20</text>
            <text x="138" y="97" textAnchor="middle" fontSize="6.5" fill="#64748B">Total Tickets</text>
            <text x="230" y="80" textAnchor="middle" fontSize="13" fontWeight="200" fill="#22C55E">16</text>
            <text x="230" y="97" textAnchor="middle" fontSize="6.5" fill="#64748B">Auto-replied</text>
            <text x="322" y="80" textAnchor="middle" fontSize="13" fontWeight="200" fill="#EF4444">4</text>
            <text x="322" y="97" textAnchor="middle" fontSize="6.5" fill="#64748B">Escalated</text>
            <text x="420" y="80" textAnchor="middle" fontSize="13" fontWeight="200" fill="#3B82F6">0.42</text>
            <text x="420" y="97" textAnchor="middle" fontSize="6.5" fill="#64748B">Avg Confidence</text>

            {/* Risk distribution label */}
            <text x="96" y="120" fontSize="7" fill="#64748B" letterSpacing="0.5">RISK DISTRIBUTION</text>
            {/* Risk bar track */}
            <rect x="96" y="125" width="368" height="8" rx="4" fill="#1E293B" />
            {/* Low risk */}
            <rect x="96" y="125" width="200" height="8" rx="4" fill="#22C55E" opacity="0.75" />
            {/* Medium risk */}
            <rect x="296" y="125" width="90" height="8" fill="#F59E0B" opacity="0.75" />
            {/* High risk */}
            <rect x="386" y="125" width="78" height="8" rx="4" fill="#EF4444" opacity="0.75" />
            <text x="96" y="141" fontSize="6" fill="#64748B">Low</text>
            <text x="334" y="141" textAnchor="middle" fontSize="6" fill="#64748B">Medium</text>
            <text x="464" y="141" textAnchor="end" fontSize="6" fill="#64748B">High</text>

            {/* Table header */}
            <rect x="96" y="148" width="368" height="14" rx="3" fill="#1E293B" />
            <text x="104" y="157.5" fontSize="6" fill="#475569" letterSpacing="0.5">STATUS</text>
            <text x="160" y="157.5" fontSize="6" fill="#475569" letterSpacing="0.5">COMPANY</text>
            <text x="220" y="157.5" fontSize="6" fill="#475569" letterSpacing="0.5">SUBJECT</text>
            <text x="360" y="157.5" fontSize="6" fill="#475569" letterSpacing="0.5">CONFIDENCE</text>
            <text x="430" y="157.5" fontSize="6" fill="#475569" letterSpacing="0.5">TIME</text>

            {/* Table rows */}
            {/* Row 1 */}
            <rect x="96" y="166" width="368" height="16" rx="2" fill="rgba(255,255,255,0.02)" />
            <rect x="100" y="169" width="36" height="9" rx="4" fill="#16A34A" opacity="0.85" />
            <text x="118" y="175.5" textAnchor="middle" fontSize="5.5" fill="#FFFFFF">Auto-reply</text>
            <rect x="157" y="169" width="44" height="9" rx="4" fill="#1E3A5F" />
            <text x="179" y="175.5" textAnchor="middle" fontSize="5.5" fill="#60A5FA">HackerRank</text>
            <rect x="216" y="171" width="110" height="5" rx="2" fill="#334155" />
            <rect x="360" y="169" width="60" height="9" rx="2" fill="#1E293B" />
            <rect x="360" y="169" width="42" height="9" rx="2" fill="#22C55E" opacity="0.6" />
            <text x="380" y="175.5" textAnchor="middle" fontSize="5.5" fill="#FFFFFF">0.67</text>
            <text x="440" y="175.5" fontSize="5.5" fill="#475569">0.8s</text>

            {/* Row 2 */}
            <rect x="96" y="185" width="368" height="16" rx="2" fill="rgba(255,255,255,0.02)" />
            <rect x="100" y="188" width="36" height="9" rx="4" fill="#16A34A" opacity="0.85" />
            <text x="118" y="194.5" textAnchor="middle" fontSize="5.5" fill="#FFFFFF">Auto-reply</text>
            <rect x="157" y="188" width="30" height="9" rx="4" fill="#1E2D3D" />
            <text x="172" y="194.5" textAnchor="middle" fontSize="5.5" fill="#93C5FD">Claude</text>
            <rect x="216" y="190" width="88" height="5" rx="2" fill="#334155" />
            <rect x="360" y="188" width="60" height="9" rx="2" fill="#1E293B" />
            <rect x="360" y="188" width="48" height="9" rx="2" fill="#22C55E" opacity="0.6" />
            <text x="380" y="194.5" textAnchor="middle" fontSize="5.5" fill="#FFFFFF">0.71</text>
            <text x="440" y="194.5" fontSize="5.5" fill="#475569">1.1s</text>

            {/* Row 3 — escalated */}
            <rect x="96" y="204" width="368" height="16" rx="2" fill="rgba(239,68,68,0.04)" />
            <rect x="100" y="207" width="36" height="9" rx="4" fill="#DC2626" opacity="0.85" />
            <text x="118" y="213.5" textAnchor="middle" fontSize="5.5" fill="#FFFFFF">Escalated</text>
            <rect x="157" y="207" width="22" height="9" rx="4" fill="#1E1A2E" />
            <text x="168" y="213.5" textAnchor="middle" fontSize="5.5" fill="#C4B5FD">Visa</text>
            <rect x="216" y="209" width="120" height="5" rx="2" fill="#334155" />
            <rect x="360" y="207" width="60" height="9" rx="2" fill="#1E293B" />
            <rect x="360" y="207" width="18" height="9" rx="2" fill="#EF4444" opacity="0.6" />
            <text x="380" y="213.5" textAnchor="middle" fontSize="5.5" fill="#FFFFFF">0.21</text>
            <text x="440" y="213.5" fontSize="5.5" fill="#475569">1.4s</text>

            {/* Row 4 */}
            <rect x="96" y="223" width="368" height="16" rx="2" fill="rgba(255,255,255,0.02)" />
            <rect x="100" y="226" width="36" height="9" rx="4" fill="#16A34A" opacity="0.85" />
            <text x="118" y="232.5" textAnchor="middle" fontSize="5.5" fill="#FFFFFF">Auto-reply</text>
            <rect x="157" y="226" width="44" height="9" rx="4" fill="#1E3A5F" />
            <text x="179" y="232.5" textAnchor="middle" fontSize="5.5" fill="#60A5FA">HackerRank</text>
            <rect x="216" y="228" width="74" height="5" rx="2" fill="#334155" />
            <rect x="360" y="226" width="60" height="9" rx="2" fill="#1E293B" />
            <rect x="360" y="226" width="36" height="9" rx="2" fill="#22C55E" opacity="0.6" />
            <text x="380" y="232.5" textAnchor="middle" fontSize="5.5" fill="#FFFFFF">0.55</text>
            <text x="440" y="232.5" fontSize="5.5" fill="#475569">0.9s</text>

            {/* Row 5 — escalated */}
            <rect x="96" y="242" width="368" height="16" rx="2" fill="rgba(239,68,68,0.04)" />
            <rect x="100" y="245" width="36" height="9" rx="4" fill="#DC2626" opacity="0.85" />
            <text x="118" y="251.5" textAnchor="middle" fontSize="5.5" fill="#FFFFFF">Escalated</text>
            <rect x="157" y="245" width="30" height="9" rx="4" fill="#1E2D3D" />
            <text x="172" y="251.5" textAnchor="middle" fontSize="5.5" fill="#93C5FD">Claude</text>
            <rect x="216" y="247" width="96" height="5" rx="2" fill="#334155" />
            <rect x="360" y="245" width="60" height="9" rx="2" fill="#1E293B" />
            <rect x="360" y="245" width="12" height="9" rx="2" fill="#EF4444" opacity="0.6" />
            <text x="380" y="251.5" textAnchor="middle" fontSize="5.5" fill="#FFFFFF">0.18</text>
            <text x="440" y="251.5" fontSize="5.5" fill="#475569">1.7s</text>

            {/* Row 6 */}
            <rect x="96" y="261" width="368" height="16" rx="2" fill="rgba(255,255,255,0.02)" />
            <rect x="100" y="264" width="36" height="9" rx="4" fill="#16A34A" opacity="0.85" />
            <text x="118" y="270.5" textAnchor="middle" fontSize="5.5" fill="#FFFFFF">Auto-reply</text>
            <rect x="157" y="264" width="22" height="9" rx="4" fill="#1E1A2E" />
            <text x="168" y="270.5" textAnchor="middle" fontSize="5.5" fill="#C4B5FD">Visa</text>
            <rect x="216" y="266" width="82" height="5" rx="2" fill="#334155" />
            <rect x="360" y="264" width="60" height="9" rx="2" fill="#1E293B" />
            <rect x="360" y="264" width="30" height="9" rx="2" fill="#F59E0B" opacity="0.7" />
            <text x="380" y="270.5" textAnchor="middle" fontSize="5.5" fill="#FFFFFF">0.46</text>
            <text x="440" y="270.5" fontSize="5.5" fill="#475569">1.2s</text>

            {/* Bottom action bar */}
            <rect x="96" y="285" width="368" height="34" rx="6" fill="#1E293B" />
            <rect x="104" y="293" width="80" height="18" rx="5" fill="#3B82F6" />
            <text x="144" y="304.5" textAnchor="middle" fontSize="7" fill="#FFFFFF" fontWeight="500">Run Triage</text>
            <rect x="194" y="293" width="80" height="18" rx="5" fill="#334155" />
            <text x="234" y="304.5" textAnchor="middle" fontSize="7" fill="#94A3B8">Upload CSV</text>
            <rect x="374" y="295" width="14" height="14" rx="3" fill="#334155" />
            <rect x="394" y="295" width="14" height="14" rx="3" fill="#334155" />
            <rect x="414" y="295" width="14" height="14" rx="3" fill="#334155" />
            <rect x="434" y="295" width="22" height="14" rx="3" fill="#1E3A5F" />
            <text x="445" y="304" textAnchor="middle" fontSize="6" fill="#60A5FA">Live</text>
          </svg>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: "0 6vw 5vh",
        display: "flex",
        justifyContent: "center",
        position: "relative",
        zIndex: 2,
      }}>
        <div style={{ fontSize: "1vw", fontWeight: 400, color: "rgba(255,255,255,0.25)", letterSpacing: "0.02em" }}>
          HackerRank Orchestrate Hackathon / 2026
        </div>
      </div>
    </div>
  );
}
