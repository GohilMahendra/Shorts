
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
                style={
                    {
                        flexDirection: 'row',

                    }
                }
            >
                <RoundImage
                    imageURL={data.photoURL}
                />

                <View
                    style={
                        {
                            marginHorizontal: 25,
                            justifyContent: 'center',

                        }
                    }
                >
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 20
                        }}
                    >
                        {data.userName}

                    </Text>
                    <Text
                        style={{
                            color: '#fff'
                        }}
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

            }
        }
    )
export default SearchResultCard
