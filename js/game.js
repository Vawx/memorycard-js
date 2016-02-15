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
