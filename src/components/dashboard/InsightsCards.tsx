import { useDashboard, type Transaction } from "@/context/DashboardContext";
import { useMemo } from "react";
import { TrendingUp, TrendingDown, ListOrdered, PieChart } from "lucide-react";
import { motion } from "framer-motion";

/** Derived metrics from the full transaction list (not filter/search scoped). */
function computeInsights(transactions: Transaction[]) {
  let totalIncome = 0;
  let totalExpenses = 0;
  const expenseByCategory = new Map<string, number>();

  for (const t of transactions) {
    if (t.type === "income") {
      totalIncome += t.amount;
    } else {
      totalExpenses += t.amount;
      expenseByCategory.set(t.category, (expenseByCategory.get(t.category) ?? 0) + t.amount);
    }
  }

  let highestCategory: { name: string; amount: number } | null = null;
  for (const [name, amount] of expenseByCategory) {
    if (!highestCategory || amount > highestCategory.amount) {
      highestCategory = { name, amount };
    }
  }

  return {
    totalIncome,
    totalExpenses,
    totalCount: transactions.length,
    highestSpendingCategory: highestCategory,
  };
}

const InsightsCards = () => {
  const { transactions } = useDashboard();

  const insights = useMemo(() => computeInsights(transactions), [transactions]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const cards = [
    {
      label: "Total income",
      value: fmt(insights.totalIncome),
      sub: "Sum of all income",
      icon: TrendingUp,
      color: "text-income",
      bg: "bg-income/10",
      borderColor: "border-income/10",
    },
    {
      label: "Total expenses",
      value: fmt(insights.totalExpenses),
      sub: "Sum of all expenses",
      icon: TrendingDown,
      color: "text-expense",
      bg: "bg-expense/10",
      borderColor: "border-expense/10",
    },
    {
      label: "Transactions",
      value: insights.totalCount.toLocaleString("en-US"),
      sub: "Total records",
      icon: ListOrdered,
      color: "text-primary",
      bg: "bg-primary/10",
      borderColor: "border-primary/10",
    },
    {
      label: "Highest spending",
      value: insights.highestSpendingCategory?.name ?? "—",
      sub: insights.highestSpendingCategory
        ? fmt(insights.highestSpendingCategory.amount)
        : "No expense data",
      icon: PieChart,
      color: "text-chart-3",
      bg: "bg-chart-3/10",
      borderColor: "border-chart-3/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 w-full min-w-0">
      {cards.map((card) => (
        <motion.div
          key={card.label}
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card noise inner-glow p-4 cursor-default w-full min-w-0"
        >
          <div className="relative z-10 flex items-start gap-3">
            <div className={`p-2 rounded-xl ${card.bg} border ${card.borderColor} shrink-0`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-1">{card.label}</p>
              <p className="text-lg font-display font-bold text-card-foreground leading-tight truncate">{card.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{card.sub}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default InsightsCards;
