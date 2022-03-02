let xTurn = true
let gameState = {}
let turnsLeft = false
let stopClick = false
const startButton = document.querySelector("#play")
const gameArea = document.querySelector('#game')

function display(msg) {
  let displayArea = document.querySelector("#display")
  displayArea.textContent = msg
}

function startGame() {
  xTurn = true
  gameState = {}
  turnsLeft = false
  stopClick = false
  display("X has First Turn")
  startButton.style.visibility = "hidden"
  gameArea.style.outline = "5px solid white"
  squares.forEach(square => {
    gameState[square.id] = ""
    if (square.firstChild) {
      square.removeChild(square.firstChild)
    }
  })
}

function end(winner) {
  stopClick = true
  if (winner) {
    display(`${winner} Won!`)
  } else {
    display("Cats Game!")
  }
  startButton.style.visibility = "visible"
  gameArea.style.outline = "5px solid red"
}

function checkGame(gs) {
  let winner = false
  let rows = [gs['div1'] + gs['div2'] + gs['div3'], gs['div4'] + gs['div5'] + gs['div6'], gs['div7'] + gs['div8'] + gs['div9'], gs['div1'] + gs['div4'] + gs['div7'], gs['div2'] + gs['div5'] + gs['div8'], gs['div3'] + gs['div6'] + gs['div9'], gs['div1'] + gs['div5'] + gs['div9'], gs['div3'] + gs['div5'] + gs['div7']]
  rows.forEach(row => {
    if (row.length < 3) {
      turnsLeft = true
    }
    if (row == 'XXX') {
      winner = 'X'
    }
    if (row == 'OOO') {
      winner = 'O'
    }
  })
  return winner
}
function squareClick (div) {
  if (gameState[div] || stopClick){
    return
  }
  let marker = document.createElement('h2')
  if (xTurn) {
    marker.textContent = "X"
    gameState[div] = "X"
    display("O's Turn")
  } else {
    marker.textContent = "O"
    gameState[div] = "O"
    display("X's Turn")
  }
  document.getElementById(div).appendChild(marker)
  xTurn = !xTurn
  turnsLeft = false //set false then check if there are open spaces in checkGame
  let winner = checkGame(gameState)
  if (winner || !turnsLeft) {
    end(winner)
}
}
const squares = document.querySelectorAll(".squares")
squares.forEach(sq => {
  sq.addEventListener('click', function(){
    squareClick(sq.id)
  })
  gameState[sq.id] = ""
})
startButton.addEventListener('click', function(){
  startGame()
})
