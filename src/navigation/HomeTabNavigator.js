


import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import React, { Profiler } from "react"
import HomeTabs from "../screens/HomeTabs"



import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MakeVideo from "../screens/MakeVideo"
import Search from "../screens/Search/Search"
import HomeInnerStackNavigator from "./HomeInnerStackNavigator"
import ProfileInnerStackNavigator from "./ProfileInnerStackNavigator"
const HomeTabNavigator=()=>
{

    const HomeTab=createBottomTabNavigator()
    return(
       <HomeTab.Navigator
       initialRouteName="makeVideo"

      
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
           component={Search}
           >


           </HomeTab.Screen>
           <HomeTab.Screen
          

        
          options={
              {
                
              
                tabBarIcon:({size,focused,color})=>   
                  
                <FontAwesome5 size={size}  color={color} name="plus"
                style={
                    {
                        backgroundColor:'red',
                        borderRadius:20,
                        padding:5
                    }
                }
                >
     
                </FontAwesome5>
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