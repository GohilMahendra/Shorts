import React, { useEffect, useState,useRef } from "react";
import {View ,Animated,Text, TouchableOpacity, Dimensions, StyleSheet} from 'react-native'

import { useNavigation } from "@react-navigation/core";
import SongInfoBox from "./SongInfoBox";
import {Fonts} from '../constants/Fonts'

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
            >jhbdf hsdbfjhds jhsdbfjhbdsh sbdfjhbhjds jhsbdfh</Text>
             
            <View
            style={
                {
                    flexDirection:'row',
                    
                }
            }
            >

            <Text
            numberOfLines={2}
         
              style={
                styles.txtTitle
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
                    >dhjfbsb</Text>
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
            bottom:70,
          //  width:"75%"
        
        },
        txtTitle:
        {
            color:"#fff",
            fontSize:20,
            width:"75%",
            
            fontFamily:Fonts.Genos_Regular,
            
        },
        txtchannelID:
        {

            fontSize:20,
            color:"#fff",
            fontFamily:Fonts.SpaceMono_Regular,

           
         },
        txtTag:
        {

            fontSize:20,
            color:"#fff",
            textShadowColor:'#fff',
            textShadowOffset:{
                height:2,width:2
            },
            textShadowRadius:5,
            fontFamily:Fonts.Genos_Regular
    
           
        }
    }
)
export default VideoDetails