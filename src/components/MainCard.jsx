import React, {useEffect, useRef} from 'react'
import { useStateValue } from '../StateProvider'
import AudioPlayer from 'react-h5-audio-player'
// import 'react-h5-audio-player/lib/styles.css';

function MainCard(props) {
    const [{ current_track, playing }] = useStateValue()

    const player = useRef();
    //useEffect that checks whenever the current_track has changed, and whether the current_track is this individual MainCard.
    //if it is, then play the audio for this individual MainCard. If not, then don't play it.
    useEffect(() => {
        if (current_track !== null && current_track !== undefined) {
            // console.log("in useEffect for mainCard, current_track: ", current_track)
            // console.log("In useEffect for mainCard, current_track != null!. current_track.songURI: ", current_track.songURI)
            // console.log("Current card's songURI: ", props.songURI)
            if (current_track.songURI === props.songURI) {
                player.current.audio.current.play()
            } else {
                player.current.audio.current.pause()
            }
        } else {
            player.current.audio.current.pause()
        }
    }, [current_track, playing, props])

    return (
        <div className="mainCard">
            <img src={props.track.albumImageUrl} alt="Album/Song cover" id="albumCover"></img>
            <h1 id="songName">{props.track.name}</h1>
            <h2 id="artist">{props.track.artists}</h2>
            <div id="audio">
                <AudioPlayer
                    className="rhap_container"
                    autoPlay={false}
                    src={props.track.musicPreviewUrl}
                    onPlay={e => console.log("onPlay")}
                    ref={player}
                    showJumpControls={false}
                    showSkipControls={false}
                    hasDefaultKeyBindings={false}
                    loop={true}
                    volume={0.1}
                />
            </div>
        </div>
    )

}

export default MainCard
