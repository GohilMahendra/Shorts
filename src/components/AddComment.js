

import React, { useRef, useState } from 'react'


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MakeComment } from '../redux/Actions/CommentActions'
import { useDispatch } from 'react-redux'


const AddComments = (videoID) => {

    const dispatch = useDispatch()
    const [comment, setcomment] = useState("")


    const ReviewRef = useRef()

    const submitComment = () => {
        dispatch(MakeComment(comment, videoID))
        //setcomment("")
    }

    return (


        <View
            style={styles.Container}>


                <View
                    style={styles.innerContainer}
                >
                    <TextInput
                        ref={ReviewRef}
                        selectTextOnFocus={true}

                        value={comment}

                      
                        onChangeText={(text) => setcomment(text)}
                        style={[
                            styles.txtComment
                           
                        ]}
                        multiline={true}

                        numberOfLines={4}

                       // maxLength={150}
                        returnKeyType="send"
                        returnKeyLabel="submit"
                        clearButtonMode={"always"}

                    />


                    <TouchableOpacity
                        onPress={
                            () => submitComment()
                        }
                        style={styles.btnSubmit}
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

const styles = StyleSheet.create
    (
        {
            Container:
            {
                backgroundColor: "transparent",
                position: 'absolute',
                bottom: 5,
                margin:20,
                maxHeight: 200,
            },
            innerContainer:

            {
                flexDirection: 'row',
                flex: 1,
                justifyContent:"space-evenly"

            },
            txtComment:
            {
                width: '70%',
                color: '#fff',
                padding: 15,
                backgroundColor: '#282C35',
                margin: 20,
                borderWidth: 0.5,
                maxHeight: 200,
                borderRadius: 15,

            },
            btnSubmit:
            {
                backgroundColor: '#007FFF',
                height: 50,
                width: 70,
                borderRadius: 15,
                alignItems: "center",
                alignSelf: "center",
                justifyContent: 'center'
            }


        }
    )

export default AddComments