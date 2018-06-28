var gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var count = 0;
var round = 0;
const player1 = "X";
const ai = "O";
let finished = false
// check winner function
const checkWinner = function(board, player) {
  let b = board
  let p = player
  if (
    b[0] == p && b[1] == p && b[2] == p ||
    b[3] == p && b[4] == p && b[5] == p ||
    b[6] == p && b[7] == p && b[8] == p ||
    b[0] == p && b[3] == p && b[6] == p ||
    b[1] == p && b[4] == p && b[7] == p ||
    b[2] == p && b[5] == p && b[8] == p ||
    b[0] == p && b[4] == p && b[8] == p ||
    b[2] == p && b[4] == p && b[6] == p
  ) {
    return true
  } else {
    return false
  }
}
//function that returns best ai move
function minimax(newBoardArray, player) {
  count++;
  //get available spots in the array
  const emptySpots = function(newBoardArray) {
    //filter out anything that returns x or o
    return newBoardArray.filter(function(item) {
      return item != "X" && item != "O";
    });
  };
  //take the array and check if there is a winner and return points accordingly
  let array = emptySpots(newBoardArray);
  //if the move results in human winning remove points
  if (checkWinner(newBoardArray, player1)) {
    return {
      score: -50
    };
    //if move results in computer winning give points
  } else if (checkWinner(newBoardArray, ai)) {
    return {
      score: 50
    };
    //if no available spots return 0
  } else if (array.length === 0) {
    return {
      score: 0
    };
  }

  var moves = [];
  for (var i = 0; i < array.length; i++) {
    var move = {};
    //assign the index of the move in the move object
    move.index = newBoardArray[array[i]];
    //change the empty spot to the token of the ai or the player
    newBoardArray[array[i]] = player;

    if (player == ai) {
      //run function for the player
      var g = minimax(newBoardArray, player1);
      move.score = g.score;
    } else {
      // run function for the ai
      var g = minimax(newBoardArray, ai);
      move.score = g.score;
    }
    newBoardArray[array[i]] = move.index;
    moves.push(move);

  }

  var bestMove;
  //iterates through all moves to see which returns most points
  if (player === ai) {
    var bestScore = -5000000;
    for (var i = 0; i < moves.length; i++) {
      //if the score returned from current array > best score, make it the new best score
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  else {
    var bestScore = 5000000;
    for (var i = 0; i < moves.length; i++) {
      //find the lowest scoring move to check where to block human
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}
// player1 click
$(document).ready(function() {
  $("div").on('click','.box', function() {
    if (!isNaN(gameBoard[this.id]) && finished === false) {
      gameBoard[this.id] = player1;
      $(this).addClass('red')
      round++
      if (round >= 9) {
        $('.results').html('Draw')
          $('#sideRight').html('<h1>Draw<h1>')
        return;
      } else {
        round++;
        //get best ai move and make the move
        var bestMoveAi = minimax(gameBoard, ai).index;
        $(`#${bestMoveAi}`).addClass('black')
        gameBoard[bestMoveAi] = ai;
        if (checkWinner(gameBoard, ai)) {
            $('#sideRight').html('<h1>Looser<h1>')
          finished = true
          return;
        }
      }
    }
  })
// reset board for new game
$('#reset').on('click', function (){
gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
round = 0
finished = false
$('.box').removeClass('red')
$('.box').removeClass('black')
$('#sideRight').html("")

})


})
