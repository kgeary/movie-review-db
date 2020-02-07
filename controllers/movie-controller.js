var db = require("../models");
var axios = require("axios");
var normalize = require("../normalize");

module.exports = function (app) {
  app.get("/api/find/:movie", async function (req, res) {
    let url = "http://www.omdbapi.com/?apikey=" + process.env.OMDB_KEY + "&s=" + req.params.movie;
    const data = await axios.get(url);
    res.json(data.data.Search);
  });

  app.get("/api/movie/:movie", async function (req, res) {
    try {
      const movie = await normalize(req.params.movie);
      const row = await db.Movie.findOne({ where: { title: movie.title } });
      if (row) {
        res.json({ url: `/movie/${row.id}` });
      } else {
        res.json({ error: `${movie.title.replace("+", " ")} has no reviews` });
      }
    } catch (err) {
      console.log(err);
      res.json({ error: err });
    }

  });
};