import { useGetTriageLogs, getGetTriageLogsQueryKey } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";
import { Terminal, Clock, Shield, BookOpen, ScrollText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function Logs() {
  const { data, isLoading } = useGetTriageLogs({
    query: { queryKey: getGetTriageLogsQueryKey() }
  });

  const getCompanyStyle = (company: string) => {
    const c = (company || "").toLowerCase();
    if (c.includes("hackerrank")) return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    if (c.includes("claude"))     return "bg-purple-500/10 text-purple-400 border-purple-500/30";
    if (c.includes("visa"))       return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
    return "bg-muted/50 text-muted-foreground border-border";
  };

  const getRiskStyle = (risk: string) => {
    switch (risk) {
      case "high":   return "text-red-400";
      case "medium": return "text-amber-400";
      case "low":    return "text-green-400";
      default:       return "text-muted-foreground";
    }
  };

  const entries = data?.entries ?? [];
  const replied = entries.filter(e => e.status === "replied").length;
  const escalated = entries.filter(e => e.status === "escalated").length;

  return (
    <div className="p-6 max-w-7xl mx-auto flex flex-col h-[calc(100vh-4px)] space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">System Logs</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Decision traces from every ticket processed by the AI engine
          </p>
        </div>
        {entries.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">{replied} replied</span>
            <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">{escalated} escalated</span>
          </div>
        )}
      </div>

      <Tabs defaultValue="structured" className="flex-1 flex flex-col min-h-0">
        <TabsList className="w-fit bg-card border border-border shrink-0">
          <TabsTrigger value="structured" className="text-sm gap-2">
            <ScrollText size={13} /> Decision Trace
          </TabsTrigger>
          <TabsTrigger value="raw" className="text-sm gap-2">
            <Terminal size={13} /> Raw Output
          </TabsTrigger>
        </TabsList>

        {/* Structured View */}
        <TabsContent value="structured" className="flex-1 min-h-0 mt-4 data-[state=active]:flex flex-col">
          <ScrollArea className="flex-1 rounded-xl border border-border bg-card">
            <div className="p-4 space-y-2">
              {isLoading ? (
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm py-16">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Loading traces…
                </div>
              ) : entries.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
                  <ScrollText size={36} className="opacity-20" />
                  <p className="text-sm">No logs yet</p>
                  <p className="text-xs">Process tickets on the Command Center page to see decision traces here</p>
                </div>
              ) : (
                entries.map((entry, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "flex flex-col sm:flex-row sm:items-center gap-3 px-4 py-3 rounded-lg border transition-colors",
                      entry.status === "escalated"
                        ? "border-red-500/20 bg-red-500/5"
                        : "border-border bg-background hover:bg-muted/20"
                    )}
                  >
                    {/* Timestamp */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono shrink-0 w-40">
                      <Clock size={11} />
                      {new Date(entry.timestamp).toISOString().replace('T', ' ').slice(0, 19)}
                    </div>

                    {/* Ticket ID + Company */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="outline" className="font-mono text-[10px] bg-primary/10 text-primary border-primary/20 px-1.5">
                        {entry.ticket_id}
                      </Badge>
                      <Badge variant="outline" className={cn("text-[10px]", getCompanyStyle(entry.company || ""))}>
                        {entry.company || 'Unknown'}
                      </Badge>
                    </div>

                    {/* Metadata */}
                    <div className="flex-1 flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Terminal size={11} />
                        <span className="text-foreground">{entry.request_type}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Shield size={11} />
                        risk: <span className={cn("font-medium ml-0.5", getRiskStyle(entry.risk_level))}>{entry.risk_level}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={11} />
                        {entry.retrieved_docs?.length || 0} source{(entry.retrieved_docs?.length || 0) !== 1 ? 's' : ''} cited
                      </span>
                    </div>

                    {/* Confidence + Status */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-xs text-muted-foreground">
                        <span className="text-foreground font-medium">{(entry.confidence * 100).toFixed(0)}%</span> confidence
                      </div>
                      <Badge className={cn(
                        "text-[10px] font-semibold",
                        entry.status === 'escalated'
                          ? 'bg-red-500/15 text-red-400 border border-red-500/30'
                          : 'bg-green-500/15 text-green-400 border border-green-500/30'
                      )}>
                        {entry.status === 'escalated' ? '⚠ Escalated' : '✓ Replied'}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Raw Terminal */}
        <TabsContent value="raw" className="flex-1 min-h-0 mt-4 data-[state=active]:flex flex-col">
          <div className="flex-1 rounded-xl border border-border bg-[#0d1117] overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50 bg-[#161b22] shrink-0">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-[11px] font-mono text-muted-foreground ml-2">read-only · /var/log/triage.log</span>
            </div>
            <ScrollArea className="flex-1">
              <pre className="font-mono text-xs text-gray-300 whitespace-pre-wrap leading-relaxed p-5">
                {isLoading ? 'Loading…' : data?.log || 'No raw logs available.\n\nRun a triage batch to generate logs.'}
              </pre>
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
