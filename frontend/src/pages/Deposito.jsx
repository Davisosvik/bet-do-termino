// src/pages/Deposito.jsx
import React from "react";

export default function Deposito({ onNavigate }) {
  return (
    <div className="app-wrapper">
      <div className="dashboard-container">
        <div className="topbar">
          <div className="brand" onClick={() => onNavigate("dashboard")}>🎯 BET DO TÉRMINO</div>
          <div><button className="icon-btn" onClick={() => onNavigate("conta")}>Voltar</button></div>
        </div>

        <div style={{marginTop:18}}>
          <div className="card">
            <h3>Depositar — PIX</h3>
            <p>Escolha um valor e siga as instruções do PIX (simulado).</p>
            <div style={{display:"flex",gap:8,marginTop:8}}>
              <button className="btn">R$10</button>
              <button className="btn">R$20</button>
              <button className="btn">R$50</button>
            </div>

            <div style={{marginTop:12}}>
              <div style={{background:"#fff",padding:8,borderRadius:8}}>QR CODE (simulado)</div>
              <div style={{marginTop:8}}>
                <button className="btn ghost">Copiar chave PIX</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
