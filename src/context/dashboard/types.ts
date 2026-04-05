/**
 * Domain types for the finance dashboard (transactions, filters, roles).
 */

/** Admin: mutate transactions. Viewer: read-only. */
export type Role = "admin" | "viewer";

export type TransactionType = "income" | "expense";

export type Category =
  | "Food"
  | "Travel"
  | "Bills"
  | "Shopping"
  | "Salary"
  | "Freelance"
  | "Entertainment"
  | "Health"
  | "Other";

export type SortField = "date" | "amount";

export type SortOrder = "asc" | "desc";

/** When switching sort column, use these defaults (newest / largest first). */
export const SORT_DEFAULT_ORDER: Record<SortField, SortOrder> = {
  date: "desc",
  amount: "desc",
};

/** Table filter: all rows, or income/expense only. */
export type TransactionFilter = "all" | "income" | "expense";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: Category;
  amount: number;
  type: TransactionType;
}

/** Full client state held in DashboardProvider (reducer). */
export interface DashboardStateShape {
  transactions: Transaction[];
  searchTerm: string;
  filter: TransactionFilter;
  sort: {
    field: SortField;
    order: SortOrder;
  };
  role: Role;
  darkMode: boolean;
}
