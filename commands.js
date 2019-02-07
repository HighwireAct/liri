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
 * prints 3 upcoming shows for the 
 * @param {string} artistName - Name of artist to search for
 */
const concertThis = (artistName) => {
  const queryURL = `https://rest.bandsintown.com/artists/${artistName}/events?app_id=${keys.bandsInTown}`
  axios.get(queryURL)
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


const spotifyThis = (spotify, songName) => {
  spotify
    .search({ type: "track", query: songName})
    .then(response => {
        console.dir(response.tracks.items[0]);
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = { 
    spotify: spotify,
    concertThis: concertThis,
    spotifyThis: spotifyThis,


}; 