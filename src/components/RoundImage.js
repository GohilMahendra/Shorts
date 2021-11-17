



import React from "react"

import { Image, View } from 'react-native'
export default RoundImage=({imageURL})=>
{


    return(
        <View
        style={
            {
                height:75,
                width:75,
                alignSelf:'center',
                borderRadius:75,
                justifyContent:"center",
                alignItems:"center",
                backgroundColor:"#fff"

            }
        }
        >



        
            <Image
            source={
                {
                    uri:imageURL,
                    
                }
            }
            style={
                {
                    height:70,
                    width:70,
                    borderRadius:70,
                    
                   // backgroundColor:'#fff',
                    resizeMode:'cover',
                                  }
            }
            >

            </Image>
           

        

        </View>

    )


}