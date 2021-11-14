

import React, { useRef, useState } from 'react';

import { View } from "react-native";
import { cos } from 'react-native-reanimated';
import Video from "react-native-video";
const SongPlayer=(songUrl)=>





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
                    uri:"https://firebasestorage.googleapis.com/v0/b/shorts-c2643.appspot.com/o/Videos%2FIbRtvhkWAXXOgTHl9t89SQrgJU02%2FIbRtvhkWAXXOgTHl9t89SQrgJU02-1635655729108?alt=media&token=41e48ce8-3584-495c-83c8-56ce54a6414a",
                
                }
            }
            


            resizeMode={"cover"}
            onError={(err)=>console.log(err)}


            
            audioOnly={true}

            repeat={true}
            paused={paused}
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