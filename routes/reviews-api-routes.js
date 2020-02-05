var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the reviews
  app.get("/api/reviews", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // 1. Add a join here to include all of the users to these reviews
    db.Review.findAll({
      include:{
        model:db.User
      }}).then(function(dbReview) {
      res.json(dbReview);
    });
  });

  // POST route for saving a new post
  app.post("/api/reviews", function(req,res) {
    // Write code here to create a new review and save it to the database
    var review = req.body;
    db.Review.create({
      review:review.review,
      score:review.score,
      title:review.title,
    })
      .then(function(dbReview) {
        res.json(dbReview);
      });
  });
};