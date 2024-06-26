import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  stock: { type: mongoose.Schema.Types.ObjectId, ref: "Stock", required: true },
  quantity: { type: Number, required: true },
  type: { type: String, enum: ["buy", "sell"], required: true },
  buy_price: { type: Number, required: true }, // New field for buy price
  sell_price: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;
