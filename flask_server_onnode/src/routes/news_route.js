const express = require("express");
const { getNews, getNewsByUrl } = require("../controller/news_controller");

const router = express.Router();

router.get("/news", async (req, res, next) => {
  try {
    const { newsTitles, statusCode } = await getNews();
    res.status(statusCode).json(newsTitles);
  } catch (error) {
    next(error);
  }
});

router.get("/news/:url", async (req, res, next) => {
  try {
    const { newsArticle, statusCode } = await getNewsByUrl(req.params.url);
    res.status(statusCode).json(newsArticle);
  } catch (error) {
    next(error);
  }
});

module.exports = router;