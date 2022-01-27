

import { useNavigation, useRoute } from "@react-navigation/core"
import React, { useEffect, useState } from "react"


import { View, Image, Text, StyleSheet, RefreshControl }
    from 'react-native'
import { TextInput, TouchableOpacity, FlatList } from "react-native-gesture-handler"



import VideoPreviewCard from '../VideoPreviewCard'

import { Colors } from "../../constants/colors"
import firestore from '@react-native-firebase/firestore'
import { useDispatch, useSelector } from "react-redux"
import { getMoreTagVideos, getTagVideos } from "../../redux/Actions/TagActions"

const TagList = ({tags}) => {



    const dispatch=useDispatch()

    const navigation=useNavigation()
    const videos=useSelector(state=>state.Tags.TagVideos)

    const load=useSelector(state=>state.Tags.TagVideosLoad)

    const error=useSelector(state=>state.Tags.TagVideosLoadError)
    
  

    const renderItem = ({ item, index }) => {
     
        console.log(item)
        return (
            <TouchableOpacity

                onPress={
                    () => navigation.navigate(
                        "TagsVideoPlayer",
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




   const fetchMoreTagVideos=()=>
   {
       
    getMoreTagVideos(tags)
   }

   const fetchTagVideos=()=>
   {
    dispatch(getTagVideos(tags))
   }
    useEffect(
        () => {

            fetchTagVideos()
          
          
        }, []
    )



    return (
        <View
            style={
                {
                    flex: 1
                }
            }
        >

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
                        refreshing={load}
                        onRefresh={()=>fetchTagVideos()}
                        ></RefreshControl>
                    }

                    onEndReached={
                        ()=>fetchMoreTagVideos()
                    }
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
export default TagList