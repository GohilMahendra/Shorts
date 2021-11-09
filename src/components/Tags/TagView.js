


import React from "react"


import { View,Text } from 'react-native';

const TagView=({hashTag})=>
{


    return(
        <View
        style={
            {
                backgroundColor:"blue",
                flex:1
            }
        }
        >
            <Text>{hashTag}</Text>
            
        </View>
    )

}

export default TagView