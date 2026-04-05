import type { Transaction } from "@/context/dashboard/types";

/** Build CSV text and trigger a browser download. */
export function downloadTransactionsCsv(rows: Transaction[], filename = "transactions.csv"): void {
  const header = "Date,Description,Category,Amount,Type\n";
  const body = rows
    .map((t) => `${t.date},"${t.description.replace(/"/g, '""')}",${t.category},${t.amount},${t.type}`)
    .join("\n");
  const blob = new Blob([header + body], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
