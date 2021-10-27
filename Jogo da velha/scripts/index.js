const $switcherBot = document.querySelector('.switcher-bot')

const $boardItemList = document.querySelectorAll('.board-item')

const $score1 = document.querySelector('.score-1')
const $score2 = document.querySelector('.score-2')

const $fieldPlayer1 = document.querySelector ('.player-field-1')
const $fieldPlayer2 = document.querySelector ('.player-field-2')

const $winnerText = document.querySelector ('.winner-text')

const $matchHistorylist = document.querySelector('.match-history--list')

const $historyMoveList =document.querySelector ('.history-move-list')



const line1 = [$boardItemList[0], $boardItemList[1], $boardItemList[2]]
const line2 = [$boardItemList[3], $boardItemList[4], $boardItemList[5]]
const line3 = [$boardItemList[6], $boardItemList[7], $boardItemList[8]]

const colum1 = [$boardItemList[0], $boardItemList[3], $boardItemList[6]]
const colum2 = [$boardItemList[1], $boardItemList[4], $boardItemList[7]]
const colum3 = [$boardItemList[2], $boardItemList[5], $boardItemList[8]]

const diagonal1 = [$boardItemList[0], $boardItemList[4], $boardItemList[8]]
const diagonal2 = [$boardItemList[2], $boardItemList[4], $boardItemList[6]] 

const linesToVerify = [line1, line2, line3, colum1, colum2, colum3, diagonal1, diagonal2]

const historyMoveList = []

let currentMove= 'X'
let winner = ''
let scorePlayer1 = 0
let scorePlayer2 = 0
let game = true
let bot = false
// let currentMoveIndex = 0

function toggleMoveVar(){
if (currentMove == 'O'){
    currentMove = 'X'
    } else if (currentMove =='X'){
    currentMove = 'O'
    }
}
function printMove($boardItem){
    $boardItem.textContent = currentMove

}

function showWinnerOnBoard(boardItemList){
for(const lineItem of boardItemList){
    lineItem.classList.add('won')
    
    setTimeout(function(){
        lineItem.classList.remove('won')
    },1000)
    }
}

function verifyWinner(){
    for (const line of linesToVerify){
        if (line[0].textContent && line[0].textContent == line[1].textContent && line[1].textContent==line[2].textContent){
            winner = currentMove
            showWinnerOnBoard(line)
            
        }
    }
    const itsFull = checkBoard()
 
    if (!winner && itsFull){
    winner = 'draw'
    }
}

function resetBoard(){
    for(const $boardItem of $boardItemList){
            $boardItem.textContent = ''
        }
    }
    


function resetVariables(){
     currentMove= 'X'
     winner = ''
     historyMoveList.length = 0

}

function checkBoard(){
    let itsFull = true

 for(const $boardItem of $boardItemList){
    if (!$boardItem.textContent ){
        itsFull = false
    }
}
return itsFull
}

function addPoint(player, quantity){
    console.log(player)
    if (player === 'X'){
        scorePlayer1 += quantity
    } else if (player === 'O'){
        scorePlayer2 += quantity
    }
}

function printWinnerName(){
  if (winner === 'X'){
      const value = $fieldPlayer1.value
      $winnerText.textContent = value + ' venceu!'
  } else if (winner === 'O'){
     const value = $fieldPlayer2.value + ' venceu!'

     $winnerText.textContent = value
  } else if (winner === 'draw') {
      $winnerText.textContent = 'Empatou!'
 }


}


function printPoint(){
    if(scorePlayer1 < 10){
        $score1.textContent = '0' +scorePlayer1
    }else{
        $score1.textContent = scorePlayer1
    }
    if(scorePlayer2 < 10){
        $score2.textContent = '0' + scorePlayer2
    }else{
        $score2.textContent = scorePlayer2
    }

}

function stopGameForAMoment(time){
game = false 
setTimeout(function(){
    game = true
},time)
}

function getScenery(){
    const scenery = []

    for(const $boardItem of $boardItemList){
        const move = $boardItem.textContent
        scenery.push(move)
    }
    return scenery
}

const buildHistoryMoveList = () => {
    const scenery = getScenery()
   historyMoveList.push(scenery)
   console.log(historyMoveList)
}

function printHistoryMatch(){
    const scenery = getScenery() 

    const _container = document.createElement('li')
    _container.classList.add('math-history-item')

    const _winnerWrapper = document.createElement('div')
    _winnerWrapper.classList.add('winner-wrapper')

    const _title = document.createElement('strong')
    _title.classList.add('winner-history-title')
    _title.classList.add('title--green-small')
    _title.classList.add('title')
    _title.textContent = 'Vencedor'

    const _name = document.createElement ('span')
    _name.classList.add('winner-histoy-name')
    _name.textContent = getPlayerName(winner)

    const _sceneryLabel = document.createElement('span')
    _sceneryLabel.classList.add('scenery-label')
    _sceneryLabel.textContent = 'Cenário'

    const _miniBorad = document.createElement ('div')
    _miniBorad.classList.add('mini-board')

    _container.appendChild(_winnerWrapper)
    _container.appendChild(_sceneryLabel)
    _container.appendChild(_miniBorad)
    _winnerWrapper.appendChild(_title)
    _winnerWrapper.appendChild(_name)

    

    $matchHistorylist.appendChild(_container)
   
    for(const move of scenery){
        const _move = document.createElement('span')
        _move.classList.add('mini-board-item')
        _move.textContent = move
        

        _miniBorad.appendChild(_move)

    }
}

