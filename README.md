# LIRI Bot

### Overview

LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data.

### Requirements

1. The [package.json](https://github.com/Meggin/liri-node-app/blob/master/package.json)
lists dependent node packages, but for your convenvice, these are the ones to install.

2. To retrieve the data that will power this app, you'll need to send requests to the Bands in Town, Spotify and OMDB APIs. 

   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
     `npm install spotify`

   * [Request](https://www.npmjs.com/package/request)
      `npm install request`

     * You'll use Request to grab data from the [OMDB API](http://www.omdbapi.com) and the [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

   * [Moment](https://www.npmjs.com/package/moment)
   `npm install moment`

   * [DotEnv](https://www.npmjs.com/package/dotenv)
   `npm install dotenv`

### Instructions

liri.js can take in one of the following commands:

   * `concert-this`

   * `spotify-this-song`

   * `movie-this`

   * `do-what-it-says`

### What Each Command Should Do

1. `node liri.js concert-this <artist/band name here>`
  ![concert-this](images/concert.png)

   * This will search the Bands in Town Artist Events API (`"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"`) for an artist and render the following information about each event to the terminal:

     * Name of the venue

     * Venue location

     * Date of the Event (use moment to format this as "MM/DD/YYYY")

2. `node liri.js spotify-this-song '<song name here>'`
  ![spotify-with-song](images/spotify-with-name.png)

   * This will show the following information about the song in your terminal/bash window

     * Artist(s)

     * The song's name

     * A preview link of the song from Spotify

     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.
   ![spotify-with-song](images/spotify-without-name.png)

3. `node liri.js movie-this '<movie name here>'`
  ![movie-with-name](images/movie-with-name.png)

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
  ![movie-without-name](images/movie-without-name.png)
     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>

     * It's on Netflix!

   * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

4. `node liri.js do-what-it-says`
  ![do-what-it-says](images/do-what-it-says.png)

   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

     * Edit the text in random.txt to test out the feature for movie-this and my-tweets

### BONUS

* In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
![logs](images/logs.png)


**Good Luck!**
