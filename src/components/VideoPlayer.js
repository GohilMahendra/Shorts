import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";

import { View, Text, StyleSheet, Image, Dimensions, Pressable } from 'react-native'

import Video from 'react-native-video'
import VideoReview from "./VideoReview";
import VideoDetails from "./VideoDetails";
import { ActivityIndicator } from "react-native-paper";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from "@react-navigation/core";

import auth from '@react-native-firebase/auth'
import Animated, { useAnimatedStyle, useSharedValue, withDecay, withDelay, withRepeat, withSpring } from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler";
import { isExist } from "../functions/VideoPlayer/LikesOperations";
import convertToProxyURL from 'react-native-video-cache';
const { height, width } = Dimensions.get('window')
export default VideoPlayer = forwardRef((props, ref) => {



    const AnimatedView = Animated.createAnimatedComponent(View)

    const { data } = props

    const navigation = useNavigation()
    const [paused, setpaused] = useState(false)
    const childReviewRef = useRef()

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

    const [loading, setloading] = useState(false)

    const getUserDetails = async () => {
        const userDetails = await firestore()
            .collection('Users')
            .doc(data.channelID).get()
        setchannel(userDetails.data())
    }

    useEffect
        (
            () => {
                const subscription = navigation.addListener(
                    'blur',
                    () => {

                        if (!paused)
                            setpaused(true)
                    }
                )
                return () => subscription()
            },
            []
        )
    useEffect
        (
            () => {
                getUserDetails()

            }
            ,
            []
        )

    const TapRef = useRef()
    const scale = useSharedValue(0)
    const videoRef = useRef()

    const animStyle = useAnimatedStyle(
        () =>
        (
            {
                transform: [{
                    scale: Math.max(scale.value, 0)
                }]
            }
        )
    )

    const onDoubleTap = useCallback(
        () => {

           // console.log("double click")
         
            scale.value = withSpring(1, undefined, (isfinshed) => {

                if (isfinshed) {
                    scale.value = withDelay(600, withSpring(0))
                }
            })
            childReviewRef.current.testMethod()
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


    return (
        <View
            style={styles.Container}
        >

            <TapGestureHandler
                waitFor={TapRef}
                onActivated={() => setpaused(!paused)}
            >
                <TapGestureHandler
                    ref={TapRef}
                    numberOfTaps={2}
                    maxDelayMs={500}
                    onActivated={() => onDoubleTap()}
                >
                    <View>

                        <Video
                            ref={videoRef}
                            key={data.id}
                            source={
                                {
                                    uri: convertToProxyURL(data.VideoUrl),
                                    cache: true,
                                }
                            }
                            repeat={true}
                            resizeMode={"cover"}
                            posterResizeMode={"cover"}
                            paused={paused}
                            playInBackground={false}
                            preventsDisplaySleepDuringVideoPlayback={true}
                            filterEnable={true}
                            poster={data.VideoThumb}
                            bufferConfig={
                                {
                                    minBufferMs: 5000,
                                    maxBufferMs: 5000,
                                    bufferForPlaybackAfterRebufferMs: 5000,
                                    bufferForPlaybackMs: 5000
                                }
                            }
                            onReadyForDisplay={() => setloading(false)}
                            onLoad={()=>setloading(true)}
                          //  onEnd={()=>setloading(false)}
                            onVideoLoadStart={(e) => console.log(e)}
                            onVideoError={(err) => console.log(err)}
                            style={styles.videoPlayer}
                        >

                        </Video>
                    </View>

                </TapGestureHandler>

            </TapGestureHandler>

            <VideoReview
                data={data}
                channel={channel}
                //  like={like}
                ref={ref => { childReviewRef.current = ref }}
            ></VideoReview>

            <VideoDetails
                data={data}
                channel={channel}
            ></VideoDetails>

            <ActivityIndicator
                animating={loading}
                style={styles.loadingIndicater}
                color={"#fff"}
                size={'large'}
            >

            </ActivityIndicator>
            {paused &&
                <View
                    style={styles.pauseContainer}
                >
                    <View
                        style={styles.blurEffectView}
                    >
                    </View>
                    <View
                        style={styles.blurFreeView}
                    >
                        <FontAwesome5Icon
                            name="play"
                            size={40}
                            style={
                                {
                                    margin: 20
                                }
                            }
                            color="silver"
                        ></FontAwesome5Icon>
                    </View>
                </View>
            }

            <AnimatedView
                style={
                    [{
                        position: 'absolute',
                        top: '45%',
                        elevation:10,
                        alignSelf: 'center',
                    },
                        animStyle
                    ]}
            >
                <FontAwesome5Icon
                    name="heart"
                    style={
                        {
                            textShadowOffset: {
                                height: 3,
                                width: 3
                            },
                            textShadowColor: 'black',
                        }
                    }
                    solid={true}
                    color={'#fff'}
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
            {
                height: height,
                width: width

            },
            loadingIndicater:
            {
                position: 'absolute',
                top: '50%',
                alignSelf: 'center'

            },
            blurFreeView:
            {
                flex: 1,
                borderRadius: 100,
                height: 100,
                width: 100,
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
            },
            blurEffectView:
            {
                opacity: 0.7,
                height: 100,
                width: 100,
                backgroundColor: 'black',
                borderRadius: 100
            },
            videoPlayer:
            {
                height: '100%',
                width: '100%',
                //backgroundColor:'blue'
            },
            pauseContainer:
            {
                height: 100,
                width: 100,
                position: 'absolute',
                opacity: 1,
                alignSelf: "center",
                top: "45%"
            },


        }
    )

