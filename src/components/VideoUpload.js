import React, { useState } from "react";

import { View,TextInput,
     Text, StyleSheet,TouchableOpacity } from 'react-native'

import firestore from '@react-native-firebase/firestore'

import auth from "@react-native-firebase/auth";

import storage from '@react-native-firebase/storage'
import {launchCamera,launchImageLibrary} from 'react-native-image-picker'
const VideoUpload = () => {



    
    let date = new Date()

    const todaysDate = date.toISOString()
    
    console.log(todaysDate)
    const TimeStamp=date.valueOf()
    const [loading,setLoading]=useState(false)
    const [Title,setTitle]=useState("")

    const [taskshot,settaskShot]=useState()

    const [Duration,setDuration]=useState("")
    const [SongName,setSongName]=useState("")
    const [VideoUrl,setVideoUrl]=useState("")


    const UploadOnServer=async()=>
    {

        if(Title=="" || SongName=="")
        {
            alert("Please give some Title for IT")
            return
        }
        if(Title!="" && Duration!="" && SongName != "" && VideoUrl!="")
        {

            const doc={
                Title:Title,
                SongName:SongName,
                duration:Duration,
                VideoUrl:"Videos/uTGNH7noFcR9ndWLs4q1g3HBFmA3/uTGNH7noFcR9ndWLs4q1g3HBFmA3-1632390731438",
                Date:todaysDate,

                channelID:auth().currentUser.uid,
                likes:0,
                share:0,
                comments:0,

            }

            const res=await firestore().collection('Videos').add
            (doc)

            console.log(res)
        }
    }

    const launchMedia = async () => {

        
        launchImageLibrary(
            {

                mediaType: 'video',
                videoQuality: (Platform.OS == 'android' ? 'low' : 'medium'),
                selectionLimit: 1,


            },
            response => {
                if (response.didCancel) {
                    console.log('canccel')
                }
                else if (!response.didCancel) {


                    setLoading(true)

                    let videoRef = '/Videos/' + auth().currentUser.uid + '/' +
                        auth().currentUser.uid + '-' + TimeStamp


                    const ref = storage().ref(videoRef)
                    const task = ref.putFile(response.assets[0].uri);
                    task.on('state_changed', (taskSnapshot) => {
                        console.log(taskSnapshot);

                        settaskShot(taskSnapshot)
                    });

                   
                    setDuration(response.assets[0].duration)

                    setVideoUrl( ref.getDownloadURL())

                    UploadOnServer()



                }

            }

        )
    }


    return (
        <View
            style={styles.Container}

        >
            <TextInput

            placeholder='Title'
            value={Title}
            style={
                {
                    borderWidth:1,
                    margin:15,
                    borderRadius:15
                }
            }

            onChangeText={text=>setTitle(text)}
            ></TextInput>

            <TextInput
            placeholder="Song Name"
             style={
                {
                    borderWidth:1,
                    margin:15,
                    borderRadius:15
                }
            }
            value={SongName}
            onChangeText={text=>setSongName(text)}
            />

            <TouchableOpacity

                onPress={() => launchMedia()}
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





        </View>
    )

}

const styles = StyleSheet.create
    (
        {
            Container:
            {
                height:350,
                backgroundColor:'#fff'
            }
        }
    )

export default VideoUpload