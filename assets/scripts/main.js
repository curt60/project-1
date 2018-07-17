//when movie row is clicked update css and display reviews
$(document).on("click", ".movie-row", function () {
    if ($(this).attr("data-state") === "true") {
        //reset css for all rows
        $(".movie-row").css("opacity", "1");
        $(this).css("border-color", "#ddd");
        //remove reviews
        $("#review-section").empty();
        //set state
        $(".movie-row").attr("data-state", "false");
    }
    else {
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
        setTimeout(function() {
            $("#review-section").append(nytReview);
            $("#review-section").append(usaReview);
        }, 500);

        //set row state
        $(".movie-row").attr("data-state", "false");
        $(this).attr("data-state", "true");
    }

})