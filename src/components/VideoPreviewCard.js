
import React from "react"


import { View,Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { ActivityIndicator } from "react-native-paper";


const {height,width}=Dimensions.get('screen')
const VideoPreviewCard=(props)=>
{

    const {data}=props
    return(
        <View
        style={{
           
            backgroundColor:'#fff',
            height:200,
            width:width/3.3,
            margin:2
          


        }}
        >

            <Image
            style={
                {
                    flex:1,

                }
            }

            source={
                {
                    uri:data.VideoThumb
                }
            }
            >

            </Image>

            <Text
            style={
                {
                    position:'absolute',
                   
                    bottom:5,
                    right:5,
                    backgroundColor:"black",
                    padding:2,
                    borderRadius:5,
                    
                    color:'#fff'
                }
            }
            >
                {data.duration} s
            </Text>

           
        </View> 
    )

}
export default VideoPreviewCard
