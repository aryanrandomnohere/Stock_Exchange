import User from "../model/user_model.js";
import Stock from "../model/stock_model.js";
import Transaction from "../model/transaction_model.js";

export const createTransaction = async (req, res) => {
  const { userId, stockId } = req.params;
  const { quantity, type } = req.body;

  if (quantity <= 0) {
    return res.status(400).json({ message: "Quantity must be a positive number" });
  }

  try {
    const user = await User.findById(userId).populate("stocks.stock");
    const stock = await Stock.findById(stockId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    let totalCost = stock.price * quantity;
    let buyPrice = 0;
    let sellPrice = 0;

    if (type === "buy") {
      if (user.wallet < totalCost) {
        return res.status(400).json({ message: "Insufficient funds" });
      }
      user.wallet -= totalCost;
      const userStock = user.stocks.find((s) => s.stock._id.equals(stockId));
      buyPrice = stock.price;
      sellPrice = stock.price;
      if (userStock) {
        userStock.quantity = Number(userStock.quantity) + Number(quantity);
        userStock.buy_price = stock.price;
        userStock.sell_price = stock.price;
      } else {
        user.stocks.push({
          stock: stockId,
          quantity: Number(quantity),
          buy_price: stock.price,
          sell_price: stock.price,
        });
      }
    } else if (type === "sell") {
      const userStock = user.stocks.find((s) => s.stock._id.equals(stockId));
      if (!userStock || userStock.quantity < quantity) {
        return res.status(400).json({ message: "Not enough stock to sell" });
      }
      user.wallet += stock.price * quantity;  // Using the current stock price (sell price) for wallet update
      buyPrice = userStock.buy_price;
      sellPrice = stock.price;
      userStock.quantity = Number(userStock.quantity) - Number(quantity);
      if (userStock.quantity === 0) {
        user.stocks = user.stocks.filter((s) => !s.stock._id.equals(stockId));
      }
    } else {
      return res.status(400).json({ message: "Invalid transaction type" });
    }

    for (let userStock of user.stocks) {
      if (!Number.isFinite(userStock.quantity) || userStock.quantity < 0) {
        return res.status(400).json({ message: "Invalid stock quantity" });
      }
    }

    const transaction = new Transaction({
      user: userId,
      stock: stockId,
      quantity: Number(quantity),
      type,
      buy_price: buyPrice,
      sell_price: sellPrice,
    });

    const savedTransaction = await transaction.save();
    user.transactions.push(savedTransaction._id);
    await user.save();

    res.status(201).json({
      message: "Transaction successful",
      transaction: savedTransaction,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};




export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("user")
      .populate("stock");
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};





export const getTransactionsByUserId = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.params.userId })
      .populate("user")
      .populate("stock");
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
