var gridArray = []
var turn = 1
let isWinner = false
var user1Score = 0
var computerScore = 0

const checkWinner = function(array, token) {
  let g = array
  if (
    g[0] === token && g[0] == g[1] && g[1] == g[2] && g[0] > 0 ||
    g[3] === token && g[3] == g[4] && g[4] == g[5] && g[3] > 0 ||
    g[6] === token && g[6] == g[7] && g[7] == g[8] && g[6] > 0 ||
    g[0] === token && g[0] == g[3] && g[3] == g[6] && g[0] > 0 ||
    g[1] === token && g[1] == g[4] && g[4] == g[7] && g[1] > 0 ||
    g[2] === token && g[2] == g[5] && g[5] == g[8] && g[2] > 0 ||
    g[0] === token && g[0] == g[4] && g[4] == g[8] && g[0] > 0 ||
    g[2] === token && g[2] == g[4] && g[4] == g[6] && g[2] > 0
  ) {
    return true
  } else {
    return false
  }
}

function createTable() {
  var tableElem, rowElem, colElem, count = 0,
    count2 = 0;
  tableElem = $('table');
  for (var i = 0; i < 3; i++) {
    rowElem = $(`<tr id='row${count2}'></tr>`);
    gridArray.push([])
    count2++
    count = 0
    for (var j = 0; j < 3; j++) {
      colElem = $(`<td id='${i}${count}' class='easytd'></td>`);
      rowElem.append(colElem);
      gridArray[i].push(0)
      count++
    }
    tableElem.append(rowElem);
  }
}
$(document).ready(function() {
  createTable()
  let moveCount = 0
  let maxMoves = 9
  $('table').on('click', 'td', function() {
    if ((gridArray[this.id[0]][this.id[1]]) === 0 && isWinner === false) {
      gridArray[this.id[0]][this.id[1]] = 1
      $(this).addClass('red')
      moveCount++
      if (moveCount === 5) {
        if (checkWinner(concate2(gridArray), 1)) {
          $('#sideRight').html('<h1>Winner<h1>')

          return
        } else if (checkWinner(concate2(gridArray), 2)) {
          $('#sideRight').html('<h1>Looser<h1>')

          return
        } else {
          $('#sideRight').html('<h1>Draw<h1>')
          return
        }
      }
      updateArray()
      if (checkWinner(concate2(gridArray), 1)) {
        isWinner = true
        $('#sideRight').html('<h1>Winner<h1>')
        user1Score += 1
        $('#user1Score').html(`Player1: ${user1Score}`)
        return
      }
      if (checkWinner(concate2(gridArray), 2)) {
        isWinner = true
        $('#sideRight').html('<h1>Looser<h1>')
        computerScore += 1
        $('#user2Score').html(`Computer: ${computerScore}`)
        return
      }
    }

    $('#reset').on('click', function() {
      gridArray = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ]
      $('td').removeClass('red')
      $('td').removeClass('black')
      isWinner = false
      moveCount = 0
      $('#sideRight').html('')
    })
  })
})

const possibleOutcomes = function() {
  const rows = gridArray
  const cols = math.transpose(gridArray)
  const diag = math.diag(gridArray)
  const diag2 = math.diag(gridArray.slice().reverse());
  const possibleOutcomes = [...rows, ...cols, diag, diag2]
  return possibleOutcomes
}

const checkForWinner = function(marker) {
  const possibleOutcomes2 = possibleOutcomes()
  isWinner = possibleOutcomes2.some(function(element) {
    return element.every(function(item) {
      return item === marker
    })
  })
  if (isWinner && marker === 1) {
    user1Score++
    $('#sideRight').html(`<h1>Player${marker} Wins<h1>`)
    $('#user1Score').html(`Player1: ${user1Score}`)
  } else if (isWinner && marker === 2) {
    user2Score++
    $('#sideRight').html(`<h1>Player${marker} Wins<h1>`)
    $('#user2Score').html(`Player2: ${user2Score}`)
  }
}
//ai
const concate2 = function(array) {
  var gridArray2 = array[0].concat(array[1])
  var gridArray3 = gridArray2.concat(gridArray[2])
  return gridArray3
}

const concate = function() {
  var gridArray2 = gridArray[0].concat(gridArray[1])
  var gridArray3 = gridArray2.concat(gridArray[2])
  return gridArray3
}

function indexOfEmpty() {
  var x = concate()
  var arrayOfEmptyIndexes = [];
  for (i = 0; i < x.length; i++)
    if (x[i] === 0)
      arrayOfEmptyIndexes.push(i);
  return arrayOfEmptyIndexes;
}

const createArrayToCheck = function(num, token) {
  let concat = concate()
  let arrayOfEmptyIndexes = indexOfEmpty()
  let currentIndex = arrayOfEmptyIndexes[num]
  let z = concat[currentIndex]
  concat.splice(currentIndex, 1, token)
  return concat
}
const checkMove = function(num, token) {
  let points = 0
  let x = createArrayToCheck(num, token)
  if (token === 2 && checkWinner(x, token) === true) {
    points += 50
    return points
  }
  if (token === 1 && checkWinner(x, token) === true) {
    points += 50
    return points
  }
}
const pickSpotToMove = function(token) {
  let points = 0
  let x = 0
  let concat = concate()
  let arrayOfEmptyIndexes = indexOfEmpty()
  for (var i = 0; i < arrayOfEmptyIndexes.length; i++) {
    points = checkMove(i, token)
    if (points > 20) {
      return i
    }
  }
  return -1
}
const returnTo3Arrays = function(array) {
  var newArray = []
  newArray.push(array.slice(0, 3), array.slice(3, 6), array.slice(6, 9))
  return newArray
}
const aiMove = function() {
  let arrayOfEmptyIndexes = indexOfEmpty()
  let x = pickSpotToMove(1)
  let y = pickSpotToMove(2)
  if (y >= 0) {
    let z = concate()
    let p = arrayOfEmptyIndexes[y]
    z.splice(p, 1, 2)
    gridArray = returnTo3Arrays(z)
    return gridArray
  } else if (x >= 0) {
    let z = concate()
    let p = arrayOfEmptyIndexes[x]
    z.splice(p, 1, 2)
    gridArray = returnTo3Arrays(z)
    return gridArray
  } else {
    var rand = (arrayOfEmptyIndexes[Math.floor(Math.random() * arrayOfEmptyIndexes.length)])
    var rand2 = arrayOfEmptyIndexes.indexOf(rand)
    let z = concate()
    let p = arrayOfEmptyIndexes[rand2]
    z.splice(p, 1, 2)
    gridArray = returnTo3Arrays(z)
    return gridArray
  }
}
const updateArray = function() {
  gridArray = aiMove()
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (gridArray[i][j] == 2) {
        $(`#${i}${j}`).addClass('black')
      }
    }
  }
}
