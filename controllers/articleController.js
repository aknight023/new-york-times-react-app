var Article = require("../models/Article");

module.exports = {
  // this method handles finding all articles in the db
  find: function(req, res) {
    Article.find().then(function(doc) {
      res.json(doc);
    }).catch(function(err) {
      res.json(err);
    });
  },
  // this method handles adding new articles to the db
  insert: function(req, res) {
    Article.create(req.body).then(function(doc) {
      res.json(doc);
      console.log("doc: ", doc);
    }).catch(function(err) {
      res.json(err);
    });
  },
  // this method handles deleting articles from the db
  delete: function(req, res) {
    Article.remove({
      _id: req.params.id
    }).then(function(doc) {
      res.json(doc);
      console.log("doc: ", doc);
    }).catch(function(err) {
      res.json(err);
    });
  }
};
