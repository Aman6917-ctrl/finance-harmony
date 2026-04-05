# 💰 FinFlow — Personal Finance Dashboard

A **client-side** React dashboard for visualizing cash flow, managing a transaction ledger, and reviewing spending insights. Data lives in the browser: the app seeds demo transactions on first visit and **persists your ledger in `localStorage`**.

---

## 📌 Project overview

**FinFlow** (this repo: `finance-harmony`) is a single-page finance dashboard built with **Vite** and **React**. It focuses on:

- **At-a-glance metrics** — balance, income vs. expenses, and trend visuals  
- **A sortable, filterable transaction table** — search, type filters, and CSV export  
- **Role simulation** — **Admin** can add, edit, and delete transactions; **Viewer** is read-only  
- **Insight cards** — totals, transaction count, and highest spending category (from expense data)

There is **no backend** in this project; all state is managed on the client.

---

## ✨ Features

| Area | What’s implemented |
|------|---------------------|
| **Dashboard overview** | Summary cards (balance, income, expenses, mini sparklines), balance trend line chart, spending by category (pie), activity-style feed, budget ring, and a derived “health” score widget |
| **Transactions** | Search by text, filter **All / Income / Expense**, sort by **date** or **amount** (toggle asc/desc), export **CSV** from the toolbar |
| **Role-based UI** | **Admin** vs **Viewer** via header toggle; Admin sees Add/Edit/Delete; Viewer cannot open the transaction modal for writes |
| **Insights** | Total income, total expenses, transaction count, and **highest spending category** (full ledger, not limited by search/filter) |
| **Persistence** | Transactions and dark mode preference stored in **`localStorage`** (validated load, safe fallbacks) |
| **UX** | Command palette (**⌘/Ctrl + K**), dark mode toggle, responsive layout (`sm` / `lg` breakpoints), Framer Motion animations |

---

## 🛠 Tech stack

| Layer | Choice |
|-------|--------|
| **Framework** | React 18, TypeScript, Vite |
| **Routing** | React Router (`/`, catch-all `NotFound`) |
| **Styling** | Tailwind CSS, custom tokens, **shadcn/ui** (Radix primitives) |
| **Charts** | **Recharts** (line chart for balance trend, pie for expenses by category) |
| **Motion** | Framer Motion |
| **State** | **React Context + `useReducer`** (`DashboardProvider`), with domain logic under `src/context/dashboard/` |
| **Server state (optional)** | **TanStack Query** is wired in `App.tsx`; the dashboard currently uses **local state only** (no `useQuery` in the feature code) |
| **Testing** | Vitest (`npm test`), Playwright config present for future E2E (`e2e/` test dir) |

---

## 📁 Project structure

```
finance-harmony/
├── public/                 # Static assets (e.g. robots.txt, placeholder)
├── src/
│   ├── components/
│   │   ├── dashboard/      # Feature UI: charts, table, header, command palette, etc.
│   │   │   └── transactions/  # Toolbar, rows, empty state
│   │   └── ui/             # shadcn-style primitives (button, dialog, table, …)
│   ├── context/
│   │   ├── DashboardContext.tsx   # Provider + hooks
│   │   └── dashboard/      # Reducer, types, selectors, localStorage helpers
│   ├── hooks/              # Shared hooks (e.g. animated counter, tilt)
│   ├── lib/                # Utils, CSV export, category emoji map
│   ├── pages/              # Index (dashboard), NotFound
│   ├── test/               # Vitest setup + example test
│   ├── App.tsx             # Router, QueryClient, toasters
│   ├── main.tsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── vitest.config.ts
├── playwright.config.ts
└── README.md
```

---

## 🚀 Setup & local run

### Prerequisites

- **Node.js** (LTS recommended)  
- **npm** (or compatible client)

### Install

```bash
npm install
```

### Development server

```bash
npm run dev
```

The Vite dev server is configured with host `::` and **port `8080`** — open the URL shown in the terminal (typically `http://localhost:8080`).

### Other scripts

| Command | Purpose |
|---------|---------|
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | ESLint |
| `npm test` | Vitest (once) |
| `npm run test:watch` | Vitest watch mode |

---

## 📸 Screenshots

> _Placeholder — add your own images here._

| Screen | Description |
|--------|-------------|
| _[Add image]_ | Full dashboard (summary + charts + table) |
| _[Add image]_ | Transactions with search / filter / sort |
| _[Add image]_ | Admin vs Viewer (toolbar + row actions) |

---

## 🔮 Future improvements

1. **CSV import** — mirror the export flow so users can bulk-load transactions.  
2. **Persist role** — optionally remember Admin/Viewer in `localStorage` (currently session-only in memory).  
3. **Real API + TanStack Query** — sync transactions to a backend for multi-device use.  
4. **Auth** — replace the demo role switch with real user accounts and permissions.  
5. **E2E coverage** — add Playwright specs under `e2e/` for critical flows (filter, sort, role gating).

---

## 👤 Author

**Aman Verma**  
B.Tech AIML

---

## 📄 License

This project is private (`"private": true` in `package.json`). Adjust licensing if you open-source it.
