import React, { useEffect, useState } from "react";
import { getResultados } from "../../utils/apiMock";

export default function ResultadosView() {
  const [res, setRes] = useState([]);

  useEffect(() => {
    getResultados().then(setRes);
  }, []);

  return (
    <div>
      <div className="card">
        <h3>📈 Resultados</h3>
      </div>

      <div style={{height:12}} />

      <div className="card">
        {res.map(r => (
          <div key={r.id} style={{
            display:"flex", justifyContent:"space-between",
            padding:"10px 0", borderBottom:"1px solid var(--border)"
          }}>
            <div>{r.title}</div>
            <div style={{
              fontWeight:700,
              color: r.result === "Ganhou" ? "green" : "#c0392b"
            }}>{r.result}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
