$(document).on("click", ".movie-row", displayMovieReviews);
//var movies =["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];
function displayMovieReviews(){
    movie = $(this).attr("data-title");
    console.log(movie);
    var queryURL = "http://api.rottentomatoes.com/api/public/v1.0/movies/770672122/reviews.json?"+movie +"apikey=[qedgng6ajk8g2wjk665sajpd]" ;

    + movie + "apikey=[qedgng6ajk8g2wjk665sajpd]&page_limit=2"
    console.log(queryURL);

     $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        $("#review-section").empty(); 
          console.log(response);
          var review = response.overview;
          var usaReview = $("<div>");
          usaReview.addClass("row mb-3 px-3 text-justify");
          usaReview.attr("id", "usa-review");
          var usaTitle = $("<h4>");
          usaTitle.addClass("mx-auto text-center review-title");
          usaTitle.html("USA Today Review");
          var usaText = $("<p>");
          usaText.html(review);
          usaReview.append(usaTitle);
          usaReview.append(usaText);
        //console.log(JSON.stringify(response));

        setTimeout(function() {
            $("#review-section").append(usaReview);
          }, 500);
            });
        
        }

       

            
//add elements to page
//setTimeout(function() {
 // $("#review-section").append(usaReview);
//}, 500);