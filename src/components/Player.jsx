import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import TinderCardContainer from './TinderCardContainer';
// import MainCard from './MainCard'
// import TinderCard from 'react-tinder-card';


function Player() {
    const [{ current_playlist, playlist_type, spotify, current_track, current_tracks }, dispatch] = useStateValue();
    const history = useHistory()
    let playlistNeedsChanging = true
    
    useEffect(() => {
        //determine if the playlistNeedsChanging. Do so by referencing the current_playlist and checking if the current_tracks[1] playlistID is
        //not the same as the current_playlist's id. That would indicate that the playlist has just changed, and thus a new current_tracks object
        //should be created.
        if (current_playlist !== null && current_tracks !== null) {
            if (current_playlist.id !== current_tracks[1]) {
                console.log("Playlist changed! current_playlist.id vs. current_tracks[1]: ", current_playlist.id, current_tracks[1])
                // setPlaylistNeedsChanging(true)
                playlistNeedsChanging = true
            } else {
                // setPlaylistNeedsChanging(false)
                playlistNeedsChanging = false
            }
        }
    }, [current_playlist, current_tracks, playlistNeedsChanging])

    //useEffect that runs whenever the spotify web api object or the current_playlist changes.
    //Will get the playlist tracks from the playlist and create a custom tracks object out of it,
    //which we will map to individual MainCard components.
    //Will set global state for current_tracks and current_track (a value used to determine whether audio should be played)
    useEffect(() => {
        if (playlistNeedsChanging === true && spotify !== null && current_playlist !== null && playlist_type !== null) {
            console.log("I'm changing the playlist, since it actually needs changing!")
            if (playlist_type === "playlist") {
                spotify.getPlaylistTracks(current_playlist.id, function (err, data) {
                    if (err) console.error("Couldn't get the playlist tracks! current_playlist and error is: " + current_playlist + err);
                    else {
                        let tracks_object = createAllPlaylistTracks(data.items, current_playlist.id)
                        dispatch({
                            type: "SET_CURRENT_TRACKS",
                            current_tracks: tracks_object
                        })
                        dispatch({
                            type: "SET_CURRENT_TRACK",
                            current_track: tracks_object[0][0]
                        })
                    }
                });
            } else {
                spotify.getAlbumTracks(current_playlist.id, function (err, data) {
                    console.log("Just got the Album data: ", data)
                    if (err) console.error("Couldn't get the album tracks! current_playlist and error is: " + current_playlist + err);
                    else {
                        let tracks_object = createAllAlbumTracks(data.items, current_playlist.images[0].url, current_playlist.id)
                        dispatch({
                            type: "SET_CURRENT_TRACKS",
                            current_tracks: tracks_object
                        })
                        dispatch({
                            type: "SET_CURRENT_TRACK",
                            current_track: tracks_object[0][0]
                        })
                    }
                });
            }
            console.log("Finished creating the playlist/album. Setting playlistNeedsChanging to false until it changes again.")
            // setPlaylistNeedsChanging(false)
            playlistNeedsChanging = false
            console.log(playlistNeedsChanging)
        }
    }, [spotify, current_playlist, playlist_type, playlistNeedsChanging, dispatch])

    // useEffect that checks if the playlist has been completely swiped on. If so, redirect to the genrepage to continue discovering music.
    useEffect(() => {
        //first try retrieving a current_playlist from local storage, in the case that the user
        //simply refreshed the page. 
        let localPlaylist = JSON.parse(localStorage.getItem('Current Playlist'));
        if (localPlaylist && !current_playlist) {
            dispatch({
                type: "SET_CURRENT_PLAYLIST",
                current_playlist: localPlaylist
            })
        } else if (current_track === null && current_tracks === null && current_playlist === null) {
            history.push("/main/genrepicker")
        }
    }, [current_playlist, current_track, current_tracks, dispatch, history])
    
    
    





    //CONDITIONAL RENDERING OF THE PLAYER COMPONENT. Don't render the cards if there isn't a current_tracks object yet!
    if (current_tracks !== null && current_tracks !== undefined) {
        return (
            <TinderCardContainer/>
        )
    } else {
        return (
            <div>
                
            </div>
        )
    }
    
}










//FUNCTIONS USED WHEN SETTINGS TRACKS AFTER PLAYLIST SELECTED


