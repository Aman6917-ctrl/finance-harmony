import { useState, useCallback } from "react";
import { DashboardProvider } from "@/context/DashboardContext";
import DashboardBackground from "@/components/dashboard/DashboardBackground";
import Sidebar from "@/components/dashboard/Sidebar";
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

const Dashboard = () => {
  const [cmdOpen, setCmdOpen] = useState(false);
  const toggleCmd = useCallback(() => setCmdOpen((prev) => !prev), []);

  return (
    <div className="min-h-screen bg-background relative w-full overflow-x-hidden">
      <DashboardBackground />

      <Sidebar />
      <CommandPalette open={cmdOpen} onClose={toggleCmd} />

      {/* Sidebar is fixed 240px — main must be only the remaining width so mx-auto centers in the visible column */}
      <main className="min-h-screen relative z-10 w-full min-w-0 overflow-x-hidden lg:ml-[240px] lg:w-[calc(100%-240px)]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-5 py-7 sm:py-8">
          <Header onOpenCommand={toggleCmd} />

          <div className="mt-8 space-y-6 sm:space-y-7 w-full min-w-0">
            <SummaryCards />

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

            <InsightsCards />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full min-w-0">
              <div className="lg:col-span-8 min-w-0 w-full">
                <SpendingChart />
              </div>
              <div className="lg:col-span-4 min-w-0 w-full">
                <BudgetRing />
              </div>
            </div>

            {/* Transactions */}
            <TransactionsTable />
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
