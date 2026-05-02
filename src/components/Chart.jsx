import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useFinance } from "../context/FinanceContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#C9CBCF",
];

export default function Chart() {
  const { transactions } = useFinance();

  const expenses = transactions.filter((t) => t.type === "expense");

  if (expenses.length === 0) {
    return <p>No expense data to chart yet.</p>;
  }

  // Group and sum by category
  const grouped = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {});

  const labels = Object.keys(grouped);
  const values = Object.values(grouped);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: COLORS.slice(0, labels.length),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom",
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const total = values.reduce((a, b) => a + b, 0);
            const pct = ((ctx.parsed / total) * 100).toFixed(1);
            return ` ₦${ctx.parsed.toLocaleString()} (${pct}%)`;
          },
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: "320px", margin: "0 auto" }}>
      <h3 style={{ textAlign: "center" }}>Spending by Category</h3>
      <Doughnut data={data} options={options} />
    </div>
  );
}
