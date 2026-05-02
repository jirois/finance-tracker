import { useFinance } from "../context/FinanceContext";

const formatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});

export default function Summary() {
  const { income, expenses, balance } = useFinance();

  return (
    <div>
      <div>
        <h2>Balance</h2>
        <p style={{ color: balance >= 0 ? "green" : "red" }}>
          {formatter.format(balance)}
        </p>
      </div>
      <div>
        <div>
          <h3>Income</h3>
          <p style={{ color: "green" }}>{formatter.format(income)}</p>
        </div>
        <div>
          <h3>Expenses</h3>
          <p style={{ color: "red" }}>{formatter.format(expenses)}</p>
        </div>
      </div>
    </div>
  );
}
