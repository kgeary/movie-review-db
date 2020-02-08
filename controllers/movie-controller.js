var db = require("../models");
var axios = require("axios");
var normalize = require("../normalize");

// Get the possible matches for the movie entered
module.exports = function (app) {

  // Return a list of matching movies for the user to pick from
  app.get("/api/find/:movie", async function (req, res) {
    let url = "http://www.omdbapi.com/?apikey=" + process.env.OMDB_KEY + "&s=" + req.params.movie;
    const data = await axios.get(url);
    res.json(data.data.Search);
  });
};