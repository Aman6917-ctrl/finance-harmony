import { useState, useCallback } from "react";
import { PanelRight } from "lucide-react";
import { DashboardProvider } from "@/context/DashboardContext";
import DashboardBackground from "@/components/dashboard/DashboardBackground";
import Sidebar, { type SidebarVisibility } from "@/components/dashboard/Sidebar";
import { cn } from "@/lib/utils";
import Header from "@/components/dashboard/Header";
import SummaryCards from "@/components/dashboard/SummaryCards";
import BalanceChart from "@/components/dashboard/BalanceChart";
import SpendingChart from "@/components/dashboard/SpendingChart";
import TransactionsTable from "@/components/dashboard/TransactionsTable";
import InsightsCards from "@/components/dashboard/InsightsCards";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import BudgetRing from "@/components/dashboard/BudgetRing";
import HealthScore from "@/components/dashboard/HealthScore";
import CommandPalette from "@/components/dashboard/CommandPalette";
import SectionLabel from "@/components/dashboard/SectionLabel";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

const Dashboard = () => {
  const [cmdOpen, setCmdOpen] = useState(false);
  const toggleCmd = useCallback(() => setCmdOpen((prev) => !prev), []);
  const [sidebarVisibility, setSidebarVisibility] = useState<SidebarVisibility>("full");

  return (
    <div className="min-h-screen min-h-dvh bg-background relative w-full overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
      >
        Skip to dashboard
      </a>
      <DashboardBackground />

      <Sidebar visibility={sidebarVisibility} onVisibilityChange={setSidebarVisibility} />
      <CommandPalette open={cmdOpen} onClose={toggleCmd} />

      {sidebarVisibility === "hidden" && (
        <button
          type="button"
          onClick={() => setSidebarVisibility("full")}
          className="hidden lg:flex fixed left-4 top-28 z-50 h-11 w-11 items-center justify-center rounded-xl border border-border/50 bg-background/90 text-muted-foreground shadow-lg backdrop-blur-md transition-colors hover:border-primary/30 hover:text-primary"
          aria-label="Open sidebar"
          title="Open sidebar"
        >
          <PanelRight className="h-5 w-5" />
        </button>
      )}

      <main
        id="main-content"
        tabIndex={-1}
        className={cn(
          "min-h-screen min-h-dvh relative z-10 w-full min-w-0 overflow-x-hidden transition-[margin,width] duration-300 ease-out outline-none",
          sidebarVisibility === "full" && "lg:ml-[240px] lg:w-[calc(100%-240px)]",
          sidebarVisibility === "rail" && "lg:ml-[72px] lg:w-[calc(100%-72px)]",
          sidebarVisibility === "hidden" && "lg:ml-0 lg:w-full",
        )}
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-5 py-7 sm:py-9">
          <Header onOpenCommand={toggleCmd} />

          <div className="mt-8 sm:mt-10 space-y-8 sm:space-y-9 w-full min-w-0">
            <section aria-labelledby="section-overview">
              <SectionLabel
                id="section-overview"
                title="Overview"
                description="Balances and cash-flow at a glance — animated counters and sparklines update from your ledger."
              />
              <SummaryCards />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full min-w-0">
              <div className="lg:col-span-7 min-w-0 w-full">
                <BalanceChart />
              </div>
              <div className="lg:col-span-3 min-w-0 w-full">
                <ActivityFeed />
              </div>
              <div className="lg:col-span-2 min-w-0 w-full">
                <HealthScore />
              </div>
            </div>

            <section aria-labelledby="section-insights">
              <SectionLabel
                id="section-insights"
                title="Insights"
                description="Derived metrics across your full transaction history — income, spend, and category leaders."
              />
              <InsightsCards />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full min-w-0">
              <div className="lg:col-span-8 min-w-0 w-full">
                <SpendingChart />
              </div>
              <div className="lg:col-span-4 min-w-0 w-full">
                <BudgetRing />
              </div>
            </div>

            <section aria-labelledby="section-ledger">
              <SectionLabel
                id="section-ledger"
                title="Ledger"
                description="Search, filter, and sort — Admin can add or edit rows; data persists in your browser."
              />
              <TransactionsTable />
            </section>

            <DashboardFooter />
          </div>
        </div>
      </main>
    </div>
  );
};

const Index = () => (
  <DashboardProvider>
    <Dashboard />
  </DashboardProvider>
);

export default Index;
