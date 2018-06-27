var gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var count = 0;
var round = 0;
const player1 = "X";
const ai = "O";
let finished = false

const checkWinner = function(board, player) {
  let b = board
  let p = player
  if (
    (b[0] == p && b[1] == p && b[2] == p) ||
    (b[3] == p && b[4] == p && b[5] == p) ||
    (b[6] == p && b[7] == p && b[8] == p) ||
    (b[0] == p && b[3] == p && b[6] == p) ||
    (b[1] == p && b[4] == p && b[7] == p) ||
    (b[2] == p && b[5] == p && b[8] == p) ||
    (b[0] == p && b[4] == p && b[8] == p) ||
    (b[2] == p && b[4] == p && b[6] == p)
  ) {
    return true
  } else {
    return false
  }
}

function minimax(newBoardArray, player) {
  count++;
  const emptySpots = function(newBoardArray) {
    return newBoardArray.filter(function(item) {
      return item != "X" && item != "O";
    });
  };
  let array = emptySpots(newBoardArray);
  if (checkWinner(newBoardArray, player1)) {
    return {
      score: -10
    };
  } else if (checkWinner(newBoardArray, ai)) {
    return {
      score: 10
    };
  } else if (array.length === 0) {
    return {
      score: 0
    };
  }

  var moves = [];
  for (var i = 0; i < array.length; i++) {
    var move = {};
    move.index = newBoardArray[array[i]];
    newBoardArray[array[i]] = player;

    if (player == ai) {
      var g = minimax(newBoardArray, player1);
      move.score = g.score;
    } else {
      var g = minimax(newBoardArray, ai);
      move.score = g.score;
    }
    newBoardArray[array[i]] = move.index;
    moves.push(move);
  }

  var bestMove;
  if (player === ai) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}

$(document).ready(function() {





  $("div").on('click','.box', function() {
    console.log('hi');
    if (!isNaN(gameBoard[this.id]) && finished === false) {
      gameBoard[this.id] = player1;
      $(this).addClass('red')
      round++
      if (round >= 9) {
        $('.results').html('Draw')
        return;
      } else {
        round++;
        var bestMoveAi = minimax(gameBoard, ai).index;
        $(`#${bestMoveAi}`).addClass('black')
        gameBoard[bestMoveAi] = ai;
        if (checkWinner(gameBoard, ai)) {
          $('.results').html('loose')
          finished = true
          return;
        }
      }
    }
  })

$('#reset').on('click', function (){
gameBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
round = 0
finished = false
$('.box').removeClass('red')
$('.box').removeClass('black')
$('.results').html("")

})


})
