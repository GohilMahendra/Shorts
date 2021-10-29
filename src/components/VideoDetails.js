



import React from "react";


import auth from '@react-native-firebase/auth'
import {View ,Text, TouchableOpacity} from 'react-native'
import { tan } from "react-native-reanimated";
const VideoDetails=(props)=>
{

    const {data}=props

  



    return(
        <View
        style={{
            position:'absolute',
            left:15,
            bottom:50,
        
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
                    backgroundColor:'#000133',
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
                >Follow +</Text>
            </TouchableOpacity>
            </View>
        
            <View
           
            >
               {
                   data.Tags.map(tag => {
                     console.log(tag)
                    return(
                    <TouchableOpacity>
                    <Text

                    key={tag}
                    style={
                        {
                            color:"blue",
                            fontSize:18
                        }
                    }
                    >{tag}</Text>
                    </TouchableOpacity>
                    )
                   })
               }
            </View>
       
        </View>
    )
}

export default VideoDetails