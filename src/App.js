import './App.scss';
import React, { useState } from "react"
import {BrowserRouter as Router, Route} from "react-router-dom";
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'

import MainPage from "./components/MainPage.jsx";
import LoginButton from "./components/LoginButton";

function App() {
    
    return (
        <Router>
            <div className="App">

                <Route path="/" exact component={LoginButton}/>
                <Route path="/callback/" component={MainPage}/>
            </div>
        </Router>
    );
}

export default App;
