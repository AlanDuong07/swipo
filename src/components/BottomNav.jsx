import React from 'react'

import playlist from "../images/playlist.png";
import home from "../images/home.png";
import random from "../images/random.png";

function BottomNav() {
    return (
        <div id="BottomNav">
            <a href="#" id="playlist-link">
                <img src={playlist} alt="playlist" id="playlist"></img>
            </a>
            <a href="#" id="home-link">
                <img src={home} alt="home" id="home"></img>
            </a>
            <a href="#" id="random-link">
                <img src={random} alt="random" id="random"></img>
            </a>
        </div>
    )
}

export default BottomNav
