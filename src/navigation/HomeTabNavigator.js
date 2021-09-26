


import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import React, { Profiler } from "react"
import HomeTabs from "../screens/HomeTabs"



import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Home from '../screens/Home'

import Profile from '../screens/Profile/Profile'
const HomeTabNavigator=()=>
{

    const HomeTab=createBottomTabNavigator()
    return(
       <HomeTab.Navigator
       initialRouteName="Home"

      
       screenOptions={
           {
               headerShown:false,
               tabBarStyle:{
                   backgroundColor:'black',
                 
                   height:50
            
               }
           }
       }
       >
           <HomeTab.Screen
          

        
          options={
              {
                
              
                tabBarIcon:({size,focused,color})=>   
                  
                <FontAwesome5 size={size}  color={color} name="home">
     
                </FontAwesome5>
              }
          }

           name="Home"
           component={Home}
           >


           </HomeTab.Screen>
           <HomeTab.Screen
          

        
          options={
              {
                
              
                tabBarIcon:({size,focused,color})=>   
                  
                <FontAwesome5 size={size}  color={color} name="user">
     
                </FontAwesome5>
              }
          }

           name="Profile"
           component={Profile}
           >


           </HomeTab.Screen>

       </HomeTab.Navigator>
    )

}
export default HomeTabNavigator