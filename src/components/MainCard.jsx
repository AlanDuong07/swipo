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
        <div className="mainCard">
            <img src={props.track.albumImageUrl} alt="Album/Song cover" id="albumCover"></img>
            <h1 id="songName">{props.track.name}</h1>
            <h2 id="artist">{props.track.artists}</h2>
            <div id="audio">
                <AudioPlayer
                    autoPlay={false}
                    volume={false}
                src={props.track.musicPreviewUrl}
                onPlay={e => console.log("onPlay")}
                ref={player} />
            </div>
        </div>
    )

}

export default MainCard
