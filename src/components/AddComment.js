

import firestore from '@react-native-firebase/firestore'
import auth, { firebase } from '@react-native-firebase/auth'
import { useRoute } from '@react-navigation/core'
import React, { useRef, useState } from 'react'


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'


const AddComments = () => {

    const [comment, setcomment] = useState("")


    const date = new Date()

    const p = useRoute()
    const todaysDateTime = date.toISOString()



    const ReviewRef=useRef()

    const submitComment = async () => {

        ReviewRef.current.set

        if (comment != "") {


            const res = await firestore()
                .collection('Comments')
                .doc(
                    p.params.key
                ).collection('reviews')
                .doc(auth().currentUser.uid)
                .set
                (
                    {
                        comment: comment,
                        name: "Mahendra Gohil",
                        Date: todaysDateTime,
                        profilePick: (auth().currentUser.photoURL == null) ? "" : auth().currentUser.photoURL,
                    }
                )

            const exists = await firestore()
                .collection('Comments')
                .doc(
                    p.params.key
                )
                .collection('reviews')
                .doc(auth().currentUser.uid)
                .get()

            console.log(exists.exists)
            if (!exists.exists) {
                await firestore()
                    .collection('Videos')
                    .doc(p.params.key)
                    .update
                    (
                        {
                            comments: firebase
                                .firestore
                                .FieldValue
                                .increment(1)
                        }
                    )
            }
        }
    }

    return (


        <View


            style={{
                backgroundColor: "transparent",
                height: 100,
                position: 'absolute',
                bottom: 5
            }}

        >
            <View
                style={{
                    flexDirection: 'row'

                }}
            >
                <TextInput
                    ref={ReviewRef}
                    selectTextOnFocus={true}

                    value={comment}
                    onChangeText={(text) => setcomment(text)}
                    style={{


                        margin: 20,
                        borderWidth: 0.5,
                        borderRadius: 15,
                        height: 50,
                        width: '70%',
                        backgroundColor: '#A9A9A9'
                    }}
                    multiline={true}

                    returnKeyType="done"
                    returnKeyLabel="submit"
                    clearButtonMode={"always"}

                />

                <TouchableOpacity
                    onPress={
                        () => submitComment()
                    }
                    style={{
                        backgroundColor: '#007FFF',
                        height: 50,
                        width: 70,
                        borderRadius: 15,
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: 'center'
                    }}
                >
                    <MaterialCommunityIcons

                        name="send"
                        style={
                            {
                                alignSelf:
                                    'center'
                            }
                        }
                        size={30}
                        color={
                            "#fff"
                        }

                    />

                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddComments