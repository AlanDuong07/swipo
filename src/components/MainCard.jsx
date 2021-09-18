import React, {useEffect} from 'react'


function MainCard(props) {

    return (
        <div className="MainCard">
            The user ID is {props.userID}.
            The current song is {getTrack(props.playlistTracks, 0)}
        </div>
    )

}

function getTrack(playlistTracks, songCounter) {
    var name = playlistTracks[songCounter].name;
}

export default MainCard
