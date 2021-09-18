import React from 'react'
import SpotifyWebApi from "spotify-web-api-js";

function MainCard(props) {

    return (
        <div className="MainCard">
            This is the main card with {props.access_token}
        </div>
    )
}

export default MainCard
