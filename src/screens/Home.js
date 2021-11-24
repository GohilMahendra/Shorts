import React, { useEffect, useImperativeHandle, useRef, useState } from "react"

import {
    Dimensions,
    RefreshControl,
    RefreshControlBase,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

import { FlatList } from "react-native-gesture-handler"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"

import { useDispatch, useSelector } from "react-redux"
import VideoPlayer from "../components/VideoPlayer"
import { Colors } from "../constants/colors"
import { Fonts } from "../constants/Fonts"
import { getMoreCreaterVideos } from "../redux/Actions/CreaterActions"

import {
    getHomeFeedVideos,
    getMoreFeedVideos
}
    from "../redux/Actions/HomeActions"


const { height, width } = Dimensions.get('window')

const Home = ({ navigation }) => {


    const dispatch = useDispatch()
    const Videos = useSelector(state => state.Home.HomeVideos)

    const HomeVideosLoad=useSelector(state => state.Home.HomeVideosLoad)


    const [watchFollowing, setWatchFollowing] = useState(false)


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


    const fetchVideos=()=>
    {
        dispatch(getHomeFeedVideos(watchFollowing))
    }

    const fetchMoreVideos = () => {

        dispatch(getMoreFeedVideos(watchFollowing))
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



    const onChangeInFollow=(makeWatch)=>
    {

        if(!makeWatch)
        {
            if(watchFollowing)
            setWatchFollowing(false)
        }
        else
        {
            if(!watchFollowing)
            setWatchFollowing(true)
        }



    }



    useEffect
        (
            () => {
               fetchMoreVideos()

            },
            []
        )

    return (

        <View
            style={styles.Container}
        >

            <View
                style={styles.searchIconConatiner}
            >

                <TouchableOpacity
                    onPress={
                        () => navigation.navigate('Search')
                    }
                    style={
                        {

                        }
                    }
                >

                    <FontAwesome5Icon
                        name="search"
                        color={Colors.White}
                        style={{alignSelf:"center"}}
                        size={20}
                    ></FontAwesome5Icon>
                </TouchableOpacity>

            </View>
            <View
                style={styles.followContainer}
            >
                <TouchableOpacity
                    onPress={() => onChangeInFollow(true)}
                >
                    <Text
                        style={
                            {
                                color: (watchFollowing) ? Colors.White : Colors.grey,
                                fontSize: 20,
                                fontFamily: Fonts.SpaceMono_Regular
                            }
                        }
                    >Following</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => onChangeInFollow(false)}
                    style={{

                    }}
                >
                    <Text
                        style={{
                            color: (!watchFollowing) ? Colors.White : Colors.grey,
                            fontSize: 20,
                            fontFamily: Fonts.SpaceMono_Regular
                        }}
                    >For You</Text>
                </TouchableOpacity>

            </View>

            <FlatList
                ref={listRef}
                style={{ flex: 1 }}


                refreshControl={
                    <RefreshControl
                    enabled={true}
                    refreshing={HomeVideosLoad}
                    onRefresh={()=>fetchVideos()}
                    ></RefreshControl>
                }


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

const styles = StyleSheet.create
    (
        {
            Container:
            {
                flex: 1,
                backgroundColor: 'black'
            },
            searchIconConatiner:
            {
                height: 50,
                width: 50,
                alignSelf: "flex-end",
                flexDirection: 'row',
                position: "absolute",
                alignItems: 'center',
                justifyContent: 'space-between',
                top: 5,

                zIndex: 2,
                marginHorizontal: 20
            },
            followContainer:
            {
                position: 'absolute',
                zIndex: 3,
                height: 50,
                top: 5,
                flexDirection: 'row',
                width: "80%",
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'space-evenly',

            }


        }
    )
export default Home