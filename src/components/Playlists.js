import React, { Component } from "react";
import Playlist from './Playlist';
import FullPlaylist from './FullPlaylist';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


import * as actionTypes from '../store/actions';

class Playlists extends Component{

  constructor(props) {
    super(props);
    this.state = {
      playlists: {},
      loggedIn: false,
      selectedPlaylist: null
    };
  }


  componentDidMount() {
    if (this.props.accessToken != null){
      fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          'Authorization' : 'Bearer ' + this.props.accessToken},
      }).then(response => response.json())
        .then( data => 
          this.setState({
              playlists: data.items.map(item => {return{
                name: item.name,
                id: item.id,
                image: item.images
              }})
          })
        )
    } // Make a request to get all user's Playlists
  }


  playlistSelected = (playlist) => {
    this.setState({selectedPlaylist: playlist})
  } // Handler for a selected Playlist


  render() {
    let playlists = []

    if (this.state.playlists && this.state.playlists.length) {
      playlists = this.state.playlists.map( playlist =>  
      <Link className = 'Playlist' to = { playlist.id } key = {playlist.id} >
        <Playlist 
          image = {playlist.image} 
          name = {playlist.name}
          clicked = {() => this.playlistSelected(playlist)} />
      </Link>)
    } // Map an array of Playlists from the state

    return(
      <div>
        <div className = "Playlists"> { playlists } </div>
        {this.state.selectedPlaylist ? 
          <FullPlaylist
            id = { this.state.selectedPlaylist.id } 
            image = { this.state.selectedPlaylist.image }
            name = { this.state.selectedPlaylist.name } />
        : null }
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    accessToken: state.accessToken
  };
}

export default connect(mapStateToProps) (Playlists);