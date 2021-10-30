






import React from "react"

import {

    View,
    Text,
    StyleSheet
}
from 'react-native'



const InfoBox=(props)=>
{

    const {followers,following,likes}=props
    return(
        <View
        style={{
            height:50,
            flexDirection:"row",
            justifyContent:'space-around',
            marginVertical:10
        }}
        >
            <View style={styles.profileDetailsContainer}>
                <Text
                style={{
                    color:"#fff"
                }}
                >
                    Follwing
                </Text>
                <Text style={styles.text}>
                   {following}
                </Text>
            </View>
            <View style={styles.profileDetailsContainer}>
                <Text
                style={{
                    color:"#fff"
                }}
                >
                    Follwers
                </Text>
                <Text style={styles.text}>
                  {followers}
                </Text>
            </View>
            <View style={styles.profileDetailsContainer}>
                <Text
                style={{
                    color:"#fff"
                }}
                >
                    Likes
                </Text>
                <Text style={styles.text}>
                   {likes}
                </Text>
            </View>
        </View>



    )

}

const styles=StyleSheet.create
(
    {
        text:
        {
            color:'#fff',
        },
        profileDetailsContainer:
        {
            alignItems:'center',
            paddingHorizontal:10,
            borderRightWidth:0.7,
            borderLeftColor:'#fff',
            borderLeftWidth:0.7,
            borderRightColor:"#fff"
        }
    }
)
export default InfoBox