const getMoveQuantity = () => {
    let index = -1

    for(const $boardItem of $boardItemList){
   if ($boardItem.textContent) index++
}
        return index
}
const printScenery = (scenery) => {
    for(let i = 0; i < scenery.length; i++){
        const $boardItem = $boardItemList[i]
        const move = scenery[i]

        $boardItem.textContent = move 
    }
}

function printHistoryMove(move, fieldIndex){
    const playerName = getPlayerName(move)
    const currentMoveIndex = getMoveQuantity(  )

    const _historyMove = document.createElement('li')
    _historyMove.classList.add('history-move')
    _historyMove.setAttribute('index', currentMoveIndex)

    const _historyMoveLetter = document.createElement('span')
    _historyMoveLetter.classList.add('history-move-letter')
    _historyMoveLetter.textContent = move

    const _historyMoveTextWrapper = document.createElement('div')
    _historyMoveTextWrapper.classList.add('history-move-text-wrapper')
    
    const _historyMovePlayerName = document.createElement('h3')
    _historyMovePlayerName.classList.add('history-move-player-name')
    _historyMovePlayerName.textContent = playerName

    const _historyMovePositionText = document.createElement('span')
    _historyMovePositionText.classList.add('history-move-position-text')
    _historyMovePositionText.textContent = fieldIndex

    _historyMove.appendChild(_historyMoveLetter)
    _historyMove.appendChild(_historyMoveTextWrapper)
    _historyMoveTextWrapper.appendChild(_historyMovePlayerName)
    _historyMoveTextWrapper.appendChild(_historyMovePositionText)

    _historyMove.addEventListener('click', () =>{
        const  myScenery = historyMoveList[currentMoveIndex]

        printScenery(myScenery)
    })

    $historyMoveList.appendChild(_historyMove)
    
}

function getPlayerName(playerMove){
const player1Value = $fieldPlayer1.value
const player2Value = $fieldPlayer2.value

if(playerMove ==='X'){
    return player1Value
} else if (playerMove === 'O'){
    return player2Value
}
}

function clearElement(className){
const $element = document.querySelector(className)

$element.innerHTML = ''
}

function getPositionText(index){
   const dictionaryText = ['Primeiro Campo', 'Segundo Campo', 'Terceiro Campo', 'Quarto Campo', 'Quinto Campo', 'Sexto Campo', 'Setimo Campo', 'Oitavo Campo', 'Nono Campo']

   return dictionaryText[index]
}

function botMoveIndex(){
   return Math.floor(Math.random()* 9)
}

function botPlay(){
    const botMove = botMoveIndex()
    const $boardItem = $boardItemList [botMove]
    const itsFull = checkBoard()
    
    if($boardItem.textContent && !itsFull) return botPlay()

    const positionText = getPositionText(botMove)
        
    if($boardItem.textContent || !game) return
    printMove($boardItem)
    verifyWinner()
    printHistoryMove(currentMove,positionText)
    buildHistoryMoveList()
    toggleMoveVar()
    if(winner) 
    if (winner) {
    stopGameForAMoment(1000)
     setTimeout(resetBoard, 1000)
     setTimeout(function(){
   clearElement('.history-move-list')
     },1000)
     addPoint(winner,1)
     printWinnerName()
     resetVariables()
     printPoint()
     printHistoryMatch()
    
 }  
}

for(let i = 0; i < $boardItemList.length; i++){
    const $boardItem = $boardItemList[i]

    
    $boardItem.addEventListener('click',function(){
        
        const positionText = getPositionText(i)
        
        if($boardItem.textContent || !game) return
        printMove($boardItem)
        verifyWinner()
        printHistoryMove(currentMove,positionText)
        buildHistoryMoveList()
        toggleMoveVar()
        if(winner) 
        if (winner) {
            stopGameForAMoment(1000)
             setTimeout(resetBoard, 1000)
             setTimeout(function(){
           clearElement('.history-move-list')
             },1000)
             addPoint(winner,1)
             printWinnerName()
             resetVariables()
             printPoint()
             printHistoryMatch()
            
         }  
        bot && botPlay()
   })
             
         
     }


$switcherBot.addEventListener('click',function(){
    $switcherBot.classList.toggle('active')
    bot = !bot
}) 

const itsFull = checkBoard()

