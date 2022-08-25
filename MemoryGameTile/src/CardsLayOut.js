import React from 'react'
import Pressingcard from './Pressingcard';

//These are the pictures
const flipped = { "src" : "/img/flipped2.png"}
const unflipped = { "src" : "/img/unflipped2.png", matched: false }

export default function CardsLayOut({level, stateNumber, isInAnswer, takeAwaysLives, addPoints, cardDisa, currentLevel}) {

    

  return (
    <div className= {currentLevel===1 ? "card-grid1" : currentLevel === 2 ? "card-grid2" : "card-grid3" }>  

         {stateNumber === 1 ? 
 
             level.map((tile) => (
               <div  className='card' key={tile.id}>
 
                   {isInAnswer(tile)? 
 
                       <img src={flipped.src} alt="card flipped" />
 
                   :
 
                     <img src={tile.src} alt="card unflipped" />
                   }
 
               </div> 
             ))
 
             : stateNumber === 3 ?
             
                   level.map((tile) => (
                     
                       <div key={tile.id}>
                         <img src={tile.src} alt="card unflipped" />
                       </div>
 
                   ))
 
                   : 
                   
                   level.map((tile) => (
                     <div className = "card" key={tile.id}>
                       <Pressingcard card={tile} flipped={isInAnswer(tile)} wrong={takeAwaysLives} correct={addPoints} dis={cardDisa} alt="card front" />
                     </div>
                   ))
         }
 
        </div>
  )
}
