require("dotenv").config();
var axios = require('axios');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

//var category = process.argv[2];
var request = process.argv[2];

var bandsUrl = "https://rest.bandsintown.com/artists/" + request + "/events?app_id=codingbootcamp"

axios.get(bandsUrl)
switch (category) {
    case 'concert-this':
        
        break;
    case 'spotify-this-song':
        
        break;
    case 'movie-this':
        
        break;
    case 'do-what-it-says':
        
        break;

    default:
        break;
}