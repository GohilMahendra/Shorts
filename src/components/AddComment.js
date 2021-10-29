

import React, { useRef, useState } from 'react'


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MakeComment } from '../redux/Actions/CommentActions'
import { useDispatch } from 'react-redux'


const AddComments = (videoID) => {


    console.log(videoID)

    const dispatch=useDispatch()
    const [comment, setcomment] = useState("")

    const date = new Date()


    const [height,setheight]=useState(0)
    const todaysDateTime = date.toISOString()

    const ReviewRef = useRef()

    const submitComment = () => {
    dispatch( MakeComment(comment,todaysDateTime,videoID))
    //setcomment("")
    }

    return (


        <View


        
            style={{
                backgroundColor: "transparent",
                position: 'absolute',
                bottom: 5,
            
                maxHeight:150,



            }}

        >
            <ScrollView>
            <View
                style={{
                    flexDirection: 'row',
                    flex:1
                  
                }}
            >
                <TextInput
                    ref={ReviewRef}
                    selectTextOnFocus={true}

                    value={comment}
                    
                    onContentSizeChange={
                        e=>setheight(e.nativeEvent.contentSize.height)
                    }
                    onChangeText={(text) => setcomment(text)}
                    style={{


                        margin: 20,
                        borderWidth: 0.5,
                        maxHeight:150,
                        borderRadius: 15,
                        height: Math.max(50,height),
                        width: '70%',
                        backgroundColor: '#A9A9A9'
                    }}
                    multiline={true}

                    numberOfLines={5}
                    maxLength={150}
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
            </ScrollView>
        </View>
    )
}

export default AddComments