const express = require("express");
const cors = require("cors");
const stockRoute = require("./routes/stock_route.js");
const newsRoute = require("./routes/news_route.js");
const { handleError } = require("./middleware.js");

const app = express();
app.use(cors());

app.use("/stocks", stockRoute);
app.use("/news", newsRoute);

app.use((err, req, res, next) => {
  handleError(err, res);
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});