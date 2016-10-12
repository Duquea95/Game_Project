$(function(){
console.log("It's working bro");

  var cardArray = [
  ['Pikachu', 'images/pika.png'],
  ['Pikachu', 'images/pika.png'],
  ['Meowth', 'images/meowth.png'],
  ['Meowth', 'images/meowth.png'],
  ['Scizor', 'images/scizor.png'],
  ['Scizor', 'images/scizor.png'],
  ['Blastoise', 'images/blastoise.png'],
  ['Blastoise', 'images/blastoise.png'],
  ['Charizard', 'images/charizard.png'],
  ['Charizard', 'images/charizard.png'],
  ['Dusclops', 'images/dusclops.png'],
  ['Dusclops', 'images/dusclops.png'],
  ['Sceptile', 'images/sceptile.png'],
  ['Sceptile', 'images/sceptile.png'],
  ['Heracross', 'images/heracross.png'],
  ['Heracross', 'images/heracross.png'],
  ['Kyogre', 'images/kyogre.png'],
  ['Kyogre', 'images/kyogre.png']
  ]

// var cardArray = ['Meowth','Meowth','Pikachu','Pikachu','Scizor','Scizor','Heracross','Heracross', 'Mew', 'Mew','Mewtwo', 'Mewtwo','Charizard','Charizard','Blastoise', 'Blastoise','Venasaur','Venasaur'];
//create array for values and Ids, and a var for the counter
var cardVal = [];
var cardIds = [];
var counter = 0;

//Adds the method cardShuffle to the array prototype
//Fisher Yates Shuffling method, got this off google first link
Array.prototype.cardShuffle = function(){
  var i = this.length, j, temp;
  while(--i > 0){
    j = Math.floor(Math.random() * (i+1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
};

//function for setting the board up on the screen
var start = function(){
  $('button').click(function(){
    $('.btnBox').remove();
    $('.titleBox').remove();
    screenSwitch();
    makeBoard();
  });
};
start();

//function for switching from main screen to game screen
var screenSwitch = function(){
  $('body').removeAttr('id');
};

//function for creating the board
function makeBoard(){
  var board = $("<div id='board'>");
  $('body').append(board);
  var $timer = $("<div id='time'>")
  $('body').append($timer);
  var timeLimit = 60 * 2,
  display = $('#time');
  startTimer(timeLimit, display);

  var output ='';
  //runs the method that I added to the prototype
  cardArray.cardShuffle();
  counter = 0;
  // For loop to create, the cards and assign values
  for (var i = 0; i < cardArray.length; i++){
    output = $('<div id="card'+i+'" class="'+cardArray[i][0]+' card" data-val='+cardArray[i][1]+'>');
    console.log(output.attr('data-val'))
    //added to body
    board.append(output);
  }
  // runs function for the div's created
  $('.card').each(function(){
    //when the div being ran through is clicked
    $(this).click(function(){
        console.log(this)
      //assign the data value to var
      var poke_name = $(this).attr('class');
      var poke_image = $(this).attr('data-val');
      //pushes the id of the div into cardIds array
      cardIds.push(this.id);
      console.log(this);
      //run flip function;
      flipCard($(this),poke_name,poke_image);
    });
  });
}

function flipCard(card,val,img){
  console.log(img);
  //if card is empty and length of cardVal is less than 2
  if(cardVal.length < 2){
    // Adds images of pokemon
    card.css('background-image', "url("+img+")");
    if(cardVal.length === 0){
      //add val to cardVal array
      cardVal.push(val);
    }else if(cardVal.length == 1){
      //same as above
      cardVal.push(val);
      cardIds.push(card.id);
      //if they equal each other...
      if (cardVal[0] == cardVal[1]){
        counter += 2;
        //clear stored values
        cardVal = [];
        cardIds = [];
        //if all values are clicked, reset
        if(counter == cardArray.length){
          alert("You win! Resetting game");
          $('div').remove();
          makeBoard();
        }
      } else {
       function faceDown(){
          // assign the flipped cards to variables
          var flip1 = $('#' + cardIds[0]);
          // console.log(flip1)
          var flip2 = $('#' + cardIds[1]);
          // Flip the 2 tiles back over
          flip1.css('background-image' , "url(http://cdn.bulbagarden.net/upload/thumb/2/2a/TCG_Card_Back_Japanese.jpg/150px-TCG_Card_Back_Japanese.jpg)");
          flip2.css('background-image' , 'url(http://cdn.bulbagarden.net/upload/thumb/2/2a/TCG_Card_Back_Japanese.jpg/150px-TCG_Card_Back_Japanese.jpg)');
          // Clear both arrays
          cardVal = [];
          cardIds = [];
        }
        setTimeout(faceDown, 500);
      }
    }
  }
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.text(minutes + ":" + seconds);

        if (--timer < 0) {
            alert("You lose. Try again!")
            $('div').remove();
            makeBoard();
            timer = duration;
        }
    }, 1000);
}

});
