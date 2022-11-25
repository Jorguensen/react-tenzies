import React from "react";
import '../tenzies.css';


function Die (props) {
   
    const styles = {
        backgroundColor: props.isHeld? "#59E391" : "white"
    }

    return (
        <div 
            onClick={props.holdDiceHandler} 
            className="die--square" 
            style = {styles}
            >
        <h1 className={styles}> {props.value}  </h1>
        </div>
    );
}


export default Die;