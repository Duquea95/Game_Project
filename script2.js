$(function(){
console.log("It's working bro");

  // var cardArray = [
  // ['Pikachu', 'images/pika.png'],
  // ['Pikachu', 'images/pika.png'],
  // ['Meowth', 'images/meowth.png'],
  // ['Meowth', 'images/meowth.png'],
  // ['Scizor', 'images/scizor.png'],
  // ['Scizor', 'images/scizor.png'],
  // ['Heracross', 'images/heracross.png']
  // ['Heracross', 'images/heracross.png']
  // ]

var cardArray = ['Meowth','Meowth','Pikachu','Pikachu','Scizor','Scizor','Heracross','Heracross', 'Mew', 'Mew','Mewtwo', 'Mewtwo','Charizard','Charizard','Blastoise', 'Blastoise','Venasaur','Venasaur'];
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
  $('body').attr('id','second');
};

//function for creating the board
function makeBoard(){
  var board = $("<div id='board'>");
  $('body').append(board);
  var output ='';
  //runs the method that I added to the prototype
  cardArray.cardShuffle();
  counter = 0;
  //For loop to create, the cards and assign values
  for (var i = 0; i < cardArray.length; i++){
    output = $('<div id="card'+i+'" class="a_card"  data-val='+cardArray[i]+'>"');
    //added to body
  board.append(output);
  }
  //runs function for the div's created
  $('.a_card').each(function(){
    //when the div being ran through is clicked
    $(this).click(function(){
      //assign the data value to var
      var poke_name = $(this).attr('data-val');
      //pushes the id of the div into cardIds array
      cardIds.push(this.id);
      console.log(cardIds);
      //run flip function;
      flipCard($(this),poke_name);
    });
  });
}

function flipCard(card,val){
  console.log(val);
  //if card is empty and length of cardVal is less than 2
  if(cardVal.length < 2){
    //change bg to grey & assign the value to the card text
    $(card).html(val);
    console.log(cardIds);
    card.css('background-image', 'none');
    if(cardVal.length === 0){
      //add val to cardVal array && card.id to cardIds array
      cardVal.push(val);
      console.log(cardVal);
    }else if(cardVal.length == 1){
      //same as above
      cardVal.push(val);
      console.log(cardVal);
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
          flip1.html("");
          flip2.css('background-image' , 'url(http://cdn.bulbagarden.net/upload/thumb/2/2a/TCG_Card_Back_Japanese.jpg/150px-TCG_Card_Back_Japanese.jpg)');
          flip2.html("");
          // Clear both arrays
          cardVal = [];
          cardIds = [];
        }
        setTimeout(faceDown, 500);
      }
    }
  }
}

});
