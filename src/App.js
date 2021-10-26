import './Style/App.scss';
import React, { useEffect } from "react"
import SpotifyWebApi from "spotify-web-api-js";
import {BrowserRouter as Router, Route} from "react-router-dom";
import { useStateValue } from "./StateProvider.js";
import { getTokenFromResponse } from './spotifyLogin';
import MainPage from "./components/MainPage.jsx";
import LoginPage from "./components/LoginPage";

const s = new SpotifyWebApi();

function App() {
    const [{ token, user, spotify, swipo_playlist }, dispatch] = useStateValue();
    //name of Swipo Playlist that songs will be saved to
    const playlistName = "Swipo"
    let found_swipo_playlist = false

    useEffect(() => {
        // Set token
        const hash = getTokenFromResponse();
        window.location.hash = "";
        let _token = hash.access_token;

        if (_token) {
        s.setAccessToken(_token);

        dispatch({
            type: "SET_TOKEN",
            token: _token,
        });

        dispatch({
            type: "SET_SPOTIFY",
            spotify: s,
        });

        s.getMe().then((user) => {
            dispatch({
            type: "SET_USER",
            user,
            });
        });
        
        }
    }, [token, dispatch]);
    useEffect(() => {
        //retrieve the user's already existing Swipo playlist or create a new one for them.
        if (user !== null) {
            spotify.getUserPlaylists(user.id ,null, function (err, data) {
                if (err) {
                    console.error(err);
                }
                else {
                    if (data !== undefined) {
                        console.log("User playlists: " + data.items[0].name)
                        for (let i = 0; i < data.items.length; i++) {
                            if (data.items[i].name === playlistName) {
                                console.log("Found existing Swipo playlist")
                                found_swipo_playlist = true
                                // swipo_play = data.items[i].id
                                dispatch({
                                    type: "SET_SWIPO_PLAYLIST",
                                    swipo_playlist: data.items[i]
                                });
                            }
                        }
                        // console.log("Swipo playlist in app.js: " + swipo_playlist)
                        if (!found_swipo_playlist) {
                            spotify.createPlaylist(user.id, {name: playlistName}, function (err, data) {
                                if (err) console.error(err);
                                else {
                                    // swipo_play = data.id
                                    dispatch({
                                        type: "SET_SWIPO_PLAYLIST",
                                        swipo_playlist: data
                                    });
                                }
                            });
                        }
                    }
                }
            });
        }
    }, [user]);
    return (
        <Router>
            <div className="App">
                <Route exact path = "/" component={LoginPage}/>
                <Route path = "/main" render={() => <MainPage/>} />
            </div>
        </Router>
    );
}

export default App;
