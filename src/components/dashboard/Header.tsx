import { useDashboard } from "@/context/DashboardContext";
import { Moon, Sun, Shield, Eye, Bell, Search, Command } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface Props {
  onOpenCommand: () => void;
}

const Header = ({ onOpenCommand }: Props) => {
  const { role, setRole, darkMode, setDarkMode } = useDashboard();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full min-w-0 pb-6 border-b border-border/40"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1.5 lg:hidden">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center glow-primary">
            <span className="text-primary-foreground font-bold text-xs">F</span>
          </div>
          <span className="font-display font-bold text-foreground text-sm">FinFlow</span>
        </div>
        <h2 className="text-xl sm:text-[1.65rem] font-display font-bold text-foreground tracking-tight leading-tight">
          {greeting}, <span className="text-gradient">Alex</span> 👋
        </h2>
        <p className="text-[11px] sm:text-xs text-muted-foreground/90 mt-2 tracking-wide">
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 shrink-0 min-w-0">
        {/* Search */}
        <button
          onClick={onOpenCommand}
          className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-muted/50 border border-border/50 text-muted-foreground text-xs shadow-sm hover:bg-muted/80 hover:border-primary/25 hover:shadow-md hover:shadow-primary/5 transition-all duration-300 cursor-pointer group"
        >
          <Search className="h-3.5 w-3.5 group-hover:text-primary transition-colors" />
          <span className="text-[11px]">Search anything...</span>
          <div className="flex items-center gap-0.5 ml-2">
            <kbd className="px-1.5 py-0.5 rounded-md bg-background/90 border border-border/80 shadow-sm text-[9px] font-mono flex items-center gap-0.5 text-muted-foreground">
              <Command className="h-2.5 w-2.5" />K
            </kbd>
          </div>
        </button>

        {/* Notification */}
        <button className="relative p-2.5 rounded-xl bg-muted/50 border border-border/50 shadow-sm hover:bg-muted hover:border-primary/25 hover:shadow-md transition-all duration-300">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-expense border-2 border-background" />
        </button>

        {/* Role */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50 border border-border/50 shadow-sm">
          <Eye className={`h-3.5 w-3.5 transition-colors duration-300 ${role === "viewer" ? "text-primary" : "text-muted-foreground"}`} />
          <Switch
            id="role-switch"
            checked={role === "admin"}
            onCheckedChange={v => setRole(v ? "admin" : "viewer")}
            className="scale-[0.8]"
          />
          <Shield className={`h-3.5 w-3.5 transition-colors duration-300 ${role === "admin" ? "text-primary" : "text-muted-foreground"}`} />
          <Label htmlFor="role-switch" className="text-[10px] cursor-pointer select-none font-bold uppercase tracking-wider">
            {role === "admin" ? "Admin" : "Viewer"}
          </Label>
        </div>

        {/* Dark mode */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-xl bg-muted/50 border border-border/50 shadow-sm hover:bg-muted hover:border-primary/25 hover:shadow-md transition-all duration-300"
        >
          {darkMode ? <Sun className="h-4 w-4 text-chart-3" /> : <Moon className="h-4 w-4 text-primary" />}
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
