
import { stat } from 'react-native-fs'
import {


    FETCH_MORE_VIDEO_Tags_FAILED,
    FETCH_MORE_VIDEO_Tags_REQUEST,
    FETCH_MORE_VIDEO_Tags_SUCCESS,
FETCH_VIDEO_Tags_FAILED,
FETCH_VIDEO_Tags_REQUEST,
FETCH_VIDEO_Tags_SUCCESS
}

    from '../Types/TagTypes'

const initialstate = {


    TagVideos: [],

    TagVideosLoad: false,
    TagVideosLoadError: null,

    TagVideosMoreLoad: false,
    TagVideosMoreLoadError: null,


    lastKeyTagVideos: null,

}


const TagReducer = (state = initialstate, action) => {

    switch (action.type) {


        case FETCH_VIDEO_Tags_REQUEST:
            return {
                ...state,
                TagVideosLoadError: null,
                TagVideosLoad: false
            }
        case FETCH_VIDEO_Tags_SUCCESS:
            return {
                ...state,

                TagVideosLoad: false,
                TagVideos: action.payload.Videos,
                lastKeyTagVideos: action.payload.lastKey
            }
        case FETCH_VIDEO_Tags_FAILED:
            return {
                ...state,
                TagVideosLoadError: action.payload,
                TagVideosLoad: false


            }

        case FETCH_MORE_VIDEO_Tags_REQUEST:
            return {
                ...state,
                TagVideosMoreLoad:true,
                TagVideosMoreLoadError:null
            }
        case FETCH_MORE_VIDEO_Tags_SUCCESS:
            return {
                ...state,
                TagVideosMoreLoad:false,
                TagVideos:[...state.TagVideos,...action.payload.Videos],
                lastKeyTagVideos:action.payload.lastKey
            }

        case FETCH_MORE_VIDEO_Tags_FAILED:
            return {
                ...state,
                TagVideosLoad:false,
                TagVideosLoadError:action.payload
            }

        default:
            return state

    }

}

export default TagReducer