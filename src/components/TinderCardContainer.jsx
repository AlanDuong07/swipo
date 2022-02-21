import {React, useEffect} from 'react';
import Hammer from 'hammerjs';
import { useStateValue } from "../StateProvider";
import MainCard from './MainCard';


function TinderCardContainer() {
  const [{ spotify, swipo_playlist,  current_playlist, current_track, current_tracks}, dispatch] = useStateValue();
  let allCards;

  //useEffect that contains the swiping framework for all of the tinder cards. 
  //Runs only once, as you don't want to add extra event listeners than necessary.
  useEffect(() => {
    // if (current_playlist !== null && current_track !== null && current_tracks !== null) {
      console.log("AYYYYYYYY")
      //select all of the tinderCard wrapper divs on the DOM
      allCards = document.querySelectorAll(".tinderCard");
      // console.log("allCards", allCards);
      //initial initiation of cards, setting their z-index and opacity.
      initCards();

      //loop through all cards and init a Hammer object for each, adding event listeners for
      //pan and also an event listener for panend. See respective .on methods for further docs.
      allCards.forEach(function (singleCard) {
        let hammertime = new Hammer(singleCard);
        
        //add the moving class on pan to remove transition sluggishness on pan
        hammertime.on('pan', function (event) {
          singleCard.classList.add('moving');
        });

        //when the user clicks, holds, and drags on the card, change the transform to follow 
        //their mouse.
        hammertime.on('pan', function (event) {
          if (event.deltaX === 0) {
            // console.log("TESTING HAMMERTIME PAN NO MOVEMENT")
            return;
          }
          if (event.center.x === 0 && event.center.y === 0) {
            // console.log("TESTING HAMMERTIME PAN CENTER X + Y 0")
            return;
          }
          let xMulti = event.deltaX * 0.03;
          let yMulti = event.deltaY / 80;
          let rotate = xMulti * yMulti;
    
          singleCard.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
        });

        //when the user releases the mouse, make calculations for where the pan ended to 
        //determine whether it should leave the screen, and more importantly calculations 
        //for which direction, and into which playlist it may be saved.
        hammertime.on('panend', async function (event) {
          console.log("Pan ended!")
          //remove the moving class to bring transitions back
          singleCard.classList.remove("moving");

          let moveOutWidth = document.body.clientWidth;
          //parameters for keeping the card that just moved
          let keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

          if (keep) {
            singleCard.style.transform = '';
            // console.log("KEEPING THIS TINDERCARD");
          } else {
            //calculations to transform the card when it was swiped enough.
            // console.log("NOT KEEPING THIS TINDERCARD");
            let directionSwiped = event.direction === 2 ? "left" : "right";
            let endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
            let toX = event.deltaX > 0 ? endX : -endX;
            let endY = Math.abs(event.velocityY) * moveOutWidth;
            let toY = event.deltaY > 0 ? endY : -endY;

            //for rotation calculation
            let xMulti = event.deltaX * 0.03;
            let yMulti = event.deltaY / 80;
            let rotate = xMulti * yMulti;
            
            //most importantly, call the swiped function to process this swipe
            //action with the direction.
            try {
              let resolvedValue = await swiped(directionSwiped, singleCard.id);
              console.log("Resolved value of await swiped: ", resolvedValue);
            } catch (error) {
              console.log('Swiped failed! Error: ', error);
            }

            //make the card leave the screen
            singleCard.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
            singleCard.style.display = 'none';
            singleCard.classList.toggle('removed', !keep);
            //reinitialize the remaining cards.
            initCards();
          }
        });
      });
    // }
  }, []);


  //initializes any non swiped on cards, stacking them on top of each other.
  function initCards() {
    let newCards = document.querySelectorAll('.tinderCard:not(.removed)');
    // console.log("NewCards", newCards)
    newCards.forEach(function (card, index) {
      card.style.zIndex = allCards.length - index;
      // card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
      if (index === 0 || index === 1) {
        card.style.opacity = 1;
      } else {
        card.style.opacity = 0;
      }
    });
  }

  //Function ran whenever a TinderCard (containing a MainCard) is swiped. If the card was swiped right, the song will be saved to
  //a Swipo playlist. If that playlist does not already exist, then create that playlist and try again.
  const swiped = function(direction, songURI) {
    return new Promise(resolve => {
      if (current_tracks !== null) {
        if (direction === "right" && swipo_playlist !== null) {
          // console.log("hello")
          spotify.addTracksToPlaylist(swipo_playlist.id, [songURI], null, function (err, data) {
              if (err) console.error(err);
              else {
                  console.log("Added track data to Swipo Playlist: ", data)
              }
          });
        }
      }
      if (direction === "right" || direction === "left") {
        //Find the next track after the one just deleted. Make that the current track.
        //That will allow that track's audio to be automatically played. 
        //If the track that was just deleted was the last track, then current_track will be set to undefined.
        for (let i = 0; i < current_tracks[0].length; i++) {
          if (current_tracks[0][i].songURI === songURI) {
            // console.log("Found the current track!")
            // console.log("songURI of song just deleted: ", songURI)
            if (i === (current_tracks[0].length - 1)) {
                console.log("Just swiped the last song! Setting current_track to null.")
                dispatch({
                    type: "SET_CURRENT_TRACK",
                    current_track: null
                })
                dispatch({
                    type: "SET_CURRENT_TRACKS",
                    current_tracks: null
                })
                dispatch({
                    type: "SET_CURRENT_PLAYLIST",
                    current_playlist: null
                })
            } else {
              // console.log("current_tracks object before setting: ", current_tracks);
              console.log("setting new current track to be: ", current_tracks[0][i + 1]);
              dispatch({
                  type: "SET_CURRENT_TRACK",
                  current_track: current_tracks[0][i + 1]
              })
            }
          }
        }
      }
      resolve(true)
    })
  }

  return <div className="tinderCardContainer">
  {
        current_tracks[0].map((track, index) => 
          <MainCard key={track.songURI + index} track={track} isSwiped={track.isSwiped} songURI={track.songURI} id={track.songURI}/>
        )
  }
  </div>
}
export default TinderCardContainer
