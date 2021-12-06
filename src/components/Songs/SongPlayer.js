

import React, { useEffect, useRef, useState } from 'react';

import { Pressable, View } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { cos } from 'react-native-reanimated';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Video from "react-native-video";

import convertToProxyURL from 'react-native-video-cache'
const SongPlayer=({data})=>

{
  
  
    const [paused,setpaused]=useState(true)

    useEffect
    (
        ()=>
        {
    console.log(paused)
        }
    ,[paused])
    return(
        <View
        style={{
            height:100,
            width:100,
            borderRadius:15,
            backgroundColor:'#fff'
        }}


        >
            <Pressable
            onPress={()=>setpaused(!paused)}
            >
            <Video

            paused={paused}
            bufferConfig={
                {
                    minBufferMs:15000,
                    maxBufferMs:18000,
                    bufferForPlaybackMs:15000,
                    
                    bufferForPlaybackAfterRebufferMs:15000
                }
            }

            posterResizeMode="cover"
          //  ref={ref=>console.log(ref)}
            source={
                {
                    uri:convertToProxyURL(data.VideoUrl)
                
                }
            }
            
        
            resizeMode={"cover"}
            onError={(err)=>console.log(err)}
            poster={data.SongCover}
            audioOnly={true}

            repeat={true}
           // paused={true}
            onReadyForDisplay={()=>console.log("ready")}
            style={{
                height:100,
                width:100,
                borderRadius:15,
                backgroundColor:"black"
            }}
            >

            </Video>
            </Pressable>

            {
                paused
                &&
                <FontAwesome5Icon
                name="play"
                style={
                    {
                        position:'absolute',
                        alignSelf:'center',
                        top:'40%'
                    }
                }
                size={20}
                color="#fff"
                ></FontAwesome5Icon>
            }
        </View>
    )

}

export default SongPlayer