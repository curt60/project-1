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

//execute search when search button is clicked (functions defined below)
$("#title-search-btn").on("click", searchTitle);

//when movie row is clicked update css and display (or clear) movie details
$(document).on("click", ".movie-row", function () {
    //if currently selected then unselect
    if ($(this).hasClass("selected")) {
        //reset css for all rows
        $(".movie-row").css("opacity", "1");
        $(this).css("border-color", "#ddd");

        //animiate movie detail exit
        anime({
            targets: "#review-section",
            translateX: ["0px", "200px"],
            opacity: 0,
            complete: function(){
                $("#review-section").empty();
            }
        });

        //remove 'selected' class from row
        $(".movie-row").removeClass("selected");
    }
    //if not current selected then select now
    else {
        //fade non-selected rows
        $(".movie-row").css("opacity", "0.5");
        $(".movie-row").css("border-color", "#ddd");
        //bring selected row into focus
        $(this).css("opacity", "1");
        $(this).css("border-color", "#000");
        //assign 'selected' class to row
        $(".movie-row").removeClass("selected");
        $(this).addClass("selected");
        //get movie details
        getDetails($(this).attr("data-movie-id"));
    }

})

//search for movies by title
function searchTitle() {
    //clear current results
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
    //configure API URL
    var queryURL = movieURL + movieID + "?api_key=" + apiKey

    //generate AJAX request
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
        //assign movie attributes
        var imgBaseURL = "https://image.tmdb.org/t/p/w200";
        var movieID = movieList[i].id;
        var title = movieList[i].title;
        var releaseDate = movieList[i].release_date;
        var imgPath = movieList[i].poster_path;
        var vote = movieList[i].vote_average;
        var voteCount = movieList[i].vote_count;

        //create HTML elements
        var movieRow = $("<div>").addClass("movie-row").attr("id", "row-" + i).attr("data-movie-id", movieID);
        var movieImg = $("<img>").attr("src", imgBaseURL + imgPath);
        var movieInfo = $("<div>").addClass("movie-info");
        var movieTitle = $("<div>").addClass("movie-title").html(title);
        var movieDate = $("<div>").addClass("release-date").html(releaseDate);
        var movieVote = $("<div>").addClass("avg-vote").html(vote * 10 + "%  ");
        var dateLabel = $("<span>").addClass("label").html("Release Date: ");
        var voteLabel = $("<span>").addClass("label").html("Avg Vote: ");
        var countLabel = $("<span>").addClass("label").html("Vote Count: ");

        //add elements to page
        movieRow.append(movieImg);
        movieRow.append(movieInfo);
        movieInfo.append(movieTitle);
        movieInfo.append(movieDate);
        movieInfo.append(movieVote);
        movieDate.prepend(dateLabel);
        movieVote.prepend(voteLabel);
        movieVote.append(countLabel);
        movieVote.append(voteCount.toLocaleString());
        movieRow.css("opacity", 0);
        $("#summary-section").append(movieRow);
    }
    //fade in each row with a slight delay for each
    anime({
        targets: ".movie-row",
        opacity: 1,
        delay: function(el, i, l) {
            return i * 200;
        }
    });
}

//render movie details
function renderDetails() {
    var reviewSection = $("#review-section");
    //if prior movie details displayed then animate old info exit and new info entrance
    if (reviewSection.children().length) {
        //animate old review exit
        anime({
            targets: "#review-section",
            translateX: ["0px", "200px"],
            opacity: 0,
            //once exist animation is complete perform the following actions
            complete: function (anim) {
                //clear prior details
                reviewSection.empty();
                //create and display HTML elements
                var tagline = $("<div>").addClass("tagline").html(movieDetails.tagline);
                var summary = $("<div>").addClass("summary").html(movieDetails.overview);
                reviewSection.append(tagline).append(summary);
                //animate new info entrance
                anime({
                    targets: "#review-section",
                    translateY: ["100px", "0px"],
                    opacity: 1
                });
            }
        });
    }
    else {
        //create and display HTML elements
        var tagline = $("<div>").addClass("tagline").html(movieDetails.tagline);
        var summary = $("<div>").addClass("summary").html(movieDetails.overview);
        reviewSection.append(tagline).append(summary);
        //animate detail info entrance
        anime({
            targets: "#review-section",
            translateY: ["100px", "0px"],
            opacity: 1
        });
    }
}





