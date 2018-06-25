var gridArray = [0, 0, 0, 0, 0, 0, 0, 0, 0]
var gridArray2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var moveCount = 0
var isWinner = false
var turn = 1
var user1Score = 0
var user2Score = 0
var token1 = 'O'
var token2 = "X"
var boardSize = 3

const init = function() {
  for (var i = 0; i < 10; i++) {
    $('.box').text('')
  }
  gridArray = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  gridArray2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  $('#sideRight').html('')
  moveCount = 0
  isWinner = false
  turn = 1
}
const checkWinner = function() {
  let g = gridArray
  if (
    g[0] == g[1] && g[1] == g[2] && g[0] > 0 ||
    g[3] == g[4] && g[4] == g[5] && g[3] > 0 ||
    g[6] == g[7] && g[7] == g[8] && g[6] > 0 ||
    g[0] == g[3] && g[3] == g[6] && g[0] > 0 ||
    g[1] == g[4] && g[4] == g[7] && g[1] > 0 ||
    g[2] == g[5] && g[5] == g[8] && g[2] > 0 ||
    g[0] == g[4] && g[4] == g[8] && g[0] > 0 ||
    g[2] == g[4] && g[4] == g[6] && g[2] > 0
  ) {
    if (turn === 2) {
      user1Score++
      $('#user1Score').html(`Player1: ${user1Score}`)
      $('#sideRight').html(`<h1>Player1 Wins<h1>`)
    } else {
      user2Score++
      $('#user2Score').html(`Player2: ${user2Score}`)
      $('#sideRight').html(`<h1>Player2 Wins<h1>`)
    }
    return true
  } else {
    return false
  }
}
const checkWinner2 = function() {
  let g2 = gridArray2
  if (
    g2[0] == g2[1] && g2[1] == g2[2] && g2[2] == g2[3] && g2[0] > 0 ||
    g2[4] == g2[5] && g2[5] == g2[6] && g2[6] == g2[7] && g2[4] > 0 ||
    g2[8] == g2[9] && g2[9] == g2[10] && g2[10] == g2[11] && g2[8] > 0 ||
    g2[12] == g2[13] && g2[13] == g2[14] && g2[14] == g2[15] && g2[12] > 0 ||
    g2[0] == g2[4] && g2[4] == g2[8] && g2[8] == g2[12] && g2[0] > 0 ||
    g2[1] == g2[5] && g2[5] == g2[9] && g2[9] == g2[13] && g2[1] > 0 ||
    g2[2] == g2[6] && g2[6] == g2[10] && g2[10] == g2[14] && g2[2] > 0 ||
    g2[3] == g2[7] && g2[7] == g2[11] && g2[11] == g2[15] && g2[3] > 0 ||
    g2[0] == g2[5] && g2[5] == g2[10] && g2[10] == g2[15] && g2[0] > 0 ||
    g2[3] == g2[6] && g2[6] == g2[9] && g2[9] == g2[12] && g2[3] > 0
  ) {
    if (turn === 2) {
      user1Score++
      $('#user1Score').html(`Player1: ${user1Score}`)
      $('#sideRight').html(`<h1>Player1 Wins<h1>`)
    } else {
      user2Score++
      $('#user2Score').html(`Player2: ${user2Score}`)
      $('#sideRight').html(`<h1>Player2 Wins<h1>`)
    }
    return true
  } else {
    return false
  }
}

$(document).ready(function() {

  $('#buttonFour').on('click', function() {
    if (boardSize === 3) {
      for (var i = 1; i < 8; i++) {
        $('#grid').append(`<div id="${i + 9}" class="box" ></div>`)
      }
      $('#grid').removeClass('grid-container3')
      $('#grid').addClass('grid-container4')
      boardSize = 4
    }
  })

  $('#buttonThree').on('click', function() {
    if (boardSize === 4) {
      for (var i = 1; i < 8; i++) {
        $(`#${i+9}`).remove()
      }
      $('#grid').removeClass('grid-container4')
      $('#grid').addClass('grid-container3')
      boardSize = 3
    }
  })

  $('div').delegate('.box', 'click', function() {
    const token1 = $('#input1').val()
    const token2 = $('#input2').val()
    if (boardSize === 3) {
      if (isWinner === true) {
        return
      } else if (gridArray[(this.id) - 1] > 0) {
      } else {
        if (turn === 1) {
          $(this).text(token1)
          gridArray.splice((this.id - 1), 1, 1)
          turn = 2
          moveCount++
        } else {
          $(this).text(token2)
          gridArray.splice((this.id - 1), 1, 2)
          turn = 1
          moveCount++
        }
      }
      if (checkWinner()) {
        isWinner = true
      } else if (moveCount === 9) {
        $('#sideRight').html('<h1>DRAW<h1>')
      }

    } else if (boardSize === 4) {

      if (isWinner === true) {
        return
      } else if (gridArray2[(this.id) - 1] > 0) {
      } else {
        if (turn === 1) {
          $(this).text(token1)
          gridArray2.splice((this.id - 1), 1, 1)
          turn = 2
          moveCount++
        } else {
          $(this).text(token2)
          gridArray2.splice((this.id - 1), 1, 2)
          turn = 1
          moveCount++
        }
      }
      if (checkWinner2()) {
        isWinner = true
      } else if (moveCount === 16) {
        $('#sideRight').html('<h1>DRAW<h1>')
      }
    }
  })
  $('#reset').on('click', function() {
    init()
  })
})
