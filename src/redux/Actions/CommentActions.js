


import firestore, { firebase } from '@react-native-firebase/firestore'

import auth from '@react-native-firebase/auth'


import {
    ADD_COMMENTS_REQUEST,
    ADD_COMMENTS_SUCCESS,
    ADD_COMMENTS_FAILED,
    FETCH_COMMENTS_REQUEST,
    FETCH_COMMENTS_SUCCESS,
    FETCH_COMMENTS_FAILED,
    FETCH_MORE_COMMENTS_FAILED
} from '../Types/CommentTypes'

const MAX_ITEM_PER_BATCH = 1

export const MakeComment = (comment, todaysDateTime, { videoID }) => {

    return async (dispatch) => {

        try {

            dispatch({ type: ADD_COMMENTS_REQUEST })
            if (comment != "") {

                const exists = await firestore()
                    .collection('Comments')
                    .doc(
                        videoID
                    )
                    .collection('reviews')
                    .doc(auth().currentUser.uid)
                    .get()

                if (!exists.exists) {
                    await firestore()
                        .collection('Videos')
                        .doc(videoID)
                        .update
                        (
                            {
                                comments: firebase
                                    .firestore
                                    .FieldValue
                                    .increment(1)
                            }
                        )
                }
            }

            const res = await firestore()
                .collection('Comments')
                .doc(
                    videoID
                ).collection('reviews')
                .doc(auth().currentUser.uid)
                .set
                (
                    {
                        comment: comment,
                        name: auth().currentUser.displayName,
                        Date: todaysDateTime,
                        profilePick: (auth().currentUser.photoURL == null) ? "" : auth().currentUser.photoURL,
                    }
                )

            dispatch({ type: ADD_COMMENTS_SUCCESS, payload: res })

        }

        catch (err) {
            dispatch({ type: ADD_COMMENTS_FAILED, payload: err })
            console.log(err)
        }

    }
}


export const FetchComments = (videoID) => {
    
    return async (dispatch) => {

        console.log("caled")
        try {
            dispatch({ type: FETCH_COMMENTS_REQUEST })
            const comments = await firestore()
                .collection('Comments')
                .doc(videoID).
                collection('reviews')
                .limit(MAX_ITEM_PER_BATCH)
                .get()

            let list = []
            let lastKey = null

            comments.docs.forEach
                (
                    function (child) {
                        console.log(child)

                        list.push({ id: child.id, ...child.data() })

                    }
                )

            if (list.length >= MAX_ITEM_PER_BATCH)
                lastKey = list[list.length - 1].id

            console.log(lastKey)

            dispatch({
                type: FETCH_COMMENTS_SUCCESS, payload: {
                    data: list,
                    lastKey: lastKey
                }
            })


        }

        catch
        (err) {
            dispatch({ type: FETCH_COMMENTS_FAILED, payload: err })
        }

    }
}