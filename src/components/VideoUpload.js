import React, { useEffect, useRef, useState } from "react";

import {
    View, TextInput,
    Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Pressable, Image, Platform
} from 'react-native'

import firestore from '@react-native-firebase/firestore'

import auth from "@react-native-firebase/auth";

import storage from '@react-native-firebase/storage'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

import PreviewThumb from "./PreviewThumb";
import { ScrollView } from "react-native-gesture-handler";
import ViewShot, { captureRef } from "react-native-view-shot";


import getpath from '@flyerhq/react-native-android-uri-path'
import UploadingLoad from "./UploadingLoad";
const VideoUpload = () => {




    let date = new Date()

    const todaysDate = date.toISOString()

    const ImageRef = useRef()

    const TimeStamp = date.valueOf()
    const [loading, setLoading] = useState(false)
    
    const [uploadSuccess,setuploadSuccess]=useState(false)
    const [VideoLoaction, setVideoLocation] = useState("")
    const [songID, setSongID] = useState("")
    const [Title, setTitle] = useState("")
    const [discription, setdeiscription] = useState("")
    const [Duration, setDuration] = useState("")
    const [Tags, setTags] = useState("")
    const [SongName, setSongName] = useState("")
  
    const [VideoThumb,setVideoThumb]=useState("")
    const [SongCover, setsongCover] = useState("")
  

    const maketags = (value) => {
        var arr = []
        if (value != "" && value != null) {
            arr = value.split(' ')
        }

        return arr

    }



    const getVideopath = (uriString) => {

        //This path will help to deal with document open intent

        let path = ""

        if (Platform.OS == "android")
            path = getpath(uriString)
        else
            path = uriString

        return path
    }
    useEffect
        (
            () => {
                requestCameraPermission()
            },
            []
        )
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple
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

        //You can make Your custom tag behavior or limit them
        setTags(value)
    }



    //Capture Thumbnail From Preview if User Not Upload Custom One
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



    //Upload Video On Server
    const UploadVideoFull = async (response) => {
        let videoRef = 'Videos/'
            + auth().currentUser.uid
            + '/'
            + auth().currentUser.uid
            + '-'
            + TimeStamp

        const ref = storage().ref(videoRef)


        let VideDownloadUrl = ""

        const path = getVideopath(response)
        let task = await ref.putFile(path);

        console.log(task)

        VideDownloadUrl = await ref.getDownloadURL()


        return VideDownloadUrl

    }


    //Upload ThumbNail on Server
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

        let url=""
         url = await taskRef.getDownloadURL()

        

        setVideoThumb(url)


    }


    //Upload Song Details On Server
    const UploadSongOnServer = async () => {


        const response = await firestore().collection('Songs').add
            (
                {
                    SongName: (SongName == "") ? Title : SongName,
                    SongCover: SongCover == "" ? (VideoThumb) : SongCover,
                    songLink: ""
                }
            )

        //ID for Search in Future
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

    //Upload Remaining Doc
    const UploadOnServer = async () => {


        try {

            
            if (Title == "" || SongName == "") {
                alert("Please give some Title for IT")
                return
            }


            setLoading(true)
            const { varified, error } = varify()
            if (!varified) {
                setLoading(false)

                alert(error)

                return
            }

            await captureTumbnail()
            const VideoUrl=await UploadVideoFull(VideoLoaction)
            await UploadSongOnServer()
         
            const tags = maketags(Tags)

            if (VideoUrl == "") {
                console.log("Invalid Videos URL")
                return
            }

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
                channelThumbNail: auth().currentUser.photoURL != null ? auth().currentUser.photoURL : "",


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

  

    //Select Video User
    const launchMedia = async () => {

        launchImageLibrary(
            {

                mediaType: 'Video',
                videoQuality: (Platform.OS == 'android' ?
                    'low' : 'medium'),
                selectionLimit: 1,
                includeBase64: true
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
                    style={styles.FormContainer}
                >
                    <Text
                        style={styles.UploadTitle}
                    >Upload Video</Text>

                    <Pressable
                    >
                        <Text>X</Text>
                    </Pressable>
                </View>
                <TextInput

                    placeholder='Title'
                    value={Title}
                    style={styles.txtInput
                    }
                    onChangeText={text => setTitle(text)}
                ></TextInput>

                <TextInput
                    placeholder="Song Name"
                    style={styles.txtInput}
                    value={SongName}
                    onChangeText={text => setSongName(text)}
                />

                <TextInput
                    placeholder="Discription"
                    style={styles.txtInputDesc}
                    value={discription}

                    onChangeText={text => setdeiscription(text)}
                />

                <TextInput
                    placeholder="hashTags (Max 5 allowed ) ex. #dev2021,#loveshorts"
                    style={
                        styles.txtInputTags
                    }

                    value={Tags}

                    onChangeText={text => TagMaker(text)}
                />
                <TouchableOpacity

                    onPress={() => launchMedia()}
                    style={styles.BtnSelectVideo
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
                    (VideoLoaction != ""
                        && VideoLoaction != undefined)
                    &&

                    <View

                        ref={ImageRef}
                        style={
                            styles.ThumbPreview
                        }
                    >

                        <PreviewThumb

                            VideoUrl={VideoLoaction}
                            seekTime={3}

                        ></PreviewThumb>

                    </View>
                }

                <TouchableOpacity

                    onPress={() => UploadOnServer()}
                    style={styles.BtnUpload
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
            },
            FormContainer:
            {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginHorizontal: 20
            },
            UploadTitle:
            {
                alignSelf: 'center',
                fontSize: 25,
                fontWeight: 'bold',
                margin: 20

            },
            txtInput:

            {
                borderWidth: 1,
                margin: 15,
                borderRadius: 15
            },
            txtInputDesc:
            {
                borderWidth: 1,
                margin: 15,
                height: 100,
                borderRadius: 15
            },

            txtInputTags:
            {
                borderWidth: 1,
                margin: 15,
                height: 100,
                borderRadius: 15,
                color: 'blue'
            },

            BtnSelectVideo:
            {
                backgroundColor: 'blue',
                height: 50,
                width: 100,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
                alignSelf: 'center',
                margin: 10

            },
            ThumbPreview:
            {
                height: 160,
                width: 90,
                borderRadius: 20,
                alignSelf: 'center',
                backgroundColor: 'blue'
            },
            BtnUpload:

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
    )

export default VideoUpload