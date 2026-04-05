import { useState, useEffect, useRef } from "react";
import { useDashboard } from "@/context/DashboardContext";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowRight, Moon, Sun, Shield, Eye, FileDown } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

const CommandPalette = ({ open, onClose }: Props) => {
  const { role, setRole, darkMode, setDarkMode } = useDashboard();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const commands = [
    { label: "Toggle Dark Mode", icon: darkMode ? Sun : Moon, action: () => { setDarkMode(!darkMode); onClose(); }, keywords: "theme light dark" },
    { label: `Switch to ${role === "admin" ? "Viewer" : "Admin"}`, icon: role === "admin" ? Eye : Shield, action: () => { setRole(role === "admin" ? "viewer" : "admin"); onClose(); }, keywords: "role permission" },
    { label: "Export CSV", icon: FileDown, action: () => { onClose(); }, keywords: "download export" },
  ];

  const filtered = commands.filter(c =>
    !query || c.label.toLowerCase().includes(query.toLowerCase()) || c.keywords.includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-md z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="fixed top-[20%] left-1/2 z-50 w-[min(32rem,calc(100vw-2rem))] -translate-x-1/2 glass-card shadow-2xl overflow-hidden border-primary/15 ring-1 ring-primary/10"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border/30">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none font-body"
              />
              <kbd className="px-2 py-1 rounded-lg bg-muted border border-border text-[10px] font-mono text-muted-foreground">ESC</kbd>
            </div>
            <div className="py-2 max-h-[300px] overflow-y-auto custom-scroll">
              {filtered.length === 0 ? (
                <p className="px-5 py-8 text-center text-sm text-muted-foreground">No results found</p>
              ) : (
                filtered.map((cmd, i) => (
                  <button
                    key={i}
                    onClick={cmd.action}
                    className="w-full flex items-center gap-3 px-5 py-3 text-sm text-card-foreground hover:bg-primary/5 transition-all duration-200 group"
                  >
                    <div className="p-1.5 rounded-lg bg-muted/50 group-hover:bg-primary/10 transition-colors">
                      <cmd.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <span className="flex-1 text-left font-medium">{cmd.label}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))
              )}
            </div>
            <div className="px-5 py-3 border-t border-border/30 flex items-center gap-5 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-muted text-[9px] font-mono">↑↓</kbd> Navigate</span>
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-muted text-[9px] font-mono">↵</kbd> Select</span>
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 rounded bg-muted text-[9px] font-mono">ESC</kbd> Close</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
