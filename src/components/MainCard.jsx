import React from 'react'
import SpotifyWebApi from "spotify-web-api-js";

function MainCard(props) {

    return (
        <div className="MainCard">
            The user ID is {props.userID}.
        </div>
    )
}

export default MainCard
