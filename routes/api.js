var express = require('express');
var router = express.Router();
var glob = require('glob');
var MarkovChain = require('markovchain').MarkovChain;
var fs = require('fs');

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
  var lengths = new Array(songsToMash.length);
  
  for(var i=0;i<songsToMash.length;i++){
    var el = Math.floor(Math.random()*lyricFiles.length);
    songsToMash[i] = new MarkovChain({files: lyricFiles[el]});
    lengths[i] = fs.readFileSync(lyricFiles[el]).toString().split('n').length-1;
   // console.log(lengths[i]);
   }

  var index = 0;
  var word = 'A';
  for(var i=0; i<Math.floor(Math.random()*10+10); i++){
    var size = Math.floor(Math.random()*lengths[index]);
    songsToMash[index].start(word).end(size+1).process(
      function (err,sentence) { 
        if(err)
          console.log('error:\t'+err);
        else {
          lyricz+=sentence; 
          console.log(sentence);
          var temp = sentence.split(' '); 
        }
      });
    (index < songsToMash.length-1)?index++:index = 0;
  }

  return lyricz;

}

module.exports = router;
