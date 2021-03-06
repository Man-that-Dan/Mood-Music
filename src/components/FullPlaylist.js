import React, { Component } from 'react';
import { connect } from 'react-redux';
import Playlist from './Playlist';
import Feature from './FeatureQuant';
import Key from './Key';
import Mode from './Mode';
import Tempo from './Tempo';
import './FullPlaylist.css';
import Loudness from './Loudness';
import styled from 'styled-components';


const FeaturesQuant = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: stretch;
`

const FeaturesNominal = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

class FullPlaylist extends Component{

  state = {
    loadedPlaylistId: null,
    tracks: null,
    features: null,
    sortBy: "energy"
  }

  componentDidMount(){

    if(this.props.name){
      console.log(this.props.name)}

    let playlistId = window.location.href.split('/')[3]

    if(this.props.accessToken && playlistId){
      if( this.state.tracks == null ){
        fetch('https://api.spotify.com/v1/playlists/' + playlistId + '/tracks', {
          headers: {
            'Authorization' : 'Bearer ' + this.props.accessToken},
        }).then(response => response.json())
        .then( data => {
          this.setState({
            tracks: data.items.map( item => {
              if(item.track){ return {
              name: (item.track) ? item.track.name : "",
              artist: (item.track) ? item.track.artists : [],
              id: (item.track) ? item.track.id : ""

           }} else {return null}}).filter(function( element ) {return (element !== undefined && element !== null);}),
            loadedPlaylistId: data.href.split('/')[5]
          })
        })
        .then(() => {
          console.log(this.state.tracks);
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
      var featuresArray = this.state.features;
      var tracksArray = this.state.tracks;
      for (var i = 0; i < featuresArray.length; i++) {
        this.setState({
          tracks: this.state.tracks.map(track => {

            if (track.id === featuresArray[i].id) {
              return {
                ...track,
                danceability: featuresArray[i].danceability,
                acousticness: featuresArray[i].acousticness,
                energy: featuresArray[i].energy,
                speechiness: featuresArray[i].speechiness,
                instrumentalness: featuresArray[i].instrumentalness,
                liveness: featuresArray[i].liveness,
                valence: featuresArray[i].valence,
                key: featuresArray[i].key,
                loudness: featuresArray[i].loudness,
                mode: featuresArray[i].mode,
                tempo: featuresArray[i].tempo
              };
            }
            return track;

          })

        });
    }
    })

  } // Make a request to get the features for all the tracks

  getAverage(features){
    let sum = [ {
      danceability: 0,
      energy: 0,
      speechiness: 0,
      acousticness: 0,
      instrumentalness: 0,
      liveness: 0,
      valence: 0,
      key: 0,
      loudness: 0,
      mode: 0,
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

findId(data, idToLookFor) {
    var featuresArray = data.features;
    for (var i = 0; i < featuresArray.length; i++) {
        if (featuresArray[i].id == idToLookFor) {
            return(featuresArray[i]);
        }
    }
}

setSort(){
  console.log("clicked");
  this.setState({
    sortBy: "danceability"
  });
}
setSort2(){
  console.log("clicked");
  this.setState({
    sortBy: "energy"
  });
}
setSort3(){
  console.log("clicked");
  this.setState({
    sortBy: "speechiness"
  });
}
setSort4(){
  console.log("clicked");
  this.setState({
    sortBy: "acousticness"
  });
}
setSort5(){
  console.log("clicked");
  this.setState({
    sortBy: "instrumentalness"
  });
}
setSort6(){
  console.log("clicked");
  this.setState({
    sortBy: "liveness"
  });
}
setSort7(){
  console.log("clicked");
  this.setState({
    sortBy: "valence"
  });
}
setSort8(){
  console.log("clicked");
  this.setState({
    sortBy: "key"
  });
}
setSort9(){
  console.log("clicked");
  this.setState({
    sortBy: "loudness"
  });
}
setSort10(){
  console.log("clicked");
  this.setState({
    sortBy: "mode"
  });
}
setSort11(){
  console.log("clicked");
  this.setState({
    sortBy: "tempo"
  });
}

StartPlayback(id, type){
  var bod = {
    "context_uri": "spotify:playlist:" + this.props.id
  }
  if(type == "track") {
    bod['offset'] = {"uri": "spotify:track:" + id}
  }
  const { accessToken } = this.state;
  fetch("https://api.spotify.com/v1/me/player/play", {
    method: "PUT",
    headers: {
      authorization: `Bearer ` + (accessToken || this.props.accessToken),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bod),
  });
}



  render(){
    let playlist = <p> Please select a playlist. </p>
    let featuresQuant = null //Features that have 100% value, e.g. danceability
    let playlistFeatures = null

    if(this.state.tracks && (this.state.loadedPlaylistId === this.props.id) && this.state.features ){
      playlistFeatures = this.getAverage(this.state.features)
    }
    else{
      playlist = <p> Loading... </p>;
    } //populate playlistFeatures

    if( playlistFeatures ){
      featuresQuant = Object.keys(playlistFeatures).slice(0, 7).map((keyName, i) => (
        <Feature feature = {keyName} value = {playlistFeatures[keyName]} />
      ))
    } //populate features

    let trackslist = []
    let metric = this.state.sortBy;

    if (this.state.tracks) {
      trackslist = this.state.tracks.sort( //Sort it ...
        function(a,b) { // using a custom sort function that...
          //  compares (the keys) by their respective values.

            return b[metric] - a[metric];
        }).map( track =>
      (track != undefined) ? (
      <div className = "card" style={{margin: '2em', textAlign: 'left'}}>
        <div className = "card-header" style={{height: '48px'}}>
          <h5 className = "card-title trackName">{track.name}</h5>
          <h6 className = "trackArtist"> {track.artist[0].name} </h6>
        </div>
        <div className = "card-body">

            <td><Key value = {track.key} /></td>

            <td><div style={wrapperStyle}>Energy <br/>{Math.round(track.energy * 100)}%</div></td>
            <td><div style={wrapperStyle}>Speechiness <br/>{Math.round(track.speechiness * 100)}%</div></td>
            <td><div style={wrapperStyle}>Acousticness <br/>{Math.round(track.acousticness * 100)}%</div></td>
            <td><div style={wrapperStyle}>Instrumentalness <br/>{Math.round(track.instrumentalness * 100)}%</div></td>
            <td><div style={wrapperStyle}>Liveness <br/>{Math.round(track.liveness * 100)}%</div></td>
            <td><div style={wrapperStyle}>Valence <br/>{Math.round(track.valence * 100)}%</div></td>
            <td><div style={wrapperStyle}>Danceability <br/>{Math.round(track.danceability * 100)} %</div></td>
            <td><Loudness value = {track.loudness} /></td>
            <td><div style={wrapperStyle}>Tempo <br/>{track.tempo}</div></td>

          <button  onClick={() => this.StartPlayback(track.id, 'track')} className = 'Track btn btn-primary' key = {track.id} > Play </button>


        </div>
      </div>) : "")//.sort( //Sort it ...
      //  function(a,b) { // using a custom sort function that...
            // compares (the keys) by their respective values.
        //    return a - hash[b];
        //})
    }

    return(
      <div className = "FullPlaylist">
        <div className = "Playlist-container">
          { this.props.name ? <Playlist image = { this.props.image } name = {this.props.name}/> : null }
          <button  onClick={() => this.StartPlayback(this.props.id, 'playlist')} className = 'PlaylistPlay btn btn-primary' key = {this.props.id} > Play </button>
        </div>
        <div className = "Features">
          <FeaturesNominal>
            { playlistFeatures && <Key value = { playlistFeatures.key } /> }
            { playlistFeatures && <Loudness value = { playlistFeatures.loudness } /> }
            { playlistFeatures && <Mode value = { playlistFeatures.mode } /> }
            { playlistFeatures && <Tempo value = { playlistFeatures.tempo } /> }
          </FeaturesNominal>
          <FeaturesQuant>
            { featuresQuant }
          </FeaturesQuant>
        </div>
        <h3> Select Feature To Sort By </h3>
        <div>

          <button className="sortButton" onClick={this.setSort.bind(this)} > Danceability </button>
          <button className="sortButton" onClick={this.setSort2.bind(this)} > Energy </button>
          <button className="sortButton" onClick={this.setSort3.bind(this)} > Speechiness </button>
          <button className="sortButton" onClick={this.setSort4.bind(this)} > Acousticness </button>
          <button className="sortButton" onClick={this.setSort5.bind(this)} > Instrumentalness </button>
          <button className="sortButton" onClick={this.setSort6.bind(this)} > Liveness </button>
          <button className="sortButton" onClick={this.setSort7.bind(this)} > Valence </button>
          <button className="sortButton" onClick={this.setSort8.bind(this)} > Key </button>
          <button className="sortButton" onClick={this.setSort9.bind(this)} > Loudness </button>
          <button className="sortButton" onClick={this.setSort10.bind(this)} > Mode </button>
          <button className="sortButton" onClick={this.setSort11.bind(this)} > Tempo </button>
        </div>
        <div className = "Tracks"> { trackslist } </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    accessToken: state.accessToken
  };
}

var trackstyle = {
  width: '100%',
  backgroundColor: 'black',
  border: '2px solid #ffffff',
  color: 'white',
  textAlign: 'left',
  fontSize: '18px',
}



var wrapperStyle = {
  display: 'inline-block',
  padding: '11px',
  margin: '5px',
  border: '2px',
  borderStyle: 'solid',
  borderColor: '#bab2b5'
}

export default connect(mapStateToProps) (FullPlaylist);
