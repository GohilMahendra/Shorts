
import React from 'react'
import { StyleSheet, Text, View } from "react-native"

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


import Login from '../screens/auth/Login'
import SignUp from '../screens/auth/SignUp'

import comments from '../screens/Comments'
import Comments from '../screens/Comments'
import HomeTabs from '../screens/HomeTabs'
const RootStackNavigator = () => {

    const RootStack = createStackNavigator()

    return (

        <NavigationContainer>
            <RootStack.Navigator


                initialRouteName="Login"
            >
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

                <RootStack.Screen

                    options={
                        {
                            headerShown: false
                        }
                    }
                    name="SignUp"
                    component={SignUp}

                />

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