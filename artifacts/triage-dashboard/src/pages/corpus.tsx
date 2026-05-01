import { useState } from "react";
import { useGetCorpus, getGetCorpusQueryKey, useAddCorpusDocument } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, BookOpen, Link as LinkIcon, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  source: z.string().min(1, "Source is required"),
  title: z.string().min(1, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export default function Corpus() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, isLoading } = useGetCorpus({
    query: { queryKey: getGetCorpusQueryKey() }
  });

  const addDocMutation = useAddCorpusDocument({
    mutation: {
      onSuccess: () => {
        toast({ title: "Document Added", description: "Successfully added to the knowledge base." });
        queryClient.invalidateQueries({ queryKey: getGetCorpusQueryKey() });
        setOpen(false);
        form.reset();
      },
      onError: () => {
        toast({ title: "Error", description: "Failed to add document.", variant: "destructive" });
      }
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      source: "",
      title: "",
      content: "",
      url: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addDocMutation.mutate({ 
      data: {
        source: values.source,
        title: values.title,
        content: values.content,
        url: values.url || null
      }
    });
  };

  const getSourceColor = (source: string) => {
    const s = source.toLowerCase();
    if (s.includes('hackerrank')) return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    if (s.includes('claude')) return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
    if (s.includes('visa')) return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    return 'bg-primary/10 text-primary border-primary/20';
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-mono font-bold uppercase tracking-tight">Knowledge Base</h1>
          <p className="text-muted-foreground mt-1 font-mono text-sm">Corpus documents used for RAG triage</p>
        </div>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="font-mono uppercase tracking-wider">
              <Plus className="w-4 h-4 mr-2" /> Add Document
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] border-border bg-card">
            <DialogHeader>
              <DialogTitle className="font-mono uppercase text-lg">Ingest New Document</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="source"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-xs uppercase">Source (e.g. HackerRank)</FormLabel>
                        <FormControl>
                          <Input placeholder="System/Company name" className="bg-background font-mono" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-mono text-xs uppercase">Document Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Title" className="bg-background font-mono" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-xs uppercase">Reference URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://..." className="bg-background font-mono" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-mono text-xs uppercase">Document Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Paste document text here..." 
                          className="min-h-[200px] bg-background font-mono resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={addDocMutation.isPending} className="font-mono uppercase tracking-wider w-full mt-4">
                    {addDocMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <BookOpen className="w-4 h-4 mr-2" />}
                    Ingest Document
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => (
            <Card key={i} className="animate-pulse bg-muted/20 h-40" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.documents?.map((doc) => (
            <Card key={doc.id} className="bg-card border-border hover:border-primary/50 transition-colors group">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-4">
                  <Badge variant="outline" className={cn("font-mono uppercase text-xs tracking-wider shrink-0", getSourceColor(doc.source))}>
                    {doc.source}
                  </Badge>
                  <span className="text-[10px] font-mono text-muted-foreground truncate">{doc.id.slice(0, 8)}</span>
                </div>
                <CardTitle className="text-base font-medium line-clamp-2 mt-3 group-hover:text-primary transition-colors">
                  {doc.title}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
          {data?.documents?.length === 0 && (
            <div className="col-span-full text-center py-20 font-mono text-muted-foreground border border-dashed border-border rounded-lg">
              No documents in corpus. Add one to get started.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
