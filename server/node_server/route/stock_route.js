import express from "express";
import {
  getStocks,
  getStockBySymbol,
  getStockById,
  createOrUpdateStock,
  getUserStockTransactions,
} from "../controller/stock_controller.js";

const router = express.Router();

router.get("/", getStocks);
router.get("/:symbol", getStockBySymbol);
router.get("/:id", getStockById);
router.post("/", createOrUpdateStock);
router.get("/transactions/:userId/:stockId", getUserStockTransactions);

export default router;
