import React, { Component } from 'react';

import CircularProgressbar from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';


class Feature extends Component{

    render(){

      return(

        <div className = "Feature">

            <div> Danceability: { this.props.featureArr.danceability } 
              <div style={{ width: '90px' }}>
                <CircularProgressbar 
                  percentage={this.props.featureArr.danceability * 100} 
                  text={`${(this.props.featureArr.danceability * 100).toFixed(2)}%`} />
              </div>
            </div>
            
            <div> Energy: { this.props.featureArr.energy } 
              <div style={{ width: '90px' }}>
                <CircularProgressbar 
                  percentage={this.props.featureArr.energy * 100} 
                  text={`${(this.props.featureArr.energy * 100).toFixed(2)}%`} />
              </div>
            </div>

            <div> Speechiness: { this.props.featureArr.speechiness } 
            
            <div style={{ width: '90px' }}>
                <CircularProgressbar 
                  percentage={this.props.featureArr.speechiness * 100} 
                  text={`${(this.props.featureArr.speechiness * 100).toFixed(2)}%`} />
              </div>
            
            </div>

            <div> Acousticness: { this.props.featureArr.acousticness } 
            
              <div style={{ width: '90px' }}>
                <CircularProgressbar 
                  percentage={this.props.featureArr.acousticness * 100} 
                  text={`${(this.props.featureArr.acousticness * 100).toFixed(2)}%`} />
              </div>
            
            </div>

            <div> Instrumentalness: { this.props.featureArr.instrumentalness } 
            
              <div style={{ width: '90px' }}>
                <CircularProgressbar 
                  percentage={this.props.featureArr.instrumentalness * 100} 
                  text={`${(this.props.featureArr.instrumentalness * 100).toFixed(2)}%`} />
              </div>
            
            </div>

            <div> Liveness: { this.props.featureArr.liveness } 
            
              <div style={{ width: '90px' }}>
                <CircularProgressbar 
                  percentage={this.props.featureArr.liveness * 100} 
                  text={`${(this.props.featureArr.liveness * 100).toFixed(2)}%`} />
              </div>
            
            </div>

            <div> Valence: { this.props.featureArr.valence } 
            
              <div style={{ width: '90px' }}>
                <CircularProgressbar 
                  percentage={this.props.featureArr.valence * 100} 
                  text={`${(this.props.featureArr.valence * 100).toFixed(2)}%`} />
              </div>
            
            </div>

            <div> Key: { this.props.featureArr.key } </div>
            <div> Loudness: { this.props.featureArr.loudness } </div>
            <div> Mode: { this.props.featureArr.mode } </div>
            <div> Tempo: { this.props.featureArr.tempo } </div>

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