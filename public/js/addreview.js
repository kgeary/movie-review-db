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
      // empty each input box by replacing the value with an empty string
      $("#title").val("");
      $("#score").val("");
      $("#review").val("");
      window.location.replace("/");
    });
});

var $review = $("#review");
var LIMIT = 900;
$("#charsRemain").text(LIMIT);
$review.on("change keyup paste cut", function () {
  console.log("CHANGE EVENT");
  var charsRemain = LIMIT - $review.val().length;
  $("#charsRemain").text(charsRemain);
});