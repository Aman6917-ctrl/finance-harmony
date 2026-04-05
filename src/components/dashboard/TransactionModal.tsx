import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
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
import { cn } from "@/lib/utils";

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

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

  if (!mounted || typeof document === "undefined") return null;
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="tx-modal-title"
        className={cn(
          "relative z-10 w-full max-w-[min(28rem,calc(100vw-2rem))] sm:max-w-md max-h-[min(90vh,calc(100dvh-2rem))] overflow-y-auto custom-scroll",
          "glass-card noise inner-glow border-primary/10 shadow-2xl sm:rounded-2xl",
        )}
        onPointerDown={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-20 flex items-start justify-between gap-3 px-5 pt-5 pb-4 border-b border-border/30 bg-card/95 backdrop-blur-md rounded-t-[inherit]">
          <div className="space-y-1 min-w-0 text-left">
            <h2 id="tx-modal-title" className="font-display text-base tracking-tight text-foreground">
              {isEdit ? "Edit transaction" : "Add transaction"}
            </h2>
            <p className="text-[11px] text-muted-foreground font-body">
              {isEdit
                ? "Update the fields below. Changes apply immediately after you save."
                : "Enter details for a new income or expense entry."}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

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

          <div className="flex flex-row justify-end gap-2 pt-2 border-t border-border/20 -mx-5 px-5 pb-1 mt-2">
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
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
};

export default TransactionModal;
