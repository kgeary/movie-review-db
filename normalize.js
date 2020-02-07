var axios = require("axios");

async function normalizeMovie(title) {
  const url = "http://www.omdbapi.com/?apikey=" + process.env.OMDB_KEY + "&t=" + title;
  const res = await axios.get(url);

  let obj = {};

  if (res.data.Response === "False") {
    console.log("Title not found at OMDB");
    obj.title = title.trim();
  } else {
    console.log("Title Found at OMDB -", res.data.Title);
    obj.title = res.data.Title;
    obj.rating = res.data.Rated;
    obj.img = res.data.Poster;
    try {
      obj.year = res.data.Year.slice(-4);
    } catch (err) {
      oby.year = null;
    }
  }
  return obj;
}

module.exports = normalizeMovie;