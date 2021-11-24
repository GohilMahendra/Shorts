
import { stat } from "react-native-fs";
import { GET_USER_DETAILS_FAILED, GET_USER_DETAILS_REQUEST, GET_USER_DETAILS_SUCCESS, GET_USER_VIDEOS_FAILED, GET_USER_VIDEOS_REQUEST, GET_USER_VIDEOS_SUCCESS } from "../Types/ProfileTypes";
import { GET_MORE_SONG_VIDEOS_FAILED, GET_MORE_SONG_VIDEOS_REQUEST, GET_MORE_SONG_VIDEOS_SUCCESS, GET_SONG_DETAILS_FAILED, GET_SONG_DETAILS_REQUEST, GET_SONG_DETAILS_SUCCESS, GET_SONG_VIDEOS_FAILED, GET_SONG_VIDEOS_REQUEST, GET_SONG_VIDEOS_SUCCESS } from "../Types/SongTypes";

const initialstate = {

    songDetails: {

       id:"",
       SongName:"",
       SongCover:"",
       songLink:"",
       
    },

    songVideos: [],


    songVideosLoad: false,
    songVideosLoadError: null,

    songVideosMoreLoad: false,
    songVideosMoreLoadError: null,


    lastKeysongVideos: null,

}


const SongReducer = (state = initialstate, action) => {

    switch (action.type) {


        case GET_SONG_DETAILS_REQUEST:
            return {...state}
        case GET_SONG_DETAILS_SUCCESS:
            return {...state,
            songDetails:action.payload.songDetails
            }
        case GET_SONG_DETAILS_FAILED:
            return {...state}
        
        case GET_SONG_VIDEOS_REQUEST:
            return {
                ...state,
                songVideosLoad:true,
                songVideosLoadError:null,
            }
        case GET_SONG_VIDEOS_SUCCESS:
            console.log(action.payload)
            return {...state,
            songVideosLoad:false,
            songVideos:action.payload.Videos,
            lastKeysongVideos:action.payload.lastKey
            }
        case GET_SONG_VIDEOS_FAILED:
            return {...state}

        case GET_MORE_SONG_VIDEOS_REQUEST:
            return {
                ...state,
                songVideosMoreLoad:true,
                songVideosMoreLoadError:null
            }
        case GET_MORE_SONG_VIDEOS_SUCCESS:
            return {
                ...state,
                songVideosMoreLoad:false,
                songVideos:[...state.songVideos,...action.payload.Videos],
                lastKeysongVideos:action.payload.lastKey
            }
        case GET_MORE_SONG_VIDEOS_FAILED:
            return {
                ...state,
                songVideosMoreLoadError:action.payload,
                songVideosMoreLoad:false
            }
        default:
            return state

    }

}

export default SongReducer