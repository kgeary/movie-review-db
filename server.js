// Requiring necessary npm packages
require("dotenv").config();
var express = require("express");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();

// Handle url encoded requests and json, serve static files from public
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "baby yoda", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Set the view engine to ejs
app.set("view engine", "ejs");

// Requiring our routes
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
var forceSync = false;

db.sequelize.sync({ force: forceSync }).then(function () {
  app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}. Visit http://localhost:${PORT}`);
  });
});
