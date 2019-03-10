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
      loggedIn: false,
    };
  }

  componentDidMount(){
  
      console.log(this.props)


    if(this.props.accessToken == null){
      let parsed = queryString.parse(window.location.search)
      this.props.onAccesTokenReceived(parsed.access_token)
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
                <li> <Link to = "/new-playlist"> New Playlist </Link> </li>
              </ul>
            </nav>
          </header>

          {this.state.loggedIn === true ? null : <a href='http://localhost:8888'> Login to Spotify </a> }

          <Switch>

            { this.props.accessToken && <Route path="/" exact component={ Playlists }/> }
            { this.props.accessToken && <Route path="/:id" component={ FullPlaylist } /> }

          </Switch>

        </div>


      </BrowserRouter>

    );
  }
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






