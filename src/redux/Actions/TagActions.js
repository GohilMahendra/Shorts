


import React from "react";

import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { FETCH_VIDEO_Tags_FAILED, FETCH_VIDEO_Tags_REQUEST, FETCH_VIDEO_Tags_SUCCESS } from "../Types/TagTypes";
import { createIconSetFromFontello } from "react-native-vector-icons";

const MAX_FETCH_LIMIT=1

export const getTagVideos=(tags)=>
{

    return async(dispatch,getState)=>
    {



        try
        {

            dispatch({type:FETCH_VIDEO_Tags_REQUEST})

            const userVideos=await firestore().collection(
                'Videos'
            )
            .where('Tags','array-contains',tags).get()


            let list=[]


            userVideos.docs.forEach
            (
                function(child)
                {
                    list.push({id:child.id,...child.data()})
                }
            )

        

            let lastKey=null

            if(list.length>=MAX_FETCH_LIMIT)
            {
                lastKey=list[list.length-1].id
            }
            

            console.log(lastKey)

            dispatch(
                {
                    type:FETCH_VIDEO_Tags_SUCCESS,
                    payload:{
                        Videos:list,
                        lastKey:lastKey
                    }
                }
            )

        }

        catch(err)
        {

            dispatch(
                {
                    type:FETCH_VIDEO_Tags_FAILED,
                    payload:err
                }
            )


        }

    }



}

const getMoreTagVideos=()=>
{
    
    return async(dispatch)=>
    {


        try
        {

        }

        catch(err)
        {
            
        }

    }


}