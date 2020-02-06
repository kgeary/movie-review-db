var db = require("../models");
var axios = require("axios");

async function addNewMovie(title) {
  axios.get(query + title).then((data) => {
    db.Movie.create({
      title: data.Title,
      rating: data.Rating,
      img: data.Poster,
      year: data.Year,
    }).then((rec) => { return rec.id });
  });
}

async function findMovieId(title, user) {
  db.Movie.findOne({ where: { title: title } })
    .then(async (rows) => {
      var movieId;
      if (rows.length < 1) {
        // NEW MOVIE
        movieId = await addNewMovie(title)
      } else {
        movieId = rows[0].id;
      }
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
  app.post("/api/reviews", async function (req, res) {
    // Write code here to create a new review and save it to the database
    let id = await findMovieId(req.body.title, req.user);

    var review = req.body;

  });
};