import React, {useEffect, useState} from 'react'
import MainCard from './MainCard'
import SpotifyWebApi from 'spotify-web-api-js';
function MainPage() {
    const access_token = new URLSearchParams(window.location.hash).get('#access_token');
    const [playlistTracks, setPlaylistTracks] = useState([]);
    const [userID, setUserID] = useState("");

    useEffect(() => {
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(access_token);
        // get Elvis' albums, passing a callback. When a callback is passed, no Promise is returned
        let playlistTracks = spotifyApi.getPlaylistTracks('37i9dQZF1DWWBHeXOYZf74', function (err, data) {
            if (err) console.error(err);
            else {
                console.log('Playlist Tracks', data.items);
                setPlaylistTracks(data.items);
            }
        });
        let userID = spotifyApi.getMe(null, function (err, data) {
            if (err) console.error(err);
            else {
                console.log('User ID', data.id);
                setUserID(data.id);
            }
        });
    }, [userID])
    return (
        <div>
            <MainCard access_token={access_token} playlistTracks={playlistTracks} userID={userID}/>
            
        </div>
    )
}

export default MainPage

