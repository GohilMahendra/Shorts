import { useRoute } from "@react-navigation/core"
import React, { useEffect, useRef, useState } from "react"

import { View, Image, Text, StyleSheet, RefreshControl, Animated }    from 'react-native'
import { TouchableOpacity, FlatList, ScrollView } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import InfoBox from "../../components/UserDetails/InfoBox"
import VideoPreviewCard from '../../components/VideoPreviewCard'
import { Colors } from "../../constants/colors"
import { followUnFollow, getCreaterDetails, getCreaterVideos } from "../../redux/Actions/CreaterActions"

const CreaterDetails = ({ navigation }) => {

    const p = useRoute()

    const dispatch = useDispatch()


    const videos = useSelector(state => state.Creater.CreaterVideos)

    const userDetails = useSelector(state => state.Creater.CreaterProfile)

    console.log(userDetails.isFollowing)
    const CreaterVideosLoad = useSelector(state => state.Creater.CreaterVideosLoad)


    const unfollowFollow = async (createrID) => {
        dispatch(followUnFollow(createrID))
    }

    const animRef=useRef(new Animated.Value(1))

    const AnimateButton=()=>
    {
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

    useEffect(
        () => {
            dispatch(getCreaterDetails(p.params.channelID))
            dispatch(getCreaterVideos(p.params.channelID))
        },
        []
    )

    useEffect
    (
        ()=>
        {
            AnimateButton()

        },
        [userDetails.isFollowing]
    )


    return (
        <View
            style={
                {
                    flex: 1,
                    backgroundColor: Colors.black
                }
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
                    style={{

                        backgroundColor: Colors.black,
                        margin: 10,

                        justifyContent: 'center'
                    }}
                >

                    {userDetails.photoURL ?
                        <Image
                            source={
                                {
                                    uri: userDetails.photoURL
                                }
                            }

                            style={
                                {
                                    height: 100,
                                    width: 100,
                                    alignSelf: 'center',
                                    borderRadius: 100
                                }
                            }
                        />
                        :
                        <View
                            style={
                                {
                                    height: 100,
                                    width: 100,
                                    alignSelf: 'center',
                                    backgroundColor: 'silver',
                                    borderRadius: 100,

                                }
                            }
                        >
                            <Text></Text>
                        </View>}

                    <View
                        style={{
                            marginTop: 10,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
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
                            style={{
                                color: Colors.silver,
                                fontSize: 18
                            }}

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
                            width:100,
                            justifyContent:'center'
                            ,alignSelf:'center',
                            transform:
                            [
                                {
                                    scale:animRef.current.interpolate
                                    (
                                        {
                                            inputRange:[0,1],
                                            outputRange:[1.5,1]
                                        
                                        }
                                    )
                                }
                            ]
                        }
                    }
                    >
                    <TouchableOpacity

                        onPress={() => unfollowFollow(p.params.channelID)}
                        style={
                            {
                                backgroundColor: "#002366",
                                padding: 10,
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 20

                            }
                        }
                    >
                        <Text
                            style={
                                {

                                    textAlign: 'center',
                                    color: Colors.White,
                                    width: 100,

                                }
                            }
                        >{
                                userDetails.isFollowing ? "Following" : "Follow"
                            }</Text>
                    </TouchableOpacity>
                    </Animated.View>
                </View>


            </ScrollView>
            <View
                style={{
                    height: '60%',
                    backgroundColor: Colors.black
                }}
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
                        ></RefreshControl>
                    }

                    scrollEnabled={true}
                    data={videos}
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

        },
    }
)
export default CreaterDetails