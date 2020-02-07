var db = require("../models");
var normalize = require("../normalize");

async function getMovieId(title, year, t) {
  // Normalize the title using OMDB and get details if it is a new title
  const movie = await normalize(title, year);

  // See if the movie exists in our database the movie in our database
  const row = await db.Movie.findOne({ where: { title: movie.title } });

  let id;
  if (!row) {
    // Movie Not Found! Add a New Entry to Database and return the Movie ID
    const createResp = await db.Movie.create(movie, { transaction: t });
    id = createResp.id;
  } else {
    // Movie Found! Return ID
    id = row.dataValues.id;
  }
  return id;
}

// Routes

module.exports = function (app) {

  // GET route for getting all of the reviews
  app.get("/api/reviews", async function (req, res) {
    // 1. Add a join here to include all of the users to these reviews
    const dbReview = await db.Review.findAll({ include: db.User });
    res.json(dbReview);
  });

  // POST route for saving a new post
  app.post("/api/reviews", async function (req, res) {
    // Only allow authenticated users to post
    if (!req.user) {
      res.send(401);
    }

    // Make a transaction. Only commit movie if review adds
    try {
      await db.sequelize.transaction(async (t) => {

        // Get the Movie ID by finding it in the db or creating a new movie
        let id = await getMovieId(req.body.title, req.body.year, t);

        console.log("FINAL ID", id);

        // Create a new review in the database
        const result = await db.Review.create({
          review: req.body.review,
          score: req.body.score,
          MovieId: id,
          UserId: req.user.id
        }, { transaction: t });
        // Return the result
        res.json(result);
      });
    } catch (err) {
      console.log("ERROR CREATING REVIEW", err);
      res.json(err);
    }

  });
};