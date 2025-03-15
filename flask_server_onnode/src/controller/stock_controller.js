const yahooFinance = require("yahoo-finance2");
const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");

// Fetch historical stock data
const fetchStockData = async (stockName, startDate) => {
  try {
    const data = await yahooFinance.historical(stockName, { period1: startDate });
    const tickerInfo = await yahooFinance.quoteSummary(stockName, { modules: ["assetProfile"] });

    const longName = tickerInfo?.assetProfile?.longBusinessSummary || "Unknown";
    return { data, longName };
  } catch (error) {
    console.error(`Error fetching stock data: ${error.message}`);
    return { data: null, longName: null };
  }
};

// Fetch live stock price
const fetchLivePrice = async (stockName) => {
  try {
    const tickerInfo = await yahooFinance.quote(stockName);
    const currentPrice = tickerInfo?.regularMarketPrice || null;
    const openPrice = tickerInfo?.regularMarketOpen || null;

    return { currentPrice, openPrice };
  } catch (error) {
    console.error(`Error fetching live stock price: ${error.message}`);
    return { currentPrice: null, openPrice: null };
  }
};

// Fetch all stock data from CSV file
const fetchAllStockData = async () => {
  const filePath = path.join(__dirname, "..", "datasets", "nse_stocks.csv");
  const stocks = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (row) => stocks.push({ Ticker: row.Ticker, Name: row.Name }))
      .on("end", () => {
        stocks.sort((a, b) => a.Ticker.localeCompare(b.Ticker));
        resolve(stocks);
      })
      .on("error", (error) => {
        console.error(`Error reading CSV: ${error.message}`);
        reject([]);
      });
  });
};

module.exports = {fetchAllStockData,fetchLivePrice,fetchStockData}