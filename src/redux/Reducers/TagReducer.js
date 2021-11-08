
import {


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



        default:
            return state

    }

}

export default TagReducer