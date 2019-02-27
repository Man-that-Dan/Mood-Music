import React, { Component } from "react";
import Playlist from './Playlist';
import FullPlaylist from './FullPlaylist';
import { Route } from 'react-router-dom';
import queryString from 'query-string';



class Playlists extends Component{

  
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

      let accessToken = null

      console.log(" mounting ")
        
      if(this.state.accessToken == null){
        console.log(" null ")
        let parsed = queryString.parse(window.location.search)
        accessToken = parsed.access_token
      }
      else{
        console.log(" here ")
        accessToken = this.state.accessToken
      }

      if (accessToken != null){
        console.log(accessToken)
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

        return(
          <div>

            <div className = "Playlists"> { playlists } </div>

            {this.state.selectedPlaylist ? 
              <FullPlaylist accessToken = { this.state.accessToken } 
              id = { this.state.selectedPlaylist.id } 
              image = { this.state.selectedPlaylist.image }
              name = { this.state.selectedPlaylist.name } /> 
              : null }


          </div>
        );

    }

}

export default Playlists;