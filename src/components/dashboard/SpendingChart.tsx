import { useDashboard, type Transaction } from "@/context/DashboardContext";
import { CATEGORY_EMOJIS } from "@/lib/categoryEmojis";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { PieChart as PieIcon } from "lucide-react";

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
];

/** Sum expenses by category; sorted descending by amount. */
function buildExpenseByCategory(transactions: Transaction[]) {
  const byCat = new Map<string, number>();
  for (const t of transactions) {
    if (t.type !== "expense") continue;
    byCat.set(t.category, (byCat.get(t.category) ?? 0) + t.amount);
  }
  return Array.from(byCat.entries())
    .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
    .sort((a, b) => b.value - a.value);
}

const SpendingChart = () => {
  const { transactions } = useDashboard();

  const data = useMemo(() => buildExpenseByCategory(transactions), [transactions]);

  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card noise inner-glow p-6 w-full min-w-0"
    >
      <div className="relative z-10 flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-chart-4/10">
            <PieIcon className="h-4 w-4 text-chart-4" />
          </div>
          <div>
            <h3 className="text-sm font-display font-bold text-card-foreground">Spending breakdown</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Expense totals by category</p>
          </div>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-muted/40 border border-border/40">
          <span className="text-sm font-mono font-bold text-card-foreground">
            ${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="relative z-10 flex items-center justify-center min-h-[180px] w-full min-w-0 text-[12px] text-muted-foreground border border-dashed border-border/40 rounded-2xl">
          No expenses yet — category split will appear here
        </div>
      ) : (
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full min-w-0">
          <div className="relative flex items-center justify-center min-w-0 w-full">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={data}
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={72}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {data.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "1rem",
                    fontSize: 12,
                    fontFamily: "var(--font-mono)",
                    backdropFilter: "blur(12px)",
                  }}
                  formatter={(value: number, name: string) => [
                    `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
                    name,
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 flex flex-col justify-center min-w-0 w-full">
            {data.map((item, i) => {
              const pct = total > 0 ? ((item.value / total) * 100).toFixed(0) : "0";
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-2.5 py-1.5 px-2 -mx-2 rounded-lg hover:bg-muted/20 transition-colors cursor-default"
                >
                  <div
                    className="w-2.5 h-2.5 rounded-md shrink-0"
                    style={{ backgroundColor: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-xs">{CATEGORY_EMOJIS[item.name] ?? "📦"}</span>
                  <span className="text-card-foreground font-medium flex-1 truncate text-[12px]">{item.name}</span>
                  <span className="text-muted-foreground font-mono text-[11px] font-semibold">{pct}%</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SpendingChart;
