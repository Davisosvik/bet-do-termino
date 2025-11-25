import React from "react";

export default function Sidebar({ page, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand-small" onClick={() => onNavigate("dashboard")}>
        BD
      </div>

      <div
        className={`nav-item ${page === "dashboard" ? "active" : ""}`}
        onClick={() => onNavigate("dashboard")}
      >
        <span>Dashboard</span>
      </div>

      <div
        className={`nav-item ${page === "bets" ? "active" : ""}`}
        onClick={() => onNavigate("bets")}
      >
        <span>Apostas</span>
      </div>

      <div
        className={`nav-item ${page === "conta" ? "active" : ""}`}
        onClick={() => onNavigate("conta")}
      >
        <span>Conta</span>
      </div>

      <div
        className={`nav-item ${page === "history" ? "active" : ""}`}
        onClick={() => onNavigate("history")}
      >
        <span>Histórico</span>
      </div>

      <div className="small-note">Versão dev • Bet do Término</div>
    </aside>
  );
}
