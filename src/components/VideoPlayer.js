import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

import { View, Text, StyleSheet, Image, Dimensions, Pressable } from 'react-native'

import Video from 'react-native-video'
import VideoReview from "./VideoReview";
import VideoDetails from "./VideoDetails";
import { ActivityIndicator } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from "@react-navigation/core";

import Animated, { useAnimatedStyle, useSharedValue, withDecay, withDelay, withRepeat, withSpring }  from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler";

const { height, width } = Dimensions.get('window')
export default VideoPlayer = forwardRef((props, ref) => {



    const AnimatedView=Animated.createAnimatedComponent(View)

    const { data } = props

    const [paused, setpaused] = useState(false)

    const [like,setlike]=useState(false)
    const navigation = useNavigation()


    const TapRef=useRef()
    const scale=useSharedValue(0)

    const animStyle=useAnimatedStyle(
        ()=>
       (
        {
            transform:[{
                scale:Math.max(scale.value,0)
            }]
        }
       )
    )
    
    const onDoubleTap=useCallback(
        ()=>
        {

      //  console.log('double tap',scale.value)
        scale.value=withSpring(1,undefined,(isfinshed)=>{

            if(isfinshed)
            {
                scale.value=withDelay(400,withSpring(0))
            }
        })
        },
    []
    )
    useImperativeHandle(
        ref,
        () =>
        (
            {
                pauseVideo: () => {
                    if (!paused)
                        setpaused(true)
                },
                playVideo: () => {
                    if (paused)
                        setpaused(false)

                }

            }
        )
    )



    const [channel, setchannel] = useState(
        {
            userName: "",
            userID: "",
            varified: false,
            Followers: 0,
            photoURL: "",
            Following: 0,
            likes: 0,
        }
    )




    const getUserDetails = async () => {
        const userDetails = await firestore()
            .collection('Users')
            .doc(data.channelID).get()

        setchannel(userDetails.data())


    }


    const VideoRef = useRef()



    const [loading, setloading] = useState(false)

    useEffect
        (
            () => {
                getUserDetails()
            }, []
        )

    return (
        <View
            style={styles.Container}
        >

                <TapGestureHandler
                waitFor={TapRef}
                onActivated={()=>setpaused(!paused)}
                >
                <TapGestureHandler
                ref={TapRef}
                numberOfTaps={2}
                maxDelayMs={200}
                onActivated={()=>onDoubleTap()}
                >
                <View>
                <Video


                    ref={ref}

                    onAudioFocusChanged={
                        () => setpaused(!paused)
                    }


                    key={data.id}
                    source={
                        {
                            uri: data.VideoUrl,
                            cache: true,

                        }
                    }

                    repeat={false}
                    resizeMode={"cover"}

                    posterResizeMode={"cover"}
                    paused={paused}
                    playInBackground={false}

                    preventsDisplaySleepDuringVideoPlayback={true}
                    filterEnable={true}

                    poster={data.VideoThumb}

                    bufferConfig={
                        {
                            minBufferMs: 1500,
                            maxBufferMs: 1800,
                            bufferForPlaybackAfterRebufferMs: 1500,
                            bufferForPlaybackMs: 1500
                        }
                    }

                    onReadyForDisplay={() => setloading(false)}

                    onLoadStart={() => setloading(true)}
                    onVideoLoadStart={(e) => console.log(e)}
                    //onVideoProgress={(e)=>console.log(e)}
                    // onProgress={(e)=>console.log(e)}
                    onVideoError={(err) => console.log(err)}
                    style={{
                        height: '100%',
                        width: '100%',
                        //backgroundColor:'blue'
                    }}
                >

                </Video>
            </View>
            </TapGestureHandler>
            </TapGestureHandler>
          
            <VideoReview
                data={data}
                channel={channel}
            ></VideoReview>
            <VideoDetails
                data={data}
                channel={channel}
            ></VideoDetails>

            <ActivityIndicator
                animating={loading}
                style={{
                    position: 'absolute',
                    top: '50%',
                    alignSelf:'center'

                }}

                color={"#fff"}

                size={'large'}
            >

            </ActivityIndicator>


            {paused && <FontAwesome5Icon

                name="play"
                color="#fff"

                solid={false}
                size={100}
                style={{
                    position: 'absolute',
                    opacity: 1,
                 
                    alignSelf: "center",
                    top: "45%"
                }}
            >

            </FontAwesome5Icon>}

            <AnimatedView
            style={
                [{
                    position:'absolute',
                    top:'45%',
                    alignSelf:'center',
                },
                animStyle
                ]}
            >
                <FontAwesome5Icon
                name="heart"
                style={
                    {
                        textShadowOffset:{
                            height:3,
                            width:3
                        },
                      
                      
                        textShadowColor:'black',
                       
                    }
                }
                solid={true}
                color={'red'}
                size={100}
                ></FontAwesome5Icon>
            </AnimatedView>


        </View>
    )

}
)

const styles = StyleSheet.create
    (
        {
            Container:
            {   height: height,
                width: width

            }
        }
    )

