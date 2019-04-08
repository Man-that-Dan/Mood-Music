import React, { Component } from 'react';
import FeatureNominal from './FeatureNominal';

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
      <FeatureNominal name = "Mode" value = { mode } />
    )
  } 
}

export default Mode