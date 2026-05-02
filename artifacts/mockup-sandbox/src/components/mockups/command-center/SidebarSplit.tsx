import React, { useState } from 'react';
import { Play, CheckCircle2, AlertCircle, MessageCircle, BarChart3, AlertTriangle, Info } from 'lucide-react';

export function SidebarSplit() {
  const [csvInput, setCsvInput] = useState('subject,issue,company\nLogin failed,Cannot login,Acme Corp');

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-200 font-sans overflow-hidden">
      {/* Left Sidebar */}
      <div className="w-[260px] flex-shrink-0 border-r border-slate-800 bg-[#1e293b] flex flex-col p-4 overflow-y-auto">
        <h1 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-500" />
          Triage Center
        </h1>

        <div className="space-y-4 mb-8">
          <div className="bg-[#0f172a] p-4 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium">Total Processed</span>
            </div>
            <div className="text-3xl font-bold text-white">20</div>
          </div>
          
          <div className="bg-[#0f172a] p-4 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <MessageCircle className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">Replied</span>
            </div>
            <div className="text-3xl font-bold text-white">16</div>
          </div>

          <div className="bg-[#0f172a] p-4 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-medium">Escalated</span>
            </div>
            <div className="text-3xl font-bold text-white">4</div>
          </div>

          <div className="bg-[#0f172a] p-4 rounded-lg border border-slate-800">
            <div className="flex items-center gap-2 text-slate-400 mb-2">
              <Info className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium">Avg Confidence</span>
            </div>
            <div className="text-3xl font-bold text-white">41.9%</div>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-400 mb-4 uppercase tracking-wider">Risk Breakdown</h2>
          <div className="flex items-center justify-center mb-6">
            <svg width="140" height="140" viewBox="0 0 100 100" className="transform -rotate-90 drop-shadow-md">
              {/* Total = 20. Low=3 (15%), Med=13 (65%), High=4 (20%) */}
              {/* Circle circumference = 2 * pi * r = ~251.2 */}
              <circle cx="50" cy="50" r="36" fill="none" stroke="#1e293b" strokeWidth="16" />
              {/* Low - 15% */}
              <circle cx="50" cy="50" r="36" fill="none" stroke="#22c55e" strokeWidth="16" strokeDasharray="226.08" strokeDashoffset={226.08 * (1 - 0.15)} />
              {/* Med - 65% */}
              <circle cx="50" cy="50" r="36" fill="none" stroke="#f59e0b" strokeWidth="16" strokeDasharray={`${226.08 * 0.65} ${226.08 * 0.35}`} strokeDashoffset="0" transform="rotate(54, 50, 50)" />
              {/* High - 20% */}
              <circle cx="50" cy="50" r="36" fill="none" stroke="#ef4444" strokeWidth="16" strokeDasharray={`${226.08 * 0.20} ${226.08 * 0.80}`} strokeDashoffset="0" transform="rotate(288, 50, 50)" />
            </svg>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-800/30">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <span className="text-slate-300">High Risk</span>
              </div>
              <span className="font-semibold text-white">4</span>
            </div>
            <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-800/30">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                <span className="text-slate-300">Medium Risk</span>
              </div>
              <span className="font-semibold text-white">13</span>
            </div>
            <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-800/30">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                <span className="text-slate-300">Low Risk</span>
              </div>
              <span className="font-semibold text-white">3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Area */}
      <div className="flex-1 flex flex-col p-8 min-w-0 bg-[#0f172a]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Batch Processor</h2>
            <p className="text-slate-400 mt-1">Submit support tickets via CSV to process through the AI Triage engine.</p>
          </div>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mb-6 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-emerald-500 font-medium text-sm">Success</h3>
            <p className="text-emerald-400/80 text-sm mt-1">Successfully processed 20 tickets. 16 replies generated, 4 escalated to human agents.</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-[#1e293b] rounded-lg border border-slate-800 overflow-hidden shadow-2xl">
          <div className="px-4 py-3 border-b border-slate-800 bg-[#1e293b] flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-300">Input Data</span>
              <div className="h-4 w-px bg-slate-700"></div>
              <span className="font-mono text-xs px-2 py-1 bg-slate-800 text-slate-400 rounded">Format: subject,issue,company</span>
            </div>
          </div>
          
          <textarea 
            value={csvInput}
            onChange={e => setCsvInput(e.target.value)}
            className="flex-1 w-full bg-[#0f172a] text-slate-300 p-6 font-mono text-sm leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/50"
            placeholder="Paste your CSV content here..."
            spellCheck={false}
          />

          <div className="p-4 border-t border-slate-800 bg-[#1e293b] flex justify-end">
            <button className="flex items-center gap-2 bg-[#3b82f6] hover:bg-blue-600 text-white px-6 py-2.5 rounded-md font-medium transition-colors shadow-lg shadow-blue-500/20">
              <Play className="w-4 h-4 fill-current" />
              Execute Triage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
