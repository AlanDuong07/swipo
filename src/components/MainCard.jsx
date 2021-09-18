import React, {useEffect, useState} from 'react'

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

//mainCard receives names, artists, albumImageUrl, musicPreviewUrl
function MainCard(props) {
    return (
        <div className="MainCard">
            
            This track is {props.track.name}.
            The artists of this track is {props.track.artists}
            <AudioPlayer
                autoPlay
                src={props.track.musicPreviewUrl}
                onPlay={e => console.log("onPlay")}
                // other props here
            />
        </div>
    )

}

export default MainCard
