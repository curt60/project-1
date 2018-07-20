//animate logo
anime({
    targets: ".jumbotron",
    translateY: ["-250px", "0px"],
    duration: "2000"
})
//animate search bars
anime({
    targets: ".search-inputs",
    translateX: ["-500px", "0px"],
    duration: "2000"    
})

//TMDb API config
var searchURL = "https://api.themoviedb.org/3/search/movie"
var movieURL = "https://api.themoviedb.org/3/movie/"
var apiKey = "e48a4ae3c093a2322becafcc6dc5c8a0";

//define global variables
var numOfResults = 0;
var movieList = [];
var movieDetails = {};

//search for movies by title
function searchTitle() {
    //clear current movie list and result count
    $("#summary-section").empty();
    $("#result-count").empty();
    
    
    //configure search URL
    var searchTerm = $("#title-input").val().trim().replace(/ /g, "+");   
    var queryURL = searchURL + "?api_key=" + apiKey + "&query=" + searchTerm;
    
    //generate API call and retrieve movie list
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        numOfResults = response.total_results;
        movieList = response.results;
        
        //display number of results
        var resultCount = $("#result-count");
        var countLabel = $("<span>").addClass("count-label").html("Results: ");
        resultCount.html(numOfResults);
        resultCount.prepend(countLabel);
        
        //render list of movies
        renderMovieList();
    });
}

//get movie details
function getDetails(movieID) {
    var queryURL = movieURL + movieID + "?api_key=" + apiKey
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        movieDetails = response;
    });
}

//render movie list
function renderMovieList() {
    for (let i = 0; i < movieList.length && i < 10; i++) {
        //assign movie values
        var imgBaseURL = "https://image.tmdb.org/t/p/w200";
        var movieID = movieList[i].id;
        var title = movieList[i].title;
        var releaseDate = movieList[i].release_date;
        var imgPath = movieList[i].poster_path;
        var vote = movieList[i].vote_average;

        //create HTML elements
        var movieRow = $("<div>").addClass("row mb-3 movie-row");
        var movieImg = $("<img>").attr("src", imgBaseURL + imgPath);
        var movieInfo = $("<div>").addClass("movie-info");
        var movieTitle = $("<div>").addClass("movie-title").html(title);
        var movieDate = $("<div>").addClass("release-date").html(releaseDate);
        var movieVote = $("<div>").addClass("avg-vote").html(vote);
        var dateLabel = $("<span>").addClass("label").html("Release Date: ");
        var voteLabel = $("<span>").addClass("label").html("Average Vote: ");
        
        //add elements to page
        movieRow.append(movieImg);
        movieRow.append(movieInfo);
        movieInfo.append(movieTitle);
        movieInfo.append(movieDate);
        movieInfo.append(movieVote);
        movieDate.prepend(dateLabel);
        movieVote.prepend(voteLabel);
        console.log(movieRow);
        $("#summary-section").append(movieRow);

    }

}

//render movie details



$("#title-search-btn").on("click", searchTitle);

//when movie row is clicked update css and display reviews
$(document).on("click", ".movie-row", function () {
    if ($(this).attr("data-state") === "selected") {
        //reset css for all rows
        $(".movie-row").css("opacity", "1");
        $(this).css("border-color", "#ddd");
        //fade out reviews
        anime({
            targets: "#review-section",
            opacity: 0,
            duration: 1000,
            easing: "linear"
          });
        //set state
        $(".movie-row").attr("data-state", "not-selected");
    }
    else {
        //fade out reviews
        anime({
            targets: "#review-section",
            opacity: 0,
            duration: 1000,
            easing: "linear"
          });
        //fade non-selected rows
        $(".movie-row").css("opacity", "0.5");
        $(".movie-row").css("border-color", "#ddd");
        //bring selected row into focus
        $(this).css("opacity", "1");
        $(this).css("border-color", "#000");

        //construct NTY review elements
        $("#review-section").empty();
        var nytReview = $("<div>");
        nytReview.addClass("row mb-3 px-3 text-justify");
        nytReview.attr("id", "nyt-review");
        var nytTitle = $("<h4>");
        nytTitle.addClass("mx-auto text-center review-title");
        nytTitle.html("New York Times Review");
        var nytText = $("<p>");
        nytText.html("Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias veniam eaque iure suscipit saepe nihil minus! Laborum, culpa consequuntur laudantium laboriosam unde neque tempora quis iusto officiis consectetur quibusdam dicta?");
        nytReview.append(nytTitle);
        nytReview.append(nytText);

        //construct USA review elements
        var usaReview = $("<div>");
        usaReview.addClass("row mb-3 px-3 text-justify");
        usaReview.attr("id", "usa-review");
        var usaTitle = $("<h4>");
        usaTitle.addClass("mx-auto text-center review-title");
        usaTitle.html("USA Today Review");
        var usaText = $("<p>");
        usaText.html("Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quibusdam voluptatum inventore consequuntur velit amet molestias quisquam, aperiam veniam obcaecati vero. Dolore unde sed accusamus exercitationem hic repellat iusto quae.");
        usaReview.append(usaTitle);
        usaReview.append(usaText);

        //add elements to page
        $("#review-section").append(nytReview);
        $("#review-section").append(usaReview);
        //set row state
        $(".movie-row").attr("data-state", "not-selected");
        $(this).attr("data-state", "selected");
        //animiate fade in
            anime({
                targets: "#review-section",
                opacity: 1,
                duration: 1500,
                easing: "linear",
                offset: "+=1000"
              });  
    }

})