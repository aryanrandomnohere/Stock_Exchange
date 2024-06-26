import mongoose from "mongoose";

const StockSchema = new mongoose.Schema({
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
});

const Stock = mongoose.model("Stock", StockSchema);

export default Stock;
