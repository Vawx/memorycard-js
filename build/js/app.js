(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var startGame = require('./../js/memory.js').startGame

var userClicks = 0;
var previousClickId = -1;
var currentClickId = -1;
var board = [];
var bPreventInput = false;
var gameCards = ["apples",
                 "avacado",
                 "berry",
                 "bucket",
                 "melon",
                 "pear",
                 "pepper",
                 "watermelon" ];

exports.cards = function( ) {
  return gameCards;
};

exports.setBoard = function( boardCards )
{
  board =[];
  board = boardCards;
  userClicks = 0;
  previousClickId = -1;
  currentClickId = -1;
  bPreventInput = false;
};

exports.clickedBoard = function( id )
{
  setImageFromID(id);
};

function setImageFromID( id )
{
  if( !bPreventInput )
  {
    $(".card-img").each(function()
    {
      if( parseInt( this.id ) === id )
      {
        for( var i = 0; i < board.length; i++ )
        {
          if(board[i][1][0] === id)
          {
            $(this).attr("src", "img/" + board[i][0][0] + ".png");
            userClicks += 1;
            if(userClicks === 2)
            {
              if($( "#" + previousClickId ).attr("src") === $("#" +id ).attr("src") )
              {
                // matching, remove from board list
                for(var j = 0; j < board.length; j++)
                {
                  if(board[j][0][1] === id)
                  {
                    var index = board.indexOf(board[j]);
                    board.splice(index, 1);
                  }
                }
                userClicks = 0;
              }
              else
              {
                bPreventInput = true;
                currentClickId = id;
                interval(delayBeforeHide, 800, 1);
                userClicks = 0;
              }
            }
            else
            {
                previousClickId = id;
            }
          }
        }
      }
    });
  }
}

  function delayBeforeHide( )
  {
    $("#" + previousClickId).attr("src", "img/background.png");
    $("#" + currentClickId).attr("src", "img/background.png");
    previousClickId = -1;
    userClicks = 0;
    bPreventInput = false;
  }

  /** Fix for setInterval( ) -- Thanks to: https://gist.github.com/richardkundl/7673746 */
  function interval(func, wait, times){
      var interv = function(w, t){
          return function(){
              if(typeof t === "undefined" || t-- > 0){
                  setTimeout(interv, w);
                  try{
                      func.call(null);
                  }
                  catch(e){
                      t = 0;
                      throw e.toString();
                  }
              }
          };
      }(wait, times);

      setTimeout(interv, wait);
  };

},{"./../js/memory.js":2}],2:[function(require,module,exports){


},{}],3:[function(require,module,exports){
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

},{"./../js/game.js":1}]},{},[3]);
