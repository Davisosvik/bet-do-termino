// src/pages/views/TendenciasView.jsx
import React from "react";

export default function TendenciasView({ trends = [] }) {
  return (
    <div>
      <div className="card">
        <h3>🔥 Tendências de Término</h3>
        <p className="small-note">Popularidade simulada</p>
      </div>

      <div style={{height:12}} />

      <div className="card">
        {trends.map((t, i) => (
          <div key={i} style={{display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid var(--border)"}}>
            <div style={{fontWeight:700}}>{t.label}</div>
            <div style={{fontWeight:800, color:"var(--accent)"}}>{t.score}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
