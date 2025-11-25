// src/pages/views/ContaViewPremium.jsx
import React, { useState } from "react";
import "../../styles/Dashboard.css";

export default function ContaViewPremium({ user = {}, formatBRL, close, pushToast }) {
  const [tab, setTab] = useState("geral"); // geral | deposito | saque | historico
  const [valor, setValor] = useState("");
  const [history, setHistory] = useState([]); // {type, amount, date}

  function addHistory(type, amount) {
    const entry = { type, amount: Number(amount), date: new Date().toLocaleString() };
    setHistory(prev => [entry, ...prev]);
    if (pushToast) pushToast(`${type === "deposit" ? "Depósito" : "Saque"} de ${formatBRL(amount)} registrado`, "success");
  }

  function handleDeposito() {
    if (!valor || Number(valor) <= 0) {
      if (pushToast) return pushToast("Informe um valor válido para depósito.", "error");
      return alert("Valor inválido");
    }
    addHistory("deposit", valor);
    setValor("");
    setTab("historico");
  }

  function handleSaque() {
    if (!valor || Number(valor) <= 0) {
      if (pushToast) return pushToast("Informe um valor válido para saque.", "error");
      return alert("Valor inválido");
    }
    addHistory("withdraw", valor);
    setValor("");
    setTab("historico");
  }

  return (
    <div className="premium-modal-overlay">
      <div className="premium-modal">
        <div className="modal-header">
          <h2>👤 Conta — {user.username || "Usuário"}</h2>
          <div>
            <button className="btn ghost" onClick={() => setTab("historico")}>Histórico</button>
            <button className="close-btn" onClick={close}>✖</button>
          </div>
        </div>

        <div className="saldo-box">
          <div>
            <div className="small-note">Saldo atual</div>
            <strong className="saldo-valor">{formatBRL(user.balance || 0)}</strong>
          </div>
        </div>

        <div className="modal-tabs">
          <button className={tab === "geral" ? "active" : ""} onClick={() => setTab("geral")}>📄 Geral</button>
          <button className={tab === "deposito" ? "active" : ""} onClick={() => setTab("deposito")}>💳 Depósito</button>
          <button className={tab === "saque" ? "active" : ""} onClick={() => setTab("saque")}>🏦 Saque</button>
          <button className={tab === "historico" ? "active" : ""} onClick={() => setTab("historico")}>🧾 Histórico</button>
        </div>

        <div className="modal-content">
          {tab === "geral" && (
            <div className="tab-page">
              <p><strong>Nome:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email || "—"}</p>
              <p className="small-note">Use as abas para depositar ou sacar (simulado).</p>
            </div>
          )}

          {tab === "deposito" && (
            <div className="tab-page">
              <input
                type="number"
                placeholder="Valor em R$"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button className="btn" onClick={handleDeposito}>Depositar</button>
                <button className="btn ghost" onClick={() => { setValor(""); pushToast && pushToast("Depósito cancelado", "info"); }}>Cancelar</button>
              </div>
            </div>
          )}

          {tab === "saque" && (
            <div className="tab-page">
              <input
                type="number"
                placeholder="Valor em R$"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button className="btn" onClick={handleSaque}>Solicitar Saque</button>
                <button className="btn ghost" onClick={() => { setValor(""); pushToast && pushToast("Saque cancelado", "info"); }}>Cancelar</button>
              </div>
            </div>
          )}

          {tab === "historico" && (
            <div className="tab-page">
              <h4>Histórico</h4>
              {history.length === 0 && <div className="small-note">Nenhuma movimentação</div>}
              {history.map((h, i) => (
                <div key={i} style={{ borderBottom: "1px solid #eee2", padding: 8 }}>
                  <div style={{ fontWeight: 700 }}>{h.type === "deposit" ? "Depósito" : "Saque"}</div>
                  <div style={{ fontSize: 13, color: "#666" }}>{h.date}</div>
                  <div style={{ marginTop: 6 }}>{formatBRL(h.amount)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
