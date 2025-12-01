import React, { useEffect, useState } from "react";
import api from "../api/api";
import showToast from "../utils/showToast";
import "../styles/Conta.css";

export default function Conta() {
  const [user, setUser] = useState(null);
  const [saldo, setSaldo] = useState(0);

  // Buscar dados da conta
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(res.data.user);
        setSaldo(125.40); // TEMPORÁRIO — vamos integrar depois
      } catch (err) {
        showToast("Erro ao carregar dados da conta", "error");
      }
    };

    fetchUser();
  }, []);

  if (!user) return <p className="loading">Carregando...</p>;

  return (
    <div className="conta-page fade-in">

      {/* ================= SALDO ================= */}
      <div className="saldo-card">
        <p className="saldo-label">Saldo disponível</p>
        <h1 className="saldo-valor">R$ setSaldo(res.data.user.balance);
</h1>

        <button className="btn-depositar">Depositar</button>
      </div>

      {/* ================= USUÁRIO ================= */}
      <div className="user-card">
        <h2>Seus dados</h2>

        <div className="linha-info">
          <span className="info-titulo">Usuário:</span>
          <span className="info-texto">{user.username}</span>
        </div>

        <div className="linha-info">
          <span className="info-titulo">Email:</span>
          <span className="info-texto">{user.email}</span>
        </div>

        <div className="linha-info">
          <span className="info-titulo">ID:</span>
          <span className="info-texto id">{user.id}</span>
        </div>
      </div>

      {/* ================= AÇÕES ================= */}
      <div className="acoes-card">
        <button className="acao-btn">Histórico de apostas</button>
        <button className="acao-btn">Adicionar saldo</button>
        <button className="acao-btn sair" onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}>Sair</button>
      </div>
    </div>
  );
}
