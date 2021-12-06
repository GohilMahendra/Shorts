import React, { useEffect, useRef, useState } from "react";

import {
    View, TextInput,
    Text, StyleSheet, TouchableOpacity, PermissionsAndroid, Pressable, Image, Platform, Alert
} from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

import PreviewThumb from "./PreviewThumb";
import { ScrollView } from "react-native-gesture-handler";
import ViewShot, { captureRef } from "react-native-view-shot";
import UploadingLoad from "./UploadingLoad";
import { useDispatch, useSelector } from "react-redux";
import { uploadVideo } from "../redux/Actions/ProfileActions";
const VideoUpload = ({ onPress }) => {
  
    const ImageRef = useRef()
    const [loading, setLoading] = useState(false)
    const [VideoLoaction, setVideoLocation] = useState("")
    const [Title, setTitle] = useState("")
    const [discription, setdeiscription] = useState("")
    const [Duration, setDuration] = useState("")
    const [Tags, setTags] = useState("")
    const [SongCover,setSongCover]=useState("")
    const [SongName, setSongName] = useState("")
  
    const dispatch=useDispatch()
    const uploadLoading=useSelector(state=>state.Profile.uploadLoading)
    const uploadError=useSelector(state=>state.Profile.uploadError)
    const maketags = (value) => {
        var arr = []
        if (value != "" && value != null) {
            arr = value.split(' ')
        }
        return arr
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
              
                return granted
        } catch (err) {
            console.log(err);
        }
    }


    const TagMaker = (value) => {
        setTags(value)
    }

    const captureTumbnail = async () => {

        try {
            const response = await captureRef(ImageRef, {
                format: "png",
                quality: 1
            })

            return response
        }
        catch (err) {
            console.log(err)
        }

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
            const {varified,error}=varify()
            if(!varified)
            {
                Alert.alert(error)
                return
            }
            const uri=await captureTumbnail()
            const tags=maketags(Tags)
            dispatch(uploadVideo(Title,tags,SongName,Duration,SongCover,VideoLoaction,uri)) 
          
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

                        onPress={() => onPress()}
                    >
                        <Text
                            style={
                                {
                                    fontSize: 25,
                                    fontWeight: 'bold'
                                }

                            }
                        >X</Text>
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

            {uploadLoading && <UploadingLoad></UploadingLoad>}

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
                borderRadius: 15,
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
                borderRadius: 10
            },
            txtInputDesc:
            {
                borderWidth: 1,
                margin: 15,
                height: 100,
                elevation:2,
                borderRadius: 10
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
                elevation:10,
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
                elevation:10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 15,
                alignSelf: 'center',
                margin: 20

            }
        }
    )

export default VideoUpload