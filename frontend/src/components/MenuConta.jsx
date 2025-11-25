import React from "react";

export default function MenuConta({ user, onOpen }) {
  return (
    <div className="widget">
      <h4>CONTA</h4>
      <div className="small">Olá, {user?.username || "Usuário"}</div>
      <div style={{ marginTop:10, fontWeight:700, fontSize:18 }}>{user?.balance ? `${user.balance} pts` : "0 pts"}</div>

      <div style={{ marginTop:12, display:"flex", gap:8 }}>
        <button className="btn" onClick={() => onOpen("deposit")}>Depositar</button>
        <button className="btn ghost" onClick={() => onOpen("withdraw")}>Sacar</button>
      </div>

      <div style={{ marginTop:10 }}>
        <button className="btn ghost" onClick={() => onOpen("history")}>Histórico</button>
      </div>
    </div>
  );
}
