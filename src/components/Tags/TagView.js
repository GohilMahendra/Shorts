


import React from "react"


import { View,Text } from 'react-native';
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Colors } from "react-native/Libraries/NewAppScreen";

const TagView=({hashTag})=>
{


    return(
        <View
        style={
            {
                backgroundColor:'black',
                flex:1
            }
        }
        >
            <View
            style={
                {
                    flexDirection:'row',
                    flex:1,
                    alignItems:'center'

                }
            }
            >
                <View
                style={
                    {
                        padding:15,
                        margin:10,
                        borderRadius:15,
                        backgroundColor:'skyblue'
                    }
                }
                >
                    <Text
                    style={
                    {
                        fontSize:50,
                        
                    }
                    }
                    >#</Text>
                </View>

                <Text
                style={
                    {
                        fontSize:50,
                        fontWeight:"bold",
                        color:'#fff'
                    }
                }
                >
                    {hashTag}
                </Text>

            </View>
            
        </View>
    )

}

export default TagView