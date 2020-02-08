var axios = require("axios");

// Get the possible matches for the movie entered
module.exports = function (app) {

  // Return a list of matching movies for the user to pick from
  app.get("/api/find/:movie", async function (req, res) {
    let url = "http://www.omdbapi.com/?apikey=" + process.env.OMDB_KEY + "&s=" + req.params.movie;
    try {
      const data = await axios.get(url);
      if (data.data.Search) {
        res.json(data.data.Search);
      } else {
        res.json([]);
      }
    } catch (err) {
      console.log("Find Error", err);
    }
  });
};