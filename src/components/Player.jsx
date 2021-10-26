import React, {useEffect} from 'react'
import { useStateValue } from "../StateProvider";
import MainCard from './MainCard'
import TinderCard from 'react-tinder-card';

let current_playlist_id = ""
function Player() {
    const [{ current_playlist, spotify, current_tracks, swipo_playlist }, dispatch] = useStateValue();

    useEffect(() => {
        console.log("In Current Playlist useEffect")
        dispatch({
            type: "SET_CURRENT_PLAYLIST",
            current_playlist: current_playlist
        })
    }, [current_playlist, dispatch])


    //functions on load and whenever the current playlist changes
    useEffect(() => {
        if (spotify != null && current_playlist != null) {
            spotify.getPlaylistTracks(current_playlist.id, function (err, data) {
                if (err) console.error("Couldn't get the playlist tracks! current_playlist_id and error is: " + current_playlist_id + err);
                else {
                    let tracks_object = createAllTracks(data.items)
                    dispatch({
                        type: "SET_CURRENT_TRACKS",
                        current_tracks: tracks_object
                    })
                    dispatch({
                        type: "SET_CURRENT_TRACK",
                        current_track: tracks_object[0]
                    })
                }
            });
        }
    }, [spotify, current_playlist, dispatch])

    useEffect(() => {
        // console.log("useEffect Player swipo playlist")
        dispatch({
            type: "SET_SWIPO_PLAYLIST",
            swipo_playlist: swipo_playlist
        })
    }, [swipo_playlist, dispatch])

    //functions for React Tinder Card
    //if the card was swiped in a direction, either save it or do nothing
    const swiped = function(direction, songURI) {
        if (current_tracks !== null) {
            console.log("Swipo playlist id: " + swipo_playlist)
            // if (direction === "right" && swipo_playlist_id !== "") {
            if (direction === "right" && swipo_playlist !== null) {
                console.log("hello")
                spotify.addTracksToPlaylist(swipo_playlist.id, [songURI], null, function (err, data) {
                    if (err) console.error(err);
                    else {
                        console.log("Added track data to Swipo Playlist: ", data)
                    }
                });
            }
        }
        //Find the next track after the one just deleted. Make that the current track.
        //That will allow that track's audio to be automatically played.
        for (let i = 0; i < current_tracks.length; i++) {
            if (current_tracks[i].songURI === songURI) {
                // console.log("Found the current track!")
                // console.log("songURI of song just deleted: ", songURI)
                dispatch({
                    type: "SET_CURRENT_TRACK",
                    current_track: current_tracks[i + 1]
                })
            }
        }
    }

    const outOfFrame = function(name) {
        console.log(name + ' left the screen!')
    }


    //CONDITIONAL RENDERING OF THE PLAYER COMPONENT
    if (current_tracks !== null && current_tracks !== undefined) {
        return (
            <div className='cardContainer'>
                {
                    current_tracks.map((track) => 
                        <TinderCard className='swipe' key={track.name} onSwipe={(dir) => swiped(dir, track.songURI)}
                            onCardLeftScreen={() => outOfFrame(track.name)} preventSwipe = {['up', 'down']}>
                            <MainCard track={track} isSwiped={track.isSwiped} songURI={track.songURI}/>
                        </TinderCard>
                    )
                }
            </div>
        )
    } else {
        return (
            <div className='cardContainer'>

            </div>
        )
    }
    
}




//FUNCTIONS USED WHEN SETTINGS TRACKS AFTER PLAYLIST SELECTED


//Helper function for createAllTracks. Get's a single track at the songCounter index in playlistTracks.
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
        if (i !== properties.artists.length - 1) artists += ", ";
    }

    const albumImageUrl = properties.album.images[0].url;
    const musicPreviewUrl = properties.preview_url;
    const songURI = properties.uri;
    return {name: songName, artists: artists, albumImageUrl: albumImageUrl, musicPreviewUrl: musicPreviewUrl, songURI: songURI, isSwiped: 0};
}

//function that creates our custom tracks object that will be mapped to a Tinder Card. Skips over
//any songs that do not have a Spotify preview URL.
function createAllTracks(playlistTracks) {
    let tracks = [];
    if (playlistTracks === undefined || playlistTracks.length === 0) {
        console.log("createAllTracks terminated because playLists tracks is empty!");
        return;
    }
    for (let i = 0; i < playlistTracks.length; i++) {
        let cur = getTrackInfo(playlistTracks, i)
        if (cur.musicPreviewUrl != null) {
            tracks.push(cur);
        }
    }
    console.log("Tracks object after creation:", tracks);
    return tracks
}

export default Player
