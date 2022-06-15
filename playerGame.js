//Selecting the elements by declaring variables
// #p1Score
// #p2Score
// .playingTo
// #inputScore
// #p1Btn
// #p12tn
// #resetBtn

const p1ScoreElm = document.querySelector('#p1Score')
const p2ScoreElm = document.querySelector('#p2Score')
const playingToElm = document.querySelector('.playingTo')
const inputScoreElm = document.querySelector('#inputScore')
const p1BtnElm = document.querySelector('#p1Btn')
const p2BtnElm = document.querySelector('#p2Btn')
const resetBtnElm = document.querySelector('#resetBtn')
const formElm = document.querySelector('form')

//Declaring all the data layer 
let p1Score = 0
let p2Score = 0
let playingToScore = 5
let gameOver = false;
const players = ['p1', 'p2']
let randomNum = Math.random()<0.5?0:1 
let turnPlayer = players[randomNum]
console.log('Reload page player is: ', turnPlayer)
//updating on DOM layer
playingToElm.textContent = playingToScore

//initally disable button based on turn

turnPlayer === 'p1'? p2BtnElm.setAttribute('disabled', 'disabled'):p1BtnElm.setAttribute('disabled', 'disabled')

//adding event registers


//showing input data into DOM after validation by a function

function validateInput(score){
    if(score <1){
        alert('Input greater than 0')
    }else{
        playingToElm.textContent = score
    }
}

//First, Let's start with inputing and updating playingTo score

formElm.addEventListener('submit', (evt) => {
    //stopping default reload action
    evt.preventDefault();
    //input score record
    const inputScoreData = inputScoreElm.value
    //call input data validator function and pass the input score 
    validateInput(inputScoreData)
    playingToScore = +inputScoreData
    //reset input field
    inputScoreElm.value = ''
})

//update DOM for p1btn score and update data layer
p1BtnElm.addEventListener('click', (evt) => {
    if (turnPlayer === 'p1' && !gameOver && p1Score < playingToScore){
        p1Score++
        p1ScoreElm.textContent = p1Score
        turnPlayer = 'p2'
        p1BtnElm.setAttribute('disabled', 'disabled')
        p2BtnElm.removeAttribute('disabled')
    }

    if (p1Score === playingToScore){
        gameOver = true;
        p1BtnElm.setAttribute('disabled', 'disabled')
        p2BtnElm.setAttribute('disabled', 'disabled')
        alert('Player 1 is the winner')

    }
})

//update DOM for p2btn score and update data layer
p2BtnElm.addEventListener('click', (evt) => {
    if (turnPlayer==='p2' && !gameOver && p2Score < playingToScore){
        p2Score++
        p2ScoreElm.textContent = p2Score
        turnPlayer ='p1'
        p2BtnElm.setAttribute('disabled', 'disabled')
        p1BtnElm.removeAttribute('disabled')
    }

    if (p2Score === playingToScore){
        gameOver = true;
        p1BtnElm.setAttribute('disabled', 'disabled')
        p2BtnElm.setAttribute('disabled', 'disabled')
        alert('Player 2 is the winner')
        //disable p1 btn

    }
})

resetBtnElm.addEventListener('click', (evt) =>{
    p1Score = 0
    p2Score = 0
    playingToScore = 5
    gameOver = false;
    //players = ['p1', 'p2']
    randomNum = Math.random()<0.5?0:1 
    turnPlayer = players[randomNum]

    if (randomNum === 0){
        p1BtnElm.removeAttribute('disabled')
    }else {
        p2BtnElm.removeAttribute('disabled')    
    }    
    console.log('Reset btn player is: ', turnPlayer)
    p1ScoreElm.textContent = p1Score
    p2ScoreElm.textContent = p2Score
    playingToElm.textContent = playingToScore
})

//WHY alert is showing first before button disable?

//update on data layer

//update DOM layer