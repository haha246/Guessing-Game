import { useState } from 'react'
import './App.css'
import { guess, startGame, restart } from './axios'

function App() {
  const [hasStarted, setHasStarted] = useState(false)
  const [hasWon, setHasWon] = useState(false)
  const [number, setNumber] = useState('')
  const [status, setStatus] = useState('')
  const [count, setCount] = useState(0)
  

  const startMenu = (
    <div>
      <button
        onClick={async () => {
          await startGame()
          setHasStarted(true)
        }}
      >
        start game
      </button>
    </div>
  )

  const game = (
    <div>
      {hasWon ? (
        <>
          <p>you won! the number was {number}.</p>
	      <p>You spent {count} times to get the answer.</p>
          <button
            onClick={async () => {
              await restart()

              setHasWon(false)
              setStatus('')
              setNumber('')
	          setCount(0)
            }}
          >
            restart
          </button>
        </>
      ) : (
        <>
          <p>Guess a number between 1 to 1000</p>
          <input
		    id = 'guess'
            onChange={(e) => setNumber(e.target.value)}
          ></input>
          <button
            // TODO: use async/await to call guess(number),
            // process the response to set the proper state values
            onClick={async () => {
					 let a = await guess(number)
					 
					 let gg = document.getElementById("guess")
					 gg.value = ''
					 if (a == 'bigger'){
					     setStatus(number + ' : bigger')
					     setCount(count + 1)
					     
					}
                     else if(a == 'smaller'){
						 setStatus(number + ' : smaller')
						 setCount(count + 1)
						 
					 }
                     else if(a == 'equal'){
						 setHasWon(true)
					 }
                     else{
						 setStatus('You must guess the number between 1 to 1000')
					 }
					}}
            disabled={!number}
          >
            guess!
          </button>
          <p>{status}</p>

          <p>You have tried {count} times.</p>

        </>
      )}
    </div>
  )

  return <div className="App">{hasStarted ? game : startMenu}</div>
}

export default App
