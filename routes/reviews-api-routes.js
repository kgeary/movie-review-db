var db = require("../models");
var axios = require("axios");

async function addNewMovie(title) {
  console.log("DEBUG ADD NEW MOVIE", title);
  return await axios.get("http://www.omdbapi.com/?apikey=" + process.env.OMDB_KEY + "&t=" + title)
    .then(function (res) {

      var obj = {};
      if (res.data.Response === 'False') {
        console.log("DATA NOT FOUND");
        obj.title = title;
        obj.rating = "?";
        obj.img = "";
        obj.year = 1999;
      } else {
        console.log("DATA FOUND");
        console.log(res.data);

        obj = {
          title: res.data.Title,
          rating: res.data.Rated,
          img: res.data.Poster,
          year: res.data.Year.slice(-4)
        };
      }
      return db.Movie.create(obj);
    }).then((rec) => {
      console.log("MOVIE CREATE RES", rec);
      return rec.id
    });
}

async function findMovieId(title, user) {
  return await db.Movie.findOne({ where: { title: title } })
    .then(async (row) => {
      console.log("DEBUG ROW", row);
      var movieId;
      if (!row) {
        // NEW MOVIE
        return await addNewMovie(title);
      } else {
        return row.dataValues.id;
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
    console.log("DEBUG POST RX");
    // Write code here to create a new review and save it to the database
    let id = await findMovieId(req.body.title, req.user);

    console.log("FINAL ID", id);

    db.Review.create({
      review: req.body.review,
      score: req.body.score,
      MovieId: id,
      UserId: req.user.id
    }).then(res => {

    });

    var review = req.body;

  });
};