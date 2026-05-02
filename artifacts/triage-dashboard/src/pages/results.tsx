import React, { useState } from "react";
import { useGetTriageResults, getGetTriageResultsQueryKey } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Search, Download, MessageSquare, AlertTriangle, FileText, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Results() {
  const { data, isLoading } = useGetTriageResults({
    query: { queryKey: getGetTriageResultsQueryKey() }
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new window.Set());

  const toggleRow = (id: string) => {
    const newSet = new window.Set(expandedRows);
    if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
    setExpandedRows(newSet);
  };

  const results = data?.results || [];
  const filteredResults = results.filter(r => {
    const matchesSearch =
      r.subject.toLowerCase().includes(search.toLowerCase()) ||
      r.company.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const downloadCSV = () => {
    if (!results.length) return;
    const headers = ['id', 'subject', 'company', 'status', 'risk_level', 'confidence'];
    const csv = [
      headers.join(','),
      ...filteredResults.map(r => [
        r.id, '"' + r.subject.replace(/"/g, '""') + '"',
        r.company, r.status, r.risk_level, r.confidence
      ].join(','))
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'triage_results.csv'; a.click();
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'high':   return 'text-red-400 border-red-500/30 bg-red-500/10';
      case 'medium': return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
      case 'low':    return 'text-green-400 border-green-500/30 bg-green-500/10';
      default:       return 'text-muted-foreground border-border';
    }
  };

  const getCompanyColor = (company: string) => {
    const c = company.toLowerCase();
    if (c.includes('hackerrank')) return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
    if (c.includes('claude'))     return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
    if (c.includes('visa'))       return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
    return 'bg-muted/50 text-muted-foreground border-border';
  };

  const ConfidencePip = ({ value }: { value: number }) => {
    const pct = Math.round(value * 100);
    const color = pct >= 70 ? "bg-green-500" : pct >= 45 ? "bg-amber-500" : "bg-red-500";
    const textColor = pct >= 70 ? "text-green-400" : pct >= 45 ? "text-amber-400" : "text-red-400";
    return (
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 bg-muted/30 rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
        </div>
        <span className={`text-xs font-medium ${textColor}`}>{pct}%</span>
      </div>
    );
  };

  const replied = results.filter(r => r.status === 'replied').length;
  const escalated = results.filter(r => r.status === 'escalated').length;

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Triage Results</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Expand any row to read the full AI response and triage justification
          </p>
        </div>
        <Button onClick={downloadCSV} variant="outline" size="sm" disabled={!results.length}>
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      {/* Summary Chips */}
      {results.length > 0 && (
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs text-muted-foreground">{results.length} total tickets</span>
          <div className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/10 border border-green-500/20 rounded-full px-3 py-1">
            <MessageSquare size={11} /> {replied} replied
          </div>
          <div className="flex items-center gap-1.5 text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-full px-3 py-1">
            <AlertTriangle size={11} /> {escalated} escalated
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-3 items-center bg-card p-3 rounded-xl border border-border">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search subject or company…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-sm bg-background border-border"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 h-8 text-sm bg-background border-border">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
            <SelectItem value="escalated">Escalated</SelectItem>
          </SelectContent>
        </Select>
        {(search || statusFilter !== "all") && (
          <span className="text-xs text-muted-foreground">{filteredResults.length} shown</span>
        )}
      </div>

      {/* Table */}
      <div className="border border-border rounded-xl bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border bg-muted/20">
              <TableHead className="w-10" />
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Company</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground w-2/5">Subject</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Risk</TableHead>
              <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="h-40 text-center text-muted-foreground text-sm">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Loading results…
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredResults.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-40 text-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <FileText size={28} className="opacity-30" />
                    <p className="text-sm">No results found</p>
                    {results.length === 0 && <p className="text-xs">Process a batch on the Command Center page first</p>}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredResults.map(row => (
                <React.Fragment key={row.id}>
                  <TableRow
                    className={cn(
                      "cursor-pointer border-border hover:bg-muted/20 transition-colors group",
                      expandedRows.has(row.id) && "bg-muted/10"
                    )}
                    onClick={() => toggleRow(row.id)}
                  >
                    <TableCell>
                      {expandedRows.has(row.id)
                        ? <ChevronDown className="w-4 h-4 text-primary" />
                        : <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("text-xs font-medium", getCompanyColor(row.company))}>
                        {row.company || 'Unknown'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-foreground line-clamp-1">{row.subject}</span>
                      <span className="text-xs text-muted-foreground font-mono">{row.id.slice(0, 8)}</span>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "text-xs font-semibold",
                        row.status === 'escalated'
                          ? 'bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/20'
                          : 'bg-green-500/15 text-green-400 border border-green-500/30 hover:bg-green-500/20'
                      )}>
                        {row.status === 'escalated' ? '⚠ Escalated' : '✓ Replied'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("text-xs font-medium uppercase", getRiskBadge(row.risk_level))}>
                        {row.risk_level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ConfidencePip value={row.confidence} />
                    </TableCell>
                  </TableRow>

                  <AnimatePresence>
                    {expandedRows.has(row.id) && (
                      <TableRow className="bg-muted/5 border-border hover:bg-muted/5">
                        <TableCell colSpan={6} className="p-0 border-t border-border/50">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-5 grid grid-cols-2 gap-5">

                              {/* Left column */}
                              <div className="space-y-4">
                                <div>
                                  <div className="flex items-center gap-1.5 mb-2">
                                    <FileText size={12} className="text-muted-foreground" />
                                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Original Issue</h4>
                                  </div>
                                  <div className="bg-background border border-border rounded-lg p-3 text-sm text-foreground leading-relaxed">
                                    {row.issue}
                                  </div>
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5 mb-2">
                                    <MessageSquare size={12} className="text-primary" />
                                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI Response</h4>
                                  </div>
                                  <div className={cn(
                                    "rounded-lg p-3 text-sm leading-relaxed border-l-2",
                                    row.status === 'escalated'
                                      ? "bg-red-500/5 border border-red-500/20 border-l-red-500 text-muted-foreground italic"
                                      : "bg-primary/5 border border-primary/20 border-l-primary text-foreground"
                                  )}>
                                    {row.response || "Ticket escalated to human agent — no automated response generated."}
                                  </div>
                                </div>
                              </div>

                              {/* Right column */}
                              <div className="space-y-4">
                                <div>
                                  <div className="flex items-center gap-1.5 mb-2">
                                    <AlertTriangle size={12} className="text-amber-400" />
                                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Triage Justification</h4>
                                  </div>
                                  <div className="bg-background border border-border border-l-2 border-l-amber-500 rounded-lg p-3 text-sm text-foreground leading-relaxed">
                                    {row.justification}
                                  </div>
                                </div>

                                {row.retrieved_docs && row.retrieved_docs.length > 0 && (
                                  <div>
                                    <div className="flex items-center gap-1.5 mb-2">
                                      <BookOpen size={12} className="text-muted-foreground" />
                                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                        Knowledge Sources ({row.retrieved_docs.length})
                                      </h4>
                                    </div>
                                    <ul className="space-y-1.5">
                                      {row.retrieved_docs.map((doc, i) => (
                                        <li key={i} className="flex items-center gap-2 text-xs bg-background border border-border px-3 py-2 rounded-lg text-muted-foreground">
                                          <span className="w-4 h-4 rounded-full bg-primary/10 text-primary text-[10px] flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                                          {doc}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        </TableCell>
                      </TableRow>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
