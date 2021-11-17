



import React, { useEffect, useState,useRef } from "react";


import auth from '@react-native-firebase/auth'
import {View ,Animated,Text, TouchableOpacity, Dimensions, StyleSheet} from 'react-native'


import firestore from '@react-native-firebase/firestore'
import { Easing, tan } from "react-native-reanimated";
import { combineReducers } from "redux";
import { useNavigation } from "@react-navigation/core";
import RoundImage from "./RoundImage";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import SongInfoBox from "./SongInfoBox";
const {height,width}=Dimensions.get('screen')
const VideoDetails=(props)=>
{

    const {data,channel}=props

    const navigation=useNavigation()
  

    return(
        <View
        style={styles.Container}
        >


            <Text
            style={
              styles.txtchannelID
            }
           
            >{channel.userID}</Text>

            <Text
            style={
               styles.txtTitle
            }
            >{data.Title}</Text>
             
            <View
            style={
                {
                    flexDirection:'row',
                    
                }
            }
            >

            <Text
              style={
                {
                    color:"#fff",
                    fontSize:20,
                    marginRight:20
                }
            }
            >{data.channelName}</Text>
       
            </View>
        
            <View
           style={{
               flexDirection:"row"
           }}

            >
               {
                   data.Tags.map(tag => {
                    // console.log(tag)
                    return(
                    <TouchableOpacity
                    onPress={
                        ()=>navigation.push(
                            "Tags",
                            {
                                Tags:tag
                            }
                        )
                    }

                    key={tag}
                    >
                    <Text

                
                    numberOfLines={2}
                    style={
                      styles.txtTag
                    }
                    >{tag}</Text>
                    </TouchableOpacity>
                    )
                   })
               }
            </View>
            <SongInfoBox
            data={data}
            ></SongInfoBox>
       
        </View>
    )
}
const styles=StyleSheet.create
(
    {
        Container:
        {
            position:'absolute',
            left:15,
            bottom:10,
        
        },
        txtTitle:
        {
            color:"#fff",
            fontSize:20
        },
        txtchannelID:
        {

            fontSize:20,
            color:"#fff"
           
         },
        txtTag:
        {

            fontSize:20,
            color:"#fff"
           
        }
    }
)
export default VideoDetails