import React, { Component } from 'react';

class Mode extends Component{

    render(){

      let mode = null;

      let round = Math.round(this.props.value)

      switch (round) {

        case 0: 
          mode = "Minor"
          break

        case 1: 
          mode = "Major"
          break


        default: 
          mode = "No data";
          break

        }

      return(

        <div>

          { mode }

        </div>

      )

    }
    
}

export default Mode