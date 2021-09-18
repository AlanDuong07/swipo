import React, {useEffect, useState} from 'react'


function MainCard(props) {
    return (
        <div className="MainCard">
            This track is {props.track.name}.
            The artists of this track is {props.track.artists}.
        </div>
    )

}

export default MainCard
