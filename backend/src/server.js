import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

// 🟢 PERMITIR RECEBER JSON
app.use(express.json());

// 🟢 PERMITIR REQUISIÇÕES DO FRONT
app.use(cors());

// 🟢 ROTAS
app.use('/auth', authRoutes);

// 🟢 CONEXÃO COM O BANCO
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado!"))
  .catch(err => console.log("Erro ao conectar no MongoDB:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

import betsRoutes from "./routes/betsRoutes.js";
app.use("/api/bets", betsRoutes);
