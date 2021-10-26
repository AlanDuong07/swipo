import React from 'react'
import { Link } from 'react-router-dom'
import playlist from "../images/playlist.png";
import home from "../images/home.png";
import random from "../images/random.png";

function BottomNav() {
    return (
        <div className="bottom-nav">
            <Link to="/main/genrepicker/">
                <img src={playlist} alt="Genre Picker" id="playlist"></img>
            </Link>
            <Link to="/main/player/">
                <img src={home} alt="Swipo Player" id="home"></img>
            </Link>
            <Link to="/main/">
                <img src={random} alt="Random" id="random"></img>
            </Link>
        </div>
    )
}

export default BottomNav
