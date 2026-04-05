/**
 * localStorage read/write for the transaction list (with validation and safe fallbacks).
 */

import type { Transaction } from "./types";
import {
  CATEGORIES,
  MOCK_TRANSACTIONS,
  TRANSACTIONS_STORAGE_KEY,
  DARK_MODE_STORAGE_KEY,
} from "./constants";

function storageGet(key: string): string | null {
  try {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function isValidTransaction(x: unknown): x is Transaction {
  if (x === null || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  const categoryOk =
    typeof o.category === "string" && (CATEGORIES as readonly string[]).includes(o.category);
  return (
    typeof o.id === "string" &&
    o.id.length > 0 &&
    typeof o.date === "string" &&
    typeof o.description === "string" &&
    typeof o.amount === "number" &&
    Number.isFinite(o.amount) &&
    (o.type === "income" || o.type === "expense") &&
    categoryOk
  );
}

/**
 * Missing key → demo seed (first visit). Invalid JSON / shape → [].
 * Stored `[]` is valid (cleared ledger).
 */
export function loadTransactionsFromStorage(): Transaction[] {
  const raw = storageGet(TRANSACTIONS_STORAGE_KEY);
  if (raw === null) {
    return MOCK_TRANSACTIONS.map((t) => ({ ...t }));
  }
  if (raw.trim() === "") {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidTransaction);
  } catch {
    return [];
  }
}

export function persistTransactionsToStorage(transactions: Transaction[]): void {
  try {
    if (typeof window === "undefined") return;
    localStorage.setItem(TRANSACTIONS_STORAGE_KEY, JSON.stringify(transactions));
  } catch {
    /* quota, private mode, disabled storage */
  }
}

export function loadDarkModePreference(): boolean {
  return storageGet(DARK_MODE_STORAGE_KEY) === "true";
}

export function persistDarkModePreference(dark: boolean): void {
  try {
    if (typeof window !== "undefined") {
      localStorage.setItem(DARK_MODE_STORAGE_KEY, String(dark));
    }
  } catch {
    /* ignore */
  }
}
