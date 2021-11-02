import React, { useEffect, useRef } from 'react'
import { useStateValue } from '../StateProvider'
import AudioPlayer from 'react-h5-audio-player'
// import 'react-h5-audio-player/lib/styles.css';
import SpotifySmallLogo from '../images/SpotifySmallLogo.png'

function MainCard(props) {
    const [{ current_track }] = useStateValue()
    const player = useRef()

    // useEffect that checks whenever the current_track has changed, and whether the current_track is this individual MainCard.
    // if it is, then play the audio for this individual MainCard. If not, then don't play it.
    useEffect(() => {
        if (current_track !== null && current_track !== undefined) {
            // console.log("in useEffect for mainCard, current_track: ", current_track)
            // console.log("In useEffect for mainCard, current_track != null!. current_track.songURI: ", current_track.songURI)
            // console.log("Current card's songURI: ", props.songURI)
            if (current_track.songURI === props.songURI) {
                console.log("Just set the song to play!")
                player.current.audio.current.play()
            } else {
                player.current.audio.current.pause()
            }
        } else {
            player.current.audio.current.pause()
        }
    }, [current_track, props])


    //useEffect that runs whenever the player is changed. It retrieves this specific playPauseButton and adds a touchend
    //listener that will toggle play/pause based on the current state of paused. 
    useEffect(() => {
        if (document.getElementById(`playPauseButton${props.songURI}`)) {
            document.getElementById(`playPauseButton${props.songURI}`).addEventListener("touchend", function() {
                console.log("togglePlayPause! current button: ",document.getElementById(`playPauseButton${props.songURI}`) )
                if (player.current.audio.current.paused) {
                    player.current.audio.current.play()
                } 
                else {
                    player.current.audio.current.pause()
                }
            })
            document.getElementById(`playPauseButton${props.songURI}`).addEventListener("click", function() {
                console.log("togglePlayPause! current button: ",document.getElementById(`playPauseButton${props.songURI}`) )
                if (player.current.audio.current.paused) {
                    player.current.audio.current.play()
                } 
                else {
                    player.current.audio.current.pause()
                }
            })
        }
    }, [player, props.songURI])
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
                    ref={player}
                    showJumpControls={false}
                    showSkipControls={false}
                    hasDefaultKeyBindings={false}
                    loop={true}
                    volume={0.2}
                />
            </div>
            <div id="controlsBox">
                <div className="invisible">Invisible Flex Item</div>
                <button className="playPauseButton" id={"playPauseButton" + props.songURI}>Play/Pause</button>
                <a id="openSpotifyButton" href={props.track.openSpotifyUrl} target="_blank" rel="noreferrer" alt="Spotify Link"><img src={SpotifySmallLogo}/></a>
            </div>
        </div>
    )

}

export default MainCard
