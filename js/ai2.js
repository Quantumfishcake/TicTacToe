var gridArray = []
var turn = 1
let isWinner = false
var user1Score = 0
var user2Score = 0



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
      colElem = $(`<td id='${i}${count}'></td>`);
      rowElem.append(colElem);
      gridArray[i].push(0)
      count++
    }
    tableElem.append(rowElem);
  }
}
$(document).ready(function() {
  const board = parseInt($('#input3').val(), 10)
  createTable()
  let moveCount = 0
  let maxMoves = 9
  $('table').on('click', 'td', function() {
    console.log('help');


      console.log('cat');
      gridArray[this.id[0]][this.id[1]] = 1
      $(this).addClass('red')

      moveCount++


    // } else if (turn === 2 && (gridArray[this.id[0]][this.id[1]]) === 0 && isWinner === false) {
    //   gridArray[this.id[0]][this.id[1]] = 2
    //   $(this).addClass('black').text(token2)
    //   turn = 1
    //   moveCount++
    //   checkForWinner(2)
    //   if (moveCount === maxMoves && isWinner === false) {
    //     $('#sideRight').html('<h1>DRAW<h1>')
    //     return
    //   }

// updateArray()
    console.log(turn);
    console.log(moveCount);
    console.log(gridArray);


  })
  // $('#createNewButton').on('click', function() {
  //   const board = parseInt($('#input3').val(), 10)
  //   $('tr').remove()
  //   gridArray = []
  //   isWinner = false
  //   turn = 1
  //   moveCount = 0
  //   maxMoves = (board * board)
  //   $('#sideRight').html('')
  //   createTable(board)
  // })
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
  const newo = possibleOutcomes()

  isWinner = newo.some(function(element) {
    return element.every(function(item) {
      return item === marker
    })
  })
  if (isWinner && marker === 1) {
    user1Score++
    console.log(user1Score);
    $('#sideRight').html(`<h1>Player${marker} Wins<h1>`)
    $('#user1Score').html(`Player1: ${user1Score}`)
  } else if (isWinner && marker === 2) {
    user2Score++
    console.log(user2Score);
    $('#sideRight').html(`<h1>Player${marker} Wins<h1>`)
    $('#user2Score').html(`Player2: ${user2Score}`)
  }
}

// ai

const concate = function() {
  var gridArray2 = gridArray[0].concat(gridArray[1])
  var gridArray3 = gridArray2.concat(gridArray[2])

  return gridArray3
  console.log(gridArray3);
}


function indexOfEmpty() {
  var x = concate()
  var arrayOfEmptyIndexes = [];
  for (i = 0; i < x.length; i++)
    if (x[i] === 0)
      arrayOfEmptyIndexes.push(i);
  return arrayOfEmptyIndexes;
}



// const filterer = function () {
//   var array4 = []
//   for (var i = 0; i < gridArray.length; i++) {
//    array4.push(gridArray[i].filter(function(item) {
//         return(item != 1 && item != 2)
//       }));
//   console.log(array4);
//   }
//
// }


//
// const checkForWinner2 = function (){
//   var gridarray99 =  gridarray.add[index[i]]
//   if checkwinner(99) = true
//   points + 10
//   else if checkwinner(99) = false
//   points - 10
//   else points 0
// }


const createArrayToCheck = function(num, token) {
  let concat = concate()
  console.log(concat);
  let arrayOfEmptyIndexes = indexOfEmpty()
  console.log(arrayOfEmptyIndexes);
  let currentIndex = arrayOfEmptyIndexes[num]
  console.log(currentIndex);
  let z = concat[currentIndex]
  console.log(z);
  concat.splice(currentIndex, 1, token)
  console.log(concat);
  return concat

}


// if checkwinner(x)  is true => points +20
// if checkwinner(o) is true => points + 10
// else do random


const checkMove = function(num, token) {
  let points = 0
  let x = createArrayToCheck(num, token)
  console.log(x);
  if (token === 2 && checkWinner(x, token) === true) {

    points += 50
    return points
    console.log(points);

  }
  if (token === 1 && checkWinner(x, token) === true) {

    points += 50
    console.log(points);
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
      console.log(i);
      return i
    }
  }

  return -1
    // var rand = (arrayOfEmptyIndexes[Math.floor(Math.random() * arrayOfEmptyIndexes.length)])
    // console.log(rand)
    // var rand2 = arrayOfEmptyIndexes.indexOf(rand)
    //   console.log(rand2);
    // return rand2


}




const returnTo3Arrays = function(array) {
  var newArray = []
  newArray.push(array.slice(0, 3), array.slice(3, 6), array.slice(6, 9))
  console.log(newArray)
  return newArray
}

const aiMove = function() {
  let arrayOfEmptyIndexes = indexOfEmpty()
  console.log(arrayOfEmptyIndexes);
  let x = pickSpotToMove(1)
  let y = pickSpotToMove(2)
    console.log(x);
    console.log(y);
  if (y >= 0) {
    let z = concate()
    let p = arrayOfEmptyIndexes[y]
    console.log(p);


    z.splice(p, 1, 2)
    console.log(z);
    gridArray = returnTo3Arrays(z)
    console.log(gridArray);
    return gridArray


    //position = x
  }

else if ( x >= 0){
    let z = concate()
    let p = arrayOfEmptyIndexes[x]
    console.log(p);


    z.splice(p, 1, 2)
    console.log(z);
    gridArray = returnTo3Arrays(z)
    console.log(gridArray);
    return gridArray


  }

else {
  var rand = (arrayOfEmptyIndexes[Math.floor(Math.random() * arrayOfEmptyIndexes.length)])
  console.log(rand)
  var rand2 = arrayOfEmptyIndexes.indexOf(rand)
    console.log(rand2);
    let z = concate()
    let p = arrayOfEmptyIndexes[rand2]
    console.log(p);


    z.splice(p, 1, 2)
    console.log(z);
    gridArray = returnTo3Arrays(z)

    return gridArray
}
  //   else if (y > 0) {
  //     console.log('cats');
  //     let z = concate()
  //     let p = arrayOfEmptyIndexes[y]
  //     console.log(p);
  //
  //
  //     z.splice(p, 1, 2)
  //   console.log(z);
  // gridArray = returnTo3Arrays(z)
  // console.log(gridArray);
  // return gridArray
  //
  //   }
  // else if (y > 0){
  //   //position = y
  // }
  // else {
  //   //position random
  // }
}

const updateArray = function() {
  gridArray= aiMove()

  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (gridArray[i][j] == 2) {
        console.log('tom');
        $(`#${i}${j}`).addClass('black')
      }
    }
  }
  return gridArray
}









//
// const emptySpots = function(...gridArray) {
//   return element.filter(function(item) {
//     return item != 1 && item != 2;
//   });
// };
