import { useDashboard } from "@/context/DashboardContext";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";

const ActivityFeed = () => {
  const { transactions } = useDashboard();

  const recent = useMemo(() => {
    return [...transactions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  }, [transactions]);

  const timeAgo = (dateStr: string) => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Today";
    if (diff === 1) return "Yesterday";
    return `${diff}d ago`;
  };

  const emojis: Record<string, string> = {
    Food: "🍔", Travel: "✈️", Bills: "📄", Shopping: "🛒",
    Salary: "💰", Freelance: "💻", Entertainment: "🎬", Health: "🏥", Other: "📦",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card noise inner-glow p-5 h-full w-full min-w-0"
    >
      <div className="relative z-10 flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-income/10">
            <Radio className="h-4 w-4 text-income" />
          </div>
          <h3 className="text-sm font-display font-bold text-card-foreground">Live Activity</h3>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-income/10 border border-income/15">
          <div className="w-1.5 h-1.5 rounded-full bg-income relative">
            <span className="absolute inset-0 rounded-full bg-income animate-ping opacity-50" />
          </div>
          <span className="text-[10px] text-income font-semibold">Live</span>
        </div>
      </div>

      <div className="relative z-10 space-y-0.5">
        {recent.map((tx, i) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3 py-2.5 px-2.5 -mx-2.5 rounded-xl hover:bg-muted/20 transition-all duration-300 group cursor-default"
          >
            <div className="w-9 h-9 rounded-xl bg-muted/40 flex items-center justify-center text-base shrink-0 group-hover:scale-105 transition-transform duration-300">
              {emojis[tx.category] || "📦"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-card-foreground truncate">{tx.description}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{timeAgo(tx.date)}</p>
            </div>
            <span className={`text-[12px] font-bold font-mono tabular-nums shrink-0 ${
              tx.type === "income" ? "text-income" : "text-expense"
            }`}>
              {tx.type === "income" ? "+" : "-"}${tx.amount.toLocaleString()}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ActivityFeed;
