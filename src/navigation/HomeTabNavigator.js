import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React, { Profiler, useEffect } from "react"


import {
    View, Alert, BackHandler
} from 'react-native'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Colors } from "../constants/colors"
import MakeVideo from "../screens/MakeVideo"
import HomeInnerStackNavigator from "./HomeInnerStackNavigator"
import ProfileInnerStackNavigator from "./ProfileInnerStackNavigator"
const HomeTabNavigator = () => {

    const HomeTab = createBottomTabNavigator()
    return (
        <View
            style={{ flex: 1, backgroundColor: 'black' }}
        >
            <HomeTab.Navigator
                initialRouteName="Home"
                screenOptions={
                    {
                        headerShown: false,

                        tabBarHideOnKeyboard: true,
                
                        tabBarStyle: {
                            backgroundColor: 'transparent',
                            position:'absolute',

                            height: 50,
                            paddingHorizontal: 20,


                        }
                    }
                }
            >
                <HomeTab.Screen
                    options={
                        {

                            tabBarIcon: ({ size, focused, color }) =>

                                <FontAwesome5
                                    style={
                                        {
                                            textShadowRadius: (focused) ? 25 : 0
                                            ,
                                            textShadowOffset: {
                                                height: 2,
                                                width: 0,
                                            },
                                            textShadowColor: '#fff'
                                        }
                                    }
                                    size={size} color={focused ? "#fff" : 'grey'} name="home">

                                </FontAwesome5>,

                            title: ''
                        }
                    }

                    name="Home"
                    component={HomeInnerStackNavigator}
                >


                </HomeTab.Screen>
                <HomeTab.Screen

                    options={
                        {
                            tabBarIcon: ({ size, focused, color }) =>


                                <FontAwesome5 size={size} color={"#fff"} name="plus"
                                    style={
                                        {
                                            backgroundColor: (focused) ? Colors.Teal : Colors.baige,
                                            borderRadius: 30,
                                            width: 50,
                                            borderWidth: 2,
                                            borderTopColor: "green",
                                            borderBottomColor: 'skyblue',
                                            height: 50,
                                            // color:'#fff',
                                            textAlignVertical: 'center',
                                            textAlign: 'center',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            transform: [
                                                {
                                                    translateY: -25
                                                }
                                            ],
                                            //   bottom: 15,
                                            padding: 5
                                        }
                                    }
                                >

                                </FontAwesome5>,
                            title: ""
                        }
                    }
                    name="MakeVideo"
                    component={MakeVideo}
                >
                </HomeTab.Screen>

                <HomeTab.Screen
                    options={
                        {
                            tabBarIcon: ({ size, focused, color }) =>
                                <FontAwesome5
                                    style={
                                        {
                                            textShadowColor: '#fff',
                                            textShadowOffset: {
                                                height: 5,
                                                width: 0
                                            },

                                            textShadowRadius: (focused) ? 25 : 0

                                        }
                                    }


                                    size={size}
                                    solid={true}
                                    color={(focused) ? "#fff" : "grey"} name="user">
                                </FontAwesome5>
                            ,
                            title: ""

                        }
                    }
                    name="ProfileTab"
                    component={ProfileInnerStackNavigator}
                >

                </HomeTab.Screen>
            </HomeTab.Navigator>
        </View>
    )

}
export default HomeTabNavigator