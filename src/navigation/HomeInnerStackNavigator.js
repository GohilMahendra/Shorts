
import React from 'react'
import { StyleSheet, Text, View } from "react-native"

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import userDetails from '../screens/userDetails'



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
                    headerShown:false
                }
            }
            component={Home}
            ></HomeStack.Screen>

            <HomeStack.Screen
            name="userDetails"
            options={
                {
                    headerShown:false
                }
            }
            component={userDetails}
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