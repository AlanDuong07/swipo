import React from 'react'
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router-dom";
import darkMagglass from "../images/darkMagglass.png";

let genre = ""
// let s = null;
function GenrePicker() {
    const [{ spotify, playlist_type }, dispatch] = useStateValue()
    const history = useHistory();

    const searchAndRouteToMain = function(){
        let query = genre.split(' ').join('+')
        let playlist;
        console.log("Currently searching and routing to main...")
        console.log("Spotify object currently: " + spotify)
        if (spotify !== null && playlist_type !== null) {
            spotify.search(query, ["playlist", "album"], (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Finished searching! Here's the data: ", data)
                    if (playlist_type === "playlist") {
                        if (data.playlists.items.length === 0) {
                            console.log("No playlists found!")
                        } else {
                            playlist = data.playlists.items[0]
                            console.log("playlistType is playlist. Putting in this playlist: ", playlist)
                            dispatch({
                                type: "SET_CURRENT_PLAYLIST",
                                current_playlist: playlist
                            })
                            let path = "/main/player/"
                            history.push(path)
                        }
                    } else {
                        if (data.albums.items.length === 0) {
                            console.log("No albums found!")
                        } else {
                            playlist = data.albums.items[0]
                            console.log("playlistType is album. Putting in this album: ", playlist)
                            dispatch({
                                type: "SET_CURRENT_PLAYLIST",
                                current_playlist: playlist
                            })
                            let path = "/main/player/"
                            history.push(path)
                        }
                    }
                }
            })
        } else {
            console.log("Rip, Spotify object is null: ", spotify)
        }
    }
    const handleQueryChange = (event) => {
        genre = event.target.value;
    }
    const handlePlaylistTypeChange = function(playlistTypeString) {
        dispatch({
            type: "SET_PLAYLIST_TYPE",
            playlist_type: playlistTypeString
        })
    }
  
    return (
        <div id="genrePickerContainer">
            <h1 id="genreHeader">Explore Page</h1>
            <div id="searchBarContainer">
                <input type="text" placeholder="Search for a genre..." onChange={handleQueryChange}/>
                <button type="submit" onClick={searchAndRouteToMain}>
                        <img src={darkMagglass} alt="Search Button"></img>
                </button>
            </div>
            <div id="boxPlaylistTypeSelector">
                <label>
                    <p>Playlist</p>
                    <input type="radio" checked={playlist_type === "playlist"} onChange={() => handlePlaylistTypeChange("playlist")}/>
                </label>
                <label>
                    <p>Album</p>
                    <input type="radio" checked={playlist_type === "album"} onChange={() => handlePlaylistTypeChange("album")}/>
                </label>
            </div>
        </div>
    )
}

export default GenrePicker

