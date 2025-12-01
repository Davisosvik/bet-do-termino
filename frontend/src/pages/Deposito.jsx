// src/pages/Deposito.jsx

import React, { useState } from "react";
import { showToast } from "../utils/toastManager";
import "../styles/Conta.css";
import { useNavigate } from "react-router-dom";

export default function Deposito() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");

  const handleDeposit = () => {
    if (!amount || amount <= 0) {
      showToast("Insira um valor válido!", "warning");
      return;
    }

    showToast("Depósito confirmado! (Simulação)", "success");

    setTimeout(() => navigate("/conta"), 1200);
  };

  return (
    <div className="conta-container">
      <h2>Adicionar Saldo</h2>

      <div className="conta-card">
        <p>Insira o valor que deseja adicionar:</p>

        <input
          type="number"
          placeholder="Valor (R$)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button className="conta-btn" onClick={handleDeposit}>
          Depositar
        </button>
      </div>
    </div>
  );
}
