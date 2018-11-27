require("dotenv").config();
const moment = require('moment');
const request = require('request');
const fs = require('fs');
let userInput = process.argv.slice(3).join(" ");
let search = process.argv[2]

let concertAPI = function(name) {
    let queryURL = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp"

    request(queryURL, function (error, response, body) {
        if (error) {
            console.log("\r\n\r\n\r\n");

            console.log("Sorry we can't get the data you want! Try something else.");
      
            console.log("\r\n\r\n\r\n");
      
            return;
        }

        let result = JSON.parse(body)

        if (result.length === 0) {
            console.log("\r\n\r\n\r\n");

            console.log("Sorry we can't get the data you want! Try something else.");
      
            console.log("\r\n\r\n\r\n");
      
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
            console.log("\r\n\r\n\r\n");
            console.log("Name of the venue: " + name);
            console.log("Venue location: " + location);
            console.log("Date of the Event: " + date);
        })


    })
}

// let spotifyAPI = function(name) {

// }

let omdbAPI = function(name) {
    if (name.length === 0) {
        name = 'Mr. Nobody'
    }
    let queryURL = "http://www.omdbapi.com/?apikey=d7043af5&t=" + name

    request(queryURL, function (error, response, body) {
        if (error) {
            console.log("\r\n\r\n\r\n");

            console.log("Sorry we can't get the data you want! Try something else.");
      
            console.log("\r\n\r\n\r\n");
      
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

        console.log("\r\n\r\n\r\n");
        console.log("Title: " + title);
        console.log("Year: " + year);
        console.log("IMDB Rating: " + rating);
        console.log("Rotten Tomatoes Rating: " + tomato);
        console.log("Country: " + country);
        console.log("Language: " + language);
        console.log("Plot: " + plot);
        console.log("Actors in the movie: " + actors);
        console.log("\r\n\r\n\r\n");
        
    });
}


switch (search) {
    case 'concert-this':
        concertAPI(userInput)
        break;

    case 'movie-this':
        omdbAPI(userInput)
        break;

    default:
        console.log("error!")
}

