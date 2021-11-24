
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

const MAX_FETCH_LIMIT = 1



const followOperations = async (createrID) => {
    try {
        let follow1 = await firestore()
            .collection('Following').
            doc(auth().currentUser.uid)
            .collection('LookUps')
            .doc(createrID)
            .set(
                {

                }
            )

        let follow2 = await firestore()
            .collection('Followers')
            .doc(createrID)
            .collection('Lookups')
            .doc(auth().currentUser.uid)
            .set(
                {

                }
            )

        let increaseFollowerFromCreater = await
            firestore()
                .collection('Users')
                .doc(createrID)
                .update
                (
                    {
                        Followers: firebase
                            .firestore
                            .FieldValue
                            .increment(1)
                    }
                )

        let increaseFollowingFromUser = await
            firestore()
                .collection('Users')
                .doc(auth().currentUser.uid)
                .update
                (
                    {
                        Following: firebase
                            .firestore
                            .FieldValue
                            .increment(1)
                    }
                )


        return { follow1, follow2, increaseFollowerFromCreater, increaseFollowingFromUser }

    }
    catch (err) {
        console.log(err, "FOlLOW")
    }
}


const unFollowOperations = async (createrID) => {
    try {

        let del1 = await firestore()
            .collection('Following').
            doc(auth().currentUser.uid)
            .collection('LookUps')
            .doc(createrID)
            .delete()

        let del2 = await firestore()
            .collection('Followers')
            .doc(createrID)
            .collection('Lookups')
            .doc(auth().currentUser.uid)
            .delete()

        let decreseFollowerFromCreater = await
            firestore()
                .collection('Users')
                .doc(createrID)
                .update
                (
                    {
                        Followers: firebase
                            .firestore
                            .FieldValue
                            .increment(-1)
                    }
                )

        let decreaseFollowingFromUser = await
            firestore()
                .collection('Users')
                .doc(auth().currentUser.uid)
                .update
                (
                    {
                        Following: firebase
                            .firestore
                            .FieldValue
                            .increment(-1)
                    }
                )


        return {
            decreaseFollowingFromUser, decreseFollowerFromCreater
            , del1, del2
        }

    }
    catch
    (err) {

        console.log(err, "unFOllow")
    }

}


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

            //     console.log(creater,"creater Action")

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

            console.log(id, 'id')
            dispatch( {type: GET_MORE_CREATER_VIDEOS_REQUEST})
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

            console.log(err,"error in njdfnd")
            dispatch(
                {
                    type: GET_MORE_CREATER_VIDEOS_FAILED,
                    payload: err
                }
            )
        }

    }
}