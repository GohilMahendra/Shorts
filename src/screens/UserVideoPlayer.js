


import React, { useState,useEffect } from "react";

import {
    View,Text,FlatList, Dimensions
  } from "react-native";
  import {  } from "react-native-gesture-handler"
import VideoPlayer from "../components/VideoPlayer"


import { 
    useDispatch,useSelector
 } from "react-redux";
import firestore from "@react-native-firebase/firestore";
import { useRoute } from "@react-navigation/core";

import auth from "@react-native-firebase/auth";


const {
    height,width
}=Dimensions.get('screen')

const UserVideoPlayer=({navigation})=>
{
    



    const route=useRoute()



    const dispatch=useDispatch()
  

    useSelector(state=>console.log(state))
    
    const Videos=useSelector(
            state=>state.Profile.UserVideos
    )



    console.log(route.params.index)
    const curruntVideo=useState(route.params.index)
    const renderItem=({item,index})=>
    {
        console.log(item)
        return(
            <VideoPlayer
            
            data={item}
            ></VideoPlayer>
        )
    }

    const getVideos=async()=>
    {
        try
        {
        const videoDetails=firestore().collection('Videos').where(
            "channelID",'==',auth().currentUser.uid
        ).limit(10)

        videoDetails.onSnapshot
        (
            
            (snapshot)=>
            {
               
                let posts=[]

                snapshot.forEach
                (
                    function(child)
                    {


                      
                        posts.push({id:child.id,...child.data()})
                    }


                  
                )

                console.log(posts)
               setVideos(posts)

            },
            err=>console.log(err)
        )
    

       // return ()=>videoDetails()
      
    }
        catch(err)
        {
            console.log(err)
        }
        
    }
    // useEffect
    // (
    //     ()=>
    //     {

    //         getVideos()
    //     },
    //     []
    // )
   
    return(

        <View
        style={{
            flex:1,
            backgroundColor:'#fff'
        }}
        >

            <FlatList
            
            style={{
                
              flex:1
            }}

            initialScrollIndex={
                Videos.length>0?route.params.index:0
            }
            data={Videos}
            keyExtractor={(item)=>item.id}
            scrollEnabled={true}
            snapToInterval={height-50}

            //snapToInterval={curruntVideo}
            renderItem={renderItem}

            >

            </FlatList>
        

        </View>
    )
}
export default UserVideoPlayer