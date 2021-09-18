import React, {useEffect, useState} from 'react'
import MainCard from './MainCard'
import SpotifyWebApi from 'spotify-web-api-js';
import TinderCard from 'react-tinder-card';
function MainPage() {
    //get access token from url once. 
    const access_token = new URLSearchParams(window.location.hash).get('#access_token');
    //init state for playlist tracks
    const [playlistTracks, setPlaylistTracks] = useState([]);
    //init state for userID
    const [userID, setUserID] = useState("");


    //react-tinder functions
    const onSwipe = (direction) => {
        console.log('You swiped: ' + direction)
    }
    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
    }

    //functions ran constantly to get playlist
    useEffect(() => {
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(access_token);
        
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
        <div id="MainPage">
            <MainCard access_token={access_token} playlistTracks={playlistTracks} userID={userID}/>
        </div>
    )
}

export default MainPage

