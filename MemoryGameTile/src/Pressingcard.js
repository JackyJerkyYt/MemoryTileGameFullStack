import React, { useState } from 'react'




export default function Pressingcard({card,flipped, wrong, correct, dis}) {

  const [clicked, setclicked] = useState(false)  

  const onClick = () => {
    if(!dis){
        setclicked(true)
        if(!flipped){
            loseLives()
        }else{
            addP()
        }
    }
    
  }

  const loseLives = () => {
    wrong()
  }

  const addP = () => {
    correct()
  }
  return (
    <div> 
        {clicked && flipped ? 
            <div>
                <img src={"/img/flipped2.png"} alt="card flipped" />
            </div>
              : clicked && !flipped ?
                    <div> 
                        <img src = {"/img/wrong.png"} alt="card wrong" />
                    </div>
                        : <img src={card.src} alt="card unfilpped" onClick = {onClick} />
        }
    </div>
  )
}
