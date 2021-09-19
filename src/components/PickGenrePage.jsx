import React from 'react'
import TopNav from './TopNav';
import BottomNav from './BottomNav';
function PickGenrePage() {
    //get access token from url once. 
    const access_token = new URLSearchParams(window.location.hash).get('#access_token');
    return (
        <div id="PickGenrePage">
            <TopNav/>
            <input type="text" placeholder="Search for a genre..."/>
            <BottomNav/>
        </div>
    )
}

export default PickGenrePage

