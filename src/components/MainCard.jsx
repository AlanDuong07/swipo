import React, {useEffect, useRef, useState} from 'react'

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

// mainCard receives names, artists, albumImageUrl, musicPreviewUrl
function MainCard(props) {
    
    // end previous song and play next song if swipe
    const player = useRef();
    useEffect(() => {
        if (props.isSwiped >= 1){
            // end the song
            player.current.audio.current.pause();
            console.log(props.track);
        }
    }, [props]);

    return (
        <div className="main-card">
            <img src={props.track.albumImageUrl} alt="Album/Song cover" id="album-cover"></img>
            <h1 id="song-name">{props.track.name}</h1>
            <h1 id="artist">{props.track.artists}</h1>
            <div id="audio">
                <AudioPlayer
                autoPlay={false}
                src={props.track.musicPreviewUrl}
                onPlay={e => console.log("onPlay")}
                ref={player} />
            </div>
        </div>
    )

}

export default MainCard
