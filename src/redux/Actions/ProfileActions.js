
import firestore, { firebase } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import storage from "@react-native-firebase/storage";

import {
    UploadThumbOnServer, getVideopath,
    UploadVideoFull, UploadSongOnServer
} from "../../functions/Profile/Upload";
import { GET_MORE_USER_VIDEOS_FAILED, GET_MORE_USER_VIDEOS_REQUEST, GET_MORE_USER_VIDEOS_SUCCESS, GET_USER_DETAILS_FAILED, GET_USER_DETAILS_REQUEST, GET_USER_DETAILS_SUCCESS, GET_USER_VIDEOS_FAILED, GET_USER_VIDEOS_REQUEST, GET_USER_VIDEOS_SUCCESS, LOGIN_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOG_OUT_REQUEST, RESET_PASSWORD_LINK_FAILED, RESET_PASSWORD_LINK_REQUEST, RESET_PASSWORD_LINK_SUCCESS, SIGNUP_USER_FAILED, SIGNUP_USER_REQUEST, SIGNUP_USER_SUCCESS, UPDATE_PROFILE_FAILED, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPLOAD_VIDEO_FAILED, UPLOAD_VIDEO_REQUEST, UPLOAD_VIDEO_SUCCESS } from "../Types/ProfileTypes";
import { ActivityIndicator, Alert } from "react-native";

const MAX_FETCH_LIMIT = 1


export const updateUserData = (username = "", path = "") => {
    return async (dispatch) => {
        try {

            if (username == "") {
                Alert.alert("NULL USERNAME", "CANT UPDATE TO NULL")
                return
            }

            dispatch({ type: UPDATE_PROFILE_REQUEST })

            const changeUser = await firestore().collection('Users').doc(
                auth().currentUser.uid
            ).update
                (
                    {
                        userName: username
                    }
                )

            const changeAuth = await auth().currentUser.updateProfile(
                {
                    displayName: username
                }
            )

            if(path!="" && path!=undefined && path!=null)
            {
                const updatepath = 'Profile/' +
                 auth().currentUser.uid + '/' + auth().currentUser.uid

                let ref = storage().ref(updatepath)
        
                let task = await ref.putFile(path)
        
                let storagepath = await ref.getDownloadURL()

                const changeUser = await firestore().collection('Users').doc(
                    auth().currentUser.uid
                ).update
                    (
                        {
                            photoURL: storagepath
                        }
                    )
        
                const changeAuth = await auth().currentUser.updateProfile(
                    {
                        photoURL:storagepath
                    }
                )

            }


            dispatch({type:UPDATE_PROFILE_SUCCESS})

        }
        catch (err) {
            console.log(err)
            dispatch({ type: UPDATE_PROFILE_FAILED, payload: err })
        }
    }
}


export const signInUser = (email, password) => {

    return async (dispatch) => {
        try {

            if (email == "" || password == "") {
                Alert.alert("NULL FIELD ERROR", "PLEASE FILL FIELDS REQUIRED")
                return
            }

            dispatch({ type: LOGIN_REQUEST })

            const user = await auth().signInWithEmailAndPassword(email, password)

            dispatch({ type: LOGIN_SUCCESS })
        }
        catch (err) {

            dispatch({ type: LOGIN_FAILED, payload: err })
        }
    }
}

export const registerUser = (email, password, displayName, userID) => {
    return async (dispatch) => {
        try {
            if (displayName === "" || userID === "" || email === "" || password === "") {
                Alert.alert("Error in Field", "Field is Empty please fill It!!")
                return
            }

            dispatch({ type: SIGNUP_USER_REQUEST })


            const user = await auth().createUserWithEmailAndPassword(email, password)

            const ref = await firestore()
                .collection('Users')
                .doc(auth().currentUser.uid)
                .set
                (
                    {
                        userName: displayName,
                        userID: userID,
                        varified: false,
                        Followers: 0,
                        photoUrl: "",
                        Following: 0,
                        likes: 0,
                    }
                )

            // console.log(ref)
            await auth().currentUser.updateProfile(
                {
                    displayName: displayName,

                }
            )

            dispatch({ type: SIGNUP_USER_SUCCESS })



        }
        catch (err) {
            console.log(err)
            dispatch({ type: SIGNUP_USER_FAILED, payload: err })
        }
    }
}
export const sendResetPasswordLink = (email) => {
    return async (dispatch) => {
        try {
            dispatch({ type: RESET_PASSWORD_LINK_REQUEST })
            const mrthods = await auth().sendPasswordResetEmail(email)
            console.log(mrthods)
            dispatch({ type: RESET_PASSWORD_LINK_SUCCESS })
        }
        catch (err) {

            console.log(err)
            dispatch({ type: RESET_PASSWORD_LINK_FAILED, payload: err })
        }
    }

}

