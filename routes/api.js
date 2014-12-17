var express = require('express');
var router = express.Router();
var rapgeniusClient = require("rapgenius-js");

/* Create a mashup of top raps on rapgenius */
router.get('/mash', function(req, res) {
  var response = "";

  var lyricsSearchCb = function(err, lyricsAndExplanations){
    if(err){
      console.log("Error: " + err);
    }else{
      var lyrics = lyricsAndExplanations.lyrics;
      var explanations = lyricsAndExplanations.explanations;
      console.log("Found lyrics for song [title=%s, main-artist=%s, featuring-artists=%s, producing-artists=%s]",
      lyrics.songTitle, lyrics.mainArtist, lyrics.featuringArtists, lyrics.producingArtists);
      console.log(lyrics.getFullLyrics(true));
      var lolz = lyrics.getFullLyrics(true).split('\n');
      res.send(lolz[Math.floor(Math.random()*lolz.length+1)]+'\n');
    }
  };

  var searchCallback = function(err, songs){
    if(err){
      console.log("Error: " + err);
    }else{
      if(songs.length > 0){
        rapgeniusClient.searchLyricsAndExplanations(songs[0].link, "rap", lyricsSearchCb);
      }
    }
  };

  rapgeniusClient.searchSong("Forever", "rap", searchCallback);
  

});

module.exports = router;
