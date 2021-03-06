
import firestore, { firebase } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import {
    FOLLOW_CREATER_FAILED,
    FOLLOW_CREATER_SUCCESS,
    GET_CREATER_DETAILS_FAILED,
    GET_CREATER_DETAILS_REQUEST,
    GET_CREATER_DETAILS_SUCCESS,
    GET_CREATER_VIDEOS_FAILED,
    GET_CREATER_VIDEOS_REQUEST,
    GET_CREATER_VIDEOS_SUCCESS,
    GET_MORE_CREATER_VIDEOS_FAILED,
    GET_MORE_CREATER_VIDEOS_REQUEST,
    GET_MORE_CREATER_VIDEOS_SUCCESS,
    UNFOLLOW_CREATER_SUCCESS
} from "../Types/CreaterTypes";

const MAX_FETCH_LIMIT = 5


import {
    followOperations,
    unFollowOperations
} from '../../functions/Creater/FollowOperations'


export const followUnFollow = (createrID) => {

    return async (dispatch) => {

        try {
            const qry = await firestore()
                .collection('Following').
                doc(auth().currentUser.uid)
                .collection('LookUps')
                .doc(createrID)
                .get()

            if (qry.exists) {
                let result = await unFollowOperations(createrID)

                dispatch({ type: UNFOLLOW_CREATER_SUCCESS })
            }
            else {
                let result = await followOperations(createrID)

                dispatch({ type: FOLLOW_CREATER_SUCCESS })
            }
        }

        catch (err) {
            console.log(err)

        }

    }
}

export const getCreaterDetails = (createrID) => {

    return async (dispatch, getState) => {
        try {
            dispatch(
                {
                    type: GET_CREATER_DETAILS_REQUEST
                }
            )
            const creater = await
                firestore()
                    .collection('Users')
                    .doc(
                        createrID
                    )
                    .get()


            const isFollowing = await
                firestore()
                    .collection('Following').
                    doc(auth().currentUser.uid)
                    .collection('LookUps')
                    .doc(createrID)
                    .get()



            const data = {
                id: creater.id,

                CreaterName: creater.data().userName,
                CreaterID: creater.data().userID,
                photoURL: creater.data().photoURL,
                varified: creater.data().varified,
                Following: creater.data().Following,
                Followers: creater.data().Followers,
                likes: creater.data().likes,
                isFollowing: isFollowing.exists

            }

            //  console.log(data,"data")
            dispatch(
                {
                    type: GET_CREATER_DETAILS_SUCCESS,
                    payload: {
                        Creater: data
                    }
                }
            )

        }

        catch (err) {

            console.log(err)
            dispatch(
                {
                    type: GET_CREATER_DETAILS_FAILED,
                    payload: err
                }
            )
        }

    }


}


export const getCreaterVideos = (createrID) => {

    return async (dispatch) => {
        try {
            dispatch(
                {
                    type: GET_CREATER_VIDEOS_REQUEST
                }
            )
            const videos =
                await firestore().collection('Videos')
                    .where('channelID', '==', createrID)
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
                    type: GET_CREATER_VIDEOS_SUCCESS,
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
                    type: GET_CREATER_VIDEOS_FAILED,
                    payload: err
                }
            )


        }
    }

}


export const getMoreCreaterVideos = (createrID) => {
    return async (dispatch, getState) => {
        try {
            const id = getState().Creater.lastKeyCreaterVideos

            if(id===null)
            {
           
            return
            }
            dispatch({ type: GET_MORE_CREATER_VIDEOS_REQUEST })
            const videos =
                await firestore().collection('Videos')
                    .where('channelID', '==', createrID)
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
                    type: GET_MORE_CREATER_VIDEOS_SUCCESS,
                    payload: {
                        Videos: list,
                        lastKey: lastKey
                    }
                }
            )

        }
        catch (err) {

            console.log(err, "error in njdfnd")
            dispatch(
                {
                    type: GET_MORE_CREATER_VIDEOS_FAILED,
                    payload: err
                }
            )
        }

    }
}