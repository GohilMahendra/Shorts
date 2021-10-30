

import { useRoute } from "@react-navigation/core"
import React, { useEffect, useState } from "react"


import
 { View,Image,Text, StyleSheet }
 from 'react-native'
import { TextInput, TouchableOpacity } from "react-native-gesture-handler"
import { useDispatch } from "react-redux"
import RoundImage from "../components/RoundImage"
import InfoBox from "../components/UserDetails/InfoBox"


import { Colors } from "../constants/colors"
import firestore from '@react-native-firebase/firestore'
const userDetails=()=>
{

    const p=useRoute()

    console.log(p.params.channelID)



    const [userDetails,setUserDetails]=useState(
        {
        Followers:0,
        Following:0,
        Likes:0,
        photoUrl:"",
        userID:"",
        userName:"",
        varified:false
    })

    
    const getUserDetails=async()=>
    {
        try
        {
        const userDetails=await firestore()
        .collection('Users')
        .doc(p.params.channelID)
        .get()

        console.log(userDetails)
       // setUserDetails(userDetails.data())
        }
        catch(err)
        {
            console.log(err)
        }
    }

    useEffect(
        ()=>
        {

            getUserDetails()
        },[]
    )



    return(
        <View
        style={
            {
                flex:1
            }
        }
        >

            <View
            style={{
                height:"40%",
                backgroundColor:Colors.Teal,
                justifyContent:'center'
            }}
            >

            
              <RoundImage
              style={
                  {
                      alignSelf:'center'
                  }
              }
              ></RoundImage>
              <View
              style={{
                  margin:10,
                  alignItems:"center",
                  justifyContent:"center"
              }}
              >
                  <Text
                  style={{
                      backgroundColor:Colors.silver
                  }}

                  >
                      {userDetails.userName}
                  </Text>
                  <Text
                  style={{
                      backgroundColor:Colors.silver
                  }}

                  >
                      {userDetails.userID}
                  </Text>
              </View>
           
              <InfoBox
              followers={userDetails.Followers}
              following={userDetails.Following}
              likes={userDetails.Likes}
              >

              </InfoBox>

              <TouchableOpacity
              style={
                  {
                      backgroundColor:"#002366",
                      padding:10,
                      width:100,
                      alignSelf:'center',
                      justifyContent:'center',
                      alignItems:'center',
                      borderRadius:20
                      
                  }
              }
              >
                  <Text
                  style={
                      {
                        
                        textAlign:'center',
                        color:Colors.White,
                          width:100,

                      }
                  }
                  >Follow</Text>
              </TouchableOpacity>
            </View>


            <View
            style={{
                height:'60%',
                backgroundColor:Colors.black
            }}
            >

            </View>

        </View>
    )
}
export default userDetails