// src/pages/BetDetails.jsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import showToast from "../utils/showToast";
import BetSlip from "../components/BetSlipSidebar";
import "../styles/betdetails.css";

export default function BetDetails() {
  const { id } = useParams();

  const [bet, setBet] = useState(null);
  const [wagers, setWagers] = useState([]);
  const [slip, setSlip] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDetails = async () => {
    try {
      const res = await api.get(`/api/bets/${id}`);
      setBet(res.data.bet);
      setWagers(res.data.wagers);
      setLoading(false);
    } catch (err) {
      showToast("Erro ao carregar detalhes da aposta.", "error");
    }
  };

  useEffect(() => {
    loadDetails();
  }, [id]);

  // Adiciona opção ao slip
  const addToSlip = (option) => {
    const exists = slip.find((s) => s.optionId === option.id);

    if (exists) {
      showToast("Essa seleção já está no bilhete!", "info");
      return;
    }

    setSlip((prev) => [
      ...prev,
      {
        betId: bet._id,
        betTitle: bet.title,
        optionId: option.id,
        label: option.label,
        odds: option.odds,
        amount: 0,
      },
    ]);

    showToast("Adicionado ao bilhete!", "success");
  };

  if (loading) return <p className="loading">Carregando aposta...</p>;

  if (!bet) return <p className="loading">Aposta não encontrada.</p>;

  return (
    <div className="details-container">
      <div className="details-left">
        <h1 className="details-title">{bet.title}</h1>
        <p className="details-description">{bet.description}</p>

        <div className="info-box">
          <p><strong>Status:</strong> {bet.status}</p>
          <p><strong>Fecha em:</strong> {new Date(bet.endsAt).toLocaleString()}</p>
          <p><strong>Valor total apostado:</strong> {bet.totalPool.toFixed(2)}</p>
          <p><strong>Apostas registradas:</strong> {wagers.length}</p>
        </div>

        <h2 className="section-title">Opções</h2>

        <div className="options-grid">
          {bet.options.map((opt) => (
            <div key={opt.id} className="option-card">
              <p className="option-label">{opt.label}</p>

              <button className="odds-btn" onClick={() => addToSlip(opt)}>
                {opt.odds.toFixed(2)}
              </button>

              <p className="pool-amount">Apostado: {opt.pooledAmount}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Slip */}
      <aside className="details-slip">
        <BetSlip slip={slip} setSlip={setSlip} />
      </aside>
    </div>
  );
}
