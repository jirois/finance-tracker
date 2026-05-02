import { createContext, useContext, useReducer } from "react";
import { useLocalStorage } from "../hook/useLocalStorage";

const FinanceContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return [action.payload, ...state];
    case "DELETE_TRANSACTION":
      return state.filter((transaction) => transaction.id !== action.payload);
    default:
      return state;
  }
};

export function FinanceProvider({ children }) {
  const [saved, setSaved] = useLocalStorage("transactions", []);
  const [transactions, dispatch] = useReducer(reducer, saved);

  // Keep localStorage in sync
  const wrappedDispatch = (action) => {
    const next = reducer(transactions, action);
    dispatch(action);
    setSaved(next);
  };
  const addTransaction = (transaction) => {
    wrappedDispatch({
      type: "ADD_TRANSACTION",
      payload: {
        ...transaction,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
      },
    });
  };

  const deleteTransaction = (id) => {
    wrappedDispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  };

  // Derived values - computed here once, used everywhere

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income + expenses;

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        income,
        expenses,
        balance,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used within a FinanceProvider");
  }
  return context;
}
