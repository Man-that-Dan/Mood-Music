import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';


class Feature extends Component{

    render(){

      const style = {
        margin: "5px",
      }

      return(

        <div className = "Feature" style = { style }>

            <div> { this.props.feature }: { this.props.value } 
              <div style={{ width: '90px' }}>
                <CircularProgressbar 
                  percentage={this.props.value * 100} 
                  text={`${(this.props.value * 100).toFixed(2)}%`} />
              </div>
            </div>

            {/*<div> Key: { this.props.featureArr.key } </div>
            <div> Loudness: { this.props.featureArr.loudness } </div>
            <div> Mode: { this.props.featureArr.mode } </div>
            <div> Tempo: { this.props.featureArr.tempo } </div>*/}

        </div>



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