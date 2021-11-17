
import React from "react"


import { View,Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
const UploadingLoad=()=>
{

    return(
        <View
        style={{
            position: 'absolute',
            alignSelf: 'center',
            top:'40%',
            height:200,
            width:200,
            borderRadius:20,
           // backgroundColor:'#fff',
            alignItems:'center'

        }}
        >
            <Text>LOADING</Text>
            <ActivityIndicator
            animating={true}
            size={'large'}
            >
                
            </ActivityIndicator>

        </View>
    )

}
export default UploadingLoad