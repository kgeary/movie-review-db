var db = require("../models");

function FindMovieID(title, user) {
  db.Movie.findOne({ where: { title: title } })
    .then(rows => {
      var movieId;
      if (rows.length < 1) {
        // NEW MOVIE
        movieId = await addNewMovie(title)
      } else {
        movieId = rows[0].id;
      }
    });
}

async function addNewMovie(title) {
  // queryombd
  axios.get(query + title).then((data) => {
    db.Movie.create({
      title: data.Title,
      rating: data.Rating,
      img: data.Poster;
      year: data.Year;
    }).then((rec) => { return rec.id });
  });
}


// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the reviews
  app.get("/api/reviews", function (req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // 1. Add a join here to include all of the users to these reviews
    db.Review.findAll({
      include: {
        model: db.User
      }
    }).then(function (dbReview) {
      res.json(dbReview);
    });
  });

  // POST route for saving a new post
  app.post("/api/reviews", function (req, res) {
    // Write code here to create a new review and save it to the database
    var review = req.body;
    db.Review.create({
      review: review.review,
      score: review.score,
      title: review.title,
    })
      .then(function (dbReview) {
        res.json(dbReview);
      });
  });
};