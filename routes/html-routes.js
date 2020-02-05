// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get(["/", "/index"], function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    //res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("index", { msg: "Hi there!", user: req.user });
  });

  app.get("/members", function (req, res) {
    res.render("members", { msg: "WHO DAT", user: req.user });
  });

  app.get("/login", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/index");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });
};
