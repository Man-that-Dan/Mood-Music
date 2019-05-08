import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import queryString from 'query-string';
import './App.css';
import Playlists from './components/Playlists';
import FullPlaylist from './components/FullPlaylist';
import * as actionTypes from './store/actions';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      loggedIn: false,
      deviceId: "",
      error: "",
      trackName: "Track Name",
      artistName: "Artist Name",
      albumName: "Album Name",
      playing: false,
      position: 0,
      duration: 0,
      playerLaunched: null,
    };
    this.playerCheckInterval = null;
  }


  componentDidMount(){
    if(this.props.accessToken == null){
      let parsed = queryString.parse(window.location.search)
      this.props.onAccesTokenReceived(parsed.access_token)
    } // Update the Redux state with new accessToken
  }

  checkForPlayer() {
  const { accessToken } = this.props;

  if (window.Spotify !== null) {
    clearInterval(this.playerCheckInterval);
    this.player = new window.Spotify.Player({
      name: "Mood-Music",
      getOAuthToken: cb => { cb(accessToken); },
    });
    this.createEventHandlers();
    this.setState({playerLaunched: true});
    // finally, connect!
    this.player.connect();
  }
}

createEventHandlers() {
  this.player.on('initialization_error', e => { console.error(e); });
  this.player.on('authentication_error', e => {
    console.error(e);
    this.setState({ loggedIn: false });
  });
  this.player.on('account_error', e => { console.error(e); });
  this.player.on('playback_error', e => { console.error(e); });

  // Playback status updates
  this.player.on('player_state_changed', state => this.onStateChanged(state));

  // Ready
  this.player.on('ready', async data => {
    let { device_id } = data;
    console.log("Let the music play on!");
    await this.setState({ deviceId: device_id });
    this.transferPlaybackHere();
  });
}

handleLogin() {
  if (this.props.accessToken !== null) {
    this.setState({ loggedIn: true });
    this.setState({ accessToken: this.props.accessToken });
    // check every second for the player.
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
  }
}

onStateChanged(state) {
  // if we're no longer listening to music, we'll get a null state.
  if (state !== null) {
    const {
      current_track: currentTrack,
      position,
      duration,
    } = state.track_window;
    const trackName = currentTrack.name;
    const albumName = currentTrack.album.name;
    const artistName = currentTrack.artists
      .map(artist => artist.name)
      .join(", ");
    const playing = !state.paused;
    this.setState({
      position,
      duration,
      trackName,
      albumName,
      artistName,
      playing
    });
  }
}

transferPlaybackHere() {
  const { deviceId, token } = this.state;
  fetch("https://api.spotify.com/v1/me/player", {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "device_ids": [ deviceId ],
      "play": true,
    }),
  });
}

  // let redirect_uri = 'http://18.217.115.146:3000'
  // let my_client_id = 'b73df62cecef48919ce8a24a6b520f42';
  // let scopes = 'user-read-private user-read-email';
  // let url = 'https://accounts.spotify.com/authorize' +
  // '?response_type=code' +
  // '&client_id=' + my_client_id +
  // (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
  // '&redirect_uri=' + encodeURIComponent(redirect_uri);
  //

  onPrevClick() {
    this.player.previousTrack();
  }

  onPlayClick() {
    this.player.togglePlay();
  }

  onNextClick() {
    this.player.nextTrack();
  }




  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <div style={titleStyle}>
            Mood-Music v1
            </div>
            <nav>
              <ul>
                <li> <Link style={TextStyle} to = "/"> Playlists </Link> </li>
                <li> <Link style={TextStyle} to = "/"> About </Link> </li>
              </ul>
            </nav>
          </header>
            { this.state.accessToken === null ? <a href='http://18.217.115.146:3004/login'> Login to Spotify </a> : null }
            { this.state.playerLaunched === null ? <button onClick={this.handleLogin.bind(this)} > then Launch player </button> : null }


          <Switch>
            { this.props.accessToken && <Route path="/" component={ Playlists }/> }

          </Switch>


          { this.state.playerLaunched != null ? <div className="ControlBar">
            <p>Artist: {this.stateartistName} Track: {this.statetrackName} Album: {this.statealbumName}</p>
            <p>
            <button onClick={() => this.onPrevClick()} >Previous</button>
            <button onClick={() => this.onPlayClick()} >{this.state.playing ? "Pause" : "Play"}</button>
            <button onClick={() => this.onNextClick()} >Next</button>
            </p>



            </div>: null}

        </div>
      </BrowserRouter>
    );
  }
}

var TextStyle = {
  backgroundColor : '#000000',
  color: 'green',
  padding: '6px',
  borderRadius: '21%',
  border: '3px solid green',
  fontFamily: 'sans-serif'
}

var titleStyle = {
  fontFamily: 'sans-serif',
  fontWeight: 'bold',
  textAlign: 'left',
  padding: '1em',
}

var aboutStyle = {
  padding: '2em',
  fontFamily: 'sans-serif',
}

const mapStateToProps = state => {
  return {
    accessToken: state.accessToken
  };
}


 const mapDispathToProps = dispatch => {
  return {
    onAccesTokenReceived: (accessToken) => dispatch({type: actionTypes.SET_ACCESS_TOKEN, accessToken: accessToken})
  }
}


export default connect(mapStateToProps, mapDispathToProps) (App);
