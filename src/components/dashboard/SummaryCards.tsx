import { useDashboard } from "@/context/DashboardContext";
import { Wallet, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useTilt3D } from "@/hooks/useTilt3D";
import Sparkline from "./Sparkline";
import { useMemo } from "react";

const AnimatedValue = ({ value }: { value: number }) => {
  const animated = useAnimatedCounter(value, 1500, 2);
  return (
    <span className="font-mono tabular-nums">
      ${animated.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </span>
  );
};

const TiltCard = ({ children, className, delay }: { children: React.ReactNode; className?: string; delay: number }) => {
  const { ref, style, onMouseMove, onMouseLeave } = useTilt3D(8);
  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, delay: delay * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SummaryCards = () => {
  const { transactions } = useDashboard();
  const totalIncome = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
  const totalBalance = totalIncome - totalExpenses;

  const sparkData = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => a.date.localeCompare(b.date));
    let running = 0;
    const balances: number[] = [];
    const incomes: number[] = [];
    const expenses: number[] = [];
    sorted.forEach(t => {
      running += t.type === "income" ? t.amount : -t.amount;
      balances.push(running);
      if (t.type === "income") incomes.push(t.amount);
      else expenses.push(t.amount);
    });
    return {
      balance: balances.slice(-8),
      income: incomes.length > 1 ? incomes.slice(-8) : [0, ...incomes],
      expense: expenses.length > 1 ? expenses.slice(-8) : [0, ...expenses],
    };
  }, [transactions]);

  const cards = [
    {
      label: "Total Balance",
      value: totalBalance,
      icon: Wallet,
      trend: "+12.5%",
      trendUp: true,
      sparkline: sparkData.balance,
      sparkColor: "hsl(217, 91%, 60%)",
      accentClass: "from-primary/20 to-primary-glow/10",
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      label: "Total Income",
      value: totalIncome,
      icon: TrendingUp,
      trend: "+8.2%",
      trendUp: true,
      sparkline: sparkData.income,
      sparkColor: "hsl(160, 84%, 39%)",
      accentClass: "from-income/20 to-income-glow/10",
      iconBg: "bg-income/10",
      iconColor: "text-income",
    },
    {
      label: "Total Expenses",
      value: totalExpenses,
      icon: TrendingDown,
      trend: "-3.1%",
      trendUp: false,
      sparkline: sparkData.expense,
      sparkColor: "hsl(0, 72%, 51%)",
      accentClass: "from-expense/20 to-expense-glow/10",
      iconBg: "bg-expense/10",
      iconColor: "text-expense",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full min-w-0">
      {cards.map((card, i) => (
        <TiltCard
          key={card.label}
          delay={0.1 + i * 0.08}
          className="glass-card gradient-border inner-glow noise p-5 cursor-default w-full min-w-0"
        >
          <div className="relative z-10">
            {/* Top accent gradient */}
            <div className={`absolute -top-5 -left-5 -right-5 h-20 bg-gradient-to-b ${card.accentClass} to-transparent opacity-60 pointer-events-none`} />

            <div className="relative flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-xl ${card.iconBg} backdrop-blur-sm`}>
                  <card.icon className={`h-4 w-4 ${card.iconColor}`} />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.14em]">{card.label}</span>
              </div>
              <Sparkline data={card.sparkline} color={card.sparkColor} width={64} height={28} />
            </div>

            <p className="relative text-2xl font-display font-bold text-card-foreground tracking-tight mb-3">
              <AnimatedValue value={card.value} />
            </p>

            <div className="relative flex items-center gap-2">
              {card.trendUp ? (
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-income/10 border border-income/10">
                  <ArrowUpRight className="h-3 w-3 text-income" />
                  <span className="text-[10px] font-bold text-income">{card.trend}</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-expense/10 border border-expense/10">
                  <ArrowDownRight className="h-3 w-3 text-expense" />
                  <span className="text-[10px] font-bold text-expense">{card.trend}</span>
                </div>
              )}
              <span className="text-[10px] text-muted-foreground">vs last month</span>
            </div>
          </div>
        </TiltCard>
      ))}
    </div>
  );
};

export default SummaryCards;
