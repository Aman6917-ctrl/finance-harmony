import { useDashboard, type TransactionFilter } from "@/context/DashboardContext";
import { downloadTransactionsCsv } from "@/lib/transactionsCsv";
import { Search, Plus, FileDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  onAddClick: () => void;
}

/** Search, type filter, CSV export, and optional Add (admin). */
const TransactionToolbar = ({ onAddClick }: Props) => {
  const {
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    canManageTransactions,
    sortedTransactions,
    filteredTransactions,
  } = useDashboard();

  return (
    <div className="relative z-30 p-5 border-b border-border/30 w-full min-w-0">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full min-w-0">
        <div className="min-w-0">
          <h3 className="text-sm font-display font-bold text-card-foreground">All Transactions</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {filteredTransactions.length} entries found
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto min-w-0">
          <div className="relative flex-1 min-w-0 sm:flex-none sm:max-w-xs">
            <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 h-8 w-full rounded-xl bg-muted/30 border-border/30 text-[12px] focus:border-primary/40 transition-colors"
              aria-label="Search transactions"
            />
          </div>
          <Select value={filter} onValueChange={(v) => setFilter(v as TransactionFilter)}>
            <SelectTrigger className="h-8 min-w-[7rem] shrink-0 rounded-xl bg-muted/30 border-border/30 text-[12px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={() => downloadTransactionsCsv(sortedTransactions)}
            className="rounded-xl border-border/30 text-[11px] h-8 px-3 hover:border-primary/30 transition-colors"
          >
            <FileDown className="h-3.5 w-3.5 mr-1.5" /> CSV
          </Button>
          {canManageTransactions ? (
            <Button
              size="sm"
              type="button"
              onClick={onAddClick}
              className="rounded-xl h-8 bg-primary hover:bg-primary/90 text-primary-foreground text-[11px] px-3 shadow-lg shadow-primary/20"
            >
              <Plus className="h-3.5 w-3.5 mr-1.5" /> Add
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TransactionToolbar;
