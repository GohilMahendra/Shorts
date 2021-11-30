import { firebase } from "@react-native-firebase/firestore";
import React, { useDebugValue, useCallback, useRef, useEffect, useState, useImperativeHandle, forwardRef } from "react";

import { View, Image, Text, StyleSheet, Dimensions, Animated, Pressable } from 'react-native'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { useNavigation } from "@react-navigation/native";


import { TouchableOpacity } from "react-native-gesture-handler";
import RoundImage from "./RoundImage";


import Share from "react-native-share";
import RNFS, { CachesDirectoryPath, downloadFile } from "react-native-fs";
import { Dislike, isExist, LikeVideo } from "../functions/VideoPlayer/LikesOperations";

const VideoReview = forwardRef((props, ref) => {

    const { data, channel, like } = props


   
    const navigation = useNavigation()

    const [liked, setliked] = useState(like)


    const [dynamic, setdynamic] = useState
        (
            {
                likes: data.likes,
                comments: data.comments,

            }
        )



    const anim = useRef(new Animated.Value(1));

    const IsLiked = async () => {
        try {
            const exists = await isExist(data.id)
            setliked(exists)
        }
        catch (err) {
            console.log(err)
        }
    }



    useEffect(
        () => {

            IsLiked()
        },
        []
    )

    useImperativeHandle(
        ref,
        () => ({
             testMethod : () => {
                if(!liked)
                {
                LikeAction()
                }

            }

        })
    )

    const DonwloadVideo = async () => {

        try {
            await RNFS.downloadFile
                (
                    {
                        fromUrl: data.VideoUrl,

                        toFile: RNFS.DownloadDirectoryPath + '/' + data.Title + '.mp4',

                        progress: (res) => console.log(
                           res),

                    },

                )
        }
        catch (err) {
            console.log(err)
        }
    }



    const share = async () => {

        DonwloadVideo()

        console.log("share")
        Share.open({
            saveToFiles: true,

            showAppsToView: false,
            url:'file:///'+ RNFS.DownloadDirectoryPath + '/' + data.Title + '.mp4',
            title: 'Share Video FIle',
            message: "Dont forget to give star on GITHUB"
        })
            .then((res) => {

                console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });
    }




    useEffect(() => {
        // makes the sequence loop
        Animated.loop(

            // runs given animations in a sequence
            Animated.sequence([
                // increase size
                Animated.timing(anim.current, {
                    toValue: 1.5,
                    duration: 200,
                    useNativeDriver: true
                }),
                // decrease size
                Animated.timing(anim.current, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true
                }),
            ])

            ,
            { iterations: 2 }
        ).start();

    }, [liked]);



    const LikeAction = async () => {

        setliked(!liked)
        const res = await isExist(data.id)

        if (res) {

            setdynamic({ ...dynamic, likes: dynamic.likes - 1 })
            await Dislike(data.id, data.channelID)

        }
        else {

            setdynamic({ ...dynamic, likes: dynamic.likes + 1 })
            await LikeVideo(data.id, data.channelID)

        }
    }


    return (
        <View
            style={styles.Container}
        >


            <TouchableOpacity
                onPress={
                    () => navigation.navigate('CreaterDetails', {
                        channelThumbnail: data.channelThumbnail,
                        channelID: data.channelID,
                        chanalName: data.channelName
                    })
                }
            >


                <RoundImage
                    imageURL={channel.photoURL}
                >
                </RoundImage>


            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => LikeAction()}
            >
                <View
                    style={styles.effectContainer}
                >
                    <View
                        style={styles.blurBackground}
                    >
                    </View>

                    <View
                        style={styles.blurFreeView}
                    >

                        <Animated.View

                            style={{
                                transform: [{
                                    scale: anim.current
                                }]
                            }}>

                            <FontAwesome5
                                name="heart"
                                solid={(liked) ? true : false}
                                size={30}
                                color={
                                    "red"
                                }
                            >

                            </FontAwesome5>
                        </Animated.View>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#fff",
                                textAlign: 'center'
                            }}
                        >{dynamic.likes}</Text>

                    </View>


                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Comments', { key: data.id })}
            >
                <View
                    style={styles.effectContainer}
                >

                    <View
                        style={styles.blurBackground}
                    >
                    </View>

                    <View
                        style={styles.blurFreeView
                        }
                    >

                        <FontAwesome5
                            name="comment-dots"
                            size={30}
                            color={
                                "#fff"
                            }
                        >

                        </FontAwesome5>
                        <Text
                            style={{
                                fontSize: 18,
                                color: "#fff",
                                textAlign: 'center'
                            }}
                        >{dynamic.comments}</Text>

                    </View>

                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => share()}
            >
                <View
                    style={styles.effectContainer}
                >

                    <View
                        style={styles.blurBackground}
                    >
                    </View>

                    <View
                        style={styles.blurFreeView
                        }
                    >

                        <FontAwesome5
                            name="share"
                            size={30}
                            color={
                                "#fff"
                            }
                        >

                        </FontAwesome5>

                    </View>


                </View>
            </TouchableOpacity>

        </View>
    )

}
)
const styles = StyleSheet.create
    (
        {
            Container:
            {
                width: 100,
                height: '50%',
                position: "absolute",
                right: 5,
                bottom: 150,

            },
            effectContainer:
            {
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10
            },
            blurBackground:
            {
                backgroundColor: "#fff",
                height: 70,
                width: 70,
                borderRadius: 15,
                opacity: 0.1
            },
            blurFreeView:

            {
                position: "absolute"
            }
        }
    )


export default VideoReview