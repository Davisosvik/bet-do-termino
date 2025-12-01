import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import showToast from "../utils/showToast";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });

      // SALVAR TOKEN
      localStorage.setItem("token", res.data.token);

      // SALVAR DADOS DO USUÁRIO
      localStorage.setItem("balance", res.data.user.balance);
      localStorage.setItem("username", res.data.user.username);
      localStorage.setItem("email", res.data.user.email);

      showToast("Login realizado com sucesso!", "success");

      // REDIRECIONA
      setTimeout(() => navigate("/"), 700);
    } catch (err) {
      showToast("Email ou senha incorretos.", "error");
    }
  };

  return (
    <div className="auth-wrapper fade-in">
      <div className="auth-box">
        <h1>Entrar</h1>
        <p className="subtitle">Bem-vindo ao Alef & Larissa BET 💔</p>

        <form onSubmit={login}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Senha</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-btn" type="submit">
            Entrar
          </button>
        </form>

        <p className="switch-auth">
          Ainda não tem conta? <Link to="/register">Registrar</Link>
        </p>
      </div>
    </div>
  );
}
