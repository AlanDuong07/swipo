import React, {useEffect} from 'react'
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router-dom";
import magglass from "../images/magglass.png";

let genre = ""
// let s = null;
function GenrePicker() {
    
    const [{ spotify }, dispatch] = useStateValue()
    const history = useHistory();
    console.log("outside", spotify)
    useEffect(() => {
        console.log("In genrePicker useEffect", spotify)
        dispatch({
            type: "SET_SPOTIFY",
            spotify: spotify
        })
    }, [spotify, dispatch])
    const routeToMain = function(){
        let query = genre.split(' ').join('+')
        let playlist;
        console.log("Currently searching and routing to main...")
        console.log("Spotify object currently: " + spotify)
        if (spotify !== null) {
            spotify.searchPlaylists(query, null, (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    if (data.playlists.items.length === 0) {
                        console.log("No playlists found!")
                    } else {
                        playlist = data.playlists.items[0]
                        dispatch({
                            type: "SET_CURRENT_PLAYLIST",
                            current_playlist: playlist
                        })
                        let path = "/main/player/"
                        history.push(path)
                    }
                }
            })
        } else {
            console.log("Rip, Spotify object is null: ", spotify)
        }
    }
    const handleChange = (event) => {
        genre = event.target.value;
    }
  
    return (
        <div className="PickGenrePage">
            <div id="search-bar">
                <input id="input" type="text" placeholder="Search for a genre..." onChange={handleChange}/>
                <button id="button" type="submit" onClick={routeToMain}>
                        <img src={magglass} alt="Search Button"></img>
                </button>
            </div>
        </div>
    )
}

export default GenrePicker

