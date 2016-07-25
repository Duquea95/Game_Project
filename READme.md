Memory Board Game

-Click button to remove main menu
  - Switches screen to play screen
  - Sets up the game board
  - Cards flipped counter set to 0;
  - Shuffles the 8 cards
  - Creates the cards
  - Adds cards to the board
  - When a card is clicked
    -check if card is empty and if there are less than 2 values stored
    -assign value to card
      -if there are 0 to 1 values stored, store assigned value and id
      -if two values are stored, check if cards are equal to each other.
        -if so, leave face up,add to counter, and clear stored values.
          -if counter is equal to array length, reset board. You win!.
        -else, flip face down.
