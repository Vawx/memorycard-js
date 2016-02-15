var clickedBoard  = require('./../js/game.js').clickedBoard;
var startGame     = require('./../js/game.js').startGame;
var setBoard      = require('./../js/game.js').setBoard;
var cards         = require('./../js/game.js').cards;


$(document).ready(function(){
  setupBoard( );

  $(".card-img").on("click",function() {
    clickedBoard(parseInt(this.id));
  });

  function setupBoard( )
  {
    var storedBoard = [];
    var usingCards = cards( );
    var cardsLength = usingCards.length;
    for( var i = 0; i < cardsLength; i++ )
    {
      usingCards.push(usingCards[ i ]);
    }

    $(".card-img").each(function( ) {
      var card = usingCards[ Math.floor(Math.random( ) * usingCards.length) ];
      this.id = usingCards.length.toString();
      $(this).attr("src", "img/background.png");

      storedBoard.push([[card],[usingCards.length]]);

      var index = usingCards.indexOf(card);
      usingCards.splice(index, 1);
    });

    setBoard( storedBoard );
  }
});
