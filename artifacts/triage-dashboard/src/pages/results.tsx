import React, { useState } from "react";
import { useGetTriageResults, getGetTriageResultsQueryKey } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Search, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedRows(newSet);
  };

  const results = data?.results || [];

  const filteredResults = results.filter(r => {
    const matchesSearch = r.subject.toLowerCase().includes(search.toLowerCase()) || 
                          r.company.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const downloadCSV = () => {
    if (!results.length) return;
    const headers = ['id', 'subject', 'company', 'status', 'risk_level', 'confidence'];
    const csv = [
      headers.join(','),
      ...filteredResults.map(r => [r.id, '"' + r.subject.replace(/"/g, '""') + '"', r.company, r.status, r.risk_level, r.confidence].join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'triage_results.csv';
    a.click();
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-destructive border-destructive/20 bg-destructive/10';
      case 'medium': return 'text-amber-500 border-amber-500/20 bg-amber-500/10';
      case 'low': return 'text-green-500 border-green-500/20 bg-green-500/10';
      default: return 'text-muted-foreground border-border';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'escalated' 
      ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' 
      : 'bg-green-500 text-white hover:bg-green-600';
  };

  const getCompanyColor = (company: string) => {
    const c = company.toLowerCase();
    if (c.includes('hackerrank')) return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    if (c.includes('claude')) return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
    if (c.includes('visa')) return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-mono font-bold uppercase tracking-tight">Triage Results</h1>
          <p className="text-muted-foreground mt-1 font-mono text-sm">Detailed view of processed tickets</p>
        </div>
        <Button onClick={downloadCSV} variant="outline" className="font-mono">
          <Download className="w-4 h-4 mr-2" /> Export CSV
        </Button>
      </div>

      <div className="flex gap-4 items-center bg-card p-4 rounded-lg border border-border">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search subject or company..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 font-mono bg-background"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] font-mono bg-background">
            <SelectValue placeholder="Filter Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="replied">Replied</SelectItem>
            <SelectItem value="escalated">Escalated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border border-border rounded-lg bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border">
              <TableHead className="w-[40px]"></TableHead>
              <TableHead className="font-mono text-xs uppercase tracking-wider text-muted-foreground">ID</TableHead>
              <TableHead className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Company</TableHead>
              <TableHead className="font-mono text-xs uppercase tracking-wider text-muted-foreground w-1/3">Subject</TableHead>
              <TableHead className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Status</TableHead>
              <TableHead className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Risk</TableHead>
              <TableHead className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow><TableCell colSpan={7} className="h-32 text-center text-muted-foreground font-mono">Loading results...</TableCell></TableRow>
            ) : filteredResults.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="h-32 text-center text-muted-foreground font-mono">No results found</TableCell></TableRow>
            ) : (
              filteredResults.map(row => (
                <React.Fragment key={row.id}>
                  <TableRow 
                    className="cursor-pointer border-border hover:bg-muted/30 transition-colors"
                    onClick={() => toggleRow(row.id)}
                  >
                    <TableCell>
                      {expandedRows.has(row.id) ? 
                        <ChevronDown className="w-4 h-4 text-muted-foreground" /> : 
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      }
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{row.id.slice(0, 8)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("font-mono", getCompanyColor(row.company))}>
                        {row.company || 'Unknown'}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium truncate max-w-[300px]">{row.subject}</TableCell>
                    <TableCell>
                      <Badge className={cn("font-mono uppercase text-xs tracking-wider", getStatusColor(row.status))}>
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={cn("font-mono uppercase text-xs tracking-wider", getRiskColor(row.risk_level))}>
                        {row.risk_level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={row.confidence * 100} className="w-16 h-1.5" />
                        <span className="font-mono text-xs text-muted-foreground">{(row.confidence * 100).toFixed(0)}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                  <AnimatePresence>
                    {expandedRows.has(row.id) && (
                      <TableRow className="bg-muted/10 border-border hover:bg-muted/10">
                        <TableCell colSpan={7} className="p-0 border-t-0">
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-6 grid grid-cols-2 gap-8">
                              <div className="space-y-6">
                                <div>
                                  <h4 className="font-mono text-xs uppercase text-muted-foreground mb-2">Original Issue</h4>
                                  <div className="bg-background border border-border rounded p-4 text-sm text-foreground">
                                    {row.issue}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-mono text-xs uppercase text-muted-foreground mb-2">AI Response</h4>
                                  <div className="bg-background border border-border rounded p-4 text-sm font-medium text-primary">
                                    {row.response || "No response generated (Escalated)"}
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-6">
                                <div>
                                  <h4 className="font-mono text-xs uppercase text-muted-foreground mb-2">Triage Justification</h4>
                                  <div className="bg-background border border-border rounded p-4 text-sm text-foreground border-l-2 border-l-primary">
                                    {row.justification}
                                  </div>
                                </div>
                                {row.retrieved_docs && row.retrieved_docs.length > 0 && (
                                  <div>
                                    <h4 className="font-mono text-xs uppercase text-muted-foreground mb-2">Sources Referenced</h4>
                                    <ul className="space-y-2">
                                      {row.retrieved_docs.map((doc, i) => (
                                        <li key={i} className="text-xs font-mono bg-background border border-border px-3 py-2 rounded text-muted-foreground flex items-center before:content-['>'] before:mr-2 before:text-primary">
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
