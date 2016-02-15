var startGame = require('./../js/game.js').startGame;

$(document).ready(function(){

  $(".card").on("click",function() {
    console.log("click Card " + this.id );
  });
});
