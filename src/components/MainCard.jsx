import React, {useEffect, useState} from 'react'


function MainCard(props) {
    const [songCounter, setSongCounter] = useState(0);
    return (
        <div className="MainCard">
            The user ID is {props.userID}.
            The current song is {getTrack(props.playlistTracks, 0)}
        </div>
    )

}

function getTrack(playlistTracks, songCounter) {
    console.log("playlist tracks", playlistTracks)
    if (playlistTracks === undefined || playlistTracks.length == 0) {
        return []
    }
    var name = playlistTracks[songCounter].track.name;
    return name
}

export default MainCard
