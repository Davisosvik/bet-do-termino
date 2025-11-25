// src/pages/views/InicioView.jsx
import React from "react";
import betsData from "../../data/betsData";

export default function InicioView({ addToSlip, selectedCouple }) {
  return (
    <div>
      <div className="card">
        <h3>Bem-vindo 🎯</h3>
        <p className="small-note">Selecione um casal e escolha apostas. Use o bilhete à direita para confirmar.</p>
      </div>

      <div style={{ height: 12 }} />

      <div className="card">
        <h3>🎯 Apostas Principais</h3>
        <div style={{ height: 12 }} />
        <div className="main-bets">
          {betsData.mainBets.map(m => (
            <div key={m.id} className="main-bet-item" onClick={() => addToSlip(m, "Principal")}>
              <div>{m.label}</div>
              <div className="odds">{m.odds.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: 12 }} />

      <div className="card">
        <h3>📣 Notícias / Avisos</h3>
        <p className="small-note">Novidades e anúncios vão aparecer aqui.</p>
      </div>
    </div>
  );
}
