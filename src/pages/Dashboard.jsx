import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { peso, formatDate } from "../utils/format.js";

export default function Dashboard({ transactions }) {
  const navigate = useNavigate();
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const categories = useMemo(
    () => [...new Set(transactions.map((t) => t.category))].sort(),
    [transactions]
  );

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => {
        const matchesType = typeFilter === "all" || t.type === typeFilter;
        const matchesCategory = categoryFilter === "all" || t.category === categoryFilter;
        return matchesType && matchesCategory;
      })
      .slice()
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [transactions, typeFilter, categoryFilter]);

  const totalIncome = useMemo(
    () => transactions.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );
  const totalExpense = useMemo(
    () => transactions.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );

  return (
    <section className="page active" id="page-dashboard">
      <header className="page-head">
        
        <h2>Dashboard</h2>
      </header>

      <div className="balance-row">
        <div className="balance-card">
          <span className="balance-label">Current balance</span>
          <span className="balance-figure">{peso(totalIncome - totalExpense)}</span>
        </div>
        <div className="balance-mini">
          <span className="mini-label">Income</span>
          <span className="mini-figure income">{peso(totalIncome)}</span>
        </div>
        <div className="balance-mini">
          <span className="mini-label">Expenses</span>
          <span className="mini-figure expense">{peso(totalExpense)}</span>
        </div>
      </div>

      <div className="filter-row">
        <label className="filter-field">
          <span>Type</span>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label className="filter-field">
          <span>Category</span>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <table className="ledger-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th className="align-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((t) => (
            <tr key={t.id} onClick={() => navigate(`/transaction/${t.id}`)}>
              <td>{formatDate(t.date)}</td>
              <td>{t.description}</td>
              <td>
                <span className="category-pill">{t.category}</span>
              </td>
              <td className={`row-amount ${t.type}`}>
                {t.type === "expense" ? "−" : "+"}
                {peso(t.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && <p className="empty-note">No entries match this filter.</p>}
    </section>
  );
}
