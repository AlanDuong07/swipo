import React from 'react'
import { Link } from 'react-router-dom'
import darkPlaylist from "../images/darkPlaylist.png";
import darkHome from "../images/darkHome.png";
import darkHeart from "../images/darkHeart.png";

function BottomNav() {
    return (
        <div className="bottom-nav borderFaint">
            <Link to="/main/genrepicker/">
                <img src={darkPlaylist} alt="Discover Playlists" id="playlist"></img>
            </Link>
            <Link to="/main/player/">
                <img src={darkHome} alt="Swipo Player" id="home"></img>
            </Link>
            <Link to="/main/">
                <img src={darkHeart} alt="Your Playlists" id="random"></img>
            </Link>
        </div>
    )
}

export default BottomNav
