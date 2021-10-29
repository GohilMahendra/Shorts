
import React from 'react'
import { StyleSheet, Text, View } from "react-native"

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


import Profile from '../screens/Profile/Profile'

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
                    headerShown:false
                }
            }
            component={Profile}
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