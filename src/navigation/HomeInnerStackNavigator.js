
import React from 'react'
import { StyleSheet, Text, View } from "react-native"

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import userDetails from '../screens/userDetails'
import TagList from '../screens/TagList'
import Tags from '../screens/Tags/Tags'
import UserVideoPlayer from '../screens/Profile/UserVideoPlayer'
import TagsVideoPlayer from '../screens/Tags/TagsVideoPlayer'
import SongDetails from '../screens/SongDetails'
import { Title } from 'react-native-paper'
import { Colors } from 'react-native/Libraries/NewAppScreen'



const HomeInnerStackNavigator = () => {

    const HomeStack = createStackNavigator()

    return (

        <HomeStack.Navigator


            initialRouteName="HomeScreen"
        >

            <HomeStack.Screen
                name="HomeScreen"
                options={
                    {
                        headerShown: false
                    }
                }
                component={Home}
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
                name="userDetails"
                options={
                    {
                        headerShown: false
                    }
                }
                component={userDetails}
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
                        headerShown: false,
                        
                    }
                }
                component={TagsVideoPlayer}
            ></HomeStack.Screen>
            
            <HomeStack.Screen
                name="Songs"
                options={
                    ({ route }) => ({ title: route.params.name,
                       
                        
                        headerStyle:
                        {
                            backgroundColor:'black',
                            


                        },
                        headerTitleStyle:
                        {
                            color:'#fff'
                        },
                       headerTintColor:'#fff',
                        headerTitleAlign:"center" })
                }
                component={SongDetails}
            ></HomeStack.Screen>
             {/* <HomeStack.Screen
                name="SongsVideoPlayer"
                options={
                    {
                        headerShown: false
                    }
                }
                component={Songs}
            ></HomeStack.Screen> */}




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