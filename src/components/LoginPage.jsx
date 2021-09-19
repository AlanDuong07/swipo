import React, { useState } from "react"
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'

import SwipoLogoLogin from "../images/SwipoLogoLogin.png";

function LoginPage() {
    const [token, setToken] = React.useState(0)
    return (
        <div className="login-page">
            <div id="logo">
                <img src={SwipoLogoLogin} alt="SwipoLogo" id="swipo-logo"></img>
            </div>
            <div id="login-button"><SpotifyAuth
                    redirectUri='http://localhost:3000/main/'
                    clientID='ba8410471b294344b293d5d6270ec54f'
                    scopes={[Scopes.userReadPrivate, Scopes.userReadEmail, Scopes.playlistReadPrivate,
                        Scopes.playlistModifyPrivate, Scopes.playlistModifyPublic, Scopes.playlistReadCollaborative]}
                    onAccessToken={(token) => setToken(token)}
                />
                </div>
        </div>
    )
}

export default LoginPage
