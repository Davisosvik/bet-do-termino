// backend/src/routes/authRoutes.js

import express from "express";
import { registerUser, loginUser, getMe } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";  
import User from "../models/User.js";

const router = express.Router();

// Registro
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Rota protegida para pegar dados do usuário logado
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    return res.json({ user });
  } catch (err) {
    console.error("Erro em /me:", err);
    return res.status(500).json({ message: "Erro interno ao buscar usuário." });
  }
});

export default router;
