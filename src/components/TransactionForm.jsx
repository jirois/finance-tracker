import { useState } from "react";
import { useFinance } from "../context/FinanceContext";

const CATEGORIES = {
  income: ["Salary", "Freelance", "Investment", "Gift", "Other"],
  expense: [
    "Food",
    "Transport",
    "Housing",
    "Health",
    "Entertainment",
    "Shopping",
    "Other",
  ],
};

const initialState = {
  description: "",
  amount: "",
  type: "expense",
  category: "Food",
};

export default function TransactionForm() {
  const { addTransaction } = useFinance();
  const [form, setForm] = useState(initialState);
  const [error, setErrors] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      // Reset category when type changes
      ...(name === "type" && { category: CATEGORIES[value][0] }),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.description.trim()) return setErrors("Add a description");
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      return setErrors("Enter a valid amount");
    addTransaction({
      ...form,
      amount: parseFloat(form.amount),
    });
    setForm(initialState);
    setErrors("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Type toggle */}
      <div>
        {["expense", "income"].map((type) => (
          <button
            key={type}
            type="button"
            name="type"
            value={type}
            onClick={handleChange}
            style={{ fontWeight: form.type === type ? "bold" : "normal" }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
      {/* Description ` */}
      <input
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />
      {/* Amount */}
      <input
        name="amount"
        value={form.amount}
        onChange={handleChange}
        placeholder="Amount"
        type="number"
        min="0"
        step="0.01"
      />
      {/* Category - only show relevant categories */}
      <select name="category" value={form.category} onChange={handleChange}>
        {CATEGORIES[form.type].map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Add Transaction</button>
    </form>
  );
}
