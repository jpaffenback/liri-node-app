require("dotenv").config();

//packages 
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

//API Keys
var keys = require("./keys");

//From instruction - init API
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// Commands
//* `my-tweets` * This will show your last 20 tweets and when they were created at in your terminal/bash window.

function showTweets(){
    var screenName = {screen_name: 'JasonP_1'};
    client.get('statuses/user_timeline', screenName, function(error, tweets, response){
      if(!error){
        for(var i = 0; i<tweets.length; i++){
          var date = tweets[i].created_at;
          console.log("@JasonP_1: " + tweets[i].text + " Created At: " + date.substring(0, 19));
          console.log("-----------------------");
          
          //adds text to log.txt file
          fs.appendFile('log.txt', "@JasonP_1: " + tweets[i].text + " Created At: " + date.substring(0, 19));
          fs.appendFile('log.txt', "-----------------------");
        }
      }else{
        console.log('Error occurred');
      }
    });
  }
//* `spotify-this-song`

function spotifySong(song){
    spotify.search({ 
        type: 'track', 
        query: song}, 
        
        function(error, data){
      if(!error){
        for(var i = 0; i < data.tracks.items.length; i++){
          var songData = data.tracks.items[i];
         
          console.log("Artist: " + songData.artists[0].name);
          console.log("Song: " + songData.name);
          console.log("Preview URL: " + songData.preview_url);
          console.log("Album: " + songData.album.name);
          console.log("-----------------------");
          
          
          fs.appendFile('log.txt', songData.artists[0].name);
          fs.appendFile('log.txt', songData.name);
          fs.appendFile('log.txt', songData.preview_url);
          fs.appendFile('log.txt', songData.album.name);
          fs.appendFile('log.txt', "-----------------------");
        }
      } else{
        console.log('Error occurred.');
      }
    });
  }
  
//* `movie-this`   
//* `do-what-it-says`
    

    