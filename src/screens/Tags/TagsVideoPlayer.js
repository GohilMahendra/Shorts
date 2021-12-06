


import React, { useState, useEffect } from "react";

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

const TagsVideoPlayer = ({ navigation }) => {

    const route = useRoute()

    const dispatch = useDispatch()

    const refsset = useRef({})

    const Videos = useSelector(
        state => state.Tags.TagVideos
    )



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




    const renderItem = ({ item, index }) => {

        return (
            <View
                style={
                    {
                        height: '100%',
                        width: '100%'
                    }
                }
            >
                <VideoPlayer

                    ref={ref => { refsset.current[item.id] = ref }}
                    data={item}
                >

                </VideoPlayer>

            </View>
        )
    }

    return (

        <View
            style={{
                flex: 1,
                backgroundColor: 'black'
            }}
        >

            <FlatList

                style={{

                    flex: 1
                }}
                viewabilityConfig={viewConfigRef.current}

                onViewableItemsChanged={onViewRef.current}
                initialScrollIndex={(route.params != undefined) ? route.params.index : 0}
                data={Videos}
                keyExtractor={(item) => item.id}

                snapToInterval={height}

                //snapToInterval={curruntVideo}
                renderItem={renderItem}

            >

            </FlatList>


        </View>
    )
}
export default TagsVideoPlayer