$(document).ready(function () {
  console.log("IN ADD REVIEW JS");

  // Add Review Button Click Event
  $("#add-review").on("click", function (event) {
    event.preventDefault();
    $("#alert .msg").text("");
    $("#alert").hide();
    var newReview = {
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
    }).then();
    window.location.replace("/");
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
