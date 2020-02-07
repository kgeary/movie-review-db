$("#submitSearch").on("click", function (event) {
    event.preventDefault();
var movie ={

    movie:$("#movieSearch") .val().trim(),
  };
  $.get("/" + movie, function(data) {
    // log the data to our console
    console.log(data);

  
});

});




