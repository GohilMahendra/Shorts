


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

const CreaterVideoPlayer=({navigation})=>
{
    
    const route=useRoute()

    const dispatch=useDispatch()
  
  
    const Videos=
  
    useSelector(           state=>state.Creater.CreaterVideos
    )


   

   // const curruntVideo=useState(route.params.index)
    const renderItem=({item,index})=>
    {
        return(

            <View
            style={
                {
                    height:'100%',
                    width:'100%'
                }
            }
            >
            <VideoPlayer
            
            data={item}
            ></VideoPlayer>
            </View>
        )
    }

    return(

        <View
        style={{
            flex:1,
            backgroundColor:'black'
        }}
        >

            <FlatList
            
            style={{
                
              flex:1
            }}


            contentContainerStyle={
            {
                flexGrow:1
            }
            }
            data={Videos}
            keyExtractor={(item)=>item.id}
            scrollEnabled={true}
            snapToInterval={height}
            maxToRenderPerBatch={2}

            initialScrollIndex={
                route.params.index!=undefined?
                route.params.index:0
            }
            //snapToInterval={curruntVideo}
            renderItem={renderItem}

            >

            </FlatList>
        

        </View>
    )
}
export default CreaterVideoPlayer