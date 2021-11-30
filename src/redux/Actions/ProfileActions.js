
import firestore, { firebase } from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { GET_MORE_USER_VIDEOS_FAILED, GET_MORE_USER_VIDEOS_REQUEST, GET_MORE_USER_VIDEOS_SUCCESS, GET_USER_DETAILS_FAILED, GET_USER_DETAILS_REQUEST, GET_USER_DETAILS_SUCCESS, GET_USER_VIDEOS_FAILED, GET_USER_VIDEOS_REQUEST, GET_USER_VIDEOS_SUCCESS, LOG_OUT_REQUEST } from "../Types/ProfileTypes";
const MAX_FETCH_LIMIT = 1


export const UpdateProfile=()=>
{
    return async(dispatch)=>
    {
        try
        {

        }
        catch(err)
        {
            
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

            return ()=>user()

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

            if (id == null)
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

