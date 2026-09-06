import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

const navLinkClass = ({ isActive }) => "nav-link" + (isActive ? " active" : "");

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className="ledger-spine">
      <div className="spine-top">
        <span className="spine-mark">◈</span>
        <h1 className="wordmark">Ledger webdev</h1>
        <p className="tagline">Made by Nuevaorlanda C3B</p>
      </div>

      <nav className="spine-nav" aria-label="Primary">
        <NavLink to="/dashboard" className={navLinkClass}>
          <span className="nav-index">I</span> Dashboard
        </NavLink>
        <NavLink to="/add" className={navLinkClass}>
          <span className="nav-index">II</span> Add Transaction
        </NavLink>
        <NavLink to="/transaction/1" className={navLinkClass}>
          <span className="nav-index">III</span> Transaction Detail
        </NavLink>
        <NavLink to="/summary" className={navLinkClass}>
          <span className="nav-index">IV</span> Summary
        </NavLink>
      </nav>

      <div className="spine-bottom">
        <button
          className="theme-toggle"
          type="button"
          aria-pressed={theme === "dark"}
          onClick={toggleTheme}
        >
          <span className="toggle-track">
            <span className="toggle-thumb"></span>
          </span>
          <span className="toggle-label">{theme === "dark" ? "Dark ledger" : "Light ledger"}</span>
        </button>
      </div>
    </aside>
  );
}
