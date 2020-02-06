var db = require("../models");
async function FindMovieID(title, user) {
	db.Movie.findOne({ where: {title: title}})
	.then((rows) => {
    var movieId;
		if (rows.length < 1) {
			// NEW MOVIE
			movieId= await addNewMovie(title)
		} else {
			movieId= rows[0].id;
		}
return movieId;
	});

}

async function addNewMovie(title) {
  // queryombd
  axios.get("http://www.omdbapi.com/?apikey=" + process.env.OMDB_KEY + "&t=" + title).then(function (omdbData) {

		db.Movie.create({
			title: omdbData.Title,
			rating: omdbData.Rating,
			img: omdbData.Poster,
			year: omdbData.Year,
		}).then( (rec) => {return rec.id});
	});
}

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

  // POST route for saving a new review
  app.post("/api/reviews", function(req,res) {

 // Write code here to create a new review and save it to the database
    var review = req.body;
    db.Movie.findOne({
      where: {
        title: review.title,
      }
    }).then (function(dbMovie){


})
    });

    db.Review.create({
      title:review.title,
      score:review.score,
      review:review.review,
    })
      .then(function(dbReview) {
        res.json(dbReview);
      });
  };
