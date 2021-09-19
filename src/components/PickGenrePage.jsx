import React, {useEffect, useRef, useState} from 'react'
import TopNav from './TopNav';
import BottomNav from './BottomNav';
import SpotifyWebApi from "spotify-web-api-js";
import { useHistory } from "react-router-dom";

function PickGenrePage() {
    const [genre, setGenre] = useState('');
    let playlistId;

    //get access token from url once.
    const accessToken = new URLSearchParams(window.location.hash).get('#access_token');

    const history = useHistory();

    const routeToMain = () => {
        let parsedInput = genre.split(' ').join('+')
        console.log("jacob is the goat", parsedInput)
        let path = "/main/#access_token=" + accessToken + "/playlistId=" + getTopPlaylist(accessToken, parsedInput)
        console.log("function call", getTopPlaylist(accessToken, parsedInput))
        console.log("path", path)
        history.push(path);
    }

    const handleChange = (event) => {
        setGenre(event.target.value);
    }

    return (
        <div id="PickGenrePage">
            <TopNav/>
            <input type="text" onChange={handleChange}/>
            <button type="submit" onClick={routeToMain}>
                Go!
            </button>
            <BottomNav/>
        </div>
    )
}

function getTopPlaylist(accessToken, query) {
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);
    spotifyApi.searchPlaylists(query, null, function (err, data) {
        if (err) console.error(err);
        else {
            console.log("yo this is the top playlists", data.playlists.items[0].id)
            return data.playlists.items[0].id
        }
    });
    console.log("does this get here????")
    return ""
}

export default PickGenrePage

