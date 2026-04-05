import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CATEGORIES,
  type Transaction,
  type TransactionType,
  type Category,
} from "@/context/DashboardContext";

export interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  /** Persist new row (no `id`) or replace existing (with `id`). */
  onSave: (payload: Omit<Transaction, "id"> | Transaction) => void;
  /** When set, form loads this row and submit updates it; otherwise add mode. */
  transaction?: Transaction | null;
}

const inputClass =
  "rounded-xl bg-muted/30 border-border/30 text-[13px] h-9 focus-visible:border-primary/40 transition-colors";

const labelClass = "text-[10px] font-bold uppercase tracking-wider text-muted-foreground";

function parseAmount(raw: string): number | null {
  const n = parseFloat(raw.replace(/,/g, ""));
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.round(n * 100) / 100;
}

const TransactionModal = ({ open, onClose, onSave, transaction }: TransactionModalProps) => {
  const isEdit = Boolean(transaction?.id);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Food");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("expense");

  const resetFromProps = useCallback(() => {
    if (transaction) {
      setDate(transaction.date);
      setDescription(transaction.description);
      setCategory(transaction.category);
      setAmount(String(transaction.amount));
      setType(transaction.type);
    } else {
      setDate(new Date().toISOString().slice(0, 10));
      setDescription("");
      setCategory("Food");
      setAmount("");
      setType("expense");
    }
  }, [transaction]);

  useEffect(() => {
    if (open) resetFromProps();
  }, [open, resetFromProps]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const desc = description.trim();
    if (!date || !desc) return;
    const parsed = parseAmount(amount);
    if (parsed === null) return;

    const base = { date, description: desc, category, amount: parsed, type };
    if (isEdit && transaction) {
      onSave({ ...base, id: transaction.id });
    } else {
      onSave(base);
    }
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="glass-card noise inner-glow w-full max-w-[min(28rem,calc(100vw-2rem))] sm:max-w-md border-primary/10 shadow-2xl p-0 gap-0 overflow-hidden sm:rounded-2xl"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader className="px-5 pt-5 pb-4 border-b border-border/30 text-left space-y-1">
          <DialogTitle className="font-display text-base tracking-tight">
            {isEdit ? "Edit transaction" : "Add transaction"}
          </DialogTitle>
          <DialogDescription className="text-[11px] text-muted-foreground font-body">
            {isEdit
              ? "Update the fields below. Changes apply immediately after you save."
              : "Enter details for a new income or expense entry."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="tx-date" className={labelClass}>
                Date
              </Label>
              <Input
                id="tx-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputClass}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tx-type" className={labelClass}>
                Type
              </Label>
              <Select value={type} onValueChange={(v) => setType(v as TransactionType)}>
                <SelectTrigger id="tx-type" className={inputClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="tx-description" className={labelClass}>
              Description
            </Label>
            <Input
              id="tx-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Monthly salary, Grocery run"
              className={inputClass}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="tx-category" className={labelClass}>
                Category
              </Label>
              <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                <SelectTrigger id="tx-category" className={inputClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="tx-amount" className={labelClass}>
                Amount
              </Label>
              <Input
                id="tx-amount"
                type="number"
                inputMode="decimal"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className={`${inputClass} font-mono tabular-nums`}
                required
              />
            </div>
          </div>

          <DialogFooter className="flex-row justify-end gap-2 pt-2 sm:space-x-0 border-t border-border/20 -mx-5 px-5 pb-1 mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-xl border-border/40 text-[12px] h-9"
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-xl h-9 text-[12px] shadow-lg shadow-primary/15">
              {isEdit ? "Save changes" : "Add transaction"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransactionModal;
