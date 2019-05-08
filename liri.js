require('dotenv').config();
var keys = require('./keys.js');
var axios = require("axios");
var moment = require('moment');
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
        console.log(`\r\n${div}`);
        console.log("Sorry, I don't know that one.");
}



function spotifyThis() {

    // Search Spotify for songs
    // COMMAND: node liri.js spotify-this-song '<song name here>'

    // Show:
    // artist
    // Song name
    // preview link of song from spotify
    // album name

    // If no song is provided then your program will default to "The Sign" by Ace of Base.
    if (args === '') {
        spotify
            .request('https://api.spotify.com/v1/tracks/0hrBpAOgrt8RXigk83LLNE')
            .then(function (data) {
                console.log(`\n${div} Song Info ${div}`);
                console.log(`Artist: ${data.artists[0].name}`);
                console.log(`Song Name: ${data.name}`);
                console.log(`Link: ${data.external_urls.spotify}`);
                console.log(`Album Name: ${data.album.name}`);
            })
            .catch(function (err) {
                console.log(`\r\n${div}`);
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

        });
    }
}


function concertThis() {
    // Search Bands in Town for concerts
    // COMMAND: node liri.js concert-this <artist/band name here>

    // This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:

    // Name of the venue
    // Venue location
    // Date of the Event (moment to format as "MM/DD/YYYY")

    URL = "https://rest.bandsintown.com/artists/" + args + "/events?app_id=codingbootcamp"

    if (args === '') {
        console.log(`\r\n${div}`);
        console.log("Please enter an artist.");
    } else {

        axios
            .get(URL)
            .then(function (res) {

                if (res.status !== 200) {
                    // when status is not OK, return the error message
                    console.log(`\r\n${div}`);
                    console.log(`Error Code: ${res.status}:`);
                    console.log(`${res.statusText}`);
                } else if (res.data.length === 0) {
                    // when there is no upcoming concerts
                    console.log(`\r\n${div}`);
                    console.log(`No upcoming concerts found`);
                }

                for (var i = 0; i < res.data.length; i++) {
                    var data = res.data;
                    var date = moment(data[i].datetime).format("MM/DD/YYYY");

                    console.log(`\r\n${div} Concert Info ${div}`);
                    console.log(`Venue: ${data[i].venue.name}`);
                    if (data[i].venue.region !== '') {
                        console.log(`Location: ${data[i].venue.city}, ${data[i].venue.region}`);
                    } else {
                        console.log(`Location: ${data[i].venue.city}, ${data[i].venue.country}`);
                    }
                    console.log(`Date: ${date}`);
                }

            });
    }
}



function movieThis() {
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
                console.log(`\r\n${div}`);
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
        })
}


function doThis() {

    // Read/Write to random.txt
    // COMMAND: node liri.js do-what-it-says
    fs.readFile('random.txt', 'utf8', function (err, data) {

        // log error if present
        if (err) {
            console.log(`\r\n${div}`);
            console.log(err);
        }

        // 0 index = command
        // 1 index = argument
        var arr = data.split(",");
        command = arr[0];
        args = arr[1].slice(1, -1);

        if (command === "spotify-this-song") {
            spotifyThis();
        } else if (command === "movie-this") {
            movieThis();
        } else if (command === "concert-this") {
            concertThis();
        }

    })
}