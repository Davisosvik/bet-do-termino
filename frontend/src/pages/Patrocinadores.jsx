// src/pages/Patrocinadores.jsx
import React from "react";

export default function Patrocinadores({ onNavigate }) {
  return (
    <div className="app-wrapper">
      <div className="dashboard-container">
        <div className="topbar">
          <div className="brand" onClick={() => onNavigate("dashboard")}>🎯 BET DO TÉRMINO</div>
          <div><button className="icon-btn" onClick={() => onNavigate("dashboard")}>Voltar</button></div>
        </div>

        <div style={{marginTop:18}}>
          <div className="card">
            <h3>Patrocinadores</h3>
            <p>Espaço para logos / parcerias (simulado)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
