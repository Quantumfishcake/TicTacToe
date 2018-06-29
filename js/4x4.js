var gridArray = []
var turn = 1
let isWinner = false
var user1Score = 0
var user2Score = 0
//create the table
function createTable(a) {
  var tableElem, rowElem, colElem, count = 0,
    count2 = 0;
  tableElem = $('table');
  for (var i = 0; i < a; i++) {
    rowElem = $(`<tr id='row${count2}'></tr>`);
    gridArray.push([])
    count2++
    count = 0
    for (var j = 0; j < a; j++) {
      colElem = $(`<td id='${i}, ${count}'></td>`);
      rowElem.append(colElem);
      gridArray[i].push(0)
      count++
    }
    tableElem.append(rowElem);
  }
}

$(document).ready(function() {
  const board = parseInt($('#input3').val(), 10)
  createTable(board)
  let moveCount = 0
  let maxMoves = board * board
  $('table').on('click', 'td', function() {
    let token1 = $('#input1').val()
    let token2 = $('#input2').val()
    //if click passes conditions change grid and add color
    if (turn === 1 && (gridArray[this.id[0]][this.id[3]]) === 0 && isWinner === false) {
      gridArray[this.id[0]][this.id[3]] = 1
      $(this).addClass('red').text(token1)
      turn = 2
      moveCount++
      checkForWinner(1)
      if (moveCount === maxMoves && isWinner === false) {
        $('#sideRight').html('<h1>DRAW<h1>')
        $('#sideRight').append('<img id="theImg" class="winImg" src="images/draw.jpeg" />')
        return
      }
    } else if (turn === 2 && (gridArray[this.id[0]][this.id[3]]) === 0 && isWinner === false) {
      gridArray[this.id[0]][this.id[3]] = 2
      $(this).addClass('black').text(token2)
      turn = 1
      moveCount++
      checkForWinner(2)
      if (moveCount === maxMoves && isWinner === false) {
        $('#sideRight').append('<img id="theImg" class="winImg" src="images/draw.jpeg" />')
        $('#sideRight').html('<h1>DRAW<h1>')
        return
      }
    }
  })
//reset game
  $('#reset').on('click', function() {
    const board = parseInt($('#input3').val(), 10)
    $('tr').remove()
    gridArray = []
    isWinner = false
    turn = 1
    moveCount = 0
    maxMoves = (board * board)
    $('#sideRight').html('')
    createTable(board)
  })
})
//check if there is a winner
const checkForWinner = function(marker) {
  const rows = gridArray
  //make array with cols and diags
  const cols = math.transpose(gridArray)
  const diag = math.diag(gridArray)
  const diag2 = math.diag(gridArray.slice().reverse());
  //concat all the different arrays together
  const possibleOutcomes = [...rows, ...cols, diag, diag2]
  //check if some of the new arrays matches win condition
  isWinner = possibleOutcomes.some(function (element) {
    return element.every(function (item) {
      return item === marker
    })
  })
  if (isWinner && marker === 1) {
    user1Score++
    console.log(user1Score);
    $('#sideRight').html(`<h1>Player${marker} Wins<h1>`)
    $('#sideRight').append('<img id="theImg" class="winImg" src="images/win.jpg" />')
    // $('#sideRight').add('img').src('/images/win.jpg')
    $('.red').addClass('neon').removeClass('red')
    $('#user1Score').html(`Player1: ${user1Score}`)
  } else if (isWinner && marker === 2){
    user2Score++
    console.log(user2Score);
  $('#sideRight').html(`<h1>Player${marker} Wins<h1>`)
  $('#user2Score').html(`Player2: ${user2Score}`)
      $('.black').removeClass('black').addClass('neon')
}
}
