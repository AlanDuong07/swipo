import React from 'react'
import { Link } from 'react-router-dom'
import SwipoLogoTopNavOffWhite from "../images/SwipoLogoTopNavOffWhite.png"
import hamburger from "../images/menu.png"
import profile from "../images/profile.png"
import { useStateValue } from '../StateProvider'
function TopNav() {
    const [{ user }] = useStateValue()
    let profile_pic = profile
    if (user && user.images[0] !== undefined) {
        profile_pic = user.images[0].url
    }
    return (
        <div className="top-nav">
            <Link to="/">
                <img src={SwipoLogoTopNavOffWhite} alt="SwipoLogo" id="swipo-logo"></img>
            </Link>
            <div>
                <Link to="/main/player">
                    <img src={profile_pic} alt={profile} id="profile"></img>
                </Link>
                <Link to="/main/player">
                    <img src={hamburger} id="settings" alt="settings"></img>
                </Link>
            </div>
        </div>
    )
}

export default TopNav
