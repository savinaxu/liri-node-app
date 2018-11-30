require("dotenv").config();
const moment = require('moment');
const request = require('request');
const keys = require('./keys')
const Spotify = require('node-spotify-api');
const fs = require('fs');
const spotify = new Spotify(keys.spotify);
let userInput = process.argv.slice(3).join(" ");
let search = process.argv[2]

let concertAPI = function(name) {
    let queryURL = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp"

    request(queryURL, function (error, response, body) {
        if (error) {
            console.log("=======================================================================");
            console.log("Sorry we can't get the data you want! Try something else.");
            console.log("=======================================================================");
      
            return;
        }

        let result = JSON.parse(body)

        if (result.length === 0) {
            console.log("=======================================================================");
            console.log("Sorry we can't get the data you want! Try something else.");
            console.log("=======================================================================");
      
            return;
        }

        result.forEach(function(event) {
            let name = event.venue.name
            let city = event.venue.city
            let region = event.venue.region
            let country = event.venue.country
            let location
            let date = moment(event.datetime).format("MM/DD/YYYY")
            if (city && region && country) {
                location = city + ", " + region + ", " + country
            } else {
                location = city + ", " + country
            }
            console.log("=======================================================================");
            console.log("\nName of the venue: " + name);
            console.log("\nVenue location: " + location);
            console.log("\nDate of the Event: " + date);
        })
    })
}

let spotifyAPI = function(name) {
    spotify.search({ type: 'track', query: name}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

        let result = data.tracks.items

        result.forEach(function(item) {
            let artist = item.artists[0].name
            let album = item.album.name
            let preview = item.preview_url
            if (!preview) {
                preview = item.external_urls.spotify
            }
            console.log("=======================================================================");
            console.log("\nArtist(s): " + artist)
            console.log("\nThe song's name: " + name)
            console.log("\nA preview link of the song from Spotify: " + preview)
            console.log("\nThe album that the song is from: " + album)

        })
    });
}

let omdbAPI = function(name) {
    if (name.length === 0) {
        name = 'Mr. Nobody'
    }
    let queryURL = "http://www.omdbapi.com/?apikey=d7043af5&t=" + name

    request(queryURL, function (error, response, body) {
        if (error) {
            console.log("=======================================================================");
            console.log("Sorry we can't get the data you want! Try something else.");
            console.log("=======================================================================");
      
            return;
        }

        let result = JSON.parse(body)

        let title = result.Title
        let year = result.Year
        let rating = result.imdbRating
        let tomato = result.Ratings[1].Source
        let country = result.Country
        let language = result.Language
        let plot = result.Plot
        let actors = result.Actors

        console.log("=======================================================================");
        console.log("\nTitle: " + title);
        console.log("\nYear: " + year);
        console.log("\nIMDB Rating: " + rating);
        console.log("\nRotten Tomatoes Rating: " + tomato);
        console.log("\nCountry: " + country);
        console.log("\nLanguage: " + language);
        console.log("\nPlot: " + plot);
        console.log("\nActors in the movie: " + actors);
        console.log("=======================================================================");
    });
}

let random = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }

        let dataArr = data.split(",");
        let input = dataArr[0]
        let search = dataArr[1]

        commend(input, search)
        // for (let i = 0; i < dataArr.length; i+2) {
        //     if ( i % 2 === 0 && i + 1 < dataArr.length) {
        //         input = dataArr[i]
        //         search = dataArr[i+1]
        //     }
        // }
    })
}

let log = function(search, userInput) {
    fs.appendFile("log.txt", search + ", " + userInput + "\n", function(err) {
        if (err) return console.log(err)
    })
    console.log("Logged command: " + search + " || Search value: " + userInput)
}

function commend(search, userInput) {
    switch (search) {
        case 'concert-this':
            concertAPI(userInput)
            log(search, userInput)
            break;
    
        case 'spotify-this-song':
            spotifyAPI(userInput)
            log(search, userInput)
            break;
    
        case 'movie-this':
            omdbAPI(userInput)
            log(search, userInput)
            break;
    
        case 'do-what-it-says':
            random()
            log(search, userInput)
            break;
    
        default:
            console.log("error!")
    }
}

commend(search, userInput)



