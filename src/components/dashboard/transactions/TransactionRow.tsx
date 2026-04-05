import type { Transaction } from "@/context/DashboardContext";
import { CATEGORY_EMOJIS } from "@/lib/categoryEmojis";
import { Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  tx: Transaction;
  rowIndex: number;
  canManageTransactions: boolean;
  onEdit: (tx: Transaction) => void;
  onDelete: (id: string) => void;
}

const TransactionRow = ({
  tx,
  rowIndex,
  canManageTransactions,
  onEdit,
  onDelete,
}: Props) => (
  <motion.tr
    initial={false}
    animate={{ opacity: 1 }}
    transition={{ delay: rowIndex * 0.015 }}
    className="border-b border-border/10 last:border-0 hover:bg-muted/10 transition-all duration-300 group"
  >
    <td className="px-5 py-3.5 text-muted-foreground whitespace-nowrap text-[12px] font-mono">
      {new Date(tx.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
    </td>
    <td className="px-5 py-3.5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-muted/40 flex items-center justify-center text-sm shrink-0">
          {CATEGORY_EMOJIS[tx.category] ?? "📦"}
        </div>
        <div>
          <span className="text-card-foreground font-medium text-[12px] block">{tx.description}</span>
          <span className="text-[10px] text-muted-foreground sm:hidden">{tx.category}</span>
        </div>
      </div>
    </td>
    <td className="px-5 py-3.5 hidden sm:table-cell">
      <span className="tag bg-muted/40 text-muted-foreground border border-border/30">{tx.category}</span>
    </td>
    <td
      className={`px-5 py-3.5 text-right font-bold whitespace-nowrap font-mono tabular-nums text-[12px] ${
        tx.type === "income" ? "text-income" : "text-expense"
      }`}
    >
      {tx.type === "income" ? "+" : "-"}$
      {tx.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
    </td>
    {canManageTransactions ? (
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-1 justify-end opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button
            type="button"
            onClick={() => onEdit(tx)}
            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label={`Edit ${tx.description}`}
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onDelete(tx.id)}
            className="p-1.5 rounded-lg hover:bg-expense/10 transition-colors text-muted-foreground hover:text-expense"
            aria-label={`Delete ${tx.description}`}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
    ) : null}
  </motion.tr>
);

export default TransactionRow;