//Helper function for createAllTracks. Specifically for playlists. Get's a single track at the songCounter index in playlistTracks.
//and creates the custom track object, as well as a boolean as to whether this track is a valid, playable track. returns these two
//items in an array.
function getPlaylistTrackInfo(playlistTracks, songCounter) {
    let trackIsValid = true
    //if the playlistTracks input is empty, don't continue.
    if (playlistTracks === undefined || playlistTracks === null || playlistTracks.length === 0) {
        console.log("playlistTracks is undefined or 0, ");
        return [];
    }
    // console.log("playlistTracks in getPlaylistTrackInfo", playlistTracks)

    let songName = null
    let artists = ""
    let albumImageUrl = null
    let musicPreviewUrl = null
    let songURI = null
    let openSpotifyUrl = null
    //check if this current track is a valid track. If it is, 
    //it will replace the default fields for the track with valid data.
    let properties = playlistTracks[songCounter].track;
    if (properties !== undefined && properties !== null) {
        songName = properties.name;
        for (let i = 0; i < properties.artists.length; i++) {
            artists += properties.artists[i].name;
            if (i !== properties.artists.length - 1) artists += ", ";
        }

        albumImageUrl = properties.album.images[0].url;
        musicPreviewUrl = properties.preview_url;
        songURI = properties.uri;
        openSpotifyUrl = properties.external_urls.spotify
    } 

    //check if any of the fields are still empty. If it is, then this track is invalid,
    //and shouldn't be played. Return false as a second return value, to indicate that.
    //later, possibly allow some of these to be empty, if it isn't integral to discovering the song.
    if (songName === null || artists === "" || albumImageUrl === null || musicPreviewUrl === null || songURI === null || openSpotifyUrl === null) {
        trackIsValid = false
        return [{}, trackIsValid]
    }


    //the track is valid! return it
    return [{name: songName, artists: artists, albumImageUrl: albumImageUrl, musicPreviewUrl: musicPreviewUrl, songURI: songURI, openSpotifyUrl: openSpotifyUrl}, trackIsValid];
}

//Helper function for createAllTracks. Specifically for albums, so a imageURL is needed. 
//Get's a single track at the songCounter index in playlistTracks.
//and creates the custom track object, as well as a boolean as to whether this track is a valid, playable track. returns these two
//items in an array.
function getAlbumTrackInfo(playlistTracks, songCounter, imageURL) {
    let trackIsValid = true
    // console.log("imageURL in getAlbumTrackInfo", imageURL)
    if (playlistTracks === undefined || playlistTracks === null || playlistTracks.length === 0) {
        console.log("playlistTracks is undefined or 0, ");
        return [];
    }
    // console.log("playlistTracks", playlistTracks)

    let songName = null
    let artists = ""
    let albumImageUrl = imageURL
    let musicPreviewUrl = null
    let songURI = null
    let openSpotifyUrl = null
    //check if this current track is a valid track. If it is, 
    //it will replace the default fields for the track with valid data.
    let properties = playlistTracks[songCounter]
    if (properties !== undefined && properties !== null) {
        songName = properties.name
        for (let i = 0; i < properties.artists.length; i++) {
            artists += properties.artists[i].name
            if (i !== properties.artists.length - 1) artists += ", "
        }
        musicPreviewUrl = properties.preview_url
        songURI = properties.uri
        openSpotifyUrl = properties.external_urls.spotify
    }

    //check if any of the fields are still empty. If it is, then this track is invalid,
    //and shouldn't be played. Return false as a second return value, to indicate that.
    if (songName === null || artists === "" ||  musicPreviewUrl === null || songURI === null || openSpotifyUrl === null) {
        trackIsValid = false
        return [{}, trackIsValid]
    }

    //the track is valid! return it
    return [{name: songName, artists: artists, albumImageUrl: albumImageUrl, musicPreviewUrl: musicPreviewUrl, songURI: songURI, openSpotifyUrl: openSpotifyUrl}, trackIsValid];
}



//function that creates our custom tracks object that will be mapped to a Tinder Card. Skips over
//any songs that do not have a Spotify preview URL. It returns the custom track object as well as
//the playlistID that those tracks are created out of (used by the player to detect when a playlist has changed or not)
function createAllPlaylistTracks(playlistTracks, playlistID) {
    let tracks = [];
    if (playlistTracks === undefined || playlistTracks.length === 0) {
        console.log("createAllPlaylistTracks terminated because playLists tracks is empty!");
        return;
    }

    //go through all of the playlist tracks and create a track object out of
    //each of them, adding them to our tracks list if they are valid.
    for (let i = 0; i < playlistTracks.length; i++) {
        let arrayCurTrack = getPlaylistTrackInfo(playlistTracks, i)
        let curTrack = arrayCurTrack[0]
        let curTrackIsValid = arrayCurTrack[1]
        if (curTrackIsValid) {
            tracks.push(curTrack);
        }
    }
    console.log("Tracks object after creation:", tracks);
    return [tracks, playlistID]
}

//For albums: function that creates our custom tracks object that will be mapped to a Tinder Card. Skips over
//any songs that do not have a Spotify preview URL. 
function createAllAlbumTracks(playlistTracks, imageURL, playlistID) {
    let tracks = [];
    if (playlistTracks === undefined || playlistTracks.length === 0) {
        console.log("createAllAlbumTracks terminated because playLists tracks is empty!");
        return;
    }
    for (let i = 0; i < playlistTracks.length; i++) {
        let arrayCurTrack = getAlbumTrackInfo(playlistTracks, i, imageURL)
        let curTrack = arrayCurTrack[0]
        let curTrackIsValid = arrayCurTrack[1]
        if (curTrackIsValid) {
            tracks.push(curTrack);
        }
    }
    console.log("Tracks object after creation:", tracks);
    return [tracks, playlistID]
}

export default Player
