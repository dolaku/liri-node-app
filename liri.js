require('dotenv').config();
var keys = require('./keys.js');
var axios = require("axios");
var fs = require('fs');

// NPMs
var Spotify = require('node-spotify-api');

// Keys
var spotify = new Spotify(keys.spotify);

// Inputs
// var args = process.argv;
var command = process.argv[2];
var args = process.argv.slice(3).join('+');
var URL;
var div = '=====================';

// run functions depending on command input
switch (command) {
    case 'spotify-this-song':
        spotifyThis();
        break;
    case 'concert-this':
        concertThis();
        break;
    case 'movie-this':
        movieThis();
        break;
    case 'do-what-it-says':
        doThis();
        break;
    default:
        console.log("Sorry, I don't know that one.");
}


// Search Spotify for songs
// COMMAND: node liri.js spotify-this-song '<song name here>'

// Show:
// artist
// Song name
// preview link of song from spotify
// album name


function spotifyThis() {

    // If no song is provided then your program will default to "The Sign" by Ace of Base.
    if (args === '') {
        // https://open.spotify.com/album/5UwIyIyFzkM7wKeGtRJPgB
        // https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE
        // https://api.spotify.com/v1/tracks/
        spotify
            .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
            .then(function (data) {
                console.log(`\n${div} Song Info ${div}`);
                console.log(`Artist: ${data.artists[0].name}`);
                console.log(`Song Name: ${data.name}`);
                console.log(`Link: ${data.external_urls.spotify}`);
                console.log(`Album Name: ${data.album.name}`);
                console.log(div);
            })
            .catch(function (err) {
                console.error('Error occurred: ' + err);
            });

    } else {

        spotify.search({ type: 'track', query: args, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            res = data.tracks.items[0];
            console.log(`\n${div} Song Info ${div}`);
            console.log(`Artist: ${res.artists[0].name}`);
            console.log(`Song Name: ${res.name}`);
            console.log(`Link: ${res.external_urls.spotify}`);
            console.log(`Album Name: ${res.album.name}`);
            console.log(div);

        });
    }
}


// Search Bands in Town for concerts
// COMMAND: node liri.js concert-this <artist/band name here>

// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:

// Name of the venue
// Venue location
// Date of the Event (moment to format as "MM/DD/YYYY")

function concertThis() {
    URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

}


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

function movieThis() {

    // If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
    if (args === '') {
        args = 'mr+nobody';
    }

    URL = `https://www.omdbapi.com/?t=${args}&y=&plot=short&apikey=trilogy`;

    axios
        .get(URL)
        .then(function (res) {
            var data = res.data;
            // console.log(res);

            if (data.Response === 'False') {
                console.log(data.Error);
                return;
            }

            console.log(`\r\n${div} Movie Info ${div}`);
            console.log(`Title: ${data.Title}`);
            console.log(`Year: ${data.Year}`);
            console.log(`IMDB Rating: ${data.imdbRating}`);
            console.log(`Rotten Tomatoes Rating: ${data.Ratings[1].Value}`);
            console.log(`Language: ${data.Language}`);
            console.log(`Plot: ${data.Plot}`);
            console.log(`Actors: ${data.Actors}`);
            console.log(div);
        })
}


// Read/Write to random.txt
// COMMAND: node liri.js do-what-it-says