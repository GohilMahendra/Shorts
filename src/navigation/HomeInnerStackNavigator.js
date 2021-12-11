
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'

import Tags from '../screens/Tags/Tags'
import UserVideoPlayer from '../screens/Profile/UserVideoPlayer'
import TagsVideoPlayer from '../screens/Tags/TagsVideoPlayer'
import SongDetails from '../screens/Song/SongDetails'
import CreaterVideoPlayer from '../screens/Creater/CreaterVideoPlayer'
import CreaterDetails from '../screens/Creater/CreaterDetails'
import Search from '../screens/Search/Search'
import SongVideoPlayer from '../screens/Song/SongVideoPlayer'



const HomeInnerStackNavigator = () => {

    const HomeStack = createStackNavigator()

    const navigation = useNavigation()
    return (

        <HomeStack.Navigator
            initialRouteName="HomeScreen"
        >


            <HomeStack.Screen
                name="HomeScreen"
                options={
                    {
                        headerShown: true,
                        headerTransparent: true,
                        headerTitle: "",
                        headerLeft: null,

                    }
                }
                component={Home}
            ></HomeStack.Screen>

            <HomeStack.Screen
                options={
                    {
                        headerTransparent:true,
                        title:''
                    }
                }
              
                name="Search"
                component={Search}
            />


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
                    
                        headerTransparent:true,
                        headerTitle:"",
                        headerTintColor:"#fff"

                    
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
export default HomeInnerStackNavigator