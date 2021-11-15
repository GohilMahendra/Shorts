

import React, { useRef, useState } from 'react';

import { View } from "react-native";
import { cos } from 'react-native-reanimated';
import Video from "react-native-video";
const SongPlayer=({data})=>





{


  
    const [paused,setpaused]=useState(false)

    const save=()=>
    {
        ref.current.save()
    }

    const ref=useRef()
    return(
        <View
        style={{
            height:500,
            width:500,
            backgroundColor:'#fff'
        }}
        >
            <Video

            bufferConfig={
                {
                    minBufferMs:1200,
                    maxBufferMs:1500
                }
            }

            onBuffer={()=>console.log("buffring")}
          //  ref={ref=>console.log(ref)}
            source={
                {
                    uri:data.VideoUrl
                
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
                height:300,
                width:100,
                backgroundColor:"black"
            }}
            >

            </Video>

        </View>
    )

}

export default SongPlayer