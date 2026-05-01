import { Link, useLocation } from "wouter";
import { Terminal, LayoutDashboard, TableProperties, ScrollText, Database, ShieldAlert } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Command Center", icon: LayoutDashboard },
    { href: "/results", label: "Triage Results", icon: TableProperties },
    { href: "/logs", label: "System Logs", icon: ScrollText },
    { href: "/corpus", label: "Knowledge Base", icon: Database },
  ];

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-sidebar flex flex-col">
        <div className="p-6 border-b border-border flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center text-primary">
            <ShieldAlert size={18} />
          </div>
          <div>
            <h1 className="font-mono font-bold text-sm uppercase tracking-wider text-foreground">TRIAGE_OPS</h1>
            <p className="text-[10px] font-mono text-muted-foreground">v2.0.4 // ONLINE</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href} className="block">
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon size={16} className={isActive ? "text-primary" : "text-muted-foreground"} />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs font-mono text-green-500 bg-green-500/10 px-3 py-2 rounded">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            AI ENGINE ACTIVE
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-background flex flex-col relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-indigo-500 z-50"></div>
        {children}
      </main>
    </div>
  );
}
