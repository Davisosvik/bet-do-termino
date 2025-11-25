import React from "react";

export default function MenuApostas({ onOpen }) {
  return (
    <div className="widget">
      <h4>APOSTAS</h4>
      <div className="small">Apostas feitas / em aberto / finalizadas</div>
      <div style={{ marginTop:10 }}>
        <button className="btn ghost" onClick={() => onOpen("history")}>Ver Apostas</button>
      </div>
    </div>
  );
}
