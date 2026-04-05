/**
 * Dashboard state: React context + provider around a single useReducer.
 * Domain logic lives under `./dashboard/`; this file wires hooks and re-exports the public API.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import { CATEGORIES, TRANSACTIONS_STORAGE_KEY } from "./dashboard/constants";
import {
  dashboardReducer,
  createInitialDashboardState,
} from "./dashboard/dashboardReducer";
import {
  deriveFilteredTransactions,
  getSortedTransactions,
} from "./dashboard/transactionSelectors";
import {
  persistTransactionsToStorage,
  persistDarkModePreference,
} from "./dashboard/transactionStorage";
import type {
  DashboardStateShape,
  Role,
  SortField,
  SortOrder,
  Transaction,
  TransactionFilter,
} from "./dashboard/types";

export type {
  Role,
  TransactionType,
  Category,
  SortField,
  SortOrder,
  TransactionFilter,
  Transaction,
  DashboardStateShape,
} from "./dashboard/types";

export { SORT_DEFAULT_ORDER } from "./dashboard/types";
export { CATEGORIES, TRANSACTIONS_STORAGE_KEY };
export { deriveFilteredTransactions, getSortedTransactions };

interface DashboardContextValue {
  dashboardState: DashboardStateShape;
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  sortedTransactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id">) => void;
  updateTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (q: string) => void;
  filter: TransactionFilter;
  setFilter: (f: TransactionFilter) => void;
  sortField: SortField;
  sortOrder: SortOrder;
  setSortField: (f: SortField) => void;
  setSortOrder: (o: SortOrder) => void;
  toggleSort: (field: SortField) => void;
  role: Role;
  canManageTransactions: boolean;
  setRole: (r: Role) => void;
  darkMode: boolean;
  setDarkMode: (d: boolean) => void;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
};

export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dashboardState, dispatch] = useReducer(
    dashboardReducer,
    undefined,
    createInitialDashboardState,
  );

  useEffect(() => {
    persistTransactionsToStorage(dashboardState.transactions);
  }, [dashboardState.transactions]);

  useEffect(() => {
    persistDarkModePreference(dashboardState.darkMode);
    document.documentElement.classList.toggle("dark", dashboardState.darkMode);
  }, [dashboardState.darkMode]);

  const setSearchTerm = useCallback((q: string) => {
    dispatch({ type: "SET_SEARCH_TERM", payload: q });
  }, []);

  const setFilter = useCallback((f: TransactionFilter) => {
    dispatch({ type: "SET_FILTER", payload: f });
  }, []);

  const setSortField = useCallback((f: SortField) => {
    dispatch({ type: "SET_SORT_FIELD", payload: f });
  }, []);

  const setSortOrder = useCallback((o: SortOrder) => {
    dispatch({ type: "SET_SORT_ORDER", payload: o });
  }, []);

  const toggleSort = useCallback((field: SortField) => {
    dispatch({ type: "TOGGLE_SORT", payload: field });
  }, []);

  const setRole = useCallback((r: Role) => {
    dispatch({ type: "SET_ROLE", payload: r });
  }, []);

  const setDarkMode = useCallback((d: boolean) => {
    dispatch({ type: "SET_DARK_MODE", payload: d });
  }, []);

  const addTransaction = useCallback((t: Omit<Transaction, "id">) => {
    dispatch({ type: "ADD_TRANSACTION", payload: t });
  }, []);

  const updateTransaction = useCallback((t: Transaction) => {
    dispatch({ type: "UPDATE_TRANSACTION", payload: t });
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  }, []);

  const filteredTransactions = useMemo(
    () =>
      deriveFilteredTransactions(
        dashboardState.transactions,
        dashboardState.filter,
        dashboardState.searchTerm,
      ),
    [dashboardState.transactions, dashboardState.filter, dashboardState.searchTerm],
  );

  const sortedTransactions = useMemo(
    () =>
      getSortedTransactions(
        filteredTransactions,
        dashboardState.sort.field,
        dashboardState.sort.order,
      ),
    [filteredTransactions, dashboardState.sort.field, dashboardState.sort.order],
  );

  const value = useMemo<DashboardContextValue>(
    () => ({
      dashboardState,
      transactions: dashboardState.transactions,
      filteredTransactions,
      sortedTransactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      searchTerm: dashboardState.searchTerm,
      setSearchTerm,
      filter: dashboardState.filter,
      setFilter,
      sortField: dashboardState.sort.field,
      sortOrder: dashboardState.sort.order,
      setSortField,
      setSortOrder,
      toggleSort,
      role: dashboardState.role,
      canManageTransactions: dashboardState.role === "admin",
      setRole,
      darkMode: dashboardState.darkMode,
      setDarkMode,
    }),
    [
      dashboardState,
      filteredTransactions,
      sortedTransactions,
      addTransaction,
      updateTransaction,
      deleteTransaction,
      setSearchTerm,
      setFilter,
      setSortField,
      setSortOrder,
      toggleSort,
      setRole,
      setDarkMode,
    ],
  );

  return (
    <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>
  );
};
