import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { useTransactions } from "./hooks/useTransactions.js";
import Sidebar from "./components/Sidebar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import AddTransaction from "./pages/AddTransaction.jsx";
import TransactionDetail from "./pages/TransactionDetail.jsx";
import Summary from "./pages/Summary.jsx";

// HashRouter keeps the same #/dashboard, #/add, #/transaction/:id, #/summary
// URLs the prototype used, just backed by real client-side routing now.
export default function App() {
  const txState = useTransactions();

  return (
    <ThemeProvider>
      <HashRouter>
        <div className="frame">
          <Sidebar />
          <main className="pages">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard transactions={txState.transactions} />} />
              <Route path="/add" element={<AddTransaction addTransaction={txState.addTransaction} />} />
              <Route
                path="/transaction/:id"
                element={
                  <TransactionDetail
                    transactions={txState.transactions}
                    updateTransaction={txState.updateTransaction}
                    deleteTransaction={txState.deleteTransaction}
                  />
                }
              />
              <Route path="/summary" element={<Summary transactions={txState.transactions} />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </ThemeProvider>
  );
}
