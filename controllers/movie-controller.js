var db = require("../models");
var normalize = require("../normalize");

module.exports = function (app) {
  app.get("/api/movie/:movie/:year?", async function (req, res) {
    try {
      const movie = await normalize(req.params.movie, req.params.year);
      const row = await db.Movie.findOne({ where: { title: movie.title, year: movie.year } });
      if (row) {
        res.json({ url: `/movie/${row.id}` });
      } else {
        res.json({ error: `${movie.title} has no reviews` });
      }
    } catch (err) {
      console.log(err);
    }

  });
};