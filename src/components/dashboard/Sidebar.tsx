import { LayoutDashboard, ArrowLeftRight, PieChart, Lightbulb, Settings, LogOut, CreditCard, Bell, Zap, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: ArrowLeftRight, label: "Transactions" },
  { icon: PieChart, label: "Analytics" },
  { icon: Lightbulb, label: "Insights" },
  { icon: CreditCard, label: "Wallets" },
  { icon: Bell, label: "Alerts" },
];

const Sidebar = () => {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="hidden lg:flex flex-col w-[240px] min-h-screen glass-sidebar fixed left-0 top-0 z-40 border-r border-white/[0.06]"
    >
      <div className="p-6 flex-1 flex flex-col">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center glow-primary relative">
            <Zap className="h-4 w-4 text-primary-foreground" />
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-income border-2 border-[hsl(var(--sidebar-bg))]">
              <span className="absolute inset-0 rounded-full bg-income animate-ping opacity-40" />
            </div>
          </div>
          <div>
            <h1 className="text-[15px] font-display font-bold text-white tracking-tight leading-none">
              Fin<span className="text-gradient">Flow</span>
            </h1>
            <p className="text-[9px] text-white/30 tracking-[0.28em] uppercase mt-1 font-semibold">
              Dashboard v2.0
            </p>
          </div>
        </div>

        {/* Nav */}
        <div className="space-y-1 flex-1">
          <p className="px-3 mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white/15">Menu</p>
          {navItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-300 group ${
                item.active
                  ? "bg-primary/15 text-primary shadow-lg shadow-primary/10 ring-1 ring-primary/20"
                  : "text-white/35 hover:text-white/80 hover:bg-white/[0.04]"
              }`}
            >
              <item.icon className={`h-[18px] w-[18px] transition-transform duration-300 ${item.active ? '' : 'group-hover:scale-110'}`} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.active && (
                <ChevronRight className="h-3 w-3 text-primary/50" />
              )}
            </motion.button>
          ))}
        </div>

        {/* Bottom */}
        <div className="space-y-1 pt-4 border-t border-white/[0.04]">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-white/35 hover:text-white/70 hover:bg-white/[0.03] transition-all duration-300">
            <Settings className="h-[18px] w-[18px]" />
            <span>Settings</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium text-white/35 hover:text-expense hover:bg-expense/[0.06] transition-all duration-300">
            <LogOut className="h-[18px] w-[18px]" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Profile */}
        <div className="mt-4 p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.07] shadow-lg shadow-black/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-chart-4 to-chart-6 flex items-center justify-center text-[11px] font-bold text-white ring-2 ring-white/10 shadow-lg">
              AK
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-white/85 truncate">Alex Kumar</p>
              <p className="text-[10px] text-white/25 truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-income inline-block" />
                Pro Plan
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
