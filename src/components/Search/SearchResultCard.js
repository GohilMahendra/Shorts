
import React from "react"


import { View,Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
const SearchResultCard=(props)=>
{

    const {data}=props
    return(
        <View
        style={{
           
            backgroundColor:'black',
            height:100,
          


        }}
        >

            <Text
            style={{
                color:'#fff'
            }}
            >
                {data.userName}

            </Text>
            <Text
            style={{
                color:'#fff'
            }}
            >
                @{data.userID}

            </Text>

                   {/* <View
          style={
              {
                  height:70,
                  width:70,
                  borderRadius:70,
                  backgroundColor:"#fff"
                  
              }
          }
          >

          </View>*/}
        </View> 
    )

}
export default SearchResultCard
