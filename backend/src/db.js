import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("MongoDB conectado com sucesso!");
    } catch (error) {
        console.error("Erro ao conectar no MongoDB:", error);
        process.exit(1);
    }
};
