import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Playlist from './components/Playlist';
import queryString from 'query-string'
import './App.css';
import FullPlaylist from './components/FullPlaylist';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      playlists: {},
      loggedIn: false,
      selectedPlaylist: null
    };
  }

  componentDidMount() {
    let parsed = queryString.parse(window.location.search)
    let accessToken = parsed.access_token
    
    if (accessToken != null){

      fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          'Authorization' : 'Bearer ' + accessToken},
      }).then(response => response.json())
        .then( data => 
          this.setState({
              accessToken: accessToken,
              loggedIn: true,
              playlists: data.items.map(item => {return{
                name: item.name,
                id: item.id,
                image: item.images
              }})
          })
        )
    }
  }

  playlistSelected = (playlist) => {
    this.setState({selectedPlaylist: playlist})
  }

  render() {

    let playlists = []

    if (this.state.playlists && this.state.playlists.length) {
      playlists = this.state.playlists.map( playlist =>  
      <Playlist 
        key = { playlist.id } 
        image = { playlist.image } 
        name = {playlist.name}
        clicked = {() => this.playlistSelected(playlist)} />)
    }  

    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <nav>
              <ul>
                <li> <a href = "/"> Playlists </a> </li>
                <li> <a href = "/Playlist"> New Playlist </a> </li>
              </ul>
            </nav>
          </header>
          {this.state.loggedIn === true ? null : <a href='http://localhost:8888'> Login to Spotify </a> }
          <div className = "Playlists"> { playlists } </div>
          {this.state.selectedPlaylist ? 
              <FullPlaylist accessToken = { this.state.accessToken } 
              id = { this.state.selectedPlaylist.id } 
              image = { this.state.selectedPlaylist.image }
              name = { this.state.selectedPlaylist.name } /> 
              : null }
        </div>
      </BrowserRouter>
    );
  }
}



export default App;






