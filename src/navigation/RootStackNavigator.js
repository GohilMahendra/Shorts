
import React from 'react'
import { StyleSheet, Text, View } from "react-native"

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


import Login from '../screens/auth/Login'
import SignUp from '../screens/auth/SignUp'
import Welcome from '../screens/Welcome '
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
                            headerShown:false
                        }
                    }
                    name="Login"
                    component={Login}

                />


                <RootStack.Screen

                    options={
                        {
                            headerShown:false
                        }
                    }
                    name="Welcome"
                    component={Welcome}

                />
                 <RootStack.Screen

options={
    {
        headerShown:false
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