export const uploadVideo = (Title, tags, SongName = "", Duration, SongCover = "", videolocation, uri,discription) => {
    return async (dispatch) => {

        try {
            dispatch({ type: UPLOAD_VIDEO_REQUEST })
            const VideoThumb = await UploadThumbOnServer(uri)
            const VideoUrl = await UploadVideoFull(videolocation)
            const songID = await UploadSongOnServer((SongName != "") ? SongName : Title, (SongCover != "") ? SongCover : VideoThumb)

            const todaysDate = new Date().toISOString()
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
                discription:discription,

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
            const res = await firestore().collection('Videos').add
                (doc)


            dispatch({ type: UPLOAD_VIDEO_SUCCESS, payload: res })
        }
        catch (err) {
            dispatch({ type: UPLOAD_VIDEO_FAILED, payload: err })
        }


    }

}

export const UpdateProfile = () => {
    return async (dispatch) => {
        try {

        }
        catch (err) {

        }
    }
}

export const getProfileDetails = () => {

    return async (dispatch, getState) => {
        dispatch({ type: GET_USER_DETAILS_REQUEST })

        const user =
            firestore()
                .collection('Users')
                .doc(
                    auth().currentUser.uid
                )
                .onSnapshot(
                    (child) => {
                        dispatch(
                            {
                                type: GET_USER_DETAILS_SUCCESS,
                                payload: {
                                    user: child.data()
                                }
                            }
                        )

                    },
                    (error) => {
                        console.log(error)
                        dispatch(
                            {
                                type: GET_USER_DETAILS_FAILED,
                                payload: error
                            }
                        )

                    }
                )

        return () => user()

    }


}


export const logOut = () => {
    return async (dispatch) => {
        dispatch({ type: LOG_OUT_REQUEST })
    }

}

export const getProfileVideos = () => {

    return async (dispatch) => {
        try {
            dispatch(
                {
                    type: GET_USER_VIDEOS_REQUEST
                }
            )
            const videos =
                await firestore().collection('Videos')
                    .where('channelID', '==', auth().currentUser.uid)
                    .limit(10)
                    .get()

            let list = []


            videos.docs.forEach
                (
                    function (child) {
                        list.push(
                            {
                                id: child.id,
                                ...child.data()
                            }
                        )
                    }
                )


            let lastKey = null

            if (list.length >= MAX_FETCH_LIMIT) {
                lastKey = list[list.length - 1].id
            }


            dispatch(
                {
                    type: GET_USER_VIDEOS_SUCCESS,
                    payload: {
                        Videos: list,
                        lastKey: lastKey
                    }
                }
            )

        }
        catch (err) {

            dispatch(
                {
                    type: GET_USER_VIDEOS_FAILED,
                    payload: err
                }
            )


        }
    }

}

export const getMoreProfileVideos = () => {

    return async (dispatch, getState) => {

        try {

            const id = getState().Profile.lastKeyUserVideos

            if (id === null)
                return

            dispatch(
                {
                    type: GET_MORE_USER_VIDEOS_REQUEST
                }
            )
            const videos =
                await firestore().collection('Videos')
                    .where('channelID', '==', auth().currentUser.uid)
                    .orderBy(firestore.FieldPath.documentId())
                    .startAfter(id)
                    .limit(MAX_FETCH_LIMIT)
                    .get()

            let list = []


            videos.docs.forEach
                (
                    function (child) {
                        list.push(
                            {
                                id: child.id,
                                ...child.data()
                            }
                        )
                    }
                )


            let lastKey = null

            if (list.length >= MAX_FETCH_LIMIT) {
                lastKey = list[list.length - 1].id
            }


            dispatch(
                {
                    type: GET_MORE_USER_VIDEOS_SUCCESS,
                    payload: {
                        Videos: list,
                        lastKey: lastKey
                    }
                }
            )

        }
        catch (err) {

            dispatch(
                {
                    type: GET_MORE_USER_VIDEOS_FAILED,
                    payload: err
                }
            )


        }
    }

}

