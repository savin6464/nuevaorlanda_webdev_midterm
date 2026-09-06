import { useState } from "react";
import { useNavigate } from "react-router-dom";

const categoryOptions = ["Salary", "Freelance", "Groceries", "Utilities", "Transport", "Entertainment", "Other"];

const emptyForm = { description: "", amount: "", type: "", category: "", date: "" };

const errorStyle = { borderColor: "var(--expense)" };

export default function AddTransaction({ addTransaction }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!form.description.trim()) newErrors.description = "Description is required.";
    if (!form.amount || Number(form.amount) <= 0) newErrors.amount = "Enter an amount greater than 0.";
    if (!form.type) newErrors.type = "Choose income or expense.";
    if (!form.category) newErrors.category = "Choose a category.";
    if (!form.date) newErrors.date = "Pick a date.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    addTransaction({
      description: form.description.trim(),
      amount: Number(form.amount),
      type: form.type,
      category: form.category,
      date: form.date,
    });

    setStatus("Saved — returning to dashboard…");
    setForm(emptyForm);

    setTimeout(() => {
      setStatus("");
      navigate("/dashboard");
    }, 500);
  };

  return (
    <section className="page active" id="page-add">
      <header className="page-head">
       
        <h2>Add Transaction</h2>
      </header>

      <form className="ledger-form" onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label htmlFor="f-desc">
            Description <span className="req">required</span>
          </label>
          <input
            type="text"
            id="f-desc"
            placeholder="e.g. Freelance payment"
            value={form.description}
            onChange={handleChange("description")}
            style={errors.description ? errorStyle : undefined}
          />
          <span className="field-error">{errors.description}</span>
        </div>

        <div className="form-grid">
          <div className="form-row">
            <label htmlFor="f-amount">
              Amount <span className="req">required</span>
            </label>
            <input
              type="number"
              id="f-amount"
              placeholder="0.00"
              step="0.01"
              value={form.amount}
              onChange={handleChange("amount")}
              style={errors.amount ? errorStyle : undefined}
            />
            <span className="field-error">{errors.amount}</span>
          </div>

          <div className="form-row">
            <label htmlFor="f-type">
              Type <span className="req">required</span>
            </label>
            <select
              id="f-type"
              value={form.type}
              onChange={handleChange("type")}
              style={errors.type ? errorStyle : undefined}
            >
              <option value="">Choose one</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <span className="field-error">{errors.type}</span>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-row">
            <label htmlFor="f-category">
              Category <span className="req">required</span>
            </label>
            <select
              id="f-category"
              value={form.category}
              onChange={handleChange("category")}
              style={errors.category ? errorStyle : undefined}
            >
              <option value="">Choose one</option>
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <span className="field-error">{errors.category}</span>
          </div>

          <div className="form-row">
            <label htmlFor="f-date">
              Date <span className="req">required</span>
            </label>
            <input
              type="date"
              id="f-date"
              value={form.date}
              onChange={handleChange("date")}
              style={errors.date ? errorStyle : undefined}
            />
            <span className="field-error">{errors.date}</span>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Save entry
          </button>
          <span className="form-status">{status}</span>
        </div>
      </form>
    </section>
  );
}
