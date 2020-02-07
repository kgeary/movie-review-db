$(document).ready(function () {
  console.log("IN ADD REVIEW JS");

  // Clear Movie
  $("#clearMovie").on("click", function (event) {
    event.preventDefault();
    $("#mainForm").hide();
    $("#review").val("");
    $("#score").val("");
    $("#title").val("").attr("readonly", "false");
    $("#clearMovie").hide();
    $("#findMovie").show();
  });

  // Find Movie
  $("#findMovie").on("click", function (event) {
    event.preventDefault();

    // Hide the movie list and empty out old data
    $("#movieList").hide().empty();

    // Get the Movie Title
    var title = $("#title").val().trim().replace(" ", "+");

    if (title.length < 1) {
      return;
    }

    // Create a list of possible movies to select for the user
    $.get(`/api/find/${title}`).then(function (movies) {
      console.log("Movies", movies);
      movies.forEach((movie) => {
        var movieTitle = movie.Title;
        var movieYear = movie.Year;
        var movieImdb = movie.imdbID;
        var div = $(`<div class="movie-choice" data-id="${movieImdb}" data-title="${movieTitle}">`);
        var p = $(`<p class="subtitle">`).text(movieTitle + " (" + movieYear + ")");
        div.append(p);
        $("#movieList").append(div);
      });
      $("#movieList").show();
    });
  });

  // When a movie choice is selected
  $("#movieList").on("click", ".movie-choice", function () {
    console.log("CLICK DETECCTED");
    var imdb = $(this).data("id");
    var title = $(this).data("title");
    $("#movieList").hide().empty();
    $("#title").val(title).attr("data-id", imdb);
    $("#title").attr("readonly", true);
    $("#findMovie").hide();
    $("#clearMovie").show();
    $("#mainForm").show();
  });

  // Add Review Button Click Event
  $("#add-review").on("click", function (event) {
    event.preventDefault();
    $("#alert .msg").text("");
    $("#alert").hide();
    var newReview = {
      imdb: $("#title").attr("data-id"),
      title: $("#title").val().trim(),
      score: $("#score").val().trim(),
      review: $("#review").val().trim(),
    };

    if (newReview.title.length < 1) {
      $("#alert .msg").text("Invalid Movie Name!");
      $("#alert").fadeIn(500);
      return;
    }
    if (newReview.review.length < 1) {
      $("#alert .msg").text("Empty Reviews Not Allowed!");
      $("#alert").fadeIn(500);
      return;
    }
    if (Number.isNaN(newReview.score) || newReview.score > 10 || newReview.score < 0) {
      $("#alert .msg").text("Invalid Score! Must be a number");
      $("#alert").fadeIn(500);
      return;
    }

    // Post A New Review to Server
    $.post("/api/reviews", newReview)
      // on success, run this callback
      .then(function (res) {
        console.log("JSON RES", res);
        if (res.errors && res.errors.length > 0) {
          $("#alert .msg").text(res.errors.map(i => i.message).join("\n"));
          $("#alert").fadeIn(500);
        } else {
          // log the data we found
          // empty each input box by replacing the value with an empty string
          $("#title").val("");
          $("#score").val("");
          $("#review").val("");
          // Redirect to the home page
          window.location.replace("/");
        }

      }).catch(function (err) {
        $("#alert .msg").text(err.responseJSON.errors.map(i => i.message).join("\n"));
        $("#alert").fadeIn(500);
        console.log("ADDREVIEWERROR", err);
      });
  });
  //click handler for delete button and passing data-id

  $(".delete").on("click", function (event) {
    event.preventDefault();
    var val = $(this).data("id");
    console.log(val);
    $.ajax({
      method: "DELETE",
      url: "/api/reviews/" + val,
    }).then(() => {
      document.location.reload(true);
    });

  });
  // Keep Track of The # of Characters Remaining
  var $review = $("#review");
  var $charsLeft = $("#charsRemain");
  var LIMIT = 900;
  $charsLeft.text(LIMIT);
  $review.on("change keyup paste cut", function () {
    console.log("CHANGE EVENT");
    var charsRemain = LIMIT - $review.val().length;
    $charsLeft.text(charsRemain);
  });

});
