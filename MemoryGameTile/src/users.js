import React, { useState } from 'react'
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCircleCheck, faPen, faTrashCan
} from '@fortawesome/free-solid-svg-icons'

import axios from "axios"

export default function Profiles({ Leaderboard, isAdmin }) {
  return (
        <div id="profile">
            {Item(Leaderboard, isAdmin)}
        </div>
  )
}

const Texting = (original) => {
  const[text, setText] = useState(`${original}`)
  let hello = {
    text, setText
  }
  return hello
}

function Item(Leaderboard, isAdmin){

    const [text, setText] = useState("")
    const [isediting, setIsEditing] = useState(false)

    const Delete = (id) => {
      console.log(id)
      axios.delete(`https://fullstackmemorygame.herokuapp.com/delete/${id}`)
        .then(() => {
          console.log("done deleting")
        })
        .catch((err) => {
          console.log(err)
        })
    }

    const compare = (a, b) => {
      if(a.score < b.score){
        return 1
      }else{
        return -1
      }
      
    }
    return (

        <>
            
            <table className='content-table'>

                <thead>
                    <tr>
                        <th>rank</th>
                        <th>name</th>
                        <th>city</th>
                        <th>score</th>
                        {isAdmin ? 
                          <th>delete</th>
                          :
                          <></>
                        }
                    </tr>
                </thead>


                {Leaderboard.sort(compare).map((user, index) => {
                  return(
                    <tbody>
                        <tr>
                            
                            <td>{index + 1} </td>
                            <td>{user.username}     </td>
                            <td>{user.cityOrCountry}</td>
                            <td>{ !isediting ? <> {user.score}  </> : <><form></form></>}</td>
                            {isAdmin ? 
                              <button onClick={() => {
                                Delete(user._id)
                              }}>Delete User</button>
                              :
                              <></>
                            }
                        </tr>
                    </tbody>
                  )
                })}
                


            </table>
                    
                    
                    
                
            
        </>

        
    )
}