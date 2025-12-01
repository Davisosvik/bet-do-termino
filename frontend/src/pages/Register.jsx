import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import showToast from "../utils/showToast";
import "../styles/auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", { username, email, password });
      showToast("Conta criada com sucesso!", "success");

      setTimeout(() => navigate("/login"), 700);
    } catch (err) {
      showToast("Erro ao registrar. Email ou nome já existem.", "error");
    }
  };

  return (
    <div className="auth-wrapper fade-in">
      <div className="auth-box">
        <h1>Criar Conta</h1>
        <p className="subtitle">Comece a apostar no destino do casal 💔</p>

        <form onSubmit={register}>
          <label>Nome de Usuário</label>
          <input
            type="text"
            placeholder="Seu nome de usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Senha</label>
          <input
            type="password"
            placeholder="Crie sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-btn" type="submit">
            Registrar
          </button>
        </form>

        <p className="switch-auth">
          Já tem conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </div>
  );
}
