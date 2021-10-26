import React from 'react'
import { Link } from 'react-router-dom'
import SwipoLogoTopNav from "../images/SwipoLogoTopNav.png"
import cog from "../images/cog.png"
import profile from "../images/profile.png"
import { useStateValue } from '../StateProvider'
function TopNav() {
    const [{ user }] = useStateValue()
    return (
        <div className="top-nav">
            <Link to="/main/player">
                <img src={user?.images[0].url} alt={profile} id="profile"></img>
            </Link>
            <Link to="/">
                <img src={SwipoLogoTopNav} alt="SwipoLogo" id="swipo-logo"></img>
            </Link>
            <Link to="/main/player">
                <img src={cog} id="settings" alt="settings"></img>
            </Link>
        </div>
    )
}

export default TopNav
