# Project 1 – Movie Aggregation Website

#### Team Members:

Curtis Robinson, Shirin Boroujeni, Teresa Grossman, Matthew Huberty



#### Description:

Our website will provide a quick snapshot on the 25 current movies in the theaters.  Including statics and diverse reviews.  



#### Site Content

- Movie Summary
  - Movie Thumbnail
  - Plot summary
  - Rating – G, PG, R
  - Metacritic Rating/Rotten Tomatoes
- Detailed Reviews (reveal upon click)
  - NYTimes
  - USA Today
- Additional Optional Content
  - Link to the movie trailer
  - Abridged cast list
- Input Fields (filter criteria)
  - Movie title
  - Zip code



#### Technology

- APIs
  - Fandango
  - OMDB
  - NY Time
  - USA Today
- Frameworks
  - Bootstrap
  - JQuery
- Other functionality (not previously discussed in class)
  - TBD



#### Project Plan / Tasks:

- Main HTML File: 
  - Index.html **(Curtis)** - Basic layout and structure to review with group
- Test HTML Files *(used to test API output during initial development)*
  - fandango.html **(Curtis)** - movie thumbnail and summary stats
  - nyt.html **(Teresa)** - detailed movie review
  - usa-today.htm **(Shirin)** - detailed movie review
  - omdb.html **(Matt)** - Metacritic Rating (and other summary stats or movie media?)
- Main JavaScript File:
  - main.js - primary file used for main app
- Test JavaScript Files: one file per API to test functionality while avoiding conflicts in main file
  - (same as html files above).  Focus on using functions for modular approach.  All APIs/functions (except Fandango) should take in array of movie titles as input and return object or array with output data.