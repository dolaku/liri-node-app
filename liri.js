var env = require('dotenv').config();
var keys = require('./keys.js');
var fs = require('fs');

// NPMs
var spotify = require('node-spotify-api');

// Keys
var spotify = new Spotify(keys.spotify);

// Inputs
var args = process.argv;
var command = args[2];
var input;

// concatenate longer inputs
if (args[3]) {
    for (var i = 3; i < args.length; i++) {
        input += args[i];
    }
}



// Search Spotify for songs
// COMMAND: node liri.js spotify-this-song '<song name here>'

    // Show:
        // artist
        // Song name
        // preview link of song from spotify
        // album name

    // If no song is provided then your program will default to "The Sign" by Ace of Base.



// Search Bands in Town for concerts
// COMMAND: node liri.js concert-this <artist/band name here>

    // This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:

        // Name of the venue
        // Venue location
        // Date of the Event (moment to format as "MM/DD/YYYY")



// Search OMDB for movies
// COMMAND: node liri.js movie-this '<movie name here>'

    // This will output the following information to your terminal/bash window:
    /*
        * Title of the movie.
        * Year the movie came out.
        * IMDB Rating of the movie.
        * Rotten Tomatoes Rating of the movie.
        * Country where the movie was produced.
        * Language of the movie.
        * Plot of the movie.
        * Actors in the movie.
    */

    // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'



// Read/Write to random.txt
// COMMAND: node liri.js do-what-it-says