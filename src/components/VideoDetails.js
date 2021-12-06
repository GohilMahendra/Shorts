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
            >{data.Title}</Text>

            <View
            style={styles.rowContainer}
            >
            <Text
            numberOfLines={2}
         
              style={
                styles.txtTitle
            }
            >{data.channelName}</Text>
             <Text
            numberOfLines={2}
         
              style={
                styles.txtTitle
            }
            >{data.discription}</Text>
            </View>

            <View
           style={styles.tagContinaer}
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
        tagContinaer:
        {
            flexDirection:"row",
            width:'70%',
            maxWidth:"70%"
            
        },
        rowContainer:    
        {
            flexDirection:'row',
            
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
           // marginHorizontal:10,
        
            fontFamily:Fonts.Genos_Regular
    
           
        }
    }
)
export default VideoDetails