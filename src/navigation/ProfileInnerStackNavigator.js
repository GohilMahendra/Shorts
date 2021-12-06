
import React from 'react'
import { StyleSheet, Text, View } from "react-native"

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


import Profile from '../screens/Profile/Profile'
import EditProfile from '../screens/Profile/EditProfile'
import UserVideoPlayer from '../screens/Profile/UserVideoPlayer'
import SongVideoPlayer from '../screens/Song/SongVideoPlayer'
import SongDetails from '../screens/Song/SongDetails'
import CreaterVideoPlayer from '../screens/Creater/CreaterVideoPlayer'
import TagsVideoPlayer from '../screens/Tags/TagsVideoPlayer'
import CreaterDetails from '../screens/Creater/CreaterDetails'
import Tags from '../screens/Tags/Tags'

const ProfileInnerStackNavigator = () => {

    const HomeStack = createStackNavigator()

    return (

        <HomeStack.Navigator


            initialRouteName="Profile"

        >

            <HomeStack.Screen
                name="Profile"
                options={
                    {
                        headerShown: false
                    }
                }
                component={Profile}
            ></HomeStack.Screen>
            <HomeStack.Screen
                name="Edit"
                options={
                    {
                        headerShown: false
                    }
                }
                component={EditProfile}
            ></HomeStack.Screen>

            <HomeStack.Screen
                name="UserVideoPlayer"
                options={
                    {
                        headerShown: false
                    }
                }
                component={UserVideoPlayer}
            ></HomeStack.Screen>

            <HomeStack.Screen
                name="CreaterDetails"
                options={
                    {
                        headerShown: false
                    }
                }
                component={CreaterDetails}
            ></HomeStack.Screen>


            <HomeStack.Screen
                name="Tags"
                options={
                    {
                        headerShown: false
                    }
                }
                component={Tags}
            ></HomeStack.Screen>
            <HomeStack.Screen
                name="TagsVideoPlayer"
                options={
                    {

                        headerTransparent: true,
                        headerTitle: "",
                        headerTintColor: "#fff"


                    }
                }
                component={TagsVideoPlayer}
            ></HomeStack.Screen>


            <HomeStack.Screen
                name="CreaterVideoPlayer"
                options={
                    {
                        headerShown: false,

                    }
                }
                component={CreaterVideoPlayer}


            ></HomeStack.Screen>


            <HomeStack.Screen
                name="Songs"
                options={
                    ({ route }) => ({
                        title: route.params.name,


                        headerStyle:
                        {
                            backgroundColor: 'black',



                        },
                        headerTitleStyle:
                        {
                            color: '#fff'
                        },
                        headerTintColor: '#fff',
                        headerTitleAlign: "center"
                    })
                }
                component={SongDetails}
            ></HomeStack.Screen>
            <HomeStack.Screen

                name={"SongVideoPlayer"}
                component={SongVideoPlayer}
            ></HomeStack.Screen>





        </HomeStack.Navigator>
    )


}

const styles = StyleSheet.create
    (
        {
            Container:
            {
                flex: 1
            }

        }
    )
export default ProfileInnerStackNavigator