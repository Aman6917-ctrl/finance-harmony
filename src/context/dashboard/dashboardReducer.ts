/**
 * useReducer state transitions for the dashboard (UI prefs + transaction CRUD).
 */

import {
  SORT_DEFAULT_ORDER,
  type DashboardStateShape,
  type Role,
  type SortField,
  type SortOrder,
  type Transaction,
  type TransactionFilter,
} from "./types";
import { loadTransactionsFromStorage, loadDarkModePreference } from "./transactionStorage";

export type DashboardAction =
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_FILTER"; payload: TransactionFilter }
  | { type: "SET_SORT_FIELD"; payload: SortField }
  | { type: "SET_SORT_ORDER"; payload: SortOrder }
  | { type: "TOGGLE_SORT"; payload: SortField }
  | { type: "SET_ROLE"; payload: Role }
  | { type: "SET_DARK_MODE"; payload: boolean }
  | { type: "ADD_TRANSACTION"; payload: Omit<Transaction, "id"> }
  | { type: "UPDATE_TRANSACTION"; payload: Transaction }
  | { type: "DELETE_TRANSACTION"; payload: string };

export function dashboardReducer(
  state: DashboardStateShape,
  action: DashboardAction,
): DashboardStateShape {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    case "SET_SORT_FIELD":
      return { ...state, sort: { ...state.sort, field: action.payload } };
    case "SET_SORT_ORDER":
      return { ...state, sort: { ...state.sort, order: action.payload } };
    case "TOGGLE_SORT": {
      const field = action.payload;
      if (state.sort.field === field) {
        return {
          ...state,
          sort: {
            field,
            order: state.sort.order === "asc" ? "desc" : "asc",
          },
        };
      }
      return {
        ...state,
        sort: { field, order: SORT_DEFAULT_ORDER[field] },
      };
    }
    case "SET_ROLE":
      return { ...state, role: action.payload };
    case "SET_DARK_MODE":
      return { ...state, darkMode: action.payload };
    case "ADD_TRANSACTION":
      if (state.role !== "admin") return state;
      return {
        ...state,
        transactions: [
          { ...action.payload, id: crypto.randomUUID() },
          ...state.transactions,
        ],
      };
    case "UPDATE_TRANSACTION":
      if (state.role !== "admin") return state;
      return {
        ...state,
        transactions: state.transactions.map((tx) =>
          tx.id === action.payload.id ? action.payload : tx,
        ),
      };
    case "DELETE_TRANSACTION":
      if (state.role !== "admin") return state;
      return {
        ...state,
        transactions: state.transactions.filter((tx) => tx.id !== action.payload),
      };
    default:
      return state;
  }
}

/** Lazy initializer for useReducer (runs once on client). */
export function createInitialDashboardState(): DashboardStateShape {
  return {
    transactions: loadTransactionsFromStorage(),
    searchTerm: "",
    filter: "all",
    sort: { field: "date", order: "desc" },
    role: "admin",
    darkMode: loadDarkModePreference(),
  };
}
