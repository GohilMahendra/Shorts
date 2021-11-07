


import React, { useState,useEffect } from "react";

import {
    View,Text
  } from "react-native";
  import { FlatList } from "react-native-gesture-handler"
import EmptyComponent from "../components/EmptyComponent"
import VideoPlayer from "../components/VideoPlayer"

import firestore from "@react-native-firebase/firestore";
import { useRoute } from "@react-navigation/core";

import auth from "@react-native-firebase/auth";



const UserVideoPlayer=({navigation})=>
{
    const [Videos,setVideos]=useState({})



    const route=useRoute()





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
    useEffect
    (
        ()=>
        {

            getVideos()
        },
        []
    )
   
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


            scrollToIndex={1}
         
            data={Videos}
            keyExtractor={(item)=>item.id}


            scrollEnabled={true}
        

            //snapToInterval={curruntVideo}
            renderItem={renderItem}

            >

            </FlatList>
        

        </View>
    )
}
export default UserVideoPlayer