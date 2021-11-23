import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import { View, Text, StyleSheet, Image, Dimensions, Pressable } from 'react-native'

import Video from 'react-native-video'
import VideoReview from "./VideoReview";
import VideoDetails from "./VideoDetails";
import { ActivityIndicator } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from "@react-navigation/core";

const { height, width } = Dimensions.get('window')
export default VideoPlayer = forwardRef((props, ref) => {


    const { data } = props

    const [paused, setpaused] = useState(false)

    const navigation = useNavigation()





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

            onLayout={
                (e) => {
                    console.log(e.nativeEvent.layout)
                }
            }
            style={styles.Container}
        >

            <Pressable
                onPress={() => setpaused(!paused)}
            >
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
            </Pressable>
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
                    left: "45%"

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
                    position: 'absolute',
                    opacity: 0.7,
                    alignSelf: "center",
                    top: "50%"
                }}
            >

            </FontAwesome5Icon>}


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

