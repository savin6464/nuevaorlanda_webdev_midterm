import { useCallback, useRef, useState } from "react";

const initialTransactions = [];

// This prototype keeps everything in React state. Swap the body of these
// three callbacks for API/localStorage calls when this is wired to a backend.
export function useTransactions() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const nextId = useRef(1);

  const addTransaction = useCallback((tx) => {
    setTransactions((prev) => [...prev, { ...tx, id: nextId.current++ }]);
  }, []);

  const updateTransaction = useCallback((id, updates) => {
    setTransactions((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { transactions, addTransaction, updateTransaction, deleteTransaction };
}
