


import { State } from "react-native-gesture-handler";
import { GET_HOME_FEED_VIDEOS_FAILED, GET_HOME_FEED_VIDEOS_REQUEST, GET_HOME_FEED_VIDEOS_SUCCESS } from "../Types/HomeFeedTypes";

const initialstate={



    HomeVideos:[],
    
    HomeVideosLoad:false,
    HomeVideosLoadError:null,
    
    HomeVideossMoreLoad:false,
    HomeVideosMoreLoadError:null,


    lastKeyHomeVideos:null,

}


const HomeFeedReducer=(state=initialstate,action)=>
{

    switch(action.type)
    {


       

      case GET_HOME_FEED_VIDEOS_REQUEST:
          return {...state,
                 HomeVideosLoad:true,
                 HomeVideosLoadError:null
        }
      case GET_HOME_FEED_VIDEOS_SUCCESS:

      console.log(action.payload.Videos,'payload of')
          return {...state,
            HomeVideos:action.payload.Videos,
            HomeVideosLoad:false

        }
      case GET_HOME_FEED_VIDEOS_FAILED:

      


        default:
        return state

    }

}

export default HomeFeedReducer