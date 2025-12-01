import React, { useState } from "react";
import "../styles/betslip.css";

export default function BetSlipFloating({ slip, setSlip }) {
  const [open, setOpen] = useState(false);

  const updateAmount = (index, value) => {
    const newSlip = [...slip];
    newSlip[index].amount = value;
    setSlip(newSlip);
  };

  const removeItem = (index) => {
    const newSlip = slip.filter((_, i) => i !== index);
    setSlip(newSlip);
  };

  const calcularRetorno = (item) => {
    if (!item.amount || item.amount <= 0) return "0.00";
    return (item.amount * item.odds).toFixed(2);
  };

  return (
    <div className={`betslip-floating ${open ? "open" : ""}`}>
      
      {/* BOTÃO DE ABRIR / FECHAR */}
      <div className="betslip-header" onClick={() => setOpen(!open)}>
        <h3>🎫 Bilhete</h3>
        <span className="toggle-btn">{open ? "▼" : "▲"}</span>
      </div>

      {/* CONTEÚDO INTERNO */}
      {open && (
        <div className="betslip-content">
          {slip.length === 0 ? (
            <p className="empty-slip">Nenhuma aposta.</p>
          ) : (
            slip.map((item, index) => (
              <div key={index} className="floating-item">

                <div className="floating-info">
                  <strong>{item.label}</strong>
                  <span className="floating-odds">Odd {item.odds.toFixed(2)}</span>
                </div>

                <input
                  type="number"
                  placeholder="Valor"
                  value={item.amount}
                  onChange={(e) => updateAmount(index, Number(e.target.value))}
                />

                <div className="floating-return">
                  Retorno:  
                  <span>R$ {calcularRetorno(item)}</span>
                </div>

                <button className="floating-remove" onClick={() => removeItem(index)}>
                  Remover
                </button>
              </div>
            ))
          )}
        </div>
      )}

    </div>
  );
}
