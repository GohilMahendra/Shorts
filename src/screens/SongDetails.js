

import { useRoute } from "@react-navigation/core"
import React, { useEffect, useState } from "react"


import { View, Image, Text, StyleSheet, RefreshControl }
    from 'react-native'
import { TextInput, TouchableOpacity, FlatList, ScrollView, createNativeWrapper } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"
import { useDispatch, useSelector } from "react-redux"
import SongPlayer from "../components/Songs/SongPlayer"

import VideoPreviewCard from '../components/VideoPreviewCard'
import { Colors } from "../constants/colors"
import { getSongDetails, getSongVideos } from "../redux/Actions/SongActions"


const SongDetails = ({ navigation }) => {

    const p = useRoute()

    const data = p.params.data
    console.log(p)

    const dispatch = useDispatch()

    const videos = useSelector(state => state.Songs.songVideos)

    const SongDetails = useSelector(state => state.Songs.SongDetails)

    const songVideosLoad = useSelector(state => state.Songs.songVideosLoad)


    const renderItem = ({ item, index }) => {

        //  console.log(item)
        return (
            <TouchableOpacity
                onPress={
                    () => navigation.navigate(
                        "UserVideoPlayer",
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



    const onRefreash = () => {

        dispatch(getSongDetails(p.params.songID))
        dispatch(getSongVideos(p.params.songID))
    }
    useEffect(
        () => {


            dispatch(getSongDetails(p.params.songID))
            dispatch(getSongVideos(p.params.songID))
        },
        []
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
            <View
                style={
                    {
                        height: '30%',
                        justifyContent: 'center',
                        backgroundColor: Colors.Teal
                    }
                }
            >
              
                <View
                    style={
                        {
                            flexDirection: 'row',
                            height: 150,
                            marginTop: 10,
                            //justifyContent:'space-between',
                            padding: 15
                        }
                    }
                >
                    <Image
                        source={
                            {
                                uri: data.SongCover
                            }
                        }
                        style={
                            {
                                height: 100,
                                width: 100,
                                borderRadius: 15
                            }
                        }
                        resizeMode={"cover"}
                    ></Image>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        <FontAwesome5Icon
                            name="music"
                            size={20}
                            style={
                                {
                                    marginHorizontal: 20,
                                    textAlignVertical: 'center'
                                }
                            }
                        />
                        <Text

                            style={
                                {
                                    fontSize: 25,
                                    textAlignVertical: 'center'
                                }
                            }

                        >
                            {data.SongName}
                        </Text>
                    </View>
                </View>
              </View>

            <View
                style={{
                    height: '70%',
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
                            onRefresh={onRefreash}
                            refreshing={songVideosLoad}

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
export default SongDetails