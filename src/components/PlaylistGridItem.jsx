import React from 'react';

function PlaylistGridItem({playlist, onClickFunction}) {
    let playlistOwner = '';
    if (playlist.type === 'playlist') {
        playlistOwner = playlist.owner.display_name;
    } else {
        //album. access artists and concat.
        for (let i = 0; i < playlist.artists.length; i++) {
            playlistOwner += playlist.artists[i].name;
            if (i !== playlist.artists.length - 1) playlistOwner += ", ";
        }
    }
    
    return <div className="playlistGridItem">
        <button type="submit" onClick={() => {onClickFunction(playlist)}}>
            <img src={playlist?.images[0]?.url}></img>
            <p id="playlistName">{playlist.name}</p>
            <p id="playlistOwner">{playlistOwner}</p>
        </button>
    </div>;
}

export default PlaylistGridItem;
