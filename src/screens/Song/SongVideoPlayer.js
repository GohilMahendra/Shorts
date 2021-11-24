


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

const {
    height,width
}=Dimensions.get('window')

const SongVideoPlayer=({navigation})=>
{
    
    
  

    const songRefSet=useRef({})

    const route=useRoute()
  
    const Videos = useSelector(state => state.Songs.songVideos)
    
    const onViewRef = React.useRef(({viewableItems,changed})=> {


             changed.forEach(item => {
     
                 if (!item.isViewable) {

                    songRefSet.current[item.item.id].pauseVideo(item.isViewable)
                 }
             });
             viewableItems.forEach(item => {
                 if (item.isViewable) {
                songRefSet.current[item.item.id].playVideo(item.isViewable)
     
                 }
             });
     
              })
         const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })
     
         

   // const curruntVideo=useState(route.params.index)
    const renderItem=({item,index})=>
    {
        return(

            <VideoPlayer
            
            ref={ref => {songRefSet.current[item.id] = ref}}
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

            initialScrollIndex={(route.params!=undefined)?route.params.index:0}

            viewabilityConfig={viewConfigRef.current}

            onViewableItemsChanged={onViewRef.current}
            
            snapToInterval={height}
            renderItem={renderItem}

            >

            </FlatList>
        

        </View>
    )
}
export default SongVideoPlayer