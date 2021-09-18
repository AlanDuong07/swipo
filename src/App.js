import './App.scss';
import React, { useState } from "react"
import {BrowserRouter as Router, Route} from "react-router-dom";
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'

import MainPage from "./components/MainPage.jsx";
import LoginButton from "./components/LoginButton";
import TopNav from './components/TopNav';
import BottomNav from './components/BottomNav';
function App() {

    return (
        <Router>
            <div className="App">
                <TopNav/>
                <Route path="/" exact component={LoginButton}/>
                <Route path="/callback/" component={MainPage}/>
                <BottomNav/>
            </div>
        </Router>
    );
}

export default App;
