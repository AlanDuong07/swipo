import React from 'react'
import SwipoLogoTopNav from "../images/SwipoLogoTopNav.png";
import cog from "../images/cog.png";
import profile from "../images/profile.png";

function TopNav(props) {
    return (
        <div className="top-nav">
            <a href="#" id="profile-link">
                <img src={profile} alt="profile" id="profile"></img>
            </a>
            <a href="/" id="swipo-logo-link">
                <img src={SwipoLogoTopNav} alt="SwipoLogo" id="swipo-logo"></img>
            </a>
            <a href="#" id="settings-link">
                <img src={cog} id="settings" alt="settings"></img>
            </a>
        </div>
    )
}

export default TopNav
