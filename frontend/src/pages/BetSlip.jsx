// src/pages/Bets.jsx

import React, { useEffect, useState } from "react";
import api from "../api/api";
import showToast from "../utils/showToast";

import BetSlip from "../components/BetSlipSidebar";
import "../styles/bets.css";

export default function Bets() {
  const [bets, setBets] = useState([]);
  const [slip, setSlip] = useState([]);

  const loadBets = async () => {
    try {
      const res = await api.get("/bets"); 
      setBets(res.data.bets || []);
    } catch (err) {
      console.error(err);
      showToast("Erro ao carregar apostas!", "error");
    }
  };

  useEffect(() => {
    loadBets();
  }, []);

  const addToSlip = (bet, opt) => {
    setSlip((prev) => [
      ...prev,
      {
        betId: bet._id,
        betTitle: bet.title,
        optionId: opt.id,
        label: opt.label,
        odds: opt.odds,
        amount: 0,
      },
    ]);

    showToast("Adicionado ao bilhete!", "success");
  };

  return (
    <div className="bets-container">

      {/* LISTA DE APOSTAS */}
      <div className="bets-page fade-in">
        <h1 className="bets-title">Apostas Disponíveis 💔</h1>

        {bets.length === 0 && (
          <p className="empty">Nenhuma aposta disponível no momento.</p>
        )}

        <div className="bets-list">
          {bets.map((bet) => (
            <div key={bet._id} className="bet-card">
              <h2 className="category-title">{bet.title}</h2>

              <div className="bet-options">
                {bet.options.map((opt) => (
                  <div key={opt.id} className="option-item">
                    <div className="label">{opt.label}</div>

                    <button
                      className="odd-btn"
                      onClick={() => addToSlip(bet, opt)}
                    >
                      {opt.odds.toFixed(2)}
                    </button>
                  </div>
                ))}
              </div>

              <div className="footer">
                <p>Fecha em: <b>{new Date(bet.endsAt).toLocaleString()}</b></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SLIP */}
      <BetSlip slip={slip} setSlip={setSlip} />
    </div>
  );
}
