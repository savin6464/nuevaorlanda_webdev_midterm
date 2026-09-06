import { useMemo } from "react";
import { peso } from "../utils/format.js";

export default function Summary({ transactions }) {
  const entries = useMemo(() => {
    const totals = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        totals[t.category] = (totals[t.category] || 0) + t.amount;
      });
    return Object.entries(totals).sort((a, b) => b[1] - a[1]);
  }, [transactions]);

  const max = entries.length ? entries[0][1] : 1;

  return (
    <section className="page active" id="page-summary">
      <header className="page-head">
       
        <h2>Summary</h2>
      </header>

      <p className="summary-intro">Spending broken down by category, this month.</p>

      <div className="category-bars">
        {entries.length === 0 ? (
          <p className="empty-note">No expenses logged yet.</p>
        ) : (
          entries.map(([category, total]) => (
            <div className="category-bar-row" key={category}>
              <span className="category-bar-name">{category}</span>
              <span className="category-bar-track">
                <span className="category-bar-fill" style={{ width: `${(total / max) * 100}%` }}></span>
              </span>
              <span className="category-bar-amount">{peso(total)}</span>
            </div>
          ))
        )}
      </div>

     
    </section>
  );
}
