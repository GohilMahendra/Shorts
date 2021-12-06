

import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { Platform } from 'react-native'
import getpath from '@flyerhq/react-native-android-uri-path'
import thunk from 'redux-thunk'

export const getVideopath = (uriString) => {

    //This path will help to deal with document open intent

    let path = ""

    if (Platform.OS == "android")
        path = getpath(uriString)
    else
        path = uriString

    return path
}
export const UploadThumbOnServer = async (uri) => {
    try {
        //  uri=getVideopath(uri)

        const TimeStamp=new Date().getTime()
        const ref = 'Thumbs/' +
            auth().currentUser.uid +
            '/'
            + auth().currentUser.uid
            + '-'
            + TimeStamp
        const taskRef = storage().ref(ref)

        const task = await taskRef.putFile(uri)

        console.log(task)

        let url = ""
        url = await taskRef.getDownloadURL()

        return url

    }
    catch (err) {
        console.log(err)
    }
}
export const UploadVideoFull = async (response) => {

    try {
        const TimeStamp=new Date().getTime()
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
        VideDownloadUrl = await ref.getDownloadURL()
        return VideDownloadUrl
    }
    catch (err) {
        console.log(err)
    }
}

export const UploadSongOnServer = async (Title,VideoThumb) => {
    try {
        const response = await firestore().collection('Songs').add
            (
                {
                    SongName:Title,
                    SongCover: VideoThumb,
                    songLink: ""
                }
            )

        //ID for Search in Future
        return response.id
    }
    catch (err) {
        console.log(err)
    }


}
