// src/pages/views/ApostasView.jsx
import React from "react";
import OtherBetsBox from "../../components/OtherBetsBox";

export default function ApostasView({ categories, addToSlip }) {
  return (
    <div>
      <div className="card">
        <h3>🎲 Todas as Apostas</h3>
        <p className="small-note">Clique numa categoria para expandir motivos e adicionar ao bilhete.</p>
      </div>

      <div style={{height:12}} />

      <div className="card">
        <OtherBetsBox categories={categories} onPick={(it, cat) => addToSlip(it, cat.category)} />
      </div>
    </div>
  );
}
