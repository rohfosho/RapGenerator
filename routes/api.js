var express = require('express');
var router = express.Router();
var glob = require('glob');
var fs = require('fs');

var lyricFiles;
var returns;

router.get('/', function(req, res){
  glob('lyrics/**/*.txt',{},function(er, files){
    lyricFiles = files; 
    res.send(mashEmUp());

  });
});

function getRandomLine(filename, cb){
  var tmp = "";
  tmp = fs.readFileSync(filename);
  var temp = tmp.toString();
  returns = temp.split('\n');
  return (returns[Math.floor(Math.random()*returns.length)]);
}

function mashEmUp(){
  var lyricz = "";
  var songsToMash = new Array(Math.floor(Math.random()*6+2));
  
  for(var i=0;i<songsToMash.length;i++){
      var el = Math.floor(Math.random()*lyricFiles.length);
      songsToMash[i] = lyricFiles[el];
   }

   var index = 0;
   for(var i=0; i<Math.floor(Math.random()*20+14); i++){
      if(i%(Math.floor(Math.random()*3+5))==0)
        lyricz+='\n';
      lyricz+=(getRandomLine(songsToMash[index]))+'\n';
      (index < songsToMash.length-1)?index++:index=0;
   }

  console.log(lyricz);
  return lyricz;
}

module.exports = router;
