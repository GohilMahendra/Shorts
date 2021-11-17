
import { GET_CREATER_DETAILS_FAILED, GET_Creater_DETAILS_FAILED, GET_CREATER_DETAILS_REQUEST, GET_Creater_DETAILS_REQUEST, GET_CREATER_DETAILS_SUCCESS, GET_Creater_DETAILS_SUCCESS, GET_CREATER_VIDEOS_FAILED, GET_Creater_VIDEOS_FAILED, GET_CREATER_VIDEOS_REQUEST, GET_Creater_VIDEOS_REQUEST, GET_CREATER_VIDEOS_SUCCESS, GET_Creater_VIDEOS_SUCCESS } from "../Types/CreaterTypes";

const initialstate = {

    CreaterProfile: {
        id: "",
        CreaterName: "",
        CreaterID: "",
        photoURL: "",
        varified: false,
        Following: 0,
        Followers: 0,
        likes: 0,
    },

    CreaterVideos: [],

    CreaterVideosLoad: false,
    CreaterVideosLoadError: null,

    CreaterVideossMoreLoad: false,
    CreaterVideosMoreLoadError: null,

    lastKeyCreaterVideos: null,

}


const CreaterReducer = (state = initialstate, action) => {

    switch (action.type) {


        case GET_CREATER_DETAILS_REQUEST:
            return {
                ...state,
            }
       
        case GET_CREATER_DETAILS_SUCCESS:
            return { ...state,
                 CreaterProfile: action.payload.Creater }
                 
        case GET_CREATER_DETAILS_FAILED:
            console.log(action.payload)

        case GET_CREATER_VIDEOS_REQUEST:
            return {
                ...state,
                CreaterVideos: [],
                CreaterVideosLoad: false,
                CreaterVideosLoadError: null,
            }

        case GET_CREATER_VIDEOS_SUCCESS:

            return {
                ...state,
                CreaterVideosLoad: false,
                CreaterVideos: action.payload.Videos,

            }

        case GET_CREATER_VIDEOS_FAILED:
            return {
                ...state,
                CreaterVideosLoad: false,
                CreaterVideosLoadError: action.payload
            }


        default:
            return state

    }

}

export default CreaterReducer