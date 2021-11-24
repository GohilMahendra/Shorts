import React, { useEffect, useImperativeHandle, useRef, useState } from "react"

import {
    Dimensions,
    RefreshControlBase,
    TouchableOpacity,
    View,
} from 'react-native'

import { FlatList } from "react-native-gesture-handler"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"
import { Header } from "react-native/Libraries/NewAppScreen"

import { useDispatch, useSelector } from "react-redux"
import VideoPlayer from "../components/VideoPlayer"

import {
    getHomeFeedVideos,
    getMoreFeedVideos
}
    from "../redux/Actions/HomeActions"


const { height, width } = Dimensions.get('window')

const Home = ({navigation}) => {


    const dispatch = useDispatch()
    const Videos = useSelector(state => state.Home.HomeVideos)



    const refs = useRef({})
    const listRef = useRef()

    const renderItem = ({ item, index }) => {


        return (
            <VideoPlayer
                ref={ref => { refs.current[item.id] = ref }}
                data={item}
            ></VideoPlayer>
        )
    }


    const fetchMoreVideos = () => {

        dispatch(getMoreFeedVideos())
    }

    const onViewRef = React.useRef(({ viewableItems, changed }) => {

        changed.forEach(item => {

            //  console.log(item)
            if (!item.isViewable) {
                refs.current[item.item.id].pauseVideo(item.isViewable)
            }
        });
        viewableItems.forEach(item => {
            if (item.isViewable) {
                refs.current[item.item.id].playVideo(item.isViewable)

            }
        });
        // Use viewable items in state or as intended
    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 100 })

    useEffect
        (
            () => {
                dispatch(getHomeFeedVideos())

            },
            []
        )

    return (

        <View
            style={{
                flex: 1,
                backgroundColor: 'black'
            }}
        >

            
          
            <View
            style={
                {
                    height:50,
                    width:50,
                    alignSelf:"flex-end",
                    flexDirection:'row',
                    position:"absolute",
                    alignItems:'center',
                    justifyContent:'space-between',
                    top:0,
                    
                    zIndex:2,
                    marginHorizontal:20
                }
            }
            >
                
                <TouchableOpacity
                onPress={
                    ()=>navigation.navigate('Search')
                }
                >

                <FontAwesome5Icon
                name="search"
                color={"#fff"}
               // style={{alignSelf:"flex-end"}}
                size={25}
                ></FontAwesome5Icon>
                </TouchableOpacity>

            </View>
          
            <FlatList
                ref={listRef}
                style={{ flex: 1 }}

                maxToRenderPerBatch={5}
                data={Videos}

                viewabilityConfig={viewConfigRef.current}

                onViewableItemsChanged={onViewRef.current}

                keyExtractor={(item) => item.id}
                snapToInterval={height}


                onEndReached={
                    () => fetchMoreVideos()
                }
                renderItem={renderItem}

            >

            </FlatList>
        </View>
    )

}

export default Home