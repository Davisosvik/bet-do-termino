// backend/src/server.js
import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";

import authRoutes from "./routes/authRoutes.js";
import betsRoutes from "./routes/betsRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

try {
  await connectDB();
  console.log("🟢 Banco conectado com sucesso");
} catch (err) {
  console.error("❌ Erro ao conectar no banco:", err);
}

// rotas
app.use("/api/auth", authRoutes);
app.use("/api/bets", betsRoutes);

// rota de health
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// erro final
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server rodando na porta ${PORT}`);
});
