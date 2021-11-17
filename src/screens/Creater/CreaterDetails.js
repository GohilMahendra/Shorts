

import { useRoute } from "@react-navigation/core"
import React, { useEffect, useState } from "react"


import { View, Image, Text, StyleSheet }
    from 'react-native'
import { TextInput, TouchableOpacity, FlatList, ScrollView } from "react-native-gesture-handler"
import { useDispatch, useSelector } from "react-redux"
import RoundImage from "../../components/RoundImage"
import InfoBox from "../../components/UserDetails/InfoBox"
import VideoPreviewCard from '../../components/VideoPreviewCard'
import { Colors } from "../../constants/colors"
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { getCreaterDetails, getCreaterVideos } from "../../redux/Actions/CreaterActions"

const CreaterDetails = ({ navigation }) => {

    const p = useRoute()

    const dispatch = useDispatch()


    const [following,setfollowing]=useState(false)

    const videos = useSelector(state => state.Creater.CreaterVideos)

    const userDetails = useSelector(state => state.Creater.CreaterProfile)

    console.log(userDetails)
    const CreaterVideosLoad = useSelector(state => state.Creater.CreaterVideosLoad)


    const followCreater=()=>
    {
     
    }


    const getFOllowing=async()=>
    {
        const isExist=await firestore().collection('Following').
        doc(auth().currentUser.uid)
        .collection('LookUps')
        .doc(p.params.channelID)
        .get()


      
        setfollowing(isExist.exists)

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


            getFOllowing()

            dispatch(getCreaterDetails(p.params.channelID))
            dispatch(getCreaterVideos(p.params.channelID))
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
                    flex:1
                }
            }
            >
                <View
                    style={{
                       
                        backgroundColor: Colors.black,
                        margin:10,
                        
                        justifyContent: 'center'
                    }}
                >

                    <Image
                    source={
                        {
                            uri:userDetails.photoURL
                        }
                    }

                    style={
                        {
                            height:100,
                            width:100,
                            alignSelf:'center',
                            borderRadius:100
                        }
                    }
                    />

                    <View
                        style={{
                            margin: 10,
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Text
                            style={{
                                backgroundColor: Colors.silver
                            }}

                        >


                            {userDetails.CreaterName}
                        </Text>
                        <Text
                            style={{
                                backgroundColor: Colors.silver
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

                    <TouchableOpacity
                        
                        onPress={()=>setfollowing(!following)}
                        style={
                            {
                                backgroundColor: "#002366",
                                padding: 10,
                                width: 100,
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
                            following?"Following":"Follow"
                        }</Text>
                    </TouchableOpacity>
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
export default CreaterDetails