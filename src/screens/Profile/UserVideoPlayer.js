import React, { useState, useEffect, useRef } from "react";
import {
    View, Text, FlatList, Dimensions
} from "react-native";
import { } from "react-native-gesture-handler"
import VideoPlayer from "../../components/VideoPlayer"
import {
    useDispatch, useSelector
} from "react-redux";
import { useRoute } from "@react-navigation/core";

const {
    height, width
} = Dimensions.get('window')

const UserVideoPlayer = ({ navigation }) => {

    const route = useRoute()
    const refsset = useRef({})

    const dispatch = useDispatch()


    const Videos = useSelector(
        state => state.Profile.UserVideos)

    const onViewRef = React.useRef(({ viewableItems, changed }) => {


        changed.forEach(item => {

            if (!item.isViewable) {
                refsset.current[item.item.id].pauseVideo(item.isViewable)
            }
        });
        viewableItems.forEach(item => {
            if (item.isViewable) {
                refsset.current[item.item.id].playVideo(item.isViewable)

            }
        });

    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })

    // const curruntVideo=useState(route.params.index)
    const renderItem = ({ item, index }) => {
        return (
            <VideoPlayer
                ref={ref => { refsset.current[item.id] = ref }}
                data={item}
            ></VideoPlayer>
        )
    }


    console.log(ref.current.ScrollToIndex())

    const ref=useRef()
    return (

        <View
            style={{
                flex: 1,
                backgroundColor: '#fff'
            }}
        >

            <FlatList

               ref={ref}
                style={{

                    flex: 1
                }}

                initialScrollIndex={route.params != undefined ? route.params.index : 0}
                data={Videos}
                viewabilityConfig={viewConfigRef.current}
                onViewableItemsChanged={onViewRef.current}
                keyExtractor={(item) => item.id}
                scrollEnabled={true}
                snapToInterval={height}
                maxToRenderPerBatch={5}
                renderItem={renderItem}

            >

            </FlatList>


        </View>
    )
}
export default UserVideoPlayer