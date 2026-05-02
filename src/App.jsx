import Chart from "./components/Chart";
import Summary from "./components/Summary";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

export default function App() {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <h1>Finance Tracker</h1>
      <Summary />
      <Chart />
      <hr />
      <TransactionForm />
      <hr />
      <TransactionList />
    </div>
  );
}
