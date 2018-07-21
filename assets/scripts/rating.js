<script src="./assets/scripts/main.js"></script>

//OMDB API config
var searchURL = "http://www.omdbapi.com/?i=tt3896198&apikey=";
var apiKey = "f0032c14";

//define global variables

//get movie ratings
function getDetails(movieID) {
    //temporary movie ID
    //COMMENT THIS OUT, BELOW, WHEN CODE IS FULLY LINKED TO THE SITE. 
    movieID = tt0790724;

    //configure API URL
    var queryURL = searchURL + apiKey +  movieID

    //generate AJAX request
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        movieDetails = response;
        //Return an object which goes to the renderDetails() function in the main.js
        return movieDetails;
    });
}