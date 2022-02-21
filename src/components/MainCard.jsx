import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useStateValue } from '../StateProvider'
import AudioPlayer from 'react-h5-audio-player'
import platform from 'platform'
// import 'react-h5-audio-player/lib/styles.css';
import SpotifySmallLogo from '../images/SpotifySmallLogo.png'
import BigFloppa from '../images/bigFloppa.png'

function MainCard(props) {
    const [{ current_track }] = useStateValue()
    const player = useRef()
    let image = props.track.albumImageUrl ? props.track.albumImageUrl : BigFloppa;
    // useEffect that checks whenever the current_track has changed, and whether the current_track is this individual MainCard.
    // if it is, then play the audio for this individual MainCard. If not, then don't play it.
    useEffect(() => {
        if (current_track !== null && current_track !== undefined) {
            // console.log("in useEffect for mainCard, current_track: ", current_track)
            // console.log("In useEffect for mainCard, current_track != null!. current_track.songURI: ", current_track.songURI)
            // console.log("Current card's songURI: ", props.songURI)
            if (current_track.songURI === props.songURI) {
                //iOS and Safari have autoplay restrictions. For now, just turn off autoplay on those devices.
                if (platform.name !== 'Safari' && platform.os.family !== 'iOS') {
                    console.log("Just set the song to play!")
                    player.current.audio.current.play()
                }
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
        if (document.getElementById(`playPauseButton${props.id}`)) {
            document.getElementById(`playPauseButton${props.id}`).addEventListener("touchend", function() {
                console.log("togglePlayPause! current button: ",document.getElementById(`playPauseButton${props.id}`) )
                if (player.current.audio.current.paused) {
                    player.current.audio.current.play()
                } 
                else {
                    player.current.audio.current.pause()
                }
            })
            document.getElementById(`playPauseButton${props.id}`).addEventListener("click", function() {
                console.log("togglePlayPause! current button: ",document.getElementById(`playPauseButton${props.id}`) )
                if (player.current.audio.current.paused) {
                    player.current.audio.current.play()
                } 
                else {
                    player.current.audio.current.pause()
                }
            })
        }
        if (document.getElementById(`openSpotifyButton${props.id}`)) {
            document.getElementById(`openSpotifyButton${props.id}`).addEventListener("click", function() {
                console.log("Clicked the open spotify button!");
                window.open(props.track.openSpotifyUrl, '_blank');
            })
            document.getElementById(`openSpotifyButton${props.id}`).addEventListener("touchend", function() {
                console.log("Yo! Clicked the open spotify button!");
                window.open(props.track.openSpotifyUrl, '_blank');
            })
        }
    }, [player, props.songURI])
    return (
        <div className="tinderCard" id={props.id}>
            <div className="mainCard borderFaint">
                <img src={image} alt="Album/Song cover" id="albumCover"></img>
                <div id="songName">
                    <h1>{props.track.name}</h1>
                </div>
                <div id="artist">
                    <h2>{props.track.artists}</h2>
                </div>
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
            </div>
            <div id="controlsBox">
                <div className="invisible">Invisible Flex Item</div>
                <button className="playPauseButton borderFaint" id={"playPauseButton" + props.id}>Play/Pause</button>
                <button className="openSpotifyButton" id={"openSpotifyButton" + props.id} alt="Spotify Link">
                    <img src={SpotifySmallLogo}/>
                </button>
            </div>
        </div>
        
    )

}

export default MainCard
