var clickedBoard  = require('./../js/game.js').clickedBoard;
var startGame     = require('./../js/game.js').startGame;
var setBoard      = require('./../js/game.js').setBoard;
var cards         = require('./../js/game.js').cards;


$(document).ready(function(){
  setupBoard( );

  $(".restart").on("click",function( ) {
    setupBoard( );
  });

  $(".card-img").on("click",function() {
    clickedBoard(parseInt(this.id));
  });

  function setupBoard( )
  {
    var storedBoard = [];
    var gameCards = cards( );
    var cardsLength = gameCards.length;
    for( var i = 0; i < cardsLength; i++ )
    {
      gameCards.push(gameCards[ i ]);
    }

    $(".card-img").each(function( ) {
      var card = gameCards[ Math.floor(Math.random( ) * gameCards.length) ];
      this.id = gameCards.length.toString();

      storedBoard.push([[card],[gameCards.length]]);

      var index = gameCards.indexOf(card);
      gameCards.splice(index, 1);
    });

    setBoard( storedBoard );
  }
});
