import React, { useState } from "react"
import { SpotifyAuth, Scopes } from 'react-spotify-auth'
import 'react-spotify-auth/dist/index.css'
function LoginButton() {
    const [token, setToken] = React.useState(0)
    return (
        <SpotifyAuth
                    redirectUri='http://localhost:3000/callback/'
                    clientID='ba8410471b294344b293d5d6270ec54f'
                    scopes={[Scopes.userReadPrivate, Scopes.userReadEmail, Scopes.playlistReadPrivate,
                        Scopes.playlistModifyPrivate, Scopes.playlistModifyPublic, Scopes.playlistReadCollaborative]}
                    onAccessToken={(token) => setToken(token)}
                />
    )
}

export default LoginButton
