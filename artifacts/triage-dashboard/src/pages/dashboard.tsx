import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
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
import { Loader2, UploadCloud, AlertCircle, Play, CheckCircle2, XCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const SAMPLE_CSV = `subject,issue,company
Login failing,Cannot login to my account since yesterday,HackerRank
New payment method,How do I add a new Visa card?,Visa
API rate limits,We are hitting the rate limit on the Claude API,Claude
Broken button,The submit button is grayed out,Generic`;

export default function Dashboard() {
  const [csvInput, setCsvInput] = useState(SAMPLE_CSV);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: stats, isLoading: statsLoading } = useGetTriageStats({
    query: { queryKey: getGetTriageStatsQueryKey() }
  });

  const processMutation = useProcessTickets({
    mutation: {
      onSuccess: (data) => {
        toast({
          title: "Processing Complete",
          description: `Successfully processed ${data.processed} tickets.`,
        });
        queryClient.invalidateQueries({ queryKey: getGetTriageStatsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetTriageResultsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetTriageLogsQueryKey() });
      },
      onError: (error) => {
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
      const header = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      const tickets = lines.slice(1).map((line, i) => {
        // Handle basic CSV parsing (not robust for quotes, but fine for simple cases)
        const values = line.split(',').map(v => v.trim());
        const ticket: any = { id: 't-' + Date.now() + '-' + i };
        
        header.forEach((h, idx) => {
          if (h === 'subject') ticket.subject = values[idx] || '';
          if (h === 'issue') ticket.issue = values[idx] || '';
          if (h === 'company') ticket.company = values[idx] || null;
        });
        
        if (!ticket.subject || !ticket.issue) {
          throw new Error('Row ' + (i + 1) + ' is missing subject or issue');
        }
        
        return ticket;
      });

      processMutation.mutate({ data: { tickets } });
    } catch (e: any) {
      toast({
        title: "Parsing Error",
        description: e.message || "Failed to parse CSV input",
        variant: "destructive"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <Card className="lg:col-span-2 bg-card border-border flex flex-col h-[500px]">
          <CardHeader>
            <CardTitle className="font-mono text-lg flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-primary" />
              Batch Input
            </CardTitle>
            <CardDescription className="font-mono text-xs">
              Paste CSV data with headers: subject, issue, company
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <Textarea 
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
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
          <Card className="bg-card border-border h-[500px] flex flex-col">
            <CardHeader>
              <CardTitle className="font-mono text-lg">Risk Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'High', value: stats.by_risk_level?.high || 0, color: 'hsl(var(--destructive))' },
                      { name: 'Medium', value: stats.by_risk_level?.medium || 0, color: 'hsl(43 100% 50%)' },
                      { name: 'Low', value: stats.by_risk_level?.low || 0, color: 'hsl(142 71% 45%)' },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {
                      [
                        { name: 'High', value: stats.by_risk_level?.high || 0, color: 'hsl(var(--destructive))' },
                        { name: 'Medium', value: stats.by_risk_level?.medium || 0, color: 'hsl(43 100% 50%)' },
                        { name: 'Low', value: stats.by_risk_level?.low || 0, color: 'hsl(142 71% 45%)' },
                      ].map((entry, index) => (
                        <Cell key={'cell-' + index} fill={entry.color} />
                      ))
                    }
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
