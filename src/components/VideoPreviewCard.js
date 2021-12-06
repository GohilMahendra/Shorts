
import React from "react"
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
const { height, width } = Dimensions.get('screen')
const VideoPreviewCard = (props) => {

    const { data } = props
    return (
        <View
            style={styles.Container}
        >

           {data.videoThumb!=""? <Image
                style={styles.Thumbstyle}

                source={
                    {
                        uri: data.VideoThumb
                    }
                }
            >
            </Image>
            :
            <View
            style={styles.Thumbstyle}
            />
            }
            <Text
                style={styles.txtDuration}
            >
                {data.duration} s
            </Text>


        </View>
    )

}

const styles = StyleSheet.create
    (
        {
            Container:
            {

                backgroundColor: '#fff',
                height: 200,
                //  borderRadius:20,
                width: width / 3.3,
                margin: 2
            },
            txtDuration:
            {
                position: 'absolute',

                bottom: 5,
                right: 5,
                backgroundColor: "black",
                padding: 2,
                borderRadius: 5,

                color: '#fff'
            },
            Thumbstyle:
            {
                flex: 1,
                backgroundColor: '#fff'

            }
        


        }
    )
export default VideoPreviewCard
