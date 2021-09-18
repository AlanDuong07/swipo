import React from 'react'

function MainCard(props) {
    
    return (
        <div id="MainCard">
            <p>This is the main card with {props.access_token} </p>
        </div>
    )
}

export default MainCard
