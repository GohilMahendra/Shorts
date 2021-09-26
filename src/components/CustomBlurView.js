



import React from "react";

import {View ,Text} from 'react-native'
const CustomBlueView=({childern})=>
{

   // console.log(childern)

    return(
        <View
        style={{
            alignItems:'center',
            justifyContent:'center'
        }}
        >

        <View
        style={{
            backgroundColor:"#fff"
        ,
    
        height:70,
        width:70,
        borderRadius:15,
        opacity:0.5
        }}
        >

      
        </View>
       
       <View
       style={
           {
               flex:1,
               position:'absolute',
           }
       }
       >
       {childern}
       </View>
        </View>
    )
}

export default CustomBlueView