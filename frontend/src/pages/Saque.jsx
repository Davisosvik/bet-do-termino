// src/pages/Saque.jsx
import React, { useState } from "react";

export default function Saque({ onNavigate }) {
  const [value, setValue] = useState("");
  function handle() {
    if (!value || Number(value) <= 0) return alert("Valor inválido");
    alert(`Saque de ${value} solicitado (simulado)`);
    setValue("");
  }
  return (
    <div className="app-wrapper">
      <div className="dashboard-container">
        <div className="topbar">
          <div className="brand" onClick={() => onNavigate("dashboard")}>🎯 BET DO TÉRMINO</div>
          <div><button className="icon-btn" onClick={() => onNavigate("conta")}>Voltar</button></div>
        </div>

        <div style={{marginTop:18}}>
          <div className="card">
            <h3>Sacar</h3>
            <input className="input-amt" placeholder="Valor" value={value} onChange={e=>setValue(e.target.value)} />
            <div style={{marginTop:10}}>
              <button className="btn" onClick={handle}>Solicitar Saque</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
