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
    $("#review-section").empty();
    
    //configure search URL
    var searchTerm = $("#title-input").val().trim().replace(/ /g, "+");   
    var queryURL = searchURL + "?api_key=" + apiKey + "&query=" + searchTerm + "&include_adult=false";
    
    //generate API call and retrieve movie list
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        numOfResults = response.total_results;
        movieList = response.results;
        console.log(movieList);
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
        movieDetails = response;
        //display details
        renderDetails();
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
        var movieRow = $("<div>").addClass("movie-row").attr("data-movie-id", movieID);
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
        $("#summary-section").append(movieRow);
    }
}

//render movie details
function renderDetails() {
    console.log(movieDetails);
    var reviewSection = $("#review-section");
    reviewSection.empty();
    var tagline = $("<div>").addClass("tagline").html(movieDetails.tagline);
    var summary = $("<div>").addClass("summary").html(movieDetails.overview);
    reviewSection.append(tagline).append(summary);
    $("#review-section").css("opacity", "1");
}


$("#title-search-btn").on("click", searchTitle);

//when movie row is clicked update css and display reviews
$(document).on("click", ".movie-row", function () {
    if ($(this).attr("id") === "selected-row") {
        //reset css for all rows
        $(".movie-row").css("opacity", "1");
        $(this).css("border-color", "#ddd");
        //fade reviews
        $("#review-section").css("opacity", "0");
        //set state
        $(".movie-row").removeAttr("id");
    }
    else {
        //fade non-selected rows
        $(".movie-row").css("opacity", "0.5");
        $(".movie-row").css("border-color", "#ddd");
        //bring selected row into focus
        $(this).css("opacity", "1");
        $(this).css("border-color", "#000");
        //set row state
        $(".movie-row").removeAttr("id");
        $(this).attr("id", "selected-row");
        //get movie details
        getDetails($(this).attr("data-movie-id"));
    }

})