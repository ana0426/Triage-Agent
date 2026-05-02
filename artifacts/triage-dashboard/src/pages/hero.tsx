import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Terminal, ArrowRight, Zap, ShieldCheck } from "lucide-react";

export default function Hero() {
  const [lines, setLines] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setLines((prev) => (prev < 12 ? prev + 1 : prev));
    }, 800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const terminalLogs = [
    { time: "12:41:03", text: "ticket #T-2847 ingested", entity: "HackerRank", type: "info" },
    { time: "12:41:03", text: "▸ classified: billing_inquiry", extra: "(high confidence)", type: "step" },
    { time: "12:41:04", text: "▸ retrieving context...", extra: "5 chunks found", type: "step" },
    { time: "12:41:04", text: "▸ generating response via gpt-4o-mini", type: "step" },
    { time: "12:41:04", icon: "✓", text: "auto-replied", extra: "(confidence: 0.67, 0.8s)", type: "success" },
    { time: "12:41:05", text: "ticket #T-2848 ingested", entity: "Visa", type: "info" },
    { time: "12:41:05", text: "▸ classified: fraud_dispute", extra: "(low confidence)", type: "step" },
    { time: "12:41:06", text: "▸ escalating to human agent", type: "step" },
    { time: "12:41:06", icon: "⚠", text: "escalated", extra: "(confidence: 0.21, 1.4s)", type: "warning" },
    { time: "12:41:07", text: "ticket #T-2849 ingested", entity: "Claude", type: "info" },
    { time: "12:41:07", text: "▸ classified: api_access", extra: "(high confidence)", type: "step" },
    { time: "12:41:08", text: "▸ retrieving context...", extra: "12 chunks found", type: "step" },
  ];

  return (
    <div
      className="terminal-hero-wrapper min-h-screen font-sans text-slate-300 flex flex-col relative overflow-hidden"
      style={{ backgroundColor: "#0A0F1E" }}
    >
      <style>{`
        .terminal-hero-wrapper .bg-grid {
          background-size: 40px 40px;
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
          mask-image: linear-gradient(to bottom, white 40%, transparent 100%);
        }
        .terminal-hero-wrapper .cursor-blink {
          animation: thero-blink 1s step-end infinite;
        }
        @keyframes thero-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        .terminal-hero-wrapper .terminal-glow {
          box-shadow: 0 0 40px rgba(34,197,94,0.10), inset 0 0 20px rgba(34,197,94,0.05);
        }
        @keyframes thero-logSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .terminal-hero-wrapper .log-line {
          animation: thero-logSlideIn 0.3s ease-out both;
        }
        .terminal-hero-wrapper .terminal-scroll {
          overflow-y: auto;
          scroll-behavior: smooth;
        }
        .terminal-hero-wrapper .terminal-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .terminal-hero-wrapper .terminal-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .terminal-hero-wrapper .terminal-scroll::-webkit-scrollbar-thumb {
          background: rgba(34, 197, 94, 0.2);
          border-radius: 2px;
        }
      `}</style>

      {/* Background grid */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 text-white font-medium text-lg tracking-tight">
          <Terminal className="w-6 h-6 text-green-400" />
          <span>TriageOps</span>
        </div>
        <Link href="/dashboard">
          <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2 px-4 py-2 rounded-md hover:bg-white/5 border border-transparent hover:border-white/10">
            Open Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center px-8 py-12 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16 w-full">

          {/* Left column */}
          <div className="w-full lg:w-[45%] flex flex-col items-start gap-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium border border-blue-500/20">
                <Zap className="w-4 h-4" />
                <span>Enterprise AI Agent</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-light text-white leading-[1.1] tracking-tight">
                TriageOps
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed max-w-md">
                Autonomous support triage for enterprise. Classify, resolve, and escalate tickets in milliseconds.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/dashboard">
                <button className="px-6 py-3 rounded-md bg-white text-slate-900 font-medium hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
                  Launch Dashboard <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/corpus">
                <button className="px-6 py-3 rounded-md bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-400" />
                  View Knowledge Base
                </button>
              </Link>
            </div>

            <div className="pt-8 border-t border-white/10 flex items-center gap-4 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                22 docs indexed
              </span>
              <span>·</span>
              <span>3 companies</span>
              <span>·</span>
              <span>&lt;2s latency</span>
            </div>
          </div>

          {/* Right column — live terminal */}
          <div className="w-full lg:w-[55%] relative group">
            <div className="absolute -inset-1 bg-gradient-to-b from-green-500/20 to-blue-500/20 rounded-xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000" />

            <div className="relative rounded-xl overflow-hidden bg-[#050811] border border-green-500/20 terminal-glow">
              {/* Terminal header */}
              <div className="flex items-center px-4 py-3 bg-[#0a0f1e]/80 border-b border-green-500/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="mx-auto flex items-center gap-2 text-xs font-mono text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  triage-agent — live
                </div>
              </div>

              {/* Terminal body — scrollable, auto-scrolls to bottom */}
              <div ref={scrollRef} className="p-6 font-mono text-sm leading-loose h-[400px] terminal-scroll">
                <div className="flex flex-col gap-1">
                  {terminalLogs.slice(0, Math.max(1, lines)).map((log, i) => (
                    <div key={i} className="log-line flex gap-3 items-start">
                      <span className="text-slate-600 shrink-0">[{log.time}]</span>
                      <span className="flex-1 break-all">
                        {log.icon && (
                          <span className={`mr-2 ${log.type === "success" ? "text-green-500" : "text-orange-500"}`}>
                            {log.icon}
                          </span>
                        )}
                        <span className={
                          log.type === "info"    ? "text-slate-300" :
                          log.type === "step"    ? "text-slate-400" :
                          log.type === "success" ? "text-green-400" :
                          "text-orange-400"
                        }>
                          {log.text}
                        </span>
                        {log.entity && (
                          <span className="text-blue-400 ml-2">({log.entity})</span>
                        )}
                        {log.extra && (
                          <span className={`ml-2 ${
                            log.extra.includes("high") ? "text-green-500/70" :
                            log.extra.includes("low")  ? "text-orange-500/70" :
                            "text-slate-500"
                          }`}>
                            {log.extra}
                          </span>
                        )}
                      </span>
                    </div>
                  ))}
                  {/* Blinking cursor */}
                  <div className="log-line flex gap-3 mt-1">
                    <span className="text-slate-600 shrink-0">
                      [{terminalLogs[Math.min(terminalLogs.length - 1, Math.max(0, lines - 1))].time}]
                    </span>
                    <span className="w-2.5 h-4 bg-green-500/70 inline-block cursor-blink mt-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center py-6 text-xs font-mono text-slate-600 border-t border-white/5">
        powered by gpt-4o-mini · vector search · node.js · HackerRank Orchestrate 2026
      </footer>
    </div>
  );
}
