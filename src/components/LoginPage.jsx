import React from "react"
import { accessUrl } from "../spotifyLogin";
import SwipoLogoLoginOffWhite from "../images/SwipoLogoLoginOffWhite.png";

function LoginPage() {
    return (
        <div className="login-page">
            <img src={SwipoLogoLoginOffWhite} alt="SwipoLogo" id="swipo-logo"></img>
            <div id="login-button">
                <a href={accessUrl}>Login with Spotify</a>
            </div>
        </div>
    )
}

export default LoginPage
