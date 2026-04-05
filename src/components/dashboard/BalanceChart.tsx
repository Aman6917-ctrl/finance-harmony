import { useDashboard } from "@/context/DashboardContext";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { LineChart as LineChartIcon } from "lucide-react";

/** Cumulative net balance (income − expenses) by calendar day, sorted in time order. */
function buildBalanceTrend(transactions: { date: string; type: string; amount: number }[]) {
  if (transactions.length === 0) return [];

  const dailyNet = new Map<string, number>();
  for (const t of transactions) {
    const delta = t.type === "income" ? t.amount : -t.amount;
    dailyNet.set(t.date, (dailyNet.get(t.date) ?? 0) + delta);
  }

  const dates = [...dailyNet.keys()].sort((a, b) => a.localeCompare(b));
  let balance = 0;
  return dates.map((date) => {
    balance += dailyNet.get(date) ?? 0;
    balance = Math.round(balance * 100) / 100;
    const d = new Date(date + "T12:00:00");
    return {
      date,
      label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      balance,
    };
  });
}

const BalanceChart = () => {
  const { transactions } = useDashboard();

  const data = useMemo(() => buildBalanceTrend(transactions), [transactions]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card noise inner-glow p-6 h-full w-full min-w-0"
    >
      <div className="relative z-10 flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <LineChartIcon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-display font-bold text-card-foreground">Balance trend</h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">Cumulative net balance over time</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-md bg-primary" />
          <span className="text-[10px] text-muted-foreground font-medium">Balance</span>
        </div>
      </div>

      <div className="h-60 relative z-10 w-full min-w-0">
        {data.length === 0 ? (
          <div className="h-full flex items-center justify-center text-[12px] text-muted-foreground border border-dashed border-border/40 rounded-2xl">
            Add transactions to see your balance trend
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.3} vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))", fontFamily: "var(--font-body)" }}
                axisLine={false}
                tickLine={false}
                dy={8}
                interval="preserveStartEnd"
                minTickGap={28}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))", fontFamily: "var(--font-mono)" }}
                tickFormatter={(v) => {
                  const n = Number(v);
                  if (Math.abs(n) >= 1000) return `$${(n / 1000).toFixed(1)}k`;
                  return `$${n.toFixed(0)}`;
                }}
                axisLine={false}
                tickLine={false}
                width={48}
              />
              <Tooltip
                cursor={{ stroke: "hsl(var(--primary) / 0.35)", strokeWidth: 1 }}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "1rem",
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  boxShadow: "0 16px 48px -12px hsl(var(--foreground) / 0.15)",
                  backdropFilter: "blur(12px)",
                }}
                labelFormatter={(_, payload) => {
                  const row = payload?.[0]?.payload as { date?: string; label?: string } | undefined;
                  return row?.date
                    ? new Date(row.date + "T12:00:00").toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "";
                }}
                formatter={(value: number) => [`$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, "Balance"]}
              />
              <Line
                type="monotone"
                dataKey="balance"
                stroke="hsl(var(--primary))"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "hsl(var(--card))", stroke: "hsl(var(--primary))", strokeWidth: 2 }}
                activeDot={{ r: 5, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </motion.div>
  );
};

export default BalanceChart;
