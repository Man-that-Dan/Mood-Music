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
      baseURL: window.location.href.split(':')[1],
      loggedIn: false,
      deviceId: "",
      error: "",
      trackName: null,
      artistName: null,
      albumName: null,
      albumCover: null,
      playing: false,
      position: 0,
      duration: 0,
      playerLaunched: null,
    };
    this.playerCheckInterval = null;
    if(this.props.accessToken == null){
      let parsed = queryString.parse(window.location.search)
      if(parsed.access_token == null){
        window.location.href = this.state.baseURL + ':3004/login';
      };
      this.props.onAccesTokenReceived(parsed.access_token)
      this.state.accessToken = parsed.access_token;
      this.handleLogin();
    } // Update the Redux state with new accessToken
  }


  componentDidMount(){

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
  console.log('token is currently: ' + this.props.accessToken);
  if (this.props.accessToken !== null) {
    this.setState({ loggedIn: true });
    this.setState({ accessToken: this.props.accessToken });
    // check every second for the player.
    this.playerCheckInterval = setInterval(() => this.checkForPlayer(), 1000);
  }
  if (this.state.accessToken !== null){
    this.setState({ loggedIn: true });
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

    const albumCover = currentTrack.album.images[0].url;
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
      albumCover,
      playing
    });

  }

}

transferPlaybackHere() {
  const { deviceId, accessToken } = this.state;
  fetch("https://api.spotify.com/v1/me/player", {
    method: "PUT",
    headers: {
      authorization: `Bearer ` + (accessToken || this.props.accessToken),
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
            <div style={{width: '100%', textAlign: 'left'}}>
              <div style={titleStyle}>
              Mood-Music v2
              </div>
              <nav style={{display: 'inline-block'}}>
                <ul>
                  <li> <Link to = "/"><button className="btn btn-primary" > Playlists </button></Link> </li>
                  <li> <Link to = "/about"><button className="btn btn-primary" to = "/"> About </button></Link> </li>
                </ul>
              </nav>
            </div>
          </header>




          <Switch>
            { this.props.accessToken && <Route exact strict path="/" component={ Playlists }/> }

          </Switch>


          { this.state.playerLaunched != null ? <div className="ControlBar" style={{textAlign: 'left'}}>
            <div style={{display: 'inline-block'}} id="currentlyPlaying">
              <img style={{height: '100px', width: '100px', display: 'inline-block', }} src={this.state.albumCover} />
              <div style={{display: 'inline-block', verticalAlign: 'bottom', marginLeft: '10px', overflow: 'hidden', maxWidth: '300px'}} >
                <table>
                  <tr className={(this.state.trackName != null && this.state.trackName.length > 30) ? "tech-slideshow" : ""}>
                    <td class="mover-1">
                      <p  style={{width: '500px', overflow: 'visible', whiteSpace: 'pre'}}>{(this.state.trackName != null && this.state.trackName.length > 30) ? spaces + this.state.trackName : this.state.trackName}</p>
                    </td>
                  </tr>
                  <tr className={(this.state.artistName != null && this.state.artistName.length > 30) ? "tech-slideshow" : ""}>
                    <td class="mover-1">
                      <p  style={{opacity: '80%', width: '500px', overflow: 'visible', whiteSpace: 'pre'}}>{(this.state.artistName != null && this.state.artistName.length > 30) ? spaces + this.state.artistName : this.state.artistName}</p>
                    </td>
                  </tr>
                </table>


              </div>
            </div>
            <p style={{display: 'inline-block'}}>
            <button style={ controlButton } onClick={() => this.onPrevClick()} ><img style={ controlImage } src= { "images/previous.png" } /></button>
            <button style={ controlButton } onClick={() => this.onPlayClick()} >{this.state.playing ? <img style={ controlImage } src= { "images/pause.png" } /> : <img style={ controlImage } src= { "images/play.png" } />}</button>
            <button style={ controlButton } onClick={() => this.onNextClick()} ><img style={ controlImage } src= { "images/next.png" } /></button>
            </p>



            </div>: null}

        </div>
      </BrowserRouter>
    );
  }
}

var spaces = '                                                                              '

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
  textAlign: 'left',
  padding: '1em',
  display: 'inline-block'
}

var aboutStyle = {
  padding: '2em',
  fontFamily: 'sans-serif',
}

var controlButton = {
  borderRadius: '20%',
  background: 'white',
  margin: '10px'
}

var controlImage = {
  height: '20px',
  width: '20px'
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
