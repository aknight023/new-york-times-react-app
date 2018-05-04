const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  author:  String,
  url: String,
  date: Date
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
