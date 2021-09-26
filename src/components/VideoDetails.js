



import React from "react";


import auth from '@react-native-firebase/auth'
import {View ,Text, TouchableOpacity} from 'react-native'
const VideoDetails=(props)=>
{

    const {data}=props

   // console.log(childern)

    return(
        <View
        style={{
            position:'absolute',
            left:15,
            bottom:100,
        
        }}
        >

            <Text
            style={
                {
                    color:"#fff",
                    fontSize:20
                }
            }
            >{data.Title}</Text>
              <Text
            style={
                {
                    color:"#fff",
                    fontSize:20
                }
            }
            >{data.SongName}</Text>

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
            >THUG LIFE</Text>
            <TouchableOpacity
            style={
                {
                    backgroundColor:'red',
                    borderRadius:5,
                    padding:10,
                    alignSelf:'flex-end',
                    justifyContent:'center'
                }
            }
            >
                <Text
                style
                ={
                    {
                        color:"#fff"
                    }
                }
                >SUBSCRIBE</Text>
            </TouchableOpacity>
            </View>
        
       
        </View>
    )
}

export default VideoDetails