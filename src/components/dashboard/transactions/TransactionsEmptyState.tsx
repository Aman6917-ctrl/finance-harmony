import { Inbox, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onAdd?: () => void;
}

/** Shown when filters/search yield no rows. */
const TransactionsEmptyState = ({ onAdd }: Props) => (
  <div className="flex flex-col items-center justify-center py-16 px-5 text-muted-foreground">
    <Inbox className="h-10 w-10 mb-3 opacity-30" />
    <p className="font-display font-semibold text-sm">No transactions found</p>
    <p className="text-[11px] mt-1 text-center max-w-sm">
      {onAdd ? "Adjust search or filters, or add a new entry." : "Adjust search or filters."}
    </p>
    {onAdd ? (
      <Button
        type="button"
        size="sm"
        onClick={onAdd}
        className="mt-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-[12px] h-9 px-4 shadow-lg shadow-primary/20"
      >
        <Plus className="h-3.5 w-3.5 mr-2" />
        Add transaction
      </Button>
    ) : null}
  </div>
);

export default TransactionsEmptyState;
