



import React, { useEffect, useState } from "react";

import { View, Text, Image, StyleSheet } from 'react-native'

import firestore, { firebase } from '@react-native-firebase/firestore'
const CommentCard = (props) => {



    const { data } = props


    const [userDetails, setUserDetails] = useState({})


    const getUserDetails = async () => {

        const user = await firestore()
        .collection('Users').
        doc(data.id).get()

        setUserDetails(user.data())


    }
    useEffect
        (

            () => {

                getUserDetails()

            },
            []

        )

    return (
        <View
            style={styles.Container}
        //  collapsable={true}
        >

            <View
                style={styles.blurContainer}
            >
            </View>
            <View
                style={styles.blurFreeView}
            >
                <View
                    style={styles.detailsContainer}
                >
                    {(userDetails.photoURL != "") ? <Image
                        source={{ uri: userDetails.photoURL }}
                        resizeMode={'cover'}
                        style={styles.imgUser}

                    /> :

                        <View
                            style={styles.blankImageView}
                        />
                    }

                    <View>
                        <Text
                            style={styles.txtUserName}
                        >
                            {userDetails.userName}
                        </Text>

                        <Text
                            style={styles.txtDate}
                        >
                            {data.Date}
                        </Text>

                    </View>
                </View>


                <Text

                    numberOfLines={4}
                    style={styles.txtComment}
                >{data.comment}</Text>
            </View>


        </View>
    )
}

const styles = StyleSheet.create

    (
        {
            Container:
            {
                maxHeight: 200,
                height: 150,
                marginVertical: 10,
                marginHorizontal: 20

            },
            blurContainer:

            {
                flex: 1,
                opacity: 0.2,
                backgroundColor: '#fff',
                borderRadius: 20
            },
            blurFreeView:

            {
                flex: 1,

                position: "absolute",
                alignItems: "center",
                backgroundColor: "transparent"


            },
            detailsContainer:

            {
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: "center"
            },
            imgUser:

            {
                height: 50,
                width: 50,
                backgroundColor: '#fff',
                borderRadius: 70,
                margin: 10
            },
            blankImageView:

            {
                height: 50,
                width: 50,
                backgroundColor: '#fff',
                borderRadius: 70,
                margin: 10
            },
            txtUserName:

            {
                color: "#fff",
                fontSize: 20
            },
            txtComment:
            {
                color: '#fff',
                fontSize: 17,
                alignSelf: 'flex-start',
                marginHorizontal: 20
            },
            txtDate:
            {
                color: "#fff",
                fontSize: 15
            }


        }
    )
export default CommentCard