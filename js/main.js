//const playerOne = 'X'
//const playerTwo = 'O'
var moveCount = 0
var isWinner = 0
var check = '0'
var turn = 1

const init = function() {
  for (var i = 0; i < 10; i++) {
    $(`.${i}`).text('')
  }
}
const checkWinner = function(n) {
  if (($('.1').text() === n && $('.2').text() === n && $('.3').text() === n) || (($('.4').text() === n && $('.5').text() === n && $('.6').text() === n)) || ($('.7').text() === n && $('.8').text() === n && $('.9').text() === n) || ($('.1').text() === n && $('.4').text() === n && $('.7').text() === n) || ($('.2').text() === n && $('.5').text() === n && $('.8').text() === n) || ($('.3').text() === n && $('.6').text() === n && $('.9').text() === n) || ($('.1').text() === n && $('.5').text() === n && $('.9').text() === n) || ($('.3').text() === n && $('.5').text() === n && $('.7').text() === n)) {
    alert('you win')
    return true
  } else {
    return false
  }
}
$(document).ready(function() {
    $('div#one').on('click', function() {
      if (isWinner === 1) {
        console.log('click reset to play again')
      } else if ($(this).text() === 'X' || $(this).text() === 'O') {
        console.log('already clicked')
      } else {
        if (turn === 1) {
          $(this).text('O')
          turn = 2
          moveCount++
          check = 'O'
          console.log(moveCount)
          console.log(isWinner)
        } else {
          $(this).text('X')
          turn = 1
          check = 'X'
          moveCount++
          console.log(moveCount)
          console.log(isWinner)
        }
      }
      if (moveCount === 9) {
        alert('game over')
      }
      if (checkWinner(check)) {
        console.log('winner')
        isWinner = 1
      }
    })
    $('#reset').on('click', function() {
      init()
      moveCount = 0
      isWinner = 0
    })
  })
