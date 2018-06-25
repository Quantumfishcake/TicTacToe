var gridArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var moveCount = 0
var isWinner = 0
var turn = 1
var user1Score = 0
var user2Score = 0
var token1 = 'O'
var token2 = "X"


// const fourbyfour = function () {
//   $('#grid').append($('div'))
// }

const init2 = function() {
  for (var i = 0; i < 10; i++) {
    $('.box').text('')
  }
  gridArray = [0,0,0,0,0,0,0,0,0]
  $('#sideRight').html('')
  moveCount = 0
  isWinner = 0
  turn = 1
}
const checkWinner = function() {
  if (
     gridArray[0] == gridArray[1] && gridArray[1] == gridArray[2] && gridArray[0] > 0 ||
     gridArray[3] == gridArray[4] && gridArray[4] == gridArray[5] && gridArray[3] > 0 ||
     gridArray[6] == gridArray[7] && gridArray[7] == gridArray[8] && gridArray[6] > 0 ||
     gridArray[0] == gridArray[3] && gridArray[3] == gridArray[6] && gridArray[0] > 0 ||
     gridArray[1] == gridArray[4] && gridArray[4] == gridArray[7] && gridArray[1] > 0 ||
     gridArray[2] == gridArray[5] && gridArray[5] == gridArray[8] && gridArray[2] > 0 ||
     gridArray[0] == gridArray[4] && gridArray[4] == gridArray[8] && gridArray[0] > 0 ||
     gridArray[2] == gridArray[4] && gridArray[4] == gridArray[6] && gridArray[2] > 0
   ){
    if (turn === 2){
      user1Score ++
      $('#user1Score').html(`O: ${user1Score}`)
      $('#sideRight').html(`<h1>Player1 Wins<h1>`)
    }
    else {
      user2Score ++
      $('#user2Score').html(`X: ${user2Score}`)
      $('#sideRight').html(`<h1>Player2 Wins<h1>`)
    }
    $('#one').addClass('line')
    return true
  } else {
    return false
  }
}
$(document).ready(function() {


  $('#four').on('click', function() {
    console.log('cat')
    $('#grid').append($('div'))
  })


    $('.box').on('click', function() {
      const token1 = $('#input1').val()
      const token2 = $('#input2').val()
      console.log(this.id)
      if (isWinner === 1) {
        console.log('click reset to play again')
        return
      } else if ($(this).text() === 'X' || $(this).text() === 'O') {
        console.log('already clicked')
      } else {
        if (turn === 1) {
          $(this).text(token1)
          gridArray.splice((this.id-1),1, 1)
          console.log(gridArray);
          turn = 2
          moveCount++
          console.log(token1);
        } else {
          $(this).text(token2)
          gridArray.splice((this.id-1),1, 2)
          console.log(gridArray);
          turn = 1
          moveCount++
          console.log(token1);
        }
      }
      if (checkWinner()) {
        isWinner = 1
      }
      else if (moveCount === 9) {
        $('#sideRight').html('<h1>DRAW<h1>')
      }
    })
    $('#reset').on('click', function() {
      init()
    })
  })
