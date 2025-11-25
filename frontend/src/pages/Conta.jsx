// src/pages/views/ContaView.jsx
import React, { useState, useEffect } from "react";
import "../../styles/Dashboard.css";

// Conta view com deposit/withdraw modais simples (simulação, local state)
export default function ContaView({ user = {}, onNavigate }) {
  const [balance, setBalance] = useState(user.balance || 0);
  const [history, setHistory] = useState(() => {
    // tentar carregar do localStorage para persistir (simulado)
    const raw = localStorage.getItem("tx_history");
    return raw ? JSON.parse(raw) : [];
  });

  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    localStorage.setItem("tx_history", JSON.stringify(history));
  }, [history]);

  function addHistory(type, value) {
    const entry = { type, value: Number(value), date: new Date().toLocaleString() };
    setHistory(prev => [entry, ...prev]);
  }

  function handleDeposit() {
    if (!amount || Number(amount) <= 0) return alert("Valor inválido");
    setBalance(prev => Number(prev) + Number(amount));
    addHistory("deposito", amount);
    setAmount("");
    setShowDeposit(false);
  }

  function handleWithdraw() {
    if (!amount || Number(amount) <= 0) return alert("Valor inválido");
    if (Number(amount) > balance) return alert("Saldo insuficiente");
    setBalance(prev => Number(prev) - Number(amount));
    addHistory("saque", amount);
    setAmount("");
    setShowWithdraw(false);
  }

  function formatBRL(n) {
    return Number(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  return (
    <div className="account-page card">
      <div className="account-header">
        <button className="btn ghost" onClick={() => onNavigate("inicio")}>Voltar</button>
        <h2>CONTA</h2>
        <div />
      </div>

      <div className="account-body">
        <div className="account-left">
          <h3>Olá, {user.username || "Usuário"}</h3>
          <div style={{ marginTop:10, fontSize:20, fontWeight:800 }}>{formatBRL(balance)}</div>

          <div className="money-row" style={{ marginTop:10 }}>
            <input className="input-amt" placeholder="Valor (R$)" value={amount} onChange={e => setAmount(e.target.value)} />
            <button className="btn" onClick={() => setShowDeposit(true)}>Depositar</button>
            <button className="btn ghost" onClick={() => setShowWithdraw(true)}>Sacar</button>
          </div>

          <div style={{ marginTop:12 }}>
            <button className="btn ghost" onClick={() => { setHistory([]); localStorage.removeItem("tx_history"); }}>Limpar Histórico</button>
          </div>
        </div>

        <div className="account-right">
          <h4>Histórico</h4>
          {history.length === 0 && <div className="small-note">Sem movimentos</div>}
          {history.map((h, idx) => (
            <div key={idx} style={{ padding:8, borderBottom:"1px solid rgba(0,0,0,0.06)" }}>
              <div style={{ fontWeight:700 }}>{h.type === "deposito" ? "Depósito" : "Saque"}</div>
              <div style={{ color:"#777", fontSize:13 }}>{h.date}</div>
              <div style={{ marginTop:6 }}>{formatBRL(h.value)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Simples modais inline */}
      {showDeposit && (
        <div className="modal">
          <h4>Depositar</h4>
          <input className="input-amt" placeholder="Valor (R$)" value={amount} onChange={e => setAmount(e.target.value)} />
          <div style={{ marginTop:8 }}>
            <button className="btn" onClick={handleDeposit}>Confirmar</button>
            <button className="btn ghost" onClick={() => { setShowDeposit(false); setAmount(""); }}>Cancelar</button>
          </div>
        </div>
      )}

      {showWithdraw && (
        <div className="modal">
          <h4>Sacar</h4>
          <input className="input-amt" placeholder="Valor (R$)" value={amount} onChange={e => setAmount(e.target.value)} />
          <div style={{ marginTop:8 }}>
            <button className="btn" onClick={handleWithdraw}>Confirmar</button>
            <button className="btn ghost" onClick={() => { setShowWithdraw(false); setAmount(""); }}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}
