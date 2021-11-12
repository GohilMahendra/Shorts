
import { useFocusEffect } from "@react-navigation/core"
import React, { useEffect, useRef, useState } from "react"

import {
    Dimensions,
    View,
    BackHandler,
    Alert

} from 'react-native'
import { FlatList } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import VideoPlayer from "../components/VideoPlayer"
import { getHomeFeedVideos } from "../redux/Actions/HomeActions"


const {height,width}=Dimensions.get('screen')

const Home = () =>
{


    const dispatch=useDispatch()
    const Videos=useSelector(state=>state.Home.HomeVideos)

    const listRef=useRef()

    const renderItem=({item,index})=>
    {
        return(
            <VideoPlayer
            data={item}
            ></VideoPlayer>
        )
    }


 
    useEffect
    (
        ()=>
        {
            dispatch(getHomeFeedVideos())
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
            ref={listRef}
            style={{
                
              flex:1,
              backgroundColor:'black',
              width:'100%'
            }}


            maxToRenderPerBatch={2}
            data={Videos}
            keyExtractor={(item)=>item.id}
            snapToInterval={height}
            renderItem={renderItem}

            >

            </FlatList>
        

        </View>
    )
    
}

export default Home