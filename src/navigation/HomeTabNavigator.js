import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React, { Profiler, useContext, useEffect } from "react"


import {
    View, Alert, BackHandler, PermissionsAndroid
} from 'react-native'
import { colors } from "react-native-elements"
import LinearGradient from "react-native-linear-gradient"

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { themeContext } from "../../App"
import { Colors } from "../constants/colors"
import MakeVideo from "../screens/MakeVideo"
import HomeInnerStackNavigator from "./HomeInnerStackNavigator"
import ProfileInnerStackNavigator from "./ProfileInnerStackNavigator"
const HomeTabNavigator = ({ navigation }) => {

    const HomeTab = createBottomTabNavigator()

    const { theme } = useContext(themeContext)


    useEffect
        (
            () => {

                if (Platform.OS === 'android')
                    requestPermission()
            },
            []
        )

    const requestPermission = async () => {
        const granted = await requestStorgePermissiom()

        if (granted["android.permission.READ_EXTERNAL_STORAGE"] == 'granted'
            && granted["android.permission.WRITE_EXTERNAL_STORAGE"] == 'granted'
        ) {
            console.log("permissions granted")
        }
        else {


            Alert.alert("Permission denial ", "Please grant permission otherwise app would not work proper")
            // BackHandler.exitApp()
        }


    }

    const requestStorgePermissiom = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple
                (
                    [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]
                )

            return granted
        } catch (err) {
            console.log(err);
        }
    }



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
                                            height: focused ? 70 : 65,
                                            width: focused ? 70 : 65,
                                            borderRadius: 65,
                                            borderColor: "#fff",
                                            transform: [
                                                {
                                                    translateY: -15
                                                }
                                            ],
                                        }
                                    }
                                >
                                    <LinearGradient


                                        start={{ x: 0, y: 0 }}
                                        //   angle={5}
                                        end={{ x: 1, y: 1 }}
                                        style={
                                            {

                                                flex: 1,
                                                borderRadius: 65

                                            }
                                        }
                                        colors={[(focused) ? theme.gradient_color1 : theme.gradient_color2
                                            , (focused) ? theme.gradient_color2 : theme.gradient_color1

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
                            (

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

                            )
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