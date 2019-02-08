// Read and set environment variables
require("dotenv").config();

// Require API keys
const keys = require("./keys.js");

// Require packages
const axios = require("axios");
const Spotify = require("node-spotify-api");
const moment = require("moment");
const fs = require("fs");

// Create Spotify instance to make API requests
const spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

/**
 * Makes request to BandsInTown and
 * prints 3 upcoming shows for the given artist
 * @param {string} artistName - Name of artist to search for
 */
const concertThis = (artistName) => {
  const queryURL = `https://rest.bandsintown.com/artists/${artistName}/events?app_id=${keys.bandsInTown}`
  axios
    .get(queryURL)
    .then(function(response) {
      let data = response.data;
      console.log("Upcoming shows for", artistName);
      data.forEach(function(element) {
        let date = moment(element.datetime).format("MM/DD/YYYY");
        let venue = element.venue.name;
        let city = element.venue.city;
        let region = element.venue.region;
        let country = element.venue.country;
        let location = `${city}, ${region}, ${country}`;

        console.log("------------");
        console.log("Venue name:", venue);
        console.log("Location:", location);
        console.log("Date:", date);
      });
      console.log("\n");
    })
    .catch(function(error) {
      console.log(error);
    });
}

/**
 * Searches Spotify for a given song and prints that song's
 * information to the console
 * @param {object} spotify - Spotify object to use for API info
 * @param {string} songName - Name of the song to search for
 */
const spotifyThis = (spotify, songName) => {
  spotify
    .search({ type: "track", query: songName})
    .then(response => {
      const track = response.tracks.items[0];
      const artist = track.artists[0].name;
      const name = track.name;
      const previewUrl = track.preview_url || "N/A";
      const album = track.album.name;

      console.log("Artist:", artist);
      console.log("Song Title:", name);
      console.log("Preview:", previewUrl);
      console.log("Album:", album);
    })
    .catch(err => {
      console.log(err);
    });
}

/**
 * Searches OMDb for information on a film and prints its details
 * to the console.
 * @param {string} movieTitle - Title of the movie to search for
 */
const movieThis = (movieTitle) => {
  const queryURL = `http://www.omdbapi.com/?apikey=${keys.omdb.key}&t=${movieTitle}`;
  axios
    .get(queryURL)
    .then(response => {
      const data = response.data;
      const title = data.Title;
      const year = data.Year;
      const imdbScore = data.imdbRating;
      const rtScore = data.Ratings[1].Value;
      const country = data.Country;
      const language = data.Language;
      const plot = data.Plot;
      const actors = data.Actors;

      // Print movie information
      console.log("Title:", title);
      console.log("Year:", year);
      console.log("IMDb Score:", imdbScore);
      console.log("Rotten Tomatoes Score:", rtScore);
      console.log("Country:", country);
      console.log("Language:", language);
      console.log("Plot:", plot);
      console.log("Actors:", actors);
    })
    .catch(err => {
      console.log(err);
    });
}

const doWhatItSays = (fileName, inputProcessor) => {
  fs.readFile(__dirname + "/" + fileName, "utf8", (err, data) => {
    if (err) throw err;
    const command = data.split(",")[0];
    const argument = data.split(",")[1];

    inputProcessor(command, argument);
  });
}

module.exports = { 
  spotify: spotify,
  concertThis: concertThis,
  spotifyThis: spotifyThis,
  movieThis: movieThis,
  doWhatItSays: doWhatItSays
}; 