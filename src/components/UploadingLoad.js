
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
            justifyContent:'center',
            height:200,
            width:200,

            borderRadius:20,
            elevation:15,
           backgroundColor:'#fff',
            alignItems:'center'

        }}
        >
            <Text
            style={
                {
                    fontSize:25
                }
            }
            >LOADING .....</Text>
            <ActivityIndicator
            animating={true}
            size={'large'}
            color="black"
            >
                
            </ActivityIndicator>

        </View>
    )

}
export default UploadingLoad