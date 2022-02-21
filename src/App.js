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
    const [{ user, spotify, swipo_playlist }, dispatch] = useStateValue();

    //useEffect that runs whenever the token is changed. Usually runs right after the login button is clicked.
    //retrieves a token and sets various global states to be used throughout the app.
    useEffect(() => {
        // Set token
        const hash = getTokenFromResponse();
        window.location.hash = "";
        //Get either the hashToken from the main login flow, or retrieve a locally stored
        //token from localStorage and try using that.
        let hashToken = hash.access_token;
        let localToken = JSON.parse(localStorage.getItem('Token'));
        // console.log("hashToken at this time: ", hashToken)
        if (hashToken || localToken) {
            let currentToken = hashToken ? hashToken : localToken;
            // console.log('currentToken is currently: ', currentToken);
            if (hashToken) {
                //only set a new token in local storage if we just went through
                //the main login flow, and just got a new token.
                localStorage.setItem('Token', JSON.stringify(hashToken));
            }

            s.setAccessToken(currentToken);
            if (currentToken) {
                dispatch({
                    type: "SET_TOKEN",
                    token: currentToken,
                });
            }

            dispatch({
                type: "SET_SPOTIFY",
                spotify: s,
            });

            s.getMe().then((user) => {
                dispatch({
                type: "SET_USER",
                user: user,
                });
            });
        }
    }, [dispatch]);

    //useEffect that runs whenever a new user enters the system. It looks for an existing Swipo playlist, or 
    //creates a new one for the user. If there is already a swipo_playlist state, it doesn't run.
    useEffect(() => {
        //name of Swipo Playlist that songs will be saved to
        const playlistName = "Swipo"

        let found_swipo_playlist = swipo_playlist !== null ? true : false;
        if (!found_swipo_playlist && user !== null && spotify !== undefined && spotify !== null) {
            console.log("Finally got through! Swipo playlist should be null: ", swipo_playlist);
            spotify.getUserPlaylists(user.id ,null, function (err, data) {
                if (err) {
                    console.error(err);
                }
                else {
                    if (data !== undefined) {
                        for (let i = 0; i < data.items.length; i++) {
                            if (data.items[i].name === playlistName) {
                                console.log("Found existing Swipo playlist")
                                found_swipo_playlist = true
                                dispatch({
                                    type: "SET_SWIPO_PLAYLIST",
                                    swipo_playlist: data.items[i]
                                });
                            }
                        }
                        if (!found_swipo_playlist) {
                            spotify.createPlaylist(user.id, {name: playlistName}, function (err, data) {
                                if (err) console.error(err);
                                else {
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
    }, [dispatch, spotify, user, swipo_playlist]);

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
