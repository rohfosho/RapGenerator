//console.log("hello world");
function getNewRap(){
  $.ajax({
    url: '/api/',
    type: 'GET',
    success: function(data){
       $('.generatedRapList').empty();
       var temp = data.split('\n');
       var lol = 0;
       temp.forEach(function(element){
         console.log(element);
         if(lol > 0 && lol < temp.length-1)
          $('.generatedRapList').append('<li>'+element+'</li>'); 
        
         lol++;
       });
       //$('.generatedRap').text(data);
    },
    error: function(error){
      console.log(error.toString());
    }
  }); 
}
