import React from "react";

export default function BetSlip({ slip, onChangeAmount, onRemove, onPlace }) {
  const total = slip.reduce((s, item) => s + (item.amount || 0) * (item.odds || 0), 0);
  return (
    <div className="betslip">
      <h4>APOSTA SELECIONADA</h4>
      {slip.length === 0 && <div className="small">Nenhuma seleção</div>}
      {slip.map((s, idx) => (
        <div key={s.id} className="line" style={{ alignItems:"center" }}>
          <div>
            <div style={{ fontWeight:700 }}>{s.label}</div>
            <div style={{ fontSize:12, color:"#aaa" }}>{s.oddLabel} — {s.odds.toFixed(2)}</div>
          </div>
          <div style={{ width:110 }}>
            <input type="number" placeholder="0" value={s.amount || ""} onChange={e => onChangeAmount(idx, Number(e.target.value))} />
            <div style={{ marginTop:6, display:"flex", gap:6 }}>
              <button className="btn" onClick={() => onPlace(idx)}>Apostar</button>
              <button className="btn ghost" onClick={() => onRemove(idx)}>Remover</button>
            </div>
          </div>
        </div>
      ))}
      <div style={{ marginTop:10, fontWeight:700 }}>Possível retorno: {total.toFixed(2)}</div>
    </div>
  );
}
