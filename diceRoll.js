//Selecting the elements by declaring variables

const p1ScoreElm = document.querySelector('#p1Score')
const p2ScoreElm = document.querySelector('#p2Score')
const playingToElm = document.querySelector('.playingTo')
const inputScoreElm = document.querySelector('#inputScore')
const p1BtnElm = document.querySelector('#p1Btn')
const p2BtnElm = document.querySelector('#p2Btn')
const resetBtnElm = document.querySelector('#resetBtn')
const formElm = document.querySelector('form')
const diceScoreElm = document.querySelector('#diceScore')
const resultList = document.querySelector('#result-list');

//Declaring all the data layer 
let p1Score = 0
let p2Score = 0
let playingToScore = 15
let gameOver = false;
const players = ['p1', 'p2']
let randomNum = Math.random()<0.5?0:1 
let turnPlayer = players[randomNum]
console.log('Reload page player is: ', turnPlayer)
//updating on DOM layer
playingToElm.textContent = playingToScore

//initally disable button based on turn
turnPlayer === 'p1'? p2BtnElm.setAttribute('disabled', 'disabled'):p1BtnElm.setAttribute('disabled', 'disabled')


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

        // Returns a random integer from 0 to 6:  
        let diceRoll = Math.floor(Math.random() * 7)
        p1Score += diceRoll;
        diceScoreElm.textContent = diceRoll;
        console.log('p1 roll:',diceRoll)
        p1ScoreElm.textContent = p1Score
        turnPlayer = 'p2'
        p1BtnElm.setAttribute('disabled', 'disabled')
        p2BtnElm.removeAttribute('disabled')
        let listItem = document.createElement('li');
        listItem.classList = 'list-group-item';
        listItem.innerHTML = 'Player-1 rolled: ' + diceRoll
        resultList.appendChild(listItem);
        console.log(listItem)
    }

    if (p1Score >= playingToScore){
        gameOver = true;
        p1BtnElm.setAttribute('disabled', 'disabled')
        p2BtnElm.setAttribute('disabled', 'disabled')
        alert('Player 1 is the winner')

    }
})

//update DOM for p2btn score and update data layer
p2BtnElm.addEventListener('click', (evt) => {
    if (turnPlayer==='p2' && !gameOver && p2Score < playingToScore){
        let diceRoll = Math.floor(Math.random() * 7)
        p2Score +=  diceRoll;
        console.log('p2 roll:',diceRoll)
        diceScoreElm.textContent = diceRoll;
        p2ScoreElm.textContent = p2Score
        turnPlayer ='p1'
        p2BtnElm.setAttribute('disabled', 'disabled')
        p1BtnElm.removeAttribute('disabled')
        let listItem = document.createElement('li');
        listItem.classList = 'list-group-item';
        listItem.innerHTML = 'Player-2 rolled: ' + diceRoll
        resultList.appendChild(listItem);
        console.log(listItem)
    }

    if (p2Score >= playingToScore){
        gameOver = true;
        p1BtnElm.setAttribute('disabled', 'disabled')
        p2BtnElm.setAttribute('disabled', 'disabled')
        alert('Player 2 is the winner')
    }
})

//reset button function
resetBtnElm.addEventListener('click', (evt) =>{
    p1Score = 0
    p2Score = 0
    playingToScore = 15
    gameOver = false;
    randomNum = Math.random()<0.5?0:1 
    turnPlayer = players[randomNum]

    if (randomNum === 0){
        p1BtnElm.removeAttribute('disabled')
    }else {
        p2BtnElm.removeAttribute('disabled')    
    }    
    console.log('Reset btn player is: ', turnPlayer)
    diceScoreElm.textContent = 0;
    p1ScoreElm.textContent = p1Score
    p2ScoreElm.textContent = p2Score
    playingToElm.textContent = playingToScore
    resultList.textContent = ""
})