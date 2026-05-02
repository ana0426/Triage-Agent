import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  useProcessTickets,
  useGetTriageStats,
  getGetTriageStatsQueryKey,
  getGetTriageResultsQueryKey,
  getGetTriageLogsQueryKey
} from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Loader2, UploadCloud, AlertCircle, Play, CheckCircle2,
  ArrowRight, MessageSquare, TrendingUp, Brain,
  ChevronDown, Info, Sparkles
} from "lucide-react";

const SAMPLE_CSV = `subject,issue,company
Login failing,Cannot login to my account since yesterday,HackerRank
"My visa card got blocked, and there are unknown transactions with negative balance. Can you fix it?",Card Block and unknown balance,Visa
API rate limits,We are hitting the rate limit on the Claude API,Claude
Broken button,The submit button is grayed out,Generic`;

const EXAMPLES: { label: string; tag: string; color: string; csv: string }[] = [
  {
    label: "HackerRank — Auth & Assessment",
    tag: "HackerRank",
    color: "bg-blue-500/10 text-blue-400 border-blue-500/30 hover:bg-blue-500/20",
    csv: `subject,issue,company
Login failing,Cannot login to my HackerRank account since yesterday. Password reset email is not arriving.,HackerRank
Assessment not loading,My timed coding assessment is stuck on a blank screen and the timer is counting down.,HackerRank
Score not updated,I submitted my solution 2 hours ago but the score still shows 0 on the recruiter dashboard.,HackerRank`,
  },
  {
    label: "Visa — Card & Transactions",
    tag: "Visa",
    color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/20",
    csv: `subject,issue,company
Card blocked,My Visa card was suddenly blocked and I cannot make any purchases online or in-store.,Visa
Unknown transaction,There is an unfamiliar charge of $349 on my statement from a merchant I do not recognise.,Visa
Transaction logs missing,My transaction history is not showing up and the filter is not working in my Visa portal.,Visa`,
  },
  {
    label: "Claude — API & Billing",
    tag: "Claude",
    color: "bg-purple-500/10 text-purple-400 border-purple-500/30 hover:bg-purple-500/20",
    csv: `subject,issue,company
API rate limit hit,We are consistently hitting the Claude API rate limit at peak hours and requests are being dropped.,Claude
Context window issue,Claude keeps losing context in long conversations and forgets earlier messages in the thread.,Claude
Billing discrepancy,Our invoice shows 4M tokens billed but our logs show only 1.2M tokens used this month.,Claude`,
  },
  {
    label: "Mixed — Multi-product Batch",
    tag: "Mixed",
    color: "bg-primary/10 text-primary border-primary/30 hover:bg-primary/20",
    csv: SAMPLE_CSV,
  },
];

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      result.push(current.trim()); current = '';
    } else { current += ch; }
  }
  result.push(current.trim());
  return result;
}

const STORAGE_KEY = "triage_batch_input";

