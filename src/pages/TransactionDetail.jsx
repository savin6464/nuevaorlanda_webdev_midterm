import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { peso, formatDate } from "../utils/format.js";

export default function TransactionDetail({ transactions, updateTransaction, deleteTransaction }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const txId = Number(id);
  const t = transactions.find((tx) => tx.id === txId) || transactions[0];

  const [isEditing, setIsEditing] = useState(false);
  const [edit, setEdit] = useState({ description: "", amount: "", category: "" });

  // Re-sync the edit form (and close it) whenever the viewed transaction changes,
  // same as the old renderDetail() resetting #edit-form on every navigation.
  useEffect(() => {
    if (t) {
      setEdit({ description: t.description, amount: t.amount, category: t.category });
      setIsEditing(false);
    }
  }, [t?.id]);

  if (!t) {
    return (
      <section className="page active" id="page-transaction">
        <p className="empty-note">No transactions to show.</p>
      </section>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    updateTransaction(t.id, {
      description: edit.description.trim() || t.description,
      amount: Number(edit.amount) || t.amount,
      category: edit.category.trim() || t.category,
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTransaction(t.id);
    navigate("/dashboard");
  };

  return (
    <section className="page active" id="page-transaction">
      <header className="page-head">
        
        <h2>Transaction Detail</h2>
      </header>

      <div className="detail-card">
        <dl className="detail-grid">
          <div>
            <dt>Description</dt>
            <dd>{t.description}</dd>
          </div>
          <div>
            <dt>Amount</dt>
            <dd className="mono" style={{ color: t.type === "expense" ? "var(--expense)" : "var(--income)" }}>
              {t.type === "expense" ? "−" : "+"}
              {peso(t.amount)}
            </dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>{t.type === "expense" ? "Expense" : "Income"}</dd>
          </div>
          <div>
            <dt>Category</dt>
            <dd>{t.category}</dd>
          </div>
          <div>
            <dt>Date</dt>
            <dd>{formatDate(t.date)}</dd>
          </div>
        </dl>

        <div className="detail-actions">
          <button className="btn-secondary" type="button" onClick={() => setIsEditing(true)}>
            Edit details
          </button>
          <button className="btn-danger" type="button" onClick={handleDelete}>
            Delete transaction
          </button>
        </div>

        {isEditing && (
          <form className="ledger-form edit-form" onSubmit={handleSave}>
            <div className="form-row">
              <label htmlFor="e-desc">Description</label>
              <input
                type="text"
                id="e-desc"
                value={edit.description}
                onChange={(e) => setEdit((f) => ({ ...f, description: e.target.value }))}
              />
            </div>
            <div className="form-grid">
              <div className="form-row">
                <label htmlFor="e-amount">Amount</label>
                <input
                  type="number"
                  id="e-amount"
                  step="0.01"
                  value={edit.amount}
                  onChange={(e) => setEdit((f) => ({ ...f, amount: e.target.value }))}
                />
              </div>
              <div className="form-row">
                <label htmlFor="e-category">Category</label>
                <input
                  type="text"
                  id="e-category"
                  value={edit.category}
                  onChange={(e) => setEdit((f) => ({ ...f, category: e.target.value }))}
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Save changes
              </button>
              <button type="button" className="btn-ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
