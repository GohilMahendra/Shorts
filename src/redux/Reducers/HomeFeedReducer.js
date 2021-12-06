import { GET_MORE_CREATER_VIDEOS_FAILED, GET_MORE_CREATER_VIDEOS_REQUEST, GET_MORE_CREATER_VIDEOS_SUCCESS } from "../Types/CreaterTypes";
import { GET_HOME_FEED_VIDEOS_FAILED, GET_HOME_FEED_VIDEOS_REQUEST, GET_HOME_FEED_VIDEOS_SUCCESS, GET_MORE_HOME_FEED_VIDEOS_FAILED, GET_MORE_HOME_FEED_VIDEOS_REQUEST, GET_MORE_HOME_FEED_VIDEOS_SUCCESS } from "../Types/HomeFeedTypes";

const initialstate = {

    HomeVideos: [],

    HomeVideosLoad: false,
    HomeVideosLoadError: null,

    HomeVideossMoreLoad: false,
    HomeVideosMoreLoadError: null,


    lastKeyHomeVideos: null,

}


const HomeFeedReducer = (state = initialstate, action) => {

    switch (action.type) {

        case GET_HOME_FEED_VIDEOS_REQUEST:
            return {
                ...state,
                HomeVideosLoad: true,
                HomeVideos:[],
                HomeVideosLoadError: null
            }
        case GET_HOME_FEED_VIDEOS_SUCCESS:

            //console.log(action.payload.Videos,'payload of')
            return {
                ...state,
                HomeVideos: action.payload.Videos,
                lastKeyHomeVideos:action.payload.lastKey,
                HomeVideosLoad: false

            }
        case GET_HOME_FEED_VIDEOS_FAILED:
            return {...state,
            HomeVideosLoad:false,
            HomeVideosLoadError:action.payload
            }

        case GET_MORE_HOME_FEED_VIDEOS_REQUEST:
            return {
                ...state,
                HomeVideosMoreLoadError:null,
                HomeVideossMoreLoad:true
            }

        case GET_MORE_HOME_FEED_VIDEOS_SUCCESS:
            return {
                ...state,
                HomeVideossMoreLoad:false,
                lastKeyHomeVideos:action.payload.lastKey,
                HomeVideos:[...state.HomeVideos,...action.payload.Videos]
            }
            
        case GET_MORE_HOME_FEED_VIDEOS_FAILED:
            return {
                ...state,
                HomeVideossMoreLoad:false,
                HomeVideosMoreLoadError:action.payload
            }

        
        default:
            return state

    }

}

export default HomeFeedReducer