function StatCard({
  label, value, sub, icon: Icon, color, delay = 0
}: {
  label: string; value: string | number; sub?: string;
  icon: React.ElementType; color: string; delay?: number;
}) {
  const colorMap: Record<string, { bg: string; text: string; ring: string; iconBg: string }> = {
    blue:   { bg: "bg-blue-500/10",   text: "text-blue-400",   ring: "ring-blue-500/30",   iconBg: "bg-blue-500/20"   },
    green:  { bg: "bg-green-500/10",  text: "text-green-400",  ring: "ring-green-500/30",  iconBg: "bg-green-500/20"  },
    red:    { bg: "bg-red-500/10",    text: "text-red-400",    ring: "ring-red-500/30",    iconBg: "bg-red-500/20"    },
    amber:  { bg: "bg-amber-500/10",  text: "text-amber-400",  ring: "ring-amber-500/30",  iconBg: "bg-amber-500/20"  },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", ring: "ring-purple-500/30", iconBg: "bg-purple-500/20" },
  };
  const c = colorMap[color] ?? colorMap.blue;

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <Card className={`border-border hover:ring-1 ${c.ring} transition-all`}>
        <CardContent className="pt-5 pb-4 px-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
              <p className={`text-3xl font-bold mt-1 ${c.text}`}>{value}</p>
              {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
            </div>
            <div className={`p-2.5 rounded-xl ${c.iconBg}`}>
              <Icon size={18} className={c.text} />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function RiskBar({ high, medium, low }: { high: number; medium: number; low: number }) {
  const total = (high + medium + low) || 1;
  const pctHigh   = (high   / total) * 100;
  const pctMedium = (medium / total) * 100;
  const pctLow    = (low    / total) * 100;

  return (
    <div className="flex items-center gap-4 px-1">
      {/* Stacked bar */}
      <div className="flex h-2 flex-1 rounded-full overflow-hidden bg-muted/20 min-w-0">
        {pctHigh   > 0 && <div className="h-full bg-red-500"   style={{ width: `${pctHigh}%`   }} />}
        {pctMedium > 0 && <div className="h-full bg-amber-500" style={{ width: `${pctMedium}%` }} />}
        {pctLow    > 0 && <div className="h-full bg-green-500" style={{ width: `${pctLow}%`    }} />}
      </div>
      {/* Labels */}
      <div className="flex items-center gap-3 shrink-0 text-xs">
        <span className="flex items-center gap-1.5 text-red-400">
          <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
          <span className="font-semibold">{high}</span>
          <span className="text-muted-foreground">High</span>
        </span>
        <span className="flex items-center gap-1.5 text-amber-400">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
          <span className="font-semibold">{medium}</span>
          <span className="text-muted-foreground">Medium</span>
        </span>
        <span className="flex items-center gap-1.5 text-green-400">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
          <span className="font-semibold">{low}</span>
          <span className="text-muted-foreground">Low</span>
        </span>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [csvInput, setCsvInput] = useState<string>(() => {
    try { return localStorage.getItem(STORAGE_KEY) ?? SAMPLE_CSV; } catch { return SAMPLE_CSV; }
  });
  const [lastProcessed, setLastProcessed] = useState<number | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);
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
        toast({ title: "Processing Failed", description: "Check your CSV format below.", variant: "destructive" });
      }
    }
  });

  const handleProcess = () => {
    if (!csvInput.trim()) return;
    try {
      const lines = csvInput.split('\n').filter(line => line.trim());
      if (lines.length < 2) throw new Error('Need at least a header row and one data row');
      const header = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim());
      const subjectIdx = header.indexOf('subject');
      const issueIdx   = header.indexOf('issue');
      const companyIdx = header.indexOf('company');

      if (subjectIdx === -1 && issueIdx === -1) {
        throw new Error('Header must include at least a "subject" or "issue" column');
      }

      const tickets = lines.slice(1).map((line, i) => {
        const values = parseCSVLine(line);
        const rawSubject = subjectIdx !== -1 ? (values[subjectIdx]?.trim() ?? '') : '';
        const rawIssue   = issueIdx   !== -1 ? (values[issueIdx]?.trim()   ?? '') : '';
        const company    = companyIdx !== -1 ? (values[companyIdx]?.trim() || null) : null;

        // Graceful fallback: use each field as the other when one is missing
        const subject = rawSubject || rawIssue;
        const issue   = rawIssue   || rawSubject;

        if (!subject) throw new Error(`Row ${i + 1}: both "subject" and "issue" are empty`);

        return { id: 't-' + Date.now() + '-' + i, subject, issue, company };
      });
      processMutation.mutate({ data: { tickets } });
    } catch (e: any) {
      toast({ title: "Parsing Error", description: e.message || "Failed to parse CSV input", variant: "destructive" });
    }
  };

  const ticketCount = csvInput.split('\n').filter(l => l.trim()).length - 1;
  const replyRate = stats && stats.total > 0 ? ((stats.replied / stats.total) * 100).toFixed(0) : null;
  const escalationRate = stats && stats.total > 0 ? ((stats.escalated / stats.total) * 100).toFixed(0) : null;
  const conf = stats ? stats.avg_confidence * 100 : 0;
  const confColor = conf >= 70 ? "green" : conf >= 45 ? "amber" : "red";

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Command Center</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Submit support ticket batches and monitor AI triage performance
          </p>
        </div>
        <Badge variant="outline" className="text-green-400 border-green-500/30 bg-green-500/10 text-xs px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block mr-2" />
          System Online
        </Badge>
      </div>

      {/* Stats Grid */}
      {statsLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => (
            <Card key={i} className="animate-pulse bg-muted/20"><CardContent className="h-28" /></Card>
          ))}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total Processed" value={stats.total}
            sub="All-time tickets handled"
            icon={TrendingUp} color="blue" delay={0}
          />
          <StatCard
            label="Auto-Replied" value={stats.replied}
            sub={replyRate ? `${replyRate}% reply rate` : undefined}
            icon={MessageSquare} color="green" delay={0.05}
          />
          <StatCard
            label="Escalated" value={stats.escalated}
            sub={escalationRate ? `${escalationRate}% escalation rate` : undefined}
            icon={AlertCircle} color="red" delay={0.1}
          />
          <StatCard
            label="Avg Confidence" value={`${conf.toFixed(1)}%`}
            sub={conf < 50 ? "Low — review responses carefully" : conf < 70 ? "Moderate confidence" : "High confidence"}
            icon={Brain} color={confColor} delay={0.15}
          />
        </div>
      ) : (
        <Card className="border-dashed border-border">
          <CardContent className="py-10 text-center text-muted-foreground text-sm">
            No data yet — process your first batch below to see stats.
          </CardContent>
        </Card>
      )}

      {/* Success Banner */}
      <AnimatePresence>
        {lastProcessed !== null && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex items-center justify-between gap-4 rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-4"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-500/20">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-green-400">
                  {lastProcessed} ticket{lastProcessed !== 1 ? 's' : ''} processed successfully
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Stats updated above — click to view each AI response
                </p>
              </div>
            </div>
            <Button
              onClick={() => navigate("/results")}
              size="sm"
              className="shrink-0 bg-green-600 hover:bg-green-700 text-white"
            >
              View Responses <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Risk Bar — compact strip below stats */}
      {stats && (() => {
        const high   = stats.by_risk_level?.high   || 0;
        const medium = stats.by_risk_level?.medium || 0;
        const low    = stats.by_risk_level?.low    || 0;
        return (
          <div className="rounded-xl border border-border bg-card px-5 py-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Risk Distribution</span>
              {high > 0 && (
                <span className="flex items-center gap-1.5 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-full px-2.5 py-0.5">
                  <AlertCircle size={11} />
                  {high} need human review
                </span>
              )}
            </div>
            <RiskBar high={high} medium={medium} low={low} />
          </div>
        );
      })()}

      {/* Batch Input — full width */}
      <div>
        <Card className="border-border flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-primary/10">
                  <UploadCloud className="w-4 h-4 text-primary" />
                </div>
                <CardTitle className="text-base font-semibold">Batch Ticket Input</CardTitle>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground gap-1.5 h-7"
                onClick={() => setGuideOpen(v => !v)}
              >
                <Info size={12} />
                Format guide
                <ChevronDown size={12} className={`transition-transform ${guideOpen ? "rotate-180" : ""}`} />
              </Button>
            </div>

            <AnimatePresence>
              {guideOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-3 rounded-lg bg-muted/40 border border-border p-4 space-y-3">
                    <p className="text-xs font-medium text-foreground">CSV Format</p>
                    <p className="text-xs text-muted-foreground">Required columns: <code className="text-primary bg-primary/10 px-1 rounded">subject</code>, <code className="text-primary bg-primary/10 px-1 rounded">issue</code> — optional: <code className="text-primary bg-primary/10 px-1 rounded">company</code></p>
                    <pre className="text-[11px] font-mono text-muted-foreground leading-relaxed">
{`subject,issue,company
Login error,Cannot sign in,HackerRank
"Blocked card, unknown charge",Card issue,Visa`}
                    </pre>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-amber-400 font-medium">Tip:</span> Wrap fields that contain commas in double quotes.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => { handleCsvChange(SAMPLE_CSV); setGuideOpen(false); }}
                    >
                      Load sample tickets
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col pb-5 px-5 gap-3">

            {/* Example presets */}
            <div className="rounded-lg border border-border bg-muted/20 p-3 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <Sparkles size={11} />
                Load an example
              </div>
              <div className="flex flex-wrap gap-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex.tag}
                    onClick={() => handleCsvChange(ex.csv)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${ex.color}`}
                  >
                    {ex.label}
                  </button>
                ))}
              </div>
              {/* Preview of selected example */}
              {EXAMPLES.some(e => csvInput === e.csv) && (() => {
                const active = EXAMPLES.find(e => csvInput === e.csv)!;
                const rows = active.csv.split('\n').slice(1);
                return (
                  <div className="pt-1 border-t border-border/50 space-y-1">
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wide">Preview — {rows.length} ticket{rows.length !== 1 ? 's' : ''}</p>
                    {rows.map((r, i) => {
                      const parts = r.split(',');
                      return (
                        <div key={i} className="flex items-start gap-2 text-[11px]">
                          <span className="w-4 h-4 rounded-full bg-muted/60 text-muted-foreground flex items-center justify-center font-mono shrink-0 mt-0.5">{i + 1}</span>
                          <span className="text-foreground/80 leading-relaxed">{parts[0]?.replace(/^"|"$/g, '')}</span>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            <Textarea
              value={csvInput}
              onChange={(e) => handleCsvChange(e.target.value)}
              className="flex-1 font-mono text-sm resize-none bg-background/50 border-border focus-visible:ring-primary min-h-[240px]"
              placeholder="subject,issue,company&#10;Login error,Cannot login,HackerRank"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">
                  {ticketCount > 0
                    ? <><span className="text-foreground font-medium">{ticketCount}</span> ticket{ticketCount !== 1 ? 's' : ''} detected</>
                    : "Paste CSV above to begin"}
                </span>
                {ticketCount > 0 && (
                  <Badge variant="outline" className="text-[10px] px-2 py-0.5 text-primary border-primary/30">
                    Ready
                  </Badge>
                )}
              </div>
              <Button
                onClick={handleProcess}
                disabled={processMutation.isPending || !csvInput.trim() || ticketCount < 1}
                className="font-medium"
              >
                {processMutation.isPending ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing…</>
                ) : (
                  <><Play className="w-4 h-4 mr-2" /> Execute Triage</>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
