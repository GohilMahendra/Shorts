

import { useRoute } from "@react-navigation/core"
import React, { useContext, useEffect, useState } from "react"


import { View, Image, Text, StyleSheet, RefreshControl }
    from 'react-native'
import { ThemeContext } from "react-native-elements"
import { TextInput, TouchableOpacity, FlatList, ScrollView, createNativeWrapper } from "react-native-gesture-handler"
import LinearGradient from "react-native-linear-gradient"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"
import { useDispatch, useSelector } from "react-redux"
import { themeContext } from "../../../App"
import SongPlayer from "../../components/Songs/SongPlayer"

import VideoPreviewCard from '../../components/VideoPreviewCard'
import { Colors } from "../../constants/colors"
import { getSongDetails, getSongVideos } from "../../redux/Actions/SongActions"


const SongDetails = ({ navigation }) => {

    const p = useRoute()

    const data = p.params.data

    const {theme}=useContext(themeContext)
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
                        "SongVideoPlayer",
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
            style={styles.Container}
        >
            <View
                style={
                    styles.songDetailsContainer
                }
            >
                <LinearGradient
                start={{x:0,y:1}}
                end={{x:1,y:0}}
                style={styles.gradientContainer}
                colors={[theme.gradient_color1,theme.gradient_color2]}
                >

                    <View
                        style={
                            styles.songDetailsRowContainer
                        }
                    >
                        <SongPlayer
                            data={data}
                        />
                           
                        <View
                            style={styles.songNameContainer}
                        >
                            <FontAwesome5Icon
                            color="#fff"
                                name="music"
                                size={20}
                                style={styles.iconStyle}
                            />
                            <Text

                                style={
                                    styles.txtSongName
                                }

                            >
                                {data.SongName}
                            </Text>
                        </View>
                    </View>
                </LinearGradient>

            </View>

            <View
                style={styles.videosContainer}
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

const styles = StyleSheet.create
    (
        {
            Container:
            {
                flex: 1,
                backgroundColor: Colors.black
            },
            songDetailsContainer:
            {
                height: '30%',
                justifyContent: 'center',
                backgroundColor: Colors.Teal
            },
            songDetailsRowContainer:
            {
                flexDirection: 'row',
                height: 150,
                marginTop: 10,
                //justifyContent:'space-between',
                padding: 15
            },
            iconStyle:
            {
                marginHorizontal: 20,
                textAlignVertical: 'center'
            },
        
            gradientContainer:  
            {
                flex:1,
                justifyContent:'center'
            },
            videosContainer:
            {
                height: '70%',
                backgroundColor: Colors.black
            },
            songNameContainer:
            {
                flexDirection: "row",
                flexWrap:'wrap',
               
                alignItems: 'center',
              //  flexWrap:'wrap',
            },
            txtSongName:
            {
                fontSize: 25,
                color:"#fff",
                textAlignVertical: 'center'
            }

        }
    )
export default SongDetails