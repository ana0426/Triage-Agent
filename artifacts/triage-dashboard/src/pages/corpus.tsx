import { useState } from "react";
import {
  useGetCorpus, getGetCorpusQueryKey,
  useAddCorpusDocument, useDeleteCorpusDocument, useUpdateCorpusDocument,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
  DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Plus, BookOpen, Loader2, ExternalLink, FileText, Database,
  Trash2, Pencil, AlertTriangle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  source: z.string().min(1, "Source is required"),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

interface DocItem {
  id: string; source: string; title: string; content?: string | null; url?: string | null;
}

const SOURCE_COLORS: Record<string, { badge: string; accent: string; dot: string }> = {
  hackerrank: { badge: "bg-blue-500/10 text-blue-400 border-blue-500/30",   accent: "border-l-blue-500",   dot: "bg-blue-500"   },
  claude:     { badge: "bg-purple-500/10 text-purple-400 border-purple-500/30", accent: "border-l-purple-500", dot: "bg-purple-500" },
  visa:       { badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30", accent: "border-l-yellow-500", dot: "bg-yellow-500" },
  default:    { badge: "bg-primary/10 text-primary border-primary/20",       accent: "border-l-primary",    dot: "bg-primary"    },
};

function getSourceStyle(source: string) {
  const key = source.toLowerCase();
  for (const k of Object.keys(SOURCE_COLORS)) {
    if (k !== "default" && key.includes(k)) return SOURCE_COLORS[k];
  }
  return SOURCE_COLORS.default;
}

// ── Document Form (shared by Add and Edit) ────────────────────────────────────
function DocumentForm({
  form, onSubmit, isPending, submitLabel,
}: {
  form: ReturnType<typeof useForm<z.infer<typeof formSchema>>>;
  onSubmit: (v: z.infer<typeof formSchema>) => void;
  isPending: boolean;
  submitLabel: string;
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
        <div className="grid grid-cols-2 gap-4">
          <FormField control={form.control} name="source" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-semibold uppercase tracking-wide">Source (e.g. HackerRank)</FormLabel>
              <FormControl><Input placeholder="System or company name" className="bg-background" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-semibold uppercase tracking-wide">Document Title</FormLabel>
              <FormControl><Input placeholder="Brief descriptive title" className="bg-background" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        <FormField control={form.control} name="url" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wide">Reference URL <span className="text-muted-foreground font-normal normal-case">(optional)</span></FormLabel>
            <FormControl><Input placeholder="https://docs.example.com/..." className="bg-background" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={form.control} name="content" render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xs font-semibold uppercase tracking-wide">Document Content</FormLabel>
            <FormControl>
              <Textarea placeholder="Paste the document text here…" className="min-h-[160px] bg-background resize-none font-mono text-sm" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <DialogFooter>
          <Button type="submit" disabled={isPending} className="w-full mt-2">
            {isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <BookOpen className="w-4 h-4 mr-2" />}
            {submitLabel}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

// ── Delete Confirmation Dialog ─────────────────────────────────────────────────
function DeleteDialog({ doc, onDelete }: { doc: DocItem; onDelete: () => void }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteMutation = useDeleteCorpusDocument({
    mutation: {
      onSuccess: () => {
        toast({ title: "Document Deleted", description: `"${doc.title}" removed from the knowledge base.` });
        queryClient.invalidateQueries({ queryKey: getGetCorpusQueryKey() });
        setOpen(false);
        onDelete();
      },
      onError: () => {
        toast({ title: "Error", description: "Failed to delete document.", variant: "destructive" });
      },
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={(e) => e.stopPropagation()}
          className="p-1.5 rounded-md text-muted-foreground hover:text-red-400 hover:bg-red-400/10 transition-all"
          title="Delete document"
        >
          <Trash2 size={13} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px] border-border bg-card" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="p-2 rounded-full bg-red-500/10">
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <DialogTitle className="text-base font-semibold">Delete Document</DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            Are you sure you want to delete <span className="text-foreground font-medium">"{doc.title}"</span>?
            This will remove it from the knowledge base and it will no longer be retrieved during triage.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 mt-2">
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            variant="destructive"
            size="sm"
            disabled={deleteMutation.isPending}
            onClick={() => deleteMutation.mutate({ id: doc.id })}
          >
            {deleteMutation.isPending ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5 mr-1.5" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ── Edit Dialog ────────────────────────────────────────────────────────────────
function EditDialog({ doc }: { doc: DocItem }) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const editForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      source: doc.source,
      title: doc.title,
      content: doc.content ?? "",
      url: doc.url ?? "",
    },
  });

  const updateMutation = useUpdateCorpusDocument({
    mutation: {
      onSuccess: () => {
        toast({ title: "Document Updated", description: "Changes saved to the knowledge base." });
        queryClient.invalidateQueries({ queryKey: getGetCorpusQueryKey() });
        setOpen(false);
      },
      onError: () => {
        toast({ title: "Error", description: "Failed to update document.", variant: "destructive" });
      },
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateMutation.mutate({ id: doc.id, data: { source: values.source, title: values.title, content: values.content, url: values.url || null } });
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (v) editForm.reset({ source: doc.source, title: doc.title, content: doc.content ?? "", url: doc.url ?? "" }); }}>
      <DialogTrigger asChild>
        <button
          onClick={(e) => e.stopPropagation()}
          className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
          title="Edit document"
        >
          <Pencil size={13} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[620px] border-border bg-card" onClick={(e) => e.stopPropagation()}>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Edit Document</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Changes take effect immediately — updated content will be used the next time a relevant ticket is triaged.
          </DialogDescription>
        </DialogHeader>
        <DocumentForm form={editForm} onSubmit={onSubmit} isPending={updateMutation.isPending} submitLabel="Save Changes" />
      </DialogContent>
    </Dialog>
  );
}

// ── Viewer Dialog (read-only, opens on card click) ────────────────────────────
function DocumentViewerDialog({ doc, children }: { doc: DocItem; children: React.ReactNode }) {
  const style = getSourceStyle(doc.source);
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[700px] border-border bg-card">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="outline" className={cn("text-xs font-semibold uppercase tracking-wide", style.badge)}>
              {doc.source}
            </Badge>
            <span className="text-[10px] font-mono text-muted-foreground">{doc.id}</span>
          </div>
          <DialogTitle className="text-lg font-semibold leading-snug">{doc.title}</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Knowledge base document — retrieved by the AI during triage for relevant tickets
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[380px] rounded-lg border border-border bg-background p-4 mt-1">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {doc.content ?? "No content available for this document."}
          </p>
        </ScrollArea>

        {doc.url && (
          <div className="mt-2 flex items-center gap-2 text-xs">
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <a
              href={doc.url} target="_blank" rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors truncate"
            >
              {doc.url}
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Corpus() {
  const [addOpen, setAddOpen] = useState(false);
  const [sourceFilter, setSourceFilter] = useState("all");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetCorpus({ query: { queryKey: getGetCorpusQueryKey() } });

  const addDocMutation = useAddCorpusDocument({
    mutation: {
      onSuccess: () => {
        toast({ title: "Document Added", description: "Successfully added to the knowledge base." });
        queryClient.invalidateQueries({ queryKey: getGetCorpusQueryKey() });
        setAddOpen(false); form.reset();
      },
      onError: () => {
        toast({ title: "Error", description: "Failed to add document.", variant: "destructive" });
      },
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { source: "", title: "", content: "", url: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addDocMutation.mutate({ data: { source: values.source, title: values.title, content: values.content, url: values.url || null } });
  };

  const docs: DocItem[] = (data?.documents as DocItem[]) ?? [];
  const sources = Array.from(new Set(docs.map(d => d.source))).sort();
  const filtered = sourceFilter === "all" ? docs : docs.filter(d => d.source === sourceFilter);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Knowledge Base</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Documents retrieved by the AI when triaging support tickets
          </p>
        </div>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" /> Add Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[620px] border-border bg-card">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Ingest New Document</DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Add a document to the RAG knowledge base. It will be retrieved and cited during ticket triage.
              </DialogDescription>
            </DialogHeader>
            <DocumentForm form={form} onSubmit={onSubmit} isPending={addDocMutation.isPending} submitLabel="Ingest Document" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats bar */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Database size={14} />
          <span><span className="text-foreground font-medium">{docs.length}</span> documents</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span><span className="text-foreground font-medium">{sources.length}</span> sources</span>
        </div>
      </div>

      {/* Source Filter Tabs */}
      {sources.length > 1 && (
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setSourceFilter("all")}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium border transition-all",
              sourceFilter === "all"
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            )}
          >
            All ({docs.length})
          </button>
          {sources.map(src => {
            const style = getSourceStyle(src);
            const count = docs.filter(d => d.source === src).length;
            return (
              <button
                key={src}
                onClick={() => setSourceFilter(src)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium border transition-all",
                  sourceFilter === src ? style.badge : "border-border text-muted-foreground hover:text-foreground"
                )}
              >
                {src} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Document Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => <Card key={i} className="animate-pulse bg-muted/20 h-44" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-border rounded-xl text-muted-foreground gap-3">
          <Database size={36} className="opacity-20" />
          <p className="text-sm">No documents yet</p>
          <p className="text-xs">Add your first document to get started</p>
          <Button size="sm" variant="outline" onClick={() => setAddOpen(true)}>
            <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Document
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(doc => {
            const style = getSourceStyle(doc.source);
            return (
              <DocumentViewerDialog key={doc.id} doc={doc}>
                <Card className={cn(
                  "border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer group border-l-2",
                  style.accent
                )}>
                  <CardHeader className="pb-2 pt-4 px-4">
                    <div className="flex items-start justify-between gap-2">
                      <Badge variant="outline" className={cn("text-[10px] font-semibold uppercase tracking-wider shrink-0", style.badge)}>
                        {doc.source}
                      </Badge>
                      {/* Action buttons — always visible, stop click propagating to viewer */}
                      <div className="flex items-center gap-0.5 shrink-0">
                        {doc.url && <ExternalLink size={11} className="text-muted-foreground mr-1" />}
                        <EditDialog doc={doc} />
                        <DeleteDialog doc={doc} onDelete={() => {
                          if (sourceFilter !== "all" && docs.filter(d => d.source === sourceFilter).length <= 1) {
                            setSourceFilter("all");
                          }
                        }} />
                      </div>
                    </div>
                    <CardTitle className="text-sm font-semibold leading-snug mt-2 group-hover:text-primary transition-colors line-clamp-2">
                      {doc.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4 px-4 pt-0">
                    <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      {doc.content ?? ""}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground group-hover:text-primary transition-colors">
                        <FileText size={10} />
                        Click to read full document
                      </div>
                      {doc.content && (
                        <span className="text-[10px] text-muted-foreground">
                          {doc.content.length.toLocaleString()} chars
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </DocumentViewerDialog>
            );
          })}
        </div>
      )}
    </div>
  );
}
