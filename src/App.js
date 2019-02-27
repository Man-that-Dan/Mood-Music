import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';


import queryString from 'query-string'
import './App.css';
import Playlist from './components/Playlist';
import Playlists from './components/Playlists';
import FullPlaylist from './components/FullPlaylist';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      accessToken: null,
      loggedIn: false,
    };
  }

  componentDidMount(){
  
    if(this.state.accessToken == null){
      let parsed = queryString.parse(window.location.search)
      this.setState({accessToken: parsed.access_token})
    }

  }

  render() {

    return (
      <BrowserRouter>

        <div className="App">
          <header>
            <nav>
              <ul>
                <li> <Link to = "/"> Playlists </Link> </li>
                <li> <Link to = "/new-post"> New Playlist </Link> </li>
              </ul>
            </nav>
          </header>

          {this.state.loggedIn === true ? null : <a href='http://localhost:8888'> Login to Spotify </a> }

          <Route path="/" exact component = {Playlists}/>
          <Route path="/:id" exact componen = {FullPlaylist} />

        </div>

      </BrowserRouter>
    );
  }
}



export default App;






