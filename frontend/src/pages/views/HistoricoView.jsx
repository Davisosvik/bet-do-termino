import React, { useEffect, useState } from "react";
import { getHistory } from "../../utils/apiMock";

export default function HistoricoView() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory().then(setHistory);
  }, []);

  return (
    <div>
      <div className="card">
        <h3>📜 Histórico</h3>
      </div>

      <div style={{height:12}} />

      <div className="card">
        {history.length === 0 && <div className="small-note">Nenhuma aposta feita ainda</div>}

        {history.map((h, idx) => (
          <div key={idx} style={{
            display:"flex", justifyContent:"space-between",
            padding:"10px 0", borderBottom:"1px solid var(--border)"
          }}>
            <div>
              <div style={{fontWeight:700}}>{h.label}</div>
              <div style={{fontSize:13}}>{h.date.slice(0,10)}</div>
            </div>

            <div style={{textAlign:"right"}}>
              <div style={{fontWeight:800}}>{h.value} pts</div>
              <div style={{fontSize:13, color:"var(--accent)"}}>Odd {h.odds}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
