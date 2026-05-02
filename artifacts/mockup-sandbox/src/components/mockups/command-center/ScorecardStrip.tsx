import React from 'react';
import { Play, CheckCircle2 } from 'lucide-react';

export function ScorecardStrip() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 font-sans p-6 flex flex-col gap-6">
      {/* Success Banner */}
      <div className="bg-emerald-900/30 border border-emerald-500/30 rounded-md p-4 flex items-center gap-3 text-emerald-400 shadow-sm">
        <CheckCircle2 className="w-5 h-5" />
        <span className="text-sm font-medium">Batch processed successfully. 20 tickets triaged.</span>
      </div>

      {/* Scorecard Strip */}
      <div className="bg-[#1e293b] border border-slate-700/50 rounded-lg flex items-center shadow-md divide-x divide-slate-700/50">
        <div className="flex-1 px-8 py-5 flex items-baseline gap-4">
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Total Processed</span>
          <span className="text-4xl font-bold text-white">20</span>
        </div>
        <div className="flex-1 px-8 py-5 flex items-baseline gap-4">
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Replied</span>
          <span className="text-4xl font-bold text-white">16</span>
        </div>
        <div className="flex-1 px-8 py-5 flex items-baseline gap-4">
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Escalated</span>
          <span className="text-4xl font-bold text-white">4</span>
        </div>
        <div className="flex-1 px-8 py-5 flex items-baseline gap-4">
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Avg Confidence</span>
          <span className="text-4xl font-bold text-white">41.9%</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 min-h-[500px]">
        {/* Left Column - 65% */}
        <div className="w-[65%] flex flex-col gap-4 bg-[#1e293b] border border-slate-700/50 rounded-lg p-6 shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-white tracking-tight">Batch Input (CSV)</h2>
            <span className="text-xs font-medium text-slate-400 bg-slate-800/50 px-2 py-1 rounded">Format: subject,issue,company</span>
          </div>
          <textarea 
            className="flex-1 w-full bg-[#0f172a] border border-slate-700/60 rounded-md p-5 text-sm font-mono text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#3b82f6] resize-none leading-relaxed"
            defaultValue={`subject,issue,company
Login issue,Cannot login to portal,Acme Corp
Billing,Invoice not received,Globex
Bug,App crashes on startup,Initech
Security,Suspicious login attempt,Umbrella Corp`}
          ></textarea>
          <div className="flex justify-end pt-2">
            <button className="bg-[#3b82f6] hover:bg-blue-600 text-white px-6 py-2.5 rounded-md font-medium flex items-center gap-2 transition-all shadow-sm shadow-blue-900/20">
              <Play className="w-4 h-4 fill-current" />
              Execute Triage
            </button>
          </div>
        </div>

        {/* Right Column - 35% */}
        <div className="w-[35%] flex flex-col gap-6">
          {/* Risk Donut Chart */}
          <div className="bg-[#1e293b] border border-slate-700/50 rounded-lg p-6 flex flex-col h-[280px] shadow-md">
            <h2 className="text-lg font-semibold text-white mb-6 tracking-tight">Risk Breakdown</h2>
            <div className="flex-1 flex items-center justify-center gap-10">
              {/* SVG Donut */}
              <div className="relative w-36 h-36">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  {/* Background Circle */}
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#334155" strokeWidth="3" />
                  
                  {/* High (4) = 4/20 = 20% */}
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#ef4444" strokeWidth="3.5" strokeDasharray="20 80" strokeDashoffset="0" className="drop-shadow-sm" />
                  
                  {/* Medium (13) = 13/20 = 65% */}
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="65 35" strokeDashoffset="-20" />
                  
                  {/* Low (3) = 3/20 = 15% */}
                  <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#22c55e" strokeWidth="3.5" strokeDasharray="15 85" strokeDashoffset="-85" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center mt-0.5">
                  <span className="text-3xl font-bold text-white tracking-tighter">20</span>
                  <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Total</span>
                </div>
              </div>
              
              {/* Legend */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.4)]"></div>
                  <span className="text-sm font-medium text-slate-300">High (4)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b] shadow-[0_0_8px_rgba(245,158,11,0.4)]"></div>
                  <span className="text-sm font-medium text-slate-300">Medium (13)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.4)]"></div>
                  <span className="text-sm font-medium text-slate-300">Low (3)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Escalation Table */}
          <div className="flex-1 bg-[#1e293b] border border-slate-700/50 rounded-lg p-6 flex flex-col shadow-md">
            <h2 className="text-lg font-semibold text-white mb-4 tracking-tight">Recent Escalations</h2>
            <div className="flex-1 overflow-auto pr-2">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50 text-slate-400">
                    <th className="pb-3 font-semibold w-16">ID</th>
                    <th className="pb-3 font-semibold">Issue</th>
                    <th className="pb-3 font-semibold text-right">Risk</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 text-slate-300 font-mono text-xs">#1042</td>
                    <td className="py-3 text-slate-200 truncate max-w-[140px]">Server availability drop</td>
                    <td className="py-3 text-right"><span className="text-[11px] font-medium tracking-wide bg-red-500/10 text-red-400 px-2 py-1 rounded border border-red-500/20 uppercase">High</span></td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 text-slate-300 font-mono text-xs">#1043</td>
                    <td className="py-3 text-slate-200 truncate max-w-[140px]">Data loss reported</td>
                    <td className="py-3 text-right"><span className="text-[11px] font-medium tracking-wide bg-red-500/10 text-red-400 px-2 py-1 rounded border border-red-500/20 uppercase">High</span></td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 text-slate-300 font-mono text-xs">#1044</td>
                    <td className="py-3 text-slate-200 truncate max-w-[140px]">Security vulnerability</td>
                    <td className="py-3 text-right"><span className="text-[11px] font-medium tracking-wide bg-red-500/10 text-red-400 px-2 py-1 rounded border border-red-500/20 uppercase">High</span></td>
                  </tr>
                  <tr className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 text-slate-300 font-mono text-xs">#1045</td>
                    <td className="py-3 text-slate-200 truncate max-w-[140px]">Urgent account locked</td>
                    <td className="py-3 text-right"><span className="text-[11px] font-medium tracking-wide bg-red-500/10 text-red-400 px-2 py-1 rounded border border-red-500/20 uppercase">High</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
