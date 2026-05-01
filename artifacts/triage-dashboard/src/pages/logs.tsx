import { useGetTriageLogs, getGetTriageLogsQueryKey } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal, Clock, Shield, Search } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export default function Logs() {
  const { data, isLoading } = useGetTriageLogs({
    query: { queryKey: getGetTriageLogsQueryKey() }
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 h-[calc(100vh-2rem)] flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-mono font-bold uppercase tracking-tight">System Logs</h1>
          <p className="text-muted-foreground mt-1 font-mono text-sm">Raw decision traces and execution history</p>
        </div>
      </div>

      <Tabs defaultValue="structured" className="flex-1 flex flex-col min-h-0">
        <TabsList className="w-fit bg-card border border-border">
          <TabsTrigger value="structured" className="font-mono">Structured Trace</TabsTrigger>
          <TabsTrigger value="raw" className="font-mono">Raw Terminal Output</TabsTrigger>
        </TabsList>
        
        <TabsContent value="structured" className="flex-1 min-h-0 mt-4 data-[state=active]:flex flex-col">
          <ScrollArea className="flex-1 rounded-md border border-border bg-card">
            <div className="p-6 space-y-4">
              {isLoading ? (
                <div className="text-center font-mono text-muted-foreground py-12">Fetching logs...</div>
              ) : data?.entries?.length === 0 ? (
                <div className="text-center font-mono text-muted-foreground py-12">No logs available</div>
              ) : (
                data?.entries?.map((entry, idx) => (
                  <Card key={idx} className="bg-background border-border/50 shadow-none">
                    <CardContent className="p-4 flex flex-col md:flex-row gap-4 md:items-center">
                      <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground w-48 shrink-0">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(entry.timestamp).toISOString().replace('T', ' ').slice(0, 19)}
                      </div>
                      
                      <div className="flex items-center gap-3 shrink-0">
                        <Badge variant="outline" className="font-mono bg-primary/10 text-primary border-primary/20">
                          {entry.ticket_id}
                        </Badge>
                        <Badge variant="outline" className="font-mono">
                          {entry.company || 'Unknown'}
                        </Badge>
                      </div>

                      <div className="flex-1 flex flex-wrap gap-2 items-center">
                        <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                          <Terminal className="w-3 h-3" /> type: <span className="text-foreground">{entry.request_type}</span>
                        </span>
                        <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                          <Shield className="w-3 h-3" /> risk: <span className={entry.risk_level === 'high' ? 'text-destructive' : 'text-foreground'}>{entry.risk_level}</span>
                        </span>
                        <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                          <Search className="w-3 h-3" /> docs: <span className="text-foreground">{entry.retrieved_docs?.length || 0}</span>
                        </span>
                      </div>

                      <div className="shrink-0 flex items-center gap-3">
                        <div className="text-xs font-mono text-muted-foreground text-right">
                          conf: <span className="text-foreground">{(entry.confidence * 100).toFixed(0)}%</span>
                        </div>
                        <Badge className={cn("font-mono uppercase text-xs tracking-wider", entry.status === 'escalated' ? 'bg-destructive text-destructive-foreground' : 'bg-green-500 text-white')}>
                          {entry.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="raw" className="flex-1 min-h-0 mt-4 data-[state=active]:flex flex-col">
          <div className="flex-1 rounded-md border border-border bg-[#0d1117] p-4 overflow-hidden relative">
            <div className="absolute top-2 right-4 text-[10px] font-mono text-muted-foreground uppercase">
              read-only /var/log/triage.log
            </div>
            <ScrollArea className="h-full">
              <pre className="font-mono text-xs text-gray-300 whitespace-pre-wrap leading-relaxed">
                {isLoading ? '...' : data?.log || 'No raw logs available.'}
              </pre>
            </ScrollArea>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
