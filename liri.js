require("dotenv").config();

var keys = require("./keys");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require("fs-extra");

var command=process.argv[2]
var keyword=process.argv.slice(3).join(" ")
 
startSearch()
 
function startSearch() {
    if (command=== "concert-this") {
        searchConcert()
    }
    else if (command=== "spotify-this-song") {
        searchSpotify()
    }

    else if (command=== "movie-this") {
        searchMovie()
    }

    else if (command=== "do-what-it-says") {
        searchAnything()
    }
} 
// concert-this

// spotify-this-song

// movie-this

// do-what-it-says

function searchConcert() {
 axios.get("https://rest.bandsintown.com/artists/" + keyword + "/events?app_id=codingbootcamp").then(function(response){
   
    // Name of the venue

    // Venue location
    
    // Date of the Event (use moment to format this as "MM/DD/YYYY")

     var concertList = response.data
     for (let i = 0; i < concertList.length; i++) {
     console.log("venue", concertList[i].venue.name)
     console.log("city", concertList[i].venue.city)
     console.log("country", concertList[i].venue.country)
     console.log("date", concertList[i].datetime)
     }
 })
 .catch(function(err) {
    console.log(err);
  });
}

function searchSpotify() {
    var spotify = new Spotify(keys.spotify);
   
 
    // Artist(s)

    // The song's name
    
    // A preview link of the song from Spotify
    
    // The album that the song is from



    spotify.search({ type: 'track', query: keyword }, function(err, response) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
     
    console.log(response.tracks.items); 
       var songList = response.tracks.items
       for (let i = 0; i < songList.length; i++) {
          
             console.log("artists:", songList[i].album.artists[0].name) 
             console.log("songs", songList[i].name)
             console.log("preview link", songList[i].preview_url)
             console.log("album name", songList[i].album.name)
             console.log("________________________________\n")
       }

    });
}

function searchMovie() {
    axios.get('http://www.omdbapi.com/?t=' + keyword + '&y=&plot=short&apikey=trilogy')

      .then(function(response) {
        console.log(response.data);
        console.log('title', response.data.Title);
        console.log('year', response.data.Year);
        console.log('rating', response.data.imdbRating);
        console.log('country', response.data.Country);
        console.log('language', response.data.Language);
        console.log('plot', response.data.Plot);
        console.log('actors', response.data.Actors);
        console.log('________________________________\n');
      });
  }

    function searchAnything() {
    
    // attempting to add the variable to search the random.txt file
    // still is not logging spotify-this-song but it is functioning and providing some kind of function
    
    fs.appendFile("random.txt", fs, 
    function(err) {
        if (err) return console.error(err);
        console.log(fs)
    })
}

  console.log(process.argv);