import { useEffect, useState } from "react";
import { useDashboard, type Transaction } from "@/context/DashboardContext";
import { ArrowUpDown } from "lucide-react";
import TransactionModal from "./TransactionModal";
import TransactionToolbar from "./transactions/TransactionToolbar";
import TransactionRow from "./transactions/TransactionRow";
import TransactionsEmptyState from "./transactions/TransactionsEmptyState";
import { motion } from "framer-motion";

/**
 * Transaction list with toolbar (search/filter/export), sortable headers, and admin modal.
 */
const TransactionsTable = () => {
  const {
    canManageTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    toggleSort,
    filteredTransactions,
    sortedTransactions,
  } = useDashboard();

  const [modalOpen, setModalOpen] = useState(false);
  const [editTx, setEditTx] = useState<Transaction | null>(null);

  useEffect(() => {
    if (!canManageTransactions) {
      setModalOpen(false);
      setEditTx(null);
    }
  }, [canManageTransactions]);

  const handleSave = (t: Omit<Transaction, "id"> | Transaction) => {
    if ("id" in t) updateTransaction(t);
    else addTransaction(t);
  };

  const openAdd = () => {
    setEditTx(null);
    setModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card noise inner-glow relative overflow-hidden w-full min-w-0"
    >
      <TransactionToolbar onAddClick={openAdd} />

      {filteredTransactions.length === 0 ? (
        <TransactionsEmptyState />
      ) : (
        <div className="overflow-x-auto custom-scroll relative z-10 w-full min-w-0">
          <table className="min-w-full w-full">
            <thead>
              <tr className="border-b border-border/20">
                <th className="text-left px-5 py-3 uppercase tracking-[0.15em]" scope="col">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 font-bold text-[9px] text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => toggleSort("date")}
                  >
                    Date <ArrowUpDown className="h-2.5 w-2.5" />
                  </button>
                </th>
                <th
                  className="text-left px-5 py-3 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.15em]"
                  scope="col"
                >
                  Transaction
                </th>
                <th
                  className="text-left px-5 py-3 font-bold text-[9px] text-muted-foreground uppercase tracking-[0.15em] hidden sm:table-cell"
                  scope="col"
                >
                  Category
                </th>
                <th className="text-right px-5 py-3 uppercase tracking-[0.15em]" scope="col">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 justify-end w-full font-bold text-[9px] text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => toggleSort("amount")}
                  >
                    Amount <ArrowUpDown className="h-2.5 w-2.5" />
                  </button>
                </th>
                {canManageTransactions ? (
                  <th className="px-5 py-3 w-16" scope="col" aria-label="Actions" />
                ) : null}
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map((tx, i) => (
                <TransactionRow
                  key={tx.id}
                  tx={tx}
                  rowIndex={i}
                  canManageTransactions={canManageTransactions}
                  onEdit={(row) => {
                    setEditTx(row);
                    setModalOpen(true);
                  }}
                  onDelete={deleteTransaction}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {canManageTransactions ? (
        <TransactionModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditTx(null);
          }}
          onSave={handleSave}
          transaction={editTx}
        />
      ) : null}
    </motion.div>
  );
};

export default TransactionsTable;
