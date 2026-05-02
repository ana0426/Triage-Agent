import { Link, useLocation } from "wouter";
import { LayoutDashboard, TableProperties, ScrollText, Database, ShieldCheck, Zap, Home } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/dashboard", label: "Command Center", icon: LayoutDashboard, desc: "Submit & process tickets" },
    { href: "/results", label: "Triage Results", icon: TableProperties, desc: "View AI responses" },
    { href: "/logs", label: "System Logs", icon: ScrollText, desc: "Decision traces" },
    { href: "/corpus", label: "Knowledge Base", icon: Database, desc: "RAG documents" },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      <aside className="w-60 border-r border-border bg-sidebar flex flex-col shrink-0">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-border flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/30">
            <ShieldCheck size={18} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-foreground leading-none tracking-tight">TriageOps</h1>
            <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
              AI Engine Online
            </p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {/* Back to home */}
          <Link href="/" className="block mb-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
              <Home size={12} />
              <span>Back to Home</span>
            </div>
          </Link>

          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest px-3 mb-2">Navigation</p>
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href} className="block">
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon size={16} className={isActive ? "text-primary-foreground" : "text-muted-foreground"} />
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm ${isActive ? "font-semibold" : "font-medium"}`}>{item.label}</div>
                    {!isActive && <div className="text-[10px] text-muted-foreground/70 truncate">{item.desc}</div>}
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-border space-y-2">
          <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 px-3 py-2 rounded-lg border border-green-500/20">
            <Zap size={12} className="shrink-0" />
            <span className="font-medium">AI Engine Active</span>
          </div>
          <p className="text-[10px] text-muted-foreground text-center">HackerRank Orchestrate v2.0</p>
        </div>
      </aside>

      <main className="flex-1 overflow-auto bg-background flex flex-col relative">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-blue-500 to-indigo-500 z-50" />
        {children}
      </main>
    </div>
  );
}
