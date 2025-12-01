// backend/src/routes/betsRoutes.js
import express from "express";
import {
  listBets,
  getBet,
  createBet,
  placeWager,
  resolveBet
} from "../controllers/betsController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js"; // ← CORRETO

const router = express.Router();

router.get("/", listBets); // lista todas
router.get("/:id", getBet); // detalhes
router.post("/", authMiddleware, createBet); // criar (admin)
router.post("/:betId/wager", authMiddleware, placeWager); // apostar
router.post("/:betId/resolve", authMiddleware, resolveBet); // resolver (admin)

export default router;
