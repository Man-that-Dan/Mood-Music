import React, { Component } from 'react';
import styled from 'styled-components';
import FeatureNominal from './FeatureNominal';

class Tempo extends Component{
  render(){
    return(
      <FeatureNominal name = "Tempo" value = { this.props.value } />
    )
  }
}

export default Tempo