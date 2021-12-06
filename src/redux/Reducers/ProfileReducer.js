
import { stat } from "react-native-fs";
import {
    GET_MORE_USER_VIDEOS_FAILED, GET_MORE_USER_VIDEOS_REQUEST, GET_MORE_USER_VIDEOS_SUCCESS, GET_USER_DETAILS_FAILED,
    GET_USER_DETAILS_REQUEST,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_VIDEOS_FAILED,
    GET_USER_VIDEOS_REQUEST,
    GET_USER_VIDEOS_SUCCESS,
    LOGIN_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOG_OUT_REQUEST,
    RESET_PASSWORD_LINK_FAILED,
    RESET_PASSWORD_LINK_REQUEST,
    RESET_PASSWORD_LINK_SUCCESS,
    SIGNUP_USER_FAILED,
    SIGNUP_USER_REQUEST,
    SIGNUP_USER_SUCCESS,
    UPLOAD_VIDEO_FAILED,
    UPLOAD_VIDEO_REQUEST,
    UPLOAD_VIDEO_SUCCESS
} from "../Types/ProfileTypes";

const initialstate = {

    userProfile: {

        userName: "",
        userID: "",
        photoURL: "",
        varified: false,
        Following: 0,
        Followers: 0,
        likes: 0,
    },

    UserVideos: [],

    uploadLoading: false,
    uploadError: null,

    UserDetailsLoad: false,
    UserDetailsError: null,

    registerUserLoading: false,
    registerUserError: null,

    resetPasswordError: null,
    resetPasswordLoading: false,

    loginUserError: null,
    loginUserLoading: false,

    UserVideosLoad: false,
    UserVideosLoadError: null,

    UserVideosMoreLoad: false,
    UserVideosMoreLoadError: null,


    lastKeyUserVideos: null,

}


const ProfileReducer = (state = initialstate, action) => {

    switch (action.type) {


        case GET_USER_DETAILS_REQUEST:
            return {
                ...state,
                UserDetailsLoad: true,
                UserDetailsError: null,
            }
        case GET_USER_DETAILS_SUCCESS:
            //  console.log(action.payload, "payload")
            return {
                ...state,
                UserDetailsLoad: false,
                userProfile: action.payload.user
            }
        case GET_USER_DETAILS_FAILED:
            return {
                ...state,
                UserDetailsLoad: false,
                UserDetailsError: action.payload,
            }

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

        case GET_MORE_USER_VIDEOS_REQUEST:
            return {
                ...state,
                UserVideosMoreLoad: true,
                UserVideosMoreLoadError: null

            }

        case GET_MORE_USER_VIDEOS_SUCCESS:
            return {
                ...state,
                UserVideosMoreLoad: false,
                UserVideos: [...state.UserVideos, ...action.payload.Videos],
                lastKeyUserVideos: action.payload.lastKey
            }

        case GET_MORE_USER_VIDEOS_FAILED:
            return {
                ...state,
                UserVideosMoreLoad: false,
                UserVideosMoreLoadError: action.payload

            }
        case LOG_OUT_REQUEST:
            return initialstate

        case UPLOAD_VIDEO_REQUEST:
            return {
                ...state,
                uploadError: null,
                uploadLoading: true
            }
        case UPLOAD_VIDEO_SUCCESS:
            return {
                ...state,
                uploadLoading: false
            }
        case UPLOAD_VIDEO_FAILED:
            return {
                ...state,
                uploadError: action.payload,
                uploadLoading: false
            }
        case RESET_PASSWORD_LINK_REQUEST:
            return {
                ...state,
                resetPasswordError: null,
                resetPasswordLoading: true
            }
        case RESET_PASSWORD_LINK_SUCCESS:
            return {
                ...state,
                resetPasswordLoading: false
            }
        case RESET_PASSWORD_LINK_FAILED:
            return {
                ...state,
                resetPasswordError: action.payload,
                resetPasswordLoading: false
            }

        case SIGNUP_USER_REQUEST:
            return {
                ...state,
                registerUserError: null,
                registerUserLoading: true
            }
        case SIGNUP_USER_SUCCESS:
            return {
                ...state,
                registerUserLoading: false
            }
        case SIGNUP_USER_FAILED:
            return {
                ...state,
                registerUserError: action.payload,
                registerUserLoading: false
            }

        case LOGIN_REQUEST:
            return {
                ...state,
                loginUserError: null,
                loginUserLoading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginUserLoading: false
            }
        case LOGIN_FAILED:
            return {
                ...state,
                loginUserError: action.payload,
                loginUserLoading: false
            }
        default:
            return state

    }

}

export default ProfileReducer