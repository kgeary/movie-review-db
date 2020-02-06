console.log("IN ADD REVIEW JS");
$("#add-review").on("click", function (event) {
  event.preventDefault();
  var newReview = {
    title: $("#title").val().trim(),
    rating: $("#score").val().trim(),
    review: $("#review").val().trim(),

  };

  $.post("/api/reviews", newReview)
    // on success, run this callback
    .then(function (data) {
      // log the data we found
      console.log(data);
      alert("Adding review...");
    });

  // empty each input box by replacing the value with an empty string
  $("#title").val("");
  $("#score").val("");
  $("#review").val("");

});