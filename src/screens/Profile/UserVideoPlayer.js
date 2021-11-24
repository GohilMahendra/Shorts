


import React, { useState,useEffect } from "react";

import {
    View,Text,FlatList, Dimensions
  } from "react-native";
  import {  } from "react-native-gesture-handler"
import VideoPlayer from "../../components/VideoPlayer"


import { 
    useDispatch,useSelector
 } from "react-redux";
import { useRoute } from "@react-navigation/core";

const {
    height,width
}=Dimensions.get('window')

const UserVideoPlayer=({navigation})=>
{
    
    const route=useRoute()

    const dispatch=useDispatch()
  
    
    const Videos=    useSelector(
            state=>state.Profile.UserVideos)

   // const curruntVideo=useState(route.params.index)
    const renderItem=({item,index})=>
    {
        return(
            <VideoPlayer
            
            data={item}
            ></VideoPlayer>
        )
    }

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

             initialScrollIndex={route.params!=undefined?route.params.index:0}
            data={Videos}
            keyExtractor={(item)=>item.id}
            scrollEnabled={true}
            snapToInterval={height}
            maxToRenderPerBatch={5}

            //snapToInterval={curruntVideo}
            renderItem={renderItem}

            >

            </FlatList>
        

        </View>
    )
}
export default UserVideoPlayer