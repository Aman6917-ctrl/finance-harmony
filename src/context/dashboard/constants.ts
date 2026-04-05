import type { Category, Transaction } from "./types";

/** Select options and validation allow-list for transaction categories. */
export const CATEGORIES: Category[] = [
  "Food",
  "Travel",
  "Bills",
  "Shopping",
  "Salary",
  "Freelance",
  "Entertainment",
  "Health",
  "Other",
];

export const TRANSACTIONS_STORAGE_KEY = "finance-dashboard-data";

export const DARK_MODE_STORAGE_KEY = "finance-dark-mode";

/** Shown on first visit when no saved transactions exist yet. */
export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "1", date: "2026-03-28", description: "Monthly Salary", category: "Salary", amount: 5200, type: "income" },
  { id: "2", date: "2026-03-27", description: "Grocery Store", category: "Food", amount: 87.5, type: "expense" },
  { id: "3", date: "2026-03-26", description: "Electric Bill", category: "Bills", amount: 142.0, type: "expense" },
  { id: "4", date: "2026-03-25", description: "Freelance Project", category: "Freelance", amount: 1500, type: "income" },
  { id: "5", date: "2026-03-24", description: "Flight to NYC", category: "Travel", amount: 320.0, type: "expense" },
  { id: "6", date: "2026-03-22", description: "New Headphones", category: "Shopping", amount: 199.99, type: "expense" },
  { id: "7", date: "2026-03-20", description: "Netflix Subscription", category: "Entertainment", amount: 15.99, type: "expense" },
  { id: "8", date: "2026-03-18", description: "Gym Membership", category: "Health", amount: 45.0, type: "expense" },
  { id: "9", date: "2026-03-15", description: "Restaurant Dinner", category: "Food", amount: 68.0, type: "expense" },
  { id: "10", date: "2026-03-12", description: "Side Project Income", category: "Freelance", amount: 800, type: "income" },
  { id: "11", date: "2026-03-10", description: "Internet Bill", category: "Bills", amount: 59.99, type: "expense" },
  { id: "12", date: "2026-03-08", description: "Coffee Shop", category: "Food", amount: 24.5, type: "expense" },
  { id: "13", date: "2026-03-05", description: "Online Course", category: "Shopping", amount: 49.99, type: "expense" },
  { id: "14", date: "2026-02-28", description: "Monthly Salary", category: "Salary", amount: 5200, type: "income" },
  { id: "15", date: "2026-02-25", description: "Grocery Store", category: "Food", amount: 95.2, type: "expense" },
  { id: "16", date: "2026-02-22", description: "Gas Bill", category: "Bills", amount: 78.0, type: "expense" },
  { id: "17", date: "2026-02-18", description: "Movie Tickets", category: "Entertainment", amount: 32.0, type: "expense" },
  { id: "18", date: "2026-02-15", description: "Freelance Design", category: "Freelance", amount: 1200, type: "income" },
  { id: "19", date: "2026-02-10", description: "Clothing Store", category: "Shopping", amount: 156.0, type: "expense" },
  { id: "20", date: "2026-02-05", description: "Doctor Visit", category: "Health", amount: 120.0, type: "expense" },
];
