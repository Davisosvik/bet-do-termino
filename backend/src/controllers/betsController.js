// backend/src/controllers/betsController.js

import Bet from "../models/Bet.js";
import User from "../models/User.js";
import Wager from "../models/Wager.js";

// ======================================================
// LISTAR TODAS AS APOSTAS ABERTAS
// ======================================================
export const listBets = async (req, res) => {
  try {
    const bets = await Bet.find({ status: "open" });
    return res.json({ bets });
  } catch (err) {
    console.error("Erro ao listar apostas:", err);
    return res.status(500).json({ message: "Erro interno ao listar apostas" });
  }
};

// ======================================================
// PEGAR DETALHES DE UMA APOSTA
// ======================================================
export const getBet = async (req, res) => {
  try {
    const bet = await Bet.findById(req.params.id);

    if (!bet)
      return res.status(404).json({ message: "Aposta não encontrada" });

    return res.json({ bet });
  } catch (err) {
    console.error("Erro ao obter aposta:", err);
    return res.status(500).json({ message: "Erro interno ao obter aposta" });
  }
};

// ======================================================
// CRIAR APOSTA (ADMIN)
// ======================================================
export const createBet = async (req, res) => {
  try {
    const { title, description, options, endsAt } = req.body;

    if (!title || !options || options.length < 2) {
      return res.status(400).json({ message: "Dados inválidos" });
    }

    const newBet = new Bet({
      title,
      description: description || "",
      options,
      endsAt,
      creator: req.userId,
    });

    await newBet.save();

    return res.status(201).json({
      success: true,
      bet: newBet,
    });
  } catch (err) {
    console.error("Erro ao criar aposta:", err);
    return res.status(500).json({ message: "Erro interno ao criar aposta" });
  }
};

// ======================================================
// REGISTRAR APOSTA DO USUÁRIO
// ======================================================
export const placeWager = async (req, res) => {
  try {
    const { betId } = req.params;
    const { optionId, amount } = req.body;
    const userId = req.userId;

    if (!amount || amount <= 0)
      return res.status(400).json({ message: "Valor inválido" });

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "Usuário não encontrado" });

    if (user.balance < amount)
      return res.status(402).json({ message: "Saldo insuficiente" });

    const bet = await Bet.findById(betId);
    if (!bet || bet.status !== "open")
      return res.status(400).json({ message: "Aposta fechada ou inexistente" });

    const option = bet.options.find((o) => o.id === optionId);
    if (!option)
      return res.status(400).json({ message: "Opção inválida" });

    // Desconta saldo
    user.balance -= amount;
    await user.save();

    // Grava aposta
    const wager = new Wager({ userId, betId, optionId, amount });
    await wager.save();

    // Atualiza pool
    option.pooledAmount += amount;
    bet.totalPool += amount;
    await bet.save();

    res.json({
      success: true,
      message: "Aposta registrada",
      newBalance: user.balance,
    });
  } catch (err) {
    console.error("Erro ao registrar aposta:", err);
    res.status(500).json({ message: "Erro interno" });
  }
};

// ======================================================
// RESOLVER APOSTA (ADMIN)
// ======================================================
export const resolveBet = async (req, res) => {
  try {
    const { betId } = req.params;
    const { winningOption } = req.body;

    const bet = await Bet.findById(betId);
    if (!bet)
      return res.status(404).json({ message: "Aposta não encontrada" });

    bet.status = "resolved";
    bet.resultOptionId = winningOption;
    await bet.save();

    return res.json({
      success: true,
      message: "Aposta resolvida",
      bet,
    });
  } catch (err) {
    console.error("Erro ao resolver aposta:", err);
    return res.status(500).json({ message: "Erro interno ao resolver aposta" });
  }
};
