import { useRoute } from "@react-navigation/core"
import React, { useContext, useEffect, useRef, useState } from "react"

import { View, Image, Text, StyleSheet, RefreshControl, Animated } from 'react-native'
import { TouchableOpacity, FlatList, ScrollView } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import { useDispatch, useSelector } from "react-redux"
import { themeContext } from "../../../App"
import InfoBox from "../../components/UserDetails/InfoBox"
import VideoPreviewCard from '../../components/VideoPreviewCard'
import { Colors } from "../../constants/colors"
import { followUnFollow, getCreaterDetails, getCreaterVideos, getMoreCreaterVideos } from "../../redux/Actions/CreaterActions"

const CreaterDetails = ({ navigation }) => {

    const p = useRoute()

    const dispatch = useDispatch()


    const { theme } = useContext(themeContext)

    const videos = useSelector(state => state.Creater.CreaterVideos)

    const userDetails = useSelector(state => state.Creater.CreaterProfile)

    const CreaterVideosLoad = useSelector(state => state.Creater.CreaterVideosLoad)


    const unfollowFollow = async (createrID) => {
        dispatch(followUnFollow(createrID))
    }

    const animRef = useRef(new Animated.Value(1))

    const AnimateButton = () => {
        Animated.loop(

            // runs given animations in a sequence
            Animated.sequence([
                // increase size
                Animated.timing(animRef.current, {
                    toValue: 1.5,
                    duration: 200,
                    useNativeDriver: true
                }),
                // decrease size
                Animated.timing(animRef.current, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true
                }),
            ])

            ,
            { iterations: 2 }
        ).start();
    }

    const renderItem = ({ item, index }) => {

        //  console.log(item)
        return (
            <TouchableOpacity

                onPress={
                    () => navigation.navigate(
                        "CreaterVideoPlayer",
                        {
                            id: item.id,
                            index: index
                        }
                    )
                }

            >
                <VideoPreviewCard
                    data={
                        item
                    }
                >
                </VideoPreviewCard>

            </TouchableOpacity>
        )

    }


    const fetchMore = () => {
        dispatch(getMoreCreaterVideos(p.params.channelID))
    }


    const refreashCreater = () => {
        dispatch(getCreaterDetails(p.params.channelID))
        dispatch(getCreaterVideos(p.params.channelID))
    }



    useEffect(
        () => {
            dispatch(getCreaterDetails(p.params.channelID))
            dispatch(getCreaterVideos(p.params.channelID))
        },
        []
    )

    useEffect
        (
            () => {
                AnimateButton()

            },
            [userDetails.isFollowing]
        )


    return (
        <View
            style={styles.Container
            }
        >
            <ScrollView
                style={
                    {
                        flex: 1
                    }
                }
            >

                <View
                    style={styles.profileContainer}
                >
                    <LinearGradient
                    style={{
                        flex:1,
                        padding:10
                    }}
                    colors={[theme.gradient_color1,theme.gradient_color2]}
                    >

                    {userDetails.photoURL ?
                        <Image
                            source={
                                {
                                    uri: userDetails.photoURL
                                }
                            }

                            style={styles.imgProfile}
                        />
                        :
                        <View
                            style={styles.noImageConatiner}
                        >
                            <Text>{(userDetails.CreateName != undefined) ? userDetails.CreaterName.substr(0, 2) : ""}</Text>
                        </View>}

                    <View
                        style={styles.detailsContainer}
                    >
                        <Text
                            style={{
                                color: Colors.silver,
                                fontSize: 20,

                            }}

                        >
                            {userDetails.CreaterName}
                        </Text>
                        <Text
                            style={styles.txtCreaterID}

                        >
                            {userDetails.CreaterID}
                        </Text>
                    </View>

                    <InfoBox
                        followers={userDetails.Followers}
                        following={userDetails.Following}
                        likes={userDetails.likes}
                    >

                    </InfoBox>


                    <Animated.View
                        style={
                            {
                                width: 100,
                                justifyContent: 'center'
                                , alignSelf: 'center',
                                transform:
                                    [
                                        {
                                            scale: animRef.current.interpolate
                                                (
                                                    {
                                                        inputRange: [0, 1],
                                                        outputRange: [1.5, 1]

                                                    }
                                                )
                                        }
                                    ]
                            }
                        }
                    >
                      
                            <TouchableOpacity

                                onPress={() => unfollowFollow(p.params.channelID)}
                                style={[styles.btnFollow,{backgroundColor:theme.background_color}]}
                            >
                                <Text
                                    style={styles.txtFollwing}
                                >{
                                        userDetails.isFollowing ? "Following" : "Follow"
                                    }</Text>

                            </TouchableOpacity>
                       
                    </Animated.View>
                </LinearGradient>
                </View>


            </ScrollView>

            <View

                style={
                    {
                        height: "60%"

                    }
                }
            >

                <FlatList
                    style={
                        {
                            margin: 10,
                            flex: 1,

                        }
                    }

                    refreshControl={
                        <RefreshControl
                            refreshing={CreaterVideosLoad}
                            onRefresh={() => refreashCreater()}
                        ></RefreshControl>
                    }

                    scrollEnabled={true}
                    data={videos}
                    onEndReached={
                        () => fetchMore()
                    }
                    renderItem={renderItem}
                    numColumns={3}
                    keyExtractor={item => item.id}

                >

                </FlatList>



            </View>


        </View>
    )
}

const styles = StyleSheet.create(
    {
        Container:
        {
            flex: 1,
            backgroundColor: Colors.black

        },
        btnFollow:

        {

            padding: 10,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
            elevation:10

        },
        detailsContainer:
        {
            marginTop: 10,
            alignItems: "center",
            justifyContent: "center"
        },
        profileContainer:
        {
            backgroundColor: Colors.black,
           // margin: 10,
        //   padding:10,
            justifyContent: 'center'
        },
        txtCreaterID:
        {
            color: Colors.silver,
            fontSize: 18
        },
        imgProfile:
        {
            height: 70,
            width: 70,
            alignSelf: 'center',
            borderWidth:2,
            borderColor:'#fff',
            borderRadius: 70
        },
        gradientBtn:
        {
            flex: 1,
            borderRadius: 15
        },
        noImageConatiner:
        {
            height: 70,
            width: 70,
            alignSelf: 'center',
            backgroundColor: 'silver',
            borderRadius: 70,

        },
        txtFollwing:
        {

            textAlign: 'center',
            color: Colors.White,
            width: 100,

        }

    }
)
export default CreaterDetails