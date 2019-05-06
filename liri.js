require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var moment = require("moment");

var category = process.argv[2];
var request = process.argv[3];

switch (category) {
  case "concert":
    // console.log("inside concert-this");
    // console.log("request " + request);
    concertThis(request);
    break;
  case "spotify":
    // console.log("inside switch for spotify");
    // console.log("request " + request);
    spotifyThis(request);
    break;
  case "movie":
    console.log("inside movie");
    console.log("request: " + request);
    movieThis(request);
    break;
  case "do-what-it-says":
    break;

  default:
    break;
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
  ///calling in fs readfile random.txt
  //return back the string for it
  //break up the string and store into an array by a commoma
  //first element is the "spotify"
  //the rest is the request  "cher"

  fs.readFile("random.txt", "utf8", function(err, contents) {
    if (err) return console.log(err);
    var returned = contents.split(", ").join("\n");
    console.log(returned);
  });
}
