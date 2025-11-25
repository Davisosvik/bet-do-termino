import express from "express";
import { listBets, getBet, placeWager, createBet, resolveBet } from "../controllers/betsController.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", listBets);           // lista todas (open)
router.get("/:id", getBet);          // detalhes
router.post("/", authMiddleware, createBet); // criar (admin)
router.post("/:betId/wager", authMiddleware, placeWager); // apostar
router.post("/:betId/resolve", authMiddleware, resolveBet); // resolver (admin)

export default router;
