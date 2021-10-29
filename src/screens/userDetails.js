

import { useRoute } from "@react-navigation/core"
import React from "react"


import
 { View,Text }
 from 'react-native'
import { TextInput } from "react-native-gesture-handler"

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

            <Text>userDetails</Text>

        </View>
    )
}
export default userDetails