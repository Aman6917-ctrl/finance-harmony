import { Inbox } from "lucide-react";

/** Shown when filters/search yield no rows. */
const TransactionsEmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
    <Inbox className="h-10 w-10 mb-3 opacity-30" />
    <p className="font-display font-semibold text-sm">No transactions found</p>
    <p className="text-[11px] mt-1">Adjust search or filters</p>
  </div>
);

export default TransactionsEmptyState;
