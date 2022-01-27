
import React from "react"


import { View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";
const UploadingLoad = () => {

    return (
        <View
            style={{
                height: 200,
                width: 200,
                borderRadius: 15,
                backgroundColor: '#fff',
                elevation: 15,
                justifyContent: "center",
                alignItems: 'center',
                alignSelf: "center"
            }}
        >
            <ActivityIndicator
                size={30}
                color={"blue"}

            ></ActivityIndicator>
            <Text
                style={{
                    fontSize: 20,
                    color: "blue"

                }}
            >UPLOADING ...</Text>
        </View>
    )

}
export default UploadingLoad