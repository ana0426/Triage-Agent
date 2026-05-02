import React from "react";
import { 
  ShieldCheck, 
  FileText, 
  Clock, 
  TrendingUp, 
  Database, 
  Building2, 
  BarChart2, 
  ArrowRight, 
  Zap,
  Terminal
} from "lucide-react";

export function FeatureGrid() {
  const features = [
    {
      title: "Batch CSV Upload",
      description: "Process thousands of tickets instantly with our high-throughput batching system.",
      icon: <FileText className="w-5 h-5 text-blue-400" />
    },
    {
      title: "Sub-2s Triage",
      description: "Lightning fast classification and routing decisions powered by optimized models.",
      icon: <Clock className="w-5 h-5 text-blue-400" />
    },
    {
      title: "78% Auto-Reply",
      description: "Dramatically reduce human agent workload with confident automated resolutions.",
      icon: <TrendingUp className="w-5 h-5 text-blue-400" />
    },
    {
      title: "RAG Retrieval",
      description: "Deep context extraction from enterprise wikis and knowledge bases.",
      icon: <Database className="w-5 h-5 text-blue-400" />
    },
    {
      title: "Multi-Domain",
      description: "Seamlessly handles context switching across HackerRank, Claude, and Visa.",
      icon: <Building2 className="w-5 h-5 text-blue-400" />
    },
    {
      title: "Confidence Scoring",
      description: "Transparent risk assessment engine to safely flag escalations.",
      icon: <BarChart2 className="w-5 h-5 text-blue-400" />
    }
  ];

  return (
    <div 
      className="min-h-screen text-slate-200 font-sans flex flex-col relative overflow-hidden"
      style={{ backgroundColor: "#0A0F1E" }}
    >
      {/* Background glow effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      {/* Navbar */}
      <header className="relative z-10 border-b border-slate-800/60 bg-[#0A0F1E]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white">TriageOps</span>
          </div>
          <button className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2">
            Open Dashboard <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex items-center py-12 lg:py-0">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              <span>Enterprise AI Support Agent</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Resolve support tickets at scale.
            </h1>
            
            <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
              The autonomous triage engine for HackerRank, Claude, and Visa. Route, retrieve, and resolve with unprecedented accuracy and speed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                Deploy Engine <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-6 py-3.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-white font-medium transition-all flex items-center justify-center gap-2 backdrop-blur-sm">
                <Terminal className="w-5 h-5 text-slate-400" /> View Architecture
              </button>
            </div>
          </div>

          {/* Right Column: Feature Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
              {features.map((feature, idx) => (
                <div 
                  key={idx}
                  className="group relative p-6 rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
                  style={{ 
                    backgroundColor: "rgba(30, 41, 59, 0.4)",
                    backdropFilter: "blur(12px)"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10 flex flex-col gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
                      {feature.icon}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/60 py-6 bg-[#0A0F1E]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            System Operational
          </div>
          <p>Built for the Enterprise AI Support Hackathon</p>
        </div>
      </footer>
    </div>
  );
}

export default FeatureGrid;
