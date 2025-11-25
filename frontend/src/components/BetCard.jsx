import React from "react";

export default function BetCard({ bet, onOpen }) {
  return (
    <div className="bet-card">
      <h3>{bet.title}</h3>
      <p className="muted">{bet.description}</p>
      <div className="options">
        {bet.options && bet.options.map(opt => (
          <div key={opt.id} className="opt">
            <div className="label">{opt.label}</div>
            <div className="odds">{opt.odds.toFixed(2)}</div>
          </div>
        ))}
      </div>
      <div className="foot">
        <div className="pool">Pool: {bet.totalPool || 0} pts</div>
        <button className="bet-btn" onClick={() => onOpen(bet)}>Visualizar</button>
      </div>
    </div>
  );
}
