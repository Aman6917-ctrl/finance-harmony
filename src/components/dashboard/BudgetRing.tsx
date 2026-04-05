import { useDashboard } from "@/context/DashboardContext";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Target } from "lucide-react";

const BUDGET_LIMITS: Record<string, number> = {
  Food: 300, Travel: 500, Bills: 400, Shopping: 350, Entertainment: 100, Health: 200,
};

const BudgetRing = () => {
  const { transactions } = useDashboard();

  const budgetData = useMemo(() => {
    const now = new Date();
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    const expenses = transactions.filter(t => t.type === "expense" && t.date.startsWith(thisMonth));
    const byCat = new Map<string, number>();
    expenses.forEach(t => byCat.set(t.category, (byCat.get(t.category) || 0) + t.amount));
    const totalBudget = Object.values(BUDGET_LIMITS).reduce((s, v) => s + v, 0);
    const totalSpent = expenses.reduce((s, t) => s + t.amount, 0);
    const percentage = Math.min((totalSpent / totalBudget) * 100, 100);
    const topCategories = Object.entries(BUDGET_LIMITS).map(([cat, limit]) => ({
      name: cat, spent: byCat.get(cat) || 0, limit,
      pct: Math.min(((byCat.get(cat) || 0) / limit) * 100, 100),
    })).sort((a, b) => b.pct - a.pct).slice(0, 4);
    return { totalBudget, totalSpent, percentage, topCategories };
  }, [transactions]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card noise inner-glow p-6 w-full min-w-0"
    >
      <div className="relative z-10 flex items-center gap-3 mb-5">
        <div className="p-2 rounded-xl bg-chart-3/10 border border-chart-3/10">
          <Target className="h-4 w-4 text-chart-3" />
        </div>
        <div>
          <h3 className="text-sm font-display font-bold text-card-foreground">Budget Tracker</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">Monthly spending limits</p>
        </div>
      </div>

      <div className="relative z-10 space-y-4">
        {budgetData.topCategories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between text-[12px] mb-1.5">
              <span className="font-medium text-card-foreground">{cat.name}</span>
              <span className="text-muted-foreground font-mono text-[11px]">
                ${cat.spent.toFixed(0)}<span className="text-muted-foreground/40"> / ${cat.limit}</span>
              </span>
            </div>
            <div className="h-2 rounded-full bg-muted/60 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  backgroundColor: cat.pct > 80 ? "hsl(var(--expense))" : cat.pct > 50 ? "hsl(var(--warning))" : "hsl(var(--income))",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${cat.pct}%` }}
                transition={{ duration: 1, delay: 0.8 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 mt-5 pt-4 border-t border-border/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] text-muted-foreground font-semibold uppercase tracking-wider">Overall</span>
          <span className="text-lg font-display font-bold text-card-foreground">{Math.round(budgetData.percentage)}%</span>
        </div>
        <div className="h-2.5 rounded-full bg-muted/60 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow"
            initial={{ width: 0 }}
            animate={{ width: `${budgetData.percentage}%` }}
            transition={{ duration: 1.2, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default BudgetRing;
