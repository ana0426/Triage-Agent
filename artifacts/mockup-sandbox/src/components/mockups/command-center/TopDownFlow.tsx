import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Activity, 
  Inbox, 
  AlertTriangle, 
  Zap, 
  Play,
  FileText,
  BarChart3,
  PieChart
} from 'lucide-react';

export function TopDownFlow() {
  const [isExecuting, setIsExecuting] = useState(false);
  const [csvContent, setCsvContent] = useState('subject,issue,company\nLogin failure,Cannot reset password,Acme Corp\nBilling error,Double charged for premium,TechNova');

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => setIsExecuting(false), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 font-sans p-6 md:p-8 space-y-8 flex flex-col">
      {/* Header & Banner */}
      <div className="space-y-4 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-3 rounded-lg shadow-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">System operational. Batch processing engine is online and ready.</p>
        </div>
        
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Support Triage Command Center</h1>
            <p className="text-slate-400 mt-1">Batch submission and live operational analytics</p>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto w-full">
        {[
          { label: 'Total Processed', value: '20', icon: Inbox, color: 'text-blue-400', bg: 'bg-blue-400/20', progress: 100 },
          { label: 'Auto-Replied', value: '16', icon: Zap, color: 'text-green-400', bg: 'bg-green-400/20', progress: 80 },
          { label: 'Escalated', value: '4', icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-400/20', progress: 20 },
          { label: 'Avg Confidence', value: '41.9%', icon: Activity, color: 'text-indigo-400', bg: 'bg-indigo-400/20', progress: 41.9 },
        ].map((stat, i) => (
          <div key={i} className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-5 flex flex-col gap-4 shadow-sm relative overflow-hidden">
            <div className="flex justify-between items-start">
              <span className="text-slate-400 font-medium text-sm">{stat.label}</span>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            <div className="text-3xl font-bold text-white">{stat.value}</div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mt-auto">
              <div 
                className="h-full bg-slate-500 rounded-full transition-all duration-1000" 
                style={{ width: `${stat.progress}%`, backgroundColor: stat.color.replace('text-', '') === 'blue-400' ? '#60a5fa' : stat.color.replace('text-', '') === 'green-400' ? '#4ade80' : stat.color.replace('text-', '') === 'red-400' ? '#f87171' : '#818cf8' }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Batch Input Panel */}
      <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-6 max-w-6xl mx-auto w-full shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold text-white">Batch Triage Input</h2>
        </div>
        
        <div className="relative">
          <textarea
            value={csvContent}
            onChange={(e) => setCsvContent(e.target.value)}
            className="w-full h-48 bg-[#0f172a] text-slate-300 font-mono text-sm p-4 rounded-lg border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
            placeholder="Paste CSV data here..."
          />
          <div className="absolute top-4 right-4 text-xs font-mono text-slate-500 select-none">
            CSV Format
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-slate-400">Required columns: <code className="bg-[#0f172a] px-1.5 py-0.5 rounded text-blue-300">subject,issue,company</code></p>
          <button
            onClick={handleExecute}
            disabled={isExecuting || !csvContent}
            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isExecuting ? (
              <Activity className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
            {isExecuting ? 'Processing...' : 'Execute Triage'}
          </button>
        </div>
      </div>

      {/* Bottom 3-Column Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full mb-8">
        
        {/* Risk Donut */}
        <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-6 shadow-sm flex flex-col items-center">
          <div className="w-full flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-slate-400" />
            <h3 className="font-semibold text-white">Risk Distribution</h3>
          </div>
          
          <div className="relative w-48 h-48 flex items-center justify-center">
            {/* SVG Donut Chart */}
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#0f172a" strokeWidth="4" />
              {/* Low Risk: 3/20 = 15% */}
              <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#22c55e" strokeWidth="4" strokeDasharray="15 85" strokeDashoffset="25" className="transition-all duration-1000" />
              {/* Medium Risk: 13/20 = 65% */}
              <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#f59e0b" strokeWidth="4" strokeDasharray="65 35" strokeDashoffset="10" className="transition-all duration-1000" />
              {/* High Risk: 4/20 = 20% */}
              <circle cx="18" cy="18" r="15.9155" fill="transparent" stroke="#ef4444" strokeWidth="4" strokeDasharray="20 80" strokeDashoffset="-55" className="transition-all duration-1000" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-white">20</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">Tickets</span>
            </div>
          </div>
          
          <div className="flex gap-4 mt-6 text-sm w-full justify-center">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#ef4444]"></div><span className="text-slate-300">High (4)</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div><span className="text-slate-300">Med (13)</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#22c55e]"></div><span className="text-slate-300">Low (3)</span></div>
          </div>
        </div>

        {/* Status Breakdown Bar */}
        <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-6 shadow-sm flex flex-col">
          <div className="w-full flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-slate-400" />
            <h3 className="font-semibold text-white">Status Breakdown</h3>
          </div>
          
          <div className="flex-1 flex flex-col justify-center gap-8">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-green-400">Auto-Replied</span>
                <span className="text-white font-mono">80% (16)</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="font-medium text-red-400">Escalated</span>
                <span className="text-white font-mono">20% (4)</span>
              </div>
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Guide */}
        <div className="bg-[#1e293b] border border-slate-700/50 rounded-xl p-6 shadow-sm flex flex-col">
          <div className="w-full flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-slate-400" />
            <h3 className="font-semibold text-white">Format Reference</h3>
          </div>
          
          <p className="text-sm text-slate-400 mb-4">
            The batch processor requires a standard CSV format with a header row. Ensure no missing values in required fields.
          </p>
          
          <div className="bg-[#0f172a] rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre border border-slate-800 flex-1">
            <span className="text-blue-400">subject</span>,<span className="text-blue-400">issue</span>,<span className="text-blue-400">company</span><br/>
            "Login bug","SSO fails","Acme"<br/>
            "Billing","Card declined","Initech"<br/>
            "Data loss","Sync timeout","Soylent"
          </div>
        </div>

      </div>
    </div>
  );
}
