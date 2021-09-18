import React, {useEffect} from 'react'
import MainCard from './MainCard'
import SpotifyWebApi from 'spotify-web-api-js';
function MainPage() {
    const access_token = new URLSearchParams(window.location.hash).get('#access_token');
    useEffect(() => {
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(access_token);
        // get Elvis' albums, passing a callback. When a callback is passed, no Promise is returned
        let playlistObject = spotifyApi.getPlaylistTracks('37i9dQZF1DWWBHeXOYZf74', function (err, data) {
            if (err) console.error(err);
            else console.log('Playlist Tracks', data);
        });
        let userInfo = spotifyApi.getMe(null, function (err, data) {
            if (err) console.error(err);
            else console.log('User Info', data);
        });
    })
    return (
        <div id="MainPage">
            <MainCard access_token={access_token}/> 
        </div>
    )
}

export default MainPage

