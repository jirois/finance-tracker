import TransactionForm from "./components/TransactionForm";

export default function App() {
  return (
    <div className="app">
      <h1>Finance Tracker</h1>
      <div className="container">
        <TransactionForm />
      </div>
    </div>
  );
}
