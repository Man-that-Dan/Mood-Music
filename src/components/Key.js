import React, { Component } from 'react';

class Key extends Component{

    render(){

      let key = null;

      let round = Math.round(this.props.value)

      console.log(round)

      switch (round) {

        case 0: 
          key = "C"
          break

        case 1: 
          key = "C#"
          break
        
        case 2: 
          key = "D"
          break

        case 3: 
          key = "D#"
          break        

        case 4: 
          key = "E"
          break

        case 5: 
          key = "F"
          break
        
        case 6: 
          key = "F#"
          break

        case 7: 
          key = "G"
          break  
        
        case 8: 
          key = "G#"
          break   

        case 9: 
          key = "A"
          break
        
        case 10: 
          key = "A#"
          break   

        case 11: 
          key = "B"
          break   

        default: 
          key = "No data";
          break

        }

      return(

        <div>

          { key }

        </div>

        //Key: c=0, csharp.db = 1, -1 if no key 

      )

    }

}

export default Key