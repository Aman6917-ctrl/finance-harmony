import {
  LayoutDashboard,
  ArrowLeftRight,
  PieChart,
  Lightbulb,
  Settings,
  LogOut,
  CreditCard,
  Bell,
  Zap,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  PanelLeftClose,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type SidebarVisibility = "full" | "rail" | "hidden";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", active: true },
  { icon: ArrowLeftRight, label: "Transactions" },
  { icon: PieChart, label: "Analytics" },
  { icon: Lightbulb, label: "Insights" },
  { icon: CreditCard, label: "Wallets" },
  { icon: Bell, label: "Alerts" },
];

interface Props {
  visibility: SidebarVisibility;
  onVisibilityChange: (v: SidebarVisibility) => void;
}

const Sidebar = ({ visibility, onVisibilityChange }: Props) => {
  const isRail = visibility === "rail";
  const isHidden = visibility === "hidden";

  return (
    <motion.aside
      initial={false}
      animate={{
        /* Must drive slide-off here — a static x:0 overrides Tailwind -translate and leaves the bar on screen while main loses margin (clipped header text). */
        x: isHidden ? "-100%" : 0,
        opacity: 1,
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "hidden lg:flex flex-col fixed left-0 top-0 z-40 h-screen glass-sidebar border-r border-white/[0.06] transition-[width] duration-300 ease-out",
        isRail ? "w-[72px]" : "w-[240px]",
        isHidden && "pointer-events-none",
      )}
      aria-hidden={isHidden}
    >
      <div className={cn("flex flex-col h-full min-h-0", isRail ? "p-3" : "p-6")}>
        {/* Brand + controls */}
        <div
          className={cn(
            "flex items-start gap-2 shrink-0 mb-6",
            isRail ? "flex-col items-center gap-3" : "justify-between",
          )}
        >
          <div className={cn("flex items-center gap-3 min-w-0", isRail && "flex-col")}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center glow-primary relative shrink-0">
              <Zap className="h-4 w-4 text-primary-foreground" />
              {!isRail && (
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-income border-2 border-[hsl(var(--sidebar-bg))]">
                  <span className="absolute inset-0 rounded-full bg-income animate-ping opacity-40" />
                </div>
              )}
            </div>
            {!isRail && (
              <div className="min-w-0">
                <h1 className="text-[15px] font-display font-bold text-white tracking-tight leading-none">
                  Fin<span className="text-gradient">Flow</span>
                </h1>
                <p className="text-[9px] text-white/30 tracking-[0.28em] uppercase mt-1 font-semibold">
                  Dashboard v2.0
                </p>
              </div>
            )}
          </div>

          {!isRail && (
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => onVisibilityChange("rail")}
                className="p-1.5 rounded-lg text-white/35 hover:text-white/80 hover:bg-white/[0.06] transition-colors"
                title="Collapse sidebar"
                aria-label="Collapse sidebar to icons"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onVisibilityChange("hidden")}
                className="p-1.5 rounded-lg text-white/35 hover:text-white/80 hover:bg-white/[0.06] transition-colors"
                title="Hide sidebar"
                aria-label="Hide sidebar"
              >
                <PanelLeftClose className="h-4 w-4" />
              </button>
            </div>
          )}

          {isRail && (
            <div className="flex flex-col items-center gap-2 w-full">
              <button
                type="button"
                onClick={() => onVisibilityChange("full")}
                className="p-1.5 rounded-lg text-white/35 hover:text-white/80 hover:bg-white/[0.06] transition-colors"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onVisibilityChange("hidden")}
                className="p-1.5 rounded-lg text-white/35 hover:text-white/80 hover:bg-white/[0.06] transition-colors"
                title="Hide sidebar"
                aria-label="Hide sidebar"
              >
                <PanelLeftClose className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Scrollable: menu + bottom + profile */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden custom-scroll pr-0.5 -mr-0.5 flex flex-col">
          <div className="space-y-1 flex-1 min-h-0">
            {!isRail && (
              <p className="px-3 mb-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white/15">Menu</p>
            )}
            {navItems.map((item) => (
            <motion.button
              key={item.label}
              initial={false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                title={item.label}
                className={cn(
                  "w-full flex items-center rounded-xl text-[13px] font-medium transition-all duration-300 group",
                  isRail ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5",
                  item.active
                    ? "bg-primary/15 text-primary shadow-lg shadow-primary/10 ring-1 ring-primary/20"
                    : "text-white/35 hover:text-white/80 hover:bg-white/[0.04]",
                )}
              >
                <item.icon
                  className={cn(
                    "h-[18px] w-[18px] shrink-0 transition-transform duration-300",
                    !item.active && "group-hover:scale-110",
                  )}
                />
                <span
                  className={cn(
                    "flex-1 text-left",
                    isRail && "sr-only",
                  )}
                >
                  {item.label}
                </span>
                {item.active && !isRail && (
                  <ChevronRight className="h-3 w-3 text-primary/50 shrink-0" />
                )}
              </motion.button>
            ))}
          </div>

          <div
            className={cn(
              "space-y-1 pt-4 mt-auto border-t border-white/[0.04] shrink-0",
              isRail && "flex flex-col items-center",
            )}
          >
            <button
              type="button"
              title="Settings"
              className={cn(
                "w-full flex items-center rounded-xl text-[13px] font-medium text-white/35 hover:text-white/70 hover:bg-white/[0.03] transition-all duration-300",
                isRail ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5",
              )}
            >
              <Settings className="h-[18px] w-[18px] shrink-0" />
              <span className={cn(isRail && "sr-only")}>Settings</span>
            </button>
            <button
              type="button"
              title="Sign Out"
              className={cn(
                "w-full flex items-center rounded-xl text-[13px] font-medium text-white/35 hover:text-expense hover:bg-expense/[0.06] transition-all duration-300",
                isRail ? "justify-center px-0 py-2.5" : "gap-3 px-3 py-2.5",
              )}
            >
              <LogOut className="h-[18px] w-[18px] shrink-0" />
              <span className={cn(isRail && "sr-only")}>Sign Out</span>
            </button>
          </div>

          {/* Profile */}
          <div
            className={cn(
              "mt-4 p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.07] shadow-lg shadow-black/20 shrink-0",
              isRail && "p-2 flex justify-center",
            )}
          >
            <div className={cn("flex items-center gap-3", isRail && "justify-center")}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-chart-4 to-chart-6 flex items-center justify-center text-[10px] font-bold text-white ring-2 ring-white/10 shadow-lg shrink-0">
                ZT
              </div>
              {!isRail && (
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-white/85 truncate">Zorvyn Team</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
