import React from 'react'
import { Route } from "react-router-dom";
import Player from './Player'
import GenrePicker from './GenrePicker'
import TopNav from './TopNav'
import BottomNav from './BottomNav'


function MainPage() {
    return (
        <div id="MainPage">
            <TopNav/>
            <Route exact path = "/main/player/" render={() => <Player/>}/>
            <Route exact path = "/main/genrepicker/" render={() => <GenrePicker/>}/>
            <BottomNav/>
        </div>
    )

}

export default MainPage
