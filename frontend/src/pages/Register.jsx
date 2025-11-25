// src/pages/Register.jsx
import React, { useState } from "react";
import { register } from "../api/api";

export default function Register({ onNavigate }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await register({ username: name, email, password });
    if (result.success) {
      setMsg("Conta criada com sucesso! Redirecionando...");
      setTimeout(() => onNavigate("login"), 1300);
    } else {
      setMsg(result.message);
    }
  }

  return (
    <div className="container auth">
      <h1>📝 Criar Conta</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome de usuário" value={name} onChange={e=>setName(e.target.value)} required />
        <input type="email" placeholder="Seu Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Crie uma Senha" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit" className="btn-primary">Registrar</button>
      </form>
      <p>Já tem conta? <span onClick={() => onNavigate("login")}>Entrar</span></p>
      {msg && <p className="info">{msg}</p>}
    </div>
  );
}
