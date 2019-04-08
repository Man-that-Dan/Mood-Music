import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import styled from 'styled-components';
import 'react-circular-progressbar/dist/styles.css';

const FeatureWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex: 1 0 0;
  padding: 20px;
`

class Feature extends Component{

  render(){
    return(
      <FeatureWrapper>
        <div> 
          { this.props.feature }: { this.props.value } 
        </div>
        <div style={{ width: '90px' }}>
          <CircularProgressbar 
            percentage={this.props.value * 100} 
            text={`${(this.props.value * 100).toFixed(2)}%`} />
        </div>
      </FeatureWrapper>

      //Danceability: 0:1 at 1 most danceable
      //Energy: 0:1
      //Key: c=0, csharp.db = 1, -1 if no key 
      //Loudness: -60:0
      //Mode: 1 major, 0 minor
      //Speechiness: 0:1
      //Acousticness: 0:1
      //Instrumentalness: 0:1 at 1 no vocal
      //Liveness: 0:1 Audience in the recording
      //Valence: 0:1 positive
      //Tempo: 0 : 400
    )
  }
}

export default Feature