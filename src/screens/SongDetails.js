

import { useRoute } from "@react-navigation/core"
import React, { useEffect, useState } from "react"


import { View, Image, Text, StyleSheet }
    from 'react-native'
import { TextInput, TouchableOpacity, FlatList, ScrollView, createNativeWrapper } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import SongPlayer from "../components/Songs/SongPlayer"

import VideoPreviewCard from '../components/VideoPreviewCard'
import { Colors } from "../constants/colors"
import { getSongDetails, getSongVideos } from "../redux/Actions/SongActions"

const SongDetails = ({ navigation }) => {

    const p = useRoute()

    console.log(p)

    const dispatch = useDispatch()


    
    const videos = useSelector(state => state.Songs.songVideos)


    console.log(videos,"videso")
    const SongDetails = useSelector(state => state.Songs.SongDetails)

    const CreaterVideosLoad = useSelector(state => state.Songs.songVideosLoad)


    
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


            <ScrollView
            style={
                {
                    flex:1,
                    backgroundColor:"blue"
                }
            }
            >
              <SongPlayer>

              </SongPlayer>

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