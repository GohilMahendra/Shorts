

import React from "react"


import
{

    Text,View
}
from 'react-native'

const EmptyComponent=()=>

{

    return(
        <View
        style={{
            flex:1,
            backgroundColor:'black',
            justifyContent:'center'
        }}
        >
            <View
            style={{
                borderWidth:1,
                borderColor:'#fff',
                
                margin:25,
            }}
            >
                <Text
                style={{
                    color:'#fff',
                    padding: 5,
                    fontSize:25,
                    alignSelf:'center',
                    textAlign:"center",
                    fontWeight:"bold"
                }}
                >
                    NO Videos Found......
                </Text>
            </View>


        </View>
    )

}

export default EmptyComponent