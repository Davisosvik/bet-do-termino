import React from "react";

export default function MainBetsBox({ items, onSelect }) {
  return (
    <div className="box">
      <h3>APOSTAS PRINCIPAIS</h3>
      {items.map(i => (
        <div key={i.id} className="main-bet-row" onClick={() => onSelect(i)}>
          <div className="label">{i.label}</div>
          <div className="odds">{i.odds.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}
