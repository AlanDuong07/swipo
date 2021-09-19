import './Style/App.scss';
import React, { useState } from "react"
import {BrowserRouter as Router, Route} from "react-router-dom";
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'

import MainPage from "./components/MainPage.jsx";
import LoginPage from "./components/LoginPage";

function App() {

    return (
        <Router>
            <div className="App">
                <Route path="/" exact component={LoginPage} />
                <Route path="/callback/" component={MainPage} />
            </div>
        </Router>
    );
}

export default App;
