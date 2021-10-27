import React, {useEffect} from 'react'
import { useStateValue } from "../StateProvider";
import MainCard from './MainCard'
import TinderCard from 'react-tinder-card';

function Player() {
    const [{ current_playlist, playlist_type, spotify, current_tracks, swipo_playlist }, dispatch] = useStateValue();

    //useEffect that runs whenever the spotify web api obkect or the current_playlist changes.
    //Will get the playlist tracks from the playlist and create a custom tracks object out of it,
    //which we will map to individual MainCard components.
    //Will set global state for current_tracks and current_track (a value used to determine whether audio should be played)
    useEffect(() => {
        if (spotify !== null && current_playlist !== null && playlist_type !== null) {
            if (playlist_type === "playlist") {
                spotify.getPlaylistTracks(current_playlist.id, function (err, data) {
                    if (err) console.error("Couldn't get the playlist tracks! current_playlist and error is: " + current_playlist + err);
                    else {
                        let tracks_object = createAllPlaylistTracks(data.items)
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
            } else {
                spotify.getAlbumTracks(current_playlist.id, function (err, data) {
                    console.log("Just got the Album data: ", data)
                    if (err) console.error("Couldn't get the album tracks! current_playlistand error is: " + current_playlist + err);
                    else {
                        let tracks_object = createAllAlbumTracks(data.items, current_playlist.images[0].url)
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
        }
    }, [spotify, current_playlist, playlist_type, dispatch])
    //Function ran whenever a MainCard is swiped. If the card was swiped right, the song will be saved to
    //a Swipo playlist. If that playlist does not already exist, then create that playlist and try again.
    const swiped = function(direction, songURI) {
        if (current_tracks !== null) {
            if (direction === "right" && swipo_playlist !== null) {
                // console.log("hello")
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


    //CONDITIONAL RENDERING OF THE PLAYER COMPONENT. Don't render the cards if there isn't a current_tracks object yet!
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


//Helper function for createAllTracks. Specifically for playlists. Get's a single track at the songCounter index in playlistTracks.
//and creates the custom track object.
function getPlaylistTrackInfo(playlistTracks, songCounter) {
    if (playlistTracks === undefined || playlistTracks === null || playlistTracks.length === 0) {
        console.log("playlistTracks is undefined or 0, ");
        return [];
    }
    // console.log("playlistTracks", playlistTracks)
    let properties = playlistTracks[songCounter].track;
    const songName = properties.name;
    let artists = "";
    for (let i = 0; i < properties.artists.length; i++) {
        artists += properties.artists[i].name;
        if (i !== properties.artists.length - 1) artists += ", ";
    }

    const albumImageUrl = properties.album.images[0].url;
    const musicPreviewUrl = properties.preview_url;
    const songURI = properties.uri;
    return {name: songName, artists: artists, albumImageUrl: albumImageUrl, musicPreviewUrl: musicPreviewUrl, songURI: songURI};
}

//Helper function for createAllTracks. Specifically for albums, as an image url is needed
//as input.  Get's a single track at the songCounter index in playlistTracks and creates the custom track object.
function getAlbumTrackInfo(playlistTracks, songCounter, imageURL) {
    console.log("imageURL in getAlbumTrackInfo", imageURL)
    if (playlistTracks === undefined || playlistTracks === null || playlistTracks.length === 0) {
        console.log("playlistTracks is undefined or 0, ");
        return [];
    }
    console.log("playlistTracks", playlistTracks)
    let properties = playlistTracks[songCounter];
    const songName = properties.name;
    let artists = "";
    for (let i = 0; i < properties.artists.length; i++) {
        artists += properties.artists[i].name;
        if (i !== properties.artists.length - 1) artists += ", ";
    }

    const albumImageUrl = imageURL
    const musicPreviewUrl = properties.preview_url;
    const songURI = properties.uri;
    return {name: songName, artists: artists, albumImageUrl: albumImageUrl, musicPreviewUrl: musicPreviewUrl, songURI: songURI};
}



//function that creates our custom tracks object that will be mapped to a Tinder Card. Skips over
//any songs that do not have a Spotify preview URL.
function createAllPlaylistTracks(playlistTracks) {
    let tracks = [];
    if (playlistTracks === undefined || playlistTracks.length === 0) {
        console.log("createAllPlaylistTracks terminated because playLists tracks is empty!");
        return;
    }
    for (let i = 0; i < playlistTracks.length; i++) {
        let cur = null
        cur = getPlaylistTrackInfo(playlistTracks, i)
        if (cur.musicPreviewUrl != null) {
            tracks.push(cur);
        }
    }
    console.log("Tracks object after creation:", tracks);
    return tracks
}

//For albums: function that creates our custom tracks object that will be mapped to a Tinder Card. Skips over
//any songs that do not have a Spotify preview URL. 
function createAllAlbumTracks(playlistTracks, imageURL) {
    let tracks = [];
    if (playlistTracks === undefined || playlistTracks.length === 0) {
        console.log("createAllAlbumTracks terminated because playLists tracks is empty!");
        return;
    }
    for (let i = 0; i < playlistTracks.length; i++) {
        let cur = null
        cur = getAlbumTrackInfo(playlistTracks, i, imageURL)
        if (cur.musicPreviewUrl != null) {
            tracks.push(cur);
        }
    }
    console.log("Tracks object after creation:", tracks);
    return tracks
}

export default Player
