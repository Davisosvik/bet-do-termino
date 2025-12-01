import React, { useState } from "react";
import "../styles/Dashboard.css";
import showToast from "../utils/showToast";
import BetSlipSidebar from "../components/BetSlipSidebar";

export default function Dashboard() {
  const [slip, setSlip] = useState([]);
  const [slipAberto, setSlipAberto] = useState(false);
  const [zoomAtivo, setZoomAtivo] = useState(false);

  const apostasAlta = [
    { motivo: "Falta de comunicação", odd: 1.85 },
    { motivo: "Traição / quebra de confiança", odd: 2.40 },
    { motivo: "Diferenças de objetivos", odd: 3.10 },
    { motivo: "Conflitos frequentes", odd: 2.75 },
    { motivo: "Desinteresse / esfriamento", odd: 2.20 }
  ];

  const addToSlip = (item) => {
    setSlip((prev) => [
      ...prev,
      {
        betId: "inicial",
        betTitle: "Aposta Popular",
        optionId: item.motivo,
        label: item.motivo,
        odds: item.odd,
        amount: 0,
      },
    ]);

    showToast("Adicionado ao bilhete!", "success");
  };

  return (
    <div className="dashboard">

      {/* ================= HEADER PREMIUM ================= */}
      <header className="premium-header">

        {/* Botão do bilhete */}
        <div className="header-left">
          <div className="bet-icon" onClick={() => setSlipAberto(true)}>
            🧾
            {slip.length > 0 && <span className="badge">{slip.length}</span>}
          </div>
        </div>

        {/* Logo */}
        <h1 className="premium-logo">💔 BET DO TÉRMINO</h1>

        <div className="header-right"></div>
      </header>

      {/* ================= CARTÃO DO CASAL ================= */}
      <div className="casal-card" onClick={() => setZoomAtivo(true)}>
        <div className="foto-wrapper animada">
          <img src="/img/foto-1.jpg" className="foto" alt="foto 1" />
        </div>
        <div className="foto-wrapper animada">
          <img src="/img/foto-2.jpg" className="foto" alt="foto 2" />
        </div>

        <h2 className="casal-nomes">Alef ❤️ Larissa</h2>
        <p className="casal-descricao">Baseado em apostas do público</p>
      </div>

      {/* ========== ZOOM DAS FOTOS ========== */}
      {zoomAtivo && (
        <div className="zoom-bg" onClick={() => setZoomAtivo(false)}>
          <img src="/img/foto-1.jpg" className="zoom-img" />
          <img src="/img/foto-2.jpg" className="zoom-img" />
        </div>
      )}

      {/* ================= APOSTAS EM ALTA ================= */}
      <h2 className="sec-title">🔥 Apostas em Alta</h2>

      <div className="apostas-alta premium-grid">
        {apostasAlta.map((item, index) => (
          <div
            key={index}
            className="alta-card premium-card"
            onClick={() => addToSlip(item)}
          >
            <p>{item.motivo}</p>
            <span className="odd">Odd {item.odd}</span>
          </div>
        ))}
      </div>

      {/* ================= BETSLIP ================= */}
      <BetSlipSidebar
        slip={slip}
        setSlip={setSlip}
        slipAberto={slipAberto}
        fechar={() => setSlipAberto(false)}
      />

    </div>
  );
}
