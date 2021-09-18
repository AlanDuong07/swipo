import React from 'react'
import SwipoLogo from "../images/SwipoLogo.svg";

function TopNav(props) {
    return (
        <div id="TopNav">
            <a href="#" id="profileButton">
                
            </a>
            <img src={SwipoLogo} alt="Swipo" id="swipoLogo"></img>
            {/* <a href="#" id="swipoLogo">
                <img src={SwipoLogo} alt="Swipo"></img>
            </a> */}
            <a href="#" id="tempButton">
                
            </a>
        </div>
    )
}

export default TopNav
