
import { GET_USER_DETAILS_FAILED, GET_USER_DETAILS_REQUEST, GET_USER_DETAILS_SUCCESS, GET_USER_VIDEOS_FAILED, GET_USER_VIDEOS_REQUEST, GET_USER_VIDEOS_SUCCESS,LOG_OUT_REQUEST } from "../Types/ProfileTypes";

const initialstate = {

    userProfile: {

        userName: "",
        userID: "",
        photoURL: "",
        varified: false,
        Follwing: 0,
        Follwers: 0,
        Likes: 0,
    },

    UserVideos: [],

    UserVideosLoad: false,
    UserVideosLoadError: null,

    UserVideossMoreLoad: false,
    UserVideosMoreLoadError: null,


    lastKeyUserVideos: null,

}


const ProfileReducer = (state = initialstate, action) => {

    switch (action.type) {


        case GET_USER_DETAILS_REQUEST:
            console.log("requesr")
        case GET_USER_DETAILS_SUCCESS:
            console.log(action.payload, "payload")
            return { ...state, userProfile: action.payload.user }
        case GET_USER_DETAILS_FAILED:

        case GET_USER_VIDEOS_REQUEST:
            return {
                ...state,
                UserVideos: [],

                UserVideosLoad: false,
                UserVideosLoadError: null,

            }
        case GET_USER_VIDEOS_SUCCESS:

            return {
                ...state,
                UserVideosLoad: false,
                UserVideos: action.payload.Videos,

            }

        case GET_USER_VIDEOS_FAILED:
            return {
                ...state,
                UserVideosLoad: false,
                UserVideosLoadError: action.payload
            }

        case LOG_OUT_REQUEST:
            return initialstate

        default:
            return state

    }

}

export default ProfileReducer