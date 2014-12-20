var express = require('express');
var router = express.Router();
var glob = require('glob');
var MarkovChain = require('markovchain').MarkovChain;

var lyricFiles;

router.get('/', function(req, res){
  glob('lyrics/**/*.txt',{},function(er, files){
    lyricFiles = files; 
    res.send(mashEmUp());

  });
});

function mashEmUp(){
  var lyricz = "";
  var songsToMash = new Array(Math.floor(Math.random()*6+2));
  
  for(var i=0;i<songsToMash.length;i++){
    songsToMash[i] = new MarkovChain({files: lyricFiles[Math.floor(Math.random()*lyricFiles.length)].substring(7)});
  }

  songsToMash.forEach(function(markovChain){
    console.log(markovChain);
  });




  return lyricz;

}

module.exports = router;
