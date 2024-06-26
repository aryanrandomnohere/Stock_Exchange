import express from "express";
import {
  createTransaction,
  getTransactions,
  getTransactionsByUserId,
} from "../controller/transaction_controller.js";

const router = express.Router();

router.post("/:userId/:stockId", createTransaction);
router.get("/", getTransactions);
router.get("/user/:userId", getTransactionsByUserId);

// Add more transaction routes here if needed

export default router;
