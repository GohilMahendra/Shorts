



import React from "react"

import { Image, View } from 'react-native'
export default RoundImage=({imageURL})=>
{


    console.log(imageURL)

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

        {


            (imageURL!=null && imageURL!="")?
            <Image
            source={
                {
                    uri:imageURL==null?"":imageURL
                }
            }
            style={
                {
                    flex:1,
                                  }
            }
            >

            </Image>
            :
            <View
            style={
                {
                    flex:1,
                    backgroundColor:'#fff',
                    borderRadius:70
                }
            }
            />
        

        }

        </View>

    )


}