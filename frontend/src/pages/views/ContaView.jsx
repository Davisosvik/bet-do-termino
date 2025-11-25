// src/pages/views/ContaView.jsx
import React, { useState } from "react";

export default function ContaView({ user = {}, onLogout }) {
  const [amount, setAmount] = useState("");

  function deposit() {
    if (!amount || Number(amount) <= 0) return alert("Valor inválido");
    alert(`Depósito simulado de ${amount} pts`);
    setAmount("");
  }

  return (
    <div>
      <div className="card">
        <h3>👤 Conta</h3>
        <p className="small-note">Olá, <strong>{user.username || "Usuário"}</strong></p>
      </div>

      <div style={{height:12}} />

      <div className="card">
        <h4>Saldo</h4>
        <div style={{fontSize:22, fontWeight:800, marginTop:8}}>{user.balance || 0} pts</div>
        <div style={{marginTop:12, display:"flex", gap:10}}>
          <input className="input-amt" placeholder="Valor" value={amount} onChange={e => setAmount(e.target.value)} />
          <button className="btn" onClick={deposit}>Depositar</button>
        </div>
        <div style={{marginTop:12}}>
          <button className="btn ghost" onClick={onLogout}>🚪 Sair da conta</button>
        </div>
      </div>
    </div>
  );
}
