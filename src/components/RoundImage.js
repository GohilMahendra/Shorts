



import React from "react"

import { Image, View } from 'react-native'
export default RoundImage=({imageURL})=>
{


    return(
        <View
        style={
            {
                height:70,
                width:70,
                alignSelf:'center',
                borderRadius:70

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
                    flex:1,
                    borderRadius:70,
                   // backgroundColor:'#fff',
                    resizeMode:'contain',
                                  }
            }
            >

            </Image>
           

        

        </View>

    )


}