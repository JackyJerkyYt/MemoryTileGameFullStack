# Are you a Gold Fish? Website Link: https://memorytraininggame.netlify.app/

#This is the latest version of MemoryTileGame
## What is this?
  - This is a memory game that helps test the user's short term memory
  - 9 out of 16/25/36 tiles will pop up for 2 seconds when the user press the play button
  - The user has to selected all the 9 tiles to proceed to the next level

## Features
  - The nine tiles are generated randomly every time
  - The color of the tile will change depending on whether the user has selected the right tile
    - Deep Blue for correct, Red for incorrect
  - A score tracker
  - The level will change depending on the user's current score.
    - Level 1: 16 tiles
    - Level 2: 25 tiles
    - Level 3: 36 tiles
  - Disbale all the buttons when the following events is happening
    - When the 9 tiles are showing up
    - When the user has won the game
    - When the user has lost the game
  - Leaderboard
    - When the user lost, they would be asked to enter their name and location and the data would be stored in a remote MongoDB database
    - When the user first enter the game, they could how other people around the world perform in this game through the leaderboard
  
