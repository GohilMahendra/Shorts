import React, { useEffect, useState,useRef, useContext } from "react";
import {View ,Animated,Text, TouchableOpacity, Dimensions, StyleSheet} from 'react-native'

import { useNavigation } from "@react-navigation/core";
import SongInfoBox from "./SongInfoBox";
import {Fonts} from '../constants/Fonts'
import { Colors } from "react-native/Libraries/NewAppScreen";
import { themeContext } from "../../App";

const {height,width}=Dimensions.get('screen')
const VideoDetails=(props)=>
{

    const {data,channel}=props

    const {theme}=useContext(themeContext)
    
    const navigation=useNavigation()

    return(
        <View
        style={styles.Container}
        >

            <View
            style={{width:'70%'}}
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
                    style={[
                      styles.txtTag,{   backgroundColor:theme.background_color}]
                    }
                    >{tag}</Text>
                    </TouchableOpacity>
                    )
                   })
               }
                 <Text
           // numberOfLines={1}
         
              style={
                styles.txtTitle
            }
            >{data.discription}</Text>
            </View>
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
           // width:'50%',
          
            flexWrap:'wrap',
            
            fontFamily:Fonts.Genos_Regular,
            
        },
        tagContinaer:
        {
            flexDirection:"row",
            flexWrap:'wrap'

            
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
            margin:2,
            padding:2,
         
         
            borderRadius:5,
            color:"#fff",
           // marginHorizontal:10,
        
            fontFamily:Fonts.Genos_Regular
    
           
        }
    }
)
export default VideoDetails