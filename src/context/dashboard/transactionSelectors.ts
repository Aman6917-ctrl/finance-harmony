/**
 * Pure helpers: filter/search and sort (used by DashboardProvider and tests).
 */

import type { Transaction, TransactionFilter, SortField, SortOrder } from "./types";

/** Type filter AND search (description/category), case-insensitive. */
export function deriveFilteredTransactions(
  transactions: Transaction[],
  filter: TransactionFilter,
  searchTerm: string,
): Transaction[] {
  let list = [...transactions];
  if (filter !== "all") {
    list = list.filter((t) => t.type === filter);
  }
  const q = searchTerm.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (t) =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q),
    );
  }
  return list;
}

/** Sort by date (ISO string) or amount; does not mutate input when length > 1. */
export function getSortedTransactions(
  transactions: Transaction[],
  field: SortField,
  order: SortOrder,
): Transaction[] {
  if (transactions.length <= 1) {
    return transactions;
  }
  const sorted = [...transactions];
  const cmp =
    field === "date"
      ? (a: Transaction, b: Transaction) => a.date.localeCompare(b.date)
      : (a: Transaction, b: Transaction) => a.amount - b.amount;
  const dir = order === "asc" ? 1 : -1;
  sorted.sort((a, b) => dir * cmp(a, b));
  return sorted;
}
