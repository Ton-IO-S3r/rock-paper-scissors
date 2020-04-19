"use strict";
const start_btn=document.querySelector('#start');
start_btn.addEventListener('click',enableGame);
const reset_btn=document.querySelector('#reset');
reset_btn.addEventListener('click',resetGame);
const end_btn=document.querySelector('#endgame');
end_btn.addEventListener('click',endGame);
const newgame_btn=document.querySelector('#continue');
newgame_btn.addEventListener('click',newGame);
const finishgame_btn=document.querySelector('#finish');
finishgame_btn.addEventListener('click',finishGame);

const optn_btn=document.querySelectorAll('button.option');
optn_btn.forEach(option => option.addEventListener('click',game));

let round = 0;
let playerPoints, cpuPoints;

function newGame() {
    enableGame();
    resetGame(1);
    document.querySelector('.cover').classList.toggle("visible");
    document.querySelector('.winnerPopup').classList.toggle("visible");
}

function finishGame() {
    endGame();
    document.querySelector('.cover').classList.toggle("visible");
    document.querySelector('.winnerPopup').classList.toggle("visible");
}

function setRound(actual) {
    const round_label=document.querySelector(".content h1");
    if (actual<5) {
        round_label.textContent="ROUND " + (actual + 1);
    } else {
        optn_btn.forEach(option => {
            option.disabled=true;
        });
    }
}

function endGame() {
    resetGame(1);
    const round_label=document.querySelector(".content h1");
    round_label.textContent='Begin the game by pressing the "START" button';
    document.querySelector(".game-el-container").style.visibility="hidden";
    reset_btn.disabled = true;
    end_btn.disabled = true;
    start_btn.disabled = false;
}

function resetGame(flag) {
    if (flag == 1) {
        round=0;
        playerPoints = 0;
        cpuPoints = 0;
    } else {
        const confirm = window.confirm("Your score will be deleted, are you sure?");
        if (confirm) {
            round=0;
            playerPoints = 0;
            cpuPoints = 0;
        }
    }
    setRound(round)
    document.querySelector('#partial-result').textContent="";
    document.querySelector('#player-score-lbl').textContent="--";
    document.querySelector('#cpu-score-lbl').textContent="--";
    optn_btn.forEach(option => {
        option.disabled=false;
    });
}

function enableGame() {
    playerPoints = 0;
    cpuPoints = 0;
    setRound(round);
    document.querySelector(".game-el-container").style.visibility="visible";
    start_btn.disabled = true;
    reset_btn.disabled = false;
    end_btn.disabled = false;
}

function computerPlay (){
    let computerOption = ["ROCK","PAPER","SCISSORS"];
    let optionValue = Math.floor(Math.random() * (3) );
    return computerOption[optionValue];
}

function playSingleRound(playerSelection, computerSelection){
    if(playerSelection == computerSelection){
        return "T";
    }
    if((playerSelection=="ROCK" && computerSelection=="SCISSORS") || (playerSelection=="PAPER" && computerSelection=="ROCK") || (playerSelection=="SCISSORS" && computerSelection=="PAPER")){
        return "P";
    }
    if((playerSelection=="ROCK" && computerSelection=="PAPER") || (playerSelection=="PAPER" && computerSelection=="SCISSORS") || (playerSelection=="SCISSORS" && computerSelection=="ROCK")){
        return "C";
    }
}

function validateSelection (selection){
    while(!((selection.toUpperCase() == "ROCK") || (selection.toUpperCase() == "PAPER") || (selection.toUpperCase() == "SCISSORS"))){
        selection = prompt("C'mon, you know this game! Please write only one of the possible options: ROCK, PAPER or SCISSORS:");
    }
    return selection.toUpperCase();
}

function game(){
    
    let round_text, playerSelection, result;
    const partial_lbl=document.querySelector('#partial-result');
    
    if (round<5) {
        console.log("ROUND " + (round+1));
        const cpuSelection = computerPlay();
        playerSelection = validateSelection(this.id);

        result = playSingleRound(playerSelection, cpuSelection);
        if(result == "T"){
            console.log("IT'S A TIE; BOTH CHOOSE " + playerSelection);
            partial_lbl.textContent = "IT'S A TIE; BOTH CHOOSE " + playerSelection;
        }
        if(result == "P"){
            playerPoints++;
            console.log("+ PLAYER WINS; " + playerSelection + " BEATS " + cpuSelection);
            partial_lbl.textContent = "+ PLAYER WINS; " + playerSelection + " BEATS " + cpuSelection;
        }
        if(result == "C"){
            cpuPoints++;
            console.log("- COMPUTER WINS; " + cpuSelection + " BEATS " + playerSelection);
            partial_lbl.textContent = "- COMPUTER WINS; " + cpuSelection + " BEATS " + playerSelection;
        }
        document.querySelector('#player-score-lbl').textContent = playerPoints;
        document.querySelector('#cpu-score-lbl').textContent = cpuPoints;
        /* 
         */
        round++;
        setRound(round)
    }
    if (round >= 5) {
        let winner = whoWon(playerPoints,cpuPoints);
        switch (winner) {
            case 0:
                document.querySelector('#whoWon').textContent="SORRY, YOU LOSE THE GAME!!"
                break;
            case 1:
                document.querySelector('#whoWon').textContent="CONGRATULATIONS, YOU WIN THE GAME!!"
                break;
            case 2:
                document.querySelector('#whoWon').textContent="IT'S A TIE"
                break;
            default:
                break;
        }
        document.querySelector('.cover').classList.toggle("visible");
        document.querySelector('.winnerPopup').classList.toggle("visible");
    }
}

function whoWon(player,cpu) {
    if(player < cpu){
        return 0
    }
    if(player > cpu){
        return 1
    }
    if(player == cpu){
        return 2
    }
}