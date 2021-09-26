
import React from 'react'
import { StyleSheet, Text, View } from "react-native"

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'



const HomeInnerStackNavigator = () => {

    const HomeStack = createStackNavigator()

    return (

        <NavigationContainer>
            <HomeStack.Navigator
              

                initialRouteName="Home"
            >
           
            </HomeStack.Navigator>

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
export default HomeInnerStackNavigator