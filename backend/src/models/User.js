import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // SALDO REAL DO USUÁRIO
    balance: { type: Number, default: 100.00 }, // saldo inicial
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
