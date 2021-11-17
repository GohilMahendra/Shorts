
import { useFocusEffect } from "@react-navigation/core"
import React, { useEffect, useRef, useState } from "react"

import {
    Dimensions,
    View,
    Text,
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
            backgroundColor:'black'
        }}
        >

            <FlatList
            ref={listRef}
            style={{
                
              flex:1,
            
                          }}

      
            
                          contentContainerStyle={
                              {
                                  flexGrow:1
                              }
                          }
            ListEmptyComponent={
                <View
                style={
                    {
                    
                        borderWidth:1,
                        height:50,
                        borderColor:"#fff",
                        marginTop:height/2.5,
                        justifyContent:"center",
                        alignItems:'center',
                        
                        //position:'absolute',
                        //top:'50%'
                    }
                }
                >
                    <Text
                    style={
                        {
                            color:"#fff"
                        }
                    }
                    >No Videos HERE!!</Text>
                </View>
            }


            maxToRenderPerBatch={2}
            data={Videos}
            keyExtractor={(item)=>item.id}
            snapToInterval={height}
            snapToAlignment={'center'}
            renderItem={renderItem}

            >

            </FlatList>
        

        </View>
    )
    
}

export default Home