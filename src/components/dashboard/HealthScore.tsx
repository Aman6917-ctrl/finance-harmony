import { useDashboard } from "@/context/DashboardContext";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp } from "lucide-react";

const HealthScore = () => {
  const { transactions } = useDashboard();

  const { score, label, color, advice } = useMemo(() => {
    const income = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;
    const cats = new Set(transactions.filter(t => t.type === "expense").map(t => t.category));
    const diversification = Math.min(cats.size / 6, 1);
    let s = Math.round(savingsRate * 0.8 + diversification * 20);
    s = Math.max(0, Math.min(100, s));
    const l = s >= 80 ? "Excellent" : s >= 60 ? "Good" : s >= 40 ? "Fair" : "Needs Work";
    const c = s >= 80 ? "income" : s >= 60 ? "primary" : s >= 40 ? "warning" : "expense";
    const a = s >= 80 ? "Great savings! Keep it up." : s >= 60 ? "You're on track." : s >= 40 ? "Cut some expenses." : "Review spending habits.";
    return { score: s, label: l, color: c, advice: a };
  }, [transactions]);

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;
  const colorMap: Record<string, string> = { income: "var(--income)", primary: "var(--primary)", warning: "var(--warning)", expense: "var(--expense)" };
  const bgMap: Record<string, string> = { income: "bg-income/10", primary: "bg-primary/10", warning: "bg-warning/10", expense: "bg-expense/10" };
  const textMap: Record<string, string> = { income: "text-income", primary: "text-primary", warning: "text-warning", expense: "text-expense" };

  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card noise inner-glow p-5 flex flex-col items-center justify-center h-full w-full min-w-0"
    >
      <div className="relative w-32 h-32 mb-3">
        <svg className="w-full h-full stat-ring" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--muted))" strokeWidth="5" strokeOpacity="0.4" />
          <motion.circle
            cx="60" cy="60" r="54" fill="none"
            stroke={`hsl(${colorMap[color]})`}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={false}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="text-3xl font-display font-bold text-card-foreground"
          >
            {score}
          </motion.span>
          <span className="text-[9px] text-muted-foreground uppercase tracking-widest mt-0.5">Score</span>
        </div>
      </div>

      <div className={`relative z-10 px-3 py-1.5 rounded-full ${bgMap[color]} border border-current/10 mb-2`}>
        <span className={`text-[11px] font-bold ${textMap[color]}`}>{label}</span>
      </div>

      <p className="relative z-10 text-[10px] text-muted-foreground text-center leading-relaxed max-w-full px-1">{advice}</p>

      <div className="relative z-10 flex items-center gap-3 mt-3 pt-3 border-t border-border/30 w-full justify-center">
        <div className="flex items-center gap-1">
          <ShieldCheck className="h-3 w-3 text-income" />
          <span className="text-[9px] text-muted-foreground font-medium">Savings</span>
        </div>
        <div className="w-px h-3 bg-border/50" />
        <div className="flex items-center gap-1">
          <TrendingUp className="h-3 w-3 text-primary" />
          <span className="text-[9px] text-muted-foreground font-medium">Growth</span>
        </div>
      </div>
    </motion.div>
  );
};

export default HealthScore;
