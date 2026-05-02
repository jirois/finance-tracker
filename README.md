## Personal Finance Tracker

A React-based expense and income tracker with category breakdowns and persistent storage — built as part of a May 2026 portfolio rebuild.

### What It Does

- Add income and expense transactions with a description, amount, and category
- See your balance, total income, and total expenses update in real time
- Visualize spending by category in a doughnut chart
- Data persists across sessions via localStorage — no backend needed

### Tech Stack

| Layer       | Tool                         |
| ----------- | ---------------------------- |
| UI          | React (Vite)                 |
| State       | useReducer + Context API     |
| Persistence | localStorage via custom hook |
| Charts      | Chart.js + react-chartjs-2   |

### Project Structure

```
finance-tracker/
├── src/
│   ├── components/
│   │   ├── TransactionForm.jsx
│   │   ├── TransactionList.jsx
│   │   ├── Summary.jsx
│   │   └── Chart.jsx
│   ├── context/
│   │   └── FinanceContext.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json
└── index.html
```

### Getting Started

```
git clone https://github.com/yourusername/finance-tracker.git
cd finance-tracker
npm install
npm run dev
```

### Key Concepts Practiced

- useReducer for predictable state mutations
- Context API to avoid prop drilling
- Deriving UI values (balance, totals) from a single source of truth
- Custom hooks for reusable logic
- Third-party chart library integration

### Roadmap

- Filter transactions by month
- Sort by date or amount
- Export to CSV
- Monthly budget limit with overspend warning
