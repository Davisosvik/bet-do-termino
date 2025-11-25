import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
  odds: { type: Number, required: true },
  pooledAmount: { type: Number, default: 0 }
});

const betSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  options: [optionSchema],
  startsAt: { type: Date, default: () => new Date() },
  endsAt: { type: Date, required: true },
  status: { type: String, enum: ["open","closed","resolved"], default: "open" },
  resultOptionId: { type: String, default: null },
  totalPool: { type: Number, default: 0 },
  createdAt: { type: Date, default: () => new Date() }
});

export default mongoose.model("Bet", betSchema);
