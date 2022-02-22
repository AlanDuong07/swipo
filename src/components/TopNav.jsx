import React from 'react'
import { Link } from 'react-router-dom'
import SwipoLogoTopNavOffWhite from "../images/SwipoLogoTopNavOffWhite.png"
import hamburger from "../images/menu.png"
import profile from "../images/profile.png"
import close from "../images/close.png"
import { useStateValue } from '../StateProvider'
function TopNav() {
    const [{ user }] = useStateValue()
    let profile_pic = profile;
    let sideBarButton = document.getElementById("sidebarButton");
    let sideBarWrapper = document.getElementById("sideBarWrapper");
    let transparentClickSpace = document.getElementById("transparentClickSpace");
    let sideBar = document.getElementById("sideBar");
    let closeButton = document.getElementById("closeButton");

    if (user && user.images[0] !== undefined) {
        profile_pic = user.images[0].url
    }

    if (sideBarButton) {
       sideBarButton.addEventListener("click", function() {
            sideBarWrapper.style.right = "0";
        })
    }
    if (transparentClickSpace) {
        transparentClickSpace.addEventListener("click", function() {
            sideBarWrapper.style.right = "-100%";
        })
    }
    if (closeButton) {
        closeButton.addEventListener("click", function() {
            sideBarWrapper.style.right = "-100%";
        })
    }
    
    return (
        <div className="top-nav">
            <Link to="/">
                <img src={SwipoLogoTopNavOffWhite} alt="SwipoLogo" id="swipo-logo"></img>
            </Link>
            <div id="utilityButtonWrapper">
                <img src={profile_pic} alt={profile} id="profile"></img>
                <button id="sidebarButton">
                    <img src={hamburger} id="settings" alt="settings"></img>
                </button>
            </div>
            <div id="sideBarWrapper">
                <div id="transparentClickSpace"></div>
                <div id="sideBar">
                    <div id="sideBarLinks">
                        <img src={close} id="closeButton" alt="Close Sidebar"/>
                        <a href="https://alanduong.dev" target="_blank">
                            <h1>Made By Alan <span className="faintText">&rarr;</span></h1>
                        </a>
                        <a target="_blank">
                            <h1>About <span className="faintText">&rarr;</span></h1>
                        </a>
                        <h1>Settings <span className="faintText">&#8595;</span></h1>
                        <div id="settingsBox">
                            <h1>Coming Soon!</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopNav
