var db = require("../models");

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    // 1. Add a join to include all of each User's Reviews
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });


  app.post("/api/users", function(req, res) {
    db.Author.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });


};