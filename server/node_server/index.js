import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./route/user_route.js";
import stockRouter from "./route/stock_route.js";
import authRouter from "./route/auth_route.js";
import transactionRouter from "./route/transaction_route.js";

dotenv.config();
const app = express();

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(cors());
app.use(express.json());

app.use("/users", userRouter);
app.use("/stocks", stockRouter);
app.use("/transaction", transactionRouter);
app.use("/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
