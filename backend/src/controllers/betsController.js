// backend/src/controllers/betsController.js

import Bet from "../models/Bet.js";
import Wager from "../models/Wager.js";
import User from "../models/User.js";

// listar bets abertas
export const listBets = async (req, res) => {
  try {
    const bets = await Bet.find({ status: "open" }).sort({ createdAt: -1 }).limit(100);
    return res.json({ success: true, bets });
  } catch (err) {
    console.error("Erro listBets:", err);
    return res.status(500).json({ success: false, message: "Erro interno" });
  }
};

export const getBet = async (req, res) => {
  try {
    const { id } = req.params;
    const bet = await Bet.findById(id);
    if (!bet) return res.status(404).json({ success: false, message: "Bet não encontrada" });

    const wagers = await Wager.find({ betId: bet._id }).populate("userId", "username");

    return res.json({ success: true, bet, wagers });
  } catch (err) {
    console.error("Erro getBet:", err);
    return res.status(500).json({ success: false, message: "Erro interno" });
  }
};

// criar aposta (admin)
export const createBet = async (req, res) => {
  try {
    const { title, description, options, endsAt } = req.body;

    if (!title || !options || !Array.isArray(options) || !endsAt) {
      return res.status(400).json({ success: false, message: "Dados incompletos" });
    }

    const bet = new Bet({
      title,
      description,
      options: options.map(o => ({
        id: o.id,
        label: o.label,
        odds: o.odds,
        pooledAmount: 0
      })),
      endsAt,
      creator: req.userId || null
    });

    await bet.save();
    return res.status(201).json({ success: true, bet });
  } catch (err) {
    console.error("Erro createBet:", err);
    return res.status(500).json({ success: false, message: "Erro interno" });
  }
};

// apostar
export const placeWager = async (req, res) => {
  try {
    const { betId } = req.params;
    const { optionId, amount } = req.body;
    const userId = req.userId;

    if (!userId) return res.status(401).json({ success: false, message: "Não autorizado" });
    if (!amount || amount <= 0) return res.status(400).json({ success: false, message: "Valor inválido" });

    const bet = await Bet.findById(betId);
    if (!bet || bet.status !== "open")
      return res.status(400).json({ success: false, message: "Aposta fechada ou inexistente" });

    const option = bet.options.find(o => o.id === optionId);
    if (!option) return res.status(400).json({ success: false, message: "Opção inválida" });

    const wager = new Wager({ userId, betId, optionId, amount });
    await wager.save();

    option.pooledAmount = (option.pooledAmount || 0) + amount;
    bet.totalPool = (bet.totalPool || 0) + amount;

    await bet.save();

    return res.json({ success: true, message: "Aposta registrada", wager });
  } catch (err) {
    console.error("Erro placeWager:", err);
    return res.status(500).json({ success: false, message: "Erro interno" });
  }
};

// resolver aposta (admin)
export const resolveBet = async (req, res) => {
  try {
    const { betId } = req.params;
    const { winningOptionId } = req.body;

    const bet = await Bet.findById(betId);
    if (!bet) return res.status(404).json({ success: false, message: "Bet não encontrada" });

    if (bet.status === "resolved")
      return res.status(400).json({ success: false, message: "Aposta já resolvida" });

    bet.status = "resolved";
    bet.resultOptionId = winningOptionId;
    await bet.save();

    const houseFee = 0.05;
    const totalPool = bet.totalPool || 0;
    const poolAfterFee = totalPool * (1 - houseFee);

    const winners = await Wager.find({ betId, optionId: winningOptionId });
    const winnersTotal = winners.reduce((s, w) => s + w.amount, 0);

    if (winnersTotal > 0) {
      for (const w of winners) {
        const share = w.amount / winnersTotal;
        w.payout = share * poolAfterFee;
        await w.save();
      }
    }

    return res.json({ success: true, message: "Aposta resolvida", betId });
  } catch (err) {
    console.error("Erro resolveBet:", err);
    return res.status(500).json({ success: false, message: "Erro interno" });
  }
};
