// Require command functions
const commands = require("./commands.js");

// Grab command and argument from command line arguments
let command = process.argv[2];
let argument = process.argv.slice(3).join(" ");

const processInput = (command, argument) => {
    switch (command) {
        case "concert-this":
            commands.concertThis(argument);
            break;
        case "spotify-this-song":
            commands.spotifyThis(commands.spotify, argument);
            break;
        case "movie-this":
            commands.movieThis(argument);
        case "do-what-it-says":
            commands.doWhatItSays(argument);
            break;
    }
}

processInput(command, argument);

