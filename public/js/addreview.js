console.log("IN ADD REVIEW JS");
$("#add-review").on("click", function (event) {
  event.preventDefault();
  var newReview = {
    title: $("#title").val().trim(),
    score: $("#score").val().trim(),
    review: $("#review").val().trim(),

  };

  $.post("/api/reviews", newReview)
    // on success, run this callback
    .then(function () {
      // log the data we found
      window.location.replace("/");
    });

  // empty each input box by replacing the value with an empty string
  $("#title").val("");
  $("#score").val("");
  $("#review").val("");

});