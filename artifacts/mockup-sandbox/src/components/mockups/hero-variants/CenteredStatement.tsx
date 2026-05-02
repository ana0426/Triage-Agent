import React from "react";
import { ShieldCheck, ArrowRight, Zap } from "lucide-react";

export function CenteredStatement() {
  return (
    <div 
      className="relative min-h-screen w-full overflow-hidden text-slate-200 flex flex-col font-sans"
      style={{ backgroundColor: "#0A0F1E" }}
    >
      {/* Background Effects */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem',
        }}
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(30,58,138,0.1) 50%, rgba(10,15,30,0) 70%)'
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-white font-medium">
          <ShieldCheck className="w-6 h-6 text-blue-500" />
          <span>TriageOps</span>
        </div>
        <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2">
          Open Dashboard <ArrowRight className="w-4 h-4" />
        </button>
      </nav>

      {/* Main Hero Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 w-full max-w-5xl mx-auto text-center mt-[-4rem]">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-8">
          <Zap className="w-4 h-4" />
          <span>Now processing Claude & HackerRank tickets</span>
        </div>

        {/* Headline */}
        <h1 className="text-7xl md:text-9xl tracking-tighter font-light mb-6 text-white drop-shadow-sm">
          Triage<span className="text-blue-500 font-normal">Ops</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-slate-400 font-light max-w-2xl mx-auto mb-12">
          AI-powered support triage for enterprise scale.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.5)] flex items-center gap-2 text-lg">
            Launch Dashboard
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="px-8 py-4 bg-transparent hover:bg-white/5 border border-slate-700 hover:border-slate-500 text-slate-300 rounded-lg font-medium transition-colors text-lg">
            View Knowledge Base
          </button>
        </div>

        {/* Stats Strip */}
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 py-8 border-y border-slate-800/60 w-full max-w-4xl mx-auto backdrop-blur-sm bg-slate-900/20">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-semibold text-white">22</span>
            <span className="text-sm text-slate-500 uppercase tracking-wider mt-1">Corpus Docs</span>
          </div>
          <div className="w-px h-12 bg-slate-800/80 hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="text-3xl font-semibold text-white">3</span>
            <span className="text-sm text-slate-500 uppercase tracking-wider mt-1">Companies</span>
          </div>
          <div className="w-px h-12 bg-slate-800/80 hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="text-3xl font-semibold text-white">78%</span>
            <span className="text-sm text-slate-500 uppercase tracking-wider mt-1">Auto-Reply</span>
          </div>
          <div className="w-px h-12 bg-slate-800/80 hidden md:block" />
          <div className="flex flex-col items-center">
            <span className="text-3xl font-semibold text-white">&lt;2s</span>
            <span className="text-sm text-slate-500 uppercase tracking-wider mt-1">Response</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 border-t border-slate-800/50 text-center">
        <p className="text-sm text-slate-600 font-medium">
          Built with React • Tailwind CSS • OpenAI • Python
        </p>
      </footer>
    </div>
  );
}

export default CenteredStatement;