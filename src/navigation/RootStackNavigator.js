
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from "react-native"

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


import Login from '../screens/auth/Login'
import SignUp from '../screens/auth/SignUp'
import Auth from "@react-native-firebase/auth"
import Comments from '../screens/Comments'
import HomeTabs from '../screens/HomeTabs'
const RootStackNavigator = () => {

    const RootStack = createStackNavigator()

    const [isauthorised, setisauthorised] = useState(false)

    useEffect
        (

            () => {
                const subscription = Auth().onAuthStateChanged(
                    user => {
                        if (user) {
                            setisauthorised(true)
                        }
                        else {
                            setisauthorised(false)
                        }
                    }
                )

                return () => {subscription()}
            }


            , []

        )

    return (

        <NavigationContainer>
            <RootStack.Navigator


                initialRouteName={(!isauthorised) ? "Login" : "HomeTabs"}
            >
                {
                    (!isauthorised)?
                (
                    <>
                <RootStack.Screen

                    options={
                        {
                            headerShown: false
                        }
                    }
                    name="Login"
                    component={Login}

                />

                <RootStack.Screen

                    options={
                        {
                            headerShown: false
                        }
                    }
                    name="SignUp"
                    component={SignUp}

                />
                    </>):
                    (
                        <>

                        <RootStack.Screen

                    options={
                        {
                            headerShown: false
                        }
                    }
                    name="HomeTabs"
                    component={HomeTabs}

                />


                <RootStack.Screen

                    options=
                    
                    {
                        {
                           headerShown: true,
                           headerTintColor:'#fff',
                           headerTitleAlign:"center",
                            headerStyle:
                            {
                                backgroundColor:'black',

                                
                            }
                        }
                    }
                    name="Comments"
                    component={Comments}

                />
                </>
                    )

                }
            </RootStack.Navigator>
                

        </NavigationContainer>
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
export default RootStackNavigator