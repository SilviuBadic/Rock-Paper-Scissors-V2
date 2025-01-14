const seeWinner = document.querySelector('.js-theWinner');
const seeChoices = document.querySelector('.js-theChoices');
const findResults = document.querySelector('.js-results');
const fromLocal = localStorage.getItem('score');
const pressKey = document.querySelector('.js-pressKey');
const autoplayBtn = document.querySelector('.js-autoplay');
const resetBtn = document.querySelector('.js-reset');
const rockBtn = document.querySelector('.js-rock');
const paperBtn = document.querySelector('.js-paper');
const scissorsBtn = document.querySelector('.js-scissors');
const body = document.body;
const textReset = document.querySelector('.js-reset-pretext');



let score = fromLocal ? JSON.parse(fromLocal) : {
  wins : 0,
  losses : 0,
  ties: 0
}

let myChoice;   
let computerChoice;

function randomChoice(){
  let number = Math.random();
  let randomNumber = Math.floor(number * 3);
  if (randomNumber === 0){
    computerChoice = 'rock';
  }
  else if(randomNumber === 1){
    computerChoice = 'paper';
  }
  else if (randomNumber === 2){
    computerChoice = 'scissors';
  }
}

rockBtn.addEventListener('click', choseRock = () => {
  randomChoice();
  myChoice = 'rock';
  console.log(`I chose rock and computer chose ${computerChoice}`);
  if (myChoice === 'rock' && computerChoice === 'rock'){
    score.ties += 1;
    seeWinner.innerHTML = 'It\'s a tie';
    console.log('It\'s a tie');
    console.log(score);
    
  }
  else if(myChoice === 'rock' && computerChoice === 'paper'){
    score.losses += 1;
    seeWinner.innerHTML = 'I lost';
    console.log('i lost');
    console.log(score);

  }
  else if(myChoice === 'rock' && computerChoice === 'scissors'){
    score.wins += 1;
    seeWinner.innerHTML = 'I won';
    console.log('i won');
    console.log(score);
}
findResults.innerHTML =  `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
pressKey.innerHTML = ``;

seeChoices.innerHTML = `Me <img class="image" src="pictures/${myChoice}-emoji.png" alt="${myChoice}"> - <img class="image" src="pictures/${computerChoice}-emoji.png" alt="${computerChoice}">  Computer`;
})
    
paperBtn.addEventListener('click', () => {
  chosePaper();
});

scissorsBtn.addEventListener('click', () => {
  choseScissors();
});


function chosePaper(){
  randomChoice();
  myChoice = 'paper';
  console.log(`I chose paper and computer chose ${computerChoice}`);
  if(myChoice === 'paper' && computerChoice === 'rock'){          
    score.wins += 1;
    seeWinner.innerHTML = 'I won';
    console.log('i won');
    console.log(score);
  }
  else if(myChoice === 'paper' && computerChoice === 'paper'){
    score.ties += 1;
    seeWinner.innerHTML = 'It\'s a tie';
    console.log('draw');
    console.log(score);
    
  }
  else if(myChoice === 'paper' && computerChoice === 'scissors'){
    score.losses += 1;
    seeWinner.innerHTML = 'I lost';
    console.log('i lost');
    console.log(score);
  }
  findResults.innerHTML =  `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  pressKey.innerHTML = ``;

  seeChoices.innerHTML = `Me <img class="image" src="pictures/${myChoice}-emoji.png" alt="${myChoice}"> - <img class="image" src="pictures/${computerChoice}-emoji.png" alt="${computerChoice}"> Computer`;

}

function choseScissors(){
  randomChoice();
  myChoice = 'scissors';
  console.log(`I chose scissors and computer chose ${computerChoice}`);
  if(myChoice === 'scissors' && computerChoice === 'rock'){
    score.losses += 1;
    seeWinner.innerHTML = 'I lost';
    console.log('i lost');
    console.log(score);
  }
  else if(myChoice === 'scissors' && computerChoice === 'paper'){
    score.wins += 1;
    seeWinner.innerHTML = 'I won';
    console.log('i won');
    console.log(score);
  }
  else if(myChoice === 'scissors' && computerChoice === 'scissors'){
    score.ties += 1;
    seeWinner.innerHTML = 'It\'s a tie';
    console.log('draw');
    console.log(score);
  }   
  findResults.innerHTML =  `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  seeChoices.innerHTML = `Me <img class="image" src="../pictures/${myChoice}-emoji.png" alt="${myChoice}"> - <img class="image" src="pictures/${computerChoice}-emoji.png" alt="${computerChoice}"> Computer`;

  pressKey.innerHTML = ``;
  let myTextToString = JSON.stringify(score);
  let myTextToLocal = localStorage.setItem("score", myTextToString);
}


resetBtn.addEventListener('click', () => {
  // we add the dynamic HTML for the buttons
  const mainDiv = document.querySelector('.text_div');
  mainDiv.style.display = 'none';
  textReset.innerHTML = 
  `
  <p class="reset-paragraph">Are you sure you want to reset the score?</p>
  <button class="resetScoreYes">Yes</button>
  <button class="resetScoreNo">No</button>
  `
  // We select save the button values into variables (resetOp1 and resetOp2);

  const resetOption1 = document.querySelector('.resetScoreYes');
  const resetOption2 = document.querySelector('.resetScoreNo');

  // We use the first button (yes) by adding the event listener;
  resetOption1.addEventListener('click', ()=> {
    mainDiv.style.display = 'block';
    resettingScore();
    textReset.innerHTML = ''; // We delete the message 
  // We use the second button (no) by adding the event listener;
  });

  resetOption2.addEventListener('click', ()=> {
    mainDiv.style.display = 'block';
    textReset.innerHTML = ``; // we delete the message
  });

}
);

const resettingScore = () => {
  score = {
    wins : 0,
    losses : 0,
    ties: 0
  }
  
  findResults.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  seeWinner.innerHTML = '';
  seeChoices.innerHTML = `Game has been reset.`;
  pressKey.innerHTML = `Press any circle to start again!`;
  
}

function randomChoice2(){
  let number = Math.random();
  let randomNumber = Math.floor(number * 3);
  if (randomNumber === 0){
    computerChoice = 'rock';
  }
  else if(randomNumber === 1){
    computerChoice = 'paper';
  }
  else if (randomNumber === 2){
    computerChoice = 'scissors';
  }
}

let autoplayInterval;
let newChoice;

autoplayBtn.addEventListener('click', autoplay = () => {
  if(autoplayBtn.innerHTML === `Autoplay`){
    autoplayBtn.innerHTML = `Stop play`;
    autoplayInterval = setInterval(() => {
      randomChoice();
      const items = ['rock', 'paper', 'scissors'];
      newChoice = items[Math.floor(Math.random() * 3)];
      if(newChoice === 'rock'){
        choseRock();
      }
      else if(newChoice === 'paper'){
        chosePaper()
      }
      else if(newChoice === 'scissors'){
        choseScissors();
      }
    }, 1200);
  }  
  
  else if(autoplayBtn.innerHTML === `Stop play`){
    autoplayBtn.innerHTML = `Autoplay`;
    clearInterval(autoplayInterval)
  }
});
  
body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    choseRock();
  }
  else if (event.key === 'a'){
    autoplay();
  }
  else if (event.key === 'p'){
    chosePaper();
  }
  else if (event.key === 's'){
    choseScissors();
  }
  else if (event.key === 'Backspace'){
    resettingScore();
  }
})






