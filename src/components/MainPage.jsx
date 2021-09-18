import React from 'react'
import MainCard from './MainCard'
function MainPage() {
    const url = window.location;

    const access_token = new URLSearchParams(window.location.hash).get('#access_token');

    return (
        <div>
            <p style={{color: "white"}}>
                {access_token}
            </p>
            
        </div>
    )
}

export default MainPage

