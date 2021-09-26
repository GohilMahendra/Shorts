import React, { useState, useRef, useEffect } from "react"
import { Platform, Pressable } from "react-native"
import { StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

import storage from "@react-native-firebase/storage"
import { launchImageLibrary } from "react-native-image-picker"
import auth from "@react-native-firebase/auth"


import Modal from 'react-native-modal'

import Animated from "react-native-reanimated"
import VideoUpload from "../components/VideoUpload"
const Welcome = () => {



    const animationVariable = useRef(new Animated.Value(0)).current;

    let date = new Date()

    const todaysDate = date.toISOString()
    
    console.log(todaysDate)

    const [visible, setVisble] = useState(false)



    const TimeStamp = date.valueOf()


    const runAnimationOnClick = () => {

        console.log("called")

        Animated.spring(animationVariable, {
            toValue: 2,
            useNativeDriver: false,
        }).start();
    }

   

    return (
        <View
            style={
                {
                    justifyContent: 'center',
                    backgroundColor: 'black',
                    flex: 1,
                    alignItems: 'center'
                }
            }
        >
            <Text>Welcome</Text>
            <TouchableOpacity
                onPress={() => runAnimationOnClick()}
            >
                <Animated.View
                    style={{
                        top: 150,
                        backgroundColor: '#fff',
                        height: 100,
                        width: 100,
                        transform: [
                            {
                                scale: animationVariable.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [1, 5],
                                }),
                            },
                        ],
                    }}

                >

                </Animated.View>
            </TouchableOpacity>

            <TouchableOpacity

                onPress={() => setVisble(true)}
                style={
                    {
                        backgroundColor: 'blue',
                        height: 50,
                        width: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,

                    }
                }
            >
                <Text
                    style={
                        {
                            color: '#fff',
                            fontWeight: 'bold'
                        }
                    }
                >Upload Video</Text>
            </TouchableOpacity>

            <Modal
                onBackButtonPress={()=>setVisble(false)}
                isVisible={visible}
            >
                <VideoUpload></VideoUpload>
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create
    (
        {

        }
    )
export default Welcome