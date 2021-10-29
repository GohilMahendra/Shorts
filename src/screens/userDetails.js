

import { useRoute } from "@react-navigation/core"
import React from "react"


import
 { View,Image,Text }
 from 'react-native'
import { TextInput } from "react-native-gesture-handler"
import RoundImage from "../components/RoundImage"


import { Colors } from "../constants/colors"
const userDetails=()=>
{

    const p=useRoute()

    console.log(p.params.channelID)



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
                height:"30%",
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
            </View>

            <Text>userDetails</Text>

        </View>
    )
}
export default userDetails