import React, { Fragment, useState } from 'react'
import axios from "axios"
import "./submit.css"

export default function SubmitForm({points, setDead, setUserReadTheInstructins, setLostMessage, setWon, setStateNumber, setNumberOfCorrect, setLives, setPlayButton, setPoints}) {
    const [namee, setName] = useState("")
    const [cityOrCountryy, setCityOrCountry] = useState("")

    const onChange1 = (event) => {
      setName(event.target.value)
    }

    const onChange2 = (event) =>{
        setCityOrCountry(event.target.value)
    }

    const submitHandler = async(event) => {
      event.preventDefault()
      const user = {
        username: namee,
    score: `${points}`,
    cityOrCountry: cityOrCountryy
      }  
      axios.post("https://fullstackmemorygame.herokuapp.com/createUser", user)
        .then(() => {
            setDead(false)
            setUserReadTheInstructins(false)
            setLostMessage(false)
            setStateNumber(-1)
            setWon(false)
            setLives(2)
            setNumberOfCorrect(0)
            setPlayButton(false)
            setPoints(0)
        })
        .catch(
            (err) => {
              console.log(err)
            })

    }

    const leaving = () => {
      setDead(false)
      setUserReadTheInstructins(false)
      setLostMessage(false)
      setStateNumber(-1)
      setWon(false)
      setLives(2)
      setNumberOfCorrect(0)
      setPlayButton(false)
      setPoints(0)
      console.log("hello")
    }

  return (
    <div>
      <Fragment>


         
        <form onSubmit = {submitHandler}>
            
            <table className='content-table'>
                <thead>
                    <tr>
                        
                        <th>name</th>
                        <th>city</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input value={namee} onChange={onChange1} type="text" maxLength={63} /></td>
                        <td><input value={cityOrCountryy} onChange={onChange2} type="text" maxLength={63}></input></td>
                    </tr>
                </tbody>


            </table>

            <button type="submit">Submit</button>
            <br></br>
            <br></br>
        </form>



        <button onClick={leaving}>It is a shame, let me try again</button>
      </Fragment>
    </div>
  )
}

