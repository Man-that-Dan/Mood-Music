import React, { Component } from 'react';
import styled from 'styled-components';

const FeatureNominalWrapper = styled.div`
  display: inline-block;
  padding: 11px;
  margin: 5px;
  border: 2px;
  border-style: solid;
  border-color: #bab2b5;
`

class FeatureNominal extends Component{
  render(){
    return(
      <FeatureNominalWrapper>
        <div>
          { this.props.name } 
        </div>
        <div> 
          { this.props.value } 
        </div>
      </FeatureNominalWrapper>
    )
  }
}

export default FeatureNominal