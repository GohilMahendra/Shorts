


import React, { useEffect, useState } from "react";
import { View,Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";


import Video from 'react-native-video'

const PreviewThumb=(props)=>
{

   


    const {VideoUrl,seekTime}=props


    return(
        <View
        style
        ={
            {
                flex:1
            }
        }
        >

         

         
        

            <Video
            

            
            style={
                {
                    flex:1
                }
            }
            resizeMode={
                "cover"
            }



            playInBackground={false}
            playWhenInactive={false}
            
    

    //        repeat={true}
          //  muted={true}
            paused={false}
         


            source={{
                uri:VideoUrl,
            
            }}
            >

            </Video>

         
        </View>
    )

}
export default PreviewThumb