import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profilePicture: {
    type: String,
    default:
      "https://cdn-icons-png.freepik.com/512/64/64572.png",
  },
  wallet: { type: Number, default: 1000000 },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
  stocks: [
    {
      stock: { type: mongoose.Schema.Types.ObjectId, ref: "Stock", required: true },
      quantity: { type: Number, required: true },
      buy_price: { type: Number, required: true },
      sell_price: { type: Number, required: true }
    },
  ],
});

const User = mongoose.model("User", UserSchema);

export default User;
