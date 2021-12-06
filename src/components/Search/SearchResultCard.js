
import React from "react"


import { View, Text, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import RoundImage from "../RoundImage";
const SearchResultCard = (props) => {

    const { data } = props
    return (
        <View
            style={styles.Container}
        >
            <View
                style={styles.rowContainer}
            >
                <RoundImage
                    imageURL={data.photoURL}
                />

                <View
                    style={styles.textContainer}
                >
                    <Text
                        style={styles.txtUserName}
                    >
                        {data.userName}

                    </Text>
                    <Text
                        style={styles.txtUserID}
                    >
                        {data.userID}

                    </Text>
                </View>
            </View>
        </View>
    )

}
const styles = StyleSheet.create
    (
        {
            Container:
            {

                height: 100,
                backgroundColor: "transparent"

            },
            textContainer:
            {
                marginHorizontal: 25,
                justifyContent: 'center',

            },
            txtUserName:
            {
                color: '#fff',
                fontSize: 20
            },
            txtUserID:
            {
                color: '#fff'
            },
            rowContainer:
            {
                flexDirection: 'row',
                backgroundColor: '#383838',
                borderRadius: 15,
                borderTopLeftRadius: 50,
                borderBottomLeftRadius: 50,
                elevation: 10

            }

        }
    )
export default SearchResultCard
