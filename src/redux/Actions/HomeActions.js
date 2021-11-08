

import React from "react";

import firestore, { firebase } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { GET_HOME_FEED_VIDEOS_FAILED, GET_HOME_FEED_VIDEOS_REQUEST, GET_HOME_FEED_VIDEOS_SUCCESS } from "../Types/HomeFeedTypes";
const MAX_FETCH_LIMIT=1


export const getHomeFeedVideos=()=>
{

    return async(dispatch)=>
    {
        try
        {


            dispatch(
                {
                    type:GET_HOME_FEED_VIDEOS_REQUEST
                }
            )
            const videos=await firestore().collection('Videos').get()

            let list=[]


            console.log(videos,
            "Videos"    )
            videos.docs.forEach
            (
                function(child)
                {
                    list.push(
                        {
                            id:child.id,
                            ...child.data()
                        }
                    )
                }
            )


            let lastKey=null

            if(list.length>=MAX_FETCH_LIMIT)
            {
                lastKey=list[list.length-1].id
            }


            console.log(list)
 
            
            dispatch(
                {
                    type:GET_HOME_FEED_VIDEOS_SUCCESS,
                    payload:{
                        Videos:list,
                        lastKey:lastKey
                    }
                }
            )

        }
        catch(err)
        {

            console.log(err)

            dispatch(
                {
                    type:GET_HOME_FEED_VIDEOS_FAILED,
                    payload:err
                }
            )


        }
    }

}
