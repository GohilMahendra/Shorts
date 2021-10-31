
import React from 'react'
import { StyleSheet, Text, View } from "react-native"

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../screens/Home'
import userDetails from '../screens/userDetails'
import TagList from '../screens/TagList'



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

            
<HomeStack.Screen
            name="TagList"
            options={
                {
                    headerShown:false
                }
            }
            component={TagList}
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