import React from 'react'

function MainCard(props) {
    
    return (
        <div className="MainCard">
            This is the main card with {props.access_token}
            {props.playlistObject}
            {props.userInfo}
        </div>
    )
}

export default MainCard
