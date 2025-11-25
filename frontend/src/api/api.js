// ==============================
// src/api/api.js
// ==============================

import axios from "axios";

// Criando instância do axios
const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// ==============================
// REGISTRO
// ==============================
export async function register({ username, email, password }) {
  try {
    const response = await api.post("/auth/register", {
      username,
      email,
      password,
    });

    return {
      success: true,
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Erro ao registrar sua conta.",
    };
  }
}

// ==============================
// LOGIN
// ==============================
export async function login(email, password) {
  try {
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    // salva token
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return {
      success: true,
      user: response.data.user,
      token: response.data.token,
      message: response.data.message,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Erro ao realizar login.",
    };
  }
}

export default api;

// ==============================
// BETS - PÚBLICAS
// ==============================
export async function getBets() {
  try {
    const response = await api.get("/api/bets");
    return { success: true, bets: response.data.bets || response.data };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Erro ao buscar bets.",
    };
  }
}

export async function getBet(id) {
  try {
    const response = await api.get(`/api/bets/${id}`);
    return { success: true, bet: response.data.bet };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Erro ao buscar bet.",
    };
  }
}

// ==============================
// FAZER APOSTA
// ==============================
export async function placeWager(betId, { optionId, amount }) {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      `/api/bets/${betId}/wager`,
      { optionId, amount },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );

    return { success: true, wager: response.data.wager || response.data };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Erro ao fazer aposta.",
    };
  }
}

// ==============================
// CRIAR BET
// ==============================
export async function createBet({ title, description, options, endsAt }) {
  try {
    const token = localStorage.getItem("token");

    const response = await api.post(
      `/api/bets`,
      { title, description, options, endsAt },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );

    return { success: true, bet: response.data.bet || response.data };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Erro ao criar aposta.",
    };
  }
}
