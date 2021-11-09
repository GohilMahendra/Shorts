

import { useRoute } from "@react-navigation/core"
import React, { useEffect, useState } from "react"


import { View, Image, Text, StyleSheet }
    from 'react-native'
import { TextInput, TouchableOpacity, FlatList } from "react-native-gesture-handler"
import { useDispatch } from "react-redux"
import RoundImage from "../components/RoundImage"
import InfoBox from "../components/UserDetails/InfoBox"




import VideoPreviewCard from '../components/VideoPreviewCard'

import { Colors } from "../constants/colors"
import firestore from '@react-native-firebase/firestore'

const userDetails = () => {

    const p = useRoute()

    console.log(p.params.channelID)



    const [videos, setvideos] = useState([])

    const [userDetails, setUserDetails] = useState(
        {
            Followers: 0,
            Following: 0,
            Likes: 0,
            photoURL: "",
            userID: "",
            userName: "",
            varified: false
        })

    const renderItem = ({ item, index }) => {
     
        console.log(item)
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




    const getuserVideos=async()=>
    {
        try
        {

            const userVideos=await firestore().collection(
                'Videos'
            )
            .where('channelID','==',p.params.channelID).get()


            let list=[]


            userVideos.docs.forEach
            (
                function(child)
                {
                    list.push({id:child.id,...child.data()})
                }
            )

        
            setvideos(list)
        }
        catch(err)
        {
            console.log(err)
        }
    }
    const getUserDetails = async () => {
        try {
            const userDetails = await firestore()
                .collection('Users')
                .doc(p.params.channelID)
                .get()

          
             setUserDetails(userDetails.data())
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(
        () => {

            getUserDetails(),
            getuserVideos()
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
                    height: "40%",
                    backgroundColor: Colors.black,
                    justifyContent: 'center'
                }}
            >


                <RoundImage
                    style={
                        {
                            alignSelf: 'center'
                        }
                    }

                    imageURL={userDetails.photoURL}
                ></RoundImage>

               
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
                        {userDetails.userName}
                    </Text>
                    <Text
                        style={{
                            backgroundColor: Colors.silver
                        }}

                    >
                        {userDetails.userID}
                    </Text>
                </View>

                <InfoBox
                    followers={userDetails.Followers}
                    following={userDetails.Following}
                    likes={userDetails.Likes}
                >

                </InfoBox>

                <TouchableOpacity
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
                    >Follow</Text>
                </TouchableOpacity>
            </View>


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
export default userDetails