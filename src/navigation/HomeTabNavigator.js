import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React, { Profiler, useEffect } from "react"


import {
    View, Alert, BackHandler
} from 'react-native'
import { colors } from "react-native-elements"
import LinearGradient from "react-native-linear-gradient"

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
                            position: 'absolute',

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
                            tabBarIcon: ({ size, focused, color }) => (
                                <View
                                    style={
                                        {
                                            height:focused? 70:65,
                                            width: focused?70: 65,
                                            borderRadius: 65,
                                            borderColor:"#fff",
                                            transform: [
                                                {
                                                    translateY: -15
                                                }
                                            ],
                                        }
                                    }
                                >
                                    <LinearGradient
                                    

                                    start={{x:0,y:0}}
                                 //   angle={5}
                                    end={{x:1,y:1}}
                                        style={
                                            {
                                             
                                                flex:1,
                                                borderRadius: 65

                                            }
                                        }
                                        colors={[(focused) ?Colors.Teal : "violet"
                                            , (focused) ? "violet" : "blue"
                                          
                                        ]}
                                    >
                                        <FontAwesome5 size={size} color={"#fff"} name="video"
                                            style={
                                                {
                                                    // backgroundColor: (focused) ? 'transparent' : 'blue',
                                                    borderRadius: 65,
                                                    flex: 1,                                            // color:'#fff',
                                                    textAlignVertical: 'center',
                                                    textAlign: 'center',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: 5
                                                }
                                            }
                                        >

                                        </FontAwesome5>
                                    </LinearGradient>
                                </View>

                            ),
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