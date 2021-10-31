import React, { useEffect, useRef, useState } from "react";

import {
    View, TextInput,
    Text, StyleSheet, TouchableOpacity,PermissionsAndroid, Pressable, Image
} from 'react-native'

import firestore from '@react-native-firebase/firestore'

import auth from "@react-native-firebase/auth";

import storage from '@react-native-firebase/storage'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

import PreviewThumb from "./PreviewThumb";
import { ScrollView } from "react-native-gesture-handler";
import ViewShot, { captureRef } from "react-native-view-shot";

import Slider from "react-native-slider";


import getpath from '@flyerhq/react-native-android-uri-path'
import UploadingLoad from "./UploadingLoad";
const VideoUpload = () => {




    let date = new Date()
   

    const todaysDate = date.toISOString()


    const ImageRef = useRef()


    const TimeStamp = date.valueOf()
    const [loading, setLoading] = useState(false)
    const [taskshot, settaskShot] = useState()


    const [VideoLoaction, setVideoLocation] = useState("")


    const [songID, setSongID] = useState("")


    const [Title, setTitle] = useState("")
    const [discription, setdeiscription] = useState("")
    const [Duration, setDuration] = useState("")
    const [Tags, setTags] = useState("")
    const [SongName, setSongName] = useState("")
    const [VideoUrl, setVideoUrl] = useState("")
    const [SongCover, setsongCover] = useState("")
    const [VideoThumb, setVideoThumb] = useState("")




    const maketags = (value) => {
        var arr = []



        if (value != "" && value != null) {
            arr = value.split(',')
        }

        // console.log(arr)
        return arr

    }



    const getVideopath=(uriString)=>
    {
        const path=getpath(uriString)

        return path
    }
    useEffect
    (
        ()=>
        {

            requestCameraPermission()
        },
        []
    )
    const requestCameraPermission = async () => {
        try {
            const granted =await PermissionsAndroid.requestMultiple
            (
                [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, 
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]
            )

            console.log(granted)
           
            } catch (err) {
              console.log(err);
            }
          }
      
      
    const TagMaker = (value) => {
        setTags(value)
    }



    const captureTumbnail = async () => {
        await captureRef(ImageRef, {
            format: "png",
            quality: 1
        }).then(
            uri => {
                console.log("Image saved to", uri)

                //  setImageLocation(uri)
                UploadThumbOnServer(uri)

            },
            error => console.error("Oops, snapshot failed", error)
        );

    }


    const UploadVideoFull=async(response)=>
    {
        let videoRef = 'Videos/'
        + auth().currentUser.uid
        + '/'
        + auth().currentUser.uid
        + '-'
        + TimeStamp

    const ref = storage().ref(videoRef)

   
    let VideDownloadUrl = ""

    const path=getVideopath(response)
    let task =await ref.putFile(path);

    console.log(task)

    VideDownloadUrl=await ref.getDownloadURL()


    console.log(VideDownloadUrl)
    setVideoUrl(VideDownloadUrl)


    }

    const UploadThumbOnServer = async (uri) => {
        const ref = 'Thumbs/' +
            auth().currentUser.uid + 
            '/'
            + auth().currentUser.uid
            + '-'
            + TimeStamp
        const taskRef = storage().ref(ref)


        const task = await taskRef.putFile(uri)


        console.log(task)

        const url = await taskRef.getDownloadURL()

        console.log(url)

        setVideoThumb(url)


    }

    const UploadSongOnServer = async () => {


        const response = await firestore().collection('Songs').add
            (
                {
                    SongName: (SongName == "") ? Title : SongName,
                    SongCover: SongCover == "" ? VideoThumb : SongCover,
                    songLink: ""

                }
            )
        console.log(response.id)


        setSongID(response.id)


    }

    function varify() {

        let varified = true
        let error = null


        if (Title == "" || Title == undefined || VideoLoaction == "" || VideoLoaction == undefined) {
            varified = false
            error = "Please add title Or video for Upload"
        }

        return { varified, error }
    }
    const UploadVideoOnServer = async () => {

        try {

            setLoading(true)
            const { varified, error } = varify()
            if (!varified) {
                setLoading(false)

                alert(error)

                return
            }

  
            

            
           await captureTumbnail()
            await UploadVideoFull(VideoLoaction)
           
            console.log(VideoUrl)
            await UploadSongOnServer()

      
           await UploadOnServer()


        }

        catch
        (err) {
            console.log(err + 'error in amin')
        }
    }



    const UploadOnServer = async () => {


        try {
            if (Title == "" || SongName == "") {
                alert("Please give some Title for IT")
                return
            }

            
            const tags = maketags(Tags)


          



                let doc = {


                    //video text details
                    Title: Title,

                    //hastags for Videos max 5 allowed
                    Tags: tags,


                    //song details used in background
                    SongName: (SongName == "") ? Title : SongName,
                    SongCover: SongCover == "" ? VideoThumb : SongCover,
                    songID: songID,



                    //Video Details
                    duration: Duration,
                    VideoUrl: VideoUrl,
                    VideoThumb: VideoThumb,
                    Date: todaysDate,

                    //Uploaders Channal Details
                    channelID: auth().currentUser.uid,
                    channelName: auth().currentUser.displayName,
                    channelThumbNail: auth().currentUser.photoURL!=null?auth().currentUser.photoURL:"",


                    //                          _______
                    //                           |___|
                    //                           [- -]
                    //(No Dislikes No nagitivity |_=_|)
                    //inital state for user POST  
                    likes: 0,
                    share: 0,
                    comments: 0,

                }


             console.log(doc)

             await firestore().collection('Videos').add
             (doc)
            setLoading(false)

        }
        catch (err) {
            console.log(err)
        }
    }

    const launchMedia = async () => {


        launchImageLibrary(
            {

                mediaType: 'Video',
                videoQuality: (Platform.OS == 'android' ?
                    'low' : 'medium'),
                selectionLimit: 1,
                includeBase64:true
            },

            response => {
                if (response.didCancel) {
                    console.log('cancel')
                }

                else if (!response.didCancel) {

                    console.log(response.assets[0])


                    setVideoLocation(response.assets[0].uri)
                    setDuration(response.assets[0].duration)


                }

            }

        )
    }


    return (
        <View
            style={styles.Container}

        >
            <ScrollView
                style={{ flex: 1 }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginHorizontal: 20

                    }}
                >
                    <Text
                        style={{
                            alignSelf: 'center',
                            fontSize: 25,
                            fontWeight: 'bold',
                            margin: 20

                        }}
                    >Upload Video</Text>

                    <Pressable

                    >
                        <Text>X</Text>

                    </Pressable>
                </View>
                <TextInput

                    placeholder='Title'
                    value={Title}
                    style={
                        {
                            borderWidth: 1,
                            margin: 15,
                            borderRadius: 15
                        }
                    }

                    onChangeText={text => setTitle(text)}
                ></TextInput>

                <TextInput
                    placeholder="Song Name"
                    style={
                        {
                            borderWidth: 1,
                            margin: 15,
                            borderRadius: 15
                        }
                    }
                    value={SongName}
                    onChangeText={text => setSongName(text)}
                />

                <TextInput
                    placeholder="Discription"
                    style={
                        {
                            borderWidth: 1,
                            margin: 15,
                            height: 100,
                            borderRadius: 15
                        }
                    }
                    value={discription}

                    onChangeText={text => setdeiscription(text)}
                />
                <TextInput
                    placeholder="hashTags (Max 5 allowed ) ex. #dev2021,#loveshorts"
                    style={
                        {
                            borderWidth: 1,
                            margin: 15,
                            height: 100,
                            borderRadius: 15,
                            color: 'blue'
                        }
                    }

                    value={Tags}

                    onChangeText={text => TagMaker(text)}
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
                            alignSelf: 'center',
                            margin: 10

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
                    >Select Video</Text>
                </TouchableOpacity>
                {
                    (VideoLoaction != "" && VideoLoaction != undefined)
                    &&

                    <View

                        ref={ImageRef}
                        style={
                            {
                                height: 160,
                                width: 90,
                                borderRadius: 20,
                                alignSelf: 'center',
                                backgroundColor: 'blue'
                            }
                        }
                    >




                        <PreviewThumb

                            VideoUrl={VideoLoaction}
                            seekTime={3}

                        ></PreviewThumb>




                    </View>
                }




                <TouchableOpacity

                    onPress={() => UploadVideoOnServer()}
                    style={
                        {
                            backgroundColor: 'blue',
                            height: 50,
                            width: 100,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 15,
                            alignSelf: 'center',
                            margin: 20

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
                    >UPLOAD</Text>
                </TouchableOpacity>




            </ScrollView>

            {loading && <UploadingLoad></UploadingLoad>}

        </View>
    )

}

const styles = StyleSheet.create
    (
        {
            Container:
            {

                backgroundColor: '#fff',
                flex: 1,
                borderRadius: 20,
                elevation: 25
            }
        }
    )

export default VideoUpload