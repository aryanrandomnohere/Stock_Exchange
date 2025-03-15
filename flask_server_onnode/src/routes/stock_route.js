const express = require("express");
const yahooFinance = require("yahoo-finance2").default;  
const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");
const { log } = require("console");
const router = express.Router();

// Function to calculate the start date based on the range
const calculateStartDate = (range) => {
  const endDate = new Date();
  let startDate;

  switch (range) {
    case "1w":
      startDate = new Date(endDate - 7 * 24 * 60 * 60 * 1000);
      break;
    case "1m":
      startDate = new Date(endDate - 30 * 24 * 60 * 60 * 1000);
      break;
    case "3m":
      startDate = new Date(endDate - 91 * 24 * 60 * 60 * 1000);
      break;
    case "6m":
      startDate = new Date(endDate - 182 * 24 * 60 * 60 * 1000);
      break;
    case "1y":
      startDate = new Date(endDate - 365 * 24 * 60 * 60 * 1000);
      break;
    case "5y":
      startDate = new Date(endDate - 5 * 365 * 24 * 60 * 60 * 1000);
      break;
    default:
      startDate = new Date("2000-01-01");
  }

  return startDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
};

// Fetch stock data
router.get("/stock/:stockName", async (req, res) => {
  const { stockName } = req.params;
  const range = req.query.range || "1m"; // Default to 1 month
  const startDate = calculateStartDate(range);

  try {
    const data = await yahooFinance.historical(stockName, { period1: startDate });
    const tickerInfo = await yahooFinance.quoteSummary(stockName, { modules: ["assetProfile"] });
    const longName = tickerInfo?.assetProfile?.longBusinessSummary || "Unknown";

    res.json({ data, longName });
  } catch (error) {
    console.error("Error fetching stock data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Fetch live stock price
router.get("/stock/liveprice/:stockName", async (req, res) => {
  const { stockName } = req.params;

  try {
    const tickerInfo = await yahooFinance.quote(stockName);
    log(tickerInfo)
    const currentPrice = tickerInfo?.regularMarketPrice || null;
    const openPrice = tickerInfo?.regularMarketOpen || null;

    if (currentPrice !== null) {
      res.json({ current_price: currentPrice, open_price: openPrice });
    } else {
      res.status(500).json({ error: "Failed to fetch data" });
    }
  } catch (error) {
    console.error("Error fetching live stock price:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// Fetch all stock symbols from CSV
router.get("/symbol", (req, res) => {
  const filePath = path.join(__dirname, "..", "datasets", "nse_stocks.csv");
  const stocks = [];

  const fs = require("fs");
const csvParser = require("csv-parser");


fs.createReadStream(filePath)
  .pipe(csvParser())
  .on("data", (row) => {
    // Log all keys in the row to check for inconsistencies
    console.log("Row keys:", Object.keys(row)); // Log the column names to inspect

    // Clean up the keys by trimming spaces, removing newlines, and quotes
    const cleanedRow = {};
    for (const key in row) {
      const cleanedKey = key.replace(/[\n" ]+/g, ""); // Remove newlines, quotes, and spaces
      cleanedRow[cleanedKey] = row[key];
    }

    // Log the cleaned row for further inspection
    console.log("Cleaned Row:", cleanedRow);
    
    // Assuming 'SYMBOL' and 'NAME' are the columns
    // Map 'SYMBOL' to 'Ticker' and 'NAME' to 'Name'
    stocks.push({
      Ticker: cleanedRow["Scrip"], // Adjusted key name after cleaning
      Name: cleanedRow["CompanyName"] // Adjusted key name after cleaning (if there's a column for Name)
    });
  })
  .on("end", () => {
    console.log("Final stocks array:", stocks); // Log the final array
    res.json(stocks); // Send the final array in the response
  })
  .on("error", (error) => {
    console.error("Error reading CSV:", error);
    res.status(500).json({ error: "Failed to fetch stock symbols" });
  });
});

module.exports = router;