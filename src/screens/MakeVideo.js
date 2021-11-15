import React, { useState, useRef, useEffect } from "react"
import { Platform, Pressable } from "react-native"
import { StyleSheet,PanResponder,Animated, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

import storage from "@react-native-firebase/storage"
import { launchImageLibrary } from "react-native-image-picker"
import auth from "@react-native-firebase/auth"


import Modal from 'react-native-modal'

import VideoUpload from "../components/VideoUpload"
import { Easing, Value } from "react-native-reanimated"
const MakeVideo = () => {

    let date = new Date()


    const todaysDate = date.toISOString()
    
    console.log(todaysDate)

    const [visible, setVisble] = useState(false)



    const TimeStamp = date.valueOf()

    const HideModal=()=>
    {
        setVisble(false)
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




         <View
         style={
             {
                 height:250,
                 backgroundColor:"#fff",
                 width:500
             }
         }
         >
             
             </View>   

           
             
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
                <VideoUpload
                
                onPress={HideModal}
                ></VideoUpload>
            </Modal>
        </View>
    )

}

const styles = StyleSheet.create
    (
        {

        }
    )
export default MakeVideo