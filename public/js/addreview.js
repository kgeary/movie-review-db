$(document).ready(function () {
  console.log("IN ADD REVIEW JS");

  // Add Review Button Click Event
  $("#add-review").on("click", function (event) {
    event.preventDefault();
    var newReview = {
      title: $("#title").val().trim(),
      score: $("#score").val().trim(),
      review: $("#review").val().trim(),
    };

    // Post A New Review to Server
    $.post("/api/reviews", newReview)
      // on success, run this callback
      .then(function (res) {
        console.log("JSON RES", res);
        // log the data we found
        // empty each input box by replacing the value with an empty string
        $("#title").val("");
        $("#score").val("");
        $("#review").val("");
        // Redirect to the home page
        window.location.replace("/");
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
