import React from 'react'
import { Link } from 'react-router-dom'
import darkPlaylist from "../images/darkPlaylist.png";
import darkHome from "../images/darkHome.png";
import darkHeart from "../images/darkHeart.png";

function BottomNav() {
    return (
        <div className="bottom-nav borderFaint">
            <Link to="/main/genrepicker/">
                <img src={darkPlaylist} alt="Discover Playlists" id="playlistIcon"></img>
            </Link>
            <Link to="/main/player/">
                <img src={darkHome} alt="Swipo Player" id="homeIcon"></img>
            </Link>
            <Link to="/main/you/">
                <img src={darkHeart} alt="You Page" id="youIcon"></img>
            </Link>
        </div>
    )
}

export default BottomNav
