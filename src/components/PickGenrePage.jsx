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
        let query = genre.split(' ').join('+')

        const spotifyApi = new SpotifyWebApi();
        spotifyApi.setAccessToken(accessToken);
        let playlistId;
        spotifyApi.searchPlaylists(query, null).then(
            function (data) {
                playlistId = data.playlists.items[0].id
                let path = "/main/#access_token=" + accessToken + "&playlistId=" + playlistId
                history.push(path);
            }
        );
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

export default PickGenrePage

