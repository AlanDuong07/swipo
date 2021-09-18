import React, {useEffect, useState} from 'react'
import MainCard from './MainCard'
import SpotifyWebApi from 'spotify-web-api-js';
import TinderCard from 'react-tinder-card';
function MainPage() {
    //get access token from url once. 
    const access_token = new URLSearchParams(window.location.hash).get('#access_token');
    //init state for userID
    const [userID, setUserID] = useState("");
    const [tracks, setTracks] = useState([]);
    const [playlistMade, setPlaylistMade] = useState(false)

    //init state for tinder card
    const [lastDirection, setLastDirection] = useState()

    //react-tinder functions
    const swiped = (direction, nameToDelete) => {
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }
    
    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }


    //functions ran constantly to get playlist
    useEffect(() => {
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(access_token);
        
        spotifyApi.getPlaylistTracks('37i9dQZF1DWWBHeXOYZf74', function (err, data) {
            if (err) console.error(err);
            else {
                setTracks(createAllTracks(data.items));
                console.log('Tracks object for tinder swipe', tracks);
            }
        });
        spotifyApi.getMe(null, function (err, data) {
            if (err) console.error(err);
            else {
                console.log('User ID', data.id);
                setUserID(data.id);
            }
        });
    }, [userID])
    if (tracks !== undefined) {
        return (
            <div id="MainPage">
                <div className='cardContainer'>
                    {
                        tracks.map((track) => 
                            <TinderCard className='swipe' key={track.name} onSwipe={(dir) => swiped(dir, track.name)} 
                                onCardLeftScreen={() => outOfFrame(track.name)}>
                                <MainCard accessToken={access_token} track={track}/>
                            </TinderCard>
                        )
                    }
                </div>
            </div>
        )
    } else {
        return (
            <div id="MainPage">

            </div>
        )
    }
}

function getTrackInfo(playlistTracks, songCounter) {
    // console.log("starting getTrackInfo: playlist tracks", playlistTracks);
    if (playlistTracks === undefined || playlistTracks === null || playlistTracks.length === 0) {
        console.log("playlistTracks is undefined or 0, ");
        return [];
    }

    const properties = playlistTracks[songCounter].track;
    const songName = properties.name;
    let artists = "";
    for (let i = 0; i < properties.artists.length; i++) {
        artists.concat(properties.artists[i].name);
        if (i === properties.artists.length - 1) artists.concat(", ");
    }
    const albumImageUrl = properties.album.images[0].url;
    const musicPreviewUrl = properties.preview_url;
    return {name: songName, artists: artists, albumImageUrl: albumImageUrl, musicPreviewUrl: musicPreviewUrl};
}

function createAllTracks(playlistTracks) {
    let tracks = [];
    if (playlistTracks === undefined || playlistTracks.length === 0) {
        console.log("createAllTracks terminated because playLists tracks is empty");
        return;
    }
    for (let i = 0; i < playlistTracks.length; i++) {
        tracks.push(getTrackInfo(playlistTracks, i));
    }
    console.log("Tracks", tracks);
    return tracks
}

export default MainPage

