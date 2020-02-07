// Requiring path to so we can use relative routes to our HTML files
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
const defaultOrder = [["updatedAt", "DESC"]];

module.exports = function (app) {

  app.get("/", function (req, res) {
    // Return the 10 most recent reviews
    db.Review.findAll({
      include: [db.User, db.Movie], order: defaultOrder, limit: 25
    }).then(function (myReviews) {
      res.render("index", { title: "Most Recent Reviews", user: req.user, reviews: myReviews });
    });
  });

  // Redirect to /
  app.get("/index", function (req, res) {
    res.redirect("/");
  });

  app.get("/user/:id?", function (req, res) {

    if (!req.params.id && !req.user) {
      res.redirect("/login");
    } else {
      // Set the id to the id passed in the url or if none use the user id
      let id = req.params.id || req.user.id;

      // Find all reviews for the specified user order by most recent first
      db.Review.findAll({
        where: { UserId: id },
        order: defaultOrder,
        include: [db.User, db.Movie]
      }).then(function (dbReview) {
        console.log(dbReview);
        res.render("index", { title: "Reviews BY User", user: req.user, reviews: dbReview });
      });
    }

  });

  app.get("/movie", function (req, res) {
    db.Movie.findAll({ include: db.Review, order: defaultOrder }).then((data) => {
      res.render("movie", { user: req.user, movies: data });
    });
  });

  // Get all reviews for a specific movie ID
  app.get("/movie/:id", function (req, res) {
    db.Review.findAll({
      where: {
        MovieId: req.params.id
      },
      include: [db.User, db.Movie]
    }).then(function (dbReview) {
      console.log(dbReview);
      res.render("index", { title: "Reviews by Movie", user: req.user, reviews: dbReview });
    });

  });

  // Add A review to the database
  app.get("/review/add", isAuthenticated, function (req, res) {
    res.render("addReview", { user: req.user });
  });

  // Route to the Login Page
  app.get("/login", function (req, res) {
    // If the user already has an account send them to the home page
    if (req.user) {
      res.redirect("/");
    } else {
      res.render("login", { user: null });
    }
  });

  // Route for Signing up a new user
  app.get("/signup", function (req, res) {
    res.render("signup", { user: null });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
};
