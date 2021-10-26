import React from "react"
import { accessUrl } from "../spotifyLogin";
import SwipoLogoLoginNew from "../images/SwipoLogoLoginNew.png";

function LoginPage() {
    return (
        <div className="login-page">
            <div id="logo">
                <img src={SwipoLogoLoginNew} alt="SwipoLogo" id="swipo-logo"></img>
            </div>
            <div id="login-button">
                <a href={accessUrl}>Login with Spotify</a>
            </div>
        </div>
    )
}

export default LoginPage
