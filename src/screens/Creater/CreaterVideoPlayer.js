


import React, { useState,useEffect, useRef } from "react";

import {
    View,Text,FlatList, Dimensions
  } from "react-native";
  import {  } from "react-native-gesture-handler"
import VideoPlayer from "../../components/VideoPlayer"


import { 
    useDispatch,useSelector
 } from "react-redux";
import { useRoute } from "@react-navigation/core";
import { configureFonts } from "react-native-paper";

const {
    height,width
}=Dimensions.get('window')

const CreaterVideoPlayer=({navigation})=>
{
    
    const route=useRoute()

    const dispatch=useDispatch()
  

    const refsset=useRef({})
  
    const Videos=
  
    useSelector(state=>state.Creater.CreaterVideos
    )


    
    const onViewRef = React.useRef(({viewableItems,changed})=> {


             changed.forEach(item => {
     
                 if (!item.isViewable) {

                    refsset.current[item.item.id].pauseVideo(item.isViewable)
                 }
             });
             viewableItems.forEach(item => {
                 if (item.isViewable) {
                refsset.current[item.item.id].playVideo(item.isViewable)
     
                 }
             });
     
              })
         const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })
     
         

   // const curruntVideo=useState(route.params.index)
    const renderItem=({item,index})=>
    {
        return(

            <VideoPlayer
            
            ref={ref => {refsset.current[item.id] = ref}}
            data={item}
            ></VideoPlayer>
            
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

            data={Videos}
            keyExtractor={(item)=>item.id}
            scrollEnabled={true}
          //  snapToInterval={height}
            maxToRenderPerBatch={10}

            viewabilityConfig={viewConfigRef.current}

            initialScrollIndex={route.params!=undefined?route.params.index:0}
            onViewableItemsChanged={onViewRef.current}
            
            snapToInterval={height}
            renderItem={renderItem}

            >

            </FlatList>
        

        </View>
    )
}
export default CreaterVideoPlayer