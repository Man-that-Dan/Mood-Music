import React, { Component } from 'react';

import Playlist from './Playlist';


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
        .then(() => {  let tracks = this.state.tracks.map( track => track.id ).join(',');
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
        .then(() => {  let tracks = this.state.tracks.map( track => track.id ).join(',');
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
        console.log(data)
    })
  }


  render(){
    let playlist = <p> Please select a playlist. </p> 

    if(this.state.tracks && (this.state.loadedPlaylistId === this.props.id) ){
      playlist = this.state.tracks.map( track => <div key = { track.id } > { track.name } </div> )
    }
    else{
      playlist = <p> Loading... </p>;
    }

    return(

      <div>
        
        { this.props.name ? <Playlist image = { this.props.image } name = {this.props.name}/> : null }

        <div> Full Playlist {playlist} </div>

      </div>

    )
  }
}





export default FullPlaylist;
