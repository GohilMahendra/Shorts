import React from "react"
import { Image, View, Text, StyleSheet } from 'react-native'

export default RoundImage = ({ imageURL, userName = "" }) => {

    return (
        <View
            style={styles.Container}
        >

            {imageURL != "" && imageURL != null? 
                <Image
                    source={
                        {
                            uri: imageURL,
                        }
                    }
                    style={styles.imgProfile}
                >
                </Image>
                :
                <View
                    style={styles.noImageContainer}
                >
                    <Text>{userName[0, 2]}</Text>
                </View>
            }

        </View>

    )
}

const styles = StyleSheet.create
    (
        {
            Container:
            {
                height: 75,
                width: 75,
                alignSelf: 'center',
                borderRadius: 75,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff"

            },
            imgProfile:
            {
                height: 70,
                width: 70,
                borderRadius: 70,

                // backgroundColor:'#fff',
                resizeMode: 'cover',
            },
            noImageContainer:
            {

                flex: 1,
                justifyContent: 'center',
                alignItems: "center"

            }


        }
    )
