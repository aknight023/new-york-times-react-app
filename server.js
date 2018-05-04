// Dependecies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

// Set up a default port, configure mongoose, configure our middleware
const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Serve up static assets if in production (running on Heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
} else {
  app.use(express.static(__dirname + "/client/public"));
}

// Routing
var articlesController = require("./controllers/articleController");
var router = new express.Router();
// Define any API routes first
// Get saved articles
router.get("/api/saved", articlesController.find);
// Save articles
router.post("/api/saved", articlesController.insert);
// delete saved articles
router.delete("/api/saved/:id", articlesController.delete);
// Send every other request to the React app
router.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.use(router);

// Connect mongoose to our database
const db = process.env.MONGODB_URI || "mongodb://localhost/nyt-react";
mongoose.Promise = Promise;
mongoose.connect(db, function(error) {
  // Log any errors connecting with mongoose
  if (error) {
    console.error(error);
  }
  // Or log a success message
  else {
    console.log("mongoose connection is successful");
  }
});

// Start the server
app.listen(PORT, function() {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});

