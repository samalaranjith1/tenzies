import React, { useState } from 'react';
import './App.css';
import Dice from './components/Dice';
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice,setDice] = useState(allNewDice());

  const [tenzies,setTenzies]=useState(false);
                        
  React.useEffect(()=>{
    console.log("state changed");
    const allheld=dice.every(die=>die.isHeld);
    const firstValue=dice[0].value;
    const allEqual=dice.every(dice=>dice.value===firstValue)
    
    if(allheld && allEqual){
      setTenzies(true);
      console.log("user won the game")
    }

  },[dice])

  function generateNewDice(){
    return {value:Math.floor(Math.random()*7),
      isHeld:false,
    id:nanoid()}
  }

  function allNewDice(){
    const newDice = [];
    for(let i=0;i<10;i++){
      newDice.push(generateNewDice());
    }
    return newDice
  }

  function holdDice(id){
    setDice(pd=>pd.map(
      item=>{
        return item.id === id ? 
        {...item , isHeld : !item.isHeld}:
        item
      }
    ))

  }

  const diceElements=dice.map(item=><Dice value={item.value} 
    key={item.id} 
    isHeld={item.isHeld}
    holdDice={()=>holdDice(item.id)}
    />);

    
  function rollDice(){
    if(!tenzies){
      setDice(pd=>pd.map(
        item=>{
          return item.isHeld ?item:generateNewDice()
        }
      ))}
      else{
        setTenzies(false);
        setDice(allNewDice());

      }
    }

  return (
    <div className="App">
       <main className='app-main'>
        {tenzies && <Confetti />} 
       <h1 className='app-main-h1'>Tenzies</h1>
       <p className='app-main-p'>Roll until all dice are the same. Click each die to freeze it as its content value between rolls</p>

      <div className='app-main-dice-container'>
      {diceElements}
      </div>
      <button onClick={rollDice} className='app-button'>
        {tenzies?"New Game": 'Roll'}</button>
      </main>
      
    </div>
  );
}

export default App;
