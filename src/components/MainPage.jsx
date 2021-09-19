import React, {useEffect, useRef, useState} from 'react'
import MainCard from './MainCard'
import SpotifyWebApi from 'spotify-web-api-js';
import TinderCard from 'react-tinder-card';

import TopNav from './TopNav';
import BottomNav from './BottomNav';

let userPlaylistID = ""

function MainPage() {
    //init state for userID
    const [userID, setUserID] = useState("");
    const [tracks, setTracks] = useState([]);
    const [lastDirection, setLastDirection] = useState()
    const accessToken = new URLSearchParams(window.location.hash).get('#access_token');
    const playlistId = new URLSearchParams(window.location.hash).get('playlistId');

    const playlistName = "Swipo 🔥🔥"

    //react-tinder functions
    const swiped = (direction, nameToDelete, songURI) => {
        console.log('removing: ' + nameToDelete + "and direction: " + direction);
        setLastDirection(direction);
        console.log("userplaylistid", userPlaylistID)
        if (userPlaylistID !== "") {
            if (direction === "right") {
                const spotifyApi = new SpotifyWebApi();
                spotifyApi.setAccessToken(accessToken);

                spotifyApi.addTracksToPlaylist(userPlaylistID, [songURI], null,function (err, data) {
                    if (err) console.error(err);
                    else {
                        //TODO: Add error handling message
                        console.log("add track data", data)
                    }
                });
            }
        }
        // create new thing to say true that song was played
        const tracksNew = [...tracks];
        tracksNew.find(track => track.name == nameToDelete).isSwiped++;
        setTracks(tracksNew);
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    //functions ran constantly to get playlist
    useEffect(() => {
        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(accessToken);
        
        spotifyApi.getPlaylistTracks(playlistId, function (err, data) {
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
        //if id is found, get the users playlists and see if a swipo playlist is already there.
        //if it is, setUserPlaylistID.
        //if it isn't create Playlist and retrieve that playlist id
        if (userID !== "") {
            spotifyApi.getUserPlaylists(userID,null, function (err, data) {
                if (err) {
                    console.error(err);
                }
                else {
                    if (data !== undefined) {
                        for (let i = 0; i < data.items.length; i++) {
                            if (data.items[i].name === playlistName) {
                                userPlaylistID = (data.items[i].id);
                            }
                        }
                    }

                    if (userPlaylistID === "") {
                        spotifyApi.createPlaylist(userID,{name: playlistName}, function (err, data) {
                            if (err) console.error(err);
                            else {
                                userPlaylistID = (data.id)
                            }
                        });
                    }
                }
            });
        }
        }, [userID, userPlaylistID]
    )
    if (tracks !== undefined) {
        return (
            <div id="MainPage">
                <TopNav/>
                <div className='cardContainer'>
                    {
                        tracks.map((track) => 
                            <TinderCard className='swipe' key={track.name} onSwipe={(dir) => swiped(dir, track.name, track.songURI)}
                                onCardLeftScreen={() => outOfFrame(track.name)} preventSwipe = {['up', 'down']}>
                                <MainCard track={track} isSwiped={track.isSwiped}/>
                            </TinderCard>
                        )
                    }
                </div>
                <BottomNav/>
            </div>
        )
    } else {
        return (
            <div id="MainPage">
                <TopNav/>
                <BottomNav/>
            </div>
        )
    }
}

function getTrackInfo(playlistTracks, songCounter) {
    if (playlistTracks === undefined || playlistTracks === null || playlistTracks.length === 0) {
        console.log("playlistTracks is undefined or 0, ");
        return [];
    }

    const properties = playlistTracks[songCounter].track;
    const songName = properties.name;
    let artists = "";
    for (let i = 0; i < properties.artists.length; i++) {
        artists += properties.artists[i].name;
        console.log("artist right now:", properties.artists[i].name)
        console.log("artists string right now:", artists)
        if (i !== properties.artists.length - 1) artists += ", ";
    }

    const albumImageUrl = properties.album.images[0].url;
    const musicPreviewUrl = properties.preview_url;
    const songURI = properties.uri;
    return {name: songName, artists: artists, albumImageUrl: albumImageUrl, musicPreviewUrl: musicPreviewUrl, songURI: songURI, isSwiped: 0};
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

