


import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import React, { Profiler, useEffect } from "react"


import {
    Alert,BackHandler
} from 'react-native'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { Colors } from "../constants/colors"
import MakeVideo from "../screens/MakeVideo"
import HomeInnerStackNavigator from "./HomeInnerStackNavigator"
import ProfileInnerStackNavigator from "./ProfileInnerStackNavigator"
import SearchInnerStackNavigator from "./SearchInnerStackNavigator"
const HomeTabNavigator=()=>
{


    
    const HomeTab=createBottomTabNavigator()
    return(
       <HomeTab.Navigator
       initialRouteName="Profile"
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
           component={HomeInnerStackNavigator}
           >


           </HomeTab.Screen>
           <HomeTab.Screen
          

        
          options={
              {
                
              
                tabBarIcon:({size,focused,color})=>   
                  
                <FontAwesome5 size={size}  color={color} name="search">
     
                </FontAwesome5>
              }
          }

           name="Search"
           component={SearchInnerStackNavigator}
           >


           </HomeTab.Screen>
           <HomeTab.Screen
          

        
          options={
              {
                
              
                tabBarIcon:({size,focused,color})=>   
                  
                <FontAwesome5 size={size}  color={color} name="plus"
               
                
                style={
                    {
                        backgroundColor:(focused)?Colors.vintage:Colors.midNightBlue,
                        borderRadius:30,
                        width:50,
                        height:50,
                       // color:'#fff',
                        textAlignVertical:'center',
                        textAlign:'center',
                        alignItems:'center',
                        justifyContent:'center',
                       transform:[
                       {
                        translateY:-10
                       }
                       ],
                        bottom:15,
                        padding:5
                    }
                }
                >
     
                </FontAwesome5>,
                title:""
              }
          }

           name="MakeVideo"
           
           component={MakeVideo}
           >


           </HomeTab.Screen>
 
           <HomeTab.Screen
          

        
          options={
              {
                
                tabBarIcon:({size,focused,color})=>   
                  
                <FontAwesome5 size={size}  color={color} name="user">
     
                </FontAwesome5>

                ,
             title:"Profile"

              }
          }

           name="ProfileTab"
        
           component={ProfileInnerStackNavigator}
           >


           </HomeTab.Screen>

       </HomeTab.Navigator>
    )

}
export default HomeTabNavigator