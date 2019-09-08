const request = require("request");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

var newsUrl =
  "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=7e1efe0b0ce1406387a2dded38e1f675";

function requestNews(req, res) {
  request(newsUrl, function(err, resp, body) {
    if (err) throw err;
    let payload = JSON.parse(body);
    let topNews = payload.articles;
    const newsObj = topNews.map(news => {
      return {
        title: news.title,
        desc: news.description,
        imgUrl: news.urlToImage,
        url: news.url
      };
    });
    res.render("index", { newsObj: newsObj });
  });
}

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", requestNews);

app.listen(PORT, () => console.log("Sever is running at port 3000....."));
