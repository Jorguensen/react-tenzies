
import './App.css';
import './tenzies.css';
import Die from "./components/Die"
import { nanoid } from 'nanoid'
import WinningScreen from './components/WinningScreen';
import React, {useState, useEffect} from "react";
import Confetti from "react-confetti"

function App() {

  const [diceNumbers, setDiceNumbers] =useState(allNewDice()); //state of the Dice
  const[isWin, setIsWin] =useState(false)

  useEffect(()=>{
    const allHeld = diceNumbers.every(dice => dice.isHeld === true);
    const allEqual = diceNumbers.every(dice => dice.value === diceNumbers[0].value);
    if(allHeld && allEqual){
      setIsWin(true);
    }

  }, [diceNumbers])

  function createDice(){                                      //creates a dice Object to populate the state array - function allNewdice
    return {value: Math.ceil(Math.random()*6), 
            isHeld: false,
            id: nanoid()}
  }

  function allNewDice() {                                     
    const newDice = []                                      // creates a 10 position array (10 dices) populates with the object created above
    for (let i=0; i<10; i++) {
      newDice.push(createDice())
    }
    return newDice
  }

  function reset() {
    setDiceNumbers(allNewDice())
    setIsWin(!isWin)
  }

  function rollDice(){
    if(!isWin){
    setDiceNumbers(prevState=>prevState.map(dice=>{
                  return dice.isHeld === true? 
                  dice :
                  createDice() 
    }))}
    else{ reset()

    } 
  }                         //sets the state (values for the Dices when) you press the button Roll
                                // case the die is locked, keep it in the screen. if its not lock generates a new array of dices and renders those to the screen


  const diceElements = diceNumbers.map(dice =>                    // maps Each object (pushed to the newDice array -> function allNewDice) and creates a JSX Die we can use to render

                                      <Die value={dice.value} 
                                           isHeld={dice.isHeld} 
                                           key={dice.key}
                                           id={dice.id}
                                           holdDiceHandler={() =>holdDice(dice.id)}/> )  //Using a function instead of a regular listener {holdDice} so we are able to pass the ID

  function holdDice(id){
      setDiceNumbers(prevState => prevState.map(dice =>{
          return dice.id === id? 
          {...dice, isHeld: !dice.isHeld} : dice
      }))
  }


  return (
    <div className="App">
     <main className="main--board">
      {isWin && <Confetti/>}
        <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className ="dice-container">
       {diceElements}
      </div>
         {isWin && <WinningScreen/>}
      <button className='roll-button' onClick={rollDice}>
          {!isWin? "Roll" : "New Game" }
            </button>
     </main>
    </div>
  );
}

export default App;
