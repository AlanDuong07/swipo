import './Style/App.scss';
import React, { useState } from "react"
import {BrowserRouter as Router, Route} from "react-router-dom";
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'
import PickGenrePage from './components/PickGenrePage';
import MainPage from "./components/MainPage.jsx";
import LoginPage from "./components/LoginPage";

function App() {

    return (
        <Router>
            <div className="App">
                <Route path="/" exact component={LoginPage} />
                <Route path="/pick_genre/" component={PickGenrePage} />
                <Route path="/main/" component={MainPage} />
            </div>
        </Router>
    );
}

export default App;
