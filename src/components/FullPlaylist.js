import React, { Component } from 'react';

import Playlist from './Playlist';

import Feature from './Feature';


class FullPlaylist extends Component{

  state = {
    loadedPlaylistId: null,
    tracks: null,
    features: null
  }

  componentDidMount(){
    if(this.props.accessToken && this.props.id){
      if( this.state.tracks == null ){
        fetch('https://api.spotify.com/v1/playlists/' + this.props.id + '/tracks', {
          headers: {
            'Authorization' : 'Bearer ' + this.props.accessToken},
        }).then(response => response.json())
        .then( data => { 
          this.setState({
            tracks: data.items.map( item => {return { 
              name: item.track.name,
              id: item.track.id
           }}),
            loadedPlaylistId: data.href.split('/')[5]
          })
        })
        .then(() => {
          let tracks = this.state.tracks.map( track => track.id ).join(',');
          this.fetchFeatures(tracks)
        })
       }
    }
  }

  componentDidUpdate(){
    if(this.props.accessToken && this.props.id){
      if( this.state.tracks == null || (this.state.tracks && (this.state.loadedPlaylistId !== this.props.id))){
        fetch('https://api.spotify.com/v1/playlists/' + this.props.id + '/tracks', {
          headers: {
            'Authorization' : 'Bearer ' + this.props.accessToken},
        }).then(response => response.json())
        .then( data => { 
          this.setState({
            tracks: data.items.map( item => {return { 
              name: item.track.name,
              id: item.track.id
           }}),
            loadedPlaylistId: data.href.split('/')[5]
          })
        })
        .then(() => {
          let tracks = this.state.tracks.map( track => track.id ).join(',');
          this.fetchFeatures(tracks)
        })
      }
    }
  }


  
  fetchFeatures (tracks){
    fetch('https://api.spotify.com/v1/audio-features/?ids=' + tracks, {
      headers: {
        'Authorization' : 'Bearer ' + this.props.accessToken},
    }).then(response => response.json())
    .then( data => { 
      this.setState({
        features: data.audio_features
      })
    })
  }

  getAverage(features){

    let sum = [ {
      danceability: 0,
      energy: 0,
      key: 0,
      loudness: 0,
      mode: 0,
      speechiness: 0,
      acousticness: 0,
      instrumentalness: 0,
      liveness: 0,
      valence: 0,
      tempo: 0 } ]

    for(let i = 0; i < features.length; i++){
      for(var feature in features[i]){
        if(feature in sum[0]){      
          sum[0][feature] += parseFloat(features[i][feature])
        }
      }
    }

    for(var property in sum[0]){
      sum[0][property] = (sum[0][property] / features.length).toFixed(2)
    }

    return sum[0]
  }


  render(){
    let playlist = <p> Please select a playlist. </p> 
    let features = null
    let playlistFeatures = null

    if(this.state.tracks && (this.state.loadedPlaylistId === this.props.id) && this.state.features ){
      
      //playlist = this.state.tracks.map( track => <div key = { track.id } > { track.name } </div> )
      //console.log(this.state.features)
      playlistFeatures = this.getAverage(this.state.features)

      //features = this.state.features.map( feature => <Feature  featureArr = {feature} /> )
    }
    else{
      playlist = <p> Loading... </p>;
    }

    return(


      <div className = "FullPlaylist">
        
        { this.props.name ? <Playlist image = { this.props.image } name = {this.props.name}/> : null }

        { playlistFeatures  && <Feature featureArr = { playlistFeatures } /> }

        <div> {features} </div>

      </div>

    )
  }
}





export default FullPlaylist;
