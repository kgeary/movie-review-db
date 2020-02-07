$(document).ready(function () {
  console.log("INDEX JS ACTIVE");
  var $movie = $("#movieSearch");
  var $btn = $("#submitSearch");

  $btn.on("click", function (event) {
    event.preventDefault();
    var movieTitle = escape($movie.val().trim().replace(" ", "+"));
    $.get("/api/movie/" + movieTitle)
      .then((data) => {
        if (data.url) {
          window.location.replace(data.url);
        } else {
          // TODO - Display an error message -  Not Found
        }
      }).catch(err => {
        console.log(err);
      });
  });
});