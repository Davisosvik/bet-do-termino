// src/pages/Login.jsx
import React, { useState } from "react";
import { login } from "../api/api";

export default function Login({ onNavigate, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const result = await login(email, password);

    if (result.success) {
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      setMsg("Login realizado com sucesso!");
      onLogin(result.user);
    } else {
      setMsg(result.message);
    }
    setLoading(false);
  }

  return (
    <div className="container auth">
      <h1>🎲 Bet do Término</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Seu Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Sua Senha" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit" className="btn-primary" disabled={loading}>{loading ? "Entrando..." : "Entrar"}</button>
      </form>
      <p>Não tem conta? <span onClick={() => onNavigate("register")}>Registrar</span></p>
      {msg && <p className="info">{msg}</p>}
    </div>
  );
}
