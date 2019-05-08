require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");
var fs = require("fs");

var category = process.argv[2];
var request = process.argv[3];

scan(category);

function scan(param) {
  switch (param) {
    case "concert-this":
      concertThis(request);
      break;
    case "spotify-this-song":
      if (!request) {
        spotifyThis("The Sign");
      } else {
        spotifyThis(request);
      }
      break;
    case "movie-this":
      if (!request) {
        movieThis("Mr. Nobody");
      } else {
        movieThis(request);
      }
      break;
    case "do-what-it-says":
      dowhatitsays();
      break;

    default:
      break;
  }
}

function concertThis(artist) {
  var bandsUrl =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";

  axios.get(bandsUrl).then(function(response) {
    console.log("-Name of Venue: " + response.data[0].venue.name);
    console.log(
      "-Location: " +
        response.data[0].venue.city +
        ", " +
        response.data[0].venue.region
    );
    console.log(
      "-Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY")
    );
  });
}

function spotifyThis(song) {
  spotify
    .search({ type: "track", query: song })
    .then(function(response) {
      console.log("-Artist: " + response.tracks.items[0].artists[0].name);
      console.log("-Song title: " + response.tracks.items[0].name);
      console.log(
        "-Link to song: " +
          response.tracks.items[0].artists[0].external_urls.spotify
      );
      console.log("-Album title: " + response.tracks.items[0].album.name);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function movieThis(name) {
  var queryUrl =
    "http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(function(response) {
    console.log("Title: " + response.data.Title);
    console.log("Year: " + response.data.Year);
    console.log("IMDB: " + response.data.Ratings[0].Value);
    console.log("Rotten Tomatoes: " + response.data.Ratings[1].Value);
    console.log("Country: " + response.data.Country);
    console.log("Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
  });
}

function dowhatitsays() {
  fs.readFile("random.txt", "utf8", function(err, contents) {
    if (err) return console.log(err);
    var returned = contents.split(",");
    request = returned[1];
    scan(returned[0]);
  });
}
