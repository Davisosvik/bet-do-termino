// backend/src/db.js
import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

export const connectDB = async () => {
  if (!MONGO_URI) {
    console.error("❌ MONGO_URI não definido. Defina MONGO_URI no seu .env (não comite este arquivo).");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB conectado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error.message || error);
    // instrução útil se for ENOTFOUND
    if (error.message && error.message.includes("ENOTFOUND")) {
      console.error("→ Erro DNS: verifique host / string de conexão do MONGO_URI.");
    }
    process.exit(1);
  }
};
