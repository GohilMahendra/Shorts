import React, { useContext } from "react"
import { View,Text } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { themeContext } from "../../../App";

const TagView=({hashTag})=>
{


    const {theme}=useContext(themeContext)

    return(
        <View
        style={
            {
                backgroundColor:'black',
                flex:1
            }
        }
        >
          <LinearGradient
          style={{
              flex:1,
              justifyContent:'center',
          }}
          start={{x:0,y:0}}
          end={{x:1,y:1}}
          colors={[theme.gradient_color1,theme.gradient_color2]}
          >
           
               
                <Text
                style={
                    {
                        fontSize:50,
                        marginHorizontal:20,
                        fontWeight:"bold",
                        color:'#fff'
                    }
                }
                >
                    {hashTag}
                </Text>

            
            </LinearGradient>
        </View>
    )

}

export default TagView