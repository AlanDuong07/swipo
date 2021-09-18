import React, {useEffect, useState} from 'react'
// import SpotifyPlayer from 'react-spotify-player';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

//mainCard receives names, artists, albumImageUrl, musicPreviewUrl
function MainCard(props) {
    return (
        <div className="MainCard">
            <div className="cover" >
                <img src={props.track.albumImageUrl}></img>
                <h1>{props.track.name} By {props.track.artists}</h1>
            </div>
            {/* <SpotifyPlayer token={props.accessToken.accessToken}/> */}
            <AudioPlayer
                className="audioPlayer"
                src={props.track.musicPreviewUrl}
                onPlay={e => console.log("onPlay")}
                autoPlay={false}
                showJumpControls={false}
                layout="reverse"
                // other props here
            />
        </div>
    )

}

export default MainCard
