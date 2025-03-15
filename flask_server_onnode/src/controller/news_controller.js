const axios = require("axios");
const cheerio = require("cheerio");

// Fetch latest market news
const getNews = async (maxPages = 1) => {
  const allNewsItems = [];

  for (let pageNumber = 1; pageNumber <= maxPages; pageNumber++) {
    const url = `https://www.moneycontrol.com/news/business/markets/page-${pageNumber}`;

    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      $("li.clearfix").each((_, element) => {
        try {
          const title = $(element).find("a[title]").attr("title") || "No title";
          const date = $(element).find("span").text().trim() || "No date";
          const description = $(element).find("p").text().trim() || "No description";
          const link = $(element).find("a[href]").attr("href") || "No link";
          let imgLink = $(element).find("img[data-src]").attr("data-src") || $(element).find("img[src]").attr("src") || "No image";

          if (imgLink.startsWith("//")) imgLink = "https:" + imgLink;

          allNewsItems.push({
            title,
            description,
            date,
            source: "MoneyControl",
            url: link,
            image: imgLink,
          });
        } catch (error) {
          console.error(`Error parsing news item: ${error.message}`);
        }
      });
    } catch (error) {
      console.error(`Failed to retrieve data from page ${pageNumber}: ${error.message}`);
    }
  }

  return { newsItems: allNewsItems, statusCode: 200 };
};

// Fetch news by URL
const getNewsByUrl = async (url) => {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const title = $("h1.article_title.artTitle").text().trim() || null;
    const author = $("div.article_author a").text().trim() || null;
    const date = $("div.article_schedule span").text().trim() || null;
    const description = $("h2.article_desc").text().trim() || null;

    let fullDescription = "";
    $("div.content_wrapper.arti-flow p").each((_, element) => {
      fullDescription += $(element).text().trim() + " ";
    });

    let imgLink = $("img[data-src]").attr("data-src") || $("img[src]").attr("src") || null;
    if (imgLink && imgLink.startsWith("//")) imgLink = "https:" + imgLink;

    return {
      newsArticle: {
        title,
        author,
        date,
        description,
        full_description: fullDescription.trim(),
        image_url: imgLink,
      },
      statusCode: 200,
    };
  } catch (error) {
    return { error: "Failed to retrieve the article", statusCode: error.response?.status || 500 };
  }
};

// Export functions using CommonJS
module.exports = { getNews, getNewsByUrl };