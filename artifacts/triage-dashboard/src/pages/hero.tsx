import { Link } from "wouter";
import { ShieldCheck, ArrowRight, FileText, Clock, TrendingUp, Zap } from "lucide-react";

export default function Hero() {
  return (
    <div
      className="min-h-screen w-full overflow-hidden relative flex flex-col"
      style={{ backgroundColor: "#0A0F1E", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Subtle grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>

      {/* Blue glow — top right */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-20%",
          right: "-8%",
          width: "55vw",
          height: "60vh",
          background: "radial-gradient(ellipse at center, rgba(59,130,246,0.20) 0%, transparent 68%)",
        }}
      />
      {/* Blue glow — bottom left */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%",
          left: "-5%",
          width: "40vw",
          height: "45vh",
          background: "radial-gradient(ellipse at center, rgba(59,130,246,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Nav bar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <ShieldCheck size={18} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-sm text-white tracking-tight">TriageOps</span>
            <span className="text-xs text-white/30 ml-2">AI Support Triage</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            Live System
          </div>
          <Link href="/dashboard">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors">
              Open Dashboard
              <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero body */}
      <div className="relative z-10 flex flex-1 items-center px-8 py-8 gap-8">

        {/* Left: headline + features */}
        <div className="flex-none w-[44%] flex flex-col">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 self-start">
            <span className="w-2 h-2 rounded-full bg-green-400" />
            <span className="text-xs font-semibold text-white/50 tracking-widest uppercase">HackerRank Orchestrate 2026</span>
          </div>

          {/* Headline */}
          <h1
            className="font-thin text-white leading-none mb-4"
            style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", letterSpacing: "-0.04em" }}
          >
            Triage<span className="text-blue-500">Ops</span>
          </h1>

          {/* Subheadline */}
          <p className="text-white/50 font-light leading-relaxed mb-3" style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.2rem)" }}>
            AI-powered support triage for enterprise scale.
          </p>
          <p className="text-white/35 font-light leading-relaxed mb-8" style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)" }}>
            Processes tickets for HackerRank, Claude, and Visa — classifying, retrieving context from 22 corpus documents, generating grounded LLM responses, and escalating automatically based on confidence scoring.
          </p>

          {/* Feature rows */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-start gap-4">
              <div
                className="flex-none w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{ backgroundColor: "rgba(59,130,246,0.12)", borderColor: "rgba(59,130,246,0.25)" }}
              >
                <FileText size={16} className="text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Batch CSV Processing</div>
                <div className="text-xs text-white/40 mt-0.5 leading-relaxed">Upload hundreds of tickets at once. Example presets included for HackerRank, Claude, and Visa.</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="flex-none w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{ backgroundColor: "rgba(59,130,246,0.12)", borderColor: "rgba(59,130,246,0.25)" }}
              >
                <Clock size={16} className="text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Sub-2s Response Time</div>
                <div className="text-xs text-white/40 mt-0.5 leading-relaxed">End-to-end latency from submission to grounded AI reply. BM25 + TF-IDF hybrid retrieval over 22 documents.</div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="flex-none w-10 h-10 rounded-xl flex items-center justify-center border"
                style={{ backgroundColor: "rgba(59,130,246,0.12)", borderColor: "rgba(59,130,246,0.25)" }}
              >
                <TrendingUp size={16} className="text-blue-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">78% Auto-Reply Rate</div>
                <div className="text-xs text-white/40 mt-0.5 leading-relaxed">Only 22% of tickets escalated to human agents. Confidence-score threshold is tunable per domain.</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-blue-500/25">
                <Zap size={15} />
                Launch Dashboard
              </button>
            </Link>
            <Link href="/corpus">
              <button className="px-6 py-3 text-white/50 hover:text-white text-sm font-medium rounded-xl border border-white/10 hover:border-white/20 transition-colors">
                View Knowledge Base
              </button>
            </Link>
          </div>

          {/* Stats strip */}
          <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/5">
            <div>
              <div className="text-xl font-thin text-blue-400" style={{ letterSpacing: "-0.03em" }}>22</div>
              <div className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">Corpus Docs</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className="text-xl font-thin text-white" style={{ letterSpacing: "-0.03em" }}>3</div>
              <div className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">Companies</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className="text-xl font-thin text-white" style={{ letterSpacing: "-0.03em" }}>Top 5</div>
              <div className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">Chunks / Ticket</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className="text-xl font-thin text-blue-400" style={{ letterSpacing: "-0.03em" }}>&lt;2s</div>
              <div className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">Avg Response</div>
            </div>
          </div>
        </div>

        {/* Right: dashboard screenshot mock */}
        <div className="flex-1 flex items-center justify-end">
          <svg
            viewBox="0 0 520 380"
            className="w-full h-auto"
            style={{ filter: "drop-shadow(0 24px 64px rgba(0,0,0,0.75))", maxWidth: "640px" }}
          >
            {/* Window frame */}
            <rect x="0" y="0" width="520" height="380" rx="12" fill="#0F172A" />
            {/* Gradient border */}
            <rect x="0" y="0" width="520" height="2" rx="1" fill="url(#topGrad)" />
            <defs>
              <linearGradient id="topGrad" x1="0" y1="0" x2="520" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                <stop offset="30%" stopColor="#3B82F6" />
                <stop offset="70%" stopColor="#6366F1" />
                <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Chrome bar */}
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
            <rect x="458" y="12" width="48" height="13" rx="6" fill="#14532D" />
            <circle cx="467" cy="18.5" r="3" fill="#22C55E" />
            <text x="483" y="22" textAnchor="middle" fontSize="6.5" fill="#22C55E">LIVE</text>

            {/* Sidebar */}
            <rect x="0" y="36" width="86" height="344" fill="#1E293B" />
            <rect x="8" y="48" width="70" height="14" rx="5" fill="#3B82F6" />
            <text x="43" y="58" textAnchor="middle" fontSize="7.5" fill="#FFFFFF" fontWeight="600">TriageOps</text>

            {/* Active nav indicator */}
            <rect x="0" y="76" width="3" height="16" rx="1" fill="#3B82F6" />
            <rect x="12" y="78" width="10" height="10" rx="2" fill="#3B82F6" opacity="0.5" />
            <text x="27" y="85" fontSize="7" fill="#3B82F6" fontWeight="500">Dashboard</text>
            <rect x="12" y="100" width="10" height="10" rx="2" fill="#334155" />
            <text x="27" y="107" fontSize="7" fill="#475569">Results</text>
            <rect x="12" y="122" width="10" height="10" rx="2" fill="#334155" />
            <text x="27" y="129" fontSize="7" fill="#475569">Knowledge</text>
            <rect x="12" y="144" width="10" height="10" rx="2" fill="#334155" />
            <text x="27" y="151" fontSize="7" fill="#475569">Logs</text>
            <line x1="12" y1="168" x2="74" y2="168" stroke="#334155" strokeWidth="0.5" />
            <text x="43" y="180" textAnchor="middle" fontSize="6" fill="#334155">v1.0.0</text>

            {/* Main content */}
            <rect x="86" y="36" width="434" height="344" fill="#0F172A" />

            {/* Page title */}
            <text x="100" y="57" fontSize="13" fontWeight="200" fill="#94A3B8">Command</text>
            <text x="168" y="57" fontSize="13" fontWeight="600" fill="#3B82F6"> Center</text>

            {/* Stat cards */}
            <rect x="100" y="64" width="92" height="46" rx="7" fill="#1E293B" />
            <rect x="200" y="64" width="92" height="46" rx="7" fill="#1E293B" />
            <rect x="300" y="64" width="92" height="46" rx="7" fill="#1E293B" />
            <rect x="400" y="64" width="108" height="46" rx="7" fill="#1E293B" />
            <text x="146" y="84" textAnchor="middle" fontSize="15" fontWeight="200" fill="#FFFFFF">20</text>
            <text x="146" y="103" textAnchor="middle" fontSize="6.5" fill="#64748B">Total Tickets</text>
            <text x="246" y="84" textAnchor="middle" fontSize="15" fontWeight="200" fill="#22C55E">16</text>
            <text x="246" y="103" textAnchor="middle" fontSize="6.5" fill="#64748B">Auto-replied</text>
            <text x="346" y="84" textAnchor="middle" fontSize="15" fontWeight="200" fill="#EF4444">4</text>
            <text x="346" y="103" textAnchor="middle" fontSize="6.5" fill="#64748B">Escalated</text>
            <text x="454" y="84" textAnchor="middle" fontSize="15" fontWeight="200" fill="#3B82F6">0.42</text>
            <text x="454" y="103" textAnchor="middle" fontSize="6.5" fill="#64748B">Avg Confidence</text>

            {/* Risk bar */}
            <text x="100" y="125" fontSize="7.5" fill="#475569" letterSpacing="0.8">RISK DISTRIBUTION</text>
            <rect x="100" y="130" width="408" height="10" rx="5" fill="#1E293B" />
            <rect x="100" y="130" width="245" height="10" rx="5" fill="#22C55E" opacity="0.7" />
            <rect x="345" y="130" width="82" height="10" fill="#F59E0B" opacity="0.7" />
            <rect x="427" y="130" width="81" height="10" rx="5" fill="#EF4444" opacity="0.7" />
            <text x="100" y="148" fontSize="6" fill="#64748B">Low risk (60%)</text>
            <text x="386" y="148" textAnchor="middle" fontSize="6" fill="#64748B">Med (20%)</text>
            <text x="508" y="148" textAnchor="end" fontSize="6" fill="#64748B">High (20%)</text>

            {/* Company bars */}
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

            {/* Action bar */}
            <rect x="100" y="300" width="408" height="40" rx="7" fill="#1E293B" />
            <rect x="108" y="309" width="90" height="22" rx="6" fill="#3B82F6" />
            <text x="153" y="322.5" textAnchor="middle" fontSize="8" fill="#FFFFFF" fontWeight="500">Run Triage</text>
            <rect x="206" y="309" width="80" height="22" rx="6" fill="#334155" />
            <text x="246" y="322.5" textAnchor="middle" fontSize="8" fill="#94A3B8">Upload CSV</text>
            <rect x="294" y="309" width="80" height="22" rx="6" fill="#334155" />
            <text x="334" y="322.5" textAnchor="middle" fontSize="8" fill="#94A3B8">Clear All</text>
            <rect x="424" y="313" width="76" height="14" rx="7" fill="#14532D" />
            <circle cx="433" cy="320" r="3.5" fill="#22C55E" />
            <text x="455" y="324" textAnchor="middle" fontSize="6.5" fill="#22C55E">Processing live</text>
          </svg>
        </div>
      </div>

      {/* Footer strip */}
      <div className="relative z-10 flex items-center justify-between px-8 py-4 border-t border-white/5">
        <div className="flex items-center gap-6">
          <span className="text-xs text-white/20">Python · Express · React · GPT-4o-mini</span>
        </div>
        <span className="text-xs text-white/20">HackerRank Orchestrate Hackathon · 2026</span>
      </div>
    </div>
  );
}
