import React, { Component } from 'react';

class Loudness extends Component{

    render(){

      let loudness = null;

      if(this.props.value < 20){
        loudness = "Quiet"
      }
      else if(this.props.value < 40){
        loudness = "Moderate"
      }
      else {
        loudness = "Loud"
      }
      
      return(
        <div>
          { this.props.value }
        </div>
      )
    }
}

export default Loudness