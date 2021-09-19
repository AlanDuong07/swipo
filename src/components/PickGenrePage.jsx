import React from 'react'

function PickGenrePage() {
    //get access token from url once. 
    const access_token = new URLSearchParams(window.location.hash).get('#access_token');
    return (
        <div id="PickGenrePage">
            
        </div>
    )
}

export default PickGenrePage

