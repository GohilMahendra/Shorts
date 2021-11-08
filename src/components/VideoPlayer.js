import { isTemplateElement } from "@babel/types";
import { firebase } from "@react-native-firebase/firestore";
import React, { useEffect, useRef, useState } from "react";

import {View,Text,StyleSheet, Dimensions, Pressable} from 'react-native'


import storage from "@react-native-firebase/storage";

import Video from 'react-native-video'
import VideoReview from "./VideoReview";
import VideoDetails from "./VideoDetails";
import { ActivityIndicator } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";


const {height,width}= Dimensions.get('window')
 const VideoPlayer=(props)=>
 {

    const {data}=props

    const [paused,setpaused]=useState(false)

    const VideoRef=useRef()

    const [loading,setloading]=useState(false)

    const uri=storage().ref(data.VideoUrl)


    useEffect
    (
        ()=>
        {


           
        


        },
        []
    )

    return(
        <View
        style={styles.Container}
        >

            <Pressable
            onPress={()=>setpaused(!paused)}

            ontap
            >
            <Video
            

            ref={VideoRef}

            onAudioFocusChanged={
                ()=>setpaused(!paused)
            }

            key={data.id}
            source={
                {
                    uri:data.VideoUrl,
                    cache:true,
                    
                }
            }

            repeat={false}
            resizeMode={"cover"}
            
            paused={paused}
            playInBackground={false}

            preventsDisplaySleepDuringVideoPlayback={true}
            filterEnable={true}
            
            poster={data.VideoThumb}


       
            onReadyForDisplay={()=>setloading(false)}
           onLoadStart={()=>setloading(true)}
            onVideoLoadStart={(e)=>console.log(e)}
            //onVideoProgress={(e)=>console.log(e)}
           // onProgress={(e)=>console.log(e)}
            onVideoError={(err)=>console.log(err)}
            style={{
                
              height:height,
              width:width
            }}
            >

           

            </Video>
            </Pressable>
            <VideoReview
            data={data}
            ></VideoReview>
            <VideoDetails
            data={data}
            ></VideoDetails>

            <ActivityIndicator
            animating={loading}
            style={{
                position:'absolute',
                top:'50%',
                left:"45%"
                
            }}

            color={"#fff"}

            size={'large'}
            >

            </ActivityIndicator>
            

           {paused && <FontAwesome5Icon

            name="play"
            color="#fff"
        
            size={50}
            style={{
                position:'absolute',
                opacity:0.7,
                alignSelf:"center",
                top:"50%"
            }}
            >

            </FontAwesome5Icon>}
        </View>
    )

 }

 const styles=StyleSheet.create
 (
     {
         Container:
         {
             flex:1,

             backgroundColor:'black'
         }
     }
 )

 export default VideoPlayer