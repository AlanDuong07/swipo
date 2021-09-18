import React, {useEffect, useRef, useState} from 'react'

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

//mainCard receives names, artists, albumImageUrl, musicPreviewUrl
function MainCard(props) {
    const [playing, changePlaying] = useState(false);
    const player = useRef();

    // change if song was swiped
    useEffect(() => {
        if (props.isSwiped >= 1){
            // pause the song
            player.current.audio.current.pause();
            console.log(props.track);
        }

    }, [props]);

    return (
        <div className="MainCard">
            
            This track is {props.track.name}.
            The artists of this track is {props.track.artists}
            <AudioPlayer
                autoPlay={false}
                src={props.track.musicPreviewUrl}
                onPlay={e => console.log("onPlay")}
                ref={player}
                // other props here
            />
        </div>
    )

}

export default MainCard
