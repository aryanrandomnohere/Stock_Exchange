import Stock from '../model/stock_model.js';
import Transaction from '../model/transaction_model.js';

export const getStocks = async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getStockBySymbol = async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.symbol);
        if (stock == null) {
            return res.status(404).json({ message: 'Stock not found' });
        }
        res.json(stock);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getStockById = async (req, res) => {
    try {
        const stock = await Stock.findById(req.params.id);
        if (stock == null) {
            return res.status(404).json({ message: 'Stock not found' });
        }
        res.json(stock);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getUserStockTransactions = async (req, res) => {
    const { userId, stockId } = req.params;

    try {
        const transactions = await Transaction.find({ userId, stockId });
        if (!transactions.length) {
            return res.status(404).json({ message: 'No transactions found for this user and stock' });
        }
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createOrUpdateStock = async (req, res) => {
  const { name, symbol, price } = req.body;

  try {
    let stock = await Stock.findOne({ symbol });

    if (stock) {
      stock.price = price;
      await stock.save();
      res.status(200).json({ message: 'Stock price updated', stock });
    } else {
      stock = new Stock({
        name,
        symbol,
        price
      });
      const newStock = await stock.save();
      res.status(201).json({ message: 'Stock created', stock: newStock });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

