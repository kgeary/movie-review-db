$(document).ready(function () {
  console.log("INDEX JS ACTIVE");
  var $movie = $("#movieSearch");
  var $btn = $("#submitSearch");

  $btn.on("click", function (event) {
    $("#searchAlert .msg").text("");
    $("#searchAlert").hide();

    event.preventDefault();
    var movieTitle = escape($movie.val().trim().replace(" ", "+"));
    $.get("/api/movie/" + movieTitle)
      .then((data) => {
        if (data.url) {
          window.location.replace(data.url);
        } else {
          // TODO - Display an error message -  Not Found
          $("#searchAlert .msg").text(data.error);
          $("#searchAlert").fadeIn(500);
        }
      }).catch(err => {
        console.log("INDEXJS ERR", err);
        $("#searchAlert .msg").text(err.statusText);
        $("#searchAlert").fadeIn(500);
      });
  });
});