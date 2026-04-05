import { Sparkles } from "lucide-react";

const STACK = ["React 18", "TypeScript", "Tailwind CSS", "Recharts", "Vite"] as const;

const DashboardFooter = () => (
  <footer
    className="mt-20 sm:mt-24 pt-10 pb-8 border-t border-border/35"
    role="contentinfo"
  >
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 min-w-0">
      <div className="space-y-2 min-w-0 max-w-lg">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary shrink-0" aria-hidden />
          <span className="font-display font-bold text-sm text-foreground tracking-tight">FinFlow</span>
          <span className="text-[10px] font-mono text-muted-foreground/70 px-2 py-0.5 rounded-md bg-muted/40 border border-border/40">
            v2
          </span>
        </div>
        <p className="text-[12px] sm:text-[13px] text-muted-foreground leading-relaxed">
          A focused personal finance experience — balances, spending insight, and a role-aware ledger with
          local persistence. Built as a portfolio-grade UI exercise.
        </p>
      </div>
      <div className="flex flex-wrap gap-2 lg:justify-end">
        {STACK.map((t) => (
          <span
            key={t}
            className="text-[10px] font-mono px-2.5 py-1.5 rounded-lg bg-muted/35 border border-border/45 text-muted-foreground tabular-nums hover:border-primary/25 hover:bg-muted/50 transition-colors duration-300"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
    <p className="mt-8 pt-6 border-t border-border/25 text-center text-[10px] text-muted-foreground/60 tracking-wide">
      Crafted with attention to typography, motion, and dark-mode detail.
    </p>
  </footer>
);

export default DashboardFooter;
