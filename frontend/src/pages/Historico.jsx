// src/pages/Historico.jsx
import React from "react";

export default function Historico({ user, onNavigate }) {
  return (
    <div className="app-wrapper">
      <div className="dashboard-container">
        <div className="topbar">
          <div className="brand" onClick={() => onNavigate("dashboard")}>🎯 BET DO TÉRMINO</div>
          <div><button className="icon-btn" onClick={() => onNavigate("dashboard")}>Voltar</button></div>
        </div>

        <div style={{marginTop:18}}>
          <div className="card">
            <h3>Histórico de Apostas & Transações</h3>
            <div className="small-note" style={{marginTop:10}}>Sem dados (simulado)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
