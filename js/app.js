//list of cards
let cardList = document.getElementsByClassName('card');
//deck where cards are displayed
let cardDeck = document.getElementsByClassName('deck')[0];
//move counter
let counter = document.getElementsByClassName('moves')[0];
//stars
let stars = document.getElementsByClassName('stars')[0];
//open cards list
let flippedCards = document.getElementsByClassName('open');
//used to prevent too many clicks
let clicksAllowed = true;
//list of matched cards
let matchedCards = document.getElementsByClassName('match');
//container div for toggle
let container = document.getElementsByClassName('container')[0];
//win div for toggle
let win = document.getElementsByClassName('win')[0];

window.onload = restartGame;

//timer
var timer = 0;
let gameTimer;

function setTimer(){
  timer += 1;
  document.getElementsByClassName('timer')[0].innerHTML = timer;
}


//add event listener to refresh button
let restart = document.getElementsByClassName('restart')[0];
restart.addEventListener('click', restartGame);


//restarts the game
function restartGame(){
  console.log("here");
  cardList = shuffle(cardList);

  //resets timer
  document.getElementsByClassName('timer')[0].innerHTML = '0';
  timer = 0;
  clearInterval(gameTimer);
  gameTimer = setInterval(setTimer, 1000);

  //resets move counter
  counter.innerHTML = '0';

  //resets stars
  stars.innerHTML = "<li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li><li><i class='fa fa-star'></i></li>";

  //lays out new cards
  for (let i = 0; i < cardList.length; i ++){
    cardDeck.appendChild(cardList[i]);
    cardList[i].className = "card";
  }
}


//shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}


//add event listener to cardDeck
cardDeck.addEventListener('click', cardFlip);


//flips a card
function cardFlip(e){
  //only if one or two cards are open
  if(!clicksAllowed){
    return;
  }

  let pickedCard = e.target;

  //only targets li nodes
  if(pickedCard.tagName != 'LI'){
    return;
  }

  //ignores already matched and open cards
  if(pickedCard.className == 'card match' || pickedCard.className == 'card show open'){
    return;
  }

  //changes class of clicked card
  pickedCard.className = 'card show open';

  //when two cards are open run matchCheck
  if(flippedCards.length == 2){
    //adds 1 to move counter
    let moves = parseInt(document.getElementsByClassName('moves')[0].innerHTML);
    moves += 1;
    counter.innerHTML = moves;

    //removes stars after certain numer of moves
    if(moves == 11){
      stars.removeChild(stars.firstElementChild);
    }
    if(moves == 20){
      stars.removeChild(stars.firstElementChild);
    }

    matchCheck();

  }
}


//checks both cards for match
function matchCheck(){
  if(flippedCards[0].firstElementChild.className == flippedCards[1].firstElementChild.className){
    flippedCards[0].className = 'card match';
    flippedCards[0].className = 'card match';
    //check for game win
    if(matchedCards.length == 16){
      setTimeout(function(){
        gameWin();
      }, 1300);
    }
  }
  else{
    clicksAllowed = false;
    setTimeout(function(){
      flippedCards[0].className = 'card';
      flippedCards[0].className = 'card';
      clicksAllowed = true;
    }, 1000);
  }
}


//winning the game
function gameWin(){
  clearInterval(gameTimer);
  win.style.display = 'block';
  container.style.display = 'none';//changed this one
  document.getElementsByClassName('stats')[0].innerHTML = 'Moves: '+ counter.innerHTML;
  document.getElementsByClassName('stats')[1].innerHTML = 'Stars: '+ stars.childNodes.length;
  document.getElementsByClassName('stats')[2].innerHTML = 'Time: ' + timer + ' seconds';
}


//win page play again event listener
let playAgainButton = document.getElementsByClassName('play')[0];
playAgainButton.addEventListener('click', playAgain);


//resets the page and starts new game
function playAgain(){
  win.style.display = 'none';
  container.style.display = 'flex';
  restartGame();
}
