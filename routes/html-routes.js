// Requiring path to so we can use relative routes to our HTML files
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
//var isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    db.Review.findAll({
      include: [db.User, db.Movie], order: [["updatedAt", "ASC"]], limit: 10
    }).then(function (myReviews) {
      res.render("index", { title: "Most Recent Reviews", user: req.user, reviews: myReviews, img: "" });
    });
  });

  app.get("/members", function (req, res) {
    res.render("members", { msg: "WHATS UP", user: req.user });
  });

  app.get("/index", function (req, res) {
    res.redirect("/");
  });

  app.get("/user/:id?", function (req, res) {
    if (req.params.id) {
      res.render("members", { msg: "WHO DAT", user: req.user });
    }
    res.render("members", { msg: "WHO DAT", user: req.user });
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/index");
    } else {
      res.render("login", { user: null });
    }
  });

  app.get("/signup", function (req, res) {
    res.render("signup", { user: null });
  });

  app.get("/movie", function (req, res) {
    res.send(404); // TODO
  });
  app.get("/user/:id", function (req, res) {
    res.send(404); // TODO
  });

  app.get("/movie/:id", function (req, res) {
    res.send(404); // TODO
  });

  app.get("/review/add", function (req, res) {
    res.render("addReview", { user: req.user });
  });

  app.post("/review/add", function (req, res) {
    // TODO
    res.send(404);
  });

  app.get("/review", function (req, res) {
    res.send(404); // TODO
  });

  app.get("/review/:id", function (req, res) {
    res.send(404); // TODO
  });

  app.get("/logout", function (req, res) {
    req.logOut();
    res.redirect("/");
  });
};
