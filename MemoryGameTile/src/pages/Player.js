import logo from '../logo.svg';
import '../App.css';
import { useCallback, useEffect, useState } from 'react';
import Pressingcard from '../Pressingcard';
import CardsLayOut from '../CardsLayOut';
import Profiles from '../users';
import SubmitForm from '../SubmitForm';
import axios from 'axios';
//These are the pictures
const flipped = { "src" : "/img/flipped2.png"}
const unflipped = { "src" : "/img/unflipped2.png", matched: false }
const temp = [{
  name: "hello",
  score: "5",
  location: "hk"
}]

//The three levels
const level1 = []
for(let i = 0; i < 16; i++){
  level1[i] = {...unflipped, id: Math.random()}
}

const level2 = []
for(let i = 0; i < 25; i++){
  level2[i] = {...unflipped, id: Math.random()}
}

const level3 = []
for(let i = 0; i < 36; i++){
  level3[i] = {...unflipped, id: Math.random()}
}
 
function Player() {

  
 
  const [answers, setAnswers] = useState([])
  const [numberOfCorrect, setNumberOfCorrect] = useState(0)
  const [stateNumber, setStateNumber] = useState(-1)
  const [message, setMessage] = useState("Click Play!")
  const [lives, setLives] = useState(2)
  const [dead, setDead] = useState(false)
  const [won, setWon] = useState(false)
  const [playButton, setPlayButton] = useState(false)
  const [points, setPoints] = useState(0)
  const [level, setLevel] = useState(1)
  const [levelMessage, setLevelMessage] = useState("simple")
  const [plusPoints, setPlusPoints] = useState(1)
  const [buttonMessage, setButtonMessage] = useState("Play/Restart")
  const [cardDisa, setCardDisa] = useState("false")
  const [userReadTheInstructions, setUserReadTheInstructins] = useState(false)
  const [lostmessage, setLostMessage] = useState(false)
  const [usersArray, setUsersArray] = useState([])
  cosnt [isFetchingDataBase, setIsFetchingDataBase] = useState(true)




  //StateNumber -1 => first time visiting the site
  //StateNumber 1 => just hit the play button
  //StateNumber 3 => refreshing

  //take away lives function

  useEffect(() => {
    axios.get("https://fullstackmemorygame.herokuapp.com/user", 
        {
          onDownloadProgress: progressEvent => {
            console.log("onUploadProgress")
            setIsFetchingDataBase(true)
          }
        } 
      )
      .then((res) => {
        setUsersArray(res.data)
        setIsFetchingDataBase(false)
        print("hello")
      })
  })
  const takeAwaysLives = () => {
    setLives((prev) => {
      return prev-1
    })
  }

  //add points function
  const addPoints = () => {
    setNumberOfCorrect((prev) => {
      return prev+1
    })
  }

  //getting the random answer
  const getRandom = (arr, n) => {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  //setting the stateNumber to 0
  const setNumPlay = () => {
    setStateNumber(0)
  }

  //setting everything for the nextLevel
  const nextLevel = (level) => {
    let answer

    if(stateNumber==1){
      setInterval(() => {
        setStateNumber(1)
      }, 2000)
    }

    if(level === 1){
      answer = getRandom(level1, 9)     
    }else if(level === 2){
      answer = getRandom(level2, 9)
    }else if(level === 3){
      answer = getRandom(level3, 9)
    }


    
    // console.log("temp is", answer)
    setStateNumber(1)
    setAnswers(answer)

    setWon(false)
    setDead(false)
    setLives(2)
    setNumberOfCorrect(0)
    setPlayButton(false)
    setTimeout(setNumPlay, 1500)
    setCardDisa(false)
  }

  const newGame = (level) => {
    if(dead){
      setPoints(0)
    }
    if(stateNumber === -1){
      nextLevel(level)
    }else{

      //refreshing the page so that all the tiles become unflipped
      setStateNumber(3)

      //disable the play button so that the user could not keep pressing it
      setPlayButton(true)

      //set a time out so the action would not happen to suddenly
      if(dead){
        setTimeout(nextLevel, 1200, 1)

      }else{
        setTimeout(nextLevel, 1200, level)

      }
    }  
    
  }

  //check if the tile is in the answer
  const isInAnswer = (tile) => {
    for(let i = 0; i < answers.length; i++){
      if(tile.id === answers[i].id){
        
        return true;
      }
    }
    return false;
  }

  //userEffect

  //when the person lose the match, disable the clicking of the cards
  useEffect(() => {
    if(lives === 0){
      setDead(true)
      setCardDisa(true)
      // setPoints(0)
    }
  }, [lives])

  //calculate the points according to the level
  //show the person has won
  useEffect(() => {
    if(numberOfCorrect === 9){
      setWon(true)
      setCardDisa(true)
      if(level === 1){
        setPoints((prev) => {
          return prev+1
        })
      }else if(level === 2){
        setPoints((prev) => {
          return prev+5
        })
      }else if(level === 3){
        setPoints((prev) => {
          return prev+10
        })
      }
      
    }
  }, [numberOfCorrect])

  //setting the message
  useEffect(() => {
    if(stateNumber === -1){
      setMessage("Play Now")
    }else if(stateNumber === 3){
      setMessage("Refreshing")
    }else if(stateNumber === 1){
      setMessage("Look Now!")
    }else if(dead){
      setMessage("Game Over")
    }else if(won){
      setMessage("You have Passed!")
    }else{
      setMessage(`Lives: ${lives}`)
    }
  }, [stateNumber, dead, won])

  ///setting the level according to the points the person earned so far
  useEffect(() => {
    if(points >= 0 && points <= 5){
      setLevel(1)
    }else if(points >=5 && points <= 25){
      setLevel(2)
    }else{
      setLevel(3)
    }
    if(points >= 1 && !dead){
      setButtonMessage("NEXT/Reload")
    }else{
      setButtonMessage("Play/Restart")
    }

    if(dead){
      setPlayButton(true)
      setTimeout(() => {
        setLostMessage(true)
      },1500)
    }
  }, [points, dead])

  //setting the level difficulty message
  useEffect(() => {
    if(level === 1){
      setLevelMessage("Simple")
      setPlusPoints(1)
    }else if(level === 2){
      setLevelMessage("Medium")
      setPlusPoints(5)
    }else if(level === 3){
      setLevelMessage("Hardest")
      setPlusPoints(10)
    }
  }, [level])


  //clicks handler

  //this is used to test things
  const testingHandleClick = () => {
    console.log("current stateNumber", stateNumber)
    console.log("current level", level)
    console.log(level1)
    console.log(level2)
    console.log(level3)
    console.log("answers", answers)
    // console.log("numberOfCorrect", numberOfCorrect)
    console.log("points" , points)
  }

  const beginningClickHandler = () => {
    setUserReadTheInstructins(true)
  }

  //this is the play button click
  const playButtonClickinghandler =()=>{
    if(level === 1){
      newGame(1)
    }else if(level === 2){
      newGame(2)
    }else if(level === 3){
      newGame(3)

    }
  }

  return (
    <div className="App">
    
      <h1 onClick = {testingHandleClick}>Are You a Gold Fish?</h1>
      {
      
        lostmessage ? 
          <div>
            <div>Your Score is: {points}</div>
            <br></br>
            <SubmitForm points={points} setDead={setDead} setUserReadTheInstructins={setUserReadTheInstructins} setLostMessage={setLostMessage} setWon={setWon} setStateNumber={setStateNumber} setNumberOfCorrect={setNumberOfCorrect} setLives={setLives} setPlayButton={setPlayButton} setPoints={setPoints} />
          </div>
            

        :

        userReadTheInstructions ? 
          <div>
            <button onClick = {playButtonClickinghandler} disabled={playButton}>{buttonMessage}</button>
            <br></br>
            <br></br>
            <div>{message}</div>
            <br></br>
            <div>Points: {points}</div>
            <br></br>
            <div>Level: {levelMessage} (+{plusPoints})</div>

            {/*the cards*/}
            {/*////////////////////////////////////////////////////////////////////////////////////////////////*/}
            {level === 1 ? 
              <CardsLayOut level={level1} stateNumber={stateNumber} isInAnswer={isInAnswer} takeAwaysLives={takeAwaysLives} addPoints={addPoints} cardDisa={cardDisa} currentLevel={1} />
                :level === 2 ? 
                  <CardsLayOut level={level2} stateNumber={stateNumber} isInAnswer={isInAnswer} takeAwaysLives={takeAwaysLives} addPoints={addPoints} cardDisa={cardDisa} currentLevel={2}/>
                  :level === 3 ? 
                    <CardsLayOut level={level3} stateNumber={stateNumber} isInAnswer={isInAnswer} takeAwaysLives={takeAwaysLives} addPoints={addPoints} cardDisa={cardDisa} currentLevel={3}/>
                    : <div></div>}    
                        {/*////////////////////////////////////////////////////////////////////////////////////////////////*/}
                        

            <br></br>
            <div>Developed by Cheuk Ki Wong</div>
          </div>
          :
          <div>
            
            <div>Instructions: Tap all the tiles that had turned blue to pass the next level!</div>
            <br></br>
            <br></br>
            <div>
              <button onClick = {beginningClickHandler} >Start!</button>
            </div>
            <br></br>          
              {
                isFetchingDataBase ? 
                <div> Fetching leaderboard, please wait. </div>
                :
                <>
                <Profiles Leaderboard={usersArray} />
                </>
              }
            </div>
        
      }
      
      
     
    </div>
  );
}

export default Player;
