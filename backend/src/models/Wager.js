// backend/src/models/Wager.js
import mongoose from "mongoose";

const wagerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  betId: { type: mongoose.Schema.Types.ObjectId, ref: "Bet", required: true },
  optionId: { type: String, required: true },
  amount: { type: Number, required: true },
  placedAt: { type: Date, default: () => new Date() },
  payout: { type: Number, default: 0 },
  settled: { type: Boolean, default: false }
});

export default mongoose.model("Wager", wagerSchema);
