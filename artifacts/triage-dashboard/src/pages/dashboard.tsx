import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  useProcessTickets, 
  useGetTriageStats, 
  getGetTriageStatsQueryKey,
  getGetTriageResultsQueryKey,
  getGetTriageLogsQueryKey
} from "@workspace/api-client-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Loader2, UploadCloud, AlertCircle, Play, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const SAMPLE_CSV = `subject,issue,company
Login failing,Cannot login to my account since yesterday,HackerRank
"My visa card got blocked, and there are unknown transactions with negative balance. Can you fix it?",Card Block and unknown balance,Visa
API rate limits,We are hitting the rate limit on the Claude API,Claude
Broken button,The submit button is grayed out,Generic`;

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

const STORAGE_KEY = "triage_batch_input";

export default function Dashboard() {
  const [csvInput, setCsvInput] = useState<string>(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) ?? SAMPLE_CSV;
    } catch {
      return SAMPLE_CSV;
    }
  });
  const [lastProcessed, setLastProcessed] = useState<number | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, navigate] = useLocation();

  const handleCsvChange = (value: string) => {
    setCsvInput(value);
    try { localStorage.setItem(STORAGE_KEY, value); } catch { /* ignore */ }
  };

  const { data: stats, isLoading: statsLoading } = useGetTriageStats({
    query: { queryKey: getGetTriageStatsQueryKey() }
  });

  const processMutation = useProcessTickets({
    mutation: {
      onSuccess: (data) => {
        setLastProcessed(data.processed);
        queryClient.invalidateQueries({ queryKey: getGetTriageStatsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetTriageResultsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetTriageLogsQueryKey() });
      },
      onError: () => {
        toast({
          title: "Processing Failed",
          description: "There was an error processing the tickets. Check the format.",
          variant: "destructive",
        });
      }
    }
  });

  const handleProcess = () => {
    if (!csvInput.trim()) return;

    try {
      const lines = csvInput.split('\n').filter(line => line.trim());
      if (lines.length < 2) throw new Error('Need at least a header row and one ticket row');

      const header = parseCSVLine(lines[0]).map(h => h.toLowerCase());

      const subjectIdx = header.indexOf('subject');
      const issueIdx = header.indexOf('issue');
      const companyIdx = header.indexOf('company');

      if (subjectIdx === -1 || issueIdx === -1) {
        throw new Error('Header row must include "subject" and "issue" columns');
      }

      const tickets = lines.slice(1).map((line, i) => {
        const values = parseCSVLine(line);
        const subject = values[subjectIdx]?.trim() ?? '';
        const issue = values[issueIdx]?.trim() ?? '';
        const company = companyIdx !== -1 ? (values[companyIdx]?.trim() || null) : null;

        if (!subject) throw new Error(`Row ${i + 1}: "subject" is empty`);
        if (!issue) throw new Error(`Row ${i + 1}: "issue" is empty`);

        return { id: 't-' + Date.now() + '-' + i, subject, issue, company };
      });

      processMutation.mutate({ data: { tickets } });
    } catch (e: any) {
      toast({
        title: "Parsing Error",
        description: e.message || "Failed to parse CSV input",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-mono font-bold uppercase tracking-tight">Command Center</h1>
          <p className="text-muted-foreground mt-1 font-mono text-sm">System status: Online | AI Triage Active</p>
        </div>
      </div>

      {statsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <Card key={i} className="animate-pulse bg-muted/20"><CardContent className="h-32" /></Card>
          ))}
        </div>
      ) : stats ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono text-muted-foreground uppercase">Total Processed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold font-mono text-primary">{stats.total}</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono text-muted-foreground uppercase flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Replied
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold font-mono text-green-500">{stats.replied}</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono text-muted-foreground uppercase flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-destructive" />
                Escalated
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold font-mono text-destructive">{stats.escalated}</div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-mono text-muted-foreground uppercase">Avg Confidence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold font-mono text-blue-400">{(stats.avg_confidence * 100).toFixed(1)}%</div>
              <Progress value={stats.avg_confidence * 100} className="h-1 mt-2" />
            </CardContent>
          </Card>
        </motion.div>
      ) : null}

      {lastProcessed !== null && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-4 rounded-lg border border-green-500/30 bg-green-500/10 px-5 py-4"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
            <div>
              <p className="font-mono text-sm font-semibold text-green-400">
                {lastProcessed} ticket{lastProcessed !== 1 ? 's' : ''} processed — stats updated above
              </p>
              <p className="font-mono text-xs text-muted-foreground mt-0.5">
                Click "Triage Results" in the sidebar (or the button on the right) to read each AI response
              </p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/results")}
            className="shrink-0 font-mono uppercase tracking-wider bg-green-600 hover:bg-green-700 text-white"
          >
            View Responses <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <Card className="lg:col-span-2 bg-card border-border flex flex-col h-[500px]">
          <CardHeader>
            <CardTitle className="font-mono text-lg flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-primary" />
              Batch Input
            </CardTitle>
            <CardDescription className="font-mono text-xs">
              Paste CSV with headers: <span className="text-foreground">subject, issue, company</span>
              {" — "}wrap fields containing commas in <span className="text-primary font-bold">"double quotes"</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <Textarea 
              value={csvInput}
              onChange={(e) => handleCsvChange(e.target.value)}
              className="flex-1 font-mono text-sm resize-none bg-background/50 border-border focus-visible:ring-primary"
              placeholder="subject,issue,company..."
            />
            <div className="mt-4 flex justify-between items-center">
              <div className="text-xs font-mono text-muted-foreground">
                {csvInput.split('\n').filter(l => l.trim()).length > 1 
                  ? (csvInput.split('\n').filter(l => l.trim()).length - 1) + ' tickets detected'
                  : 'Ready for input'}
              </div>
              <Button 
                onClick={handleProcess} 
                disabled={processMutation.isPending || !csvInput.trim()}
                className="font-mono uppercase tracking-wider"
              >
                {processMutation.isPending ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
                ) : (
                  <><Play className="w-4 h-4 mr-2" /> Execute Triage</>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {stats && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-mono text-lg">Risk Distribution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              {(() => {
                const riskData = [
                  { name: 'High', value: stats.by_risk_level?.high || 0, color: '#ef4444', bg: 'bg-red-500/10', text: 'text-red-400' },
                  { name: 'Medium', value: stats.by_risk_level?.medium || 0, color: '#f59e0b', bg: 'bg-amber-500/10', text: 'text-amber-400' },
                  { name: 'Low', value: stats.by_risk_level?.low || 0, color: '#22c55e', bg: 'bg-green-500/10', text: 'text-green-400' },
                ];
                const total = riskData.reduce((s, d) => s + d.value, 0) || 1;

                // SVG donut chart
                const cx = 100, cy = 100, R = 80, r = 52;
                let angle = -Math.PI / 2;
                const slices = riskData.map(d => {
                  const sweep = (d.value / total) * 2 * Math.PI;
                  const x1 = cx + R * Math.cos(angle);
                  const y1 = cy + R * Math.sin(angle);
                  angle += sweep;
                  const x2 = cx + R * Math.cos(angle);
                  const y2 = cy + R * Math.sin(angle);
                  const xi1 = cx + r * Math.cos(angle);
                  const yi1 = cy + r * Math.sin(angle);
                  angle -= sweep;
                  const xi2 = cx + r * Math.cos(angle);
                  const yi2 = cy + r * Math.sin(angle);
                  const large = sweep > Math.PI ? 1 : 0;
                  const path = d.value === 0 ? '' :
                    `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${xi1} ${yi1} A ${r} ${r} 0 ${large} 0 ${xi2} ${yi2} Z`;
                  angle += sweep;
                  return { ...d, path };
                });

                return (
                  <>
                    <div className="flex justify-center">
                      <svg width="200" height="200" viewBox="0 0 200 200">
                        {slices.map((s, i) => s.path && (
                          <path key={i} d={s.path} fill={s.color} opacity={0.9} />
                        ))}
                        <text x="100" y="96" textAnchor="middle" fill="#f1f5f9" fontSize="22" fontWeight="bold" fontFamily="monospace">{total}</text>
                        <text x="100" y="114" textAnchor="middle" fill="#94a3b8" fontSize="11" fontFamily="monospace">tickets</text>
                      </svg>
                    </div>
                    <div className="space-y-2">
                      {riskData.map((d) => (
                        <div key={d.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                            <span className="font-mono text-sm text-muted-foreground uppercase tracking-wider">{d.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-1.5 bg-muted/30 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width: `${(d.value / total) * 100}%`, backgroundColor: d.color }} />
                            </div>
                            <span className={`font-mono text-sm font-bold ${d.text}`}>{d.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
