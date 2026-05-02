import { useFinance } from "../context/FinanceContext";

const formatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
});

const formatDate = (isoString) => {
  new Date(isoString).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function TransactionList() {
  const { transactions, deleteTransaction } = useFinance();
  if (transactions.length === 0) {
    return <p>No transactions yet. Start by adding one!</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {transactions.map((t) => (
        <li
          key={t.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderLeft: `4px solid ${t.type === "income" ? "green" : "red"}`,
            padding: "10px 12px",
            marginBottom: "8px",
            background: "#f9f9f9",
          }}
        >
          {/* Left — description + meta */}
          <div>
            <p style={{ margin: 0, fontWeight: 500 }}>{t.description}</p>
            <small style={{ color: "#888" }}>
              {t.category} · {formatDate(t.date)}
            </small>
          </div>

          {/* Right — amount + delete */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                fontWeight: 600,
                color: t.type === "income" ? "green" : "red",
              }}
            >
              {t.type === "income" ? "+" : "-"}
              {formatter.format(t.amount)}
            </span>

            <button
              onClick={() => deleteTransaction(t.id)}
              style={{
                color: "red",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              aria-label={`Delete ${t.description}`}
            >
              ✕
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
