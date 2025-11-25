// src/pages/Dashboard.jsx
import React, { useState, useEffect, useCallback } from "react";
import "../styles/Dashboard.css";
import betsData from "../data/betsData";
import CouplesSelector from "../components/CouplesSelector";
import InicioView from "./views/InicioView";
import ApostasView from "./views/ApostasView";
import ResultadosView from "./views/ResultadosView";
import HistoricoView from "./views/HistoricoView";
import ContaViewPremium from "./views/ContaViewPremium";
import Toast from "../components/Toast";

function formatBRL(n) {
  return Number(n).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function Dashboard({ user = {}, onNavigate }) {
  const [view, setView] = useState("inicio");
  const [selectedCouple, setSelectedCouple] = useState(betsData.couples[0].id);
  const [slip, setSlip] = useState([]);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [showContaModal, setShowContaModal] = useState(false);

  // toast queue
  const [toasts, setToasts] = useState([]);
  const pushToast = useCallback((message, type = "info", duration = 3500) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts(t => [...t, { id, message, type, duration }]);
  }, []);
  const removeToast = useCallback((id) => setToasts(t => t.filter(x => x.id !== id)), []);

  useEffect(() => {
    document.body.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  function addToSlip(item, prefix = "Principal") {
    setSlip(p => {
      if (p.find(x => x.id === item.id)) {
        pushToast("Já está no bilhete", "info");
        return p;
      }
      pushToast(`Adicionado: ${item.label}`, "success");
      return [...p, { id: item.id, label: item.label, odds: item.odds, oddLabel: prefix, amount: 0 }];
    });
  }

  function changeAmt(index, val) {
    setSlip(p => {
      const copy = [...p];
      copy[index] = { ...copy[index], amount: Number(val) || 0 };
      return copy;
    });
  }

  function removeBet(index) {
    const removed = slip[index];
    setSlip(p => p.filter((_, i) => i !== index));
    pushToast(`Removido: ${removed?.label || "item"}`, "info");
  }

  function placeBet(index) {
    const item = slip[index];
    if (!item || item.amount <= 0) {
      pushToast("Informe um valor válido.", "error");
      return;
    }
    const possible = item.amount * item.odds;
    pushToast(`Aposta enviada: ${formatBRL(item.amount)} — retorno ${formatBRL(possible)}`, "success");
    setSlip(p => p.filter((_, i) => i !== index));
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onNavigate("login");
  }

  const trends = betsData.mainBets.slice(0, 6).map((b, idx) => ({ label: b.label, score: Math.max(50 - idx * 6, 12) }));

  return (
    <div className="app-wrapper">
      <div className="dashboard-container">
        <div className="topbar">
          <div className="left">
            <div className="brand" onClick={() => setView("inicio")}>🎯 BET DO TÉRMINO</div>
            <CouplesSelector couples={betsData.couples} value={selectedCouple} onChange={setSelectedCouple} />
          </div>

          <div className="actions">
            <div className="balance">💎 Saldo: <strong>{formatBRL(user.balance || 0)}</strong></div>

            <button className="icon-btn" onClick={() => setTheme(t => (t === "dark" ? "light" : "dark"))}>
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </button>

            <button className="icon-btn" onClick={() => setShowContaModal(true)}>👤 Conta</button>
            <button className="icon-btn" onClick={handleLogout}>🚪 Sair</button>
          </div>
        </div>

        <div className="main-grid">
          <div className="sidebar card" role="navigation">
            <div className="nav">
              <div className={`nav-item ${view === "inicio" ? "active" : ""}`} onClick={() => setView("inicio")}>🏠 Início</div>
              <div className={`nav-item ${view === "apostas" ? "active" : ""}`} onClick={() => setView("apostas")}>🎲 Apostas</div>
              <div className={`nav-item ${view === "resultados" ? "active" : ""}`} onClick={() => setView("resultados")}>📈 Resultados</div>
              <div className={`nav-item ${view === "regras" ? "active" : ""}`} onClick={() => setView("regras")}>📘 Regras</div>
              <div className={`nav-item ${view === "patro" ? "active" : ""}`} onClick={() => setView("patro")}>🤝 Patrocínios</div>
              <div className={`nav-item ${view === "historico" ? "active" : ""}`} onClick={() => setView("historico")}>📜 Histórico</div>
            </div>

            <div style={{ height: 12 }} />

            <div className="widget-small card">
              <div className="label">❤️ Casais em alta</div>
              <div className="value">3 casais</div>
            </div>
            <div style={{ height: 10 }} />
            <div className="widget-small card">
              <div className="label">⭐ Apostas populares</div>
              <div className="value">Top 5</div>
            </div>
          </div>

          <div className="center-column">
            {view === "inicio" && <InicioView addToSlip={addToSlip} selectedCouple={selectedCouple} />}
            {view === "apostas" && <ApostasView categories={betsData.otherBets} addToSlip={addToSlip} />}
            {view === "resultados" && <ResultadosView />}
            {view === "regras" && <div className="card"><h3>📘 Regras</h3><p className="small-note">Coloque as regras aqui.</p></div>}
            {view === "patro" && <div className="card"><h3>🤝 Patrocínios</h3><p className="small-note">Patrocinadores aqui.</p></div>}
            {view === "historico" && <HistoricoView />}
          </div>

          <div className="right-column">
            <div className="betslip card">
              <h4>🧾 Apostas Selecionadas</h4>
              {slip.length === 0 && <div className="small-note">Nenhuma aposta selecionada</div>}

              {slip.map((s, idx) => (
                <div className="line" key={s.id}>
                  <div className="label">
                    {s.label}
                    <div className="odd">{s.oddLabel}</div>
                  </div>

                  <div className="controls">
                    <input className="input-amt" type="number" placeholder="Valor (R$)" value={s.amount || ""} onChange={(e) => changeAmt(idx, e.target.value)} />
                    <button className="btn" onClick={() => placeBet(idx)}>Apostar</button>
                    <button className="btn ghost" onClick={() => removeBet(idx)}>Remover</button>
                  </div>
                </div>
              ))}

              <div className="return">
                Retorno possível: <strong>{formatBRL(slip.reduce((acc, it) => acc + (it.amount || 0) * it.odds, 0))}</strong>
              </div>
            </div>

            <div className="trends card">
              <h3>📊 Tendências</h3>
              <div style={{ height: 8 }} />
              {trends.map((t, i) => (
                <div className="trend-row" key={i}>
                  <div className="t-label">{t.label}</div>
                  <div className="t-score">{t.score}%</div>
                </div>
              ))}
              <div style={{ height: 8 }} />
              <div className="small-note">Dados simulados • conecte backend para reais</div>
            </div>
          </div>
        </div>
      </div>

      {showContaModal && (
        <ContaViewPremium user={user} formatBRL={formatBRL} close={() => setShowContaModal(false)} pushToast={pushToast} />
      )}

      {/* Toast container (absolutely positioned) */}
      <div className="toast-container">
        {toasts.map(t => <Toast key={t.id} id={t.id} type={t.type} message={t.message} duration={t.duration} onClose={removeToast} />)}
      </div>
    </div>
  );
}
