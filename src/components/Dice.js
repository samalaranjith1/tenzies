import React from 'react'

export default function Dice(props) {
  const styles={
    backgroundColor:props.isHeld?'#03FF31' :" ",
  }
  return (
    <div className='dice' 
    style={styles}
    onClick={props.holdDice}>

        <h2 className='dice-h2'>{props.value}</h2>
        
    </div>
  )
}
