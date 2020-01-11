import React, { Component } from 'react';
import styled from 'styled-components';


class About extends Component{
  render(){
    return(
      <div style={{height: '500px', padding: '5em'}}>
        <h5> Welcome to Mood-Music, </h5>
        <h6> An app to help you precisely pick music to fit your mood</h6>
        <p style={{textAlign: 'left'}}> This app displays interesting metadata about tracks and playlists to help users pick music to fit a
        certain mood. Soon this app will also let you craft playlists based on specific characteristics</p>
      </div>
    )
  }
}

export default About
