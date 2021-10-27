export const initialState = {
    user: null,
    token: null,
    spotify: null,
    current_playlist: null,
    playlist_type: null,
    current_tracks: null,
    current_track: null,
    swipo_playlist: null
  };
  
  const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case "SET_USER":
            return {
            ...state,
            user: action.user,
            };
    
        case "SET_TOKEN":
            return {
            ...state,
            token: action.token,
            };
    
        case "SET_SPOTIFY":
            return {
            ...state,
            spotify: action.spotify,
            };

        case "SET_CURRENT_PLAYLIST":
            return {
            ...state,
            current_playlist: action.current_playlist,
            };

        case "SET_PLAYLIST_TYPE":
            return {
            ...state,
            playlist_type: action.playlist_type,
            };

        case "SET_CURRENT_TRACKS":
            return {
            ...state,
            current_tracks: action.current_tracks,
            };

        case "SET_CURRENT_TRACK":
            return {
            ...state,
            current_track: action.current_track,
            };

        case "SET_SWIPO_PLAYLIST":
            console.log("setting swipo playlist", action);
            return {
                ...state,
                swipo_playlist: action.swipo_playlist,
            }
        default:
            return state;
    }
  };
  
  export default reducer;