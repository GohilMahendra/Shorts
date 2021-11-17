

import React, { useEffect, useState } from 'react'

import { Image, RefreshControl, StyleSheet, Text, View } from 'react-native'

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { catchClause } from '@babel/types'

import {
    FlatList
} from 'react-native-gesture-handler'
import VideoPreviewCard from '../../components/VideoPreviewCard'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileDetails, getProfileVideos, logOut } from '../../redux/Actions/ProfileActions'
import RoundImage from '../../components/RoundImage'




import {

} from
    'react-native-elements'
import { Colors } from '../../constants/colors'
import InfoBox from '../../components/UserDetails/InfoBox'

const Profile = ({ navigation }) => {

    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.Profile.userProfile)



    const UserDetailsLoad = useSelector(state => state.Profile.UserDetailsLoad)
    const UserDetailsError = useSelector(state => state.Profile.UserDetailsError)

    console.log(userDetails)
    const [selected, setselected] = useState([])


    const videos = useSelector(
        state => state.Profile.UserVideos
    )

    //onsole.log(videos,'videos')
    const UserVideosLoad = useSelector(
        state => state.Profile.UserVideosLoad
    )


    const logout = async () => {
        dispatch(logOut())
        auth().signOut()
        navigation.navigate('Login')
    }



    const renderItem = ({ item, index }) => {

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


    const getVideosList = () => {
        dispatch(getProfileVideos())

    }

    useEffect
        (
            () => {

                dispatch(getProfileDetails())

                // getVideosList()
            },
            []
        )


    return (


        <View
            style={styles.Container}
        >
            <View
                style={styles.detailsContainer}

            >
                <ScrollView

                    refreshControl={
                        <RefreshControl

                            refreshing={UserDetailsLoad}
                            onRefresh={() => dispatch(getProfileDetails())}
                        ></RefreshControl>
                    }
                >

                    <RoundImage
                        imageURL={auth().currentUser.photoURL}
                    />

                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 20,
                            alignSelf: 'center'
                        }}
                    >
                        {auth().currentUser.displayName}
                    </Text>

                    <InfoBox
                        followers={userDetails.Followers}
                        following={userDetails.Following}
                        likes={userDetails.likes}
                    />

                    <View
                        style={styles.btnContainer
                        }
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Edit')}
                            style={styles.btnEditProfile}
                        >
                            <Text style={[styles.text, { color: 'black' }]}>EDIT PROFILE</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => logout()}
                            style={styles.btnLogout}
                        >
                            <Text style={[styles.text, { color: Colors.White }]}>
                                Log out
                            </Text>

                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

            <View
                style={styles.VideoContainer}
            >
                <FlatList
                    style={
                        {
                            margin: 10,

                        }
                    }


                    refreshControl={
                        <RefreshControl
                            refreshing={UserVideosLoad}
                            onRefresh={
                                () => getVideosList()
                            }

                        ></RefreshControl>
                    }

                    data={videos}

                    showsVerticalScrollIndicator={true}

                    // zoomScale={5}
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


            profileDetailsContainer:
            {
                alignItems: 'center',
                paddingHorizontal: 10,
                borderRightWidth: 0.7,
                borderLeftColor: '#fff',
                borderLeftWidth: 0.7,
                borderRightColor: "#fff"
            },
            text: {
                color: '#fff',
                fontSize: 18,


            },
            btnEditProfile:
            {
                alignSelf: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 10
            },
            btnContainer:

            {
                flexDirection: "row",
                justifyContent: 'space-evenly'
            },
            btnLogout:
            {
                alignSelf: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
                padding: 10,
                borderRadius: 10
            },
            VideoContainer:

            {
                height: '70%'
            },
            detailsContainer:
            {
                height: '40%',
                margin: 10,
                backgroundColor: 'transparent',

            },
            Container:
            {
                flex: 1
                ,
                backgroundColor: 'black'
            },
        }
    )
export default Profile