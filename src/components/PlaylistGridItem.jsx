import React from 'react';

function PlaylistGridItem({playlist, onClickFunction}) {
    return <div className="playlistGridItem">
        <button type="submit" onClick={() => {onClickFunction(playlist)}}>
            <img src={playlist?.images[0]?.url}></img>
            <p>{playlist.name}</p>
        </button>
    </div>;
}

export default PlaylistGridItem;
