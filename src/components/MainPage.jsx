import React from 'react'
import MainCard from './MainCard'
import SpotifyWebApi from 'spotify-web-api-js';
function MainPage() {
    const url = window.location;

    const access_token = new URLSearchParams(window.location.hash).get('#access_token');
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken({access_token});

    return (
        <div>
            <MainCard access_token={access_token}/>
            
        </div>
    )
}

export default MainPage

